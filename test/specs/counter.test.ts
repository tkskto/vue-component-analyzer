import {join} from 'path';
import {getImportDeclarationTree} from '../../src/server/Analyzer';
import {fileCounter} from '../../src/server/FileCounter';
const fixturesDir = join(__dirname, '../fixture/');

describe('counter\'s count test', () => {
  test('counterTest.vue', async () => {
    const filename = 'counterTest/counterTest';
    await getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(fileCounter.result);

    expect(json).toMatchSnapshot();
  });
});
