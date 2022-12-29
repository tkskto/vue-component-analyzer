import {FileReport} from '../../types';
import {parse} from 'vue-eslint-parser';
import {ESLintImportDeclaration, ESLintProgram} from 'vue-eslint-parser/ast/nodes';
import {Token} from 'vue-eslint-parser/ast/tokens';
import {getImportDeclaration, getDeclarationSyntax} from './utils';
import {Stats} from 'fs';

const parserOption = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  parser: '@typescript-eslint/parser',
};

export class VueComponent {
  private _filename = '';

  private _lastModifiedTime = 0;

  private _size = 0;

  private _template = '';

  private _style = '';

  private _props = '';

  private _children: FileReport[] = [];

  private _importDeclaration: ESLintImportDeclaration[] = [];

  private _srcAttribute: string;

  constructor(filename: string, contents: string, stats?: Stats) {
    this._filename = filename;
    this._lastModifiedTime = stats?.mtimeMs || 0;
    this._size = stats?.size || 0;

    // get each part from text of file.
    const templateBody = contents.match(/(?<template><template>[\s\S]*<\/template>)/u);

    // support src, lang, setup attribute.
    const scriptBody = contents.match(/(?<script><script[\s\S]*>[\s\S]*<\/script>)/u);
    const styleBody = contents.match(/(?<style><style>[\s\S]*<\/style>)/u);

    this._template = templateBody?.groups?.template || '';
    this._style = styleBody?.groups?.style || '';

    const scriptString = scriptBody?.groups?.script || '';

    try {
      // using vue-eslint-parser package.
      const esLintProgram: ESLintProgram = parse(scriptString, parserOption);

      // get props from parser results.
      if (esLintProgram.tokens) {
        this._props = this.getProps(esLintProgram.tokens);
      }

      this._importDeclaration = getImportDeclaration(esLintProgram.body);
    } catch (err: unknown) {
      console.error('something went wrong at pars.');

      throw err;
    }

    const scriptSrc = scriptString.match(/<script src="(?<src>[\s\S]*)">/u);

    this._srcAttribute = scriptSrc?.groups?.src || '';
  }

  private getProps(tokens: Token[]): string {
    try {
      const propsDeclaration = JSON.parse(getDeclarationSyntax(tokens, 'props'));

      if (propsDeclaration && propsDeclaration.props) {
        return propsDeclaration.props;
      }

      const definePropsDeclaration = getDeclarationSyntax(tokens, 'defineProps');

      const definePropsDeclarationJSON = JSON.parse(definePropsDeclaration);

      if (definePropsDeclarationJSON && definePropsDeclarationJSON.defineProps) {
        return definePropsDeclarationJSON.defineProps;
      }

      return '';
    } catch (err) {
      console.warn('failed to analyze props.');

      if (err instanceof Error) {
        console.error(err.message);
      }

      return '';
    }
  }

  public addChildReport(report: FileReport): void {
    this._children.push(report);
  }

  get importDeclaration(): ESLintImportDeclaration[] {
    return this._importDeclaration;
  }

  get srcAttribute(): string {
    return this._srcAttribute;
  }

  public getFileReport(isTest: boolean): FileReport {
    return {
      name: this._filename,
      props: this._props,
      size: this._size,
      lastModifiedTime: isTest ? 0 : Number(this._lastModifiedTime.toFixed(0)),
      children: this._children,
    };
  }
}
