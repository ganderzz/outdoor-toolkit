import { Dexie } from "dexie";

export interface IGear {
  id?: number;
  item_name: string;
  manufacturer?: string;
  weight: number;
}

class OutdoorToolkitDB extends Dexie {
  gear: Dexie.Table<IGear, number>;

  constructor(databaseName) {
    super(databaseName);

    this.version(1).stores({
      gear: "++&id",
    });

    this.gear = this.table("gear");
  }
}

const db = new OutdoorToolkitDB("outdoor-toolkit");

db.open().catch(console.error);

export { db };