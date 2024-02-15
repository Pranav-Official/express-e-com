import { Request, Response } from "express";
import { getProductService } from "../../services/productServiecs/getProductsService";

const getProducts = async (req: Request, res: Response) => {
  console.log(req.body);
  getProductService(req, res);
};

export default getProducts;
