"use client";

import { useCallback, useState } from "react";
import { parseApiError, toastError, toastSuccess } from "@/lib/admin-toast";

export function useAdminReorder<T extends { id: string }>(
  items: T[],
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
  reorderEndpoint: string,
) {
  const [reordering, setReordering] = useState(false);

  const handleReorder = useCallback(
    async (orderedIds: string[]) => {
      if (orderedIds.length < 2) return;

      const byId = new Map(items.map((item) => [item.id, item]));
      const reordered = orderedIds
        .map((id) => byId.get(id))
        .filter((item): item is T => item !== undefined);

      if (reordered.length !== items.length) return;

      const previous = items;
      setItems(reordered);
      setReordering(true);

      try {
        const res = await fetch(reorderEndpoint, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderedIds }),
        });

        if (!res.ok) {
          setItems(previous);
          toastError(await parseApiError(res));
          return;
        }

        toastSuccess("Order saved");
      } catch {
        setItems(previous);
        toastError("Could not save order.");
      } finally {
        setReordering(false);
      }
    },
    [items, reorderEndpoint, setItems],
  );

  return { handleReorder, reordering };
}
