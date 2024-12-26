import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';
import { AuthRepository } from '../repository/auth.repository';
import { envConfig } from './env.config';

const JWT_SECRET_ACCESS = envConfig.JWT_SECRET_ACCESS
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: String(JWT_SECRET_ACCESS),
};

passport.use(
    new Strategy(opts, async(payload, done) =>{
        try{
            console.log(payload);
            const authRepository = new AuthRepository();
            const user = await authRepository.findById(payload.userId)
            console.log(user)

            if (user) return done(null,user);
        } catch(error){
            return done(error);
        }
    })
);

export const accessMiddleware = passport.authenticate('jwt',{ session: false })







