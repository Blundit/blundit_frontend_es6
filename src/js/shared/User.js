//TODO: Implement this in Store.js
let UserStore,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

class UserStore {
  constructor(props) {
    super(props);

    let data = {};
    let votes = [];
    let subscribers = 0;
    let changeEvent = 'blundir:user';
    let fetchMessagesTimeout = null;
    let lastMessagesFetch = null;
    let messagesTtl = 60000;
  }


  loggedIn () {
    if (this.data && this.data.token != null) { return true; }
    return false;
  }

  UserStore.prototype.dequeueMessagesFetch = function() {
    clearTimeout(this.fetchMessagesTimeout);
    return this.fetchMessagesTimeout = null;
  };

  UserStore.prototype.subscribe = function(callback) {
    addEventListener(this.changeEvent, callback, false);
    this.subscribers++;
    if (this.data != null) {
      return this.emitChange();
    }
  };

  UserStore.prototype.unsubscribe = function(callback) {
    removeEventListener(this.changeEvent, callback);
    this.subscribers--;
    if (!(this.subscribers > 0)) {
      return this.dequeueMessagesFetch();
    }
  };

  UserStore.prototype.emitChange = function() {
    let event;
    event = document.createEvent('Event');
    event.initEvent(this.changeEvent, true, true);
    return dispatchEvent(event);
  };

  UserStore.prototype.updateUserData = function(data) {
    this.data.first_name = data.first_name;
    this.data.last_name = data.last_name;
    this.data.email = data.email;
    this.data.notification_frequency = data.notification_frequency;
    this.data.avatar_file_name = data.avatar_file_name;
    return this.emitChange();
  };

  UserStore.prototype.set = function(data, request) {
    this.data = data;
    if (request != null) {
      this.data.token = request.getResponseHeader('Access-Token');
      this.data.uid = request.getResponseHeader('Uid');
      this.data.client = request.getResponseHeader('Client');
    }
    return this.emitChange();
  };

  UserStore.prototype.logout = function() {
    let params = {
      path: "logout",
      success: this.logoutSuccess,
      error: this.logoutError
    };

    API.c(params)
  };

  UserStore.prototype.logoutSuccess = function() {};

  UserStore.prototype.logoutError = function() {};

  UserStore.prototype.setToken = function(token) {
    return this.data.token = token;
  };

  UserStore.getAuthHeader = function() {
    this.user = this.get();
    if ((this.user != null) && (this.user.token != null)) {
      return {
        "Access-Token": this.user.token,
        "Token-Type": "Bearer",
        "Client": this.user.client,
        "Uid": this.user.uid
      };
    } else {
      return {};
    }
  };

  UserStore.prototype.getAuthHeader = function() {
    this.user = this.get();
    if ((this.user != null) && (this.user.token != null)) {
      return {
        "Access-Token": this.user.token,
        "Token-Type": "Bearer",
        "Client": this.user.client,
        "Uid": this.user.uid
      };
    } else {
      return {};
    }
  };

  UserStore.prototype.setUserProfile = function(data) {
    this.data.profile = data;
    return this.emitChange();
  };

  UserStore.prototype.doQueueMessages = function() {
    if (this.subscribers > 0) {
      return this.queueMessagesFetch();
    } else {
      return this.dequeueMessagesFetch();
    }
  };

  UserStore.get = function() {
    return UserStore.data;
  };

  UserStore.prototype.get = function() {
    return this.data;
  };

  UserStore.prototype.updateHeaderInfo = function(request) {
    if (request.getResponseHeader('Access-Token') == null) {
      return;
    }
    this.token = request.getResponseHeader('Access-Token');
    this.uid = request.getResponseHeader('Uid');
    this.client = request.getResponseHeader('Client');
    window.global.setCookie('Access-Token', this.token);
    window.global.setCookie('Uid', this.uid);
    window.global.setCookie('Client', this.client);
    this.user = this.get();
    this.user.token = this.token;
    this.user.uid = this.uid;
    return this.user.client = this.client;
  };

  UserStore.prototype.getUserAvatar = function() {
    let params = {
      path: "get_avatar",
      success: this.getUserAvatarSuccess,
      error: this.getUserAvatarError
    };
    
    API.c(params)
  };

  UserStore.prototype.getUserAvatarSuccess = function(data) {
    this.data.avatar_file_name = data.avatar;
    return this.emitChange();
  };

  UserStore.prototype.getUserAvatarError = function(error) {};

  return UserStore;

})();

}

  
export default new UserStore({messagestl: 1000 * 60});
