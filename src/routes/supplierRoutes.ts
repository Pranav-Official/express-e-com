import { Request, Response, Router } from "express";
import EcSuppliers from "../models/ec_suppliers";
import Customers from "../models/customers";
import { CheckXApi } from "../middlewere/checkXApi";
import addProducts from "../controllers/products/addProducts";
import addBulkProducts from "../controllers/products/addBulkProducts";
import getProducts from "../controllers/products/getProducts";
import setInvites from "../controllers/subcription_plans/setInvites";

const router = Router();

router.get("/profile", CheckXApi, async (req: Request, res: Response) => {
  if (!req.body.registration_id || !req.body.user_type) {
    res.status(400).send("All fields are required");
    return;
  }
  if (req.body.user_type === "supplier") {
    try {
      const { registration_id } = req.body;
      const supplier = await EcSuppliers.findOne({
        where: { registration_id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (supplier) {
        res.status(200).json(supplier);
      } else {
        res.status(400).send("Invalid credentials");
      }
    } catch (err: any) {
      console.log(err);
      res.status(400).send("Error");
    }
  }
  if (req.body.user_type === "customer") {
    try {
      const { registration_id } = req.body;
      const customer = await Customers.findOne({
        where: { registration_id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        raw: true,
      });
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(400).send("Invalid credentials");
      }
    } catch (err: any) {
      console.log(err);
      res.status(400).send("Error");
    }
  }
});

router.post("/addProducts", async (req: Request, res: Response) => {
  console.log(req.body);
  addProducts(req, res);
});
router.post("/addBulkProducts", async (req: Request, res: Response) => {
  console.log(req.body);
  addBulkProducts(req, res);
});

router.post("/getProducts", async (req: Request, res: Response) => {
  console.log(req.body);
  getProducts(req, res);
});

router.post("/setInvites", async (req: Request, res: Response) => {
  console.log(req.body);
  setInvites(req, res);
});

export default router;
