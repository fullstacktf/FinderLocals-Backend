import * as  express from 'express';
import { getLocals, createLocals} from './controller';
const router = express.Router();


router.get('/prueba', (req, res) => {  
    if (req.session.views) {
        let x = req.session.views++;
        console.log(x);
        res.json(getLocals());
    } else {
        req.session.views = 1;
        res.json(getLocals());
    }
});

router.get('/locals', (req, res) =>  { getLocals().then(locals => res.json(locals)).catch(err => res.status(500).send(err)); });

router.post('/createlocal', (req, res) => {
    createLocals(req.body).then(result => res.json(result)).catch(err => res.status(400).send(err));
});

export = router;