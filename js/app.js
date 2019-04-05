'use strict';
function showAboutUs() {
  document.getElementById("specials").style.display="none";
  document.getElementById("hours").style.display="none";
  document.getElementById("location").style.display="none";
  document.getElementById('contactus').style.display = "none";
  document.getElementById("feedback").style.display="none";
  document.getElementById('aboutus').style.display = "block";
}

function showLocations() {
  document.getElementById("specials").style.display="none";
  document.getElementById("hours").style.display="none";
  document.getElementById("aboutus").style.display="none";
  document.getElementById('contactus').style.display = "none";
  document.getElementById("feedback").style.display="none";
      document.getElementById('location').style.display = "block";
}

function showHours() {
  document.getElementById("specials").style.display="none";
  document.getElementById("location").style.display="none";
  document.getElementById('aboutus').style.display = "none";
  document.getElementById('contactus').style.display = "none";
  document.getElementById("feedback").style.display="none";
  document.getElementById('hours').style.display = "block";
}

function showSpecials() {
  document.getElementById("hours").style.display="none";
  document.getElementById("location").style.display="none";
  document.getElementById('aboutus').style.display = "none";
  document.getElementById('contactus').style.display = "none";
  document.getElementById("feedback").style.display="none";
  document.getElementById('specials').style.display = "block";
}

function showContactUs() {     
  document.getElementById("hours").style.display="none";
  document.getElementById("location").style.display="none";
  document.getElementById('aboutus').style.display = "none";
  document.getElementById('specials').style.display = "none";
  document.getElementById("feedback").style.display="none";
  document.getElementById('contactus').style.display = "block";
}

function showfeedback()
{
  event.preventDefault();
  var contactFormId = document.getElementById('contact_form');
  contactFormId.reset();
  document.getElementById('contactus').style.display = "block";
  document.getElementById("feedback").style.display="block";
}
var hours = ['6:00AM', '7:00AM', '8:00AM', '9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'];
var formId = document.getElementById('sales_form');
var locations = [];
locations.push(new SalesProjector('Alki', 8, 15, 2.1));

var bodyData = '';
var headerRowId = document.getElementById('headerContents');
var tableBodyId = document.getElementById('cookieContents');
var totalRowId = document.getElementById('totalContents');
var headerRow = document.createElement('tr');
var tableRow = document.createElement('tr');

function SalesProjector(locationName, minimumHourlyCustomer, maximumHourlyCustomer, averageCookiesPerCustomer) {
  this.locationName = locationName;
  this.minimumHourlyCustomer = minimumHourlyCustomer;
  this.maximumHourlyCustomer = maximumHourlyCustomer;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookiesPerDay = 0;
}

SalesProjector.prototype.calCustomersPerHour = function () {
  for (var i = 0; i < hours.length; i++) {
    var min = Math.ceil(this.minimumHourlyCustomer);
    var max = Math.floor(this.maximumHourlyCustomer);
    this.customersPerHour.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
};

SalesProjector.prototype.calCookiesPerHour = function () {
  this.calCustomersPerHour();
  for (var i = 0; i < hours.length; i++) {
    var hourlyCookie = Math.floor(this.customersPerHour[i] * this.averageCookiesPerCustomer);
    this.cookiesPerHour.push(hourlyCookie);
    this.totalCookiesPerDay += hourlyCookie;
  }
};


function formData(event) {
  event.preventDefault();

  var locationName = event.target.lname.value;
  var minCustomer = event.target.mincustomer.value;
  var maxCustomer = event.target.maxcustomer.value;
  var avgCookieCount = event.target.avgcookiecount.value;

  locations.push(new SalesProjector(locationName, minCustomer, maxCustomer, avgCookieCount));
  
  writeBodyRow();
  formId.reset();
}

function writeBodyRow() {
  var grandTotal = 0;

  for (var i = 0; i < locations.length; i++) {
    if (locations.length === 1 || (locations.length > 1 && i === locations.length - 1)) {

      locations[i].calCookiesPerHour();
      for (var j = 0; j < hours.length; j++) {
        if (j === 0) {
          bodyData = bodyData + '<td>' + locations[i].locationName + '</td>';
        }
        var tempCookieCount = locations[i].cookiesPerHour[j];
        bodyData = bodyData + '<td>' + tempCookieCount + '</td>';
      }
      var tempTotal = locations[i].totalCookiesPerDay;
      grandTotal = grandTotal + tempTotal;
      bodyData = bodyData + '<td>' + tempTotal + '</td>';
      render();
      bodyData = '';
    }
    writeFooterRow();
  }
}

function writeFooterRow() {
  if (locations.length > 1) {
    var grandTotalCookies = 0;
    var totalContent = '';
    totalContent = '<td>' + 'Totals' + '</td>';

    for (var i = 0; i < hours.length; i++) {
      var cookieCount = 0;
      for (var j = 0; j < locations.length; j++) {
        cookieCount = cookieCount + locations[j].cookiesPerHour[i];
      }
      grandTotalCookies = grandTotalCookies + cookieCount;
      totalContent = totalContent + '<td>' + cookieCount + '</td>';
    }
    totalContent = totalContent + '<td>' + grandTotalCookies + '</td>';
    tableRow.innerHTML = totalContent;
    totalRowId.appendChild(tableRow);
  }
}

function writeHeaderRow() {
  var headerContent = '';
  headerContent = '<td> </td>';
  for (var i = 0; i < hours.length; i++) {
    headerContent = headerContent + '<td>' + hours[i] + '</td>';
  }
  headerContent = headerContent + '<td> Daily Cookies Count</td>';
  headerRow.innerHTML = headerContent;
  headerRowId.appendChild(headerRow);
}

function render() {
  var bodyRow = document.createElement('tr');
  bodyRow.innerHTML = bodyData;
  tableBodyId.appendChild(bodyRow);

}

writeHeaderRow();
writeBodyRow();
formId.addEventListener('submit', formData);
