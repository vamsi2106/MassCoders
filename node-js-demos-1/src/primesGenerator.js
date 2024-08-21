var {isPrimeSync}=require('./primes')

const primeRange=function *(min,max){
    let result;
    for (let i=min; i<max;i++){
        
        if(result){
            while(result){
                if(isPrimeSync(i)){
                    result--
                }
                i++
            }
        }
    
        if(isPrimeSync(i)){
            result=yield(i)
        }

    }
}





module.exports={
    primeRange
}