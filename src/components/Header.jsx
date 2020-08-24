import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

import { connect } from "react-redux";

const Header = (props) => {
  const renderName = () => {
    if (props.profile) return `Hello ${props.profile.getName()}`;
    return `Please Sign In!`;
  };

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="item">{renderName()}</div>
      <div className="right menu">
        <Link to="/" className="item">All Streams</Link>
        <Link to="/streams/new" className="item">Create Stream</Link>

        <GoogleAuth />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { profile: state.auth.profile };
};
export default connect(mapStateToProps)(Header);
