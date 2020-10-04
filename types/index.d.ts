declare namespace vueComponentAnalyzer {
  export function getImportDeclarationTree(rootDir: string, file: string): FileReport;
  interface AnalyzeReport {
    entries: FileReport[]
  }
  interface FileReport {
    name: string,
    children: FileReport[]
  }
}

interface Window {
  enableWebSocket: boolean;
}
