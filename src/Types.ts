interface ToastType {
  isOpened: boolean;
  status: "success" | "error";
  message: string;
}

export type { ToastType };
