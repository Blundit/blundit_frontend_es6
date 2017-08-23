class Utils {
  constructor() {

  }


  setCookie (name, value, days) {
    let date, expires;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    return document.cookie = name + "=" + value + expires + "; path=/";
  }


  getCookie (name) {
    let c, ca, i, nameEQ;
    nameEQ = name + "=";
    ca = document.cookie.split(";");
    i = 0;
    while (i < ca.length) {
      c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
      i++;
    }
    return null;
  }


  deleteCookie (name) {
    return this.setCookie(name, "", -1);
  };
  

  sentenceCase (text) {
    return text.replace(/\w\S*/g, function(text) {
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
  }
}

export default Utils;