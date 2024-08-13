import crypto from 'crypto'
import { readByEmailService, updateService, destroyService } from '../services/users.service.js'
import sendEmail from '../utils/mailing.util.js'
import { createHash } from '../utils/hash.util.js'

class SessionsController {

    async register ( request, response, next ) {
        try {
            return response.message201('User registered!')
        } catch (error) {
            return next(error)
        }
    }

    async login ( request, response, next ) {
        try {
            const userData = request.user

            response.cookie('token', request.user.token, {
                signed: true,
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000 // 1 hora de vida
            }
            )

            const user = {
                email: userData.email,
                username: userData.username,
                photo: userData.photo,
                bio: userData.bio,
                role: userData.role,
                online: userData.online 
            }

            response.cookie('user', JSON.stringify(user),{
                httpOnly: false,
                secure: false,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000 // 1 hora de vida
            })

            return response.message200('You are loggedd in!')
        } catch (error) {
            return next(error)
        }
    }

    async verify(request, response, next) {
        try {

            const { email, verifyCode } = request.body
            const one = await readByEmailService(email)

            console.log('one en el session controller: ', one);

            if (!one) {
                return response.error404()
            }
            else {
                const { _id } = one
                const verified = (verifyCode === one.verifyCode)

                if (verified) {
                    await updateService({
                        _id,
                        data: { verified }
                    })

                    return response.message200('User verified!')
                }
            }
        } catch (error) {
            return next(error)
        }
    }

    async resetPassword(request, response, next) {

        const { email } = request.body
        const user = await readByEmailService(email)

        if (!user) {
            return response.error404()
        }
        else {
            const verifyCode = crypto.randomBytes(12).toString('hex')

            await updateService({
                id: user._id,
                data: { verifyCode }
            })

            await sendEmail({
                email: user.email,
                name: user.username,
                subject: `Hi, ${user.username.toUpperCase()}. This is your password reset code!`,
                template: `
                <img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2Femail_header.png?alt=media&token=43729bba-93a2-4df6-8f0d-72e7fd688ef5' alt='email header'/>
                <h1 style='text-align: center; width: 600px;'>This is your password reset code</h1>
                <h4 style='text-align: center; width: 600px;'>Enter the code below in the password reset page</h4>
                <a style='text-align: center; font-weight: bold; width:600px; display:block;' href="http://localhost:5173/setNew">Password reset page</a>
                <div style='width: 600px; max-width: 600px;'> 
                <h2 style="width: 500px; margin: 5px auto; color: black; background-color: #EAFF6A; border-radius: 50% 20% / 10% 40%; text-align:center; padding: 8px 30px">${verifyCode}</h2>
                </div>
                <img src='https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2Femail_footer.png?alt=media&token=53ad8bb6-dedf-4e87-a76d-de228b482920' alt='email footer'/>
                `
            })

            return response.message200('Email sent!')
        }
    }

    async setPassword(request, response, next) {
        try {
            const { email, password, verifyCode } = request.body
            const user = await readByEmailService(email)
            const hashPassword = createHash(password)

            if (!user) {
                return response.error404()
            }
            else {
                const { _id } = user
                const verified = (verifyCode === user.verifyCode)

                if (!verified) {
                    return response.error401()
                }
                else {
                    await updateService({
                        id: _id,
                        data: { password: hashPassword }
                    })

                    return response.message204('Password changed. Please login!')
                }
            }

        } catch (error) {
            return next(error)
        }
    }

    signout(request, response, next) {

        try {
            console.log('El body como llega a logout: ', request.body)
            if (request.body.user.online) {
                return response.clearCookie('token').json({
                    statusCode: 200,
                    message: '¡Signing out!'
                })
            } else {
                return response.json({
                    statusCode: 401,
                    message: '¡Bad auth on logout!'
                })
            }
        } catch (error) {
            return next(error)
        }
    }

    async destroy (request, response, next) {
        try {
            const { id } = request.params
            const one = await destroyService(id)
            return response.message204('User deleted')            
        } catch (error) {
            return next(error)
        }
    }
}

const sessionsController = new SessionsController()
export const { 
    resetPassword,
    setPassword,
    signout,
    verify,
    register,
    login,
    destroy
} = sessionsController