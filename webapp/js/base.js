window.onload = function () {
    $('.btn-execute').click(function(){
        //var user = authUser('loserpunkx182','Overstock*');
        var pool = getUserPool();
        console.log(pool.getCurrentUser());
    });
    
}