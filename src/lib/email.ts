import nodemailer from 'nodemailer'
import { Shipment, User } from './supabase'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password for Gmail
  },
})

export interface EmailData {
  to: string
  subject: string
  html: string
}

export interface ShipmentNotificationData {
  user: User
  shipment: Shipment
  statusChange?: {
    oldStatus: string
    newStatus: string
    location: string
    description: string
  }
}

export class EmailService {
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      await transporter.sendMail({
        from: `"QuickVessel" <${process.env.EMAIL_USER}>`,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
      })
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  static async sendShipmentCreatedNotification(data: ShipmentNotificationData): Promise<boolean> {
    const { user, shipment } = data
    
    const subject = `Your Shipment ${shipment.tracking_number} Has Been Created - QuickVessel`
    const html = this.generateShipmentCreatedTemplate(user, shipment)
    
    return this.sendEmail({
      to: user.email,
      subject,
      html,
    })
  }

  static async sendStatusUpdateNotification(data: ShipmentNotificationData): Promise<boolean> {
    const { user, shipment, statusChange } = data
    
    if (!statusChange) return false
    
    const subject = `Shipment ${shipment.tracking_number} Status Update - QuickVessel`
    const html = this.generateStatusUpdateTemplate(user, shipment, statusChange)
    
    return this.sendEmail({
      to: user.email,
      subject,
      html,
    })
  }

