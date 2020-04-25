const mailTransport = require("../config/mail.config");

module.exports.sendNotification = function (email, body) {
  const message = {
    from: "noreply@work.com",
    to: email,
    subject: "Message Notification from Work",
    html: `<html>
         <head>
         </head>
         <body>
         <h3>
            Hello,
            You received a new message while you're away, here's the content. 
         </h1>
          <p>${body}</p>
         </body>
         </html>`,
  };
  return mailTransport.sendMail(message);
};
