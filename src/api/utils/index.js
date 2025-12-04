/*
Utilidades para manejo de rutas en el proyecto.
Define __dirname y __filename en entorno ES Modules.
Exporta join para construir rutas de forma segura.
Se utiliza en configuración de vistas, archivos estáticos y middlewares.
*/


import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Convierte la URL del módulo actual en una ruta absoluta de archivo (__filename)
const __filename = fileURLToPath(import.meta.url); 

// Define __dirname equivalente en ES Modules, apuntando a la raíz del proyecto
const __dirname = join(dirname(__filename), "../../../"); 

export {
    __dirname,
    join
}
