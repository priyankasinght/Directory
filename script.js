/* start all global variable */
var personData = [];
var nameEl = document.getElementById("name");
var dobEl = document.getElementById("dob");
var aadharNum = document.getElementById("aadhar");
var mobNum = document.getElementById("mob-num");
var ageEl = document.getElementById("age");
var addBtn = document.querySelector("#add-btn");
var saveBtn = document.querySelector("#save-btn"); 
var registerForm = document.querySelector("#register-form");

 /* end all global variable */

 
    
  
   

/* start add btn coding */
addBtn.onclick = function (e) {
    e.preventDefault;
    addData();
    getDataFromLocal();
    registerForm.reset('');
}

if (localStorage.getItem("personData") != null) {
    personData = JSON.parse(localStorage.getItem("personData"));
}

function addData() {

    personData.push({
        name: nameEl.value,
        dob: dobEl.value,
        aadhar: aadharNum.value,
        mobNum: mobNum.value,
        age: ageEl.value
    })
    var personString = JSON.stringify(personData);
    localStorage.setItem("personData", personString);

}

/* start save btn coding */

saveBtn.onclick = function (e) {
    e.preventDefault;
    addData();
    getDataFromLocal();
    registerForm.reset('');
}

if (localStorage.getItem("personData") != null) {
    personData = JSON.parse(localStorage.getItem("personData"));
}

function addData() {

    personData.push({
        name: nameEl.value,
        dob: dobEl.value,
        aadhar: aadharNum.value,
        mobNum: mobNum.value,
        age: ageEl.value
    })
    var personString = JSON.stringify(personData);
    localStorage.setItem("personData", personString);
}

// start showing data from local storage

var tableData = document.querySelector("#table-data");
const getDataFromLocal = () => {
    tableData.innerHTML = "";
    personData.forEach((data, index) => {
        tableData.innerHTML += `
        <tr index='${index}'>
          <td>${data.name}</td>
          <td>${data.dob}</td>
          <td>${data.aadhar}</td>
          <td>${data.mobNum}</td>
          <td>${data.age}</td>
          <td>
            <button>Save</button>
                        
            <button class="del-btn">Delete</button>
          </td>
        </tr>
         `;
    })

    /* start delete coding */

    var i;
    var allDelBtn = document.querySelectorAll(".del-btn");
    for (i = 0; i < allDelBtn.length; i++){
        allDelBtn[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    personData.splice(id,1);
            localStorage.setItem("personData", JSON.stringify(personData));
            tr.remove();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
            
        }
    }

}

getDataFromLocal();

// start search coding

var searchEl = document.querySelector("#aadharNum");
searchEl.oninput = function () {
    searchFunction();
}

function searchFunction(){
    var tr = tableData.querySelectorAll("TR");
    var filter = searchEl.value.toLowerCase();
    var i;
    for(i = 0; i < tr.length; i++){
        var td = tr[i].getElementsByTagName("TD")[2];
        var id = td.innerHTML;
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }else{
            tr[i].style.display = "none";
        }
    }
}

// calculate age from dob
function FindAge() {
    var day = document.getElementById("dob").value;
    var DOB = new Date(day);
    var today = new Date();
    var Age = today.getTime() - DOB.getTime();
    Age = Math.floor( Age / (1000 * 60 * 60 * 24 * 365.25));
    document.getElementById("age").value = Age;
}

// add validation to phone number

function validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}

function validate() {
    var phone = document.getElementById('mob-num').value;
    if (!validatePhoneNumber(phone)) { 
        document.getElementById('phone_error').classList.remove('hidden' );
    } else {
        document.getElementById('phone_error').classList.add('hidden');
         alert("validation success") 
    }
}