import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_skills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`skill\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_skills_order_idx\` ON \`users_skills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_skills_parent_id_idx\` ON \`users_skills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_tags_order_idx\` ON \`services_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_tags_parent_id_idx\` ON \`services_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_hero_stats_order_idx\` ON \`services_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_hero_stats_parent_id_idx\` ON \`services_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_features_order_idx\` ON \`services_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_features_parent_id_idx\` ON \`services_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_work_stages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`desc\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_work_stages_order_idx\` ON \`services_work_stages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_work_stages_parent_id_idx\` ON \`services_work_stages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_prices_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_prices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_prices_features_order_idx\` ON \`services_prices_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_prices_features_parent_id_idx\` ON \`services_prices_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_prices\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`price\` text,
  	\`term\` text,
  	\`popular\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_prices_order_idx\` ON \`services_prices\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_prices_parent_id_idx\` ON \`services_prices\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_included_in_price\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_included_in_price_order_idx\` ON \`services_included_in_price\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_included_in_price_parent_id_idx\` ON \`services_included_in_price\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`template\` text DEFAULT 'ecommerce-bitrix' NOT NULL,
  	\`excerpt\` text,
  	\`starting_price\` text,
  	\`timeframe\` text,
  	\`content\` text,
  	\`status\` text DEFAULT 'published',
  	\`hero_badge\` text,
  	\`hero_title\` text,
  	\`hero_title_highlight\` text,
  	\`hero_description\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`team_page_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_page_stats_order_idx\` ON \`team_page_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_page_stats_parent_id_idx\` ON \`team_page_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_page_history_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_page_history_paragraphs_order_idx\` ON \`team_page_history_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_page_history_paragraphs_parent_id_idx\` ON \`team_page_history_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_page_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` text NOT NULL,
  	\`event\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_page_timeline_order_idx\` ON \`team_page_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_page_timeline_parent_id_idx\` ON \`team_page_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_page_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_page_values_order_idx\` ON \`team_page_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_page_values_parent_id_idx\` ON \`team_page_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`team_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_heading\` text,
  	\`hero_heading_accent\` text,
  	\`hero_description\` text,
  	\`history_heading\` text,
  	\`values_heading\` text,
  	\`values_subtitle\` text,
  	\`show_cta\` integer DEFAULT true,
  	\`cta_heading\` text,
  	\`cta_description\` text,
  	\`cta_email\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`home_page_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hero_stats_order_idx\` ON \`home_page_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_stats_parent_id_idx\` ON \`home_page_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`target\` numeric NOT NULL,
  	\`suffix\` text,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_stats_order_idx\` ON \`home_page_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_stats_parent_id_idx\` ON \`home_page_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_why_us\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_why_us_order_idx\` ON \`home_page_why_us\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_why_us_parent_id_idx\` ON \`home_page_why_us\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_pricing_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_pricing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_pricing_features_order_idx\` ON \`home_page_pricing_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_pricing_features_parent_id_idx\` ON \`home_page_pricing_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_pricing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	\`price\` text NOT NULL,
  	\`featured\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_pricing_order_idx\` ON \`home_page_pricing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_pricing_parent_id_idx\` ON \`home_page_pricing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_faq_order_idx\` ON \`home_page_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_faq_parent_id_idx\` ON \`home_page_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_sup_title\` text,
  	\`hero_description\` text,
  	\`manifesto_quote\` text,
  	\`manifesto_author\` text,
  	\`cta_heading\` text,
  	\`cta_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_services_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_services_links_order_idx\` ON \`footer_services_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_services_links_parent_id_idx\` ON \`footer_services_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_company_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_company_links_order_idx\` ON \`footer_company_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_company_links_parent_id_idx\` ON \`footer_company_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`brand_description\` text,
  	\`contact_email\` text,
  	\`contact_hours\` text,
  	\`copyright_text\` text,
  	\`copyright_note\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`users\` ADD \`slug\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`is_public\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`position\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`craft\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`avatar_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`bio\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`quote\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`years_experience\` numeric;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`projects_done\` numeric;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`telegram\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`github\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_slug_idx\` ON \`users\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`users_avatar_idx\` ON \`users\` (\`avatar_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`services_id\` integer REFERENCES services(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_skills\`;`)
  await db.run(sql`DROP TABLE \`services_tags\`;`)
  await db.run(sql`DROP TABLE \`services_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`services_features\`;`)
  await db.run(sql`DROP TABLE \`services_work_stages\`;`)
  await db.run(sql`DROP TABLE \`services_prices_features\`;`)
  await db.run(sql`DROP TABLE \`services_prices\`;`)
  await db.run(sql`DROP TABLE \`services_included_in_price\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`team_page_stats\`;`)
  await db.run(sql`DROP TABLE \`team_page_history_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`team_page_timeline\`;`)
  await db.run(sql`DROP TABLE \`team_page_values\`;`)
  await db.run(sql`DROP TABLE \`team_page\`;`)
  await db.run(sql`DROP TABLE \`home_page_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`home_page_stats\`;`)
  await db.run(sql`DROP TABLE \`home_page_why_us\`;`)
  await db.run(sql`DROP TABLE \`home_page_pricing_features\`;`)
  await db.run(sql`DROP TABLE \`home_page_pricing\`;`)
  await db.run(sql`DROP TABLE \`home_page_faq\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`footer_services_links\`;`)
  await db.run(sql`DROP TABLE \`footer_company_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text DEFAULT 'editor',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_users\`("id", "name", "role", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until") SELECT "id", "name", "role", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until" FROM \`users\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`ALTER TABLE \`__new_users\` RENAME TO \`users\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
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
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`navigation_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tg_subscribers_id\`) REFERENCES \`tg_subscribers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "pages_id", "media_id", "projects_id", "skills_id", "posts_id", "navigation_id", "leads_id", "tg_subscribers_id") SELECT "id", "order", "parent_id", "path", "users_id", "pages_id", "media_id", "projects_id", "skills_id", "posts_id", "navigation_id", "leads_id", "tg_subscribers_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
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
}
