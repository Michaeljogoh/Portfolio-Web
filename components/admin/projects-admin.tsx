"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryCheckboxes } from "@/components/admin/category-checkboxes";
import { FormField } from "@/components/admin/form-field";
import { ProjectMediaUploader } from "@/components/admin/project-media-uploader";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";
import {
  confirmDelete,
  parseApiError,
  toastError,
  toastSuccess,
} from "@/lib/admin-toast";
import {
  PROJECT_MEDIA_PLACEHOLDER,
  parseProjectMedia,
  type ProjectMedia,
} from "@/lib/project-media";
import { parseTagsInput } from "@/lib/validations/admin";
import type { ProjectCategoryId } from "@/lib/project-categories";

type ProjectRow = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  media: ProjectMedia;
  link: string;
  repo: string;
};

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  categories: [] as ProjectCategoryId[],
  media: { ...PROJECT_MEDIA_PLACEHOLDER } as ProjectMedia,
  link: "#",
  repo: "https://github.com/Michaeljogoh",
};

export function ProjectsAdmin() {
  const [items, setItems] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    if (res.ok) {
      const rows = (await res.json()) as Array<
        Omit<ProjectRow, "media"> & { media: unknown }
      >;
      setItems(
        rows.map((row) => ({
          ...row,
          media: parseProjectMedia(row.media),
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function startCreate() {
    setEditingId("new");
    setForm(emptyForm);
  }

  function startEdit(item: ProjectRow) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      tags: item.tags.join(", "),
      categories: item.categories as ProjectCategoryId[],
      media: item.media,
      link: item.link,
      repo: item.repo,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description,
      tags: parseTagsInput(form.tags),
      categories: form.categories,
      media: form.media,
      link: form.link,
      repo: form.repo,
    };
    const isNew = editingId === "new";
    const res = await fetch(
      isNew ? "/api/admin/projects" : `/api/admin/projects/${editingId}`,
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
    toastSuccess(isNew ? "Project created" : "Project updated");
    cancelEdit();
    await load();
  }

  function handleDelete(id: string, title: string) {
    confirmDelete(`Delete "${title}"?`, async () => {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          {loading ? "Loading…" : `${items.length} projects`}
        </p>
        <Button type="button" onClick={startCreate} className="font-mono text-xs uppercase">
          Add project
        </Button>
      </div>

      {editingId ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-border bg-card/20 p-6"
        >
          <h2 className="font-display text-lg">
            {editingId === "new" ? "New project" : "Edit project"}
          </h2>
          <FormField label="Title">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </FormField>
          <FormField label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="min-h-[120px]"
              required
            />
          </FormField>
          <FormField label="Tags (comma-separated)">
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </FormField>
          <FormField label="Categories">
            <CategoryCheckboxes
              categories={PROJECT_CATEGORIES}
              value={form.categories}
              onChange={(categories) =>
                setForm({ ...form, categories: categories as ProjectCategoryId[] })
              }
            />
          </FormField>
          <FormField label="Project media">
            <ProjectMediaUploader
              value={form.media}
              onChange={(media) => setForm({ ...form, media })}
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Live link">
              <Input
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                required
              />
            </FormField>
            <FormField label="Repository URL">
              <Input
                value={form.repo}
                onChange={(e) => setForm({ ...form, repo: e.target.value })}
                required
              />
            </FormField>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving} className="font-mono text-xs uppercase">
              {saving ? "Saving…" : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={cancelEdit}
              className="font-mono text-xs uppercase"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-display text-lg">{item.title}</p>
              <p className="truncate font-mono text-xs text-muted-foreground">
                {item.tags.join(" · ")} · {item.media.type}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="font-mono text-[10px] uppercase"
                onClick={() => startEdit(item)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="font-mono text-[10px] uppercase"
                onClick={() => handleDelete(item.id, item.title)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
