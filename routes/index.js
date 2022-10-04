const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    const data = {
        data: {
            msg: "EDITOR JS-RAMVERK"
        }
    };

    res.json(data);
});

module.exports = router;
