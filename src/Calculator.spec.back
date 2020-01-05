import Lex from './Lex';
import {printTokens} from './Lex';
import {primary, dumpAST} from './Calculator';
import Calculator from './Calculator';
const calculator = new Calculator();
describe('Calculator Starter Tests', () => {
    it('astnode', () => {
        //const result = lex.executeParse();
        //expect(result >= 0 && result <= 10).toBeTruthy();
       // const result1 = printTokens(lex.executeParse('2 * 3 + 5'));
        const result2 = calculator.executeParse('const lego = 99');
        //expect(result1 === 'ConstDigit:2;Star:*;ConstDigit:3;Plus:+;ConstDigit:5').toBeTruthy();
        console.log(dumpAST(result2));
    });
});



