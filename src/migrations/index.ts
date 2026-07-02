import * as migration_20260617_075004 from './20260617_075004';
import * as migration_20260617_192828 from './20260617_192828';
import * as migration_20260622_085340 from './20260622_085340';
import * as migration_20260622_125905 from './20260622_125905';
import * as migration_20260629_091500 from './20260629_091500';
import * as migration_20260629_095534 from './20260629_095534';
import * as migration_20260629_095918 from './20260629_095918';
import * as migration_20260630_075310 from './20260630_075310';

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
    name: '20260622_125905',
  },
  {
    up: migration_20260629_091500.up,
    down: migration_20260629_091500.down,
    name: '20260629_091500',
  },
  {
    up: migration_20260629_095534.up,
    down: migration_20260629_095534.down,
    name: '20260629_095534',
  },
  {
    up: migration_20260629_095918.up,
    down: migration_20260629_095918.down,
    name: '20260629_095918',
  },
  {
    up: migration_20260630_075310.up,
    down: migration_20260630_075310.down,
    name: '20260630_075310'
  },
];
