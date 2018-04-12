window.onload = function(){
    loadFB();
}

window.fbAsyncInit = function(){
    initFB();
    getFBStatus(handleStatus);
}

function handleStatus(result){

}