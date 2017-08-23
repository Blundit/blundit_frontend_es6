import React, { Component } from 'react';

class InlineLink extends Component {
  getInlineLinkImage () {
    const { item } = this.props;
    if (item.pic != null) { return `url(${item.pic})`; }
    if (item.image != null) { return `url(${item.image})`; }

    return "url()";
  }


  getTitle () {
    const { item } = this.props;
    if (item.title > '') { return item.title; }
    if (item.title === '') { return item.url; }
  }


  getDescription () {
    let item;
    item = this.props.item;
    if (item.description != null) {
      return span({}, item.description);
    } else {
      return span({
        className="not-found"
      }, "No description found.");
    }
  }


  render () {
    const { item } = this.props;

    return  <div className="inline-link">
      <div
        className="inline-link__image"
        style={{backgroundImage: this.getInlineLinkImage()}}
        />
      <div className="inline-link__meta">
        <a
          className="inline-link__meta-url"
          href={item.url}
          target="_blank"
          >
          {this.getTitle()}
          <div className="inline-link__meta-description">
            {this.getDescription()}
          </div>
        </a>
      </div>
    </div>
  }
}

export default InlineLink;
