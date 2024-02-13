import { Model } from "sequelize";

export class SupplierPlanTable extends Model {
  public supplierPlanTable_id!: number;
  public ec_supplier_id!: number;
  public subscription_plans!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default SupplierPlanTable;
