const personData = [];
const nameEl = document.getElementById("name");
const dobEl = document.getElementById("dob");
const aadharNum = document.getElementById("aadhar");
const mobNum = document.getElementById("mob-num");
const ageEl = document.getElementById("age");
const addBtn = document.querySelector("#add-btn");
const saveBtn = document.querySelector("#save-btn"); 
const registerForm = document.querySelector("#register-form");

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
    const personString = JSON.stringify(personData);
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
    const personString = JSON.stringify(personData);
    localStorage.setItem("personData", personString);
}

// start showing data from local storage

const tableData = document.querySelector("#table-data");
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

    const i;
    const allDelBtn = document.querySelectorAll(".del-btn");
    for (i = 0; i < allDelBtn.length; i++){
        allDelBtn[i].onclick = function(){
            const tr = this.parentElement.parentElement;
            const id = tr.getAttribute("index");
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

const searchEl = document.querySelector("#aadharNum");
searchEl.oninput = function () {
    searchFunction();
}

function searchFunction(){
    const tr = tableData.querySelectorAll("TR");
    const filter = searchEl.value.toLowerCase();
    const i;
    for(i = 0; i < tr.length; i++){
        const td = tr[i].getElementsByTagName("TD")[2];
        const id = td.innerHTML;
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }else{
            tr[i].style.display = "none";
        }
    }
}

// calculate age from dob
function FindAge() {
    const day = document.getElementById("dob").value;
    const DOB = new Date(day);
    const today = new Date();
    const Age = today.getTime() - DOB.getTime();
    Age = Math.floor( Age / (1000 * 60 * 60 * 24 * 365.25));
    document.getElementById("age").value = Age;
}

// add validation to phone number

function validatePhoneNumber(input_str) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}

function validate() {
    const phone = document.getElementById('mob-num').value;
    if (!validatePhoneNumber(phone)) { 
        document.getElementById('phone_error').classList.remove('hidden' );
    } else {
        document.getElementById('phone_error').classList.add('hidden');
         alert("validation success") 
    }
}
