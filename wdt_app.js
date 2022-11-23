/* Function displayTime
let today = new Date()
let day = today.day etc

getelement by id = time element
let element.innertext = `Backtick string`

call function with setinterval
 */

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

  clockElement.innerText = `${day} ${month} ${year} ${hour}:${minute}:${seconds}`
}

setInterval(displayTime, 1000);




