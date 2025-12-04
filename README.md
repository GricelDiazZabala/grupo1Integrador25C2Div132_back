# Trabajo práctico | Segundo parcial
## División 132 Programación III, UTN Facultad Regional Avellaneda, Tecnicatura Universitaria en Programación
### Equipo de Emiliano García y Gricel Díaz Zabala

---

# Tienda de termos y mates

![login](src/public/img/Captura%20de%20pantalla%202025-12-03%20121345.png)

En esta parte de backend, consiste en una API donde se podrá ingresar **como administrador** a la página, para gestionar productos (Termos y Mates), usuarios y ventas de la tienda generadas en el frontend, únicamente se podra loguearse con mail y contraseñas guardadas en el sistema

![index](src/public/img/Captura%20de%20pantalla%202025-12-03%20121357.png)

## Funciones principales:

### Ver:
Muestra la página con los productos, similar a lo que vería un cliente

### Consultar ID:
Podremos consultar el producto con sus detalles, según el ID indicado
### Crear:
Crearemos un producto, donde debemos indicar tipo de producto (termo o mate), precio, nombre y una imagen (ésta se puede cargar gracias al middleware Multer)
### Modificar:
Indicamos un ID y modificamos lo que queremos del producto
### Eliminar:
Se elimina el producto indicado según ID
### Crear usuario:
Para crear nuevos usuarios (con sus respectivas contraseñas), se cargan a la base de datos
### Descargar ventas:
Descarga las ventas hechas en formato .xls (archivo para Excel)


## Controladores principales:
### [`product.controllers`](src/api/controllers/product.controllers.js) ([src/api/controllers/product.controllers.js](src/api/controllers/product.controllers.js))  
### [`sales.controllers`](src/api/controllers/sales.controllers.js) ([src/api/controllers/sales.controllers.js](src/api/controllers/sales.controllers.js))  
### [`users.controllers`](src/api/controllers/users.controllers.js) ([src/api/controllers/users.controllers.js](src/api/controllers/users.controllers.js))  
### [`views.controllers`](src/api/controllers/views.controllers.js) ([src/api/controllers/views.controllers.js](src/api/controllers/views.controllers.js))

### Modelos, middlewares y utilidades:
### Modelo de producto: [`product.models`](src/api/models/product.models.js) ([src/api/models/product.models.js](src/api/models/product.models.js))  
### Middlewares generales: [`middlewares`](src/api/middlewares/middlewares.js) ([src/api/middlewares/middlewares.js](src/api/middlewares/middlewares.js))  
### Middleware de subida de archivos (Multer): [`multer.middlewares`](src/api/middlewares/multer.middlewares.js) ([src/api/middlewares/multer.middlewares.js](src/api/middlewares/multer.middlewares.js))

## Vistas y assets:
### Plantillas EJS: [views/](views) — p. ej. [views/index.ejs](views/index.ejs), [views/login.ejs](views/login.ejs)  
### Recursos públicos: [src/public](src/public) (img, css, js)

## Rutas:
### Las rutas están definidas en la carpeta [src/api/routes](src/api/routes)

## Estructura del proyecto: 

```
📂grupo1Integrador25C2Div132_back-main
├──📂src
    ├───📂api
    │   ├───📂config
    │   ├───📂controllers
    │   ├───📂database
    │   ├───📂middlewares
    │   ├───📂models
    │   ├───📂routes
    │   └───📂utils
    ├───📂public
    │   ├───📂css
    │   ├───📂img
    │   └───📂js
    └───📂views
        └───📂partials
```