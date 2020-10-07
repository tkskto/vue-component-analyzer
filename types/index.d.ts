declare namespace vueComponentAnalyzer {
  interface FileReport {
    name: string,
    props: string,
    children: FileReport[]
  }
  export function getImportDeclarationTree(rootDir: string, file: string): FileReport;
  interface AnalyzeReport {
    entries: FileReport[]
  }
}

interface Window {
  enableWebSocket: boolean;
}
