var {isPrimeSync}=require('../src/primes')
var {primeRange}=require('../src/primesGenerator')

var { should, expect } = require('chai');

should();


describe.only('primeRange', function(){

    let range;
    const expectedValues=[2,3,5,7];

    beforeEach(()=>{
        range=primeRange(0,10);
    });

    it('should match the expected values',()=>{
        //range.length.should.equal(expectedValues.length);
        for(var i=0; i<expectedValues.length; i++){
            range.next().value.should.equal(expectedValues[i]);
        }
    });  
    
    it('should be convertable to a regular list using spread',()=>{
        let range=primeRange(0,10);
        var results=[...range];
        results.should.deep.equal(expectedValues);

    });

    it('should skip next n primes',function(){
        let range=primeRange(0,20);
        range.next().value
        expect(range.next(2).value).to.be.equal(7)
    })

});