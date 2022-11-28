// Clock functionality

const clockElement = document.getElementById("clock-element");

function displayTime() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let seconds = today.getSeconds();

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
    picture,
    email,
    status,
    outTime,
    duration,
    current,
    expectedReturnTime,
    timerID
  ) {
    super(name, surName);
    this.picture = picture;
    this.email = email;
    this.status = status;
    this.outTime = outTime;
    this.duration = duration;
    this.current = current;
    this.expectedReturnTime = expectedReturnTime;
  }
  staffMemberIsLate() {
    console.log(this);
    console.log("staffmember is late!");
  }
  estimateTime() {
    let targetHours = Math.floor(this.duration / 60 / 60);
    let targetMinutes = Math.floor((this.duration / 60) % 60);
    let targetSeconds = Math.floor(this.duration % 60);
    targetMinutes = targetMinutes < 10 ? "0" + targetMinutes : targetMinutes;
    targetSeconds = targetSeconds < 10 ? "0" + targetSeconds : targetSeconds;
    this.duration--;
    this.current = `${targetHours}:${targetMinutes}:${targetSeconds}`;
  }
  // countDownTime() {
  //   this.duration--;
  //   console.log(this.duration);
  //   currentObjects[i].estimateTime(currentObjects[i].duration);
  // }
  startCountDown() {
    this.timerID = setInterval(() => {
      this.estimateTime();
    }, 1000);
  }
  stopCountDown() {
    clearInterval(this.timerID);
  }
}
class DeliveryDriver extends Employee {
  constructor(name, surName, vehicle, telephone, deliveryAddress, returnTime) {
    super(name, surName);
    this.vehicle = vehicle;
    this.telephone = telephone;
    this.deliveryAddress = deliveryAddress;
    this.returnTime = returnTime;
  }
  deliveryDriverIsLate() {
    console.log(this);
    console.log("delivery driver is late!");
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
  newCell1.innerHTML = `<img class="staff-img unselected" id="img-${staffNumber}" onclick="getObject${staffNumber}()" src="${staffObject.picture}">`;
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
      },
    });
  });
}

staffUserGet();

// Staff check out functionality

currentObjects = [];

function getObject1() {
  currentObjects.push(staffArray[0]);
  selectedStaff = 0;
  staffNumber = 1;
}
function getObject2() {
  currentObjects.push(staffArray[1]);
  selectedStaff = 1;
  staffNumber = 2;
}
function getObject3() {
  currentObjects.push(staffArray[2]);
  selectedStaff = 2;
  staffNumber = 3;
}
function getObject4() {
  currentObjects.push(staffArray[3]);
  selectedStaff = 3;
  staffNumber = 4;
}
function getObject5() {
  currentObjects.push(staffArray[4]);
  selectedStaff = 4;
  staffNumber = 5;
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      $(".staff-img").click(function () {
        $(this).toggleClass("selected");
        $(this).toggleClass("unselected");
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
  for (i = 0; i < currentObjects.length; i++) {
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
    currentObjects[i].expectedReturnTime = returnString;
    currentObjects[i].duration = Math.floor(minutesAway * 60);

    currentObjects[i].estimateTime();
    currentObjects[i].timerID = setInterval(currentObjects[i].startCountDown, 1000)
  }

  $(".selected").toggleClass("unselected");
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
        console.log(staffArray[i].duration);
        staffArray[i].estimateTime();
        rowArray[i].childNodes[6].textContent = staffArray[i].current;
      } else {
        return;
      }
    }
  }
}

function staffIn() {
  for (i = 0; i < currentObjects.length; i++) {
    currentObjects[i].status = "Out";
    currentObjects[i].status = "In";
    currentObjects[i].outTime = "__";
    currentObjects[i].duration = 0;
    currentObjects[i].current = `00:00:00`;
    currentObjects[i].expectedReturnTime = "__";
  }

  $(".selected").toggleClass("unselected");
  $(".selected").toggleClass("selected");
  // clearInterval();

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
