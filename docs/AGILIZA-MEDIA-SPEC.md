# Especificação Técnica e de Produto: AgilizaMedia (`apps/agiliza-media`)

> Documento de referência da arquitetura, plataformas suportadas, segurança e conformidade legal do `agiliza-media` (Issue #59).  
> URL de produção: `https://agiliza-media.vercel.app`

---

## 1. Visão Geral e Plano de Entregas

O `AgilizaMedia` permite baixar vídeos (priorizando versões **sem marca d'água** quando disponibilizadas pela fonte/extrator) e extrair áudios a partir de links públicos de redes sociais.

| Etapa | Escopo | Modelo de execução | Issue |
|---|---|---|---|
| Base UI, correção de Tailwind v4 (`globals.css`), tema claro padrão, acessibilidade, "Como usar", FAQ e `<AdSlot />` | Front-end | Next.js (Vercel) | #60 |
| Serviço de extração de mídia (TikTok, Instagram, Pinterest, Kwai e redes compatíveis), allowlist anti-SSRF, rate-limit e proxy em streaming | Backend + API | Microserviço Docker + API Route Vercel | #61 |
| Integração no `MediaDownloader`: detecção de rede por link, prévia real de metadados, seleção de MP4/áudio e download | Front-end | Next.js (Vercel) | #62 |
| Atualização do portal (`packages/ui/src/types/tools.ts`), metadados SEO, `/privacidade`, `/termos` e validação completa no CI/navegador | Monorepo | CI + Browser | #63 |

---

## 2. Matriz de Plataformas Suportadas

### 2.1 Plataformas Obrigatórias na v1
| Plataforma | Domínios oficiais (allowlist) | Tipos de mídia previstos | Marca d'água |
|---|---|---|---|
| **TikTok** | `tiktok.com`, `www.tiktok.com`, `m.tiktok.com`, `vm.tiktok.com`, `vt.tiktok.com` | Vídeos curtos públicos e áudio | Priorizar stream MP4 **sem marca d'água** retornado pelo extrator |
| **Instagram** | `instagram.com`, `www.instagram.com`, `instagr.am` | Reels e vídeos públicos | Sem marca d'água adicional |
| **Pinterest** | `pinterest.com`, `www.pinterest.com`, `br.pinterest.com`, `pin.it` | Pins de vídeo públicos | Sem marca d'água adicional |
| **Kwai** | `kwai.com`, `www.kwai.com`, `kwai-video.com`, `s.kw.ai`, `m.kwai.com` | Vídeos curtos públicos | Priorizar stream MP4 **sem marca d'água** quando disponível na fonte |

### 2.2 Redes Candidatas Adicionais (avaliadas na #61)
- **X (Twitter):** `x.com`, `twitter.com` — boa estabilidade via `yt-dlp` para vídeos públicos.
- **Facebook:** `facebook.com`, `www.facebook.com`, `fb.watch` — vídeos e Reels públicos.
- **Threads:** `threads.net`, `www.threads.net` — vídeos públicos.
- **YouTube / Shorts:** `youtube.com`, `www.youtube.com`, `youtu.be`, `m.youtube.com` — exige atenção extra a bloqueios de IP de datacenter (PO Token / cookies) e políticas de uso; confirmar inclusão antes da #61.

---

## 3. Arquitetura: Vercel (Front/Proxy) + Microserviço Extrator

### 3.1 Por que não roda 100% no navegador nem apenas na Vercel Hobby?
- **No navegador:** requisições diretas para páginas e CDNs das redes sociais são bloqueadas por **CORS** e tokens assinados de curta duração.
- **Na Vercel Serverless:** binários como `yt-dlp` (Python) e `ffmpeg` excedem o limite de tamanho de bundle e sofrem com timeouts curtos para streaming de arquivos de até 500 MB.

### 3.2 Comparativo de Opções de Backend Extrator

| Critério | Opção A: Microserviço Docker próprio (`FastAPI` + `yt-dlp` + `ffmpeg`) | Opção B: APIs comerciais de terceiros (RapidAPI / Cobalt gerenciado / SaaS) |
|---|---|---|
| **Controle de marca d'água e formatos** | Total: seleção de formato `no_watermark` / `bestvideo+bestaudio` via `yt-dlp` | Depende dos campos expostos pelo fornecedor |
| **Custo mensal** | Previsível: VPS/Fly.io/Render (~US\$ 5 a US\$ 15/mês) | Variável por requisição (risco de estouro em picos de tráfego gratuito) |
| **Privacidade (Retenção Zero)** | Total: extração em memória sem salvar histórico de links | Dados de URLs passam por terceiro adicional |
| **Manutenção** | Requer atualização periódica do `yt-dlp` (`pip install -U yt-dlp`) quando redes mudam | Zero manutenção de extrator |

**Arquitetura recomendada:** **Opção A** (microserviço Docker enxuto em Python/FastAPI + `yt-dlp` + `ffmpeg` leve) rodando em Fly.io, Render ou VPS, protegido por token interno (`X-Agiliza-Internal-Secret`), consumido pelas rotas `/api/extract` e `/api/download` do `apps/agiliza-media` na Vercel.

```text
Browser (apps/agiliza-media)
  │  1. Usuário cola link → validação sintática e detecção de rede
  │  2. POST /api/extract { url }
  ▼
Next.js API Route (Vercel)
  │  - Valida allowlist de domínios + anti-SSRF
  │  - Aplica rate-limit por IP (Upstash Redis ou fallback em memória)
  │  - Chama microserviço extrator com X-Agiliza-Internal-Secret
  ▼
Microserviço Docker (FastAPI + yt-dlp)
  │  - Resolve metadados reais (título, autor, miniatura, duração)
  │  - Lista formatos reais (MP4 sem marca d'água, MP4 padrão, áudio)
  │  - Sem gravação persistente em disco (retenção zero)
  ▼
Download no Browser
  │  - Direto via CDN quando CORS/Content-Disposition permitirem
  │  - Ou via streaming proxy GET /api/download (com limite de tamanho e timeout)
```

---

## 4. Contrato de API (Referência para #61 e #62)

### `POST /api/extract`
- **Entrada:** `{ "url": "https://www.tiktok.com/@usuario/video/123" }`
- **Saída (`200 OK`):**
  ```json
  {
    "platform": "tiktok",
    "title": "Título real do vídeo",
    "author": "@usuario",
    "thumbnailUrl": "https://...",
    "durationSeconds": 28,
    "formats": [
      {
        "id": "mp4-no-watermark",
        "label": "MP4 (Sem marca d'água)",
        "ext": "mp4",
        "hasAudio": true,
        "watermarkFree": true,
        "quality": "1080p",
        "downloadToken": "..."
      }
    ]
  }
  ```
- **Respostas de erro padronizadas:**
  - `400`: URL inválida ou formato malformado.
  - `422`: plataforma não suportada, conteúdo privado ou removido.
  - `429`: limite de requisições atingido.
  - `503`: serviço extrator não configurado no ambiente (`MEDIA_EXTRACTOR_URL` ausente) ou indisponível.

### `GET /api/download?token=...`
- Faz streaming do arquivo selecionado com `Content-Disposition: attachment` e validação de assinatura/expiração curta do `downloadToken` (evitando proxy aberto).

---

## 5. Segurança, Limites e Proteção Contra Abuso

1. **Allowlist estrita + Anti-SSRF:**
   - Aceitar somente URLs `https://` cujo hostname pertença exatamente (ou seja subdomínio válido) da allowlist de plataformas suportadas.
   - Rejeitar IPs literais (IPv4/IPv6), `localhost`, `127.0.0.1`, `169.254.169.254`, portas não padrão e credenciais embutidas na URL (`user:pass@host`).
2. **Rate-limiting e timeouts:**
   - Limite por IP no `/api/extract` e `/api/download`.
   - Timeout máximo de extração (ex.: `20s`) e teto de tamanho por arquivo de `500 MB`.
3. **Retenção Zero:**
   - Nenhum vídeo, áudio ou link privado é salvo em banco de dados ou storage permanente.
   - Logs técnicos não devem registrar URLs completas com tokens de compartilhamento nem IPs em texto puro.
4. **Feature Flag Segura:**
   - Enquanto `MEDIA_EXTRACTOR_URL` e `MEDIA_EXTRACTOR_SECRET` não estiverem configurados no servidor, a UI exibe aviso limpo informando que a extração não está ativa nesta instância.

---

## 6. Conformidade Legal e Diretrizes (`AGENTS.md`)

### 6.1 Atualizações Obrigatórias Antes do Lançamento (#63)
1. **`apps/web/app/privacidade/page.tsx`:**
   - Informar que apenas o link público enviado pelo usuário trafega via HTTPS para o serviço extrator para resolver os metadados e o stream, sem armazenamento permanente de arquivos ou histórico.
2. **`apps/web/app/termos/page.tsx`:**
   - Remover a menção de que o `Agiliza Mídia` não realiza downloads nesta versão.
   - Reforçar que o usuário é integralmente responsável por respeitar direitos autorais, uso pessoal/autorizado e os termos de serviço das plataformas de origem.
3. **`packages/ui/src/types/tools.ts` e `apps/agiliza-media/app/layout.tsx`:**
   - Remover `"Downloads de mídia indisponíveis nesta versão"` apenas após #61 e #62 estarem funcionais em produção.

### 6.2 Diretrizes de Interface (`AGENTS.md`)
- Não usar gradientes roxos nem botões/selos em pílula (`rounded-full`).
- Não usar emojis como ícones (usar `Icon` de `@agiliza/ui`).
- Não usar travessões em textos visíveis do produto.
- Não inventar contadores, avaliações ou métricas falsas.

---

## 7. Perguntas em Aberto para Decisão do Usuário

1. **Hospedagem do microserviço extrator (#61):** prefere rodar o container Docker (`yt-dlp` + `FastAPI`) em VPS própria, Fly.io ou Render?
2. **Redes extras além de TikTok, Instagram, Pinterest e Kwai:** deseja incluir X/Twitter, Facebook, Threads e/ou YouTube/Shorts já na v1?
