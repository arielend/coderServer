import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStratey } from 'passport-google-oauth2' 
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

import usersManager from '../data/mongo/managers/usersManager.js'
import { createHash, verifyHash } from '../utils/hash.js'
import { createToken } from '../utils/token.js'

//ESTRATEGIAS LOCALES
passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (request, email, password, done) => {
            try {

                //La validación de campos requeridos del formulario de registro
                //se realiza por fuera de passport porque passport no se ejecuta si los mismos
                //estan vacios

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
                const registeredEmail = await usersManager.readByEmail(email)

                if(registeredEmail) {
                    const error = new Error('Bad auth on register!')
                    error.statusCode = 401
                    return done(error)
                }

                //Hasheamos el password
                const hashPassword = createHash(password)
                request.body.password = hashPassword
                const user = await usersManager.create(request.body)

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
                const registeredUser = await usersManager.readByEmail(email)

                if(!registeredUser) {
                    const error = new Error('¡Bad auth on login!')
                    error.statusCode = 401
                    return done(error)
                }

                //Verificamos la contraseña
                const verify = verifyHash(password, registeredUser.password)

                if(!verify) {
                    const error = new Error('¡Invalid credentials!')
                    error.statusCode = 401
                    return done(error)
                }
                
                //En caso de usar session
                // request.session.email = email
                // request.session.username = user.username
                // request.session.bio = user.bio
                // request.session.photo = user.photo
                // request.session.role = user.role
                // request.session.user_id = user._id
                // request.session.online = true

                //En caso de usar token
                const data = {
                    email,
                    username: registeredUser.username,
                    photo: registeredUser.photo,
                    bio: registeredUser.bio,
                    _id: registeredUser._id,
                    role: registeredUser.role,
                    online: true,
                }
                const token = createToken(data)
                const user = {}
                user.token = token

                // console.log(user);
                // console.log(user.token);

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
                let user = await usersManager.readByEmail(id)

                if(!user) {
                    user = {
                        email: id,
                        username: displayName,
                        token: accessToken,
                        password: createHash(id),
                        photo: picture
                    }
                    user = await usersManager.create(user)
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
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => request?.signedCookies.token]),
            secretOrKey: process.env.SECRET_JWT
        },
        (user, done) => {
            try {                
                if(user){
                    return done(null, user)
                } else {
                    return response.status403()
                }
            } catch (error) {
                return done(error)   
            }
        }
    )
)

export default passport