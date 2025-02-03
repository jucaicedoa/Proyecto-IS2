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

// scripts inventario 
 // Función para cargar contenido según el botón seleccionado
 function loadContent(content) {
    const contentArea = document.getElementById('main-content-area');
    if (content === 'agregar') {
        contentArea.innerHTML = `
           <div class="bg-white p-4 rounded-lg shadow-md text-center">
    <div class="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 class="text-xl font-bold text-center mb-2">Crear Nuevo Producto</h2>

        <form method="POST" action="http://localhost:3000/crear-producto">

    <div class="mb-2">
        <label for="id" class="block text-gray-700 font-bold mb-1">ID del Producto (opcional)</label>
        <input type="text" id="id" name="id" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>

    <div class="mb-2">
        <label for="nombre" class="block text-gray-700 font-bold mb-1">Nombre del Producto</label>
        <input type="text" id="nombre" name="nombre" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
    </div>

    <div class="mb-2">
        <label for="descripcion" class="block text-gray-700 font-bold mb-1">Descripción</label>
        <textarea id="descripcion" name="descripcion" rows="2" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
    </div>

    <div class="mb-2">
        <label for="precio" class="block text-gray-700 font-bold mb-1">Precio</label>
        <input type="number" id="precio" name="precio" step="0.01" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
    </div>

    <div class="mb-2">
        <label for="cantidad" class="block text-gray-700 font-bold mb-1">Cantidad en Inventario</label>
        <input type="number" id="cantidad" name="cantidad" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
    </div>

    <div class="mb-2">
        <label for="categoria" class="block text-gray-700 font-bold mb-1">Categoría</label>
        <select id="categoria" name="categoria" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="hogar">Hogar</option>
            <option value="alimentos">Alimentos</option>
        </select>
    </div>

    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-all">Crear Producto</button>
</form>

    </div>
</div>


        `;
    } else if (content === 'listar') {
        contentArea.innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow-md text-center">
                <div class="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
                    <h2 class="text-xl font-bold text-center mb-4">Lista de Productos</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr class="bg-blue-600 text-white">
                                    <th class="py-2 px-4 border">ID</th>
                                    <th class="py-2 px-4 border">Nombre</th>
                                    <th class="py-2 px-4 border">Precio</th>
                                    <th class="py-2 px-4 border">Cantidad</th>
                                    <th class="py-2 px-4 border">Categoría</th>
                                    <th class="py-2 px-4 border">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="product-list">
                                <!-- Aquí se insertarán los productos dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        `;   
        listarProductos();
    } else if (content === 'actualizar') {
        contentArea.innerHTML = `
            <div class="bg-white p-4 rounded-lg shadow-md text-center">
                <div class="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
                    <h2 class="text-xl font-bold text-center mb-4">Actualizar Producto</h2>
                    
                    <!-- Buscar Producto por ID -->
                    <div class="mb-3">
                        <label for="producto-id" class="block text-gray-700 font-bold mb-1">ID del Producto</label>
                        <input type="number" id="producto-id" name="producto-id" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <button onclick="buscarProducto()" class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-all">Buscar Producto</button>

                    <!-- Formulario para actualizar -->
                    <form id="form-actualizar" class="hidden mt-4">
                        <div class="mb-3">
                            <label for="nombre" class="block text-gray-700 font-bold mb-1">Nombre del Producto</label>
                            <input type="text" id="nombre" name="nombre" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="descripcion" class="block text-gray-700 font-bold mb-1">Descripción</label>
                            <textarea id="descripcion" name="descripcion" rows="2" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                        </div>
                        
                        <div class="mb-3">
                            <label for="precio" class="block text-gray-700 font-bold mb-1">Precio</label>
                            <input type="number" id="precio" name="precio" step="0.01" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="cantidad" class="block text-gray-700 font-bold mb-1">Cantidad en Inventario</label>
                            <input type="number" id="cantidad" name="cantidad" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="categoria" class="block text-gray-700 font-bold mb-1">Categoría</label>
                            <select id="categoria" name="categoria" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <option value="electronica">Electrónica</option>
                                <option value="ropa">Ropa</option>
                                <option value="hogar">Hogar</option>
                                <option value="alimentos">Alimentos</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-all">Actualizar Producto</button>
                    </form>
                </div>
            </div>
        `;
    } else if (content === 'eliminar') {
        contentArea.innerHTML = `
             <div class="bg-white p-4 rounded-lg shadow-md text-center">
                <div class="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
                    <h2 class="text-xl font-bold text-center mb-4 text-red-600">Eliminar Producto</h2>
                    
                    <!-- Buscar Producto por ID -->
                    <div class="mb-3">
                        <label for="producto-id" class="block text-gray-700 font-bold mb-1">ID del Producto</label>
                        <input type="number" id="producto-id" name="producto-id" class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required>
                    </div>
                    <button  onclick="eliminarProducto()" class="w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-all">Eliminar Producto</button>

                    
                </div>
            </div>
        `;
    } else if (content === 'general') {
        contentArea.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div class="bg-white p-4 rounded-lg shadow-md text-center font-bold flex items-center justify-center">
       <img src="/assets/img/inventario/productos.png" alt="Productos" class="w-8 h-8 mr-2"> Productos <span class="text-gray-600 ml-2">xxx</span> </div>

        <div class="bg-white p-4 rounded-lg shadow-md text-center font-bold flex items-center justify-center">
        <img src="/assets/img/inventario/inventario.png" alt="Categorias" class="w-8 h-8 mr-2"> Inventario <span class="text-gray-600 ml-2">xxx</span> </div>
       
        <div class="bg-white p-4 rounded-lg shadow-md text-center font-bold flex items-center justify-center">
        <img src="/assets/img/inventario/etiqueta.png" alt="Categorias" class="w-8 h-8 mr-2"> Categorias <span class="text-gray-600 ml-2">xxx</span> </div>

        <div class="bg-white p-4 rounded-lg shadow-md text-center font-bold flex items-center justify-center">
        <img src="/assets/img/inventario/disminucion.png" alt="Categorias" class="w-8 h-8 mr-2"> Stock Bajo <span class="text-gray-600 ml-2">xxx</span> </div>
    </div>
        `;
    }
}

