// const express = require('express');
// const router = express.Router();
// const pdf = require('html-pdf');
// const nodemailer = require('nodemailer');

// // Email configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// const generateLeavePDF = (application, actionDetails) => {
//   return new Promise((resolve, reject) => {
//     const html = `
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 20px; }
//             h1 { color: #2c3e50; }
//             .header { text-align: center; margin-bottom: 30px; }
//             .section { margin-bottom: 20px; }
//             .label { font-weight: bold; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>Leave Application Status</h1>
//             <p>Generated on ${new Date().toLocaleDateString()}</p>
//           </div>
          
//           <div class="section">
//             <h2>Applicant Details</h2>
//             <p><span class="label">Name:</span> ${application.name}</p>
//             <p><span class="label">Designation:</span> ${application.designation}</p>
//             <p><span class="label">Ministry:</span> ${application.ministry}</p>
//             <p><span class="label">Leave Dates:</span> ${new Date(application.commenceLeaveDate).toLocaleDateString()} to ${new Date(application.resumeDutiesDate).toLocaleDateString()}</p>
//           </div>
          
//           <div class="section">
//             <h2>Processing Details</h2>
//             <p><span class="label">Action:</span> ${actionDetails.actionName}</p>
//             <p><span class="label">Status:</span> ${actionDetails.status}</p>
//             <p><span class="label">Processed By:</span> ${actionDetails.processedBy}</p>
//             <p><span class="label">Date:</span> ${new Date().toLocaleDateString()}</p>
//           </div>
//         </body>
//       </html>
//     `;

//     pdf.create(html, { format: 'Letter' }).toBuffer((err, buffer) => {
//       if (err) return reject(err);
//       resolve(buffer);
//     });
//   });
// };

// router.post('/send-leave-notification', async (req, res) => {
//   try {
//     const { application, actionDetails, applicantEmail } = req.body;
    
//     if (!application || !actionDetails || !applicantEmail) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     const pdfBuffer = await generateLeavePDF(application, actionDetails);
    
//     const mailOptions = {
//       from: `"Smart Leave System" <${process.env.EMAIL_USER}>`,
//       to: applicantEmail,
//       subject: `Leave Application ${actionDetails.status}`,
//       text: `Dear ${application.name},\n\nYour leave application has been processed.\n\nStatus: ${actionDetails.status}\n\nPlease see attached PDF for details.`,
//       attachments: [{
//         filename: `leave_status_${application._id}.pdf`,
//         content: pdfBuffer
//       }]
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true });
    
//   } catch (error) {
//     console.error('Notification error:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to send notification',
//       error: error.message 
//     });
//   }
// });

// module.exports = router;

import express from 'express'
import pdf from 'html-pdf';
import nodemailer from 'nodemailer';

const router = express.Router();

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Email credentials not configured');
}

// Email configuration with improved options
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  pool: true,
  maxConnections: 1,
  rateLimit: 1 // 1 message per second
});

const generateLeavePDF = (application, actionDetails) => {
  return new Promise((resolve, reject) => {
    const statusClass = actionDetails.status.toLowerCase().includes('approve') ? 
      'status-approval' : 'status-rejection';

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            h1 { color: #2c3e50; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
            .section { margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
            .label { font-weight: bold; display: inline-block; width: 150px; }
            .${statusClass} { color: ${statusClass === 'status-approval' ? 'green' : 'red'}; font-weight: bold; }
            .footer { margin-top: 30px; text-align: center; font-size: 0.8em; color: #777; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Leave Application Status</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <h2>Applicant Details</h2>
            <p><span class="label">Name:</span> ${application.name}</p>
            <p><span class="label">Designation:</span> ${application.designation}</p>
            <p><span class="label">Ministry:</span> ${application.ministry}</p>
            <p><span class="label">Leave Dates:</span> ${new Date(application.commenceLeaveDate).toLocaleDateString()} to ${new Date(application.resumeDutiesDate).toLocaleDateString()}</p>
            <p><span class="label">Reason:</span> ${application.reasonForLeave}</p>
          </div>
          
          <div class="section">
            <h2>Processing Details</h2>
            <p><span class="label">Action:</span> ${actionDetails.actionName}</p>
            <p><span class="label">Status:</span> <span class="${statusClass}">${actionDetails.status}</span></p>
            <p><span class="label">Processed By:</span> ${actionDetails.processedBy}</p>
            <p><span class="label">Date:</span> ${new Date().toLocaleDateString()}</p>
            ${actionDetails.comments ? `<p><span class="label">Comments:</span> ${actionDetails.comments}</p>` : ''}
          </div>
          
          <div class="footer">
            <p>This is an auto-generated document. Please do not reply.</p>
          </div>
        </body>
      </html>
    `;

    const pdfOptions = {
      format: 'Letter',
      timeout: 30000,
      border: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    };

    pdf.create(html, pdfOptions).toBuffer((err, buffer) => {
      if (err) {
        console.error('PDF generation error:', err);
        return reject(new Error('Failed to generate PDF'));
      }
      resolve(buffer);
    });
  });
};

router.post('/send-leave-notification', async (req, res) => {
  try {
    const { application, actionDetails, applicantEmail } = req.body;
    
    // Validate input
    if (!application || !actionDetails || !applicantEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields',
        required: ['application', 'actionDetails', 'applicantEmail']
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format'
      });
    }

    const pdfBuffer = await generateLeavePDF(application, actionDetails);
    
    const mailOptions = {
      from: `"Smart Leave System" <${process.env.EMAIL_USER}>`,
      to: applicantEmail,
      subject: `Leave Application ${actionDetails.status}`,
      text: `Dear ${application.name},\n\nYour leave application has been ${actionDetails.status.toLowerCase()}.\n\nStatus: ${actionDetails.status}\nAction: ${actionDetails.actionName}\nProcessed By: ${actionDetails.processedBy}\n\nPlease see attached PDF for details.`,
      html: `
        <p>Dear ${application.name},</p>
        <p>Your leave application has been <strong>${actionDetails.status.toLowerCase()}</strong>.</p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>Status: ${actionDetails.status}</li>
          <li>Action: ${actionDetails.actionName}</li>
          <li>Processed By: ${actionDetails.processedBy}</li>
          ${actionDetails.comments ? `<li>Comments: ${actionDetails.comments}</li>` : ''}
        </ul>
        <p>Please find attached PDF for official record.</p>
        <p>Best regards,<br/>Smart Leave System</p>
      `,
      attachments: [{
        filename: `leave_status_${application._id || Date.now()}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    res.status(200).json({ 
      success: true,
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send notification',
      error: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});

export default router;