"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type SortableItem = { id: string };

type SortableAdminListProps<T extends SortableItem> = {
  items: T[];
  onReorder: (orderedIds: string[]) => void | Promise<void>;
  disabled?: boolean;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
};

function SortableAdminRow({
  id,
  disabled,
  children,
}: {
  id: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "flex gap-3 border border-border bg-card/10 p-4",
        isDragging && "z-10 opacity-90 shadow-lg ring-1 ring-primary/40",
      )}
    >
      <button
        type="button"
        className={cn(
          "flex size-9 shrink-0 cursor-grab items-center justify-center self-start rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary active:cursor-grabbing",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
        )}
        aria-label="Drag to reorder"
        disabled={disabled}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" aria-hidden />
      </button>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  );
}

export function SortableAdminList<T extends SortableItem>({
  items,
  onReorder,
  disabled = false,
  renderItem,
  className,
}: SortableAdminListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || disabled) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const next = [...items];
    const [moved] = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved!);

    void onReorder(next.map((item) => item.id));
  }

  if (items.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className={cn("space-y-3", className)}>
          {items.map((item) => (
            <SortableAdminRow key={item.id} id={item.id} disabled={disabled}>
              {renderItem(item)}
            </SortableAdminRow>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
