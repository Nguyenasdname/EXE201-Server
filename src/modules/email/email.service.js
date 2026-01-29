const Mailjet = require('node-mailjet');
require('dotenv').config();

const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);

exports.sendMail = async (to, subject, html) => {
    try {
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.EMAIL_USER || 'fundtalkexe@gmail.com',  // email đã verify trong Mailjet
                            Name: 'Fundtalk',  // tên hiển thị
                        },
                        To: [
                            {
                                Email: to,
                                // Name: 'Người nhận' (tùy chọn, có thể bỏ)
                            },
                        ],
                        Subject: subject,
                        HTMLPart: html,  // nội dung HTML của bạn
                        // TextPart: 'Phiên bản text nếu cần fallback' (tùy chọn)
                    },
                ],
            });

        console.log('Email sent to:', to);
        console.log('Mailjet response:', request.body);  // để debug nếu cần
        return request.body;
    } catch (error) {
        console.error('Mailjet Error:', error.statusCode, error.message);
        if (error.ErrorMessage) console.error('Details:', error.ErrorMessage);
        throw error;
    }
};