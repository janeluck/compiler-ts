// 一个简单的词法分析器

// 有限状态机的各种状态
enum State {
  Int, Id_int1, Id_int2, Id_int3,
  Id,
  GT, GE,
  Assignment,
  Plus, Minus, Star, Slash,
  SemiColon,
  LeftParen, RightParen,
  IntLiteral,
  Initial,
  If, Id_if1, Id_if2,
  Else, Id_else1, Id_else2, Id_else3, Id_else4,
}

enum TokenType {
  UnKnown,
  Int,
  Identifier,
  GT, GE,
  Assignment,
  Plus, Minus, Star, Slash,
  SemiColon,
  LeftParen, RightParen,
  IntLiteral
}

interface Token {
  type: TokenType,
  text?: String
};

class SimpleToken implements Token {
  text: String = '';
  type: TokenType = TokenType.UnKnown;

  getType() {
    return this.type;
  }

  getText() {
    return this.text;
  }
}

class Lex {
  state: State;
  tokens: Array<Token>;
  token: Token;
  tokenText: String;

  constructor() {
    console.log('i am a lex');
  }

  reset() {
    this.tokens = [];
    this.tokenText = '';
    this.token = new SimpleToken();
  }

  executeParse(str: string): any {
    // 重设状态
    this.reset();
    let state = State.Initial;
    // 读入字符串进行解析
    const strArr = str.split('');
    let ch;

    while ((ch = strArr.shift()) !== undefined) {
      switch (state) {
        case State.Initial:
          state = this.initToken(ch);
          break;
        case State.Id:
          if (this.isAlpha(ch) || this.isDigit(ch)) {
            this.tokenText = this.tokenText + ch;
          } else {
            state = this.initToken(ch);
          }
          break;
        case State.IntLiteral:
          if (this.isDigit(ch)) {
            this.tokenText = this.tokenText + ch;
          } else {
            state = this.initToken(ch);
          }
          break;
        case State.GT:
          if (ch === '=') {
            this.tokenText = this.tokenText + ch;
            this.state = State.GE;
          } else {
            state = this.initToken(ch);
          }
          break;
        case State.Assignment:
        case State.Plus:
        case State.Minus:
        case State.Star:
        case State.Slash:
        case State.SemiColon:
        case State.LeftParen:
        case State.RightParen:
          state = this.initToken(ch);
          break;
        case State.Id_int1:
          if (ch === 'n') {
            this.tokenText = this.tokenText + ch;
            this.state = State.Id_int2;
          } else if (this.isDigit(ch) || this.isAlpha(ch)) {
            this.tokenText = this.tokenText + ch;
            state = State.Id;
          } else {
            state = this.initToken(ch);
          }
          break;
        case State.Id_int2:
          if (ch === 't') {
            this.tokenText = this.tokenText + ch;
            this.state = State.Id_int3;
          } else if (this.isDigit(ch) || this.isAlpha(ch)) {
            this.tokenText = this.tokenText + ch;
            state = State.Id;
          } else {
            state = this.initToken(ch);
          }
          break;
        case State.Id_int3:
          if (this.isBlank(ch)) {
            this.token.type = TokenType.Int;
            state = this.initToken(ch);
          } else {
            state = State.Id;
            this.tokenText = this.tokenText + ch;
          }
          break;
      }
    }
    // 把最后一个token送进去
    if (this.tokenText.length > 0) {
      this.initToken(ch);
    }
    return this.tokens;
  }

  isDigit(str: string): Boolean {
    return /\d/.test(str)
  }

  isAlpha(str: string): Boolean {
    return /[a-z|A-Z]/.test(str)
  }

  isBlank(str: string): Boolean {
    return /\s/.test(str)
  }

  // token
  initToken(ch: string): State {
    if (this.tokenText.length > 0) {
      this.token.text = this.tokenText;
      this.tokens.push(this.token);
      this.tokenText = '';
      this.token = new SimpleToken()
    }
    let state = State.Initial;
    if (this.isAlpha(ch)) {              //第一个字符是字母
      if (ch === 'i') {
        state = State.Id_int1;
      } else {
        state = State.Id; //进入Id状态
      }
      this.token.type = TokenType.Identifier;
      this.tokenText = this.tokenText + '' + ch;
    } else if (this.isDigit(ch)) {       //第一个字符是数字
      state = State.IntLiteral;
      this.token.type = TokenType.IntLiteral;
      this.tokenText = this.tokenText + '' + ch;
    } else if (ch === '>') {         //第一个字符是>
      state = State.GT;
      this.token.type = TokenType.GT;
      this.tokenText = this.tokenText + '' + ch;
    } else if (ch === '=') {
      state = State.Assignment;
      this.token.type = TokenType.Assignment;
      this.tokenText = this.tokenText + '' + ch;
    } else if (ch === '+') {
      state = State.Plus;
      this.token.type = TokenType.Plus;
      this.tokenText = this.tokenText + '' + ch;
    } else if (ch === '*') {
      state = State.Star;
      this.token.type = TokenType.Star;
      this.tokenText = this.tokenText + '' + ch;
    } else {
      this.state = State.Initial; // skip all unknown patterns
    }
    return state;
  }
}

function printTokens(tokens: Array<SimpleToken>): string {
  const result = tokens.map(function (item) {
      return TokenType[item.getType()] + ':' + item.getText();
    }
  ).join(';');
  console.log(result);
  return result;
}

export default Lex;
export {
  TokenType,
  Token,
  printTokens
};
