import React, { Component } from "react";
// import FetchAllApi from '../api_links/fetch_all_api'
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import jQuery from 'jquery'
import config from './../../api_links/api_links.jsx'

var authorization_key = 'O5mGIP3VNia0JvPH2IBiwA=='

class BankImportStatements extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      banks: [],
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),
    }
  }

  componentDidMount() {
    // this.props.history.push('/bank_reconcile_match');
    // getting bank details
    fetch(config.getAllbanks, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: authorization_key
      },
      body: JSON.stringify({
        client_id: this.state.logged_client_id,

      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 1) {
          this.setState({ banks: data.data })
        }
      });
  }

  uplodExcel = () => {
    console.log(this.state.uploadedFile[0]);

    var formData = new FormData();
    formData.append('statment_list', this.state.uploadedFile[0]);
    formData.append('file_name', this.state.uploadedFile[0].name);
    formData.append('client_id', this.state.logged_client_id);
    formData.append('bank_selected', this.state.selectedBankId);

    console.log(formData);

    //   var requestOptions = {
    //     method: "POST",
    //     // headers: myHeaders,
    //     body: formData,
    //     headers: {
    //         // "Content-type": "application/json; charset=UTF-8",
    //         Authorization: authorization_key,
    //       },
    //   };

    //   console.log(requestOptions);
    fetch(config.bank_import_statements, {
      method: 'POST',
      body: formData,
      headers: {
        //"Content-type": "multipart/form-data; charset=UTF-8",
        Authorization: authorization_key
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          alert(data.recordCount + ' statements uploaded successfully')
          this.props.history.push('/bank_reconcile_match');
        }
      });



    // fetch(config.bank_import_statements, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       file: this.state.uploadedFile[0]

    //     }),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //       Authorization: authorization_key
    //     }
    //   })
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .then(data => {
    //      console.log("data")
    //     })

    console.log(formData);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            {/* left-navbar Starts here */}
            <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />
            {/* <div className="left-navbar">
              <div className="mscroll-y">
                <div className="nav-brand text-center hidden-xs"><img src="images/nav-brand-transparent.png" alt="Genie" /></div>
                <ul className="left-navmenu list-unstyled">
                  <li><a href="javascript:;">Dashboard</a></li>
                
                  <li><span className="item-head">Recently Used</span></li>
                  <li><a href="javascript:;">Profit &amp; Loss</a></li>
                  <li><a href="javascript:;">General Ledger</a></li>
                  <li><a href="javascript:;" className="active">Import Statement</a></li>
                 
                  <li><span className="item-head">Documents</span></li>
                  <li><a href="javascript:;">Inbox</a></li>
                  <li><a href="javascript:;">Reviewed</a></li>
                  
                  <li><span className="item-head">Accounting</span></li>
                  <li>
                    <a href="javascript:;" className="has-sub">Lists</a>
                    <ul className="list-unstyled sub-menu">
                      <li><a href="javascript:;">Chart of Accounts</a></li>
                      <li><a href="javascript:;">Item List</a></li>
                      <li><a href="javascript:;">Fixed Asset Item List</a></li>
                      <li><a href="javascript:;">Currency List</a></li>
                    </ul>
                  </li>
                  <li><a href="javascript:;">Accountant</a></li>
                  <li>
                    <a href="javascript:;">Company</a>
                  </li>
                  <li><a href="javascript:;">Sales Tax</a></li>
                  <li>
                    <a href="javascript:;" className="has-sub">Customers</a>
                    <ul className="list-unstyled sub-menu">
                      <li><a href="javascript">Choose Invoice Template</a></li>
                      <li><a href="javascript">Create Invoice</a></li>
                    </ul>
                  </li>
                  <li><a href="javascript:;">Vendors</a></li>
                  <li><a href="javascript:;">Employees</a></li>
                  <li><a href="javascript:;">Banking</a></li>
                  <li><a href="javascript:;">Reports</a></li>
                </ul>
              </div>
           
            </div> */}
            <div className="menu-close visible-xs">&nbsp;</div>
            {/* left-navbar Ends here */}
            {/* MainContent Wrapper Starts here */}
            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              {/* Top bar Starts here */}
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <form className="hdr-search">
                  <input type="text" className="form-control" name="search" placeholder="Search..." />
                  {/* <button type="submit" class="btn btn-green">Search</button> */}
                  <a href="javascript:;" className="close-icon"><img src="images/close-icon-red.svg" alt="Close" /></a>
                </form>
                <div className="nav-brand-res visible-xs">
                  <img className="img-responsive" src="images/logo-icon.png" alt="LogoIcon" />
                  </div>
                <a href="javascript:;" className="back hidden-xs" onClick={() => this.props.history.goBack()}>
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <ul className="list-unstyled breadcrumb page-title hidden-xs"> 
                  <li><a href="javascript:;">Banking</a></li>
                  <li><a href="javascript:;">Import Statement</a></li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
                {/* <div className="pull-right">
                  <div className="search-wrap">
                    <a className="search-btn" href="javascript:;">
                      <img className="search" src="images/search-icon.svg" alt="Search" />
                    </a>
                  </div>
                  <div className="notify-wrap">
                    <a href="javascript:;"><img src="images/notification-icon.svg" alt="Notification" /></a>
                  </div>
                  <div className="profile-wrap dropdown">
                    <a href="javascript:;" className="avatar dropdown-toggle" data-toggle="dropdown">
                      <span className="avatar-img"><img className="img-responsive" src="images/user-img-1.png" alt="Harvey Dean" /></span>
                      <span className="hidden-xs">Harvey Dean</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="javascript:;"><img src="images/edit-icon.svg" alt="icon" />Edit Profile</a>
                      </li>
                      <li><a href="javascript:;"><img src="images/settings-icon.svg" alt="icon" />Settings</a></li>
                      <li><a href="javascript:;"><img src="images/turn-off-icon.svg" alt="icon" />Logout</a></li>
                    </ul>
                  </div>               
               
                </div>*/}
              </div>
              {/* Top bar Ends here */}
              {/* Main Content Starts here */}
              <div className="main-content col-md-12 col-xs-12">
                <span className="page-title visible-xs">Import Statement</span>
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div className="col-md-12 pad-no upload-sec-encl">
                    <div className="col-md-4 col-sm-4 col-xs-12 text-center upload-step">
                      <span className="point">1</span>
                      Go to your bank website and <br />download bank statement
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 text-center upload-step">
                      <span className="point">2</span>
                      File type must be <br />pdf, csv
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 text-center upload-step">
                      <span className="point">3</span>
                      Then upload your statement <br />below
                    </div>
                  </div>
                  <div className="col-md-12 col-xs-12">
                    <div className="upload-sec">
                      <form className="custom-form">
                        <div className="form-group">
                          <div className="custom-select-drop dropdown">
                          <label>Select Bank Account</label>
                            <a aria-expanded="false" title="Choose.." placeholder="Choose.." aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                              <span id="selected">{this.state.selectedBank}</span><span className="caret" />
                            </a>
                            <ul className="dropdown-menu">                            
                              {(this.state.banks.map(e => {
                                return (
                                  <li className={(e.name === this.state.selectedBank) ? "active" : ""}><a href="javascript:;" onClick={() => this.setState({ selectedBank: e.name, selectedBankId: e.id })}>{e.name}</a></li>
                                )
                              }))}
                              {/* <li className="active"><a href="javascript:;">DBS Bank Account</a></li>
                              <li><a href="javascript:;">Yes Bank Account</a></li>
                              <li><a href="javascript:;">Bank Account 1</a></li>
                              <li><a href="javascript:;">Bank Account 2</a></li> */}
                            </ul>
                          </div>
                        </div>
                        <div className="form-group">
                          {/* <a class="btn btn-wide" onclick=> */}
                          <input type="file" className="btn btn-wide" id="file_input_id"
                            onChange={(e) => {
                              let files = e.target.files;
                              this.setState({ uploadedFile: files })
                              // this.uploadExcel(files) 
                            }}
                          />
                          {/* <img src="images/upload-file.svg" alt="icon"/>
                                        Upload your statement here */}
                          {/* </a> */}
                        </div>
                        <a href={config.bank_statement_templates} className="text-link">Download our sample CSV template</a>
                        <div className='pf-btm-wrap'>
                          <div className='col-md-6 col-sm-6 col-xs-12 pad-no'>

                          </div>
                          <div className='col-md-6 col-sm-6 col-xs-12 text-right pad-no'>
                            <button
                              className='btn btn-lightgray'
                              type='button'
                            // onClick={() => {
                            //   this.props.history.push('/invoice_templates')
                            // }}
                            >
                              Close
                          </button>
                            {'  '}
                            <input
                              className='btn btn-green'
                              type='button'
                              value='Upload'
                              onClick={e => this.uplodExcel()}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Content Ends here */}
            </div>
            {/* MainContent Wrapper Ends here */}
          </div>
        </div>
        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}
        <footer className="container-fluid">
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
        {/* footer Ends here */}
      </div>
    )
  }
}

export default BankImportStatements
