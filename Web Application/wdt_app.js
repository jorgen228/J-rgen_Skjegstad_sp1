// Clock functionality

const clockElement = document.getElementById("clock-element");

let hour;
let minute;

function displayTime() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  minute = today.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let seconds = today.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  clockElement.innerText = `${day} ${month} ${year} ${hour}:${minute}:${seconds}`;
}
displayTime();
setInterval(displayTime, 1000);

// Employee objects
class Employee {
  constructor(name, surName) {
    this.name = name;
    this.surName = surName;
  }
}

class StaffMember extends Employee {
  constructor(
    name,
    surName,
    staffNumber,
    picture,
    email,
    status,
    outTime,
    duration,
    current,
    expectedReturnTime
  ) {
    super(name, surName);
    this.staffNumber = staffNumber;
    this.picture = picture;
    this.email = email;
    this.status = status;
    this.outTime = outTime;
    this.duration = duration;
    this.current = current;
    this.expectedReturnTime = expectedReturnTime;
  }
  staffMemberIsLate() {
    uppdateToast(this.staffNumber, this.picture, this.name, this.outTime);
    $(`#liveToast-` + this.staffNumber).toast("show");
  }
  estimateTime() {
    let targetHours = Math.floor(this.duration / 60 / 60);
    let targetMinutes = Math.floor((this.duration / 60) % 60);
    let targetSeconds = Math.floor(this.duration % 60);
    targetMinutes = targetMinutes < 10 ? "0" + targetMinutes : targetMinutes;
    targetSeconds = targetSeconds < 10 ? "0" + targetSeconds : targetSeconds;
    this.duration--;
    this.current = `${targetHours}:${targetMinutes}:${targetSeconds}`;
    rowArray[this.staffNumber].childNodes[6].textContent = this.current;
    if (this.duration === -1) {
      clearInterval(this.timerID);
      this.staffMemberIsLate();
    }
  }
}
class DeliveryDriver extends Employee {
  constructor(
    name,
    surName,
    vehicle,
    telephone,
    deliveryAddress,
    returnTime,
    deliveryNumber
  ) {
    super(name, surName);
    this.vehicle = vehicle;
    this.telephone = telephone;
    this.deliveryAddress = deliveryAddress;
    this.returnTime = returnTime;
    this.deliveryNumber = deliveryNumber;
    this.timerID = null;
    this.toastContainer = null;
    this.toastDiv = null;
  }
  calculateTime() {
    if (this.returnTime === null) {
      return;
    } else {
      let returnHours = parseInt(this.returnTime.slice(0, 2));
      let returnMinutes = parseInt(this.returnTime.slice(-2));
      if (
        returnHours === parseInt(hour) &&
        returnMinutes === parseInt(minute)
      ) {
        this.deliveryDriverIsLate();
      }
    }
  }
  deliveryDriverIsLate() {
    clearInterval(this.timerID);
    this.toastDeliveryContainer = document.getElementById("toast-container");
    this.toastDiv = document.createElement("div");
    this.toastDiv.innerHTML = `<div id="liveDeliveryToast-${this.deliveryNumber}" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Reception Management Dashboard</strong>
      <small>One second ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      <div>
        <p id="toast-header">A delivery-driver has not returned on time!</p>
        <h2>${this.vehicle}</h2>
      </div>
      <p id="toast-name">Name: ${this.name}</p>
      <p id="toast-time-away">Expected return was: ${this.returnTime}</p>
      <button id="toast-btn" class="btn btn-primary">Request return</button>
      <button id="toast-btn" class="btn btn-primary">
        Request uppdate
      </button>
    </div>
  </div>`;
    this.toastDeliveryContainer.appendChild(this.toastDiv);
    $(`#liveDeliveryToast-` + this.deliveryNumber).toast("show");
    this.returnTime = null;
  }
  endTimer() {
    clearInterval(this.timerID);
    this.returnTime = null;
  }
}

// Display Staff functionality

const employeeTable = document.getElementById("employee-table");
const employeeTbody = employeeTable.getElementsByTagName("tbody")[0];

