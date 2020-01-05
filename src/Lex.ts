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
  text?: string
};

class Lex {
  state: State;
  tokens: Array<Token>;
  token: Token;

  constructor() {
    console.log('i am a lex');
  }

  reset() {
    this.state = State.Initial;
    this.tokens = [];
  }

  executeParse(str: string): any {
    // 重设状态
    this.reset();
    // 读入字符串进行解析
    const strArr = str.split('');
    let ch;
    while ((ch = strArr.shift()) !== undefined) {

      switch (this.state) {
        case State.Initial:
          this.initToken(ch);
          break;
        case State.Id:
          if (this.isAlpha(ch) || this.isDigit(ch)) {
            this.token.text = this.token.text + ch;
          } else if (this.isBlank(ch)) {
            this.state = State.Initial;
          }
          break;
        case State.ConstDigit:
          if (this.isDigit(ch)) {
            this.token.text = this.token.text + ch;
          } else {
            // 简化处理，先忽略掉后跟字母或者其他符号的情况
            this.state = State.Initial;
          }
          break;
        case State.GT:
          if (ch === '=') {
            this.token.text = this.token.text + ch;
            this.state = State.GE;
          } else {
            // 简化处理，先忽略掉后跟字母或者其他符号的情况
            this.state = State.Initial;
          }
          break;
        case State.Assignment:
        case State.Add:
        case State.Mul:
          if (this.isBlank(ch)) {

            this.state = State.Initial;
          } else {
            this.token.text = this.token.text + ch;
            this.state = State.Id;
          }
          break;
        case State.Id_const1:
          if (ch === 'o') {
            this.token.text = this.token.text + ch;
            this.state = State.Id_const2;
          } else if (!this.isBlank(ch)) {
            this.token.text = this.token.text + ch;
            this.state = State.Id;
          } else {
            this.state = State.Initial;
          }
          break;
        case State.Id_const2:
          if (ch === 'n') {
            this.token.text = this.token.text + ch;
            this.state = State.Id_const3;
          } else if (!this.isBlank(ch)) {
            this.token.text = this.token.text + ch;
            this.state = State.Id;
          } else {
            this.state = State.Initial;
          }
          break;
        case State.Id_const3:
          if (ch === 's') {
            this.token.text = this.token.text + ch;
            this.state = State.Id_const4;
          } else if (!this.isBlank(ch)) {
            this.token.text = this.token.text + ch;
            this.state = State.Id;
          } else {
            this.state = State.Initial;
          }
          break;
        case State.Id_const4:
          if (ch === 't') {
            this.token.text = this.token.text + ch;
            this.state = State.Id_const5;
          } else if (!this.isBlank(ch)) {
            this.token.text = this.token.text + ch;
            this.state = State.Id;
          } else {
            this.state = State.Initial;
          }
          break;
        case State.Id_const5:
          if (this.isBlank(ch)) {
            this.token.type = TokenType.Const;
            this.state = State.Initial;
          } else {
            this.token.text = this.token.text + ch;
            this.state = State.Id;
          }
          break;
      }
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
  initToken(ch: string): void {
    const token: Token = {
      type: TokenType.Unknown
    };
    if (this.isAlpha(ch)) {              //第一个字符是字母
      if (ch === 'c') {
        this.state = State.Id_const1;
      } else {
        this.state = State.Id; //进入Id状态
      }
      token.type = TokenType.Identifier;
      token.text = ch;
    } else if (this.isDigit(ch)) {       //第一个字符是数字
      this.state = State.ConstDigit;
      token.type = TokenType.ConstDigit;
      token.text = ch;
    } else if (ch === '>') {         //第一个字符是>
      this.state = State.GT;
      token.type = TokenType.GT;
      token.text = ch;
    } else if (ch === '=') {
      this.state = State.Assignment;
      token.type = TokenType.Assignment;
      token.text = ch;
    } else if (ch === '+') {
      this.state = State.Add;
      token.type = TokenType.Plus;
      token.text = ch;
    } else if (ch === '*') {
      this.state = State.Mul;
      token.type = TokenType.Star;
      token.text = ch;
    } else {
      this.state = State.Initial; // skip all unknown patterns
    }
    if (this.state !== State.Initial) {
      this.token = token;
      this.tokens.push(token)
    }
  }
}

function printTokens(tokens: Array<Token>): string {

  const result = tokens.map(function (item) {
      return TokenType[item.type] + ':' + item.text;
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
