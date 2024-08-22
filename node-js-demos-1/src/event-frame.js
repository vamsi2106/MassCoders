class Event{
    constructor(){
        this.response = {};
    }

    emit(message, data){
       if(!this.response[message]){
        this.response[message] = data;
       }
    }

    on(message, handler){
        return this.response[message];
    }
}

module.exports = {Event};