import jwt from 'jsonwebtoken';
import env from './env';
import { User } from '../entities/user';

class SecurityGuard {
    
    private static readonly SECRET: string = env.tokenSecret;
    private static readonly EXPIRES_IN: string = "5h";
    private static readonly COUNT_BEARER: number = 7;

    public isValid(token: string): boolean {
        try {
            token = this.removeBearer(token);
            const obj = jwt.verify(token, SecurityGuard.SECRET);
            return (obj !== null);
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public getInfoFromToken(token: string): string | object | Error {
        try {
            token = this.removeBearer(token);
            return jwt.verify(token, SecurityGuard.SECRET);
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public generateToken(user: User): string {
        return jwt.sign(
            { userId: user.id },
            SecurityGuard.SECRET,
            { expiresIn: SecurityGuard.EXPIRES_IN }
        );
    }

    public decode(token: string, options?: any): any {
        token = this.removeBearer(token);
        return jwt.decode(token, options);
    }

    private removeBearer(token: string): string {
        return token.slice(SecurityGuard.COUNT_BEARER);
    }

}

export default new SecurityGuard();