let rowSuffix = "row-";
let rowNumber = 1;
let rowArray = [];

let numberOfEmplyees = [1, 2, 3, 4, 5];
let staffNumber = 1;
let staffArray = [];

function displayStaffMembers(staffObject) {
  let newRow = employeeTbody.insertRow();
  let newCell1 = newRow.insertCell();
  newCell1.innerHTML = `<img class="staff-img unselected" id="img-${staffNumber}" src="${staffObject.picture}">`;
  let newCell2 = newRow.insertCell();
  newCell2.textContent = staffObject.name;
  let newCell3 = newRow.insertCell();
  newCell3.textContent = staffObject.surName;
  let newCell4 = newRow.insertCell();
  newCell4.textContent = staffObject.email;
  let newCell5 = newRow.insertCell();
  newCell5.textContent = staffObject.status;
  let newCell6 = newRow.insertCell();
  newCell6.textContent = staffObject.outTime;
  let newCell7 = newRow.insertCell();
  newCell7.textContent = staffObject.current;
  let newCell8 = newRow.insertCell();
  newCell8.textContent = staffObject.expectedReturnTime;
  newRow.id = `${rowSuffix}${rowNumber}`;
  rowArray.push(newRow);
  rowNumber++;
  staffNumber++;
}

let staffInt = 0;

function staffUserGet() {
  numberOfEmplyees.forEach(() => {
    $.ajax({
      url: "https://randomuser.me/api/",
      dataType: "json",
      success: function (data) {
        let staffPicture = data.results[0].picture.thumbnail;
        let staffName = data.results[0].name.first;
        let staffSurName = data.results[0].name.last;
        let staffEmail = data.results[0].email;

        const newStaff = new StaffMember(
          staffName,
          staffSurName,
          staffInt,
          staffPicture,
          staffEmail,
          "In",
          "__",
          0,
          "00:00:00",
          "__"
        );
        displayStaffMembers(newStaff);
        staffArray.push(newStaff);
        staffInt++;
      },
    });
  });
}

staffUserGet();

// Staff check out functionality

currentObjects = [];

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      $(".staff-img").click(function () {
        $(this).toggleClass("selected");
      });
      $(".unselected").click(function () {
        let currentImage = $(this);
        let currentID = currentImage[0].id;
        let objectNumber = parseInt(currentID.slice(-1));
        currentObjects.push(staffArray[objectNumber - 1]);
      });
    }, 1000);
  });
}

async function asyncCall() {
  const result = await resolveAfter2Seconds();
}
asyncCall();

$("#out-btn").click(staffOut);
$("#in-btn").click(staffIn);

function staffOut() {
  minutesAway = parseInt(prompt("How long will they be away in minutes?"));
  while (isNaN(minutesAway)) {
    minutesAway = parseInt(prompt("Please enter their leave in minutes only."));
  }
  for (i = 0; i < currentObjects.length; i++) {
    clearInterval(currentObjects[i].timerID);
    currentObjects[i].status = "Out";

    let clockString = "__";
    if (minutesAway > 60) {
      let hoursAway = Math.floor(minutesAway / 60);
      minutesAwayTime = Math.floor(minutesAway % 60);
      clockString = `${hoursAway}h ${minutesAwayTime}min`;
    } else {
      clockString = `${minutesAway} min`;
    }
    currentObjects[i].outTime = clockString;

    let today = new Date().getTime();
    let targetTime = minutesAway * 60000;

    let timeGap = today + targetTime;
    let returnString = "__";

    let returnTime = new Date(timeGap);
    let returnHour = returnTime.getHours();
    let returnMinutes = returnTime.getMinutes();
    if (returnMinutes < 10) {
      returnMinutes = `0${returnMinutes}`;
      returnString = `${returnHour}:${returnMinutes}`;
    } else {
      returnString = `${returnHour}:${returnMinutes}`;
    }
    if (returnHour < 10) {
      returnHour = `0${returnHour}`;
      returnString = `${returnHour}:${returnMinutes}`;
    }
    currentObjects[i].expectedReturnTime = returnString;
    currentObjects[i].duration = Math.floor(minutesAway * 60);

    currentObjects[i].estimateTime();
    currentObjects[i].timerID = setInterval(
      currentObjects[i].estimateTime.bind(currentObjects[i]),
      1000
    );
  }

  $(".selected").toggleClass("selected");

  uppdateTable();
  currentObjects = [];
}

