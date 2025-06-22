// nodemailer to send the verification mail
import nodemailer from 'nodemailer';

export const sendEmailVerificationMail = async(email: string, token: string) => {
    // Define the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass:  process.env.EMAIL_PASS
        }
    });

    // Create the verification link to send to the user to verify their email.
    // TODO: CHANGE THIS LINK TO THE ACTUAL URL YOU WILL HOST THE SITE ON.
    const verificationLink = `http://localhost:5000/students/verifyEmail?token=${token}`;

    // Now finally, use the created transported to send the mail.
    await transporter.sendMail({
        from:`Market Bucks ${process.env.EMAIL_USER}`,
        to: email,
        subject: `Please verify your email`,
        html:`<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
    });
}