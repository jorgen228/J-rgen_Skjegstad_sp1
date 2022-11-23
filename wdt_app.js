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
function displayStaffMembers(staffObject) {
  let newRow = employeeTbody.insertRow();
  let newCell1 = newRow.insertCell();
  newCell1.innerHTML = `<img src="${staffObject.picture}">`;
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
}

let numberOfEmplyees = [1, 2, 3, 4, 5];

function staffUserGet() {
  numberOfEmplyees.forEach((i) => {
    $.ajax({
      url: "https://randomuser.me/api/",
      dataType: "json",
      success: function (data) {
        let staffPicture = data.results[0].picture.thumbnail;
        let staffName = data.results[0].name.first;
        let staffSurName = data.results[0].name.last;
        let staffEmail = data.results[0].email;

        let newStaff = new StaffMember(
          staffName,
          staffSurName,
          staffPicture,
          staffEmail,
          "In",
          "",
          "",
          ""
        );
        displayStaffMembers(newStaff);
      },
    });
  });
}

staffUserGet();

// Staff check out functionality


