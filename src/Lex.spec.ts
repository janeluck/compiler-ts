import Lex from './Lex';

describe('Lex Starter Tests', () => {
    it('const age = 16', () => {
        const lex = new Lex();
        //const result = lex.executeParse();
        //expect(result >= 0 && result <= 10).toBeTruthy();
        const result1 = lex.executeParse('2 * 3 + 5');
        expect(result1 === 'ConstDigit:2;Star:*;ConstDigit:3;Plus:+;ConstDigit:5').toBeTruthy();
    });
});



