window.onload = function () {
    var toke = sessionStorage.getItem('toke');    

    if (toke!=null){
        $.ajax({
            url:'http://54.201.24.33/cognitoservice/getuser.php',
            type:'POST',
            data:{
                toke: toke
            }            
        }).done(function(result){
            console.log(result);
        }).fail(function(a,b,c){
            console.log('failed');
        })
    }
}