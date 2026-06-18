import * as migration_20260617_075004 from './20260617_075004';
import * as migration_20260617_192828 from './20260617_192828';

export const migrations = [
  {
    up: migration_20260617_075004.up,
    down: migration_20260617_075004.down,
    name: '20260617_075004',
  },
  {
    up: migration_20260617_192828.up,
    down: migration_20260617_192828.down,
    name: '20260617_192828'
  },
];
