function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length > 9) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
  } else if (cpf.length > 6) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
  } else if (cpf.length > 3) {
    cpf = cpf.replace(/(\d{3})(\d{1,3})$/, "$1.$2");
  }
  return cpf;
}

function formatTelefone(tel) {
  tel = tel.replace(/\D/g, "");
  if (tel.length > 10) {
    tel = tel.replace(/(\d{2})(\d{5})(\d{1,4})$/, "($1) $2-$3");
  } else if (tel.length > 6) {
    tel = tel.replace(/(\d{2})(\d{1,5})$/, "($1) $2");
  } else if (tel.length > 2) {
    tel = tel.replace(/(\d{2})(\d{1,4})$/, "($1) $2");
  }
  return tel;
}

function formatCEP(cep) {
  cep = cep.replace(/\D/g, "");
  if (cep.length > 5) {
    cep = cep.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
  }
  return cep;
}

document.getElementById("cpf").addEventListener("input", function () {
  this.value = formatCPF(this.value);
});

document.getElementById("telefone").addEventListener("input", function () {
  this.value = formatTelefone(this.value);
});

document.getElementById("cep").addEventListener("input", function () {
  this.value = formatCEP(this.value);
});

function cadastrarAluno(event) {
  event.preventDefault(); // Prevent default form submission
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const aniversario = document.getElementById("aniversario").value;
  const cep = document.getElementById("cep").value;
  const endereco = document.getElementById("endereco").value;
  const complemento = document.getElementById("complemento").value;
  const bairro = document.getElementById("bairro").value;
  const senha = document.getElementById("senha").value;
  const modalidade = document.getElementById("modalidade").value;
  const errorMessage = document.getElementById("error-message");

  if (
    nome &&
    email &&
    cpf &&
    telefone &&
    cep &&
    endereco &&
    bairro &&
    senha &&
    modalidade
  ) {
    errorMessage.style.display = "none";

    // Send data to the server
    fetch("/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text();
      })
      .then(() => {
        window.location.href = "/index.html"; // Redirect on success
      })
      .catch((error) => {
        console.error("Erro ao cadastrar:", error);
        errorMessage.textContent = error.message || "Erro ao cadastrar aluno.";
        errorMessage.style.display = "block";
      });
  } else {
    errorMessage.textContent =
      "Todos os campos obrigatórios devem ser preenchidos.";
    errorMessage.style.display = "block";
  }
}

// Attach event listener to form submission
document.querySelector("form").addEventListener("submit", cadastrarAluno);

// Cadastro com Enter
document.getElementById("senha").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    cadastrarAluno(event);
  }
});
