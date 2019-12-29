import {Token, TokenType} from './Lex';
import Lex from './Lex';
const lex = new Lex();
enum ASTNodeType {
    Program,
    ConstDeclaration,
    AdditiveExp,
    multiplicativeExp,
    Identifier
}

class Calculator {
    constructor() {

    }

    executeParse(scripts: string) {
        const tokens =
        const node = new SimpleASTNode(ASTNodeType.Program, 'Calculator');
        const child = additive()

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
    parent?: SimpleASTNode;
    children: Array<SimpleASTNode>;
    nodeType: ASTNodeType;
    nodeText: string;

    constructor(nodeType: any, nodeText: string) {
        this.children = [];
        this.nodeType = nodeType;
        this.nodeText = nodeText;
    }

    addChild(node: SimpleASTNode) {
        this.children.push(node)
    }
}

function primary(tokens: Array<Token>) {
    let node = null;
    let token = tokens.shift();
    if (token !== null) {
        if (token.type === TokenType.Const) {
            token = tokens.shift();
            node = new SimpleASTNode(ASTNodeType.ConstDeclaration, token.text)
        } else if (token.type  === TokenType.Identifier) {
            token = tokens.shift();
            node = new SimpleASTNode(ASTNodeType.Identifier, token.text);
        }
    }


    return node;


}

function multiplicative(tokens: Array<Token>) {
    let node = null;
    let token = tokens.shift();
    node = new SimpleASTNode(ASTNodeType.multiplicativeExp, token.text)
    return node;
}

function additive(tokens: Array<Token>) {
    let node = null;
    let token = tokens.shift();
    let child1 = multiplicative(tokens)
    node = new SimpleASTNode(ASTNodeType.AdditiveExp, token.text)
    return node;
}

function constDeclare(tokens: Array<Token>) {
    let node = null;
    let token = tokens.shift();
    if (token !== null && token.type === TokenType.Const) {   //匹配Const
        token = tokens.shift();
        if (token !== null && token.type === TokenType.Identifier) { //匹配标识符
            //创建当前节点，并把变量名记到AST节点的文本值中
            node = new SimpleASTNode(ASTNodeType.ConstDeclaration, token.text);
            token = tokens.shift();
            // 匹配等号
            if (token != null && token.type === TokenType.Assignment) {
                // 匹配表达式
                const child = additive(tokens);
                if (child == null) {
                    throw new Error("SyntaxError: Missing initializer in const declaration");
                } else {
                    node.addChild(child);
                }
            }
        } else {
            // 不允许空语句
            throw new Error("SyntaxError: const name expected");
        }
    }
    return node;
}
function dumpAST(node: SimpleASTNode) {
    console.log('\t' + node.nodeType + " " + node.nodeText);
    node.children && node.children.forEach(dumpAST);
}
export default Calculator
export {
    constDeclare
}
