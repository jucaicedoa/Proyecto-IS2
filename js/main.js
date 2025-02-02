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

//Scripts Registro Venta
let productos = [];

document.getElementById("registrarVentaBtn").addEventListener("click", () => {
    document.getElementById("ventaFormContainer").classList.toggle("hidden");
});

function agregarProducto() {
    const codigo = document.getElementById("codigoProducto").value;
    const descripcion = document.getElementById("descripcionProducto").value || "N/A";
    const cantidad = parseInt(document.getElementById("cantidadProducto").value) || 0;
    const precio = 4000; // Precio fijo o calculado.

    if (!codigo || cantidad <= 0) {
        alert("Por favor ingrese un código válido y una cantidad mayor a 0.");
        return;
    }

    const producto = { codigo, descripcion, cantidad, precio };
    productos.push(producto);
    actualizarTabla();

    // Limpiar campos de entrada
    document.getElementById("codigoProducto").value = "";
    document.getElementById("descripcionProducto").value = "";
    document.getElementById("cantidadProducto").value = "";
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarTabla();
}

function actualizarTabla() {
    const tbody = document.getElementById("productosBody");
    tbody.innerHTML = "";
    let totalPrecio = 0;

    productos.forEach((producto, index) => {
        totalPrecio += producto.cantidad * producto.precio;

        const row = `<tr>
            <td class='border px-4 py-2'>${producto.codigo}</td>
            <td class='border px-4 py-2'>${producto.descripcion}</td>
            <td class='border px-4 py-2'>${producto.cantidad}</td>
            <td class='border px-4 py-2'>${producto.precio}</td>
            <td class='border px-4 py-2 text-center'>
                <button onclick="eliminarProducto(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">-</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });

    document.getElementById("totalPrecio").innerText = totalPrecio;
}

function guardarVenta() {
    const numero = document.getElementById("numero").value;
    const fecha = document.getElementById("fecha").value;
    const cliente = document.getElementById("cliente").value;
    const observaciones = document.getElementById("observaciones").value;

    if (!numero || !fecha || !cliente) {
        alert("Por favor complete todos los campos obligatorios.");
        return;
    }

    const venta = {
        numero,
        fecha,
        cliente,
        observaciones,
        productos,
        total: document.getElementById("totalPrecio").innerText
    };

    console.log("Venta guardada:", venta);
    alert("Venta guardada correctamente.");
    document.getElementById("ventaForm").reset();
    productos = [];
    actualizarTabla();
}