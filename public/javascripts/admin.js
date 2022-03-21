adminCalling();

function adminCalling() {
    console.log("admincalling")
    axios.get('/adminCalling')
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $('#stockTbody').append(`<tr><th scope="row">${i + 1}</th><td>${response.data[i].Stock}</td><td>${response.data[i].Amount}</td><td>${stringToDate(response.data[i].Time)}</td><td>${response.data[i].Store}</td></tr>`)
            }
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function stringToDate(Date) {
    return Date.substring(0, 10);
}

$("#mainPage").click(function () {
    mainPageAddress = location.href.split('/');
    homePage = (mainPageAddress[0] + "//" + mainPageAddress[2]);
    location.href = homePage;
});