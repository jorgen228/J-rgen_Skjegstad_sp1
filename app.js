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
    expectedReturnTime
  ) {
    super(name, surName);
    this.picture = picture;
    this.email = email;
    this.status = status;
    this.outTime = outTime;
    this.duration = duration;
    this.expectedReturnTime = expectedReturnTime;
  }
  staffMemberIsLate() {
    console.log("staffmember is late!");
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
    console.log("delivery driver is late!");
  }
}

// Display Staff functionality

const employeeTable = document.getElementById("employee-table");
const employeeTbody = employeeTable.getElementsByTagName("tbody")[0];
let staffNumber = 1;
let rowArray = [];

function displayStaffMembers(staffObject) {
  let newRow = employeeTbody.insertRow();
  let newCell1 = newRow.insertCell();
  newCell1.innerHTML = `<img class="staff-img unselected" id="${staffNumber}" src="${staffObject.picture}">`;
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
  newCell7.textContent = staffObject.duration;
  let newCell8 = newRow.insertCell();
  newCell8.textContent = staffObject.expectedReturnTime;
  rowArray.push(newRow);
  staffNumber++;
}

let numberOfEmplyees = [1, 2, 3, 4, 5];
let staffArray = [];

function staffUserGet() {
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      let staffPicture = data.results[0].picture.thumbnail;
      let staffName = data.results[0].name.first;
      let staffSurName = data.results[0].name.last;
      let staffEmail = data.results[0].email;
      let newStaff1 = new StaffMember(
        staffName,
        staffSurName,
        staffPicture,
        staffEmail,
        "In",
        "",
        "",
        ""
      );
      displayStaffMembers(newStaff1);
    },
  });
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      let staffPicture = data.results[0].picture.thumbnail;
      let staffName = data.results[0].name.first;
      let staffSurName = data.results[0].name.last;
      let staffEmail = data.results[0].email;
      let newStaff2 = new StaffMember(
        staffName,
        staffSurName,
        staffPicture,
        staffEmail,
        "In",
        "",
        "",
        ""
      );
      displayStaffMembers(newStaff2);
    },
  });
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      let staffPicture = data.results[0].picture.thumbnail;
      let staffName = data.results[0].name.first;
      let staffSurName = data.results[0].name.last;
      let staffEmail = data.results[0].email;
      let newStaff3 = new StaffMember(
        staffName,
        staffSurName,
        staffPicture,
        staffEmail,
        "In",
        "",
        "",
        ""
      );
      displayStaffMembers(newStaff3);
    },
  });
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      let staffPicture = data.results[0].picture.thumbnail;
      let staffName = data.results[0].name.first;
      let staffSurName = data.results[0].name.last;
      let staffEmail = data.results[0].email;
      let newStaff4 = new StaffMember(
        staffName,
        staffSurName,
        staffPicture,
        staffEmail,
        "In",
        "",
        "",
        ""
      );
      displayStaffMembers(newStaff4);
    },
  });
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    success: function (data) {
      let staffPicture = data.results[0].picture.thumbnail;
      let staffName = data.results[0].name.first;
      let staffSurName = data.results[0].name.last;
      let staffEmail = data.results[0].email;
      let newStaff5 = new StaffMember(
        staffName,
        staffSurName,
        staffPicture,
        staffEmail,
        "In",
        "",
        "",
        ""
      );
      displayStaffMembers(newStaff5);
    },
  });
}

// displayStaffMembers(newStaff);
// staffArray.push(newStaff);

function updateStaff() {}

staffUserGet();

// Staff check out functionality

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
  let selectedStaff = parseInt(
    prompt("Wich employee do you wish to clock out? Between 1 and 5")
  );
  selectedStaff -= 1;
  staffArray[selectedStaff].status = "Out";
  rowArray[selectedStaff].childNodes[4].textContent =
    staffArray[selectedStaff].status;

  let timeAway = prompt("For how long will they be gone in minutes?");
  rowArray[selectedStaff].childNodes[5].textContent = `${timeAway} min`;
  if (timeAway >= 60) {
    rowArray[selectedStaff].childNodes[5].textContent =
      Math.floor(timeAway / 60) + " hours";
  }
}

function staffIn() {
  console.log("in");
  let selectedStaff = parseInt(
    prompt("Wich employee do you wish to clock in? Between 1 and 5")
  );
}
