import React, { Component } from 'react';

class SocialShare extends Component {

  facebookTitle () {
    return "Blundit - The world's expert tracker";
  }


  shareIcon () {
    return 'http://blundit.com/images/blundit_logo.png';
  }


  getSharingText () {
    let title = `'${this.props.item.title}'`;

    if (this.props.type === "expert") {
      this.title = this.props.item.name;
    } 

    return `Find out how accurate ${this.title} is on Blundit, the world's best expert tracker.`;
  }


  facebookShare () {
    let url = 'http://www.facebook.com/sharer.php?u=' + this.getSharingUrl() + '&description=' + this.getSharingText();
    url += '&picture=' + this.shareIcon();
    url += '&title=' + this.facebookTitle();
    window.open(url, '_blank');
  }


  getSharingUrl () {
    return window.location.href.split('?')[0];
  }


  render () {
    return <div className="default__card social-share">
      <div className="text__title">
        Share
      </div>
      <div className="social-share__links">
        <a
          onClick={this.facebookShare}
          target='_blank'
          className='social-share__links-facebook fa fa-facebook'
          />
        <a
          href={`http://www.twitter.com/share?url=${this.getSharingUrl()}&text=${this.getSharingText()}`}
          target='_blank'
          className='social-share__links-twitter fa fa-twitter'
          />
        <a
          href={`http://pinterest.com/pin/create/button/?url=${this.getSharingUrl()}&media=${this.shareIcon()}&description=${this.getSharingText()}`}
          target='_blank'
          className='social-share__links-pinterest fa fa-pinterest'
          />
      </div>
    </div>
  }

}

export default SocialShare;