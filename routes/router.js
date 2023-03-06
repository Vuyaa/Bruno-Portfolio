import express from "express"

const router = express.Router();

import aws from "aws-sdk"

const ses = new aws.SES({ region: "eu-central-1" })

router.post("/email", (req, res) => {
    const { email, message, name } = req.body;
    sesTest("vuyaa95@gmail.com", email, message, name).then((val) =>{
        console.log("got this back", val)
        res.send("successful")
    }).catch((err)=>{
        res.send("/error" + err)
    })
});
function sesTest(emailTo, emailFrom, message, name) {
    const params = {
        Destination: {
            ToAddresses: [emailTo]
        },
        Message: {
            Body: {
                Text: {
                    Data: "From Contact: " + name + "\n" + message
                }
            },
            Subject: {
                Data: "Name: " + emailFrom
            }
        },
        Source: "st_im@hotmail.com"
    };
    return ses.sendEmail(params).promise();
}
export default router;