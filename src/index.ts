import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import router from "./routes/routes";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { Query } from "utils/types";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: `${process.env.PROJECT_ID}`,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  }),
});

const app = express();
const PORT = process.env.PORT;

const authVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.userId)
      return res.status(400).json({ error: "userId is required" });
    const userId = req.query.userId as string;
    const user = await getAuth().getUser(userId);
    if (!user) return res.status(400).json({ error: "User not found" });
    next();
  } catch (error) {
    console.error(error);
  }
};

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(authVerification);

app.use("/api", router);

app.listen(PORT);
