import { makeAutoObservable } from "mobx";
import { IGear } from "../data/interfaces";
import { supabase } from "../data/supabase";

/**
 * Contains all Gear logic and data.
 */
class GearStore {
  items: IGear[] = [];
  isLoading = false;
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
    this.isLoading = true;

    const { data } = await supabase
      .from<IGear>("gear")
      .select()
      .order("created_at");

    this.items = data;
    this.isLoading = false;
  }

  /**
   * Adds a new gear item into the database, then refreshes the local items list.
   */
  async add(item: IGear) {
    console.log(supabase.auth.user().id);
    const response = await supabase.from<IGear>("gear").insert({
      name: item.name,
      weight: item.weight,
      user_id: supabase.auth.user().id,
    });

    if (response.error) {
      throw response.error;
    }

    this.items = [...this.items, response.data[0]];
  }

  /**
   * Updates an item by id, changing any updated properties.
   * Then refreshes the local items list.
   */
  async updateById(id: number, field: string, value: any) {
    try {
      const item = this.items.find((p) => p.id === id);

      const { data } = await supabase
        .from<IGear>("gear")
        .upsert({ ...item, [field]: value });
      this.items = this.items.map((p) => {
        if (p.id === data[0].id) {
          return data[0];
        }

        return p;
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Deletes a gear item by id, then refreshes the local items list.
   */
  async delete(id: number) {
    await supabase
      .from<IGear>("gear")
      .delete({ returning: "minimal" })
      .eq("id", id);

    this.items = this.items.filter((p) => p.id !== id);
  }
}

export default new GearStore();
