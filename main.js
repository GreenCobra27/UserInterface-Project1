console.log("My script for the Smart Object");

const store = [["Shirt", "$15.99", "A2"], ["Pants", "$20.00", "A3"], ["Dog Food", "$16.89", "B1"], ["Water", "$16.89", "C1"], ["Energy Drink", "$12.60", "C2"], ["Tomato Sauce", "$5.99", "D2"], ["Macaroni", "$4.57", "D3"]];

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  let ampm = "am";
  m = checkTime(m);
  s = checkTime(s);
  if (h>12){
    h=h-12;
    ampm = "pm";
  };
  document.getElementById('time').innerHTML =  h + ":" + m + ":" + s + " " + ampm;
  setTimeout(startTime, 1000);
};

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
};

function initMap() {
  const cincy = { lat: 39.103, lng: 84.512 };
  // The map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: cincy,
  });
  const marker = new google.maps.Marker({
    position: cincy,
    map: map,
  });
}

var items = [];
var cart = [];
var num = 0;
var total = 0;

function addItem() {
  let person = prompt ("Please add Item Name", "text");
  var found = 0;

  for (let j = 0; j < store.length; j++) {
    if (store[j][0] == person) {
      found = 1;
    }
  }

  if (found != 1) {
    alert("Sorry, item: \""+person+"\" is not carried in this store.")
    return;
  }

  for (let i = 0; i < items.length; i++) {
    if (items[i] == person && found == 0) {
      let check = prompt ("Item already on list. Add again? (yes or no)", "text");
      found = 1;
      if (check == "yes") {
        items.push(person);
        recommended(person);
      }
      else if (check == "no") {
        return;
      }
      break;
    }
  }

  items.push(person);
  recommended(person);

  document.getElementById("striker").insertAdjacentHTML('beforeend', '<li><input type=\"checkbox\" onclick="strike(this)" id=\"'+num+'\"></li>');
  document.getElementById("list").insertAdjacentHTML('beforeend', '<li id=\"'+num+'item\">'+person+'</li>');

  let added = 0;

  for (let j = 0; j < store.length; j++) {
    if (store[j][0] == person && added == 0) {
      document.getElementById("price").insertAdjacentHTML('beforeend', '<li id=\"'+num+'price\">'+store[j][1]+'</li>');
      document.getElementById("location").insertAdjacentHTML('beforeend', '<li id=\"'+num+'location\">'+store[j][2]+'</li>');
      added = 1;
      break;
    }
  }
  if (added == 0) {
    document.getElementById("price").insertAdjacentHTML('beforeend', '<li id=\"'+num+'price\">unknown</li>');
    document.getElementById("location").insertAdjacentHTML('beforeend', '<li id=\"'+num+'location\">unknown</li>');
  }

  num = num + 1;

}

function addItemImport(val) {
  var found = 0;
  let person = val;

  for (let j = 0; j < store.length; j++) {
    if (store[j][0] == person) {
      found = 1;
    }
  }

  if (found != 1) {
    alert("Sorry, item: \""+person+"\" is not carried in this store.")
    return;
  }

  items.push(person);
  recommended(person);

  document.getElementById("striker").insertAdjacentHTML('beforeend', '<li><input type=\"checkbox\" onclick="strike(this)" id=\"'+num+'\"></li>');
  document.getElementById("list").insertAdjacentHTML('beforeend', '<li id=\"'+num+'item\">'+person+'</li>');

  let added = 0;

  for (let j = 0; j < store.length; j++) {
    if (store[j][0] == person && added == 0) {
      document.getElementById("price").insertAdjacentHTML('beforeend', '<li id=\"'+num+'price\">'+store[j][1]+'</li>');
      document.getElementById("location").insertAdjacentHTML('beforeend', '<li class=\"'+num+'\" id=\"'+num+'location\">'+store[j][2]+'</li>');
      added = 1;
      break;
    }
  }
  if (added == 0) {
    document.getElementById("price").insertAdjacentHTML('beforeend', '<li id=\"'+num+'price\">unknown</li>');
    document.getElementById("location").insertAdjacentHTML('beforeend', '<li id=\"'+num+'location\">unknown</li>');
  }

  num = num + 1;

}

function clearList() {
  document.getElementById('striker').innerHTML = "";
  document.getElementById('list').innerHTML = "";
  document.getElementById('price').innerHTML = "";
  document.getElementById('location').innerHTML = "";
  fileInput.value = '';
  items = [];
  num = 0;
  localStorage.clear();
}

