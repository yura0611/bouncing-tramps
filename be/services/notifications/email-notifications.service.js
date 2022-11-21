'use strict';

const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const hhs = require('nodemailer-express-handlebars');
const viewPath = path.resolve(__dirname, '../../views/layouts');
const partialsPath = path.resolve(__dirname, '../../views/partial');

class EmailNotificationService {
  async sendEmail(userData) {
    console.log(userData);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tyrpuchy0611@gmail.com',
        pass: 'jeulsgcexqhhtulo'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: partialsPath,
        layoutsDir: viewPath,
        defaultLayout: false,
        express,
        helpers: {
          ifEqual: function(a, b, opts) {
            if (a == b) {
              return opts.fn(this);
            } else {
              return opts.inverse(this);
            }
          }
        }
      },
      viewPath: viewPath,
      extName: '.handlebars'
    };

    transporter.use('compile', hhs(handlebarOptions));

    console.log(userData.link);
    const mailOptions = {
      from: 'tyrpuchy0611@gmail.com',
      to: userData.email,
      subject: userData.subject,
      template: 'email',
      context: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        link: userData.link,
        type: userData.type
      }
    };

    return await transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = new EmailNotificationService();
