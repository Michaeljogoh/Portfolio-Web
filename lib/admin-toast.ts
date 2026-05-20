import { toast } from "sonner";

export function toastSuccess(message: string) {
  toast.success(message);
}

export function toastError(message: string) {
  toast.error(message);
}

export async function parseApiError(res: Response): Promise<string> {
  const data = await res.json().catch(() => ({}));
  if (typeof data.error === "string") return data.error;
  return "Something went wrong";
}

/** Replaces `confirm()` — delete action runs from toast button. */
export function confirmDelete(
  message: string,
  onConfirm: () => Promise<void>,
  successMessage = "Deleted",
) {
  toast(message, {
    description: "This cannot be undone.",
    action: {
      label: "Delete",
      onClick: () => {
        void (async () => {
          try {
            await onConfirm();
            toast.success(successMessage);
          } catch {
            toast.error("Delete failed");
          }
        })();
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
  });
}
