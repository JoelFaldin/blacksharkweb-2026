export type ActionState = {
  status: "idle" | "success" | "error" | "loading";
  message: string | null;
  errors?: Record<string, string>;
};
