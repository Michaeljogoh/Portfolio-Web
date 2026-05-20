"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  confirmDelete,
  parseApiError,
  toastError,
  toastSuccess,
} from "@/lib/admin-toast";

type Skill = {
  id: string;
  name: string;
  iconUrl: string | null;
  sortOrder: number;
};

type Category = {
  id: string;
  name: string;
  sortOrder: number;
  skills: Skill[];
};

export function SkillsAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSkillByCategory, setNewSkillByCategory] = useState<
    Record<string, string>
  >({});

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/skill-categories");
    if (res.ok) setCategories(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function addCategory() {
    const name = newCategoryName.trim();
    if (!name) {
      toastError("Enter a category name");
      return;
    }
    const res = await fetch("/api/admin/skill-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      toastError(await parseApiError(res));
      return;
    }
    setNewCategoryName("");
    toastSuccess("Category added");
    await load();
  }

  async function renameCategory(id: string, name: string) {
    const res = await fetch(`/api/admin/skill-categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      toastError(await parseApiError(res));
      return;
    }
    toastSuccess("Category updated");
    await load();
  }

  function deleteCategory(id: string, name: string) {
    confirmDelete(`Delete category "${name}" and all its skills?`, async () => {
      const res = await fetch(`/api/admin/skill-categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await load();
    });
  }

  async function addSkill(categoryId: string) {
    const name = (newSkillByCategory[categoryId] ?? "").trim();
    if (!name) {
      toastError("Enter a skill name");
      return;
    }
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, categoryId }),
    });
    if (!res.ok) {
      toastError(await parseApiError(res));
      return;
    }
    setNewSkillByCategory((prev) => ({ ...prev, [categoryId]: "" }));
    toastSuccess("Skill added");
    await load();
  }

  async function renameSkill(id: string, name: string) {
    const res = await fetch(`/api/admin/skills/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      toastError(await parseApiError(res));
      return;
    }
    toastSuccess("Skill updated");
    await load();
  }

  function deleteSkill(id: string, name: string) {
    confirmDelete(`Remove skill "${name}"?`, async () => {
      const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    });
  }

  return (
    <div className="space-y-8">
      <p className="font-mono text-xs text-muted-foreground">
        {loading ? "Loading…" : `${categories.length} categories`}
      </p>

      <div className="flex flex-wrap gap-2 border border-border p-4">
        <Input
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="max-w-xs"
        />
        <Button
          type="button"
          onClick={addCategory}
          className="font-mono text-xs uppercase"
        >
          Add category
        </Button>
      </div>

      {categories.map((cat) => (
        <section
          key={cat.id}
          className="space-y-4 border border-border bg-card/10 p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Input
              defaultValue={cat.name}
              className="max-w-sm font-display"
              onBlur={(e) => {
                const name = e.target.value.trim();
                if (name && name !== cat.name) void renameCategory(cat.id, name);
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="font-mono text-[10px] uppercase"
              onClick={() => deleteCategory(cat.id, cat.name)}
            >
              Delete category
            </Button>
          </div>

          <ul className="space-y-2">
            {cat.skills.map((skill) => (
              <li
                key={skill.id}
                className="flex flex-wrap items-center gap-2 border border-border/60 p-2"
              >
                {skill.iconUrl ? (
                  <img
                    src={skill.iconUrl}
                    alt=""
                    className="size-5 object-contain"
                  />
                ) : null}
                <Input
                  defaultValue={skill.name}
                  className="max-w-[200px] font-mono text-sm"
                  onBlur={(e) => {
                    const name = e.target.value.trim();
                    if (name && name !== skill.name) void renameSkill(skill.id, name);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => deleteSkill(skill.id, skill.name)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="New skill name"
              value={newSkillByCategory[cat.id] ?? ""}
              onChange={(e) =>
                setNewSkillByCategory((prev) => ({
                  ...prev,
                  [cat.id]: e.target.value,
                }))
              }
              className="max-w-xs"
            />
            <Button
              type="button"
              variant="secondary"
              className="font-mono text-xs uppercase"
              onClick={() => addSkill(cat.id)}
            >
              Add skill
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}