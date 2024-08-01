import { createTransport } from 'nodemailer'
import __dirname from '../../utils.js'
import environment from './env.util.js'

const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment

async function sendEmail (data) {

    try {
        const transport = createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: GOOGLE_EMAIL,
                pass: GOOGLE_PASSWORD
            }
        })

        await transport.verify()
        const emailSent = await transport.sendMail({
            from: `CoderServer Store <${GOOGLE_EMAIL}>`,
            to: data.email,
            subject: data.subject,
            html: data.template,
            // attachments:[
            //     {
            //         filename: 'header.svg',
            //         path: __dirname+'/public/images/header_img.svg',
            //         cid: 'coderserver'
            //     }
            // ]
        })
        
        return emailSent
    } catch (error) {
        throw error        
    }
}

export default sendEmail