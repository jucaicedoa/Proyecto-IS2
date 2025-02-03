const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Usar body-parser para manejar JSON en el body

// Conectar a la base de datos SQLite
const db = new sqlite3.Database("./usuarios_inventicash.db", err => {
    if (err) {
        console.error("❌ Error al conectar a SQLite:", err.message);
    } else {
        console.log("✅ Conectado a la base de datos SQLite");
    }
});

// Endpoint para el login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Faltan credenciales" });
    }

    const query = "SELECT * FROM usuario WHERE usuario = ?";

    db.get(query, [username], (err, user) => {
        if (err) {
            console.error("❌ Error en la consulta SQLite:", err);
            return res.status(500).json({ success: false, message: "Error al consultar la base de datos" });
        }

        if (user) {
            if (password === user.password) {  
                res.json({ success: true, message: "Login exitoso" });
            } else {
                res.json({ success: false, message: "Contraseña incorrecta" });
            }
        } else {
            res.json({ success: false, message: "Usuario no encontrado" });
        }
    });
});

// Inicializar base de datos SQLite para productos
const db1 = new sqlite3.Database('inventarioInventicash.db', err => {
    if (err) {
        console.error("❌ Error al conectar a SQLite inventario:", err.message);
    } else {
        console.log("✅ Conectado a la base de datos SQLite inventario");
    }
});


// Middleware para procesar formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Verificar si la tabla "Producto" existe, si no, crearla
db1.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Producto'", (err, row) => {
    if (err) {
        console.error("❌ Error al verificar la tabla Producto:", err);
    } else if (!row) {
        // Si la tabla no existe, crearla
        db1.run(`CREATE TABLE IF NOT EXISTS Producto (
            id INTEGER PRIMARY KEY,
            nombre TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            precio REAL NOT NULL,
            cantidadinventario INTEGER NOT NULL,
            categoria TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error("❌ Error al crear la tabla Producto:", err);
            } else {
                console.log("✅ Tabla Producto creada.");
            }
        });
    }
});

// Ruta para crear un nuevo producto
app.post('/crear-producto', (req, res) => {
    const { id, nombre, descripcion, precio, cantidad, categoria } = req.body;

    // Inserción de los datos en la base de datos
    const stmt = db1.prepare('INSERT INTO Producto (id, nombre, descripcion, precio, cantidadinventario, categoria) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(id, nombre, descripcion, precio, cantidad, categoria, function(err) {
        if (err) {
            console.error("❌ Error al crear el producto:", err);
            return res.status(500).send('Error al crear el producto.');
        }
        res.send('Producto creado con éxito.');
    });
    stmt.finalize();
});

// Ruta para eliminar un producto por ID
app.delete('/eliminar-producto/:id', (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM Producto WHERE id = ?';

    db1.run(query, [id], function (err) {
        if (err) {
            console.error("❌ Error al eliminar el producto:", err.message);
            return res.status(500).json({ success: false, message: 'Error al eliminar el producto' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        res.json({ success: true, message: 'Producto eliminado correctamente' });
    });
});

app.delete('/eliminar-producto/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Producto WHERE id = ?';

    db1.run(query, [id], function(err) {
        if (err) {
            console.error("❌ Error al eliminar el producto:", err.message);
            return res.status(500).json({ success: false, message: 'Error al eliminar el producto' });
        }

        // Si se eliminó alguna fila, devuelve éxito
        if (this.changes > 0) {
            res.json({ success: true, message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
    });
});



// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});
