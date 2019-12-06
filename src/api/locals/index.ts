import * as express from "express";
import { getLocals, createLocals } from "./controller";
const router = express.Router();

router.get("/mongolocals", (req, res) => {
  getLocals()
    .then(locals => res.json(locals))
    .catch(err => res.status(500).send(err));
});

router.post("/createlocal", (req, res) => {
  createLocals(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err));
});

export = router;
