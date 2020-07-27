# ePayco rest service

Servicio rest de la prueba de aplicacion para ePayco.

## Para correr el proyecto

En la carpeta del proyecto hacer `npm install` para instalar las dependencias y luego `npm run start:dev` para correr el proyecto en la direccion  [http://localhost:3001](http://localhost:3001)

## Endpoints disponibles

| Metodo | Direccion | Descripcion | 
| -------- | -------- | -------- | 
| POST | api/user | Enpoint para crear un usuario|
| GET | /api/user/wallet | Enpoint para consultar una billetera|
| POST | /api/user/wallet | Enpoint para recargar una billetera|
| POST | /api/transaction | Metodo para generar un pago|
| PUT | /api/transaction/confirm | Metodo para confirmar un pago|

## Consideraciones
Revisar la documentacion de postman, la coleccion se encuentra disponible en la raiz del repositorio.

El endpoint para confirmar un pago recibe el id de sesion en el header de authorization como un bearer token.

Solamente este servicio rest puede consumir el servicio soap.
