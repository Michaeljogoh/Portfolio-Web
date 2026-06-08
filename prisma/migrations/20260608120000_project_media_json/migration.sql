-- Replace Project.image with required JSON media (default placeholder image object).

ALTER TABLE "Project" ADD COLUMN "media" JSONB NOT NULL DEFAULT '{"type":"image","url":"/project-placeholder-1.jpg","provider":"local"}';

UPDATE "Project"
SET "media" = jsonb_build_object(
  'type', 'image',
  'url', "image",
  'provider', CASE
    WHEN "image" LIKE '/%' THEN 'local'
    WHEN "image" LIKE '%cloudinary.com%' THEN 'cloudinary'
    ELSE 'external'
  END
);

ALTER TABLE "Project" DROP COLUMN "image";
