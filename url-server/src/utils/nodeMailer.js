import nodemailer from "nodemailer"

const sendEmail = async(to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            family:4,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        })
    
        console.log("Email sent successfully")
    } catch (error) {
        console.log("Error occured", error)
    }
}

export default sendEmail