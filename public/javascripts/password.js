$("#mainPage").click(function () {
    mainPageAddress = location.href.split('/');
    homePage = (mainPageAddress[0] + "//" + mainPageAddress[2]);
    location.href = homePage;
});

$("#submitButton").click(function () {
    console.log("sumbit button click!")
    if (hasWhiteSpace($("#password1").val()) != true && $("#password1").val() == $("#password2").val()) {
        console.log("success!")
        axios.put('/changePassword', {
            password: $("#password1").val(),
        })
            .then(function (response) {
                console.log(response);
                $("#password1").val("");
                $("#password2").val("");
                $("#successMsg").html("Success");                
            })
            .catch(function (error) {
                console.log(error);
                $("#failMsg").html("Fail");
            });
    }
    else {
        console.log("fail!")
        $("#failMsg").html("Fail");
    }
})

function hasWhiteSpace(s) {
    return /\s/g.test(s);
}