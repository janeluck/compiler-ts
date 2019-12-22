import Lex from './Lex';

describe('Lex Starter Tests', () => {
    it('const age = 16', () => {
        const lex = new Lex();
        //const result = lex.executeParse();
        //expect(result >= 0 && result <= 10).toBeTruthy();
        const result = lex.executeParse('const age = 18');
        expect(result === 'Const:const;Identifier:age;Assignment:=;ConstDigit:18').toBeTruthy()
    });
});



