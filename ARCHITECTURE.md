# Arquitetura Frontend

Este projeto segue as diretrizes da skill `frontend-architect`, focando em escalabilidade, manutenibilidade e separação de preocupações.

## Estrutura de Pastas

A estrutura do projeto está organizada dentro de `website/src`:

- `core/`: Funcionalidades centrais da aplicação (configurações, instâncias de API, store global).
- `features/`: Módulos independentes organizados por funcionalidade (ex: `acessorios`, `produtos`). Cada feature contém seus próprios componentes, hooks, serviços e tipos.
- `shared/`: Código compartilhado entre múltiplas features.
  - `components/`: Componentes de UI genéricos e reutilizáveis.
  - `hooks/`: Hooks de utilidade geral.
  - `utils/`: Funções utilitárias.
- `layouts/`: Componentes de layout de página.

## Princípios Aplicados

1.  **Single Responsibility Principle (SRP)**: Cada componente ou hook tem uma única responsabilidade.
2.  **Container vs Presentational**: Separação clara entre lógica de dados (hooks/services) e interface (componentes).
3.  **Aliases de Caminho**: Uso de `@features/*`, `@shared/*`, etc., para evitar caminhos relativos complexos.
4.  **Feature-Based Organization**: Facilita a localização de código relacionado a uma funcionalidade específica.

## Como Adicionar uma Nova Feature

1. Crie uma pasta em `website/src/features/[nome-da-feature]`.
2. Adicione as subpastas `components`, `hooks`, `services` e `types`.
3. Exponha a funcionalidade principal através de um componente na feature ou diretamente no diretório `app/`.
