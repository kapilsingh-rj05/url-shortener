import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async (to, subject, text, html) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev", // use this until you add a domain
            to,
            subject,
            text,
            html
        })
        console.log("Email sent successfully")
    } catch (error) {
        console.log("Error occurred", error)
    }
}

export default sendEmail