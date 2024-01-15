/* eslint-disable prettier/prettier */
import * as  bcrypt from 'bcrypt';

export default class HashPassword {
    async hashPassword(password: string): Promise<string> {
        try {
            return await bcrypt.hash(password, 8);
        } catch (error) {
            console.error('Erro ao gerar hash da senha:', error);
        }
    }

    async compareHashPassword(password: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordHashed);
    }
}