export interface IGear {
  id?: number;
  item_name: string;
  manufacturer?: string;
  weight: number;
  weight_measurement: "g" | "lbs";
}
