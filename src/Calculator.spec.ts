import Lex from './Lex';
import {printTokens} from './Lex';
import {primary} from './Calculator';

describe('Calculator Starter Tests', () => {
    it('astnode', () => {
        const lex = new Lex();
        //const result = lex.executeParse();
        //expect(result >= 0 && result <= 10).toBeTruthy();
        const result1 = printTokens(lex.executeParse('2 * 3 + 5'));
        const result2 = lex.executeParse('2 + 3');
        expect(result1 === 'ConstDigit:2;Star:*;ConstDigit:3;Plus:+;ConstDigit:5').toBeTruthy();
        console.log(result2);
        console.log(primary(result2));
    });
});



