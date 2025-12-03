# Trabajo práctico | Segundo parcial
## División 132 Programación III, UTN Facultad Regional Avellaneda, Tecnicatura Universitaria en Programación
### Equipo de Emiliano García y Gricel Díaz Zabala

---

# Tienda de termos y mates

![login](src/public/img/Captura%20de%20pantalla%202025-12-03%20121345.png)

En esta parte de backend, se podrá ingresar **como administrador** a la página, únicamente con usuario y contraseñas guardadas en el sistema

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