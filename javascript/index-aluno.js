document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const cpf = document.getElementById("username").value;
    const senha = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Validação básica
    if (!cpf || !senha) {
      errorMessage.textContent = "CPF e senha são obrigatórios.";
      errorMessage.classList.remove("hidden");
      return;
    }

    try {
      const response = await fetch("/login-aluno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login.");
      }

      if (data.success) {
        errorMessage.classList.add("hidden");
        window.location.href = "/aluno.html"; // Redirect on success
      }
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");
    }
  });

// Login com Enter
document
  .getElementById("password")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    }
  });
