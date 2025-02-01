function validateForm(event) {
    event.preventDefault(); // Evita el envío del formulario si hay errores

    // Obtener valores de los campos
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validación de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const passwordError = document.getElementById("password-error");

    if (!passwordRegex.test(password)) {
        passwordError.classList.remove("hidden");
        return false;
    } else {
        passwordError.classList.add("hidden");
    }
    
    // Redirigir si todo es válido
    window.location.href = "pantallainicial.html";
}

// script redirección
function navigateTo(page) {
    window.location.href = page;
}