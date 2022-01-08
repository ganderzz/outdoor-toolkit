export interface IGear {
  id?: number;
  created_at: string;
  name: string;
  manufacturer?: string;
  weight: number;
  weight_measurement: "g" | "lbs";
  user_id: string;
}
