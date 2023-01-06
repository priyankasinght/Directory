let personData = [];
let nameEl = document.getElementById("name");
let dobEl = document.getElementById("dob");
let aadharNum = document.getElementById("aadhar");
let mobNum = document.getElementById("mob-num");
let ageEl = document.getElementById("age");
let addBtn = document.querySelector("#add-btn");
let saveBtn = document.querySelector("#save-btn"); 
let registerForm = document.querySelector("#register-form");

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
    let personString = JSON.stringify(personData);
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
    let personString = JSON.stringify(personData);
    localStorage.setItem("personData", personString);
}

// start showing data from local storage

let tableData = document.querySelector("#table-data");
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

    let i;
    let allDelBtn = document.querySelectorAll(".del-btn");
    for (i = 0; i < allDelBtn.length; i++){
        allDelBtn[i].onclick = function(){
            let tr = this.parentElement.parentElement;
            let id = tr.getAttribute("index");
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

let searchEl = document.querySelector("#aadharNum");
searchEl.oninput = function () {
    searchFunction();
}

function searchFunction(){
    let tr = tableData.querySelectorAll("TR");
    let filter = searchEl.value.toLowerCase();
    let i;
    for(i = 0; i < tr.length; i++){
        let td = tr[i].getElementsByTagName("TD")[2];
        let id = td.innerHTML;
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }else{
            tr[i].style.display = "none";
        }
    }
}

// calculate age from dob
function FindAge() {
    let day = document.getElementById("dob").value;
    let DOB = new Date(day);
    let today = new Date();
    let Age = today.getTime() - DOB.getTime();
    Age = Math.floor( Age / (1000 * 60 * 60 * 24 * 365.25));
    document.getElementById("age").value = Age;
}

// add validation to phone number

function validatePhoneNumber(input_str) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}

function validate() {
    let phone = document.getElementById('mob-num').value;
    if (!validatePhoneNumber(phone)) { 
        document.getElementById('phone_error').classList.remove('hidden' );
    } else {
        document.getElementById('phone_error').classList.add('hidden');
         alert("validation success") 
    }
}
