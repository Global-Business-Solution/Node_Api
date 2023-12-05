'use strict';

const express = require('express');
const router = express.Router();
const rotap = '/GBS';

const route = router.get(rotap, (req, res, next) => {
    res.status(200).send({ title: 'Servidor de API - GBS 2020 - EGIS',
                           version: '0.0.2'});
 });



module.exports = router;