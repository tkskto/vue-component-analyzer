import {parse} from 'vue-eslint-parser';
import {ESLintImportDeclaration, ESLintProgram} from 'vue-eslint-parser/ast/nodes';
import {Token} from 'vue-eslint-parser/ast/tokens';
import {getImportDeclaration, getDeclarationSyntax} from './utils';

const parserOption = {
  ecmaVersion: 2018,
  sourceType: 'module',
};

export class VueComponent {
  private _template = '';

  private _style = '';

  private _props = '';

  private _importDeclaration: ESLintImportDeclaration[] = [];

  constructor(file: string) {
    // get each part from text of file.
    const templateBody = file.match(/(?<template><template>[\s\S]*<\/template>)/u);
    const scriptBody = file.match(/(?<script><script>[\s\S]*<\/script>)/u);
    const styleBody = file.match(/(?<style><style>[\s\S]*<\/style>)/u);

    this._template = templateBody?.groups?.template || '';
    this._style = styleBody?.groups?.template || '';

    const scriptString = scriptBody?.groups?.script || '';

    // using vue-eslint-parser package.
    const esLintProgram: ESLintProgram = parse(scriptString, parserOption);

    // get props from parser results.
    if (esLintProgram.tokens) {
      this._props = this.getProps(esLintProgram.tokens);
    }

    this._importDeclaration = getImportDeclaration(esLintProgram.body);
  }

  private getProps = (tokens: Token[]): string => {
    try {
      const propsDeclaration = JSON.parse(getDeclarationSyntax(tokens, 'props'));

      if (propsDeclaration && propsDeclaration.props) {
        return propsDeclaration.props;
      }

      return '';
    } catch (err) {
      console.warn('failed to analyze props.');

      return '';
    }
  }

  get importDeclaration(): ESLintImportDeclaration[] {
    return this._importDeclaration;
  }

  get props(): string {
    return this._props;
  }
}
