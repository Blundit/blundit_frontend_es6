class Sessions {
  constructor() {

  }

  setUser (data, request) {
    UserStore.set(data, request);
    this.user = UserStore.get();
    if ((this.user != null) && (this.user.token != null)) {
      window.global.setCookie('Access-Token', this.user.token);
      window.global.setCookie('Uid', this.user.uid);
      return window.global.setCookie('Client', this.user.client);
    } else {
      window.global.deleteCookie('Access-Token');
      window.global.deleteCookie('Uid');
      return window.global.deleteCookie('Client');
    }
  }


  getURLParameter (name, url) {
    let regex, results;
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


  verifyUserToken () {
    if (window.global.getCookie('Access-Token')) {
      return this.verifyToken();
    } else {
      return this.setState({
        verificationComplete: true
      });
    }
  }


  verifyToken () {
    let params = {
      path: "verify_token",
      path_variables: {
        accessToken: window.global.getCookie('Access-Token'),
        client: window.global.getCookie('Client'),
        uid: encodeURIComponent(window.global.getCookie('Uid'))
      },
      success: this.verifyTokenSuccess,
      error: this.verifyTokenError
    };
    API.c(params)
  }


  verifyTokenSuccess (data) {
    if (data.data) {
      data.data.token = window.global.getCookie('Access-Token');
      data.data.client = window.global.getCookie('Client');
      data.data.uid = window.global.getCookie('Uid');
      this.setUser(data.data);
      return UserStore.getUserAvatar();
    }
  }


  verifyTokenError (error) {
    return this.setUser({});
  }
};

export default Sessions;