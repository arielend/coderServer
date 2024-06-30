import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStratey } from 'passport-google-oauth2' 
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { createHash, verifyHash } from '../utils/hash.js'
import { createToken } from '../utils/token.js'
import sendEmail from '../utils/mailing.util.js'

import { createService, readByEmailService } from '../services/users.service.js'

//ESTRATEGIAS LOCALES
passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (request, email, password, done) => {
            try {

                //Validamos el formato del mail
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
                const emailFormat = emailRegex.test(email)

                if( !emailFormat ) {
                    const error = new Error('¡It looks like something is wrong with the email format!')
                    error.statusCode = 400
                    return done(error)
                }

                //Validamos los requerimientos minimos del password
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/;
                const passwordFormat = passwordRegex.test(password)

                if( !passwordFormat ) {
                    const error = new Error('¡The password must be between 6 and 8 characters and at least one letter and one number!')
                    error.statusCode = 400
                    return done(error)
                }

                //Verificamos que el email este disponible
                const registeredEmail = await readByEmailService(email)

                console.log('mail registrado:', registeredEmail);

                if(registeredEmail) {
                    const error = new Error('Bad auth on register!')
                    error.statusCode = 401
                    return done(error)
                }
                
                //Hasheamos el password
                const hashPassword = createHash(password)
                request.body.password = hashPassword

                const user = await createService(request.body)

                const emailSent = await sendEmail({
                    email,
                    name: user.username,
                    verifyCode: user.verifyCode,
                    template: `
                    <h1>This is your verification code</h1>
                    <h4>Enter the code below in the verification page</h4>
                    <a href="http://localhost:5173/verify">Verification page</a>
                    <h2 style="color: green">${user.verifyCode}</h2>
                    `
                })

                

                return done(null, user)

            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (request, email, password, done) => {
            try {

                //Verificamos que el usuario exista
                const registeredUser = await readByEmailService(email)

                if(!registeredUser) {
                    const error = new Error('Bad auth on login!')
                    error.statusCode = 401
                    return done(error)
                }

                if(registeredUser.verified != true){
                    const error = new Error('The user is not verified!')
                    error.statusCode == 403
                    return done(error)
                }

                //Verificamos la contraseña
                const verify = verifyHash(password, registeredUser.password)
                if(!verify) {
                    const error = new Error('Invalid credentials!')
                    error.statusCode = 401
                    return done(error)
                }

                //Uso de token
                //Solo envío los datos que necesita el token 
                const data = {
                    email,
                    username: registeredUser.username,
                    role: registeredUser.role,
                    online: true,
                }
                const token = createToken(data)
                const user = data
                user.token = token                

                return done(null, user)
                
            } catch (error) {
                return done(error)
            }
        }
    )
)

//ESTRATEGIAS DE TERCEROS - GOOGLE
passport.use('google',
    new GoogleStratey(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/api/sessions/google/callback',
            passReqToCallback: true
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {

                const { id, picture, displayName } = profile
                let user = await readByEmailService(id)

                if(!user) {
                    user = {
                        email: id,
                        username: displayName,
                        token: accessToken,
                        password: createHash(id),
                        photo: picture
                    }
                    user = await createService(user)
                }

                request.session.email = user.email
                request.session.role = user.role
                request.session.token = accessToken
                request.session.photo = user.photo
                request.session.user_id = user._id
                request.session.isOnline = true

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

//Estrategias de JWT
passport.use(
    'jwt', new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => request.signedCookies.token]),
            secretOrKey: process.env.SECRET_JWT
        },
        (user, done) => {

            try {
                if(user){
                    return done(null, user)
                } else {
                    return response.error403()
                }
            } catch (error) {
                return done(error)   
            }
        }
    )
)

export default passport