const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const { count } = require('console');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

//Conexión a MongoDB para que se cree automáticamente
mongoose.connect('mongodb://localhost:27017/user-registration-db')
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('No se ha podido establecer la conexión a MongoDB:', err));

// Esquema del usuario
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        minlength: [4, 'Este campo debe tener al menos 4 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Formato de correo inválido']
    },
    password: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        minlength: [6, 'Este campo debe tener al menos 6 caracteres']
    }
}, {
    timestamps: true // Agrega createdAt y updateAt automáticamente
});

const User = mongoose.model('User', userSchema);

// Función de validación personalizada
const validateUserData = (fullName, email, password) => {
    const errors = [];

    if (!fullName || fullName.trim().length < 4) {
        errors.push('El nombre completo debe tener al menos 4 caracteres');
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('El formato del correo electrónico no es válido');
    }

    if (!password || password.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    return errors;
};

//-- RUTAS -- //

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Página de usuarios
app.get('/users', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'users.html'));
});

// Registro de usuario
app.post('/api/register', async (req,res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validaciones
        const validationErrors = validateUserData(fullName, email, password);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errors: validationErrors
            });
        }

        // Verifica si el usuario existe
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Este correo electrónico ya está registrado'
            });
        }

        // Hashea la contraseña
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crea nuevo usuario
        const newUser = new User ({
            fullName: fullName.trim(),
            email: email.toLowerCase(),
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Usuario registrado existosamente',
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error del servidor'
        });
    }
});

// Obtiene lista de usuarios 
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, {
            password: 0, //excluye la contraseña de la respuesta
            __v: 0 // excluye versión de mongoose
        }).sort({ createdAt: -1}); // ordena por fecha de creación

        res.json({
            success: true,
            count: users.length,
            users: users
        });

    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuario'
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Formulario de registro: http://localhost:${PORT}`);
    console.log(`Lista de usuarios: http://localhost:${PORT}/users`);
});