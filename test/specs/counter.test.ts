import {join} from 'path';
import {analyzer} from '../../src/server/Analyzer';
const fixturesDir = join(__dirname, '../fixture/');

describe('counter\'s count test', () => {
  test('counterTest.vue', async () => {
    const filename = 'counterTest/counterTest';
    await analyzer.getImportDeclarationTree(join(fixturesDir, `${filename}.vue`), [], true);
    const json = JSON.stringify(analyzer.counter.count);

    expect(json).toMatchSnapshot();
  });
});
