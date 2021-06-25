const nodemailer = require("nodemailer");
const cron = require("node-cron");
const jwt = require("jsonwebtoken");
const request = require("request");
const { json } = require("body-parser");
let axios = require("axios");

let transporter, testAccount

// async..await is not allowed in global scope, must use a wrapper
class SendMails { 
  async newCompany(body) {
    let { email, subject, text="" } = body;
    if(!email || !subject){
        throw "email or subject missing";
    }
    if(!testAccount){
        testAccount = await nodemailer.createTestAccount();
    }
    if(!transporter){
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
        });
    }
    let token = jwt.sign({ email }, "JWTSECRET", { expiresIn: "24h" });
    let location = "http://localhost:5000/";

    let html = `<div style="
            background: #f2f2f2;
            height: 650px;
            padding-top: 50px;
        ">
        
            <div style="
                    background: #fefefe;
                    height: 600px;
                    width: 650px;
                    margin: auto;
                ">
        
        
                    <div style="
                            height: 100px;
                            padding: 30px 0px;
                            text-align: center;
                            font-size: 4rem;
                            font-weight: 600;
                            text-shadow: 2px 5px 6px #636363;
                        ">
                        <span style="
                            color: #00b074;
                        ">Uppscale</span>
                        <span></span>
                    </div>
                        <div style="
                            height: 420px;
                            text-align: center;
                        ">
                            <p style="
                                font-size: 1rem;
                                color: #848484;
                            ">Hi there!</p>
                            <p style="
                                font-size: 1rem;
                                    color: #848484;
                                    margin-bottom: 50px;
                                ">Activate your Account
                            </p>
                            <a style="
                                    font-size: 20px;
                                    background: #00b074;
                                    padding: 10px 15px;
                                    color: white;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    text-decoration: none;
                                "
                                href="${location}activate-account/${token}"
                                title="Activate Account" target="_blank"
        
                                >Activate Account</a>
                            <p style="
                                margin-top: 5rem;
                                font-size: 1rem;
                                color: #848484;
                            ">If you're having trouble clicking the button, copy the url and paste into your web broswer</p>
                            <p style="
                                font-size: 0.90rem;
                                color: #335ece;
                                text-decoration: underline;
                            ">${location}activate-account/${token}</p>
        
                        </div>
                    </div>
            </div>
        </div>`; // html body


    let data = {
        from: testAccount.email,
        html,
        subject,
        to: [email, ],
        text,
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: testAccount.email,
          pass: testAccount.pass
        }
    });
    cron.schedule('* * * * *',()=>{
        transporter.sendMail(data,(error,info)=>{
            if(error)
                console.log(error);
            else
                console.log('Mail sent'+info.response);    
        });
    });
    let info = await transporter.sendMail(data);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}
module.exports = new SendMails();
