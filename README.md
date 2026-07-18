# FranchEasy API

API REST multi-tenant para aplicações comerciais, com foco inicial em **delivery**.

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) no curso de **Tecnologias da Informação e Comunicação** da **Universidade Federal de Santa Catarina (UFSC)** — Campus Araranguá.

| | |
| --- | --- |
| **Autora** | Natalia Bortoli Vieira |
| **Orientador** | Prof. Dr. Fabrício Herpich |
| **Ano** | 2024 |
| **Monografia** | [Repositório UFSC](https://repositorio.ufsc.br/handle/123456789/262497) |

---

## Sobre o projeto

O desenvolvimento ágil de software comercial costuma ser caro e complexo, em especial na camada de backend. Este projeto propõe um **backend genérico** capaz de entregar, via API REST, recursos reutilizáveis para aplicações comerciais — começando pelo domínio de **entrega de produtos (delivery)**, cujas funcionalidades (produtos, cardápios, categorias, pedidos, entregas) também se aplicam a outros contextos, como e-commerce.

A solução adota **arquitetura multi-tenant**: cada organização (tenant) possui um schema isolado no PostgreSQL, compartilhando a mesma infraestrutura sem misturar dados.

A metodologia utilizada foi a **Design Science Research Methodology (DSRM)**.

### Título acadêmico

> *Desenvolvimento de um Sistema de Backend Genérico para Aplicações de Software Comerciais*

---

## Domínio e atores

Hierarquia do domínio:

```
Sistema
 └── Organização (tenant / franquia)
      └── Loja(s)
           ├── Catálogo (produtos, categorias, add-ons, combos)
           ├── Pedidos e entregas
           ├── Caixas e formas de pagamento
           └── Usuários e papéis
```

| Perfil | Escopo |
| --- | --- |
| **Admin do sistema** | Gerencia organizações e usuários globais |
| **Admin da organização** | Gerencia lojas e usuários da organização |
| **Admin / usuário da loja** | Opera catálogo, pedidos, delivery, caixas e papéis |
| **Cliente** | Consulta lojas, monta sacola e envia pedidos |

### Fluxo de pedido (resumo)

1. Cliente monta a **sacola** (`bag`) com itens, opções e adicionais  
2. Envia o **pedido** (`PENDING`)  
3. A loja **aceita** ou **recusa**  
4. Pedido pode ir para **entrega** (`SHIPPING`)  
5. Pedido é **finalizado** (`FINISHED`)

---

## Stack tecnológica

| Camada | Tecnologia |
| --- | --- |
| Runtime | Node.js |
| Linguagem | TypeScript |
| Framework | NestJS |
| ORM | TypeORM |
| Banco | PostgreSQL (schemas por tenant) |
| Auth | Passport + JWT (local + bearer) |
| Validação | class-validator / class-transformer |
| Infra local | Docker Compose |

---

## Arquitetura

### Módulos da API

| Módulo | Prefixo | Responsabilidade |
| --- | --- | --- |
| **Auth** | `/auth` | Login, usuário atual e papéis |
| **Admin** | `/admin` | Organizações e usuários do sistema |
| **Organization** | `/organization` | Lojas e usuários da organização |
| **Store** | `/store/:storeId` | Catálogo, pedidos, delivery, caixas, papéis |
| **Customer** | `/customer` | Conta, lojas, sacola e pedidos do cliente |

### Multi-tenancy

- Cada **organização** criada gera um **schema** PostgreSQL próprio  
- O tenant da requisição é identificado pelo header `x-api-token` (ID da organização)  
- O middleware troca o `search_path` para isolar os dados do tenant  

### Autorização

Controle por **papéis** (`SystemRoles`) e **permissões** granulares (`Actions`), por exemplo: criar produto, aceitar pedido, abrir/fechar delivery, gerenciar usuários.

### Estrutura do código

```
src/
├── entities/          # Entidades TypeORM
├── repositories/      # Acesso a dados
├── services/
│   ├── domains/       # Regras de negócio
│   ├── application/   # Tenant, request scope, filtros
│   └── permissions/   # Papéis e ações
├── modules/           # Controllers NestJS (admin, org, store, customer, auth)
├── middlewares/       # Escopo da request, tratamento de erros
├── infra/postgres/    # Migrations
└── main.ts            # Bootstrap (porta 3333)
```

---

## Pré-requisitos

- Node.js 18+
- npm
- Docker e Docker Compose (para o PostgreSQL)

---

## Como rodar

### 1. Subir o banco

```bash
docker compose up -d
```

Isso sobe um PostgreSQL na porta `5432` (usuário/senha padrão do compose: `root`/`root`).

Crie o banco, se ainda não existir:

```bash
docker exec -it $(docker ps -qf "ancestor=postgres:10.7-alpine") \
  psql -U root -c 'CREATE DATABASE "francheasy-dev";'
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz (ou copie de `.env.example`):

```env
JWT_SECRET=secret
JWT_KEY=secret

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=francheasy-dev
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Rodar migrations

```bash
npm run migrate
```

### 5. Subir a API

```bash
# desenvolvimento (watch)
npm run start:dev

# produção
npm run build
npm run start:prod
```

A API sobe em **http://localhost:3333**.

---

## Autenticação e headers

| Header | Uso |
| --- | --- |
| `Authorization: Bearer <token>` | JWT após login em `POST /auth/login` |
| `x-api-token` | ID da organização (tenant) — necessário para rotas multi-tenant |

Endpoints públicos usam o decorator `@IsPublic()` (ex.: login).

---

## Scripts úteis

| Comando | Descrição |
| --- | --- |
| `npm run start:dev` | API em modo watch |
| `npm run build` | Compila para `dist/` |
| `npm run migrate` | Executa migrations pendentes |
| `npm run gmigration -- --mn=NomeDaMigration` | Gera uma nova migration |
| `npm run lint` | ESLint |
| `npm test` | Testes unitários |
| `npm run test:e2e` | Testes end-to-end |

---

## Convenções de código

| Elemento | Estilo | Exemplo |
| --- | --- | --- |
| Pastas | snake_case | `user_role` |
| Arquivos | kebab-case | `user-role.entity.ts` |
| Classes | PascalCase | `UserRole` |
| Variáveis / funções | camelCase | `userRole` |

---

## Documentação acadêmica

O trabalho completo (contexto, requisitos, modelagem, demonstração e resultados) está disponível no repositório institucional da UFSC:

**https://repositorio.ufsc.br/handle/123456789/262497**

---

## Licença

Distribuído sob a licença [MIT](LICENSE).
