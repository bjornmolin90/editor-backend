var express = require('express');
var router = express.Router();

const docsModel = require("../models/model");

router.get('/', async function(req, res, next) {
    const docs = await docsModel.getAllDocs();
    const data = {
        data: docs
    };

    res.json(data);
    }
);

router.post('/', async function(req, res, next) {
    const newDoc = req.body;
    const doc = await docsModel.insertDoc(newDoc);
        const data = {
        data: doc
    };
    res.json(data);
    }
);

router.put('/', async function(req, res, next) {
    const newDoc = req.body;
    const doc = await docsModel.updateDoc(newDoc);
        const data = {
        data: doc
    };
    res.json(data);
    }
);

module.exports = router;