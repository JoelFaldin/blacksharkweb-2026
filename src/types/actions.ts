import type { NewCartItem } from "./components";

export type ActionState = {
  status: "idle" | "success" | "error" | "loading";
  message: string | null;
  errors?: Record<string, string>;
  error?: string;
};

export interface AddCartItemInterface extends ActionState {
  data?: NewCartItem[];
}
