import nodemailer from 'nodemailer';

class EmailService {

    public transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'allison.nolan@ethereal.email',
                pass: 'bZ6fjvtVX9xJdxcAeZ'
            }
        });
    }

    public async sendEmail(to: string, subject: string, text: string): Promise<void> {
        let message = {
            from: 'Sender Name <sender@example.com>',
            to: `Recipient ${to}`,
            subject: subject,
            text: text,
            html: ''
        };

        this.transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }

}

export default EmailService;
