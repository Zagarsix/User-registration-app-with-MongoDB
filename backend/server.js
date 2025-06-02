const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

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
