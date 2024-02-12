import { Model } from "sequelize";

export class SubscriptionPlans extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public cumstomerLimit!: number;
  public description!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default SubscriptionPlans;
