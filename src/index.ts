import compression from "compression";
import express, { Application } from "express";
import responseTime from "response-time";
import { issueSig, withAuth } from "./with-auth";

const app: Application = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(responseTime());
app.use(compression());

app.get("/", (_req, res) => {
  res.status(200).json('hi mom');
});

app.get("/protected", withAuth, (req, res) => {
  res.status(200).json((req as any).tok);
});

app.get("/get-sig", (_req, res) => {
  res.status(200).json(issueSig({ msg: 'hi mom'}));
});

app.listen(process.env.PORT);
export default app;