  private static generateShipmentCreatedTemplate(user: User, shipment: Shipment): string {
    const estimatedDelivery = shipment.estimated_delivery 
      ? new Date(shipment.estimated_delivery).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'To be determined'

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shipment Created - QuickVessel</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
            }
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 30px;
            }
            .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                color: #1e293b;
            }
            .shipment-card {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .tracking-number {
                font-size: 24px;
                font-weight: 700;
                color: #2563eb;
                margin-bottom: 15px;
                font-family: 'Courier New', monospace;
            }
            .status-badge {
                display: inline-block;
                background: #fbbf24;
                color: #92400e;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin: 20px 0;
            }
            .info-item {
                display: flex;
                flex-direction: column;
            }
            .info-label {
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
            }
            .info-value {
                font-size: 14px;
                color: #1e293b;
                font-weight: 500;
            }
            .route {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 20px 0;
                color: #64748b;
            }
            .route-item {
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 12px 16px;
                font-weight: 500;
            }
            .arrow {
                margin: 0 15px;
                font-size: 18px;
                color: #94a3b8;
            }
            .cta-button {
                display: inline-block;
                background: #2563eb;
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                text-align: center;
                margin: 20px 0;
                transition: background-color 0.2s;
            }
            .cta-button:hover {
                background: #1d4ed8;
            }
            .footer {
                background: #f8fafc;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #e2e8f0;
            }
            .footer p {
                margin: 0;
                color: #64748b;
                font-size: 14px;
            }
            .footer a {
                color: #2563eb;
                text-decoration: none;
            }
            @media (max-width: 600px) {
                .info-grid {
                    grid-template-columns: 1fr;
                }
                .route {
                    flex-direction: column;
                }
                .arrow {
                    transform: rotate(90deg);
                    margin: 10px 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚢 QuickVessel</h1>
                <p>Your shipment has been created and is ready for tracking</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Hello ${user.full_name || user.email},
                </div>
                
                <p>Great news! Your shipment has been successfully created and is now in our system. You can track its progress using the details below.</p>
                
                <div class="shipment-card">
                    <div class="tracking-number">${shipment.tracking_number}</div>
                    <span class="status-badge">${shipment.status.replace('_', ' ').toUpperCase()}</span>
                    
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Description</div>
                            <div class="info-value">${shipment.description}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Current Location</div>
                            <div class="info-value">${shipment.current_location}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Weight</div>
                            <div class="info-value">${shipment.weight ? `${shipment.weight} kg` : 'N/A'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Dimensions</div>
                            <div class="info-value">${shipment.dimensions || 'N/A'}</div>
                        </div>
                    </div>
                    
                    <div class="route">
                        <div class="route-item">${shipment.origin}</div>
                        <div class="arrow">→</div>
                        <div class="route-item">${shipment.destination}</div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <div class="info-label">Estimated Delivery</div>
                        <div class="info-value" style="font-size: 16px; color: #2563eb;">${estimatedDelivery}</div>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/app" class="cta-button">
                        Track Your Shipment
                    </a>
                </div>
                
                <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
                    You'll receive email notifications whenever there are updates to your shipment status. 
                    Keep this tracking number safe: <strong>${shipment.tracking_number}</strong>
                </p>
            </div>
            
            <div class="footer">
                <p>
                    This email was sent by QuickVessel. 
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}">Visit our website</a> for more information.
                </p>
            </div>
        </div>
    </body>
    </html>
    `
  }

  private static generateStatusUpdateTemplate(user: User, shipment: Shipment, statusChange: any): string {
    const statusColors: { [key: string]: string } = {
      'pending': '#fbbf24',
      'in_transit': '#3b82f6',
      'out_for_delivery': '#f97316',
      'delivered': '#10b981',
      'exception': '#ef4444'
    }

    const statusColor = statusColors[statusChange.newStatus] || '#6b7280'
    const statusText = statusChange.newStatus.replace('_', ' ').toUpperCase()

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shipment Status Update - QuickVessel</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
            }
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content {
                padding: 30px;
            }
            .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                color: #1e293b;
            }
            .status-update {
                background: #f8fafc;
                border-left: 4px solid ${statusColor};
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .status-badge {
                display: inline-block;
                background: ${statusColor};
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 15px;
            }
            .tracking-number {
                font-size: 20px;
                font-weight: 700;
                color: #2563eb;
                margin-bottom: 10px;
                font-family: 'Courier New', monospace;
            }
            .update-details {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
            }
            .update-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #f1f5f9;
            }
            .update-item:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }
            .update-label {
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 600;
            }
            .update-value {
                font-size: 14px;
                color: #1e293b;
                font-weight: 500;
            }
            .description-box {
                background: #f1f5f9;
                border-radius: 6px;
                padding: 12px;
                margin-top: 10px;
            }
            .description-text {
                font-style: italic;
                color: #475569;
                font-size: 14px;
            }
            .cta-button {
                display: inline-block;
                background: #2563eb;
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                text-align: center;
                margin: 20px 0;
                transition: background-color 0.2s;
            }
            .cta-button:hover {
                background: #1d4ed8;
            }
            .footer {
                background: #f8fafc;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #e2e8f0;
            }
            .footer p {
                margin: 0;
                color: #64748b;
                font-size: 14px;
            }
            .footer a {
                color: #2563eb;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚢 QuickVessel</h1>
                <p>Your shipment status has been updated</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Hello ${user.full_name || user.email},
                </div>
                
                <p>We have an update on your shipment. Here are the latest details:</p>
                
                <div class="status-update">
                    <div class="tracking-number">${shipment.tracking_number}</div>
                    <span class="status-badge">${statusText}</span>
                    
                    <div class="update-details">
                        <div class="update-item">
                            <span class="update-label">Previous Status</span>
                            <span class="update-value">${statusChange.oldStatus.replace('_', ' ').toUpperCase()}</span>
                        </div>
                        <div class="update-item">
                            <span class="update-label">New Status</span>
                            <span class="update-value" style="color: ${statusColor}; font-weight: 700;">${statusText}</span>
                        </div>
                        <div class="update-item">
                            <span class="update-label">Current Location</span>
                            <span class="update-value">${statusChange.location}</span>
                        </div>
                        <div class="update-item">
                            <span class="update-label">Updated</span>
                            <span class="update-value">${new Date().toLocaleString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                        </div>
                    </div>
                    
                    ${statusChange.description ? `
                    <div class="description-box">
                        <div class="update-label">Update Details</div>
                        <div class="description-text">${statusChange.description}</div>
                    </div>
                    ` : ''}
                </div>
                
                <div style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/app" class="cta-button">
                        View Full Tracking Details
                    </a>
                </div>
                
                <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
                    You'll continue to receive updates as your shipment progresses. 
                    Thank you for choosing QuickVessel!
                </p>
            </div>
            
            <div class="footer">
                <p>
                    This email was sent by QuickVessel. 
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}">Visit our website</a> for more information.
                </p>
            </div>
        </div>
    </body>
    </html>
    `
  }

  static async sendSupportReplyNotification(options: {
    to: string
    userName?: string
    subject: string
    originalMessage: string
    replyMessage: string
    supportLink?: string
  }): Promise<boolean> {
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
      const supportLink = options.supportLink || `${appUrl}/support`

      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Support Reply</title>
  <style>
    body { background-color: #0f172a; margin:0; padding:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
    .container { max-width: 640px; margin: 0 auto; padding: 24px; }
    .card { background: #0b1220; border: 1px solid #1f2a44; border-radius: 16px; overflow: hidden; }
    .header { padding: 20px 24px; border-bottom: 1px solid #1f2a44; display:flex; align-items:center; }
    .badge { background: linear-gradient(135deg, #3b82f6, #a855f7); width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; margin-right:12px; }
    .title { color:#fff; font-weight:700; font-size:18px; margin:0; }
    .muted { color:#94a3b8; font-size:13px; margin:0; }
    .content { padding: 24px; color:#cbd5e1; line-height:1.6; }
    .block { background:#0f172a; border:1px solid #1f2a44; border-radius:12px; padding:16px; margin-top:12px; color:#e2e8f0; }
    .button { display:inline-block; background: linear-gradient(90deg, #3b82f6, #a855f7); color:#fff; text-decoration:none; padding:12px 18px; border-radius:10px; font-weight:600; margin-top:16px; }
    .footer { padding: 20px 24px; border-top: 1px solid #1f2a44; color:#94a3b8; font-size:12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="badge">QV</div>
        <div>
          <p class="title">Support Reply from QuickVessel</p>
          <p class="muted">Subject: ${escapeHtml(options.subject)}</p>
        </div>
      </div>
      <div class="content">
        <p>Hi${options.userName ? ` ${escapeHtml(options.userName)}` : ''},</p>
        <p>Our support team has replied to your message. See the details below.</p>
        <div class="block">
          <div style="font-size:12px; color:#94a3b8; margin-bottom:6px;">Your message</div>
          <div>${escapeHtml(options.originalMessage)}</div>
        </div>
        <div class="block">
          <div style="font-size:12px; color:#94a3b8; margin-bottom:6px;">Admin reply</div>
          <div>${escapeHtml(options.replyMessage)}</div>
        </div>
        <a href="${supportLink}" class="button" target="_blank" rel="noopener noreferrer">View conversation</a>
      </div>
      <div class="footer">
        You’re receiving this email because you have an active support conversation with QuickVessel.
      </div>
    </div>
  </div>
</body>
</html>`

      const subject = `Support reply: ${options.subject}`

      return await this.sendEmail({
        to: options.to,
        subject,
        html,
      })
    } catch (error) {
      console.error('Error sending support reply notification:', error)
      return false
    }
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
