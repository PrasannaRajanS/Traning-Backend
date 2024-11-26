const nodemailer = require('nodemailer');

class EmailService {
  // Configure the email transporter
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
      logger: true,
    });
  }

   // Function to send login email
   sendLoginEmail = async (email, deviceName) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'New Login Alert',
      html: `
  <table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333; border-collapse: collapse;">
  <tr>
    <td style="padding: 20px; background-color: #f5f5f5; text-align: center;">
      <h2 style="color: #2c3e50;">New Login Detected</h2>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px;">
      <p style="font-size: 16px;">We noticed a new login to your account from a device we don't recognize.</p>
      <p style="font-size: 16px;"><strong>Device Name:</strong> MyDevice</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://secure-account.com" 
           style="display: inline-block; text-decoration: none; background-color: #007bff; color: #fff; 
                  padding: 10px 20px; font-size: 16px; border-radius: 5px;">
          Secure My Account
        </a>
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #999;">
      <p>&copy; 2024 ABC School Management. All rights reserved.</p>
    </td>
  </tr>
</table>
      `,
    };
  
    await this.transporter.sendMail(mailOptions);
  };

  // Function to send logout email
  sendLogoutEmail = async (email, deviceName) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Logged Out',
      text: `Hello,

You have been logged out from ${deviceName} due to a new login.

If this wasn't you, please secure your account immediately.

Best regards,
ABC School Management`,
    };

    await this.transporter.sendMail(mailOptions);
  };
}

module.exports = new EmailService();
