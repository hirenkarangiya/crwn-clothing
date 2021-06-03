import React from "react";
//HOC
import { withRouter } from "react-router-dom";

import "./menu-item.style.scss";

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  return (
    <div className={`menu-item ${size ? size : ""}`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
      <div
        className="backgroundImage"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <div className="title">{title}</div>
        <span className="subtitle">Shop Now</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
