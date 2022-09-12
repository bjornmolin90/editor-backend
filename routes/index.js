var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "EDITOR KMOM02"
        }
    };

    res.json(data);
});

module.exports = router;