import { makeAutoObservable } from "mobx";
import { db } from "../data/db";
import { IGear } from "../data/interfaces";

/**
 * Contains all Gear logic and data.
 */
class GearStore {
  items: IGear[] = [];
  weightType: "lbs" | "g" = "g";

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Total weight of all items, in grams, for the items provided.
   */
  get totalWeight(): number {
    return this.items.reduce((accu, current) => {
      if (isNaN(current.weight)) {
        return accu;
      }

      return accu + parseInt(current.weight as any, 10);
    }, 0);
  }

  /**
   * Gets the current total weight in pounds.
   * It's easier to store weights in grams, so this is a
   * convenient function for making weights user-friendly.
   */
  get weightInPounds(): string {
    const calc = this.totalWeight * 0.0022046;
    const rounded = Math.floor(calc);

    return `${rounded}lbs ${Math.ceil((calc - rounded) * 16)}oz`;
  }

  /**
   * Gets all gear from the database.
   */
  async getAll() {
    this.items = await db.gear.toArray();
  }

  /**
   * Adds a new gear item into the database, then refreshes the local items list.
   */
  async add(item: IGear) {
    await db.gear.add(item);

    await this.getAll();
  }

  /**
   * Updates an item by id, changing any updated properties.
   * Then refreshes the local items list.
   */
  async updateById(id: number, field: string, value: any) {
    try {
      await db.gear.update(id, { [field]: value });

      await this.getAll();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Deletes a gear item by id, then refreshes the local items list.
   */
  async delete(id: number) {
    await db.gear.delete(id);

    await this.getAll();
  }
}

export default new GearStore();
