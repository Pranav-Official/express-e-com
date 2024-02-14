import { Request, Response } from "express";
import { client } from "../mongo";

const addProductsService = async (req: Request, res: Response) => {
  try {
    const {
      product_name,
      product_price,
      product_category,
      product_stock,
      ...otherData
    } = req.body;
    const database = client.db("e_commerce");
    const collection = database.collection("products");
    const result = await collection.insertOne({
      product_name,
      product_price,
      product_category,
      product_stock,
      ...otherData,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send("Error Creating Product");
  }
};

const addBulkProductsService = async (req: Request, res: Response) => {
  try {
    const { products } = req.body;
    const database = client.db("e_commerce");
    const collection = database.collection("products");
    const result = await collection.insertMany([...products]);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).send("Error Creating Products");
  }
};

export { addProductsService, addBulkProductsService };
