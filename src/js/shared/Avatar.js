class Avatar {
  constructor() {

  }
  

  getExpertAvatar (expert) {
    if ((expert.avatar != null) && expert.avatar.indexOf("http:", 0) > -1) {
      return expert.avatar;
    }

    return (API.serverBase()) + "images/expert_avatars/default.png";
  }


  getClaimAvatar (claim) {
    if ((claim.pic != null) && claim.pic.indexOf("http:", 0) > -1) {
      return claim.pic;
    }
    
    return (API.serverBase()) + "images/claim_avatars/default.jpg";
  }


  getPredictionAvatar (prediction) {
    if ((prediction.pic != null) && prediction.pic.indexOf("http:", 0) > -1) {
      return prediction.pic;
    }
    
    return (API.serverBase()) + "images/prediction_avatars/default.jpg";
  }


  getUserAvatar (user) {
    if (user.avatar != null) {
      return user.avatar;
    } else if (user.avatar_url != null) {
      return user.avatar_url;
    } else if (user.avatar_file_name != null) {
      return user.avatar_file_name;
    } else {
      return (API.serverBase()) + "images/user_avatars/default.png";
    }
  }
};

export default Avatar;