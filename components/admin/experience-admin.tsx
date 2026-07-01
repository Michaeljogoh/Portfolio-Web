"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/admin/form-field";
import { LogoUploader } from "@/components/admin/logo-uploader";
import { SortableAdminList } from "@/components/admin/sortable-admin-list";
import {
  confirmDelete,
  parseApiError,
  toastError,
  toastSuccess,
} from "@/lib/admin-toast";
import { useAdminReorder } from "@/hooks/use-admin-reorder";

type Row = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  logo: string | null;
};

const empty = {
  title: "",
  date: "",
  readTime: "",
  excerpt: "",
  logo: "",
};

export function ExperienceAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { handleReorder, reordering } = useAdminReorder(
    items,
    setItems,
    "/api/admin/experience/reorder",
  );
  const dragDisabled = editingId !== null || reordering;

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/experience");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      date: form.date,
      readTime: form.readTime,
      excerpt: form.excerpt,
      logo: form.logo.trim() || null,
    };
    const isNew = editingId === "new";
    const res = await fetch(
      isNew ? "/api/admin/experience" : `/api/admin/experience/${editingId}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    setSaving(false);
    if (!res.ok) {
      toastError(await parseApiError(res));
      return;
    }
    toastSuccess(isNew ? "Experience added" : "Experience updated");
    setEditingId(null);
    setForm(empty);
    await load();
  }

  function handleDelete(id: string, title: string) {
    confirmDelete(`Delete "${title}"?`, async () => {
      const res = await fetch(`/api/admin/experience/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await load();
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          {loading
            ? "Loading…"
            : `${items.length} entries${items.length > 1 ? " · drag to reorder" : ""}`}
        </p>
        <Button
          type="button"
          onClick={() => {
            setEditingId("new");
            setForm(empty);
          }}
          className="font-mono text-xs uppercase"
        >
          Add experience
        </Button>
      </div>

      {editingId ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-border bg-card/20 p-6"
        >
          <FormField label="Title (Role — Company)">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Date range">
              <Input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </FormField>
            <FormField label="Location · type">
              <Input
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                required
              />
            </FormField>
          </div>
          <FormField label="Company logo (optional)">
            <LogoUploader
              value={form.logo}
              onChange={(url) => setForm({ ...form, logo: url })}
            />
          </FormField>
          <FormField label="Excerpt">
            <Textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="min-h-[120px]"
              required
            />
          </FormField>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving} className="font-mono text-xs uppercase">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingId(null)}
              className="font-mono text-xs uppercase"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      <SortableAdminList
        items={items}
        onReorder={handleReorder}
        disabled={dragDisabled}
        renderItem={(item) => (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display">{item.title}</p>
              <p className="font-mono text-xs text-muted-foreground">{item.date}</p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    title: item.title,
                    date: item.date,
                    readTime: item.readTime,
                    excerpt: item.excerpt,
                    logo: item.logo ?? "",
                  });
                }}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.id, item.title)}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
