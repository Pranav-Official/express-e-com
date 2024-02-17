import { Request, Response } from "express";
import sendInviteService from "../../services/subcription_services/sendInviteService";

const setInvites = async (req: Request, res: Response) => {
  const { customer_ids, supplier_id } = req.body;
  if (!customer_ids || !supplier_id) {
    res.status(400).send("All fields are required");
    return;
  }
  sendInviteService(req, res);
};

export default setInvites;
