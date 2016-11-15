class SessionHelper{
    constructor(){

    }

    getToke(){
        return sessionStorage.getItem('toke');
    }

    setToke(toke){
        sessionStorage.setItem('toke',toke);
    }

}