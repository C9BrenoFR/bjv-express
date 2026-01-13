# BJV Express 📦

Sistema de gerenciamento de entregas desenvolvido com Laravel e React (Inertia.js).

## 👨‍💻 Equipe do Projeto

| Nome | Matrícula |
|------|-----------|
| Breno Furtado Rosado | 202376003 |
| João Pedro Nascimento da Rocha Daniel | 202376019 |
| Vitor de Souza Reis | 202376036 |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão Mínima |
|------------|---------------|
| PHP | 8.2+ |
| Composer | 2.x |
| Node.js | 18+ |
| npm | 9+ |
| MySQL | 8.0+ |
| Apache/Nginx | - |

### Stack Principal

- **Backend:** Laravel 12
- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **CSS:** Tailwind CSS 4
- **UI Components:** Radix UI, Lucide Icons
- **Roteamento SPA:** Inertia.js

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **PHP 8.2+** com as extensões:
   - `pdo_mysql`
   - `mbstring`
   - `xml`
   - `curl`
   - `zip`

2. **Composer** (gerenciador de dependências PHP)

3. **Node.js 18+** e **npm**

4. **MySQL 8.0+** (servidor de banco de dados)

5. **Apache** ou **Nginx** (para produção)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/C9BrenoFR/bjv-express
cd bjv-express
```

### 2. Instale as dependências PHP

```bash
composer install
```

### 3. Instale as dependências Node.js

```bash
npm install
```

### 4. Configure o ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações de banco de dados:

```env
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

### 5. Gere a chave da aplicação

```bash
php artisan key:generate
```

### 6. Execute as migrations

```bash
php artisan migrate
```
ou para o banco ja ser populado (Isso pode ser feito individualmente no futuro)
```bash
php artisan migrate --seed
```

### 7. (Opcional - caso não tenha populado no passo anterior) Popule o banco com dados de teste

```bash
php artisan db:seed
```

---

## ▶️ Executando o Projeto

### Modo Desenvolvimento (Recomendado)

Execute todos os serviços de uma vez:

```bash
composer dev
```

Este comando inicia simultaneamente:
- 🌐 Servidor Laravel (`php artisan serve`)
- 📋 Queue Worker (`php artisan queue:listen`)
- 📝 Logs em tempo real (`php artisan pail`)
- ⚡ Vite Dev Server (`npm run dev`)

### Modo Manual

Se preferir executar os serviços separadamente:

**Terminal 1 - Backend:**
```bash
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Acesso

Após iniciar, acesse: **http://127.0.0.1:8000**

---

## 🧪 Testes

> ⚠️ **Atenção:** Isso limpará TODO o banco de dados.  
> Para repopular o banco você pode rodar o comando: `php artisan db:seed`

```bash
php artisan test
```

---

## 📁 Estrutura do Projeto

```
bjv-express/
├── app/
│   ├── Http/
│   │   ├── Controllers/    # Controladores da aplicação
│   │   ├── Middleware/     # Middlewares (Admin, Deliver, Operator)
│   │   └── Requests/       # Form Requests
│   ├── Models/             # Models Eloquent
│   └── Helpers/            # Funções auxiliares
├── database/
│   ├── factories/          # Factories para testes
│   ├── migrations/         # Migrations do banco
│   └── seeders/            # Seeders
├── resources/
│   ├── js/                 # Componentes React/TypeScript
│   ├── css/                # Estilos (Tailwind)
│   └── views/              # Views Blade (root template)
├── routes/
│   ├── web.php             # Rotas principais
│   ├── auth.php            # Rotas de autenticação
│   └── settings.php        # Rotas de configurações
└── public/                 # Assets públicos
```

---

## 🔧 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `composer dev` | Inicia o ambiente de desenvolvimento |
| `php artisan migrate` | Executa as migrations |
| `php artisan migrate:fresh --seed` | Recria o banco e popula com dados |
| `php artisan db:seed` | Popula o banco com dados de teste |
| `php artisan cache:clear` | Limpa o cache da aplicação |
| `php artisan route:list` | Lista todas as rotas |
| `npm run dev` | Inicia o Vite em modo dev |
| `npm run build` | Compila os assets para produção |
| `npm run lint` | Verifica o código com ESLint |
| `npm run format` | Formata o código com Prettier |
| `npm run types` | Verifica tipos TypeScript |

---

## 👥 Tipos de Usuário

O sistema possui três tipos de usuário com diferentes permissões:

- **Admin:** Acesso total ao dashboard, gerenciamento de pacotes e funcionários
- **Operador:** Criação e confirmação de pacotes
- **Entregador:** Visualização e atualização de entregas
