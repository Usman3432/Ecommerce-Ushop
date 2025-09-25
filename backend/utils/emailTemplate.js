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
    <title>Ushop - Password Reset</title>
    <style type="text/css" rel="stylesheet" media="all">
      @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
        font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
        background-color: #f2f4f6;
        color: #51545e;
      }

      a {
        color: #3869d4;
        text-decoration: none;
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

      h1 {
        margin-top: 0;
        color: #333333;
        font-size: 24px; /* Slightly larger for prominence */
        font-weight: bold;
        text-align: left;
      }

      p {
        margin: 0.4em 0 1.1875em;
        font-size: 16px;
        line-height: 1.625;
        color: #51545e;
      }

      p.sub {
        font-size: 13px;
        color: #a8aaaf; /* Lighter color for secondary text */
      }

      .align-center {
        text-align: center;
      }

      .button {
        background-color: #22bc66; /* Green for positive action */
        border: 12px solid #22bc66; /* Increased padding for better clickability */
        display: inline-block;
        color: #fff;
        text-decoration: none;
        border-radius: 5px; /* Slightly more rounded */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* More pronounced shadow */
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
        font-weight: bold; /* Make button text bold */
        font-size: 16px;
      }

      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
          text-align: center !important;
        }
      }

      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #f2f4f6;
      }

      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
      }

      .email-masthead {
        padding: 25px 0;
        text-align: center;
      }

      .email-masthead_name {
        font-size: 20px; /* Larger logo text */
        font-weight: bold;
        color: #333333; /* Darker for better visibility */
        text-decoration: none;
        text-shadow: 0 1px 0 rgba(255,255,255,0.7); /* Subtle shadow */
      }

      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
      }

      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        background-color: #ffffff;
        border-radius: 8px; /* Slightly rounded corners for the main body */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Soft shadow for depth */
      }

      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 25px 0; /* More padding for footer */
        text-align: center;
      }

      .email-footer p {
        color: #a8aaaf;
        font-size: 13px;
      }

      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        text-align: center;
      }

      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #eaeaec;
      }

      .content-cell {
        padding: 45px;
      }

      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
          border-radius: 0; /* Remove rounded corners on small screens */
          box-shadow: none; /* Remove shadow on small screens */
        }
        .content-cell {
            padding: 25px; /* Reduce padding on small screens */
        }
      }

      @media (prefers-color-scheme: dark) {
        body,
        .email-body,
        .email-body_inner,
        .email-content,
        .email-wrapper,
        .email-masthead,
        .email-footer {
          background-color: #1a1a1a !important; /* Darker background */
          color: #e0e0e0 !important; /* Lighter text */
        }
        p,
        ul,
        ol,
        blockquote,
        h1,
        h2,
        h3,
        span {
          color: #e0e0e0 !important;
        }
        .email-body_inner {
            background-color: #2a2a2a !important; /* Darker inner body */
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
        }
        .email-masthead_name {
          color: #ffffff !important;
          text-shadow: none !important;
        }
        .body-sub {
            border-top-color: #444444 !important;
        }
        .email-footer p {
            color: #888888 !important;
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
    <span class="preheader"
      >Reset your Ushop password. This link is valid for 30 minutes.</span
    >
    <table
      class="email-wrapper"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
    >
      <tr>
        <td align="center">
          <table
            class="email-content"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
          >
            <tr>
              <td class="email-masthead">
                <a
                  href="https://Ushop.com"
                  class="f-fallback email-masthead_name"
                >
                  Ushop
                </a>
              </td>
            </tr>

            <tr>
              <td
                class="email-body"
                width="570"
                cellpadding="0"
                cellspacing="0"
              >
                <table
                  class="email-body_inner"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <h1>Hello ${username},</h1>
                        <p>
                          We received a request to reset the password for your Ushop account.
                          To proceed, please click the button below.
                        </p>

                        <table
                          class="body-action"
                          align="center"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tr>
                            <td align="center">
                              <table
                                width="100%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                              >
                                <tr>
                                  <td align="center">
                                    <a
                                      href="${resetUrl}"
                                      class="f-fallback button"
                                      target="_blank"
                                      >Reset My Password Now</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p>
                          <strong
                            >This password reset link is only valid for the next 30
                            minutes.</strong
                          > For security reasons, we recommend resetting your password promptly.
                        </p>
                        <p>
                          If you did not request a password reset, please ignore
                          this email. Your account security is important to us.
                        </p>
                        <p>Sincerely, <br />The Ushop Team</p>

                        <table class="body-sub" role="presentation">
                          <tr>
                            <td>
                              <p class="f-fallback sub">
                                If the button above doesn't work, you can copy and paste the following link into your web browser:
                              </p>
                              <p class="f-fallback sub">
                                <a href="${resetUrl}">${resetUrl}</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table
                  class="email-footer"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">
                        &copy; ${new Date().getFullYear()} Ushop. All rights reserved.
                        <br />1234 Commerce Street, Suite 1234 <br />City, State, ZIP Code
                        <br /><a href="https://Ushop.com/support">Support</a> | <a href="https://Ushop.com/privacy">Privacy Policy</a>
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
</html>
`;
