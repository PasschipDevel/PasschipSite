// The function actually applying the offset

function offsetAnchor() {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 80);
    }
}



$('a[href*=\\#].smoothscroll').on('click', function (event) {
    event.preventDefault();
    $('html,body').animate({scrollTop: $(this.hash).offset().top}, 500);
});


// This will capture hash changes while on the page
window.addEventListener("hashchange", offsetAnchor);

// This is here so that when you enter the page with a hash,
// it can provide the offset in that case too. Having a timeout
// seems necessary to allow the browser to jump to the anchor first.
window.setTimeout(offsetAnchor, 1); // The delay of 1 is arbitrary and may not always work right (although it did in my testing)


function on_question_clicked(element) {

    var subject = $(element).data("subject");
    $("#form-subject").val(subject);


}


var cc = false;

function correctCaptcha(response) {
    if (response.length > 0)
        cc = true;
}

var loader = $("#loader");

$(document).on('ready', function () {
    $("form").on("submit", function (e) {

        $(loader).show();
        if ($(this).attr("class") === "validate")
            return;

        e.preventDefault();
        if (!cc) {
            alert("Incorrect Captcha");
            $(loader).hide();
        } else {
            $.ajax({ // create an AJAX call...
                data: $(this).serialize(), // get the form data
                type: $(this).attr('method'), // GET or POST
                url: $(this).attr('action'), // the file to call
                success: function (response) { // on success..
                    $(loader).hide();
                    showModal();
                },
                error: function (jqXHR, err) {
                    $(loader).hide();
                    alert("Something went wrong");
                    console.log(err);

                }
            });
        }

    })
});

var modal = $("#thankyouModal");

function showModal(){
    modal.modal('show');
}

$(modal).on('hidden.bs.modal', function () {
    location.reload();
});
