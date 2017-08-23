// TODO: IMPORT Navigate stuff here.

class Links {
  claim = id => navigate("/claims/" + id);

  newClaim = () => navigate('/claims/new');

  expert = id => navigate("/experts/" + id);
  
  newExpert = () => navigate('/experts/new');
  
  prediction = (id) => navigate("/predictions/" + id);
  
  newPrediction = () => navigate('/predictions/new');
  
  category = (id) => navigate("/categories/" + id);

  bonaFide = (url) => window.open(url, '_blank');
  
  mostRecentClaim = () => navigate("/claims/" + this.props.expert.most_recent_claim[0].alias);
  
  mostRecentPrediction = () => navigate("/predictions/" + this.props.expert.most_recent_prediction[0].alias);
  
  login = () => navigate('/login');

  search = () => navigate('/search');
  
  backToSearch = () => navigate("/search?query=" + this.state.query + "&sort=" + this.state.sort);
  
  about = () => navigate('/about');
  
  contact = () => navigate('/contact');

  privacyPolicy = () => navigate('/privacy_policy');
  
  youtube = () => window.open("https://www.youtube.com/channel/UCzGxQc2HmjZHO7A-MNYNWOg", "_blank");

  facebook = () => window.open("http://fb.me/blundit", "_blank");
  
  twitter = () => window.open("http://twitter.com/heyblundit", "_blank");
  
  medium = () => window.open("https://medium.com/blundit", "_blank");
  
  trello = () => window.open("https://trello.com/b/JMQX0OJP/blundit", "_blank");

  github = () => window.open("https://github.com/hoggworks?tab=repositories", "_blank");
  
  logout () {
    UserStore.logout();
    return Sessions.setUser({});
  }

};

export default Links;