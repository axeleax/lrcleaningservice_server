'use strict';

const nodemailer = require('nodemailer');

exports.sendEmail = function(mailOptions, callback){

  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'lr.quality.cleaning.service@gmail.com',
          pass: 'rezsomqqxydmzbme'
      }
  });
  
  transporter.sendMail(mailOptions, function(error, info){
      if (error){
          console.log(error);
          callback({'status':'error', 'message':error});
      } else {
          console.log("Email sent");
          callback({'status':'done', 'message':'Email was sended...'});
      }
  });
};