function strike(element) {
  var hold = document.getElementById(element.id+"item").innerHTML;
  var hold2 = document.getElementById(element.id+"price").innerHTML;
  var hold3 = document.getElementById(element.id+"location").innerHTML;

  if (hold.includes("<del>")) {
    hold = hold.replace("<del>", '');
    hold = hold.replace("</del>", '');
    document.getElementById(element.id+"item").innerHTML = hold;
    hold2 = hold2.replace("<del>", '');
    hold2 = hold2.replace("</del>", '');
    document.getElementById(element.id+"price").innerHTML = hold2;
    hold3 = hold3.replace("<del>", '');
    hold3 = hold3.replace("</del>", '');
    document.getElementById(element.id+"location").innerHTML = hold3;

    cart = removeItem(cart, hold);
    totalCalculator(0, element.id);
  }
  else {
    totalCalculator(1, element.id);
    cart.push(hold);

    document.getElementById(element.id+"item").innerHTML = '<del>' + hold + '</del>';
    document.getElementById(element.id+"price").innerHTML = '<del>' + hold2 + '</del>';
    document.getElementById(element.id+"location").innerHTML = '<del>' + hold3 + '</del>';
  }
}

function removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function totalCalculator(add, localNum) {
  var hold2 = document.getElementById(localNum+"price").innerHTML;
  if (add == 0) {
    var calcHold = hold2.replace("$", '');
    calcHold = Number(calcHold);
    var calcOrig = document.getElementById("total").innerHTML;
    calcOrig = Number(calcOrig);
    calcHold = calcOrig - calcHold;
    calcHold = Number(calcHold).toFixed(2)
    document.getElementById("total").innerHTML = calcHold;
  }
  else {
    var calcHold = hold2.replace("$", '');
    calcHold = Number(calcHold);
    var calcOrig = document.getElementById("total").innerHTML;
    calcOrig = Number(calcOrig);
    calcHold = calcHold + calcOrig;
    calcHold = Number(calcHold).toFixed(2)
    document.getElementById("total").innerHTML = calcHold;
  }
}

var checkoutHold = null;

function checkout() {
  checkoutHold = localStorage.getItem("payment");
  if (checkoutHold == null) {
    alert("Please select payment via companion app, then continue.");
  } else {
    alert("Total has been paid. Thank you for shopping with us!");
    localStorage.clear();
    window.location.href = "file:///C:/Users/alexa/OneDrive/Documents/College%20Notes/Semester%206%20-%20Fall%202022/UI/SmartObject_Miller/Main.html";
  }
}

function paid() {
  localStorage.setItem("payment", 1);
  alert("Thank you for paying!")
}

function checkoutPage() {
  console.log("Checkout");
  cart = JSON.parse(sessionStorage.getItem("jsArray"));
  for (let j = 0; j < cart.length; j++) {
    document.getElementById("list").insertAdjacentHTML('beforeend', '<li id=\"'+num+'item\">'+cart[j]+'</li>');
    for (let k = 0; k < store.length; k++) {
      if (store[k][0] == cart[j]) {
        document.getElementById("price").insertAdjacentHTML('beforeend', '<li id=\"'+num+'price\">'+store[k][1]+'</li>');
      }
    }
    totalCalculator(1, num);
    num = num + 1;
  }
}

function setItems() {
  console.log("set items");
  sessionStorage.setItem("jsArray", JSON.stringify(cart));
}

function mainLoad() {
  var lines = JSON.parse(localStorage.getItem("input"));
  console.log(lines);
  for (let i = 0; i < lines.length; i++){
      addItemImport(lines[i]);
  }
  localStorage.clear();
}

function recommended(item) {
  for (let i = 0; i < store.length; i++) {
    if (store[i][0] == item) {
      var location = store[i][2];
      break;
    }
  }

  var aisle = location.substr(0, 1);
  var recFound = 0;
  for (let i = 0; i < store.length; i++) {
    var recHold = store[i][2].substr(0, 1);
    if (recHold == aisle && store[i][0] != item && !items.includes(store[i][0])) {
      var rec = store[i][0];
      var recPrice = store[i][1];
      var recLoc = store[i][2];
      recFound = 1;
      break;
    }
  }

  if (recFound == 1) {
    document.getElementById('recommended').innerHTML = rec + " , " + recPrice + " , " + recLoc;
  } else {
    document.getElementById('recommended').innerHTML = "No Recommendations";
  }
}

function addRec() {
  var hold = document.getElementById('recommended').innerHTML;
  if (hold == "No Recommendations") {
    return;
  }
  const ar = hold.split(' ');
  var item = ar[0];
  addItemImport(item);
}

var fileInput = 'something';
if (document.getElementById('input')) {
  fileInput = document.getElementById('input');
}
fileInput.onchange = function() {
  if (document.title == "Smart Object Miller") {
    var selectedFile = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = function(){
      var content = reader.result;
      const lines = content.split('\r\n');
      for (let i = 0; i < lines.length; i++){
        addItemImport(lines[i]);
      }
    }
  } else if (document.title == "PhoneApp") {
    var selectedFile = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = function(){
      var content = reader.result;
      const lines = content.split('\r\n');
      localStorage.setItem("input", JSON.stringify(lines));
      console.log(localStorage);
    }
  }
}

window.initMap = initMap;

startTime();