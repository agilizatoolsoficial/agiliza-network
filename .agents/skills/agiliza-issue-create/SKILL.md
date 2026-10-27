---
name: agiliza-issue-create
description: >-
  Cria ou prepara issues do GitHub para o Agiliza Network com escopo verificável
  e alinhado às aplicações e pacotes do monorepo. Use quando o usuário pedir para
  criar, abrir, rascunhar, organizar ou decompor uma issue, funcionalidade, bug,
  ideia, documento ou pendência do projeto.
---

# Agiliza Issue Create

Transforme pedidos em unidades de trabalho pequenas, verificáveis e ligadas ao código e à documentação relevantes do Agiliza Network.

## Contexto do projeto

- O projeto é um monorepo Turborepo com aplicações em `apps/agiliza-*` e pacotes compartilhados em `packages/*`.
- Leia também o [AGENTS.md](../../../AGENTS.md) para requisitos de produto confirmados pelo usuário. Não proponha issue que contradiga essas regras; ao criar trabalho relacionado, referencie as issues existentes em vez de repetir o mesmo escopo.
- O stack e os comandos podem variar por pacote. Leia os `package.json`, testes e código do escopo antes de descrever a implementação ou seus critérios.
- Consulte [README.md](../../../README.md), [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) e [docs/TOOLS-SPEC.md](../../../docs/TOOLS-SPEC.md) como contexto. Roadmaps, exemplos e planos nesses documentos não provam que algo já esteja implementado nem que uma proposta tenha sido aprovada.
- Se a tarefa tocar uma aplicação, identifique seu nome exato em `apps/` e leia seus arquivos relevantes. Se afetar código compartilhado, indique o pacote em `packages/` e as aplicações que precisam ser consideradas.
- Escreva em português do Brasil, salvo se o usuário pedir outro idioma.

## Princípios

- Cada issue deve ter um resultado identificável e critérios de aceitação que possam ser verificados.
- Não misture mudanças independentes em uma issue. Ao decompor trabalho, explicite dependências e mantenha cada issue pequena o suficiente para implementar e revisar.
- Não invente regras de produto, formatos de dados, integrações, limites, custos, políticas legais ou comportamento que não esteja confirmado. Registre incertezas em “Dependências e perguntas em aberto”.
- Diferencie o comportamento existente, o pedido do usuário e as propostas encontradas na documentação.
- Não inclua credenciais, conteúdo de `.env`, dados pessoais, arquivos de usuários ou logs com informação sensível.
- Não presuma que labels, milestones, responsáveis ou modelos de issue do GitHub existam.

## Fluxo

1. **Entenda e classifique o pedido.** Use um prefixo de título curto, como `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`, `security` ou `spike`. Se o app ou pacote estiver definido, inclua-o como escopo: `feat(agiliza-qr): ...` ou `chore(packages/ui): ...`.
2. **Inspecione o contexto atual.** Leia o código, os testes, os scripts do pacote e os documentos pertinentes. Considere o estado local do repositório; não descreva trabalho não commitado como comportamento já publicado.
3. **Procure issues semelhantes** quando o GitHub estiver acessível e o usuário tiver pedido criação, usando o repositório confirmado:
   ```powershell
   gh issue list --state all --search "<termos relevantes>" --limit 20
   ```
   Não afirme que verificou duplicatas se a consulta não puder ser executada. Se encontrar uma issue equivalente, informe o número e proponha atualizá-la em vez de criar uma duplicata.
4. **Redija** com o [template de issue](resources/issue-template.md). Para bugs, inclua passos para reproduzir, resultado atual, resultado esperado e ambiente quando essas informações estiverem disponíveis; não invente detalhes ausentes.
5. **Crie apenas quando solicitado.** Um pedido explícito para criar issue(s) autoriza a criação desse escopo. Se o usuário pediu somente um rascunho, não publique. Pergunte apenas quando uma informação essencial estiver indefinida ou quando a decomposição proposta ampliar o pedido de forma relevante.
6. **Use somente metadados existentes.** Consulte labels disponíveis antes de usá-las. Não crie labels, atribua pessoas ou escolha milestones sem instrução explícita.
7. **Publique e confira.** Confirme o repositório com `gh repo view` antes de publicar e, se `gh` estiver disponível e autenticado, crie a issue usando um arquivo temporário UTF-8 fora do repositório:
   ```powershell
   gh issue create --title "<título>" --body-file "$env:TEMP\agiliza-issue.md"
   gh issue view <número>
   ```
   Remova o arquivo temporário depois. Se o GitHub não estiver acessível, entregue o título e corpo prontos e informe que a issue não foi publicada.
8. **Relate o resultado.** Para issue publicada, informe o link e o que foi validado. Para rascunho, não sugira que houve publicação.

## Decomposição de trabalho

Ao transformar uma especificação ou pedido amplo em várias issues, agrupe por resultado independente, indique a ordem e as dependências (`Depende de #N` quando os números já existirem). Não crie tarefas duplicadas para apps diferentes quando uma alteração compartilhada em `packages/*` cobre o mesmo resultado; explicite os apps impactados e os testes necessários.