function countDownTimer() {
  for (i = 0; i < staffArray.length; i++) {
    if (staffArray[i].current === `00:00:00`) {
      return;
    } else {
      if (staffArray[i].duration !== 0) {
        staffArray[i].duration--;
        staffArray[i].estimateTime();
        rowArray[i].childNodes[6].textContent = staffArray[i].current;
      } else {
        return;
      }
    }
  }
}

// Staff in functionality

function staffIn() {
  for (i = 0; i < currentObjects.length; i++) {
    clearInterval(currentObjects[i].timerID);
    currentObjects[i].status = "Out";
    currentObjects[i].status = "In";
    currentObjects[i].outTime = "__";
    currentObjects[i].duration = 0;
    currentObjects[i].current = `00:00:00`;
    currentObjects[i].expectedReturnTime = "__";
  }
  $(".selected").toggleClass("selected");

  uppdateTable();
  currentObjects = [];
}

function uppdateTable() {
  for (i = 0; i < rowArray.length; i++) {
    rowArray[i].childNodes[4].textContent = staffArray[i].status;
    rowArray[i].childNodes[5].textContent = staffArray[i].outTime;
    rowArray[i].childNodes[6].textContent = staffArray[i].current;
    rowArray[i].childNodes[7].textContent = staffArray[i].expectedReturnTime;
  }
}

$("#liveToastBtn").click(function () {
  $(`#liveToast`).toast("show");
});

