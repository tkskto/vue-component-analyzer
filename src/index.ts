import {parse} from 'vue-eslint-parser';
import {readFileSync} from 'fs';
import {resolve} from 'path';

// can not import fs module...
try {
  const buffer: string = readFileSync(resolve(__dirname, '../test/fixture/importOne.vue'), 'utf8').trim();

  console.log(parse(buffer, {}));
} catch (err) {
  console.error(err.message);
}
