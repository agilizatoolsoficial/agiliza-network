# Especificação das Ferramentas — Agiliza Network

> Documento de requisitos e especificações técnicas detalhadas por ferramenta.

---

## AgilizaPDF (`apps/agiliza-pdf`)

**URL:** `pdf.agilizatools.com.br`  
**Keyword Alvo Principal:** "comprimir PDF grátis online"  
**Processamento:** 100% Client-Side

### Funcionalidades MVP
- [ ] **Comprimir PDF** — redução de qualidade de imagens embutidas via pdf-lib
- [ ] **Mesclar PDFs** — unir múltiplos arquivos em um
- [ ] **Dividir PDF** — por intervalo de páginas ou cada página
- [ ] **PDF para Imagem** — exportar páginas como PNG/JPG

### Funcionalidades Futuras
- [ ] PDF para Word (via Mammoth.js ou WASM)
- [ ] Proteger/desproteger com senha
- [ ] Rodar páginas (90°, 180°, 270°)
- [ ] Remover páginas específicas

### Dependências
```json
{
  "pdf-lib": "^1.17.1",
  "pdfjs-dist": "^4.0.0"
}
```

### Limites
- Tamanho máximo: 100MB por arquivo
- Máximo de arquivos para merge: 20 PDFs
- Compressão: reduz em média 40-70% (depende do conteúdo)

---

## AgilizaMedia (`apps/agiliza-media`)

**URL:** `media.agilizatools.com.br`  
**Keyword Alvo Principal:** "baixar vídeo do Instagram sem marca d'água"  
**Processamento:** Serverless (Render/Fly.io)

### Funcionalidades MVP
- [ ] Download de vídeos do Instagram (Reels, posts)
- [ ] Download de vídeos do TikTok sem marca d'água
- [ ] Download de vídeos do YouTube (MP4 + MP3)
- [ ] Seleção de qualidade (480p, 720p, 1080p)

### Funcionalidades Futuras
- [ ] Twitter/X, Facebook, Pinterest
- [ ] Download em lote (até 5 URLs)
- [ ] Extrair áudio (MP3) de qualquer plataforma

### Arquitetura do Microserviço
```
POST /api/info        — retorna metadados do vídeo
POST /api/download    — inicia o download (retorna job ID)
GET  /api/status/{id} — status do job (polling ou SSE)
GET  /api/file/{id}   — stream do arquivo final
```

### Rate Limits
- 3 downloads por IP por hora
- Tamanho máximo de arquivo: 500MB
- TTL do arquivo no storage: 10 minutos

### Disclaimers Legais
- Apenas para conteúdo próprio ou com permissão
- Não armazenamos histórico de downloads
- Compliance com DMCA takedown requests

---

## AgilizaCalc (`apps/agiliza-calc`)

**URL:** `calc.agilizatools.com.br`  
**Keyword Alvo Principal:** "calculadora CLT vs PJ 2025"  
**Processamento:** 100% Client-Side (puro JavaScript)

### Calculadoras MVP

#### 1. CLT vs PJ
- **Inputs:** Salário bruto, cargo, estado (INSS/IR)
- **Outputs:** Comparativo líquido CLT x PJ, ponto de equilíbrio, benefícios
- **Notas fiscais PJ:** Simples Nacional, Lucro Presumido

#### 2. Rescisão Trabalhista
- Sem justa causa, com justa causa, pedido de demissão
- Cálculo de 13°, férias proporcionais, FGTS + 40%

#### 3. Juros Compostos
- Montante final, tempo necessário, taxa equivalente
- Gráfico de crescimento ao longo do tempo

#### 4. FGTS
- Simulação de saque, rendimento anual

#### 5. Imposto de Renda PF
- Simulação de declaração simplificada
- Tabela progressiva 2025

### Dependências
```json
{
  "recharts": "^2.12.0"  // gráficos
}
```

---

## AgilizaQR (`apps/agiliza-qr`)

**URL:** `qr.agilizatools.com.br`  
**Keyword Alvo Principal:** "gerar QR Code Pix grátis"  
**Processamento:** 100% Client-Side

