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

    // Si todo es válido, puedes proceder con el envío del formulario o acciones adicionales
    alert("Formulario enviado exitosamente");
    // Aquí normalmente iría el código para enviar el formulario a un servidor.
    return true;
}
