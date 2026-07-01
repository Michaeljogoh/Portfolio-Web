"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryCheckboxes } from "@/components/admin/category-checkboxes";
import { FormField } from "@/components/admin/form-field";
import { LogoUploader } from "@/components/admin/logo-uploader";
import { SortableAdminList } from "@/components/admin/sortable-admin-list";
import { CERTIFICATION_CATEGORIES } from "@/lib/cert-categories";
import {
  confirmDelete,
  parseApiError,
  toastError,
  toastSuccess,
} from "@/lib/admin-toast";
import { parseTagsInput } from "@/lib/validations/admin";
import type { CertificationCategoryId } from "@/lib/cert-categories";
import { useAdminReorder } from "@/hooks/use-admin-reorder";

type Row = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  excerpt: string;
  tags: string[];
  categories: string[];
  image: string;
  credentialUrl: string;
};

const empty = {
  title: "",
  issuer: "",
  issued: "",
  excerpt: "",
  tags: "",
  categories: [] as CertificationCategoryId[],
  image: "",
  credentialUrl: "#",
};

export function CertificationsAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const { handleReorder, reordering } = useAdminReorder(
    items,
    setItems,
    "/api/admin/certifications/reorder",
  );
  const dragDisabled = editingId !== null || reordering;

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/certifications");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image.trim()) {
      toastError("Upload a certification image before saving.");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      issuer: form.issuer,
      issued: form.issued,
      excerpt: form.excerpt,
      tags: parseTagsInput(form.tags),
      categories: form.categories,
      image: form.image,
      credentialUrl: form.credentialUrl,
    };
    const isNew = editingId === "new";
    const res = await fetch(
      isNew
        ? "/api/admin/certifications"
        : `/api/admin/certifications/${editingId}`,
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
    toastSuccess(isNew ? "Certification created" : "Certification updated");
    setEditingId(null);
    setForm(empty);
    await load();
  }

  function handleDelete(id: string, title: string) {
    confirmDelete(`Delete "${title}"?`, async () => {
      const res = await fetch(`/api/admin/certifications/${id}`, {
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
            : `${items.length} certifications${items.length > 1 ? " · drag to reorder" : ""}`}
        </p>
        <Button
          type="button"
          onClick={() => {
            setEditingId("new");
            setForm(empty);
          }}
          className="font-mono text-xs uppercase"
        >
          Add certification
        </Button>
      </div>

      {editingId ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-border bg-card/20 p-6"
        >
          <FormField label="Title">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Issuer">
              <Input
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                required
              />
            </FormField>
            <FormField label="Issued">
              <Input
                value={form.issued}
                onChange={(e) => setForm({ ...form, issued: e.target.value })}
                required
              />
            </FormField>
          </div>
          <FormField label="Excerpt">
            <Textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="min-h-[100px]"
              required
            />
          </FormField>
          <FormField label="Tags">
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </FormField>
          <FormField label="Categories">
            <CategoryCheckboxes
              categories={CERTIFICATION_CATEGORIES}
              value={form.categories}
              onChange={(categories) =>
                setForm({
                  ...form,
                  categories: categories as CertificationCategoryId[],
                })
              }
            />
          </FormField>
          <FormField label="Certification image">
            <LogoUploader
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              uploadEndpoint="/api/admin/certifications/image/upload"
              previewAlt="Certification badge preview"
              emptyLabel="Image"
            />
          </FormField>
          <FormField label="Credential URL">
            <Input
              value={form.credentialUrl}
              onChange={(e) =>
                setForm({ ...form, credentialUrl: e.target.value })
              }
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
              <p className="font-mono text-xs text-muted-foreground">
                {item.issuer} · {item.issued}
              </p>
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
                    issuer: item.issuer,
                    issued: item.issued,
                    excerpt: item.excerpt,
                    tags: item.tags.join(", "),
                    categories: item.categories as CertificationCategoryId[],
                    image: item.image,
                    credentialUrl: item.credentialUrl,
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
