function showQuocGia(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/quocgia/list",
        success(data){
            let context = "";
            context += `<table border="1px">
               <tr>
               <td>Mã</td>
               <td>Tên Quốc Gia</td>
               <td>Thao tác</td>
</tr>`
            for (let i = 0; i < data.length; i++) {
                context +=`<tr>
<td>${data[i].idQuocgia}</td>
<td>${data[i].tenQuocgia}</td>
<td><button onclick="updateQuocGia(${data[i].idQuocgia})">Cập nhập</button>||<button onclick="deleteQuocGia(${data[i].idQuocgia})">Xóa</button></td>
</tr>`
            }
            context +=`</table>`
            document.getElementById("display").innerHTML= context;
        }
    })
}

function updateQuocGia(id){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/quocgia/"+id,
        success(data2){
            let form = "";
            form +=`<form id="update-QuocGia">
<table>
 <tr>
            <td>Tên Quốc Gia:</td>
            <td><input type="text" id="nameQuocGia" value="${data2.tenQuocgia}"></td>
        </tr>
         <tr>
            <td></td>
            <td><input type="submit" value="Update" onclick="updaQuocGia(${id})"></td>
        </tr>
</table>
</form>`
            document.getElementById("display").innerHTML=form;

        }
    })
}

function updaQuocGia(a) {
    let tenQuocgia = $('#nameQuocGia').val();
    let newCate={tenQuocgia:tenQuocgia}
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newCate),
        url: "http://localhost:8080/quocgia/" + a,
        success() {
            showQuocGia();
        }
    });
    event.preventDefault();
}

function deleteQuocGia(id){
    if(confirm("Bạn có chắc chắn muốn xóa ???")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/quocgia/" + id,
            success() {
                showQuocGia();
            }
        })
    }
}

function createQuocGia(){
    let from = "";
    from +=`
    <from id="add-QuocGia">
<table>
         <tr>
            <td>Tên Quốc Gia:</td>
            <td><input type="text" id="nameQuocGia" placeholder="tên quốc gia"></td>
        </tr>
         <tr>
            <td></td>
            <td><input type="submit" value="Add" onclick="addNewQuocGia()"></td>
        </tr>
</table>
</from>`
    document.getElementById("display").innerHTML= from;
}

function addNewQuocGia(){
    let tenQuocgia = $('#nameQuocGia').val()
    let newCate= {
        tenQuocgia:tenQuocgia
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"POST",
        data:JSON.stringify(newCate),
        url:"http://localhost:8080/quocgia/create",
        //xử lý khi thành công
        success(){
            showCategory();
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}