import { Request, Response } from "express";
import { client } from "../mongo";
import { Sort } from "mongodb";

// Define Sort interface
export const getProductService = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 1000;
  const sortBy = req.query.sort;
  const searchTerm = req.query.searchTerm;
  const searchRegex = new RegExp(searchTerm as string, "i");
  const categoryFilter = req.query.categoryFilter;

  let sortQuery: Sort = {};
  if (sortBy) {
    try {
      sortQuery = JSON.parse(sortBy as string);
    } catch (error) {
      console.error("Invalid sort parameter:", error);
    }
  }

  let searchQuery = {
    $or: [{}],
    $and: [{}],
  };
  if (searchTerm) {
    searchQuery = {
      $or: [{ product_name: searchRegex }, { product_category: searchRegex }],
      $and: [{}],
    };
  }
  if (categoryFilter) {
    searchQuery.$and = [{ product_category: categoryFilter }];
  }

  const skip = (page - 1) * limit;
  try {
    const database = client.db("e_commerce");
    const collection = database.collection("products");
    const result = await collection
      .find({ ...searchQuery })
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .toArray();
    res.status(200).json({ result: result });
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
};
