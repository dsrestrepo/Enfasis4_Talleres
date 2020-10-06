/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {

    function updateCount(result) {
        var nombrediv=document.getElementById("data");
        nombrediv.innerHTML=result.resultado;
        
    }    
    var handlerUrl2 = runtime.handlerUrl(element, 'listardatos');

    $('button', element).click(function(eventObject) {
        var name = document.getElementById('name').value;
        var lastname = document.getElementById('lastname').value;
        var mail = document.getElementById('email').value;
        $.ajax({
            type: 'POST',
            url: handlerUrl2,
            data: JSON.stringify({'name': name,'lastname': lastname,'mail': mail}),
            success: updateCount
        });
    });
    $(function ($) {
    /* Here's where you'd do things on page load. */
    });
}
