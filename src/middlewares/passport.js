import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import usersManager from "../data/mongo/managers/usersManager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

passport.use(
    'register',
    new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async(req, email, password, done) =>{
            try {
                if(!email || !password){
                    const error = new Error('Please enter email and password')
                    error.statusCode = 404
                    return done(error)
                }
                const one = await usersManager.readByEmail(email)
                if(one) {
                    const error = new Error('Bad auth')
                    error.statusCode = 401
                    return done(error)
                }
                const hashPassword = createHash(password)
                req.body.password = hashPassword
                const user = await usersManager.create(req.body)
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async(req, email, password, done) =>{
            try {
                const one = await usersManager.readByEmail(email)
                if(!one) {
                    const error = new Error('Bad auth')
                    error.statusCode = 401
                    return done(error)
        }
        const verify = verifyHash(password, one.password);
                if (verify) {
                    //req.session.email = email;
                    //req.session.online = true;
                    //req.session.rol = one.rol;
                    const data = {email, rol:one, online: true}
                    const token = createToken(data)
                    one.token = token
                    return done(null, one)
                }
                const error = new Error('Bad auth')
                error.statusCode = 401
                return done(error)
            } catch (error) {
                return done(error)
                }
            }
    )
)

export default passport