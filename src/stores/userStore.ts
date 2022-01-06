import { makeAutoObservable } from "mobx";
import { IGear } from "../data/interfaces";
import { supabase } from "../data/supabase";

/**
 * Contains all Gear logic and data.
 */
class UserStore {
  items: IGear[] = [];
  isLoading = false;
  weightType: "lbs" | "g" = "g";

  constructor() {
    makeAutoObservable(this);
  }
}

export default new UserStore();
