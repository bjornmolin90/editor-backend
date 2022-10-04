const express = require('express');
const router = express.Router();

const docsModel = require("../models/model");

router.get('/', async function(req, res) {
    const docs = await docsModel.getAllDocs();
    const data = {
        data: docs
    };

    res.status(200).json(data);
}
);

router.post('/', async function(req, res) {
    const newDoc = req.body;
    const doc = await docsModel.insertDoc(newDoc);
    const data = {
        data: doc
    };

    res.status(201).json(data);
}
);

router.put('/', async function(req, res) {
    const newDoc = req.body;
    const doc = await docsModel.updateDoc(newDoc);
    const data = {
        data: doc
    };

    res.status(201).json(data);
}
);

router.put('/user', async function(req, res) {
    const newUser = req.body;
    const user = await docsModel.addUser(newUser);
    const data = {
        data: user
    };

    res.status(201).json(data);
}
);

module.exports = router;
