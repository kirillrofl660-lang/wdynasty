import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_page_freelancer_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_freelancer_points_order_idx\` ON \`home_page_freelancer_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_freelancer_points_parent_id_idx\` ON \`home_page_freelancer_points\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`author_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`order\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`freelancer_label\` text;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`freelancer_heading\` text;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`pricing_lead_title\` text;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`pricing_lead_text\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_page_freelancer_points\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`excerpt\` text,
  	\`content\` text NOT NULL,
  	\`cover_image_id\` integer,
  	\`published_at\` text,
  	\`status\` text DEFAULT 'draft',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "title", "slug", "excerpt", "content", "cover_image_id", "published_at", "status", "meta_title", "meta_description", "updated_at", "created_at") SELECT "id", "title", "slug", "excerpt", "content", "cover_image_id", "published_at", "status", "meta_title", "meta_description", "updated_at", "created_at" FROM \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_cover_image_idx\` ON \`posts\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`freelancer_label\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`freelancer_heading\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`pricing_lead_title\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`pricing_lead_text\`;`)
}
