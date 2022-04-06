adminCalling();

function adminCalling() {
    console.log("customercalling")
    axios.get('/customerCalling')
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].Month != 0) {
                    var dataDate = new Date((response.data[i].Time))
                    //minus one day
                    var checkDate = new Date(dataDate.setDate(dataDate.getDate() - 1))
                    //today
                    var ToDate = new Date();
                    //set date with timezone 00:00:00
                    while (checkDate.setHours(0, 0, 0, 0) < ToDate.setHours(0, 0, 0, 0)) {
                        checkDate = new Date(checkDate.setMonth(checkDate.getMonth() + response.data[i].Month));
                    }
                    if (checkDate.setHours(0, 0, 0, 0) == ToDate.setHours(0, 0, 0, 0)) {
                        $('#stockTbody').append(`<tr><th scope="row">${i + 1}</th>
                    <td>${response.data[i].Stock}</td>
                    <td>${response.data[i].Amount}</td>
                    <td>${stringToDate(response.data[i].Time)}</td>
                    <td>${response.data[i].Cname}</div></td>
                    <td><div id="clientAddress-${i}" style="" class="td-Caddress">${response.data[i].Caddress}</div></td>
                    <td><div id="clientContect-${i}" style="">${response.data[i].Ccontect}</div></td>
                    <td>${response.data[i].Month}</td></tr>`)
                    }
                }
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