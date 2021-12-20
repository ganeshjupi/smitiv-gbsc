import React from "react";
import UserTopbar from "./header";
import FetchAllApi from "./../../api_links/fetch_all_api";


export default class Information extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      name: "",
      contact: "",
      mail: "",
      address: "",
      organisation: "",
      status: ""
    }
  }

  componentDidMount = (e) => {
    console.log(this.props.location.state)
    const add = this.props.location.state
    this.setState({ name: add.subscriber_name, organisation: add.organization_name, status: add })
    let address = {
      name: this.state.name,
      email_id: this.state.mail,
      contact: this.state.contact,
      address: this.state.address,
      client_id: this.state.logged_client_id
    };
    FetchAllApi.get_subscriber_contact_information(address, (err, response) => {
      window.jQuery("#pop-modal-1").modal("hide");

      this.setState({
        mail: response.details.email,
        address: response.details.address,
        contact: response.details.contact
      })
      console.log(response)
    })
      ;
  }

  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }



  render() {
    return (
      <React.Fragment>
        <div>
          <div className="container-fluid">
            {/* header Starts here */}
            <UserTopbar logoutSubmit={(e) => this.logoutLink()}/>
            {/* header Ends here */}
            {/* user-content Starts here */}
            <section className="user-content row">
              <div className="container">
                <div className="title-sec col-md-12 col-xs-12">
                  <a href="javascript:;" className="back">
                    <img src="images/back-arrow-blue.svg" onClick={() => {
                      this.props.history.push('/subscriber')
                    }} />
                  </a>
                  <h3>{this.state.organisation} - {this.state.name}</h3>
                </div>
                {/* Member Detail Starts here */}
                <div className="col-md-12 col-xs-12 pad-no">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="alert alert-danger alert-dismissible custom-dismissible">
                        <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
                        <span className="alert-icon">
                          <img src="images/caution-icon.svg" alt="icon" />
                        </span>
                        <span className="cont">Unfortunately, Your Standard Plan is ending in 4 days <a href="javascript:;">Renew now</a></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-xs-12 pad-no">
                  <div className="row info-row">
                    {/* Plan Information Starts here */}
                    <div className="col-md-6 col-xs-12">
                      <div className="info-widget">
                        <span className="title">Plan Information</span>
                        <div className="info-detail ext-pad">
                          <div className="icon-sec">
                            <img src="images/plan-icon.png" alt="icon" />
                          </div>
                          <div className="icon-cont">

                            <span className="icon-title">Standard Plan {''}
                              {this.state.status == "Active" ? (
                                <span className="badge green">Active</span>
                              ) : (
                                  <span className="badge red">Expired</span>
                                )}
                            </span>
                            <p className="mar-btm">Renews automatically on Jul 28, 2020.</p>
                            <button type='button' onClick={() => this.props.history.push('/register_Payment')} className="btn btn-blue mar-rgt-5">Change Plan</button>
                            <button className="btn btn-empty">Cancel Plan</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Plan Information Ends here */}
                    {/* Payment Information Starts here */}
                    <div className="col-md-6 col-xs-12">
                      <div className="info-widget">
                        <span className="title">Payment Information</span>
                        <div className="info-detail">
                          <div className="icon-sec text-center">
                            <img src="images/credit-card-icon.svg" alt="icon" />
                          </div>
                          <div className="icon-cont">
                            <span className="icon-title">$ 676.00/mo</span>
                            <p className="mar-btm">Next payment is scheduled for Jun 28, 2020</p>
                            <button className="btn btn-blue">Manage Payment</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Payment Information Ends here */}
                  </div>
                  <div className="row info-row">
                    {/* Billing History Starts here */}
                    <div className="col-md-6 col-xs-12">
                      <div className="info-widget">
                        <span className="title">Billing History
                  <a href="/billhistory" className="text-link">View All</a>
                        </span>
                        <div className="info-detail">
                          <div className="table-responsive col-md-12 col-xs-12 pad-no">
                            <table className="billing-table">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Type</th>
                                  <th>Amount</th>
                                  <th>&nbsp;</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* {this.state.subscriptionList && this.state.subscriptionList.map((item, i) => {
                                  return (
                                    <tr>
                                      <td>{(item.subscription_start_date).format('DD/MM/YYYY')}</td>
                                      <td>{item.type}</td>
                                      <td>$ {item.subscription_amount}</td>
                                      <td>
                                        <a href="javascript:;" className="view-pdf">
                                          <img src="images/pdf-outline-icon.svg" alt="icon" />
                                        </a>
                                      </td>
                                    </tr>

                                  )
                                })
                                } */}


                                <tr>
                                  <td>14/05/2020</td>
                                  <td>invoice</td>
                                  <td>$ 600.00</td>
                                  <td>
                                    <a href="javascript:;" className="view-pdf">
                                      <img src="images/pdf-outline-icon.svg" alt="icon" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>14/05/2020</td>
                                  <td>invoice</td>
                                  <td>$ 600.00</td>
                                  <td>
                                    <a href="javascript:;" className="view-pdf">
                                      <img src="images/pdf-outline-icon.svg" alt="icon" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>14/05/2020</td>
                                  <td>invoice</td>
                                  <td>$ 600.00</td>
                                  <td>
                                    <a href="javascript:;" className="view-pdf">
                                      <img src="images/pdf-outline-icon.svg" alt="icon" />
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>14/05/2020</td>
                                  <td>invoice</td>
                                  <td>$ 600.00</td>
                                  <td>
                                    <a href="javascript:;" className="view-pdf">
                                      <img src="images/pdf-outline-icon.svg" alt="icon" />
                                    </a>
                                  </td>
                                </tr>




                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Billing History Ends here */}
                    {/* Contact Information Starts here */}



                    <div class="col-md-6 col-xs-12">
                      <div class="info-widget">
                        <span class="title">Contact Information</span>
                        <div class="info-detail">
                          <div class="subscriber-contact">
                            <p><span>Name</span><span>{this.state.name}</span></p>
                            <p><span>Contact</span><span>{this.state.Contact ? this.state.Contact : '--'}</span></p>
                            <p><span>Mail</span><span>{this.state.mail}</span></p>
                            <p><span>Address</span><span>{this.state.address}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Contact Information Ends here */}
                  </div>
                </div>
                {/* Member Detail Ends here */}
              </div>
            </section>
            {/* user-content Ends here */}
          </div>
          <footer className="container-fluid">
            <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
          </footer>
        </div>
      </React.Fragment>
    )
  }
}
