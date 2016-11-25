
function openModal(){
    var modal = $('.modal');
    if (!modal.hasClass('open')){
        modal.addClass('open');
    }
}

function closeModal(){
    var modal = $('.modal');
    if (modal.hasClass('open')){
        modal.removeClass('open');
    }
}