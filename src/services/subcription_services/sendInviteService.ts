import { Request, Response } from "express";
import EcSuppliers from "../../models/ec_suppliers";
import { forEachChild } from "typescript";
import Invites from "../../models/invites";
import Customers from "../../models/customers";

const sendInviteService = async (req: Request, res: Response) => {
  const { customer_ids, supplier_id } = req.body;
  if (!supplier_id) {
    res.status(400).send("Supplier ID is required");
    return;
  }
  const supplier = await EcSuppliers.findOne({
    where: { registration_id: supplier_id },
  });
  if (!supplier) {
    res.status(400).send("Invalid supplier");
    return;
  }

  try {
    customer_ids.forEach(async (customer_id: string) => {
      const customer = await Customers.findOne({
        where: { registration_id: parseInt(customer_id) },
      });
      if (!customer) {
        res.status(400).send("Invalid customer");
        return;
      }
      console.log(customer.id, supplier.id);
      await Invites.create({
        customer_id: customer.id,
        ec_supplier_id: supplier.id,
      });
    });
    return res.status(200).json("Invites sent successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
};

export default sendInviteService;
