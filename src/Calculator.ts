import {TokenType, Token} from './Lex';

class Calculator {
  constructor() {

  }

  executeParse() {

  }
}

// const语句的文法 constDeclaration : Const Identifier ( '=' additiveExpression)?;


// 伪代码
// MatchConstDeclare () {
//  MatchToken(Const); 匹配Const关键字
//  MatchIdentifier(); 匹配标识符
//  MatchToken(assignment); 匹配等号
//  MatchExpression(); 匹配表达式
// }


// 翻译成程序语句
/*class ConstDeclare {
    constructor(){

    }
}*/

class SimpleASTNode {
  constructor() {
  }

  addChild(node: SimpleASTNode) {
        return ''
  }
}

function ConstDeclare(tokens: Array<Token>) {
  let node = null;
  let token = tokens[0];
  if (token !== null && token.type === TokenType.Const) {   //匹配Const
    tokens.shift();      //消耗掉Const
    if (tokens[0] !== null && tokens[0].type === TokenType.Identifier) { //匹配标识符
      token = tokens[0];  //消耗掉标识符
      //创建当前节点，并把变量名记到AST节点的文本值中，
      //这里新建一个变量子节点也是可以的
    /*  node = new SimpleASTNode(ASTNodeType.IntDeclaration, token.text);
      token = tokens.peek();  //预读
      if (token != null && token.getType() == TokenType.Assignment) {
        tokens.read();      //消耗掉等号
        SimpleASTNode
        child = additive(tokens);  //匹配一个表达式
        if (child == null) {
          throw new Exception("invalide variable initialization, expecting an expression");
        } else {
          node.addChild(child);
        }
      }*/
    } else {
      throw new Exception("variable name expected");
    }
  }
}

export default Calculator
