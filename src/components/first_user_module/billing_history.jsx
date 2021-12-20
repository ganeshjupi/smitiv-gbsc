import React from "react";
import UserTopbar from "./header";



export default class Bill extends React.Component{
  constructor(props){
    super(props)
    this.state={
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
    }
  }

  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  
  render(){
    return(
      <React.Fragment>
      <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* user-content Starts here */}
          <section className="user-content row">
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <a href="javascript:;" className="back">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <h3>Billing History</h3>
              </div>
              {/* Member List Starts here */}
              <div className="col-md-12 col-xs-12 cus-list">
                <form className="custom-form form-inline h-small row">
                  <div className="form-group search-box mar-rgt">
                    <input type="text" name="search" className="form-control" placeholder="Search..." />
                  </div>
                  <div className="form-group pull-right">
                    <label>Show per page</label>
                    <div className="custom-select-drop dropdown">
                      <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                        <span id="selected">10</span><span className="caret" />
                      </a>
                      <ul className="dropdown-menu align-right minw-unset">
                        <li className="active"><a href="javascript:;">10</a></li>
                        <li><a href="javascript:;">15</a></li>
                        <li><a href="javascript:;">20</a></li>
                        <li><a href="javascript:;">25</a></li>
                        <li><a href="javascript:;">30</a></li>
                        <li><a href="javascript:;">35</a></li>
                      </ul>
                    </div>
                  </div>
                </form>
                <div className="list-table row mar-t-no member-table billing-history">
                  <div className="cus-table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Order No#</th>
                          <th>Plan</th>
                          <th>Amount</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>28 May 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Apr 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Mar 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Feb 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Jan 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Dec 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Nov 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Sep 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Aug 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>28 Jul 2020</td>
                          <td>Invoice</td>
                          <td>GEN038488021IN</td>
                          <td>Standard</td>
                          <td>₹676.00</td>
                          <td className="text-center">
                            <a href="javascript:;" className="view-pdf">
                              <img src="images/pdf-outline-icon.svg" alt="icon" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <p className="fw-med pull-left">Showing - 10 of 20 items</p>
                  <div className="pull-right pagination-wrap">
                    <ul className="pagination">
                      <li className="active"><a href="javascript:;">01</a></li>
                      <li><a href="javascript:;">02</a></li>
                      <li><a href="javascript:;" className="btn">Next</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Member List Ends here */}
            </div>
          </section>
          {/* user-content Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}
        <footer className="container-fluid">
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
    </React.Fragment>

    )
  }
}
