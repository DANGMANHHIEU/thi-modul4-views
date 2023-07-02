function showThanhPho(){
    $.ajax({
        url:"http://localhost:8080/thanhpho/list",
        type:"GET",
        success(data) {
            console.log(data);
            let context = ``;
            context += `<table border="1px">
    <tr> 
    <td>Mã Thành Phố</td>
    <td>Tên TP</td>
    <td>Diện tích</td>
    <td>Dân số</td>
 
    <td>Mô tả</td>
    
    <td>Quốc Gia</td>
       <td>GDP</td>
    <td>Thao tác</td>
    </tr>`
            for (let i = 0; i < data.length; i++) {
                context += `<tr>
        <td>${data[i].idThanhPho}</td>
        <td>${data[i].tenThanhPho}</td>
        <td>${data[i].dientich}</td>
        <td>${data[i].danSo}</td>
        
        <td>${data[i].moTaThanhPho}</td>
        <td>${data[i].quocGia.tenQuocgia}</td>
        <td>${data[i].gdp}</td>
        <td><button onclick="view(${data[i].idThanhPho})">View</button>||<button onclick="update(${data[i].idThanhPho})">Update</button>||<button onclick="deleteThanhPho(${data[i].idThanhPho})">Delete</button> </td>
         </tr>`
            }
            ;
            context += `</table>`
            document.getElementById("display").innerHTML = context;
        }
    })
}

function createThanhPho(){
    let form = ``;
    form += `<form id="add-ThanhPho">
    <table>
       <tr>
            <td>Tên TP:</td>
            <td><input type="text" id="nameThanhPho" placeholder="tên TP"></td>
        </tr>
        <tr>
            <td>Diện Tích:</td>
            <td><input type="text" id="dientich" placeholder="diện tích"></td>
        </tr>
        <tr>
            <td>Dân số:</td>
            <td><input type="text" id="danso" placeholder="dân số"></td>
        </tr>
        <tr>
            <td>GDP:</td>
            <td><input type="text" id="gdp" placeholder="GDP"></td>
        </tr>
         <tr>
            <td>Mô tả:</td>
            <td><input type="text" id="mota" placeholder="mô tả"></td>
        </tr>
        <tr>
        <td>Quốc gia:</td>
        <td><select id="quocgia"></select></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" value="Add" onclick="addNewThanhPho()"></td>
        </tr>
    </table>
</form>`

    $.ajax({
        url:"http://localhost:8080/quocgia/list",
        type: "GET",
        success(data) {
            let a = ``
            for (let i = 0; i < data.length; i++) {
                a += `<option value="${data[i].idQuocgia},${data[i].tenQuocgia}"  >${data[i].tenQuocgia}</option>`
            }
            document.getElementById("quocgia").innerHTML= a;
        }
    })
    document.getElementById("display").innerHTML=form;
}

function addNewThanhPho(){
    let tenThanhPho = $('#nameThanhPho').val();
    let dientich = $('#dientich').val();
    let danSo = $('#danso').val();
    let gdp = $('#gdp').val();
    let moTaThanhPho = $('#mota').val();
    let quocGia = $('#quocgia').val().split(",");
    let idQuocgia = quocGia[0];
    let tenQuocgia = quocGia[1];
    let newThanhPho = {
        tenThanhPho:tenThanhPho,
        dientich:dientich,
        danSo:danSo,
        moTaThanhPho:moTaThanhPho,
        quocGia:{idQuocgia,tenQuocgia},
        gdp:gdp,
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"POST",
        data:JSON.stringify(newThanhPho),
        url:"http://localhost:8080/thanhpho/create",
        //xử lý khi thành công
        success(){
           showThanhPho();
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();

}

function deleteThanhPho(id){
    if(confirm("Bạn có chắc chắn muốn xóa ???")){
        $.ajax({
            type:"DELETE",
            url:"http://localhost:8080/thanhpho/"+id,
            success(){
                showThanhPho();
            }
        })
    }
}

//view
function view(id){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/thanhpho/"+id,
        success(data){
            document.getElementById("display").innerHTML=`<table border="1px">
<tr>
<td>Mã</td>
<td>Tên Thành phố</td>
<td>Diện tich</td>
<td>Dan so</td>
<td>Mô tả</td>
<td>Quốc gia</td>
<td>GDP</td>

</tr>
<tr>
<td>${data.idThanhPho}</td>
<td>${data.tenThanhPho}</td>
<td>${data.dientich}</td>
<td>${data.danSo}</td>
<td>${data.moTaThanhPho}</td>
<td>${data.quocGia.tenQuocgia}</td>
<td>${data.gdp}</td>
</tr>
</table>
`
        }
    })
}

// update
function update(id){
$.ajax({
    type:"GET",
    url:"http://localhost:8080/thanhpho/"+id,
    success(data){
        let form = ``;
        form += `<form id="update-Painting">
    <table>
       <tr>
            <td>tên TP:</td>
            <td><input type="text" id="nameThanhPho" value="${data.tenThanhPho}"></td>
        </tr>
        <tr>
            <td>Diện tích:</td>
            <td><input type="text" id="dientich" value="${data.dientich}"></td>
        </tr>
        <tr>
            <td>Dân số:</td>
            <td><input type="text" id="danSo" value="${data.danSo}"></td>
        </tr>
         <tr>
            <td>Mô tả:</td>
            <td><input type="text" id="mota" value="${data.moTaThanhPho}"></td>
        </tr>
         <tr>
            <td>GDP:</td>
            <td><input type="text" id="gdp" value="${data.gdp}"></td>
        </tr>
        <tr>
        <td>Quốc gia</td>
        <td><select id="quocgia"></select></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" value="Update" onclick="updateThanhPho(${id})"></td>
        </tr>
    </table>
</form>`
        $.ajax({
            type:"GET",
            url:"http://localhost:8080/quocgia/list",
            success(dataQuocGia){
                console.log(dataQuocGia)
                let option="";
                for(let i=0;i<dataQuocGia.length;i++){
                    let selected = "";
                    if(dataQuocGia[i].idQuocgia == data.quocGia.idQuocgia){
                        selected = "selected";
                    }
                    option += `<option  value="${dataQuocGia[i].idQuocgia},${dataQuocGia[i].tenQuocgia}" ${selected}>${dataQuocGia[i].tenQuocgia}</option>`
                }
                document.getElementById("quocgia").innerHTML=option;
            }
        })
        document.getElementById("display").innerHTML=form;
    }
})
}

function updateThanhPho(a){
    let tenThanhPho = $('#nameThanhPho').val();
    let dientich = $('#dientich').val();
    let danSo = $('#danSo').val();
    let gdp = $('#gdp').val();
    let moTaThanhPho = $('#mota').val();
    let quocGia = $('#quocgia').val().split(",");
    let idQuocgia = quocGia[0];
    let tenQuocgia = quocGia[1];
    let newThanhPho = {
        tenThanhPho:tenThanhPho,
        dientich:dientich,
        danSo:danSo,
        moTaThanhPho:moTaThanhPho,
        quocGia:{idQuocgia,tenQuocgia},
        gdp:gdp,
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"PUT",
        data:JSON.stringify(newThanhPho),
        url:"http://localhost:8080/thanhpho/"+a,
        //xử lý khi thành công
        success(){
            showThanhPho();
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();


}