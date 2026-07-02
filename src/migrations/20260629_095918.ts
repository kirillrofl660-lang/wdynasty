import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`cases_calculator_multipliers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`coefficient\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cases_calculator_multipliers_order_idx\` ON \`cases_calculator_multipliers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cases_calculator_multipliers_parent_id_idx\` ON \`cases_calculator_multipliers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cases_price_factors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`impact\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cases_price_factors_order_idx\` ON \`cases_price_factors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cases_price_factors_parent_id_idx\` ON \`cases_price_factors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cases_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cases_faq_order_idx\` ON \`cases_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cases_faq_parent_id_idx\` ON \`cases_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cases\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`published_at\` text,
  	\`search_query\` text,
  	\`excerpt\` text,
  	\`cover_image_id\` integer,
  	\`problem\` text,
  	\`solution\` text,
  	\`result\` text,
  	\`base_price\` text,
  	\`calculator_base_price\` numeric,
  	\`calculator_min_hours\` numeric,
  	\`calculator_max_hours\` numeric,
  	\`calculator_hourly_rate\` numeric,
  	\`price_note\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cases_slug_idx\` ON \`cases\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`cases_cover_image_idx\` ON \`cases\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`cases_updated_at_idx\` ON \`cases\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cases_created_at_idx\` ON \`cases\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`cases_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cases_rels_order_idx\` ON \`cases_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`cases_rels_parent_idx\` ON \`cases_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cases_rels_path_idx\` ON \`cases_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`cases_rels_services_id_idx\` ON \`cases_rels\` (\`services_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`cases_id\` integer REFERENCES cases(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_cases_id_idx\` ON \`payload_locked_documents_rels\` (\`cases_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`cases_calculator_multipliers\`;`)
  await db.run(sql`DROP TABLE \`cases_price_factors\`;`)
  await db.run(sql`DROP TABLE \`cases_faq\`;`)
  await db.run(sql`DROP TABLE \`cases\`;`)
  await db.run(sql`DROP TABLE \`cases_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`pages_id\` integer,
  	\`media_id\` integer,
  	\`projects_id\` integer,
  	\`skills_id\` integer,
  	\`posts_id\` integer,
  	\`navigation_id\` integer,
  	\`leads_id\` integer,
  	\`tg_subscribers_id\` integer,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`navigation_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tg_subscribers_id\`) REFERENCES \`tg_subscribers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "pages_id", "media_id", "projects_id", "skills_id", "posts_id", "navigation_id", "leads_id", "tg_subscribers_id", "services_id") SELECT "id", "order", "parent_id", "path", "users_id", "pages_id", "media_id", "projects_id", "skills_id", "posts_id", "navigation_id", "leads_id", "tg_subscribers_id", "services_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_skills_id_idx\` ON \`payload_locked_documents_rels\` (\`skills_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_navigation_id_idx\` ON \`payload_locked_documents_rels\` (\`navigation_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_leads_id_idx\` ON \`payload_locked_documents_rels\` (\`leads_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tg_subscribers_id_idx\` ON \`payload_locked_documents_rels\` (\`tg_subscribers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
}
