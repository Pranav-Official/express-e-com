import { Request, Response } from "express";
import { addBulkProductsService } from "../../services/productServiecs/addProductService";

const addBulkProducts = async (req: Request, res: Response) => {
  console.log(req.body);
  addBulkProductsService(req, res);
};

export default addBulkProducts;
