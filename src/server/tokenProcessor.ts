import beautify from 'js-beautify';

export class TokenProcessor {
  // {
  closedCountForBrace = 0;

  // <
  closedCountForAngleBracket = 0;

  // (
  closedCountForParen = 0;

  // [
  closedCountForBracket = 0;

  result = '';

  endChar = '';

  prevType = '';

  add(type: string, value: string) {
    if (type === 'Punctuator') {
      if (this.endChar === '') {
        if (value === '<') {
          this.endChar = '>';
        } else if (value === '{') {
          this.endChar = '}';
        } else if (value === '(') {
          this.endChar = ')';
        } else if (value === '[') {
          this.endChar = ']';
        }
      }

      if (value === '(') {
        this.closedCountForParen++;
      } else if (value === ')') {
        this.closedCountForParen--;
      } else if (value === '<') {
        this.closedCountForAngleBracket++;
      } else if (value === '>') {
        this.closedCountForAngleBracket--;
      } else if (value === '{') {
        this.closedCountForBrace++;
      } else if (value === '}') {
        this.closedCountForBrace--;
      } else if (value === '[') {
        this.closedCountForBracket++;
      } else if (value === ']') {
        this.closedCountForBracket--;
      }
    }

    // for defineTypeOnlyPropsVariablesWithTypeScript.vue
    if (this.prevType === 'Identifier' && type === 'Identifier') {
      this.result += ',';
    }

    this.result += value;
    this.prevType = type;
  }

  isEnd(value: string) {
    return this.closedCountForBrace === 0 && this.closedCountForAngleBracket === 0 && this.closedCountForParen === 0 && value === this.endChar;
  }

  finish() {
    return beautify(this.result).replaceAll(' < ', '<').replaceAll(' >', '>').replaceAll(' ? ', '?');
  }
}