function buscarProducto() {
    const productoId = document.getElementById('producto-id').value;
    if (productoId) {
        // Simulación: Cargar datos del producto (esto se debería conectar con una API o base de datos)
        document.getElementById('nombre').value = "Producto de Ejemplo";
        document.getElementById('descripcion').value = "Descripción de prueba";
        document.getElementById('precio').value = "100.00";
        document.getElementById('cantidad').value = "10";
        document.getElementById('categoria').value = "electronica";
        
        // Mostrar formulario de actualización
        document.getElementById('form-actualizar').classList.remove('hidden');
    }
}




document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
        alert("Login exitoso");
        window.location.href = "pantallainicial.html";
    } else {
        alert("Error: " + data.message);
    }
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita la redirección del formulario

    const formData = new FormData();
    formData.append('id', document.querySelector('#id').value);  
    formData.append('nombre', document.querySelector('#nombre').value);
    formData.append('descripcion', document.querySelector('#descripcion').value);
    formData.append('precio', document.querySelector('#precio').value);
    formData.append('cantidad', document.querySelector('#cantidad').value);
    formData.append('categoria', document.querySelector('#categoria').value);

    // Usa fetch para enviar la solicitud POST
    fetch('/crear-producto', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      // Muestra un mensaje de éxito sin redirigir
      alert(data);
      // Opcional: limpiar el formulario si quieres resetearlo después de éxito
      document.querySelector('form').reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al crear el producto.');
    });
});


function listarProductos() {
    fetch('http://localhost:3000/listar-productos')  // Conectar al servidor
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';  // Limpiar la tabla

            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="py-2 px-4 border">${product.id}</td>
                    <td class="py-2 px-4 border">${product.nombre}</td>
                    <td class="py-2 px-4 border">${product.precio}</td>
                    <td class="py-2 px-4 border">${product.cantidadinventario}</td>
                    <td class="py-2 px-4 border">${product.categoria}</td>
                    <td class="py-2 px-4 border">
                        <button onclick="loadContent('actualizar', ${product.id})" class="bg-green-500 text-white px-4 py-1 rounded">Actualizar</button>
                        <button onclick="loadContent('eliminar', ${product.id})" class="bg-red-500 text-white px-4 py-1 rounded">Eliminar</button>
                    </td>
                `;
                productList.appendChild(row);
            });
        })
        .catch(error => console.error('Error al listar productos:', error));
}

function eliminarProducto() {
    const productoId = document.getElementById('producto-id').value;
    
    if (!productoId) {
        alert("Por favor, ingrese un ID de producto válido.");
        return;
    }

    // Hacer una solicitud DELETE al servidor con el ID del producto
    fetch(`http://localhost:3000/eliminar-producto/${productoId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            // Si la respuesta no es 2xx (exitoso), lanza un error
            throw new Error('Error en la eliminación del producto');
        }
        return response.json();  // Si la respuesta es correcta, parsea el JSON
    })
    .then(data => {
        if (data.success) {
            alert("Producto eliminado correctamente.");
            document.getElementById('producto-id').value = '';  // Limpiar el input
        } else {
            alert(data.message);  // Mostrar el mensaje de error
        }
    })
    .catch(error => {
        console.error('Error al eliminar producto:', error);
        alert('Hubo un error al eliminar el producto.');
    });
}
