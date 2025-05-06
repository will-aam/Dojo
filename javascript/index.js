document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    login();
  });

  passwordInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      login();
    }
  });

  function login() {
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "professor" && password === "senha123") {
      errorMessage.classList.add("hidden");
      usernameInput.setAttribute("aria-invalid", "false");
      passwordInput.setAttribute("aria-invalid", "false");
      window.location.href = "professor.html";
    } else {
      errorMessage.classList.remove("hidden");
      usernameInput.setAttribute("aria-invalid", "true");
      passwordInput.setAttribute("aria-invalid", "true");
    }
  }
});
