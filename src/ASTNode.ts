interface ASTNode {
    getParent(): any;
    getChildren(): any;
    getType(): any;
    getText(): string;
}
export default ASTNode
