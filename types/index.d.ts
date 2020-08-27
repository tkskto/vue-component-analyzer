declare namespace vueComponentAnalyzer {
  export function getImportDeclarationTree(rootDir: string, file: string): Report;
  interface Report {
    name: string,
    children: Report[]
  }
}
