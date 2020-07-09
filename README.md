# ePayco soap service

Servicio soap de la prueba de aplicacion para ePayco.

## Para correr el proyecto

En la carpeta del proyecto hacer `npm install` para instalar las dependencias y luego `npm run start:dev` para correr el proyecto en la direccion  [http://localhost:3002](http://localhost:3002)

## Enpoints disponibles
### /soap/user
| Metodo | Descripcion | 
| -------- | -------- | 
| createUser | Metodo para crear el usuario | 
| rechargeWallet | Metodo para recargar la billetera| 
| consultWallet | Metodo para consultar la billetera |

### /soap/transaction
| Metodo | Descripcion | 
| -------- | -------- | 
| createTransaction | Metodo para emitir un pago | 
| confirmTransaction | metodo parar confirmar un pago |

## Consideraciones
Para el envio del token al email del usuario recomiendo crear una cuenta en mailtrap y llenar las configuraciones del transporte dentro de la carpeta src/helpers/email, sin esto no sera posible enviar emails aunque la funcion ya esta completa. De todas formas el token sera logueado por la consola del servicio al momento de crear un pago siendo asi posible ver el token sin tener que revisar el correo.

El id de sesión es un jwt token con un tiempo de expiracion de una hora.

Solamente el servicio rest puede consumir esta api, fue creado un token llamado auth_token y es pasado como parametro en cada llamada.
