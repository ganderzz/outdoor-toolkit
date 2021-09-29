import { store } from "@risingstack/react-easy-state";
import { db } from "../data/db";
import { IGear } from "../data/interfaces";

export const GearStore = store({
  items: [] as IGear[],
  weightType: "g" as "g" | "lbs",
  totalWeight: 0,

  get weightInPounds(): string {
    const calc = GearStore.totalWeight * 0.0022046;
    const rounded = Math.floor(calc);

    return `${rounded}lbs ${Math.ceil((calc - rounded) * 16)}oz`;
  },

  async getAll() {
    GearStore.items = await db.gear.toArray();

    GearStore.totalWeight = GearStore.items.reduce((accu, current) => {
      if (isNaN(current.weight)) {
        return accu;
      }

      return accu + parseInt(current.weight as any, 10);
    }, 0);
  },

  async add(item: IGear) {
    await db.gear.add(item);

    await GearStore.getAll();
  },

  async update(item: IGear) {
    try {
      await db.gear.put(item);

      await GearStore.getAll();
    } catch (error) {
      console.error(error);
    }
  },

  async updateById(id: number, field: string, value: any) {
    try {
      await db.gear.update(id, { [field]: value });

      await GearStore.getAll();
    } catch (error) {
      console.error(error);
    }
  },

  async delete(id: number) {
    await db.gear.delete(id);

    await GearStore.getAll();
  },
});
