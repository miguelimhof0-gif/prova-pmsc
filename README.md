# Rumo à Farda — PMSC 2026

Plataforma de estudo em português, baseada no PDF do edital 002/CCP/2026 fornecido pelo usuário. HTML, CSS e JavaScript, sem dependências de aplicação ou build. Requer Python 3 para o servidor local; Node.js para as verificações.

## Executar

```sh
cd /workspace/meu-site
npm run dev
```

O servidor usa a porta 3000. Não abra o HTML via `file://`: a transcrição do edital é carregada por `fetch`. Para hospedagem, publique a raiz em qualquer serviço de arquivos estáticos HTTPS, incluindo GitHub Pages. Os caminhos são relativos, compatíveis com subdiretórios. Nenhum deploy foi realizado automaticamente.

## Verificar

```sh
npm run check
npm test
```

## Recursos

- Painel com metas diárias, tempo real de foco e contagem até a data preliminar da prova.
- Nove disciplinas, revisões autorais, fontes oficiais e transcrição integral do Anexo II.
- 60 questões autorais comentadas; alternativas embaralhadas, filtros, caderno de erros.
- Simulado de 60 questões com distribuição do edital e prazo persistente de cinco horas.
- Flashcards com agendamento simples (agora, 1 dia, 7 dias).
- Plano semanal configurável e exportação para calendário ICS.
- Oficina de redação: seis propostas autorais dentro de Ordem Pública, rascunhos separados, checklist e calculadora manual da fórmula do edital.
- Notas por revisão, busca geral, métricas, exportação/importação de backup JSON e exclusão confirmada dos dados.
- Interface responsiva e navegação por teclado.

## Escopo e limites editoriais

As revisões são sínteses, não um curso exaustivo nem reprodução integral da legislação. Especialmente em legislação institucional, os roteiros orientam a leitura dos textos oficiais sem inventar artigos, prazos ou autoridades. Os temas de redação e questões são autorais, não oficiais ou reproduções da AOCP. Não há correção automática de redação, promessa de aprovação ou atualização automática de leis, jurisprudência e cronograma. Consulte fontes oficiais e retificações. O PDF original está em `assets/edital-pmsc-2026.pdf`.

O item 8.4 usa o termo “áreas de conhecimento”. O simulado adota conservadoramente a verificação de zero em cada disciplina e explica essa interpretação na tela de resultado; o critério definitivo é o aplicado pela banca. O cálculo de redação é manual, depende de NC/NE/TL fornecidos e não simula avaliação humana.

## Dados e privacidade

Todo progresso fica em `localStorage` no navegador, sem servidor de dados ou conta. Exporte um backup antes de limpar o navegador ou trocar de dispositivo. O cronômetro de simulado persiste o prazo; o cronômetro de foco só vive na página e não sobrevive a recarregamento. As fontes Google são opcionais, com fallback local; as demais funções não dependem de APIs externas. Links de legislação abrem fontes oficiais.

## Testes de navegador (opcionais)

Os scripts `tests/browser-smoke.cjs` e `tests/browser-workflows.cjs` exercitam rotas, persistência, treino, simulado completo, cronômetro, flashcards, redação, agenda, backup e layout móvel. Eles requerem Playwright e Chromium disponíveis no ambiente de desenvolvimento; não são dependências do site. Com o servidor na porta 3000:

```sh
PLAYWRIGHT_MODULE=/opt/codex/cua_node/lib/node_modules/playwright node tests/browser-smoke.cjs
PLAYWRIGHT_MODULE=/opt/codex/cua_node/lib/node_modules/playwright node tests/browser-workflows.cjs
```

Ajuste `PLAYWRIGHT_MODULE` e `CHROMIUM_PATH` para outras instalações. Os testes usam um navegador isolado e não alteram o progresso do usuário.

## Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` verifica JavaScript e conteúdo, prepara somente os arquivos públicos em `dist/` e publica pelo GitHub Pages quando há um push na `main`. Não requer segredos de hospedagem.

Na primeira publicação, o administrador deve habilitar **Settings → Pages → Build and deployment → Source: GitHub Actions**, caso ainda não esteja habilitado. O workflow também pode ser iniciado em **Actions → Validar e publicar site → Run workflow**. O endereço público deve ser confirmado no resultado do job `deploy`; criar ou enviar este workflow não comprova que a publicação terminou.

```sh
npm run check
npm test
npm run build
```

Para outra hospedagem estática, publique apenas `dist/`. O site usa rotas por fragmento (`#`) e não precisa de regras especiais de redirecionamento.
