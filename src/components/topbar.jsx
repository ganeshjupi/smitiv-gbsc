import React from "react";
import jQuery from "jquery";
import Notification from "./testing_notification"


class topbar extends React.Component {
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
      client_selection: localStorage.getItem("client_selection") ? localStorage.getItem("client_selection") : false,

      AllClientMail: localStorage.getItem("AllClientMail"),
    };
  }

  logoutFunc(e) {
    e.preventDefault();
    this.props.logoutSubmit();
  }

  componentDidMount() {
    
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
     // alert(this.value);
    });
  };
gotosearch=()=>{
  localStorage.setItem("search","topbar");
  this.props.history.push("/find_recode_search");

}
  render() {
    return (
      <div className="pull-right">
        <form className="hdr-search">
          <div >
           <input
            type="text"
            className="form-control"
            name="search"
            placeholder="Search..."
            autoComplete="off"          
            // list="browsers"
            // id="browser"
            // onInput={() => {
            //   var val = document.getElementById("browser").value;
            //   var opts = document.getElementById('browsers').childNodes;
            //   for (var i = 0; i < opts.length; i++) {
            //     if (opts[i].value === val) {
            //       // An item was selected from the list!
            //       // yourCallbackHere()
            //       // alert(opts[i].value);
            //       let path = '/' + opts[i].value
            //       // this.props.history.push(path)
            //       window.location.href = path
            //       // window.open(path)
            //       break;
            //     }
            //   }
              // console.log('console', e.target.value) 
            //}}

          />
         {/* <datalist id="browsers">
            <option value="login" />
            <option value="user_inbox  " />
            <option value="forgot_password  " />
            <option value="inbox    " />
            <option value="compose  " />
            <option value="sent_items  " />
            <option value="reviewed_items  " />
            {/* <option value="register  " /> */}
           {/* <option value="register_Payment  " />
            <option value="roles_permissions  " />
            <option value="all_lists  " />
            <option value="profit_loss_report  " />
            <option value="balance_sheet " />
            <option value="customer_balance_summary " />
            <option value="vendor_balance_detail  " />
            <option value="open_invoice  " />
            <option value="vendor_balance_summary  " />
            <option value="ap_aging_summary  " />
            <option value="ar_aging_summary  " />
            <option value="add_new_vendor  " />
            <option value="Vendors_list  " />
            <option value="add-new-customer " />
            <option value="employee-list " />
            <option value="Vendors_list " />
            <option value="Customer_receive_payment  " />
            <option value="general_ledger" />
            <option value="Customer list" />
            <option value="AddNewEmployee   " />
            <option value="Customer_receive_payment    " />
            <option value="Vendor_bill_payment    " />
            <option value="bank_reconcile_match    " />
            {/* <option value="GST_Details      " />
            <option value="Gst_report_summary      " />
            <option value="GeneralLedger      " />
            <option value="save_draft      " /> */}
          {/* </datalist>*/}
         </div>  
         {/* <button type="submit" className="btn btn-green">Search</button> */}
          <a href="javascript:;" className="close-icon">
            <img src="../../images/close-icon-red.svg" alt="Close" />
          </a>
        </form>

        <div className="search-wrap">
          <a className="search-btn" onClick={() => this.gotosearch()}>
            <img  
              className="search"
              src="../../images/search-icon.svg"
              alt="Search"
            />
          </a>
        </div>
        <Notification history={this.props.history} />
        <div className="profile-wrap dropdown dropdown menu-item new-cus">
          <a
            href="javascript:;"
            className="avatar dropdown-toggle"
            data-toggle="dropdown"
          >
            <span className="avatar-img">
              <img
                className="img-responsive"
                src={this.state.logged_user_image ? this.state.logged_user_image : "../../images/user-img-1.png"}
                alt={this.state.logged_user_name}
              />
            </span>
            {this.props.AllClientMail == 'yes' ?
              <span className="hidden-xs" title={`${this.state.logged_user_name}--All Clients`}>
                {this.state.logged_user_name}
                {""} - {""} {'All Clients'}
              </span>
              :
              <span className="hidden-xs" title={`${this.state.logged_user_name}--${this.state.logged_company_name}`}>
                {this.state.logged_user_name}
                {""} - {""} {this.state.logged_company_name}
              </span>
            }

          </a>
          <ul className="dropdown-menu">
            {this.state.client_selection &&
              <li>
                <a
                  href="/client_selection"
                >
                  Change client
              </a>
              </li>
            }
            <li>
              <a href={localStorage.getItem("layer") == 1 ? '/profile' : '/user_profile'}
              // onClick={(e) => {                     client_selection
              //   e.preventDefault()
              //   if (localStorage.getItem("layer") == 1) {
              //     window.location.href = '/profile'
              //   } else {
              //     window.location.href = '/user_profile'
              //   }
              // }}
              >
                <img src="../../images/edit-icon.svg" alt="icon" />
                Edit Profile
              </a>
            </li>
            <li
            // onClick={(e) => {
            //   e.preventDefault()

            //   window.location.href = '/preferences'

            // }}
            >
              <a href='/preferences'>
                <img src="../../images/settings-icon.svg" alt="icon" />
                Settings
              </a>
            </li>
            <li>
              <a
                href="/"
              // onClick={this.logoutFunc.bind(this)}
              >
                <img src="../../images/turn-off-icon.svg" alt="icon" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default topbar;
