import Lex from './Lex';

describe('Lex Starter Tests', () => {
    it('const age = 16', () => {
        const lex = new Lex();
        //const result = lex.executeParse();
        //expect(result >= 0 && result <= 10).toBeTruthy();
        const result0 = lex.executeParse('const age = 18');
        const result1 = lex.executeParse('2 * 3 + 5');
        expect(result0 === 'Const:const;Identifier:age;Assignment:=;ConstDigit:18').toBeTruthy();
        expect(result1 === 'ConstDigit:2;Mul:*;ConstDigit:3;Add:+;ConstDigit:5').toBeTruthy();
    });
});



