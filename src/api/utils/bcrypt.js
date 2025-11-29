
import bcrypt from 'bcryptjs';
const saltRounds = 10;

export async function hashPassword(password) {
    if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}
