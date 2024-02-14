import { Request, Response } from "express";
import { addProductsService } from "../../services/productServiecs/addProductService";

const addProducts = async (req: Request, res: Response) => {
  console.log(req.body);
  addProductsService(req, res);
};

export default addProducts;
