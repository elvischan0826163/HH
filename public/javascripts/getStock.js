getStockData();

function getStockData() {
    axios.get('/getStockData')
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $('#stockTbody').append(`<tr><th scope="row">${i + 1}</th><td>${response.data[i].Stock}</td><td>${response.data[i].Amount}</td><td>${stringToDate(response.data[i].Time)}</td><td>${response.data[i].Cname}</td><td>${response.data[i].Caddress}</td><td>${response.data[i].Ccontect}</td><td><button type="button" class="btn btn-danger" id="logOutPage" style="width:100%;" onclick="deleteData(${response.data[i].id})">消除記錄</button></td></tr>`)
            }
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

function deleteData(id) {
    axios.delete('/deleteData', {
        data: {
            "id": id
        }
    })
        .then(function (response) {
            console.log(response);
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}
