const express = require('express');
const router = express.Router();
let controller = require('./controller');

router.get('/prueba', (req, res) => {
    if (req.session.views) {
        let x = req.session.views++;
        console.log(x);
        res.json(controller.getLocals());
    } else {
        req.session.views = 1;
        res.json(controller.getLocals());
    }
});

router.post('/create', (req, res) => res.json(controller.createLocals(req.body)));



module.exports = router;