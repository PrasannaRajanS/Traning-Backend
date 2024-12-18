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
      html:
      `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <div style="background-color: white;">
        <div
             style="margin: 40px auto; border: solid 2px black; box-shadow: 0px 4px 6px rgba(0, 0, 0, 1); width: 50%; padding: 10px;">
            <h1 style="border: solid 1px rgba(0, 0, 0, 0.196); color: #333; text-align: center; background-color: rgba(255, 68, 0, 0.169); padding: 10px; border-radius: 9px;">New sign-in detected</h1>
            <h3 style="color: #333; text-align: center;">A new login was detected from the device</h3>
            <h3 style="color: #333; text-align: center; background-color: rgba(0, 255, 234, 0.45); padding: 5px; width: 30%; margin-left: auto; margin-right: auto; border-radius: 8px;">${deviceName}</h3>
            <h4>We noticed a new sign-in to your account on a device that we don't recognize. If this wasn't you, we'll
                help you secure your account. Click on the button below to verify</h4>
                
                <div style="text-align: center;"><button style="background-color:rgba(0, 0, 255, 0.461); color: white; padding: 10px; font-weight: 700; border-radius: 5px;">Yes it's me</button> <button style="background-color:rgba(0, 0, 255, 0.461); color: white; padding: 10px; font-weight: 700; border-radius: 5px;">No it was't me</button></div>
         <h5 style="color: #333; text-align: center;"> .... ABC School Management .... </h5>
            </div>
        
    </div>
</body>`
    };

    await this.transporter.sendMail(mailOptions);
  };

  // Function to send logout email
  sendLogoutEmail = async (email, deviceName) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Logged Out',
      html:   `
      div
      <h1>A new login was detected from the device: ${deviceName}</h1>`,
    };

    await this.transporter.sendMail(mailOptions);
  };
}

module.exports = new EmailService();
