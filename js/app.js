'use strict';

var hours = ['6:00AM', '7:00AM', '8:00AM', '9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'];

var locations = [];
var bodyData = '';
var formId = document.getElementById('sales_form');
var tableBodyId = document.getElementById('cookieContents');
var totalRowId = document.getElementById('totalContents');
var totalRow = document.createElement('tr');

function SalesProjector(locationName, minimumHourlyCustomer, maximumHourlyCustomer, averageCookiesPerCustomer) {
  this.locationName = locationName;
  this.minimumHourlyCustomer = minimumHourlyCustomer;
  this.maximumHourlyCustomer = maximumHourlyCustomer;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
}

SalesProjector.prototype.customersPerHour = function () {
  var min = Math.ceil(this.minimumHourlyCustomer);
  var max = Math.floor(this.maximumHourlyCustomer);
  return Math.floor(Math.random() * (max - min)) + min;
};

SalesProjector.prototype.cookiesList = function () {
  var hourlyCookiesList = [];
  for (var i = 0; i < hours.length; i++) {
    var hourlyCookie = Math.floor(this.customersPerHour() * this.averageCookiesPerCustomer);
    hourlyCookiesList.push(hourlyCookie);
  }
  return hourlyCookiesList;
};

SalesProjector.prototype.totalCookiesPerDay = function () {
  var cookiesCount = 0;
  for (var i = 0; i < this.cookiesList().length; i++) {
    cookiesCount = cookiesCount + this.cookiesList()[i];
  }
  return cookiesCount;
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
      for (var j = 0; j < hours.length; j++) {
        if (j === 0) {

          bodyData = bodyData + '<td>' + locations[i].locationName + '</td>';
        }
        var tempCookieCount = locations[i].cookiesList()[j];
        bodyData = bodyData + '<td>' + tempCookieCount + '</td>';
      }
      var tempTotal = locations[i].totalCookiesPerDay();
      grandTotal = grandTotal + tempTotal;
      bodyData = bodyData + '<td>' + tempTotal + '</td>';
      render();
      bodyData = '';
    }
    writeFooterRow();
  }
}

function writeFooterRow() {
  var grandTotalCookies = 0;
  var totalContent = '';
  totalContent = '<td>' + 'Totals' + '</td>';

  for (var i = 0; i < hours.length; i++) {
    var cookieCount = 0;
    for (var j = 0; j < locations.length; j++) {
      cookieCount = cookieCount + locations[j].cookiesList()[i];
    }
    grandTotalCookies = grandTotalCookies + cookieCount;
    totalContent = totalContent + '<td>' + cookieCount + '</td>';
  }
  totalContent = totalContent + '<td>' + grandTotalCookies + '</td>';
  totalRow.innerHTML = totalContent;
  totalRowId.appendChild(totalRow);
}

function render() {
  var bodyRow = document.createElement('tr');
  bodyRow.innerHTML = bodyData;
  tableBodyId.appendChild(bodyRow);

}


formId.addEventListener('submit', formData);
