import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import Article from "./models/article.model";

const app: Express = express();

dotenv.config();

const port: number | string = process.env.PORT || 3000;
database.connect();

app.get("/articles", async (req: Request, res: Response): Promise<void> => {
  const articles = await Article.find({ deleted: false });
  res.status(200).json(articles);
});

app.listen(port, (): void => {
  return console.log(`Server is listening on ${port}`);
});
