interface ToastType {
  isOpened: boolean;
  status: "success" | "error";
  message: string;
}

interface IntermediateStateType {
  isFetching: boolean;
  isSaving: boolean;
  isDeleting: boolean;
}

export type { ToastType, IntermediateStateType };
