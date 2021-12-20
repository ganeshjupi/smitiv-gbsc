import React, { Component } from "react";
import jQuery from "jquery";
import LeftSidebar from './left_sidebar'
import Footer from './footer'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api';


export default class rolesAndPermissions extends React.Component {
    constructor(props) {
    super(props);
    this.state = {

     
    };
  }
// 
  componentDidMount() {
    var THIS = this;
  

   
  }
  pageLink() {
    window.location.href = '/login';  
  }

 
  render() {
    //console.log("qwerty", this.state.entitynum);
    return (
        <div>
          <div className="container-fluid">

              <div className="row">
                  
                  <div className="reg-completed">
                      <a href="javascript:;" className="close-red">
                          <img src="images/close-red.svg" alt="icon"/>
                      </a>
                      <div>
                          <div className="nav-brand"><img src="images/logo-genie.png" className="img-responsive"/></div>
                          <h2>Hi, We're super excited to have you on board!</h2>
                          <p>you’ve joined the ultimate digital Accounting App</p>
                          <a onClick={this.pageLink} className="btn btn-rounded btn-blue">Get Started</a><br/>
                          <a href="https://www.youtube.com/watch?v=-5mJVLNL5fs" className="text-link" target="_blank">Quick Demo</a>
                      </div>
                  </div>
              </div>
          </div>

        </div>

 
    );
    
  }
  
}
