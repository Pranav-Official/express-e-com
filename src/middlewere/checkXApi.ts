import { Request, Response } from "express";

export const CheckXApi = (req: Request, res: Response, next: any) => {
  const x_api_key = req.headers["x-api-key"];
  if (x_api_key === "autherisemeplease") {
    next();
  } else {
    res.status(400).send("Invalid API or NO API KEY PROVIDED");
  }
};
