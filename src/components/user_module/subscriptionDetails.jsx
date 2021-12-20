import React from "react";
import FetchAllApi from "./../../api_links/fetch_all_api";
import UserTopbar from './userTopbar'
import moment from 'moment'

import jQuery from "jquery";

class SubscriptionDetails extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      
      suscriptionList:[],
      currentSubcriptionDetail:''

    };
  }

  componentDidMount(){
    this.get_subscription_list()
    this.get_current_subscription_details()

    

  }
  get_subscription_list = () => {

    let logged_client_id = 1;

    FetchAllApi.get_subscription_list(logged_client_id, (err, response) => {
      if (response.status === 1) {
        // alert('list fetched successfully')
        this.setState({
        suscriptionList: response.list
        })
      }else{
        this.setState({
          suscriptionList: []
          })
      }
    });
  };

  get_current_subscription_details = () => {

    let logged_client_id = 1;

    FetchAllApi.get_current_subscription_details(logged_client_id, (err, response) => {
      if (response.status === 1) {
        // alert('list fetched successfully')
        this.setState({
          currentSubcriptionDetail: response.list[0]
        })
      }else{
        this.setState({
          currentSubcriptionDetail: ''
          })
      }
    });
  };


  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }
  
  render() {
    console.log("ftr", this.state.designationList);
    return (
      <React.Fragment>
<div>
  <div className="container-fluid">
    {/* header Starts here */}
   <UserTopbar logoutSubmit={(e) => this.logoutLink()}/>
    {/* header Ends here */}
    {/* user-content Starts here */}
    <section className="user-content row" >
      <div className="container">
        <div className="title-sec col-md-12 col-xs-12">
          <a href="javascript:;" className="back" onClick={()=>window.history.back()}>
            <img src="images/back-arrow-blue.svg" />
          </a>
          <h3>{this.state.logged_user_name} - {this.state.logged_company_name}</h3>
        </div>
        {/* Member Detail Starts here */}
        {/* <div className="col-md-12 col-xs-12 pad-no">
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
        </div> */}
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
                    <span className="icon-title">Free Trial <span className="badge green">Active</span></span>
                    {/* <p>{this.state.currentSubcriptionDetail.plan_sort_description}</p>
                    <p className="mar-btm">Renews automatically on Jul 28, 2020.</p>
                    <button type='button' onClick={()=>this.props.history.push('/register_Payment')} className="btn btn-blue">Change Plan</button>
                    <button className="btn btn-empty">Cancel Plan</button> */}
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
                  <span className="icon-title" style={{ color: 'red' }}>Currently Unavailable</span>
                    {/* <span className="icon-title">$ 676.00/mo</span> */}
                    {/* <p className="mar-btm">Next payment is scheduled for Jun 28, 2020</p>
                    <button className="btn btn-blue">Manage Payment</button> */}
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
                  {/* <a href="javascript:;" className="text-link">View All</a> */}
                </span>
                <div className="icon-cont">
                {/* <div className="info-detail"> */}
                  {/* <div className="table-responsive col-md-12 col-xs-12 pad-no"> */}
                  <span className="icon-title" style={{ color: 'red' }}><img src="images/caution-icon.svg" alt="icon" />No Bills</span>
                    {/* <table className="billing-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.suscriptionList && this.state.suscriptionList.map((item,i)=>{
                          return(
                            <tr>
                            <td>{ moment(item.subscription_start_date).format('DD/MM/YYYY')}</td>
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
                        }
                       
                       
                     
                      </tbody>
                    </table> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* Billing History Ends here */}
            {/* Contact Information Starts here */}
            
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
    )}
    }

    export default SubscriptionDetails;
    




