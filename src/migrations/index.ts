import * as migration_20260617_075004 from './20260617_075004';
import * as migration_20260617_192828 from './20260617_192828';
import * as migration_20260622_085340 from './20260622_085340';
import * as migration_20260622_125905 from './20260622_125905';

export const migrations = [
  {
    up: migration_20260617_075004.up,
    down: migration_20260617_075004.down,
    name: '20260617_075004',
  },
  {
    up: migration_20260617_192828.up,
    down: migration_20260617_192828.down,
    name: '20260617_192828',
  },
  {
    up: migration_20260622_085340.up,
    down: migration_20260622_085340.down,
    name: '20260622_085340',
  },
  {
    up: migration_20260622_125905.up,
    down: migration_20260622_125905.down,
    name: '20260622_125905'
  },
];