function uppdateToast(number, img, name, timeOut) {
  let toastContainer = document.getElementById("toast-container");
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<div id="liveToast-${number}" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="me-auto">Reception Management Dashboard</strong>
    <small>One second ago</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    <div>
      <p id="toast-header">A staffmember is running late!</p>
      <img id="toast-img" src="${img}" alt="" />
    </div>
    <p id="toast-name">Name: ${name}</p>
    <p id="toast-time-away">Time away: ${timeOut}</p>
    <button id="toast-btn" class="btn btn-primary">Request return</button>
    <button id="toast-btn" class="btn btn-primary">
      Request uppdate
    </button>
  </div>
</div>`;
  toastContainer.appendChild(newDiv);
}

// Create delivery functionality

const vehicleBtn = document.getElementById("vehicle-dropdown");
const inputName = document.getElementById("input-name");
const inputSurname = document.getElementById("input-surname");
const inputTelephone = document.getElementById("input-telephone");
const inputAddress = document.getElementById("input-address");
const inputReturn = document.getElementById("input-return");

function uppdateToBicycle() {
  vehicleBtn.innerHTML = `<i class="bi bi-bicycle"></i>`;
}

function uppdateToCar() {
  vehicleBtn.innerHTML = `<i class="bi bi-car-front-fill"></i>`;
}

let displayDeliveries = [];
let currentDeliveries = [];
let currentDeliveryNumber = 0;

function addDelivery() {
  let selectedVehicle = vehicleBtn.innerHTML;
  let selectedName = inputName.value;
  let selectedSurname = inputSurname.value;
  let selectedTelephone = inputTelephone.value;
  let selectedAddress = inputAddress.value;
  let selectedReturn = inputReturn.value;
  let timeChar = ":";

  if (
    (vehicleBtn.innerHTML === `<i class="bi bi-bicycle"></i>` ||
      vehicleBtn.innerHTML === `<i class="bi bi-car-front-fill"></i>`) &&
    isNaN(selectedName) &&
    isNaN(selectedSurname) &&
    !isNaN(selectedTelephone) &&
    !(selectedTelephone.length == 0) &&
    isNaN(selectedAddress) &&
    selectedReturn.includes(timeChar) &&
    selectedReturn.length < 6
  ) {
    let newDelivery = new DeliveryDriver(
      selectedName,
      selectedSurname,
      selectedVehicle,
      selectedTelephone,
      selectedAddress,
      selectedReturn,
      currentDeliveryNumber
    );
    displayDeliveries.push(newDelivery);
    currentDeliveries.push(newDelivery);
    currentDeliveryNumber++;
    displayDelivery(newDelivery);
    vehicleBtn.innerHTML = "Select:";
    inputName.value = "";
    inputSurname.value = "";
    inputTelephone.value = "";
    inputAddress.value = "";
    inputReturn.value = "";
  } else {
    alert("The delivery info is not of correct type. Try again.");
  }
  currentDeliveries = [];
}

$("#add-btn").click(addDelivery);

// Display delivery functionality

const deliveryTable = document.getElementById("delivery-table");
const deliveryTbody = deliveryTable.getElementsByTagName("tbody")[0];
let deliveryRowSuffix = "deliveryRow-";
let deliveryRowNumber = 0;

function displayDelivery(deliveryObject) {
  currentDeliveries.forEach(() => {
    let newDeliveryRow = deliveryTbody.insertRow();
    let newDeliveryCell1 = newDeliveryRow.insertCell();
    newDeliveryCell1.innerHTML = deliveryObject.vehicle;
    let newDeliveryCell2 = newDeliveryRow.insertCell();
    newDeliveryCell2.textContent = deliveryObject.name;
    let newDeliveryCell3 = newDeliveryRow.insertCell();
    newDeliveryCell3.textContent = deliveryObject.surName;
    let newDeliveryCell4 = newDeliveryRow.insertCell();
    newDeliveryCell4.textContent = deliveryObject.telephone;
    let newDeliveryCell5 = newDeliveryRow.insertCell();
    newDeliveryCell5.textContent = deliveryObject.deliveryAddress;
    let newDeliveryCell6 = newDeliveryRow.insertCell();
    newDeliveryCell6.textContent = deliveryObject.returnTime;
    newDeliveryRow.id = `${deliveryRowSuffix}${deliveryRowNumber}`;
    newDeliveryRow.classList.add("deliveryRow");
    deliveryObject.timerID = setInterval(
      countDownDeliveryTimer.bind(deliveryObject),
      1000
    );
    deliveryRowNumber++;
    newDeliveryRow.addEventListener("click", function () {
      $(this).toggleClass("selected-Delivery");
    });
  });
}

$("#clear-btn").click(function () {
  let confirmAction = confirm(
    "Are you shure you want do delete this delivery?"
  );
  if (confirmAction) {
    let selectedRow = document.getElementsByClassName("selected-Delivery");
    let id = selectedRow[0].id;
    let number = parseInt(id.slice(-1));
    displayDeliveries[number].endTimer();
    $(".selected-Delivery").closest("tr").remove();
  } else {
    $(".selected-Delivery").toggleClass("selected-Delivery");
    return;
  }
});

let deliveriesPastTime = [];

function countDownDeliveryTimer() {
  for (i = 0; i < displayDeliveries.length; i++) {
    displayDeliveries[i].calculateTime();
  }
}

function uppdateDeliveryToast(number, vehicle, name, time) {
  let toastContainer = document.getElementById("toast-container");
  let newDeliveryDiv = document.createElement("div");
  newDeliveryDiv.innerHTML = `<div id="liveDeliveryToast-${number}" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="me-auto">Reception Management Dashboard</strong>
    <small>One second ago</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    <div>
      <p id="toast-header">A delivery-driver has not returned on time!</p>
      <h2>${vehicle}</h2>
    </div>
    <p id="toast-name">Name: ${name}</p>
    <p id="toast-time-away">Expected return was: ${time}</p>
    <button id="toast-btn" class="btn btn-primary">Request return</button>
    <button id="toast-btn" class="btn btn-primary">
      Request uppdate
    </button>
  </div>
</div>`;
  toastContainer.appendChild(newDeliveryDiv);
}