### Funcionalidades MVP
- [ ] **QR de Link/URL** — qualquer URL
- [ ] **QR Pix** — com chave (CPF, CNPJ, email, telefone, aleatória), nome, valor
- [ ] **QR Wi-Fi** — SSID, senha, tipo de segurança (WPA/WEP/Open)
- [ ] **QR WhatsApp** — número + mensagem pré-definida
- [ ] **Customização:** cor do QR, cor do fundo, adicionar logo no centro
- [ ] **Export:** PNG, SVG, PDF

### Funcionalidades Futuras
- [ ] vCard (contato)
- [ ] QR de localização (Google Maps lat/lng)
- [ ] QR Code com rastreamento de cliques (requer backend)

### Dependências
```json
{
  "qrcode": "^1.5.3",
  "qrcode.react": "^3.1.0"
}
```

### Geração do Pix EMV
Implementar o payload Pix seguindo o padrão EMV/BRCode do Banco Central:
```
ID 00: Payload Format Indicator
ID 26: Merchant Account Information
  ID 00: GUI
  ID 01: Chave Pix
ID 52: Merchant Category Code
ID 53: Transaction Currency (986 = BRL)
ID 54: Transaction Amount (opcional)
ID 58: Country Code (BR)
ID 59: Merchant Name
ID 60: Merchant City
ID 62: Additional Data Field
  ID 05: Reference Label
ID 63: CRC16/CCITT
```

---

## AgilizaBio (`apps/agiliza-bio`)

**URL:** `bio.agilizatools.com.br` / `bio.agilizatools.com.br/{username}`  
**Keyword Alvo Principal:** "criar página de links grátis Linktree alternativa"  
**Processamento:** Client-Side + Supabase

### Funcionalidades MVP
- [ ] Cadastro/login (email + OAuth Google)
- [ ] Escolha de username único
- [ ] Adicionar/editar/reordenar/remover links (drag & drop)
- [ ] Foto de perfil + bio de 150 chars
- [ ] 3 temas visuais (dark, light, brand)
- [ ] Página pública em `bio.agilizatools.com.br/{username}`
- [ ] Contador de cliques por link

### Funcionalidades Futuras
- [ ] Analytics (views por dia, gráfico)
- [ ] Ícones de redes sociais automáticos (detecta URL)
- [ ] Temas premium customizáveis
- [ ] Botão PIX integrado com AgilizaQR
- [ ] Domínio personalizado (CNAME)

### Row Level Security (Supabase RLS)
```sql
-- profiles: leitura pública, escrita apenas pelo dono
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- links: mesma lógica
CREATE POLICY "Links of public profiles are viewable"
  ON links FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = profile_id)
  );

CREATE POLICY "Users can manage own links"
  ON links FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = profile_id AND id = auth.uid())
  );
```

---

## AgilizaNota (`apps/agiliza-nota`)

**URL:** `nota.agilizatools.com.br`  
**Keyword Alvo Principal:** "gerar recibo de pagamento online grátis"  
**Processamento:** 100% Client-Side

### Funcionalidades MVP
- [ ] **Recibo de Pagamento** — prestador/cliente, serviço, valor, data, local
- [ ] **Declaração de Conteúdo** — para envios pelos Correios (exigência ECT)
- [ ] **Contrato de Prestação de Serviço** — modelo simples editável
- [ ] Export como PDF (jsPDF)
- [ ] Templates prontos por categoria (MEI, freelancer, aluguel)

### Dependências
```json
{
  "jspdf": "^2.5.1",
  "jspdf-autotable": "^3.8.1"
}
```

---

## AgilizaImg (`apps/agiliza-img`)

**URL:** `img.agilizatools.com.br`  
**Keyword Alvo Principal:** "comprimir imagem online grátis sem perda"  
**Processamento:** 100% Client-Side (Canvas API + WASM)

