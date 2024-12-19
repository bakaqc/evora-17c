# Evora Development Guidelines

## Table of Contents

- [Evora Development Guidelines](#evora-development-guidelines)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Tools](#tools)
    - [Extensions](#extensions)
  - [Commit Conventions](#commit-conventions)
  - [Branch Naming Conventions](#branch-naming-conventions)

## Requirements

### Tools

- **Environment:** `Node.js v20.18.1`  
  You can download it from [here](https://nodejs.org/en/download/).

- **Package Manager:** `pnpm`  
  To install it, run `npm i -g pnpm` after installing Node.js.  
  Ensure you install `pnpm v9`.

- **Code Editor:** `Visual Studio Code`  
  You can download it from [here](https://code.visualstudio.com/).

### Extensions

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Commit Conventions

Format: `<type>: <subject>`

**Conventions:**

- `add`: Add a new code or feature.
- `update`: Update existing code or functionality.
- `fix`: Fix a bug, issue, or error, including tool scan warnings.
- `docs`: Update or add documentation.
- `feat`: Add a new feature. (Usually used in PR titles.)
- `refactor`: Refactor existing code without adding new functionality.
- `delete`: Remove existing code or features.

**Examples:**

- `add: add user authentication`
- `update: update dashboard layout`
- `fix: fix login issue`
- `docs: update README`
- `feat: implement user notifications`
- `refactor: optimize database queries`
- `delete: remove deprecated API endpoints`

> **Note:** Following these conventions ensures a clean and easy-to-read commit history.

## Branch Naming Conventions

To maintain consistency and clarity in the development process, we follow these branch naming conventions:

- **feature/**: For branches related to new features.  
  Example: `feature/user-authentication`

- **bugfix/**: For branches related to bug fixes.  
  Example: `bugfix/fix-login-error`

- **hotfix/**: For urgent bug fixes in production.  
  Example: `hotfix/security-patch`

- **release/**: For preparing new releases.  
  Example: `release/v1.2.0`

### General Rules

1. Use lowercase letters and hyphens (`-`) to separate words.  
   Example: `feature/add-user-registration`

2. Avoid special characters and spaces in branch names.

3. Keep branch names concise yet descriptive to reflect their purpose.

> **Note:** Following these rules helps the team work efficiently and maintain clear project history.
