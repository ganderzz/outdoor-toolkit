import { store } from "@risingstack/react-easy-state";
import { db, IGear } from "../data/db";

export const GearStore = store({
  items: [] as IGear[],
  totalWeight: 0,

  async getAll() {
    GearStore.items = await db.gear.toArray();
    GearStore.totalWeight = GearStore.items.reduce(
      (accu, current) => accu + parseInt(current.weight as any, 10),
      0
    );
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

  async delete(id: number) {
    await db.gear.delete(id);

    await GearStore.getAll();
  },
});
