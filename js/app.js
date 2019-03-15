'use strict';
function showAboutUs() {
    document.getElementById("specials").style.display="none";
    document.getElementById("hours").style.display="none";
    document.getElementById("location").style.display="none";
    document.getElementById('contactus').style.display = "none";
    document.getElementById('aboutus').style.display = "block";
 }

 function showLocations() {
    document.getElementById("specials").style.display="none";
    document.getElementById("hours").style.display="none";
    document.getElementById("aboutus").style.display="none";
    document.getElementById('contactus').style.display = "none";
        document.getElementById('location').style.display = "block";
 }

 function showHours() {
    document.getElementById("specials").style.display="none";
    document.getElementById("location").style.display="none";
    document.getElementById('aboutus').style.display = "none";
    document.getElementById('contactus').style.display = "none";
    document.getElementById('hours').style.display = "block";
 }

 function showSpecials() {
    document.getElementById("hours").style.display="none";
    document.getElementById("location").style.display="none";
    document.getElementById('aboutus').style.display = "none";
    document.getElementById('contactus').style.display = "none";
    document.getElementById('specials').style.display = "block";
 }

 function showContactUs() {     
    document.getElementById("hours").style.display="none";
    document.getElementById("location").style.display="none";
    document.getElementById('aboutus').style.display = "none";
    document.getElementById('specials').style.display = "none";
    document.getElementById('contactus').style.display = "block";
 }

 var hours = ['6:00AM', '7:00AM', '8:00AM', '9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM'];
var pikeCookieListId = 'hourlycookie-list-pike';
var seaTacCookieListId = 'hourlycookie-list-seatac';
var seattleCenterCookieListId = 'hourlycookie-list-seattle-center';
var capitolHillCookieListId = 'hourlycookie-list-capitol-hill';
var alkiCookieListId = 'hourlycookie-list-alki';
var locations = [];
var headerData = [];


var tableHeaderId = document.getElementById('headerHours');
var tableBodyId = document.getElementById('cookieContents');

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

var pikeSales = new SalesProjector('pike', 23, 65, 6.3);
var seaTac = new SalesProjector('seaTac', 3, 24, 1.2);
var seattleCenter = new SalesProjector('seattleCenter', 11, 38, 3.7);
var capitolHill = new SalesProjector('capitolHill', 20, 38, 2.3);
var alki = new SalesProjector('alki', 2, 16, 4.6);

locations.push(pikeSales, seaTac, seattleCenter, capitolHill, alki);


writeHeaderRow(hours);
var grandTotalContent = writeBodyRow(locations);
writeTotalRow(locations);
//alert(rowHeaderContent);


function writeHeaderRow(arr) {
    var headerRow = document.createElement('tr');
    var headerContent ='<td>' + '</td>';
    for (var i=0; i < arr.length; i++) {     
        headerContent = headerContent + '<td>' + arr[i]+ '</td>' 
        
    }  
    headerContent = headerContent +  '<td> Daily Location Total </td>' ;
    headerRow.innerHTML = headerContent
    tableHeaderId.appendChild(headerRow);
  }

  function writeBodyRow(arr) {    
    var grandTotal = 0;
    var grandTotalContent = 0;
    for (var i=0; i < arr.length; i++) {
        var bodyData = [];        
          for (var j=0; j < arr[i].cookiesList().length; j++) {
            if(j===0) {
                bodyData.push('<td>' + arr[i].locationName + '</td>')
            }
            var tempCookieCount = arr[i].cookiesList()[j];           
            bodyData.push(
                '<td>' + tempCookieCount + '</td>'
                )
          } 
          var tempTotal = arr[i].totalCookiesPerDay();
          grandTotal = grandTotal + tempTotal;
          bodyData.push('<td>' + tempTotal + '</td>' );                 
          render(bodyData, tableBodyId);
    }
    
    grandTotalContent = '<td>' + grandTotal + '</td>';         
     return grandTotalContent;    
  }

  function writeTotalRow(arr) {
    var totalRow = document.createElement('tr');
   
    var totalContent ='<td>' +'Totals'+ '</td>';
    var first = arr[0].cookiesList()[0];
    var second = arr[1].cookiesList()[0];
    var third = arr[2].cookiesList()[0];
    var fourth = arr[3].cookiesList()[0];
    var fifth = arr[4].cookiesList()[0];
    //alert( first + second + third + fourth + fifth);

    for (var i=0; i < hours.length; i++) { 
        var cookieCount = 0;
        cookieCount = cookieCount + arr[0].cookiesList()[i] + 
                                    arr[1].cookiesList()[i] + 
                                    arr[2].cookiesList()[i] + 
                                    arr[3].cookiesList()[i] + 
                                    arr[4].cookiesList()[i]
        totalContent = totalContent + '<td>' + cookieCount + '</td>' 
        //alert(cookieCount)
    }   
    totalContent = totalContent + grandTotalContent;
    totalRow.innerHTML = totalContent;
    tableBodyId.appendChild(totalRow);

  }

  
  function render(tableRow, elementId) {      
    var bodyRow = document.createElement('tr');
    var bodyContent ='';
    for (var j=0; j < tableRow.length; j++) { 
        bodyContent = bodyContent +  tableRow[j];        
    }
    bodyRow.innerHTML = bodyContent;
    elementId.appendChild(bodyRow);
  }


