var arr = [];

if(localStorage.data){
  arr = JSON.parse(localStorage.data); 
}

addElementsInArray();

var currentRow=0;

function formData() {
    var btnvalue = document.getElementById("empSubmit").value;
    var cancelBtn = document.getElementById("empCancel").value;

    if(btnvalue === 'Save')
    {
        var numb = document.getElementById("numb").value;
        var inDate = document.getElementById("inDate").value;
        var splDate = document.getElementById("splDate").value;
        var comment = document.getElementById("comment").value;

        arr.push({numb:numb,inDate:inDate,splDate:splDate,comment:comment});
        addElementsInArray();
        document.getElementById("numb").value="";
        document.getElementById("inDate").value="";
        document.getElementById("splDate").value="";
        document.getElementById("comment").value="";

    }else if(btnvalue === 'Update')
    {
        updateFormData();
    }

    if(cancelBtn === 'Cancel')
    {
        cancel();
    } 
}

function editEmp(e) {
     console.log(e);
     console.log(arr[e-1].numb +" "+arr[e-1].inDate+" " +arr[e-1].splDate +" "+arr[e-1].comment);

     document.getElementById("numb").value=arr[e-1].numb;
     document.getElementById("inDate").value=arr[e-1].inDate;
     document.getElementById("splDate").value=arr[e-1].splDate;
     document.getElementById("comment").value=arr[e-1].comment;
     currentRow=e;

    document.getElementById("empSubmit").value = "Update";
    document.getElementById("empCancel").style.visibility="visible";
}

function updateFormData() {
    console.log(currentRow);
    document.getElementById("empSubmit").value = "Submit";

    var numb = document.getElementById("numb").value;
    var inDate = document.getElementById("inDate").value;
    var splDate = document.getElementById("splDate").value;
    var comment = document.getElementById("comment").value;

    arr[currentRow-1].numb = numb;
    arr[currentRow-1].inDate = inDate;
    arr[currentRow-1].splDate = splDate;
    arr[currentRow-1].comment = comment;

    console.log(arr);
    document.getElementById("numb").value="";
    document.getElementById("inDate").value="";
    document.getElementById("splDate").value="";
    document.getElementById("comment").value="";

    addElementsInArray();

}

function deleteEmp(e) {
    arr.splice(e-1,1);
    addElementsInArray();
}

function cancel() {
    currentRow=0;
    document.getElementById("numb").value="";
    document.getElementById("inDate").value="";
    document.getElementById("splDate").value="";
    document.getElementById("comment").value="";

    document.getElementById("empCancel").style.visibility="hidden";
}

function deleteAllrows() {
    if(document.getElementById("empTable") && 
        document.getElementById("empTable").getElementsByTagName('tbody') &&
        document.getElementById("empTable").getElementsByTagName('tbody').length > 0 ){
         var Parent = document.getElementById("empTable").getElementsByTagName('tbody')[0];
            while(Parent.hasChildNodes())
            {
                Parent.removeChild(Parent.firstChild);
            }   
    }
   
}

function addElementsInArray() {
   deleteAllrows();

   for(var i = 0; i < arr.length; i++)
    {
        var table = document.getElementById('empTable').getElementsByTagName('tbody')[0];
        var row = table.insertRow(table.rows.length);
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        var cell3=row.insertCell(2);
        var cell4=row.insertCell(3);
        var cell5=row.insertCell(4);

        cell1.innerHTML = arr[i].numb;
        cell2.innerHTML = arr[i].inDate;
        cell3.innerHTML = arr[i].splDate;
        cell4.innerHTML = arr[i].comment;
        cell5.innerHTML = "<button onclick=editEmp("+table.rows.length+")>Edit</button><button onclick=deleteEmp("+table.rows.length+")>Delete</button>";
    }

    localStorage.setItem('data', JSON.stringify(arr));

    document.getElementById("numb").value="";
    document.getElementById("inDate").value="";
    document.getElementById("splDate").value="";
    document.getElementById("comment").value="";
}

var modal = document.getElementById('main__form');
var btn = document.getElementById("click__invoices");
var span = document.getElementsByClassName("modal_close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}