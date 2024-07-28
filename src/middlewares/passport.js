import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStratey } from 'passport-google-oauth2' 
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { createHash, verifyHash } from '../utils/hash.js'
import { createToken } from '../utils/token.js'
import sendEmail from '../utils/mailing.util.js'

import CustomError from '../utils/errors/CustomError.js'
import errors from '../utils/errors/errors.js'

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
                    const error = CustomError.new(errors.emailFormat)
                    return done(error)
                }

                //Validamos los requerimientos minimos del password
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/;
                const passwordFormat = passwordRegex.test(password)

                if( !passwordFormat ) {
                    const error = CustomError.new(errors.passFormat)
                    return done(error)
                }

                //Verificamos que el email este disponible
                const registeredEmail = await readByEmailService(email)

                if(registeredEmail) {
                    const error = CustomError.new(errors.auth)
                    return done(error)
                }
                
                //Hasheamos el password
                const hashPassword = createHash(password)
                request.body.password = hashPassword

                const user = await createService(request.body)

                const emailSent = await sendEmail({
                    email,
                    subject: `Hi, ${user.username.toUpperCase()}. Activate your account!`,
                    verifyCode: user.verifyCode,
                    template: `
                    <img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2Femail_header.png?alt=media&token=43729bba-93a2-4df6-8f0d-72e7fd688ef5' alt='email header'/>
                    <h1 style='text-align: center; width: 600px;'>This is your verification code</h1>
                    <h4 style='text-align: center; width: 600px;'>Enter the code below in the verification page</h4>
                    <a style='text-align: center; font-weight: bold;' href="http://localhost:5173/verify">Verification page</a>
                    <div style='width: 600px; max-width: 600px;'> 
                    <h2 style="width: 500px; margin: 5px auto; color: black; background-color: #EAFF6A; border-radius: 50% 20% / 10% 40%; text-align:center; padding: 8px 30px">${user.verifyCode}</h2>
                    </div>
                    <img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2Femail_footer.png?alt=media&token=53ad8bb6-dedf-4e87-a76d-de228b482920' alt='email footer'/>
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
                    const error = CustomError.new(errors.auth)
                    return done(error)
                }

                if(registeredUser.verified != true){
                    const error = CustomError.new(errors.notVerified)
                    return done(error)
                }

                //Verificamos la contraseña
                const verify = verifyHash(password, registeredUser.password)
                if(!verify) {
                    const error = CustomError.new(errors.credentials)
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