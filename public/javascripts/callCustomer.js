adminCalling();

function adminCalling() {
    console.log("customercalling")
    axios.get('/customerCalling')
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $('#stockTbody').append(`<tr><th scope="row">${i + 1}</th>
                <td>${response.data[i].Stock}</td>
                <td>${response.data[i].Amount}</td>
                <td>${stringToDate(response.data[i].Time)}</td>
                <td>${response.data[i].Cname}</div></td>
                <td><div id="clientAddress-${i}" style="" class="td-Caddress">${response.data[i].Caddress}</div></td>
                <td><div id="clientContect-${i}" style="">${response.data[i].Ccontect}</div></td>
                <td>${response.data[i].Store}</td></tr>`)
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