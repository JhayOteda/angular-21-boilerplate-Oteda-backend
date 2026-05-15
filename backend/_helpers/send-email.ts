import nodemailer from 'nodemailer';
import config from '../config';

export default async function sendEmail({to, subject, html, from = config.emailFrom}: any) {
    const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        auth: {
            user: config.smtpUser,
            pass: config.smtpPass
        }
    });
    await transporter.sendMail({from, to, subject, html});
}