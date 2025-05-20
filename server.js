const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const PORT = 3000;

// Banco de dados SQLite
const db = new sqlite3.Database("db/alunos.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

// Cria a tabela alunos se não existir
db.run(
  `
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf TEXT NOT NULL UNIQUE,
    telefone TEXT NOT NULL,
    aniversario TEXT,
    cep TEXT NOT NULL,
    endereco TEXT NOT NULL,
    complemento TEXT,
    bairro TEXT NOT NULL,
    senha TEXT NOT NULL,
    modalidade TEXT NOT NULL
  )
`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela alunos:", err.message);
    } else {
      console.log("Tabela alunos criada ou já existe.");
    }
  }
);

// Middleware para arquivos estáticos e formulários
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para receber formulário de cadastro
app.post("/cadastro", (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    aniversario,
    cep,
    endereco,
    complemento,
    bairro,
    senha,
    modalidade,
  } = req.body;

  // Validação básica dos campos obrigatórios
  if (
    !nome ||
    !email ||
    !cpf ||
    !telefone ||
    !cep ||
    !endereco ||
    !bairro ||
    !senha ||
    !modalidade
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Todos os campos obrigatórios devem ser preenchidos.",
      });
  }

  // Inserção no banco de dados
  db.run(
    `
    INSERT INTO alunos (
      nome, email, cpf, telefone, aniversario,
      cep, endereco, complemento, bairro,
      senha, modalidade
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nome,
      email,
      cpf,
      telefone,
      aniversario || null,
      cep,
      endereco,
      complemento || null,
      bairro,
      senha, // TODO: Implementar hash de senha
      modalidade,
    ],
    (err) => {
      if (err) {
        console.error("Erro ao inserir aluno:", err.message);
        if (err.message.includes("UNIQUE constraint failed")) {
          return res
            .status(400)
            .json({ success: false, message: "E-mail ou CPF já cadastrado." });
        }
        return res
          .status(500)
          .json({ success: false, message: "Erro ao cadastrar aluno." });
      }
      res.json({ success: true, redirect: "/index.html" });
    }
  );
});

// Rota de login do aluno
app.post("/login-aluno", (req, res) => {
  const { cpf, senha } = req.body;

  // Validação básica
  if (!cpf || !senha) {
    return res
      .status(400)
      .json({ success: false, message: "CPF e senha são obrigatórios." });
  }

  db.get(
    "SELECT * FROM alunos WHERE cpf = ? AND senha = ?",
    [cpf, senha],
    (err, row) => {
      if (err) {
        console.error("Erro ao processar login:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Erro no servidor." });
      }
      if (row) {
        res.json({ success: true, aluno: row });
      } else {
        res
          .status(401)
          .json({ success: false, message: "CPF ou senha incorretos." });
      }
    }
  );
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Fecha o banco de dados ao encerrar o processo
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Erro ao fechar o banco de dados:", err.message);
    }
    console.log("Conexão com o banco de dados fechada.");
    process.exit(0);
  });
});
