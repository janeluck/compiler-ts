import Lex from './Lex';
import {printTokens} from './Lex';
describe('Lex Starter Tests', () => {
    it('exp: 2 * 3 + 5', () => {
        const lex = new Lex();
        //const result = lex.executeParse();
        //expect(result >= 0 && result <= 10).toBeTruthy();
        const result1 = printTokens(lex.executeParse('2 * 3 + 5'));
        expect(result1 === 'ConstDigit:2;Star:*;ConstDigit:3;Plus:+;ConstDigit:5').toBeTruthy();
    });
});



