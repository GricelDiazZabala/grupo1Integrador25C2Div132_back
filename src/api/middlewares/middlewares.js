/*
Middleware de logger.
Registra en consola el metodo y la URL de cada solicitud con timestamp para mantener un registro.
PARAMETRO: Request req - solicitud Express.
PARAMETRO: Response res - respuesta Express.
PARAMETRO: Function next - Llama al siguiente middleware.
*/

const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

/*
Middleware de validación de ID.
Verifica que haya un id y que el id sea un numero.
Si es valido, lo convierte a entero y lo asigna a req.id.
Si no es válido, devuelve error 400.
PARAMETRO: Request req - Contiene id en req.params.
PARAMETRO: Response res - Devuelve error si id no es válido.
PARAMETRO: Function next - Llama al siguiente middleware.
*/
const validateId = (req, res, next) => {
    const { id } = req.params;

    
    if(!id || isNaN(id)) {
        return res.status(400).json({
            message: "El id debe ser un numero"
        });
    }

    
    req.id = parseInt(id, 10);

    console.log("Id validado!: ", req.id);

    next();
}

/*
Middleware de chequeo de sesion Admin.
Verifica que exista sesión activa (req.session.user).
Si no existe, redirige a /login.
Si existe, permite continuar.
PARAMETRO: Request req - solicitud Express.
PARAMETRO: Response res - Redirige a login si no hay sesión.
PARAMETRO: Function next - Llama al siguiente middleware.
*/
const requireAdmin = (req, res, next) => {
    if(!req.session.user) {
        return res.redirect("/login");
    }   
    next();
}

export {
    loggerUrl,
    validateId,
    requireAdmin
}