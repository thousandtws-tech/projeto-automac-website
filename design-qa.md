# Design QA — responsividade com zoom

- Source visual truth: `C:\Users\VINICI~1\AppData\Local\Temp\codex-clipboard-9d6ae377-ad18-4490-b853-519661ca903f.png`
- Implementation screenshots: `implementation-zoom-130.png`, `implementation-narrow.png`, `implementation-mobile.png`
- Source pixels: 1919 × 1017 (captura do Firefox a 130%, incluindo chrome do navegador)
- Implementation pixels: 1478 × 850, 1100 × 850 e 390 × 844; device scale factor 1
- CSS viewports: 1478 × 850, 1100 × 850 e 390 × 844
- State: rota `/pt-BR/assistencia-tecnica`, carregada, vídeo em reprodução automática e banner de cookies visível

## Full-view comparison evidence

A referência e a implementação foram abertas juntas. Na referência, o título ultrapassa a coluna esquerda e entra na área do vídeo. Na implementação de 1478 px, o título termina em x=652,9 e o vídeo começa em x=771,2, deixando 118,3 px livres e sem sobreposição. Não há overflow horizontal (`scrollWidth` menor ou igual ao viewport).

## Focused responsive evidence

Foi necessária uma verificação focada do título e do vídeo porque essa colisão era o defeito reportado. Em 1100 px, o título quebra de forma equilibrada em duas linhas; termina em x=518,4 e o vídeo começa em x=566,4, sem sobreposição. Em 390 px, o conteúdo passa para uma coluna, mantém o título legível e não cria overflow horizontal.

## Required fidelity surfaces

- Fonts and typography: família, peso, caixa alta e hierarquia existentes foram preservados; apenas a escala fluida e a quebra responsiva do título mudaram.
- Spacing and layout rhythm: grid, espaçamentos, bordas, raio e sombra foram preservados; as duas colunas agora podem encolher dentro do grid.
- Colors and visual tokens: nenhuma alteração.
- Image quality and asset fidelity: vídeo, poster, recorte e controles foram preservados.
- Copy and content: nenhuma alteração.

## Findings

Nenhum P0, P1 ou P2 permanece no escopo do problema de zoom. O banner de cookies sobrepõe conteúdo inferior, mas é o estado esperado do consentimento e não interfere no hero corrigido.

## Comparison history

- Antes: P1 — título de “Assistência técnica” invadia o vídeo no zoom de 130%.
- Correção: removida a proibição global de quebra, adotada tipografia fluida com quebra balanceada e permitido encolhimento dos itens do grid.
- Depois: capturas de 1478 px, 1100 px e 390 px confirmam ausência de colisão e de overflow horizontal.

## Primary interactions and console

- Carregamento da rota e reprodução automática do vídeo verificados.
- Navegação responsiva desktop/mobile renderizada.
- Console verificado: nenhum erro.

## Implementation checklist

- [x] Evitar colisão entre título e vídeo.
- [x] Preservar uma linha quando houver espaço suficiente.
- [x] Permitir quebra equilibrada em larguras intermediárias.
- [x] Validar desktop com zoom equivalente, viewport estreito e mobile.
- [x] Confirmar ausência de overflow horizontal e erros no console.

final result: passed
