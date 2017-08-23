class Dates {
  constructor() {

  }

  
  formatDate (d) {
    let date, day, monthIndex, monthNames, suffix, year;
    
    date = new Date(d);
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    day = date.getDate();
    monthIndex = date.getMonth();
    year = date.getFullYear();

    if (day === 1 || day === 11 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 12 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 13 || day === 23) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }

    return monthNames[monthIndex] + ' ' + day + suffix + ', ' + year;
  }


  formatDateAndTime (d) {
    let ampm, date, day, hours, minutes, monthIndex, monthNames, suffix, year;
    date = new Date(d);
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    day = date.getDate();
    monthIndex = date.getMonth();
    year = date.getFullYear();
    hours = date.getHours();
    ampm = "AM";

    if (hours >= 12) {
      hours -= 12;
      ampm = "PM";
    }

    if (hours === 0) {
      hours = 12;
    }

    minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (day === 1 || day === 11 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 12 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 13 || day === 23) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }
    
    return monthNames[monthIndex] + ' ' + day + suffix + ', ' + year + ' at ' + hours + ':' + minutes + ' ' + ampm;
  }
}

export default Dates;
