
import bcrypt from 'bcryptjs';
const saltRounds = 10;

/*
Genera un hash seguro para una contraseña.
Valida que la contraseña tenga al menos 6 caracteres.
Usa bcryptjs con saltRounds = 10.
PARAMETRO: string password - Contraseña en texto plano.
RETURN: Promise<string> - Retorna la promesa del Hash encriptado de la contraseña.
THROW: Error - Si la contraseña es demasiado corta.
*/

export async function hashPassword(password) {
    if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
    return await bcrypt.hash(password, saltRounds);
}

/*
Compara una contraseña en texto plano con su hash encriptado.
PARAMETRO: string password - Contraseña en texto plano.
PARAMETRO: string hashedPassword - Hash encriptado almacenado.
RETURN: Promise<boolean>} - devuelve una promesa booleana, true si coinciden, false en caso contrario.
*/

export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}
