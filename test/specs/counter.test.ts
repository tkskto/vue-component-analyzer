import {join} from 'path';
import {fileURLToPath} from 'url';
import {getImportDeclarationTree} from '../../src/server/Analyzer';
import {fileCounter} from '../../src/server/FileCounter';
const fixturesDir = fileURLToPath(new URL('../fixture/', import.meta.url));

describe('counter\'s count test', () => {
  test('counterTest.vue', async () => {
    const filename = 'counterTest/counterTest';
    await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(fileCounter.result);

    expect(json).toMatchSnapshot();
  });
});
