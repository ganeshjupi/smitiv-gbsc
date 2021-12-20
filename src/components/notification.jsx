import React from "react";
import jQuery from "jquery";
import FetchAllApi from '../api_links/fetch_all_api';
import data from "./reports/CountryCodes";

export default class notification extends React.Component {
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
      notifi_list: [],
      filter_val: [],
      received_bill: [],
      account_request: [],
      payment_request: [],
    };
  }

  logoutFunc(e) {
    e.preventDefault();
    this.props.logoutSubmit();
  };

  componentDidMount() {
    this.getNotification();
    jQuery(".search-btn").click(function () {
      jQuery(".hdr-search").addClass("active");
    });
    jQuery(".hdr-search .close-icon").click(function () {
      jQuery(".hdr-search").removeClass("active");
    });

    jQuery("input[name='search']").on("input", function (e) {
      var selected = jQuery(this).val();
      // alert(selected)
      console.log("gfgf", selected);
    });
  }
  selectedPage = () => {
    var getvalue = document.getElementsByName("search")[0];
    getvalue.addEventListener("input", function () {
      alert(this.value);
    });
  };

  pageChange = (lis) => {
    localStorage.setItem('group_request', JSON.stringify(lis))
    window.location.href = "/accounting_request"
  };

  billShow = (id, invoice_id) => {
    localStorage.setItem('received_bill', id)
    localStorage.setItem('sales_invoice_id', invoice_id)
    window.location.href = "/received_bill"
  };

  paymentShow = (id, invoice_id) => {
    localStorage.setItem('group_payment_request', id)
    localStorage.setItem('sales_invoice_id', invoice_id)
    window.location.href = "/create_invoice"
  };

  redirect_to_customer_multipaymet = (list) => {
    localStorage.setItem('customer_receive_payment_notification', list.id)
    window.location.href = "/Customer_multipayment_notification"
  }


  getNotification = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.get_notification(client_id, (err, response) => {
      if (response.status === 1) {
        let data = response.results.filter((val) => val.is_read == 0)
        this.setState({ notifi_list: data }, this.filterFunc)
      }

    })
  };

  filterFunc = () => {
    let acc_req = this.state.notifi_list.filter((val) => val.type == 1);
    let rec_bill = this.state.notifi_list.filter((val) => val.type == 2);
    let pay_req = this.state.notifi_list.filter((val) => val.type == 3);
    let customer_multipayment = this.state.notifi_list.filter((val) => val.type == 4);

    this.setState({ received_bill: rec_bill, account_request: acc_req, payment_request: pay_req, customer_multipayment });
  };

  render() {
    return (
      <div className="notify-wrap">
        <a >
          <img src="../../images/notification-icon.svg" alt="Notification" />
          <span class="badge badge-notify">{this.state.notifi_list.length}</span>
          <div className="notify-encl">
            <h3>Notifications</h3>
            <ul className="list-unstyled">
              <li>
                {this.state.payment_request.map((lis) => {
                  return (
                    <a href="javascript:;" onClick={() => { this.paymentShow(lis.id, lis.sales_invoice_id) }}>
                      <div className="notifi-icon">
                        <img className="img-responsive" src="images/sample-logo.png" alt="icon" />
                      </div>
                      <div className="notify-cont">
                        <p>Received payment for sales invoice</p>
                        <span>{lis.message}</span>
                        <img className="next-arrow" src="images/item-active-arrow.svg" alt="icon" />
                      </div>
                    </a>
                  )
                })}
              </li>
              <li>
                {this.state.received_bill.map((data) => {
                  return (
                    <a href="javascript:;" onClick={() => { this.billShow(data.list_id, data.sales_invoice_id) }}>
                      <div className="notifi-icon">
                        <img className="img-responsive" src="images/sample-logo.png" alt="icon" />
                      </div>
                      <div className="notify-cont">
                        <p>Received Bill</p>
                        <span>{data.message}</span>
                        <img className="next-arrow" src="images/item-active-arrow.svg" alt="icon" />
                      </div>
                    </a>
                  )
                })}
              </li>
              <li>
                {this.state.account_request.map((lis) => {
                  return (
                    <a href="javascript:;" onClick={() => { this.pageChange(lis) }} >
                      <div className="notifi-icon">
                        <img className="img-responsive" src="images/sample-logo.png" alt="icon" />
                      </div>
                      <div className="notify-cont">
                        <p>Group Accounting Request</p>
                        <span>{lis.message}</span>
                        <img className="next-arrow" src="images/item-active-arrow.svg" alt="icon" />
                      </div>
                    </a>
                  )
                })}
              </li>

              {/* customer multi payment */}

              <li>
                {this.state.customer_multipayment && this.state.customer_multipayment.map((lis) => {
                  return (
                    <a href="javascript:;" onClick={() => { this.redirect_to_customer_multipaymet(lis) }} >
                      <div className="notifi-icon">
                        <img className="img-responsive" src="images/sample-logo.png" alt="icon" />
                      </div>
                      <div className="notify-cont">
                        <p>Customer Multipayment Received</p>
                        <span>{lis.message}</span>
                        <img className="next-arrow" src="images/item-active-arrow.svg" alt="icon" />
                      </div>
                    </a>
                  )
                })}
              </li>

              {/* customer multi payment */}

            </ul>
          </div>
        </a>
      </div>
    )
  }
}