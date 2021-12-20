import React from "react"
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"





export default class Template extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id")
    }
  };

  componentWillMount() {
    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  };

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  };

  componentDidMount() {
    window.jQuery(".mscroll-y").mCustomScrollbar({
      axis: "y",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });
    window.jQuery(".mscroll-x").mCustomScrollbar({
      axis: "x",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <Sidebar />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12 ofx-auto">
                <ul className="nav nav-pills transparent nowrap">
                  <li className="active"><a data-toggle="pill" href="#invoice">Invoice</a></li>
                  <li><a data-toggle="pill" href="#estimate">Estimate</a></li>
                  <li><a data-toggle="pill" href="#sales-order">Sales Order</a></li>
                  <li><a data-toggle="pill" href="#credit-memo">Credit Memo</a></li>
                  <li><a data-toggle="pill" href="#purchase-order">Purchase Order</a></li>
                  <li><a data-toggle="pill" href="#statement">Statements</a></li>
                </ul>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row tab-content">
                  <div id="invoice" className="tab-pane fade in active">
                    <div className="template-enclose">
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap no-hover">
                          <a href="invoice-builder.html" className="btn create-temp-btn">
                            <img src="images/create-template-icon.svg" alt="icon" />
                            Create Your Template
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb1.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Fixed Fee Invoice</span>
                            <span>Invoice</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb2.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Lorem ipsum dolor</span>
                            <span>Sales Order</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb3.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Sed ut perspiciatis</span>
                            <span>Credit Memo</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb4.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Quis autem vel eum</span>
                            <span>Invoice</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="estimate" className="tab-pane fade in">
                    <div className="template-enclose">
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap no-hover">
                          <a href="invoice-builder.html" className="btn create-temp-btn">
                            <img src="images/create-template-icon.svg" alt="icon" />
                            Create Your Template
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb1.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Fixed Fee Invoice</span>
                            <span>Invoice</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="sales-order" className="tab-pane fade in">
                    <div className="template-enclose">
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap no-hover">
                          <a href="invoice-builder.html" className="btn create-temp-btn">
                            <img src="images/create-template-icon.svg" alt="icon" />
                            Create Your Template
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb1.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Fixed Fee Invoice</span>
                            <span>Invoice</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="credit-memo" className="tab-pane fade in">
                    <div className="template-enclose">
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap no-hover">
                          <a href="invoice-builder.html" className="btn create-temp-btn">
                            <img src="images/create-template-icon.svg" alt="icon" />
                            Create Your Template
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb1.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Fixed Fee Invoice</span>
                            <span>Invoice</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="purchase-order" className="tab-pane fade in">
                    <div className="template-enclose">
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap no-hover">
                          <a href="invoice-builder.html" className="btn create-temp-btn">
                            <img src="images/create-template-icon.svg" alt="icon" />
                            Create Your Template
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb1.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Fixed Fee Invoice</span>
                            <span>Invoice</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="statement" className="tab-pane fade in">
                    <div className="template-enclose">
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap no-hover">
                          <a href="invoice-builder.html" className="btn create-temp-btn">
                            <img src="images/create-template-icon.svg" alt="icon" />
                            Create Your Template
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="template-wrap">
                          <div className="thumb-img">
                            <img src="images/template-thumb1.jpg" className="bdr-all img-responsive" alt="thumb-img" />
                          </div>
                          <div className="thumb-detail">
                            <span className="title">Fixed Fee Invoice</span>
                            <span>Invoice</span>
                            <div className="dropdown menu-item">
                              <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="images/more-menu-dot.svg" alt="icon" />
                              </button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Set as Default</a></li>
                                <li><a href="javascript:;">Preview</a></li>
                                <li><a href="javascript:;" data-toggle="modal" data-target="#categoryModal">Make a Copy</a></li>
                                <li><a href="javascript:;">Edit</a></li>
                                <li><a href="javascript:;">Delete</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}



      </React.Fragment>
    )
  }
}