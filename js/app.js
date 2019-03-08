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

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var pikeCookieListId = 'hourlycookie-list-pike';
var seaTacCookieListId = 'hourlycookie-list-seatac';
var seattleCenterCookieListId = 'hourlycookie-list-seattle-center';
var capitolHillCookieListId = 'hourlycookie-list-capitol-hill';
var alkiCookieListId = 'hourlycookie-list-alki';

var pike = {    
    hourlyCookiesList : [],
    totalCookiesCount : 0,
    minimumHourlyCustomer: 23,
    maximumHourlyCustomer: 65,
    averageCookiesPerCustomer: 6.3,  
    customersPerHour: function () {        
        var min = Math.ceil(pike.minimumHourlyCustomer);
        var max = Math.floor(pike.maximumHourlyCustomer);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    cookiesList: function () {        
    for (var i = 0; i < hours.length; i++) {    
    var hourlyCookie = Math.floor(pike.customersPerHour() * pike.averageCookiesPerCustomer);    
    pike.hourlyCookiesList.push(hourlyCookie);
    }    
    return pike.hourlyCookiesList;       
        
    },
    totalCookiesPerDay: function () {           
        return getTotalCount(pike.cookiesList());
    }    
};

var seaTac = {    
    hourlyCookiesList : [],
    totalCookiesCount : 0,
    minimumHourlyCustomer: 3,
    maximumHourlyCustomer: 24,
    averageCookiesPerCustomer: 1.2,  
    customersPerHour: function () {        
        var min = Math.ceil(seaTac.minimumHourlyCustomer);
        var max = Math.floor(seaTac.maximumHourlyCustomer);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    cookiesList: function () {        
    for (var i = 0; i < hours.length; i++) {    
    var hourlyCookie = Math.floor(seaTac.customersPerHour() * seaTac.averageCookiesPerCustomer);    
    seaTac.hourlyCookiesList.push(hourlyCookie);
    }    
    return seaTac.hourlyCookiesList;       
        
    },
    totalCookiesPerDay: function () {           
        return getTotalCount(seaTac.cookiesList());
    }    
};

var seattleCenter = {    
    hourlyCookiesList : [],
    totalCookiesCount : 0,
    minimumHourlyCustomer: 11,
    maximumHourlyCustomer: 38,
    averageCookiesPerCustomer: 3.7,  
    customersPerHour: function () {        
        var min = Math.ceil(seattleCenter.minimumHourlyCustomer);
        var max = Math.floor(seattleCenter.maximumHourlyCustomer);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    cookiesList: function () {        
    for (var i = 0; i < hours.length; i++) {    
    var hourlyCookie = Math.floor(seattleCenter.customersPerHour() * seattleCenter.averageCookiesPerCustomer);    
    seattleCenter.hourlyCookiesList.push(hourlyCookie);
    }    
    return seattleCenter.hourlyCookiesList;       
        
    },
    totalCookiesPerDay: function () {           
        return getTotalCount(seattleCenter.cookiesList());
    }    
};

var capitolHill = {    
    hourlyCookiesList : [],
    totalCookiesCount : 0,
    minimumHourlyCustomer: 20,
    maximumHourlyCustomer: 38,
    averageCookiesPerCustomer: 2.3,   
    customersPerHour: function () {        
        var min = Math.ceil(capitolHill.minimumHourlyCustomer);
        var max = Math.floor(capitolHill.maximumHourlyCustomer);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    cookiesList: function () {        
    for (var i = 0; i < hours.length; i++) {    
    var hourlyCookie = Math.floor(capitolHill.customersPerHour() * capitolHill.averageCookiesPerCustomer);    
    capitolHill.hourlyCookiesList.push(hourlyCookie);
    }    
    return capitolHill.hourlyCookiesList;       
        
    },
    totalCookiesPerDay: function () {           
        return getTotalCount(capitolHill.cookiesList());
    }    
};

var alki = {    
    hourlyCookiesList : [],
    totalCookiesCount : 0,
    minimumHourlyCustomer: 2,
    maximumHourlyCustomer: 16,
    averageCookiesPerCustomer: 4.6,  
    customersPerHour: function () {        
        var min = Math.ceil(alki.minimumHourlyCustomer);
        var max = Math.floor(alki.maximumHourlyCustomer);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    cookiesList: function () {        
    for (var i = 0; i < hours.length; i++) {    
    var hourlyCookie = Math.floor(alki.customersPerHour() * alki.averageCookiesPerCustomer);    
    alki.hourlyCookiesList.push(hourlyCookie);
    }    
    return alki.hourlyCookiesList;       
        
    },
    totalCookiesPerDay: function () {           
        return getTotalCount(alki.cookiesList());
    }    
};

function getTotalCount(cookiesList) {
    var cookiesCount = 0;    
    for (var i = 0; i < cookiesList.length; i++) {                            
        cookiesCount = cookiesCount + cookiesList[i];
        }
        return cookiesCount;
}

generateSalesProjectionLists(pike, pikeCookieListId);
generateSalesProjectionLists(seaTac, seaTacCookieListId);
generateSalesProjectionLists(seattleCenter, seattleCenterCookieListId);
generateSalesProjectionLists(capitolHill, capitolHillCookieListId);
generateSalesProjectionLists(alki, alkiCookieListId);

function generateSalesProjectionLists(locationObj, documentId) {    
    var idList = document.getElementById(documentId);    
    var listTotalContent = 'Total : '+locationObj.totalCookiesPerDay()+' Cookies';
    for (var i = 0; i < hours.length; i++) {
        var listTextContent = '';
        listTextContent = hours[i] +' : '+ locationObj.cookiesList()[i] + ' Cookies';
        // 1. Create new element
        var liEl = document.createElement('li');
        // 2. Give the element some content
        liEl.textContent = listTextContent;
        // 3. Append the new element to its parent in the DOM
        idList.appendChild(liEl);    
    }
    liEl = document.createElement('li');
    liEl.textContent = listTotalContent;
    idList.appendChild(liEl);
}

