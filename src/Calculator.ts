import Lex, {Token, TokenType, SimpleToken} from './Lex';
import ASTNode from "./ASTNode";

const lex = new Lex();

enum ASTNodeType {
    Programm,
    IntDeclaration,
    IntLiteral,
    Additive,
    Multiplicative,
    Identifier
}

class Calculator {
    constructor() {
    }

    init(scripts: string): void {
        const tokens = lex.executeParse(scripts);
        try {
            let node = intDeclare(tokens);
            dumpAST(node);
        } catch (e) {
            console.log(e)
        }
    }

    executeParse(scripts: string, indent?: string) {
        indent = indent || '\t';
        const tokens = lex.executeParse(scripts);
        const node = new SimpleASTNode(ASTNodeType.Programm, 'Calculator');
        const child = additive(tokens);
        if (child) {
            node.addChild(child);
        }
        return node;


        let result = 0;
        console.log(indent + "Calculating: " + node.getType());
        switch (node.getType()) {
            case ASTNodeType.Programm:
                for (let child in node.getChildren()) {
                    result = this.executeParse(child);
                }
                break;
            case ASTNodeType.Additive:
                let child1 = node.getChildren()[0];
                let value1 = this.executeParse(child1);
                let child2 = node.getChildren()[1];
                let value2 = this.executeParse(child2);
                if (node.getText() === "+") {
                    result = value1 + value2;
                } else {
                    result = value1 - value2;
                }
                break;
            case ASTNodeType.Multiplicative:
                child1 = node.getChildren().get(0);
                value1 = evaluate(child1, indent + "\t");
                child2 = node.getChildren().get(1);
                value2 = evaluate(child2, indent + "\t");
                if (node.getText().equals("*")) {
                    result = value1 * value2;
                } else {
                    result = value1 / value2;
                }
                break;
            case ASTNodeType.IntLiteral:
                result = Integer.valueOf(node.getText()).intValue();
                break;
            default:
        }
        console.log(indent + "Result: " + result);
        return result;
    }

}

// const语句的文法 constDeclaration : Const Identifier ( '=' Additiveression)?;


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

class SimpleASTNode implements ASTNode {
    parent?: SimpleASTNode;
    children: Array<SimpleASTNode>;
    nodeType: ASTNodeType;
    nodeText: string;

    getParent() {
        return this.parent
    }

    getChildren() {
        return this.children
    }

    getType() {
        return this.nodeType
    }

    getText() {
        return this.nodeText
    }

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
function primary(tokens: Array<SimpleToken>) {
    let node = null;
    let token = tokens.shift();
    if (token !== null) {
        if (token.type === TokenType.Int) {
            token = tokens.shift();
            node = new SimpleASTNode(ASTNodeType.IntDeclaration, token.getText())
        } else if (token.type === TokenType.Identifier) {
            token = tokens.shift();
            node = new SimpleASTNode(ASTNodeType.Identifier, token.getText());
        } else {
            throw new Error("expecting an expression")
        }
    }
    return node;
}

function multiplicative(tokens: Array<SimpleToken>) {
    let child1 = primary(tokens);
    let node = child1;
    let token = tokens.shift();
    if (child1 != null && token != null) {
        if (token.type === TokenType.Star) {
            token = tokens.shift();
            let child2 = primary(tokens);
            if (child2 != null) {
                node = new SimpleASTNode(ASTNodeType.Multiplicative, token.getText());
                node.addChild(child1);
                node.addChild(child2);
            } else {
                throw new Error("invalid multiplicative expression, expecting the right part.");
            }
        }
    }
    return node;
}

function additive(tokens: Array<SimpleToken>) {
    let child1 = multiplicative(tokens);
    let node = child1;
    let token = tokens.shift();
    if (child1 != null && token != null) {
        if (token.type === TokenType.Plus) {
            token = tokens.shift();
            let child2 = multiplicative(tokens);
            if (child2 != null) {
                node = new SimpleASTNode(ASTNodeType.Additive, token.getText());
                node.addChild(child1);
                node.addChild(child2);
            } else {
                throw new Error("invalid additive expression, expecting the right part.");
            }
        }
    }
    return node;
}

/**
 * 整型变量声明语句，如：
 * int a;
 * int b = 2*3;
 *
 */
function intDeclare(tokens: Array<SimpleToken>) {
    let node = null;
    let token = tokens.shift();
    if (token !== null && token.type === TokenType.Int) {   //匹配Int
        token = tokens.shift();
        if (token !== null && token.type === TokenType.Identifier) { //匹配标识符
            //创建当前节点，并把变量名记到AST节点的文本值中
            node = new SimpleASTNode(ASTNodeType.IntDeclaration, token.getText());
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
    console.log('\t' + ASTNodeType[node.nodeType] + " " + node.nodeText);
    node.children && node.children.forEach(dumpAST);
}

export default Calculator
export {
    intDeclare,
    primary,
    dumpAST
}
