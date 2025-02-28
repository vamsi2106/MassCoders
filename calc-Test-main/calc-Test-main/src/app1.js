var Calculator= require("../src/calc")

var app=(function (){

    //One Time Initialization
    // var value1TextBox=document.getElementById("num1");
    // var value2TextBox=document.getElementById("num2");
    // var resultTextBox=document.getElementById("result");
    // var operators = document.getElementById("operators");
    // var formatterList = document.getElementById("formatters");
    // var presenterList = document.getElementById("presenters");
    
    var calculator=new Calculator();
    
    var formatters={
        inline: calculator.infixFormatter,
        raw: (_,__,___,result)=>result,
        function: (v1,o,v2,r)=>`${o}(${v1},${v2}) = ${r}`
    };

    var presenters={
        result: result=> resultTextBox.innerHTML=result,
        resultBox: result=> resultBox.value=result,
        alert: result=> alert(result)
    };
    
    
    //Public Data 
    
    //Private Methods (Not exposed)
    // function populateSelector(id,source){
    //     var selector=document.getElementById(id);
    //     selector.innerHTML='';
    //     for(var key in source){
    //         selector.innerHTML+=`<option value="${key}">${key.toUpperCase()}</option>`;
    //     }
    // }
    
   

    //Event Handlers
    function initialize(){
        console.log('Initialization');
        //configure calculator
        calculator.setFormatter(formatters.inline);
        calculator.setPresenter(presenters.result);

        calculator.addOperator((x,y)=>x%y,"mod");
        calculator.addOperator(Math.pow);
        
        //initialize
        // resultTextBox.innerHTML="";
        // populateSelector("operators", calculator.operators)
        // populateSelector("formatters",formatters);
        // populateSelector("presenters",presenters);

    }

    function handleFormatterSelection(){
        var key = formatterList.value||'inline';
        calculator.setFormatter(formatters[key]);
    }

    function handlePresenterSelection(){
        var key = presenterList.value||'result';
        calculator.setPresenter(presenters[key]);
    }

    function handleCalculate(){
        var num1=parseFloat(value1TextBox.value)||2;
        var num2=parseFloat(value2TextBox.value)||4;
        if(isNaN(num1) || isNaN(num2)){
            console.log('Invalid Input');
        }

        calculator.execute(num1, operators.value, num2);

    }

    //Exposed Function
    return {
        initialize,
        handleCalculate,
        handleFormatterSelection,
        handlePresenterSelection
    }



})();

try{
    //export elements only for nodejs.
    module.exports = app;
    
}catch(e){
    console.log('Welcome to browser based application');
}