### Funcionalidades MVP
- [ ] **Comprimir imagem** — controle de qualidade (slider 1-100%)
- [ ] **Converter formato** — JPG → WebP, PNG → WebP, WebP → PNG/JPG
- [ ] **Redimensionar** — por pixels ou porcentagem, manter proporção
- [ ] **Compressão em lote** — até 20 imagens simultâneas
- [ ] Preview before/after com comparação de tamanho

### Funcionalidades Futuras
- [ ] Remover fundo (remove.bg API ou WASM)
- [ ] Converter HEIC → JPG (para fotos de iPhone)
- [ ] Marca d'água
- [ ] Otimização automática para Web (gera set de tamanhos responsivos)

### Dependências
```json
{
  "browser-image-compression": "^2.0.2",
  "sharp-wasm": "^0.32.0"
}
```

---

## AgilizaText (`apps/agiliza-text`)

**URL:** `text.agilizatools.com.br`  
**Keyword Alvo Principal:** "contar caracteres palavras online"  
**Processamento:** 100% Client-Side (puro JavaScript)

### Ferramentas MVP
- [ ] **Contador:** chars, palavras, linhas, parágrafos, tempo de leitura
- [ ] **Formatação Case:** UPPER, lower, Title Case, Sentence case, camelCase, snake_case, kebab-case
- [ ] **JSON Formatter/Lint:** beautify, minify, validação com erros destacados
- [ ] **Remover espaços extras / duplicados**
- [ ] **Inverter texto** / Ordenar linhas (A-Z, Z-A)
- [ ] **Comparar textos (diff)** — destacar diferenças

### Funcionalidades Futuras
- [ ] Extrator de e-mails/URLs de texto
- [ ] Gerador Lorem Ipsum (BR: Mussum Ipsum 😄)
- [ ] Codificar/decodificar Base64, URL Encode
- [ ] Regex Tester com highlights

---

## AgilizaDev (`apps/agiliza-dev`)

**URL:** `dev.agilizatools.com.br`  
**Keyword Alvo Principal:** "gerar CPF CNPJ válido para testes"  
**Processamento:** 100% Client-Side

### Ferramentas MVP
- [ ] **Gerador CPF** — válido, com/sem formatação, em lote
- [ ] **Validador CPF** — verifica dígitos verificadores
- [ ] **Gerador CNPJ** — válido, formatado
- [ ] **Validador CNPJ**
- [ ] **Gerador de cartão de crédito** — números válidos por bandeira (Visa, Master, Elo, Amex) para testes
- [ ] **Consulta CEP** — via ViaCEP API
- [ ] **Gerador de dados fictícios BR** — nome, endereço, telefone, email

### Funcionalidades Futuras
- [ ] Gerador de PIX aleatório
- [ ] Validador de Inscrição Estadual por UF
- [ ] Gerador de PIS/PASEP

### APIs Externas
- **ViaCEP:** `viacep.com.br/ws/{cep}/json/` (CORS-friendly, gratuito)

> ⚠️ **Aviso legal:** Todos os documentos gerados são **fictícios** e servem exclusivamente para testes de software. O uso para fraude é crime.

---

## AgilizaSign (`apps/agiliza-sign`)

**URL:** `sign.agilizatools.com.br`  
**Keyword Alvo Principal:** "assinar PDF online grátis sem cadastro"  
**Processamento:** 100% Client-Side

### Funcionalidades MVP
- [ ] **Assinatura desenhada** — canvas touch/mouse, salvar como PNG transparente
- [ ] **Assinatura digitada** — fontes cursivas (Dancing Script, Pacifico)
- [ ] **Assinatura com imagem** — upload de PNG da assinatura
- [ ] **Posicionar no PDF** — drag & drop da assinatura sobre as páginas
- [ ] **Adicionar campos:** texto, data, iniciais
- [ ] Export como PDF assinado

### Dependências
```json
{
  "pdf-lib": "^1.17.1",
  "react-signature-canvas": "^1.0.6"
}
```

> ⚠️ **Nota legal:** Assinatura eletrônica simples. Não equivale à assinatura digital com certificado ICP-Brasil (para contratos com validade jurídica plena, usar certificado A1/A3).
