import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`cases\` ADD \`context\` text;`)
  await db.run(sql`ALTER TABLE \`cases\` ADD \`problem_solving\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`cases\` DROP COLUMN \`context\`;`)
  await db.run(sql`ALTER TABLE \`cases\` DROP COLUMN \`problem_solving\`;`)
}
