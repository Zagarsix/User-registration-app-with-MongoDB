# User registration Mini-app

Aplicación fullstack de registro de usuarios con validación en tiempo real y persistencia en base de datos MongoDB.

**Stack Tecnológico:**
- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Node.js + Express.js
- Base de datos: MongoDB + Mongoose
- Seguridad: bcrypt.js para hash de contraseñas

## Características

- validación de formularios en tiempo real (cliente y servidor).
- Cifrado seguro de contraseñas con bcrypt.
- Mensajes de error personalizados.
- Diseño responsive y moderno.
- Prevención de usuarios duplicados.
- Manejo robusto de errores.
- Base de datos MongoDb se crea automáticamente.
- Vista de Lista de usuarios registrados.


## Cómo inicializar la app

1. Clonar repositorio:
    $ git clone https://github.com/Zagarsix/User-registration-app-with-MongoDB.git

2. Instalar el paquete npm:
    $ npm install

3. Iniciar MongoDB (instalado previamente):
    (Desde Command Prompt como administrador)
    $ net start MongoDB

4. Inicializar el servidor local:
    $ npm start


## Se debería ver lo siguiente:

- Servidor ejecutándose en http://localhost:3000
- Formulario de registro: http://localhost:3000
- Lista de usuarios: http://localhost:3000/users
- Conexión exitosa a MongoDB


## Probando la aplicación:

1. Al abrir el navegador, en http://localhost:3000, se puede registrar un usuario con el formulario.

2. Podemos revisar la lista de usuarios en http://localhost:3000/users. Donde aparece el contador de usuarios registrados y una card con su nombre, correo, id y fecha de registro.

**Link:**
- [Ver Demo en vivo](https://user-registration-app-with-mongodb.onrender.com/)