# User-registration-app-with-MongoDB

Es un aplicación para registro de usuarios construida en el Frontend con Vanilla Javascript; y en el Backend con Node.js, Express y MongoDB.


## Características

- validaciones en el frontend, como en el backend.
- Base de datos MongoDb que sea crea automáticamente.
- Interfaz responsive.
- Prevención de usuarios dupolicados.
- Encriptación de contraseñas con bcrypt.
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

2. Podemos revisar la lista de usuarios en http://localhost:3000/users. Donde aparece el contador de usuarios registrados y una card con su nombre, correo, id y fecha de resgistro.

## Al ejecutar la aplicación:

1. Se conectará a MongoDB (que ya está inicializado).

2. Se creará automáticamente la base de datos "user_registration_db".
