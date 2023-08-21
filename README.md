# Trabajo Diplamado Desarrollo Seguro
## Universidad Catolica

# Front End
## Carteristicas

- Desarrollado en Angular

# API de Autenticación Segura

Esta API proporciona funcionalidad de registro y inicio de sesión con un enfoque en la seguridad y las mejores prácticas de desarrollo seguro.

## Características
- Desarrollado en Node.js
- Registro de usuarios con verificación de correo electrónico.
- Inicio de sesión con autenticación segura.
- Contraseñas almacenadas de manera segura utilizando hashing bcrypt.
- Hashing seguro de contraseñas utilizando bcrypt.
- Uso de tokens JWT para manejar la autenticación.
- Validación y sanitización de datos de entrada utilizando express-validator.
- Pruebas unitarias 
  
## Requisitos

- Node.js
- MariaDB
- npm

## Configuración

1. Clona este repositorio.
2. Instala las dependencias ejecutando `npm install`.
3. Crea un archivo `.env` basado en `.env.example` y configura tus variables de entorno.

## Instalación de Dependencias

npm install

Configuración de Base de Datos
Configura tu base de datos y actualiza la conexión en db.js.
Ejecuta las migraciones y seeders si es necesario.

## Uso

Inicia el servidor con npm start.
Accede a las rutas de la API utilizando herramientas como Postman o cURL.
Rutas
POST /register: Registra un nuevo usuario. Se enviará un correo de verificación.
POST /login: Inicia sesión con correo electrónico y contraseña. Solo para usuarios verificados.
GET /verify-email/:token: Verifica el correo electrónico del usuario.

## Licencia

Este proyecto está bajo la Licencia MIT.

Desarrollado por: Benito Serrano,Ociel Aguilante, Rodrigo Pantoja Gustavo fuentes.
