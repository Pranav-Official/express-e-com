import { Model } from "sequelize";

export class Invites extends Model {
  public id!: number;
  public customer_id!: string;
  public ec_supplier_id!: number;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default Invites;
