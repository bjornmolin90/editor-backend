const express = require('express');
const router = express.Router();

const userModel = require("../models/users");

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/register', async function(req, res) {
    const newUser = req.body;
    const result = await userModel.register(res, newUser);
    return result
    }
);

router.post('/login', async function(req, res) {
    const user = req.body;
    const result = await userModel.login(res, user);
    return result
    }
);

router.get('/users', async function(req, res) {
    const docs = await userModel.getAllUsers();
    const data = {
        data: docs
    };

    res.status(200).json(data);
}
);

router.post('/mail', async function(req, res) {
    const msg = req.body;
    (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
    }
);

module.exports = router;