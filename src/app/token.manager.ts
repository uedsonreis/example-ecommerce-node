import jwt from 'jsonwebtoken';
import env from './env';

class TokenManager {

    private static readonly SECRET: string = env.tokenSecret;
    private static readonly EXPIRES_IN: string = "5h";
    private static readonly COUNT_BEARER: number = 7;

    public isValid(token: string): boolean {
        try {
            token = this.removeBearer(token);
            const obj = jwt.verify(token, TokenManager.SECRET);
            return (obj !== null);
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public getLoginFromToken(token: string): object | string | Error {
        try {
            token = this.removeBearer(token);
            return jwt.verify(token, TokenManager.SECRET);
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public generateToken(login: string): string {
        return jwt.sign(
            { login },
            TokenManager.SECRET,
            { expiresIn: TokenManager.EXPIRES_IN }
        );
    }

    public decode(token: string, options?: any): any {
        token = this.removeBearer(token);
        return jwt.decode(token, options);
    }

    private removeBearer(token: string): string {
        return token.slice(TokenManager.COUNT_BEARER);
    }
}

export default new TokenManager();