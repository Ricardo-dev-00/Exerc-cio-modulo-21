# Book Catalog — Exercício prático (EBAC · Módulo 21)

Versão melhorada de um catálogo de livros construída com React + TypeScript (Vite).

Este repositório contém a implementação do exercício prático do Módulo 21 do curso EBAC: foco em tipagem de dados, organização de componentes e integração com uma API REST (crudcrud.com).

Principais funcionalidades
- Listar livros (GET)
- Adicionar livro (POST)
- Remover livro (DELETE)
- Alternar status "Lido" / "Não lido" (PUT)
- Modo mock local (localStorage) para desenvolvimento quando a API remota estiver indisponível

Demo rápida
- Formulário para adicionar título, autor e status
- Cards responsivos para cada livro com ações de alternar status e remover

Pré-requisitos
- Node 16+ e npm

Nota sobre execução
- As instruções de instalação e execução foram removidas deste README por solicitação. Se você quiser, posso re-adicioná-las em uma seção separada do repositório ou manter um arquivo `CONTRIBUTING.md` com passos de desenvolvimento.


Estrutura do projeto (resumo)
- `src/` — código fonte
	- `components/` — `BookList`, `BookItem`, `BookForm`
	- `api.ts` — wrapper de API com fallback para mock
	- `types.ts` — interfaces e tipos (Book, props)
	- `styles.css` — estilos globais

Variáveis de ambiente
- `VITE_CRUDCRUD_BASE` — URL base do recurso (ex: `https://crudcrud.com/api/<key>/books`)
- `VITE_USE_MOCK` — `true`|`false` (ativa mock em build-time)

Observações finais
- O modo mock facilita o desenvolvimento offline e evita depender de um serviço público temporário.
- Este projeto foi desenvolvido como exercício e não inclui autenticação nem persistência em banco real além do crudcrud/localStorage.

Licença
- Conteúdo criado como exercício do curso EBAC — use para fins educativos.

Contato
- Se quiser sugestões de melhorias, testes ou integração com `json-server` para um backend local mais robusto, abra uma issue ou me avise.
