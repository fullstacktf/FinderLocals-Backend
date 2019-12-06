import * as express from "express";
import * as morgan from "morgan";
import * as compression from "compression";
import * as methodOverride from "method-override";
import * as notifier from "node-notifier";
//import * as session from "express-session";
import * as rateLimit from "express-rate-limit";
import * as localsRouter from "./src/api/locals";
import * as cors from "cors";
import * as request from "superagent";
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000"
};
const slack =
  "https://hooks.slack.com/services/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";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: "Too many requests,  please try again after 15 min"
});

function errorSlack(err, req, res, next) {
  if (!err) {
    return next();
  }
  const errorSlack = { text: `Error in ${req.method} ${req.url}` };
  request
    .post(slack)
    .send(errorSlack)
    .end(err => {
      next(err);
    });
}

app.use(cors(corsOptions));
app.use(apiLimiter);
app.use(express.json());
//app.use(session({ secret: "1234" }));
app.use(morgan("combined"));
app.use(compression());
app.use("/locals", localsRouter);

function errorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }
  if (err) {
    const message = `Error en ${req.method} ${req.url}`;
    notifier.notify({ title: "Error", message });
    res.status(500).send("Algo se ha roto");
  }
}

if (process.env.NODE_ENV === "development") {
  app.use(errorSlack);
  // } else {
  //   app.use(methodOverride());
  //   app.use(errorHandler);
}
app.listen(8080, () => console.log("Ready on port 8080!"));
