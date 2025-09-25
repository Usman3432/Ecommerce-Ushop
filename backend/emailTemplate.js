export const getResetPasswordTemp = (
  username,
  resetUrl
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Reset Your Password - Ushop</title>
    <style type="text/css" rel="stylesheet" media="all">
      @import url("https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap");
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
        background-color: #f8fafc;
        font-family: "Inter", Helvetica, Arial, sans-serif;
      }

      a {
        color: #2563eb;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      a img {
        border: none;
      }

      td {
        word-break: break-word;
      }

      .preheader {
        display: none !important;
        visibility: hidden;
        mso-hide: all;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      }

      body,
      td,
      th {
        font-family: "Inter", Helvetica, Arial, sans-serif;
      }

      h1 {
        margin-top: 0;
        color: #1e293b;
        font-size: 28px;
        font-weight: 700;
        text-align: center;
        line-height: 1.2;
      }

      h2 {
        margin-top: 0;
        color: #1e293b;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
      }

      h3 {
        margin-top: 0;
        color: #1e293b;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
      }

      td,
      th {
        font-size: 16px;
      }

      p,
      ul,
      ol,
      blockquote {
        margin: 0.5em 0 1.5em;
        font-size: 16px;
        line-height: 1.6;
        color: #475569;
      }

      p.sub {
        font-size: 14px;
        color: #64748b;
      }

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .align-center {
        text-align: center;
      }

      .u-margin-bottom-none {
        margin-bottom: 0;
      }

      .button {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        border: none;
        display: inline-block;
        color: #fff;
        text-decoration: none;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 16px;
        padding: 16px 32px;
        transition: all 0.3s ease;
      }

      .button:hover {
        background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
        box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
        transform: translateY(-2px);
      }

      .button--green {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
      }

      .button--green:hover {
        background: linear-gradient(135deg, #047857 0%, #065f46 100%);
        box-shadow: 0 6px 16px rgba(5, 150, 105, 0.4);
      }

      .button--red {
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
      }

      .button--red:hover {
        background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
      }

      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
          text-align: center !important;
          padding: 14px 24px;
        }
      }

      .icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }

      .card {
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin: 20px 0;
        overflow: hidden;
      }

      .card-header {
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #e2e8f0;
      }

      .card-body {
        padding: 30px;
      }

      .social {
        width: auto;
        text-align: center;
      }

      .social td {
        padding: 0 10px;
        width: auto;
      }

      .social_icon {
        height: 32px;
        width: 32px;
        margin: 0 5px;
        padding: 0;
        border-radius: 50%;
        background-color: #e2e8f0;
        display: inline-block;
        text-align: center;
        line-height: 32px;
        color: #64748b;
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .social_icon:hover {
        background-color: #2563eb;
        color: #fff;
      }

      body {
        background-color: #f8fafc;
        color: #475569;
      }

      p {
        color: #475569;
      }

      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #f8fafc;
      }

      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .email-masthead {
        padding: 30px 0;
        text-align: center;
        background-color: #ffffff;
        border-bottom: 1px solid #e2e8f0;
      }

      .email-masthead_logo {
        width: 120px;
        height: auto;
      }

      .email-masthead_name {
        font-size: 24px;
        font-weight: 700;
        color: #1e293b;
        text-decoration: none;
        letter-spacing: -0.5px;
      }

      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .email-body_inner {
        width: 600px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 600px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
        margin-bottom: 20px;
      }

      .email-footer {
        width: 600px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 600px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
      }

      .email-footer p {
        color: #64748b;
        font-size: 14px;
      }

      .body-action {
        width: 100%;
        margin: 40px auto;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .body-sub {
        margin-top: 30px;
        padding-top: 30px;
        border-top: 1px solid #e2e8f0;
        background-color: #f8fafc;
        padding: 20px;
        border-radius: 0 0 12px 12px;
      }

      .content-cell {
        padding: 0;
      }

      .hero-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        padding: 40px 30px;
        text-align: center;
      }

      .hero-section h1 {
        color: #fff;
        margin-bottom: 10px;
      }

      .hero-section p {
        color: #e0e7ff;
        font-size: 18px;
        margin: 0;
      }

      .security-note {
        background-color: #fef3c7;
        border-left: 4px solid #f59e0b;
        padding: 15px 20px;
        margin: 20px 0;
        border-radius: 6px;
      }

      .security-note p {
        margin: 0;
        color: #92400e;
        font-size: 14px;
      }

      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
          border-radius: 0;
          margin: 0;
        }
        .hero-section {
          padding: 30px 20px;
        }
        h1 {
          font-size: 24px;
        }
      }

      @media (prefers-color-scheme: dark) {
        body,
        .email-body,
        .email-body_inner,
        .email-content,
        .email-wrapper,
        .email-masthead,
        .email-footer,
        .card {
          background-color: #1e293b !important;
          color: #e2e8f0 !important;
        }
        p,
        ul,
        ol,
        blockquote,
        h1,
        h2,
        h3,
        span {
          color: #e2e8f0 !important;
        }
        .email-masthead_name {
          color: #f1f5f9 !important;
        }
        .hero-section {
          background: linear-gradient(135deg, #4c51bf 0%, #553c9a 100%) !important;
        }
        .security-note {
          background-color: #451a03 !important;
          border-left-color: #d97706 !important;
        }
        .security-note p {
          color: #fbbf24 !important;
        }
        .card-header {
          background: linear-gradient(135deg, #334155 0%, #475569 100%) !important;
        }
        .body-sub {
          background-color: #334155 !important;
        }
      }

      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }
    </style>
    <!--[if mso]>
      <style type="text/css">
        .f-fallback {
          font-family: Arial, sans-serif;
        }
      </style>
    <![endif]-->
  </head>
  <body>
    <span class="preheader">🔐 Secure password reset for your Ushop account. Link expires in 30 minutes.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="email-masthead">
                <a href="https://Ushop.com" class="f-fallback email-masthead_name">
                  🛍️ Ushop
                </a>
              </td>
            </tr>
            <tr>
              <td class="email-body" width="600" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="600" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="hero-section">
                      <h1>Password Reset Request</h1>
                      <p>Secure your account with a new password</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="content-cell">
                      <div class="card">
                        <div class="card-header">
                          <h2>👋 Hello ${username},</h2>
                        </div>
                        <div class="card-body">
                          <p>We received a request to reset your password for your Ushop account. To ensure your account's security, we've generated a secure reset link for you.</p>

                          <div class="security-note">
                            <p><strong>⏰ Time-sensitive:</strong> This link will expire in 30 minutes for security reasons.</p>
                          </div>

                          <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                  <tr>
                                    <td align="center">
                                      <a href="${resetUrl}" class="f-fallback button button--green" target="_blank">
                                        🔑 Reset Your Password
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                          <p style="word-break: break-all; background-color: #f1f5f9; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 14px;">
                            <a href="${resetUrl}" style="color: #2563eb;">${resetUrl}</a>
                          </p>

                          <p><strong>Didn't request this?</strong> If you didn't ask for a password reset, please ignore this email. Your account remains secure.</p>

                          <p>For any questions or concerns, feel free to <a href="mailto:support@ushop.com">contact our support team</a>.</p>

                          <p>Best regards,<br>The Ushop Security Team</p>
                        </div>
                      </div>

                      <table class="body-sub" role="presentation">
                        <tr>
                          <td>
                            <p class="f-fallback sub align-center">
                              Stay connected with us:
                            </p>
                            <table class="social" align="center" role="presentation">
                              <tr>
                                <td>
                                  <a href="https://facebook.com/ushop" class="social_icon">📘</a>
                                </td>
                                <td>
                                  <a href="https://twitter.com/ushop" class="social_icon">🐦</a>
                                </td>
                                <td>
                                  <a href="https://instagram.com/ushop" class="social_icon">📷</a>
                                </td>
                                <td>
                                  <a href="https://linkedin.com/company/ushop" class="social_icon">💼</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="600" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell" align="center" style="padding: 20px;">
                      <p class="f-fallback sub align-center">
                        Ushop Inc.<br>
                        1234 Innovation Drive<br>
                        Tech City, TC 12345<br>
                        <a href="mailto:support@ushop.com">support@ushop.com</a> | <a href="https://ushop.com">ushop.com</a>
                      </p>
                      <p class="f-fallback sub align-center" style="margin-top: 10px;">
                        © 2023 Ushop. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
