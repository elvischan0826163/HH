getStockData();

function getStockData() {
    axios.get('/getStockData')
        .then(function (response) {
            addTable(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function stringToDate(Date) {
    if (Date != null) {
        return Date.substring(0, 10);
    }
    else {
        return "";
    }
}

$("#mainPage").click(function () {
    mainPageAddress = location.href.split('/');
    homePage = (mainPageAddress[0] + "//" + mainPageAddress[2]);
    location.href = homePage;
});

var deleteId;

function showDeleteModal(id) {
    deleteId = id;
}

function deleteData() {
    axios.delete('/deleteData', {
        data: {
            "id": deleteId
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

function showClient(i) {
    if ($(`#clientAddress-${i}`).is(":hidden")) {
        $(`#clientAddress-${i}`).show();
        $(`#clientContect-${i}`).show();
    }
    else {
        $(`#clientAddress-${i}`).hide();
        $(`#clientContect-${i}`).hide();
    }
}

function searchingData() {
    console.log($(`#Cname`).val());
    axios.get('/searchingData', {
        params: {
            Cname: $(`#Cname`).val(),
            From: $(`#From`).val(),
            To: $(`#To`).val()
        }
    })
        .then(function (response) {
            $('#stockTbody').html('');
            addTable(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function addTable(response) {
    for (var i = 0; i < response.data.length; i++) {
        $('#stockTbody').append(`<tr class="stockId-${response.data[i].id}"> + 
        <th scope="row">${i + 1}</th> + 
        <td>${response.data[i].Stock}</td> + 
        <td>${response.data[i].Amount}</td> + 
        <td>${stringToDate(response.data[i].Time1)}</td> + 
        <td>${response.data[i].Cname}</div></td> + 
        <td><button type="button" class="btn btn-success" onclick="showClient(${i})">詳情</button></td> + 
        <td><div id="clientAddress-${i}" style="display:none;" class="td-Caddress">${response.data[i].Caddress}</div></td> + 
        <td><div id="clientContect-${i}" style="display:none;">${response.data[i].Ccontect}</div></td> + 
        <td>${response.data[i].Month}</div></td> +
        <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onclick="showDeleteModal(${response.data[i].id})">消除</button></td> + 
        <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal02" onclick="showEditModal(${response.data[i].id})">更改</button></td> + 
        </tr>`)
    }
}

function showEditModal(id) {
    $("input[name='id']").val(id);
    console.log($(`.stockId-${id}`).find("td:eq(0)").text());
    $("input[name='Stock']").val($(`.stockId-${id}`).find("td:eq(0)").text());
    console.log($(`.stockId-${id}`).find("td:eq(1)").text());
    $("input[name='Amount']").val($(`.stockId-${id}`).find("td:eq(1)").text());
    console.log($(`.stockId-${id}`).find("td:eq(2)").text());
    $("input[name='Time']").val($(`.stockId-${id}`).find("td:eq(2)").text());
    console.log($(`.stockId-${id}`).find("td:eq(3)").text());
    $("input[name='Cname']").val($(`.stockId-${id}`).find("td:eq(3)").text());
    console.log($(`.stockId-${id}`).find("td:eq(5)").text());
    $("input[name='Caddress']").val($(`.stockId-${id}`).find("td:eq(5)").text());
    console.log($(`.stockId-${id}`).find("td:eq(6)").text());
    $("input[name='Ccontect']").val($(`.stockId-${id}`).find("td:eq(6)").text());
    console.log($(`.stockId-${id}`).find("td:eq(7)").text());
    $("select[name='Month']").val($(`.stockId-${id}`).find("td:eq(7)").text());
    document.getElementById('container').scrollLeft -= 200;
}