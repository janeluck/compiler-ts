enum State {
    Initial, // 初始状态
    Id, // 标识符状态
    ConstLiteral, // 字面量状态
    GT, //  > 状态
    GE, //  >= 状态

};

class Lex {
    state: State;

    constructor() {
        console.log('i am a lex');
    }

    executeParse(str: string): String {
        // 重设状态
        this.state = State.Initial;
        // 读入字符串进行解析
        const strArr = str.split('');
        let char;
        while ((char = strArr.shift()) !== undefined) {


        }
        return '';
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

}

export default Lex;