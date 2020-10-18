declare namespace vueComponentAnalyzer {
  interface FileReport {
    name: string,
    props: string,
    size: number,
    lastModifiedTime: number,
    children: FileReport[]
  }
  export function getImportDeclarationTree(rootDir: string, file: string): FileReport;
  interface AnalyzeReport {
    entries: FileReport[],
    count: {[key: string]: number}
  }
}
