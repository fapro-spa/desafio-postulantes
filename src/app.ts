import express, { Request, Response } from 'express';
import { getScrapedData } from "./scrapingWeb";

const app = express();

app.get('/', async (req: Request, res: Response) => {
    const json = await getScrapedData();
    res.send(json);
});

export default app;