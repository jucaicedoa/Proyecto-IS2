// Array para almacenar los egresos registrados
let egresos = [];

document.getElementById('btnInicio').addEventListener('click', function() {
    window.location.href = '../index.html'; // Cambia 'index.html' a la URL deseada
});

document.getElementById('btnSalir').addEventListener('click', function() {
    window.location.href = 'inventario.html'; // Cambia 'inventario.html' a la URL deseada
});

// Función que maneja el evento de guardar un nuevo egreso
document.getElementById('guardar').addEventListener('click', function() {
    // Obtener los valores ingresados por el usuario
    const fecha = document.getElementById('fecha').value;
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('descripcion').value;
    const monto = document.getElementById('monto').value;

    // Validar que los campos no estén vacíos
    if (fecha === '' || categoria === '' || descripcion === '' || monto === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    // Validar que el monto sea un número mayor a 0
    if (parseFloat(monto) <= 0) {
        alert('El monto debe ser mayor a cero.');
        return;
    }
    // Crear un nuevo objeto de egreso
    const nuevoEgreso = {
        fecha: fecha,
        categoria: categoria,
        descripcion: descripcion,
        monto: parseFloat(monto).toFixed(2) // Convertir monto a número con dos decimales
    };

    // Agregar el nuevo egreso al array de egresos
    egresos.push(nuevoEgreso);

    // Actualizar la tabla de egresos
    actualizarTabla();

    // Limpiar los campos del formulario
    document.getElementById('fecha').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('monto').value = '';
});

// Función que actualiza la tabla con los egresos registrados
function actualizarTabla() {
    const listaEgresos = document.getElementById('lista-egresos');
    listaEgresos.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos registros

    // Iterar sobre el array de egresos y generar filas en la tabla
    egresos.forEach((egreso, index) => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td class="border p-2">${egreso.fecha}</td>
            <td class="border p-2">${egreso.categoria}</td>
            <td class="border p-2">${egreso.descripcion}</td>
            <td class="border p-2">${egreso.monto}</td>
        `;

        // Agregar la fila a la tabla
        listaEgresos.appendChild(fila);
    });
}
