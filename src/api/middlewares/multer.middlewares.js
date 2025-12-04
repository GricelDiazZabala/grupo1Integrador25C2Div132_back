import multer from 'multer';
import { __dirname, join } from '../utils/index.js';
import path from 'path';
import { randomUUID } from 'crypto';

// Configuración de almacenamiento en disco para multer
// Guarda imágenes en /src/public/img
// Asigna nombre unico + extensión original
const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, join(__dirname, 'src', 'public', 'img'));
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase()
        const nombreFichero = randomUUID() + ext;
        console.log(nombreFichero)
        callback(null, nombreFichero);
    }

});

/*
Filtro de archivos para multer.
Permite solo imágenes PNG, JPEG y JPG.
Rechaza otros tipos con error.
PARAMETRO: Request req - solicitud Express.
PARAMETRO: File file - Archivo subido.
PARAMETRO: Function callback - Callback para aceptar o rechazar archivo.
*/
const fileFilterConfig = (req, file, callback) => {
    const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg"]
    const tipo = file.mimetype;
    if (tiposPermitidos.includes(tipo)) {
        callback(null, true);
    } else {
        callback(new Error("Tipo de archivo no permitido"));
    }
};

/**
Instancia de multer configurada.
Usa storageConfig y fileFilterConfig.
Limita tamaño de archivo a 5 MB.
*/
export const multerUploader = multer({
    storage: storageConfig,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilterConfig
});

/*
Middleware para manejar errores de multer.
Si es error de multer, devuelve err.code y mensaje.
Si es otro error, devuelve mensaje general.
PARAMETRO: Error err - Error capturado.
PARAMETRO: Request req - solicitud Express.
PARAMETRO: Response res - Devuelve respuesta JSON con error.
PARAMETRO: Function next - Llama al siguiente middleware si no hay error.
*/
export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: err.code,
            message: err.message
        });
    }
    if (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        error: err.message
    });
};