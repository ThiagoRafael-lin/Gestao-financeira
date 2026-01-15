# 💰 Sistema de Gestão Financeira Full Stack

Este é um sistema completo de controle de finanças pessoais, permitindo ao usuário gerenciar receitas e despesas com cálculos de saldo em tempo real. Desenvolvido para demonstrar a integração entre um backend robusto em Spring Boot e um frontend moderno em React.

## 🚀 Tecnologias Utilizadas

### Backend
* **Java 17**
* **Spring Boot 3**
* **Spring Data JPA**: Persistência de dados.
* **H2 Database**: Banco de dados em memória para testes rápidos.
* **Lombok**: Produtividade no código Java.

### Frontend
* **React.js**
* **Axios**: Consumo da API REST.
* **Lucide React**: Biblioteca de ícones.
* **CSS3**: Estilização customizada e responsiva.

## 📋 Funcionalidades
- [x] Cadastro de Transações (Receitas e Despesas).
- [x] Listagem em tempo real com formatação de moeda (BRL).
- [x] Exclusão de registros com confirmação.
- [x] Dashboard com cards de Entradas, Saídas e Saldo Total.
- [x] Layout moderno e responsivo.

## 🔧 Como Executar o Projeto

### 1. Pré-requisitos
* Java 17 ou superior instalado.
* Node.js e NPM instalados.

### 2. Rodando o Backend (Spring Boot)
1. Navegue até a pasta raiz do projeto.
2. Execute o comando:
   ```bash
   ./mvnw spring-boot:run
