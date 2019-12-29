import {Token, TokenType} from './Lex';

enum ASTNodeType {
    ConstDeclaration,
    AdditiveExp,
    multiplicativeExp,
    Identifier,
}

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
    parent: SimpleASTNode;
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

// 基础表达式
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
        } else {
            throw new Error("expecting an additive expression")
        }
    }
    return node;
}

function multiplicative(tokens: Array<Token>) {
    let child1 = primary(tokens);
    let node = child1;
    let token = tokens.shift();
    if (child1 != null && token != null) {
        if (token.type === TokenType.Star) {
            token = tokens.shift();
            let child2 = primary(tokens);
            if (child2 != null) {
                node = new SimpleASTNode(ASTNodeType.multiplicativeExp, token.text);
                node.addChild(child1);
                node.addChild(child2);
            } else {
                throw new Error("invalid multiplicative expression, expecting the right part.");
            }
        }
    }
    return node;
}

function additive(tokens: Array<Token>) {
    let child1 = multiplicative(tokens);
    let node = child1;
    let token = tokens.shift();
    if (child1 != null && token != null) {
        if (token.type === TokenType.Plus) {
            token = tokens.shift();
            let child2 = multiplicative(tokens);
            if (child2 != null) {
                node = new SimpleASTNode(ASTNodeType.AdditiveExp, token.text);
                node.addChild(child1);
                node.addChild(child2);
            } else {
                throw new Error("invalid multiplicative expression, expecting the right part.");
            }
        }
    }
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

export default Calculator
export {
    constDeclare,
    primary
}
