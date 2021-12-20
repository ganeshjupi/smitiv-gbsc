import React from "react";
import jQuery from "jquery";
import FetchAllApi from "../api_links/fetch_all_api";

// for title change
import { Helmet } from 'react-helmet'
// for title change

class left_sidebar extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      initialActiveInbox: "active",
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),

      AllClientMail: localStorage.getItem("AllClientMail"),


      dropdown: "",
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",

      role_permissions:
        JSON.parse(localStorage.getItem("role_permissions")) || [],
      user_layer_role: localStorage.getItem("user_layer_role"),
      layer: localStorage.getItem("layer"),
    };
  }

  componentDidMount() {
    // console.log("role_permissions", role_permissions);
    require("jquery-mousewheel");
    require("malihu-custom-scrollbar-plugin");

    jQuery(".mscroll-y").mCustomScrollbar({
      axis: "y",
      scrollEasing: "linear",
      scrollInertia: 600,
      autoHideScrollbar: "true",
      autoExpandScrollbar: "true",
    });
  }
  routeedChange(parameter) {
    // if(parameter==='create_invoice'){
      
       localStorage.setItem("customer_id",'');
       localStorage.setItem("search",'');
       localStorage.setItem("edit_customer_receive_payment",'');
       localStorage.setItem("cheque_id",'');
       localStorage.setItem("deposit_id",'');
    // }
     this.props.history.push('/' + parameter)
     window.scrollTo(0, 0)
   }
  componentWillMount() {
    console.log('left', this.props)
    var currentLocation = window.location.pathname;
    this.setState({
      currentLocation: currentLocation,
    });
  }

  // routedChange(parameter){
  //     this.props.history.push('/'+parameter);
  //     window.scrollTo(0,0);

  // }

  routedChange(page_slug) {
    // this.props.pageSubmit(page_slug);
    // window.location.href = "/" + page_slug;
    this.props.history.push('/' + page_slug);
  }

  pageChange(page) {
    window.open("/" + page)
  }

  render() {
    let roleid = this.state.logged_role_id;
    //console.log('role_id', roleid);

    if (this.state.AllClientMail == 'yes') {
      return (
        <>
          <div className="left-navbar">
            <div className="mscroll-y">
              <div className="nav-brand text-center hidden-xs" onClick={() => window.location.href = "/landing_page"}>
                <img src="../../images/nav-brand-transparent.png" alt="Genie" />
              </div>
              <ul className="left-navmenu list-unstyled">

                <li>{this.state.currentLocation == "/client_selection" &&
                  <Helmet>
                    <title>{`GBSC | Client selection`}</title>
                  </Helmet>}
                  <a href="/client_selection"
                    // onClick={this.routedChange.bind(this, "client_selection")}
                    className={
                      this.state.currentLocation == "/client_selection"
                        ? "active"
                        : ""
                    }
                  >
                    Client Selection
                  </a>
                </li>

                <li>{this.state.currentLocation == "/user_inbox" &&
                  <Helmet>
                    <title>{`GBSC | Accountant Inbox`}</title>
                  </Helmet>}
                  <a href="/user_inbox"
                    // onClick={this.routedChange.bind(this, "user_inbox")}
                    className={
                      this.state.currentLocation == "/user_inbox"
                        ? "active"
                        : ""
                    }
                  >
                    Accountant Inbox
                  </a>
                </li>

                <li>{this.state.currentLocation == "/sent_items" &&
                  <Helmet>
                    <title>{`GBSC | Sent Items`}</title>
                  </Helmet>}
                  <a href="/sent_items"
                    // onClick={this.routedChange.bind(this, "sent_items")}
                    className={
                      this.state.currentLocation == "/sent_items"
                        ? "active"
                        : ""
                    }
                  >
                    Sent Items
                  </a>
                </li>

                <li>{this.state.currentLocation == "/reviewed_items" &&
                  <Helmet>
                    <title>{`GBSC | Reviewed Items`}</title>
                  </Helmet>}
                  <a href="/reviewed_items"
                    // onClick={this.routedChange.bind(this, "reviewed_items")}
                    className={
                      this.state.currentLocation == "/reviewed_items"
                        ? "active"
                        : ""
                    }
                  >
                    Reviewed
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    }
    if (this.state.AllClientMail !== 'yes') {

      return (
        <div>

          <div
            className="left-navbar"
            data-user-id={this.state.logged_user_id}
            data-client-id={this.state.logged_client_id}
          >
            <div className="mscroll-y">
              <div className="nav-brand text-center hidden-xs" onClick={() => window.location.href = "/landing_page"}>
                <img src="../../images/nav-brand-transparent.png" alt="Genie" />
              </div>
              <ul className="left-navmenu list-unstyled">
                {this.state.role_permissions.includes(1) ? (
                  <li>{this.state.currentLocation == "/landing_page" &&
                    <Helmet>
                      <title>{`GBSC | Dashboard`}</title>
                    </Helmet>}
                    <a href="/landing_page"
                      // onClick={this.routedChange.bind(this, "landing_page")}
                      className={
                        this.state.currentLocation == "/landing_page"
                          ? "active"
                          : ""
                      }
                    >
                      Dashboard
                    </a>
                  </li>
                ) : (
                  <li>{this.state.currentLocation == "/landing_page" &&
                    <Helmet>
                      <title>{`GBSC | Dashboard`}</title>
                    </Helmet>}
                    <a href="/landing_page"
                      // onClick={this.routedChange.bind(this, "landing_page")}
                      className={
                        this.state.currentLocation == "/landing_page"
                          ? "active"
                          : ""
                      }
                    >
                      Dashboard
                    </a>
                  </li>
                )}

{this.state.user_layer_role == 1 &&
                  this.state.logged_role_id == 1 &&
                  this.state.layer == 1 ? (
                  <li>{this.state.currentLocation == "/add_roles" &&
                    <Helmet>
                      <title>{`GBSC | Roles And Permissions`}</title>
                    </Helmet>}
                    <a href="/add_roles"
                      // onClick={this.routedChange.bind(this, "add_roles")}
                      className={
                        this.state.currentLocation == "/add_roles" ? "active" : ""
                      }
                    >
                      Roles And Permissions
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.user_layer_role == 1 &&
                  this.state.logged_role_id == 1 &&
                  this.state.layer == 2 ? (
                  <li>{this.state.currentLocation == "/roles_permissions" &&
                    <Helmet>
                      <title>{`GBSC | Roles And Permissions`}</title>
                    </Helmet>}
                    <a href="/roles_permissions"
                      // onClick={this.routedChange.bind(this, "roles_permissions")}
                      className={
                        this.state.currentLocation == "/roles_permissions"
                          ? "active"
                          : ""
                      }
                    >
                      Roles And Permissions
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.user_layer_role == 1 &&
                  this.state.logged_role_id == 2 &&
                  this.state.layer == 1 ? (
                  <li>{this.state.currentLocation == "/add_roles" &&
                    <Helmet>
                      <title>{`GBSC | Roles And Permissions`}</title>
                    </Helmet>}
                    <a href="/add_roles"
                      // onClick={this.routedChange.bind(this, "add_roles")}
                      className={
                        this.state.currentLocation == "/add_roles" ? "active" : ""
                      }
                    >
                      Roles And Permissions
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.user_layer_role == 1 &&
                  this.state.logged_role_id == 2 &&
                  this.state.layer == 2 ? (
                  <li>{this.state.currentLocation == "/roles_permissions" &&
                    <Helmet>
                      <title>{`GBSC | Roles And Permissions`}</title>
                    </Helmet>}
                    <a href="/roles_permissions"
                      // onClick={this.routedChange.bind(this, "roles_permissions")}
                      className={
                        this.state.currentLocation == "/roles_permissions"
                          ? "active"
                          : ""
                      }
                    >
                      Roles And Permissions
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {/* <li>
                  <span className="item-head">Recently Used</span>
                </li> */}
                {/* 
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "enter_batch_transaction ")}
                    className={
                      this.state.currentLocation == "/enter_batch_transaction"
                        ? "active"
                        : ""
                    }
                  >
                    Enter Batch Transaction{" "}
                  </a>
                </li>
  
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "trial_balance ")}
                    className={
                      this.state.currentLocation == "/trial_balance"
                        ? "active"
                        : ""
                    }
                  >
                    Trial Balance{" "}
                  </a>
                </li>
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "journal ")}
                    className={
                      this.state.currentLocation == "/journal"
                        ? "active"
                        : ""
                    }
                  >
                    journal{" "}
                  </a>
                </li>
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "prior_sales_tax_return ")}
                    className={
                      this.state.currentLocation == "/prior_sales_tax_return"
                        ? "active"
                        : ""
                    }
                  >
                    Prior Sales Tax Return{" "}
                  </a>
                </li>
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "sequence_check ")}
                    className={
                      this.state.currentLocation == "/sequence_check"
                        ? "active"
                        : ""
                    }
                  >
                    Sequence check{" "}
                  </a>
                </li>
  
  
  
  
  
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "make_deposit ")}
                    className={
                      this.state.currentLocation == "/make_deposit"
                        ? "active"
                        : ""
                    }
                  >
                    Make Deposit{" "}
                  </a>
                </li>
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "add_bank_account")}
                    className={
                      this.state.currentLocation == "/add_bank_account"
                        ? "active"
                        : ""
                    }
                  >
                    Add Bank Account{" "}
                  </a>
                </li>
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "add_bank_detail")}
                    className={
                      this.state.currentLocation == "/add_bank_detail"
                        ? "active"
                        : ""
                    }
                  >
                    Add Bank Details{" "}
                  </a>
                </li>
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "add_bank_internet")}
                    className={
                      this.state.currentLocation == "/add_bank_internet"
                        ? "active"
                        : ""
                    }
                  >
                    Add Bank Internet{" "}
                  </a>
                </li>
                <li>
                 <a href="javascript:;"
                    // onClick={this.routedChange.bind(this, "add_bank_login")}
                    className={
                      this.state.currentLocation == "/add_bank_login"
                        ? "active"
                        : ""
                    }
                  >
                    Add Bank Login{" "}
                  </a>
                </li>
                
                */}

                {this.state.role_permissions.includes(14) ? (
                  <li>
                    <span className="item-head">Create Company</span>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/create_invoice" &&
                    <Helmet>
                      <title>{`GBSC | Create Invoice`}</title>
                    </Helmet>}
                    <a  onClick={this.routeedChange.bind(this, 'create_invoice')}
                      className={
                        this.state.currentLocation == "/create_invoice"
                          ? "active"
                          : ""
                      }
                    >
                      Create Invoice
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(14) ? (
                  <li>
                    {this.state.currentLocation == "/create_creditmemo" &&
                      <Helmet>
                        <title>{`GBSC | Create Credit memo`}</title>
                      </Helmet>}
                    <a  onClick={this.routeedChange.bind(this, 'create_creditmemo')}
                      // onClick={this.routedChange.bind(this, "create_creditmemo")}
                      className={
                        this.state.currentLocation == "/create_creditmemo"
                          ? "active"
                          : ""
                      }
                    >
                      Create Credit memo{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(14) ? (
                  <li>
                    {this.state.currentLocation == "/create_estimate" &&
                      <Helmet>
                        <title>{`GBSC | Create Quotation`}</title>
                      </Helmet>
                    }
                    <a onClick={this.routeedChange.bind(this, 'create_estimate')}
                      // onClick={this.routedChange.bind(this, "create_estimate")}
                      className={
                        this.state.currentLocation == "/create_estimate"
                          ? "active"
                          : ""
                      }
                    >
                      Create Quotation{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(14) ? (
                  <li>
                    {this.state.currentLocation == "/create_salesorder" &&
                      <Helmet>
                        <title>{`GBSC | Create Sales Order`}</title>
                      </Helmet>
                    }
                    <a  onClick={this.routeedChange.bind(this, 'create_salesorder')}
                      // onClick={this.routedChange.bind(this, "create_salesorder")}
                      className={
                        this.state.currentLocation == "/create_salesorder"
                          ? "active"
                          : ""
                      }
                    >
                      Create Sales Order{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/create_purchaseorder" &&
                    <Helmet>
                      <title>{`GBSC | Create Purchase order`}</title>
                    </Helmet>}
                    <a  onClick={this.routeedChange.bind(this, 'create_purchaseorder')}
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "create_purchaseorder"
                      // )}
                      className={
                        this.state.currentLocation == "/create_purchaseorder"
                          ? "active"
                          : ""
                      }
                    >
                      Create Purchase order
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/invoice_templates" &&
                    <Helmet>
                      <title>{`GBSC | Templates`}</title>
                    </Helmet>}
                    <a href="/invoice_templates"
                      // onClick={this.routedChange.bind(this, "invoice_templates")}
                      className={
                        this.state.currentLocation == "/invoice_templates"
                          ? "active"
                          : ""
                      }
                    >
                      Invoice Templates
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/template_edit_page" &&
                    <Helmet>
                      <title>{`GBSC | Edit Template`}</title>
                    </Helmet>}
                    <a href="/template_edit_page"
                      // onClick={this.routedChange.bind(this, "template_edit_page")}
                      className={
                        this.state.currentLocation == "/template_edit_page"
                          ? "active"
                          : ""
                      }
                    >
                      Edit Template 1
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/template_edit_page_2" &&
                    <Helmet>
                      <title>{`GBSC | Edit Template`}</title>
                    </Helmet>}
                    <a href="/template_edit_page_2"
                      // onClick={this.routedChange.bind(this, "template_edit_page")}
                      className={
                        this.state.currentLocation == "/template_edit_page_2"
                          ? "active"
                          : ""
                      }
                    >
                      Edit Template 2
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/template_edit_page_3" &&
                    <Helmet>
                      <title>{`GBSC | Edit Template`}</title>
                    </Helmet>}
                    <a href="/template_edit_page_3"
                      // onClick={this.routedChange.bind(this, "template_edit_page")}
                      className={
                        this.state.currentLocation == "/template_edit_page_3"
                          ? "active"
                          : ""
                      }
                    >
                      Edit Template 3
                    </a>
                  </li>
                ) : (
                  ""
                )}





                {this.state.role_permissions.includes(26) ? (
                  <li>
                    <span className="item-head">Group Accounting</span>
                  </li>
                ) : null}
                {this.state.role_permissions.includes(26) ? (
                  <li>{this.state.currentLocation == "/add_business_contact" &&
                    <Helmet>
                      <title>{`GBSC | Add Business Contact`}</title>
                    </Helmet>}
                    <a href="/add_business_contact"
                      // onClick={this.routedChange.bind(this, "add_business_contact")}
                      className={
                        this.state.currentLocation == "/add_business_contact"
                          ? "active"
                          : ""
                      }
                    >
                      Add Business Contact
                    </a>
                  </li>
                ) : (
                  ""
                )}{" "}
                {this.state.role_permissions.includes(26) ? (
                  <li>{this.state.currentLocation == "/requests" &&
                    <Helmet>
                      <title>{`GBSC | Requests`}</title>
                    </Helmet>}
                    <a href="/requests"
                      // onClick={this.routedChange.bind(this, "requests")}
                      className={
                        this.state.currentLocation == "/requests"
                          ? "active"
                          : ""
                      }
                    >
                      Requests
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <span className="item-head">List</span>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(17) ? (
                  <li>{this.state.currentLocation == "/customers-list" &&
                    <Helmet>
                      <title>{`GBSC | Customers list`}</title>
                    </Helmet>}
                    <a href="/customers-list"
                      // onClick={this.routedChange.bind(this, "customers-list")}
                      className={
                        this.state.currentLocation == "/customers-list"
                          ? "active"
                          : ""
                      }
                    >
                      Customers list
                    </a>
                  </li>
                ) : null}
                {
                  this.state.role_permissions.includes(20) ? (
                    <li>{this.state.currentLocation == "/Vendors_list" &&
                      <Helmet>
                        <title>{`GBSC | Vendor list`}</title>
                      </Helmet>}
                      <a href="/Vendors_list"
                        // onClick={this.routedChange.bind(this, "Vendors_list")}
                        className={
                          this.state.currentLocation == "/Vendors_list"
                            ? "active"
                            : ""
                        }
                      >
                        Vendor list
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                  // : (
                  //   <li>
                  //    <a href="javascript:;"
                  // onClick={this.routedChange.bind(this, 'Vendors_list')}
                  //       className={
                  //         this.state.currentLocation == '/Vendors_list'
                  //           ? 'active'
                  //           : ''
                  //       }
                  //     >
                  //       Vendor list
                  //     </a>
                  //   </li>
                  // )
                }
                {this.state.role_permissions.includes(23) ? (
                  <li>{this.state.currentLocation == "/employee-list" &&
                    <Helmet>
                      <title>{`GBSC |  Employee List`}</title>
                    </Helmet>}
                    <a href="/employee-list"
                      // onClick={this.routedChange.bind(this, "employee-list")}
                      className={
                        this.state.currentLocation == "/employee-list"
                          ? "active"
                          : ""
                      }
                    >
                      Employee List
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/all_lists" &&
                    <Helmet>
                      <title>{`GBSC | All Lists`}</title>
                    </Helmet>}
                    <a href="/all_lists"
                      // onClick={this.routedChange.bind(this, "all_lists")}
                      className={
                        this.state.currentLocation == "/all_lists"
                          ? "active"
                          : ""
                      }
                    >
                      All Lists (list of transctions)
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(20) ? (
                  <li>
                    <span className="item-head">Bank</span>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(20) ? (
                  <li>{this.state.currentLocation == "/vendor_bill_payment" &&
                    <Helmet>
                      <title>{`GBSC | Vendor Bill Payment`}</title>
                    </Helmet>}
                    <a 
                    //href="/vendor_bill_payment"
                      onClick={this.routeedChange.bind(
                        this,
                        "vendor_bill_payment"
                      )}
                      className={
                        this.state.currentLocation == "/vendor_bill_payment"
                          ? "active"
                          : ""
                      }
                    >
                      Vendor Bill Payment
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(17) ? (
                  <li>{this.state.currentLocation == "/Customer_receive_payment" &&
                    <Helmet>
                      <title>{`GBSC | Customer Receive Payment`}</title>
                    </Helmet>}
                    <a 
                    //href="/Customer_receive_payment"
                      onClick={this.routeedChange.bind(
                        this,
                        "Customer_receive_payment"
                      )}
                      className={
                        this.state.currentLocation == "/Customer_receive_payment"
                          ? "active"
                          : ""
                      }
                    >
                      Customer Receive Payment
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(17) ? (
                  <li>{this.state.currentLocation == "/transfer_funds" &&
                    <Helmet>
                      <title>{`GBSC | Transfer Funds`}</title>
                    </Helmet>}
                    <a href="/transfer_funds"
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "transfer_funds"
                      // )}
                      className={
                        this.state.currentLocation == "/transfer_funds"
                          ? "active"
                          : ""
                      }
                    >
                      Transfer Funds
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(17) ? (
                  <li>{this.state.currentLocation == "/make_deposit" &&
                    <Helmet>
                      <title>{`GBSC | Make Deposit`}</title>
                    </Helmet>}
                    <a 
                    //href="/make_deposit"
                      onClick={this.routeedChange.bind(
                        this,
                        "make_deposit"
                      )}
                      className={
                        this.state.currentLocation == "/make_deposit"
                          ? "active"
                          : ""
                      }
                    >
                      Make Deposit
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(17) ? (
                  <li>{this.state.currentLocation == "/write_cheque" &&
                    <Helmet>
                      <title>{`GBSC | Write Cheque`}</title>
                    </Helmet>}
                    <a 
                    //href="/write_cheque"
                      onClick={this.routeedChange.bind(
                        this,
                        "write_cheque"
                       )}
                      className={
                        this.state.currentLocation == "/write_cheque"
                          ? "active"
                          : ""
                      }
                    >
                      Write Cheque
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(26) ? (
                  <li>
                    {this.state.currentLocation == "/bank_reconcile_match" &&
                      <Helmet>
                        <title>{`GBSC | Bank Reconcile Match`}</title>
                      </Helmet>
                    }
                    <a href="/bank_reconcile_match"
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "bank_reconcile_match"
                      // )}
                      className={
                        this.state.currentLocation == "/bank_reconcile_match"
                          ? "active"
                          : ""
                      }
                    >
                      Bank Reconcile Match{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(26) ? (
                  <li>
                    {this.state.currentLocation == "/create-bank-rule" &&
                      <Helmet>
                        <title>{`GBSC | Create Bank Rule`}</title>
                      </Helmet>
                    }
                    <a href="/create-bank-rule"
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "create-bank-rule"
                      // )}
                      className={
                        this.state.currentLocation == "/create-bank-rule"
                          ? "active"
                          : ""
                      }
                    >
                      Create Bank Rule{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(14) ? (
                  <li>
                    <span className="item-head">Batch Posting</span>
                  </li>
                ) : (
                  ""
                )}


                {this.state.role_permissions.includes(26) ? (
                  <li>
                    {this.state.currentLocation == "/enter_batch_transaction" &&
                      <Helmet>
                        <title>{`GBSC | Enter Batch Transaction`}</title>
                      </Helmet>
                    }
                    <a href="/enter_batch_transaction"
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "enter_batch_transaction"
                      // )}
                      className={
                        this.state.currentLocation == "/enter_batch_transaction"
                          ? "active"
                          : ""
                      }
                    >
                      Enter Batch Transaction{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(26) ? (
                  <li>
                    {this.state.currentLocation == "/client_data_review" &&
                      <Helmet>
                        <title>{`GBSC | Client Data Review`}</title>
                      </Helmet>
                    }
                    <a href="/client_data_review"
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "client_data_review"
                      // )}
                      className={
                        this.state.currentLocation == "/client_data_review"
                          ? "active"
                          : ""
                      }
                    >
                      Client Data Review{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}


                {/* 
                {this.state.role_permissions.includes(26) ? (
                  <li>
                   <a href="javascript:;"
                      // onClick={this.routedChange.bind(this, 'bank-reconcile-match')}
                      className={
                        this.state.currentLocation == '/bank-reconcile-match'
                          ? 'active'
                          : ''
                      }
                    >
  Reconciliation Items                  </a>
                  </li>
                ) : (
                  ''
                )} */}
                {/* 
  {this.state.role_permissions.includes(26) ? (
                  <li>
                   <a href="javascript:;"
                      // onClick={this.routedChange.bind(this, 'bank-reconcile-create')}
                      className={
                        this.state.currentLocation == '/bank-reconcile-create'
                          ? 'active'
                          : ''
                      }
                    >
  Reconcile Create Match                  </a>
                  </li>
                ) : (
                  ''
                )} */}
                {/* <li><a
                //  onClick={this.routedChange.bind(this, 'roles_permissions')}
                 className={
                   this.state.currentLocation == '/roles_permissions'
                     ? 'active'
                     : ''
                 }
                href='javascript:;' className='has-sub'>
                      Roles And Permissions
                    </a></li> */}


                {/* {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/add_business_contact" &&
                    <Helmet>
                      <title>{`GBSC | Group Accounting`}</title>
                    </Helmet>}
                    <a href="/add_business_contact"
                      className={
                        this.state.currentLocation == "/add_business_contact"
                          ? "active"
                          : ""
                      }
                    >
                      Group Accounting
                    </a>
                  </li>
                ) : (
                  ""
                )} */}
                {/* {this.state.role_permissions.includes(14) ? (
                  <li>{this.state.currentLocation == "/invoice_templates" &&
                    <Helmet>
                      <title>{`GBSC | Invoice templates`}</title>
                    </Helmet>}
                   <a href="javascript:;"
                      // onClick={this.routedChange.bind(this, "invoice_templates")}
                      className={
                        this.state.currentLocation == "/invoice_templates"
                          ? "active"
                          : ""
                      }
                    >
                      Invoice templates
                    </a>
                  </li>
                ) : (
                    ""
                  )} */}



                
                {/* {this.state.role_permissions.includes(17) ? (
                  <li>
                    <span className='item-head'>Accounting</span>
                  </li>
                ) : (
                  ''
                )} */}
                {this.state.role_permissions.includes(1) ? (
                  <li>
                    <span className="item-head">Documents</span>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(29) ? (
                  <li>{this.state.currentLocation == "/user_inbox" &&
                    <Helmet>
                      <title>{`GBSC | Accountant Inbox`}</title>
                    </Helmet>}
                    <a href="/user_inbox"
                      // onClick={this.routedChange.bind(this, "user_inbox")}
                      className={
                        this.state.currentLocation == "/user_inbox"
                          ? "active"
                          : ""
                      }
                    >
                      Accountant Inbox
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(8) ? (
                  <li>{this.state.currentLocation == "/inbox" &&
                    <Helmet>
                      <title>{`GBSC | Inbox`}</title>
                    </Helmet>}
                    <a href="/inbox"
                      // onClick={this.routedChange.bind(this, "inbox")}
                      className={
                        this.state.currentLocation == "/inbox" ? "active" : ""
                      }
                    >
                      Inbox
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(8) || this.state.role_permissions.includes(29) ? (
                  <li>{this.state.currentLocation == "/sent_items" &&
                    <Helmet>
                      <title>{`GBSC | Sent Items`}</title>
                    </Helmet>}
                    <a href="/sent_items"
                      // onClick={this.routedChange.bind(this, "sent_items")}
                      className={
                        this.state.currentLocation == "/sent_items"
                          ? "active"
                          : ""
                      }
                    >
                      Sent Items
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(8) ||
                  this.state.role_permissions.includes(29) ? (
                  <li>{this.state.currentLocation == "/reviewed_items" &&
                    <Helmet>
                      <title>{`GBSC | Reviewed Items`}</title>
                    </Helmet>}
                    <a href="/reviewed_items"
                      // onClick={this.routedChange.bind(this, "reviewed_items")}
                      className={
                        this.state.currentLocation == "/reviewed_items"
                          ? "active"
                          : ""
                      }
                    >
                      Reviewed
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(11) ? (
                  <li>
                    <span className="item-head">Accountant</span>
                  </li>
                ) : null}
                {/* {parseInt(this.state.layer) === 1 ? (
                  <li>{this.state.currentLocation == "/profile" &&
                    <Helmet>
                      <title>{`GBSC | Profile & Settings`}</title>
                    </Helmet>}
                    <a
                      //  href="/profile"
                      onClick={this.pageChange.bind(this, "profile")}
                      className={
                        this.state.currentLocation == "/profile" ? "active" : ""
                      }
                    >
                      Profile&settings
                    </a>
                  </li>
                ) : (
                  <li>{this.state.currentLocation == "/user_profile" &&
                    <Helmet>
                      <title>{`GBSC | Profile & Settings`}</title>
                    </Helmet>}
                    <a
                      //  href="/user_profile"
                      onClick={this.pageChange.bind(this, "user_profile")}
                      className={
                        this.state.currentLocation == "/user_profile"
                          ? "active"
                          : ""
                      }
                    >
                      Profile&settings
                    </a>
                  </li>
                )} */}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/all-report" &&
                    <Helmet>
                      <title>{`GBSC | All Reports`}</title>
                    </Helmet>}
                    <a href="/all-report"
                      // onClick={this.routedChange.bind(this, "all-report")}
                      className={
                        this.state.currentLocation == "/all-report"
                          ? "active"
                          : ""
                      }
                    >
                      All Reports
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/trial_balance" &&
                    <Helmet>
                      <title>{`GBSC | Trial Balance`}</title>
                    </Helmet>}
                    <a href="/trial_balance"
                      // onClick={this.routedChange.bind(this, "trial_balance")}
                      className={
                        this.state.currentLocation == "/trial_balance"
                          ? "active"
                          : ""
                      }
                    >
                      Trial Balance
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/sequence_check" &&
                    <Helmet>
                      <title>{`GBSC | Sequence Check`}</title>
                    </Helmet>}
                    <a href="/sequence_check"
                      // onClick={this.routedChange.bind(this, "sequence_check")}
                      className={
                        this.state.currentLocation == "/sequence_check"
                          ? "active"
                          : ""
                      }
                    >
                      Sequence Check
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/profit_loss_report" &&
                    <Helmet>
                      <title>{`GBSC | Profit & Loss`}</title>
                    </Helmet>}
                    <a href="/profit_loss_report"
                      // onClick={this.routedChange.bind(this, "profit_loss_report")}
                      className={
                        this.state.currentLocation == "/profit_loss_report"
                          ? "active"
                          : ""
                      }
                    >
                      Profit & Loss
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/balance_sheet" &&
                    <Helmet>
                      <title>{`GBSC | Balance Sheet`}</title>
                    </Helmet>}
                    <a href="/balance_sheet"
                      // onClick={this.routedChange.bind(this, "balance_sheet")}
                      className={
                        this.state.currentLocation == "/balance_sheet"
                          ? "active"
                          : ""
                      }
                    >
                      Balance Sheet
                    </a>
                  </li>
                ) : (
                  ""
                )}{" "}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/general_ledger" &&
                    <Helmet>
                      <title>{`GBSC | General Ledger`}</title>
                    </Helmet>}
                    <a href="/general_ledger"
                      // onClick={this.routedChange.bind(this, "general_ledger")}
                      className={
                        this.state.currentLocation == "/general_ledger"
                          ? "active"
                          : ""
                      }
                    >
                      General Ledger{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {/* setting side bar */}

                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/find_recode" &&
                    <Helmet>
                      <title>{`GBSC | Find And Recode `}</title>
                    </Helmet>}
                    <a onClick={this.routeedChange.bind(this, 'find_recode')} 
                      // onClick={this.routedChange.bind(this, "general_ledger")}
                      className={
                        this.state.currentLocation == "/find_recode"
                          ? "active"
                          : ""
                      }
                    >
                      Find &amp; Recode{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/home_currency_adjustment" &&
                    <Helmet>
                      <title>{`GBSC | Home Currency Adjustment`}</title>
                    </Helmet>}
                    <a href="/home_currency_adjustment" target="_blank"
                      // onClick={this.routedChange.bind(this, "home_currency_adjustment")}
                      className={
                        this.state.currentLocation == "/home_currency_adjustment"
                          ? "active"
                          : ""
                      }
                    >
                      Home Currency Adjustment{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/to_do" &&
                    <Helmet>
                      <title>{`GBSC | Todo`}</title>
                    </Helmet>}
                    <a href="/to_do" target="_blank"
                      // onClick={this.routedChange.bind(this, "to_do")}
                      className={
                        this.state.currentLocation == "/to_do"
                          ? "active"
                          : ""
                      }
                    >
                      Todo{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}


                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/manual_journal" &&
                    <Helmet>
                      <title>{`GBSC | Manual Journal`}</title>
                    </Helmet>}
                    <a href="/manual_journal" target="_blank"
                      // onClick={this.routedChange.bind(this, "manual_journal")}
                      className={
                        this.state.currentLocation == "/manual_journal"
                          ? "active"
                          : ""
                      }
                    >
                      Manual Journal{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}


                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/fixed_assests" &&
                    <Helmet>
                      <title>{`GBSC | Fixed Assets & Settings`}</title>
                    </Helmet>}
                    <a href="/fixed_assests" target="_blank"
                      // onClick={this.routedChange.bind(this, "fixed_assests")}
                      className={
                        this.state.currentLocation == "/fixed_assests"
                          ? "active"
                          : ""
                      }
                    >
                      Fixed Assets & Settings{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}


                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/chart" &&
                    <Helmet>
                      <title>{`GBSC | Chart of Accounts`}</title>
                    </Helmet>}
                    <a href="/chart" target="_blank"
                      // onClick={this.routedChange.bind(this, "chart")}
                      className={
                        this.state.currentLocation == "/chart"
                          ? "active"
                          : ""
                      }
                    >
                      Chart of Accounts{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}


                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/summary_added_type_items" &&
                    <Helmet>
                      <title>{`GBSC | Summary of Added Items`}</title>
                    </Helmet>}
                    <a href="/summary_added_type_items" target="_blank"
                      // onClick={this.routedChange.bind(this, "summary_added_type_items")}
                      className={
                        this.state.currentLocation == "/summary_added_type_items"
                          ? "active"
                          : ""
                      }
                    >
                      Summary of Added Items{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}


                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/history" &&
                    <Helmet>
                      <title>{`GBSC | History & Notes`}</title>
                    </Helmet>}
                    <a href="/history" target="_blank"
                      // onClick={this.routedChange.bind(this, "history")}
                      className={
                        this.state.currentLocation == "/history"
                          ? "active"
                          : ""
                      }
                    >
                      History & Notes{" "}
                    </a>
                  </li>
                ) : (
                  ""
                )}


                {/* settings side bar */}


                {this.state.role_permissions.includes(11) ? (
                  <li>
                    <span className="item-head">Customer</span>
                  </li>
                ) : null}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/open_invoice" &&
                    <Helmet>
                      <title>{`GBSC | Customer Open Invoice`}</title>
                    </Helmet>}
                    <a href="/open_invoice"
                      // onClick={this.routedChange.bind(this, "open_invoice")}
                      className={
                        this.state.currentLocation == "/open_invoice"
                          ? "active"
                          : ""
                      }
                    >
                      Customer Open Invoice
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/ar_aging_summary" &&
                    <Helmet>
                      <title>{`GBSC | Customer Aging Summary`}</title>
                    </Helmet>}
                    <a href="/ar_aging_summary"
                      // onClick={this.routedChange.bind(this, "ar_aging_summary")}
                      className={
                        this.state.currentLocation == "/ar_aging_summary"
                          ? "active"
                          : ""
                      }
                    >
                      Customer Aging Summary
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/customer_module" &&
                    <Helmet>
                      <title>{`GBSC | Customer Balance Detail`}</title>
                    </Helmet>}
                    <a href="/customer_module"
                      // onClick={this.routedChange.bind(this, "customer_module")}
                      className={
                        this.state.currentLocation == "/customer_module"
                          ? "active"
                          : ""
                      }
                    >
                      Customer Balance Detail
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/customer_balance_summary" &&
                    <Helmet>
                      <title>{`GBSC | Customer Balance Summary`}</title>
                    </Helmet>}
                    <a href="/customer_balance_summary"
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "customer_balance_summary"
                      // )}
                      className={
                        this.state.currentLocation == "/customer_balance_summary"
                          ? "active"
                          : ""
                      }
                    >
                      Customer Balance Summary
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {/* {roleid === "1" ? (
                      // <li><a onClick={this.routedChange.bind(this,'customer_balance_detail')} className={(this.state.currentLocation == '/customer_balance_detail' ? 'active' : '')}>Customer Balance Detail</a></li>
                      ) : ''} */}
                {this.state.role_permissions.includes(11) ? (
                  <li>
                    <span className="item-head">Vendor</span>
                  </li>
                ) : null}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/vendor_balance_detail" &&
                    <Helmet>
                      <title>{`GBSC | Vendor Balance Detail`}</title>
                    </Helmet>}
                    <a href="/vendor_balance_detail"
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "vendor_balance_detail"
                      // )}
                      className={
                        this.state.currentLocation == "/vendor_balance_detail"
                          ? "active"
                          : ""
                      }
                    >
                      Vendor Balance Detail
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/vendor_balance_summary" &&
                    <Helmet>
                      <title>{`GBSC | Vendor Balance Summary`}</title>
                    </Helmet>}
                    <a href="/vendor_balance_summary"
                      // onClick={this.routedChange.bind(
                      //   this,
                      //   "vendor_balance_summary"
                      // )}
                      className={
                        this.state.currentLocation == "/vendor_balance_summary"
                          ? "active"
                          : ""
                      }
                    >
                      Vendor Balance Summary
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/ap_aging_summary" &&
                    <Helmet>
                      <title>{`GBSC | Vendor Aging Summary`}</title>
                    </Helmet>}
                    <a href="/ap_aging_summary"
                      // onClick={this.routedChange.bind(this, "ap_aging_summary")}
                      className={
                        this.state.currentLocation == "/ap_aging_summary"
                          ? "active"
                          : ""
                      }
                    >
                      Vendor Aging Summary
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(11) ? (
                  <li>{this.state.currentLocation == "/unpaid_bills" &&
                    <Helmet>
                      <title>{`GBSC | Vendor Unpaid Bills`}</title>
                    </Helmet>}
                    <a href="/unpaid_bills"
                      // onClick={this.routedChange.bind(this, "unpaid_bills")}
                      className={
                        this.state.currentLocation == "/unpaid_bills"
                          ? "active"
                          : ""
                      }
                    >
                      Vendor Unpaid Bills
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.state.role_permissions.includes(26) ? (
                  <li>
                    <span className="item-head">Taxes</span>
                  </li>
                ) : null}
                {this.state.role_permissions.includes(26) ? (
                  <li>{this.state.currentLocation == "/GST_detail_report" &&
                    <Helmet>
                      <title>{`GBSC | GST Detail Report`}</title>
                    </Helmet>}
                    <a href="/GST_detail_report"
                      // onClick={this.routedChange.bind(this, "GST_detail_report")}
                      className={
                        this.state.currentLocation == "/GST_detail_report"
                          ? "active"
                          : ""
                      }
                    >
                      GST Detail Report
                    </a>
                  </li>
                ) : (
                  ""
                )}{" "}
                {this.state.role_permissions.includes(26) ? (
                  <li>{this.state.currentLocation == "/Gst_report_summary" &&
                    <Helmet>
                      <title>{`GBSC | GST Report Summary`}</title>
                    </Helmet>}
                    <a href="/Gst_report_summary"
                      // onClick={this.routedChange.bind(this, "Gst_report_summary")}
                      className={
                        this.state.currentLocation == "/Gst_report_summary"
                          ? "active"
                          : ""
                      }
                    >
                      GST Report Summary
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {this.state.role_permissions.includes(26) ? (
                  <li>{this.state.currentLocation == "/prior_sales_tax_return" &&
                    <Helmet>
                      <title>{`GBSC | Prior Sales Tax Return`}</title>
                    </Helmet>}
                    <a href="/prior_sales_tax_return"
                      // onClick={this.routedChange.bind(this, "prior_sales_tax_return")}
                      className={
                        this.state.currentLocation == "/prior_sales_tax_return"
                          ? "active"
                          : ""
                      }
                    >
                      Prior Sales Tax Return
                    </a>
                  </li>
                ) : (
                  ""
                )}






                {/* {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>General Ledger</a>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Balance Sheet</a>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Customers</a>
                  </li>
                ) : (
                  ''
                )} */}
                {/* {this.state.role_permissions.includes(17) ? (
                  <li>
                    <span className='item-head'>Documents</span>
                  </li>
                ) : (
                  ''
                )} */}
                {/* {this.state.role_permissions.includes(1) ? (
                  <li>
                    <a href="javascript:;" className="has-sub">
                      Lists
                    </a>
                    <ul className="list-unstyled sub-menu">
                      <li>
                        <a href="javascript:;">Chart of Accounts</a>
                      </li>
                      <li>
                        <a href="javascript:;">Item List</a>
                      </li>
                      <li>
                        <a href="javascript:;">Fixed Asset Item List</a>
                      </li>
                      <li>
                        <a href="javascript:;">Currency List</a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  ""
                )} */}
                {/* {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;' className='has-sub'>
                      Lists
                    </a>
                    <ul className='list-unstyled sub-menu'>
                      <li>
                        <a href='javascript:;'>Chart of Accounts</a>
                      </li>
                      <li>
                        <a href='javascript:;'>Item List</a>
                      </li>
                      <li>
                        <a href='javascript:;'>Fixed Asset Item List</a>
                      </li>
                      <li>
                        <a href='javascript:;'>Currency List</a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Accountant</a>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Company</a>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Sales Tax</a>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Vendors</a>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Employees</a>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Banking</a>
                  </li>
                ) : (
                  ''
                )}
  
                {this.state.role_permissions.includes(17) ? (
                  <li>
                    <a href='javascript:;'>Reports</a>
                  </li>
                ) : (
                  ''
                )} */}
              </ul>
            </div>
          </div>
          <div className="menu-close visible-xs">&nbsp;</div>
        </div>
      );
    }

  }
}
export default left_sidebar;
