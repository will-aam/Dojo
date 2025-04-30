document.addEventListener("DOMContentLoaded", function () {
  // Evento de login com Enter
  document
    .getElementById("password")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        login();
      }
    });

  // Botão já chama login via onclick no HTML
});

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (username === "professor" && password === "senha123") {
    errorMessage.style.display = "none";
    alert("Login bem-sucedido!");
    // window.location.href = 'dashboard.html';
  } else {
    errorMessage.style.display = "block";
  }
}
