import { Model } from "sequelize";

export class transactionTable extends Model {
  public id!: number;
  public supplier_registration_id!: number;
  public price!: number;
  public subscription_plan_id!: number;
  public createdAt!: Date;
}

export default transactionTable;
