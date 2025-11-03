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

Instalação
1. Instale dependências:

```powershell
npm install
```

2. Crie o arquivo de ambiente (copie o exemplo):

```powershell
copy .env.example .env
```

Configurar a API (crudcrud.com)
1. Acesse https://crudcrud.com. A página mostrará uma URL exclusiva temporária:

```
https://crudcrud.com/api/<sua-chave>
```

2. No `.env` defina a variável `VITE_CRUDCRUD_BASE` apontando para o recurso `books`:

```
VITE_CRUDCRUD_BASE=https://crudcrud.com/api/<sua-chave>/books
```

3. Observação: a chave do crudcrud expira (normalmente ~24h). Se receber erros 4xx/5xx, gere uma nova chave no site.

Usando o modo mock (recomendado para desenvolvimento)
- Em vez de depender do endpoint remoto, você pode ativar um mock local que salva os livros em `localStorage`.
- Abra `.env` e defina:

```
VITE_USE_MOCK=true
```

Ou alterne o mock em tempo de execução pelo botão "Modo mock" no header da aplicação (persistido no `localStorage`).

Executando a aplicação

```powershell
npm run dev
# abrir http://localhost:5173
```

Build para produção

```powershell
npm run build
npm run preview
```

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
