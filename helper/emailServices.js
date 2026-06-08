import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: "crypton.futuremedia1989@gmail.com",
        pass: "osto lzwa prmi ckqj"
    }
})

const sendEmail = async (email, subject, content) => {
    try {
        let mailOptions = {
            from: "crypton.futuremedia1989@gmail.com",
            to: email,
            subject: subject,
            html: content
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            // console.log("Mail has been sent", info.messageId);
        })
    } catch (error) {
        console.log(error.message);
    }
}

export { 
    sendEmail
}