export interface FileReport {
  name: string,
  props: string,
  size: number,
  lastModifiedTime: number,
  children: FileReport[]
}

export type FileCount = {[key: string]: number}

export interface AnalyzeReport {
  entries: FileReport[],
  count: FileCount
}

/**
 * get import tree as a JSON.
 * @param {string} fileName entry file name
 * @param {string[]} parents entries of already analyzed file name
 */
export function getImportDeclarationTree(fileName: string, parents?: string[] = []): FileReport;

export function analyze(): Promise<void>;

function analyzeFromCLI(): Promise<void>;
