import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery';
import Category from "./categoryadd"
import "./preference.css"

import Comma from './../components/comma'


export default class Sales extends React.Component {
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
      estimate_prefix: '',
      estimate_next_no: "",
      estimate_expiry_date: "",
      estimate_expiry_month: 'of the current month',
      estimate_thanking_message: '',
      estimate_terms: "",
      invoice_prefix: '',
      invoice_next_no: "",
      invoice_due_date: '',
      invoice_expiry_month: 'of the current month',
      invoice_thanking_message: '',
      invoice_terms: '',
      sales_order_prefix: "",
      sales_next_no: "",
      sales_thanking_message: "",
      sales_terms: "",
      credit_memo_prefix: "",
      credit_thanking_message: "",
      credit_terms: "",
      purchase_order_prefix: "",
      purchase_next_no: '',
      purchase_thanking_message: "",
      purchase_terms: "",
      statement_prefix: "",
      prefix: "",
      statement_next_no: "",
      statement_thanking_message: "",
      statement_terms: "",
      journal_prefix: '',
      journal_next_no: "",
      add: [""],
      display: "none",
      displayEdit: "none",
      pageSelected: "Services",
      estimate_edit: false,
      invoice_edit: false,
      order_edit: false,
      credit_edit: false,
      purchase_edit: false,
      statement_edit: false,
      journal_edit: false,
      default_category_list: [],
      serviceList: [],
      poserviceList: [],
      item_name: "",
      item_descrption: '',
      item_categeory: '',
      item_rate: '',
      item_id: '',
      edit: false,
      item_fill: false,
      pop_desc: false,
      rate_fill: false,
      pop_cate: false,
      memo_next_no: '',
      selected_due_date: 1
    }
  };



  sales_default_due_date_terms = () => {

    FetchAllApi.sales_default_due_date_terms((err, response) => {
      if (response.status == 1) {
        this.setState({ sales_default_due_date_terms: response.list })
      } else {
        alert(response.message)
        this.setState({ sales_default_due_date_terms: [] })
      }
    })
  }

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
    this.sales_default_due_date_terms()
    this.getValues();
    this.defaultcategorylist_onchange();
    this.getItems();
    this.getPoItems();

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
  };

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  };

  overDueEdit = () => {
    this.setState({ displayEdit: "block" })
  };

  popUpChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  newFunc = () => {
    this.setState({
      item_name: "",
      item_descrption: '',
      item_categeory: '',
      item_rate: '',
      item_id: '',
      edit: false,
    })

  };

  selectedPage(page) {
    console.log(page)
    this.setState({ pageSelected: page })

  };

  overDue = () => {

    var checkBox = document.getElementById("myCheck")
    if (checkBox.checked == true) {
      this.setState({ display: "block" })
    } else {
      this.setState({ display: "none" })
    }
  };


  componentDidUpdate() {

    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy" });

  };

  overDueAdd = () => {
    let plus = this.state.add;
    plus.push("")
    this.setState({ add: plus })
  };

  change = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  };
  estimateExpiry(estimate) {
    this.setState({ estimate_expiry_month: estimate })
  };
  invoiceExpiry(invoice) {
    this.setState({ invoice_expiry_month: invoice })
  };

  editFunc = (serv) => {
    console.log(serv)
    this.setState({
      item_name: serv.item_name,
      item_descrption: serv.description,
      item_categeory: serv.account_name_category,
      item_rate: serv.rate,
      item_id: serv.item_id,
      edit: true
    })
    jQuery("#item_categeory").val(serv.account_name_category).trigger("chosen:updated");
    jQuery("#hiddenCategID").val(serv.account_name_category).trigger("chosen:updated");

  }

  getValues = () => {
    let client_id = this.state.logged_client_id
    FetchAllApi.settings_sales_estimate(client_id, (err, response) => {

      if (response.status === 1) {
        if (response.data.length == 1) {
          this.setState({
            estimate_prefix: response.data[0].estmate_prefix,
            estimate_next_no: response.data[0].next_no,
            estimate_expiry_date: response.data[0].estimate_expiry_date,
            estimate_expiry_month: 'of the current month',
            estimate_thanking_message: response.data[0].thanking_message,
            estimate_terms: response.data[0].terms_conditions,
            estimate_edit: true
          })
        } else if (response.data.length == 0) {
          this.setState({ estimate_edit: false })
        }
      }
    });

    FetchAllApi.settings_sales_invoice(client_id, (err, response) => {

      if (response.status === 1) {
        if (response.data.length == 1) {
          this.setState({
            invoice_prefix: response.data[0].invoice_prefix,
            invoice_next_no: response.data[0].next_no,
            invoice_due_date: response.data[0].invoice_default_due_date,
            invoice_expiry_month: 'of the current month',
            invoice_thanking_message: response.data[0].thanking_message,
            invoice_terms: response.data[0].terms_conditions,
            invoice_edit: true,
            selected_due_date: response.data[0].invoice_default_due_date,
          })
        } else if (response.data.length == 0) {
          this.setState({ invoice_edit: false })
        }
      }
    });

    FetchAllApi.settings_sales_order(client_id, (err, response) => {

      if (response.status === 1) {
        if (response.data.length == 1) {
          this.setState({
            sales_order_prefix: response.data[0].sales_order_prefix,
            sales_next_no: response.data[0].next_no,
            sales_thanking_message: response.data[0].thanking_message,
            sales_terms: response.data[0].terms_conditions,
            order_edit: true
          })
        } else if (response.data.length == 0) {
          this.setState({ order_edit: false })
        }
      }
    });


    FetchAllApi.settings_sales_credit(client_id, (err, response) => {

      if (response.status === 1) {
        if (response.data.length == 1) {
          this.setState({
            credit_memo_prefix: response.data[0].credit_max_prfix,
            memo_next_no: response.data[0].next_no,
            credit_thanking_message: response.data[0].thanking_message,
            credit_terms: response.data[0].terms_conditions,
            credit_edit: true
          })
        } else if (response.data.length == 0) {
          this.setState({ credit_edit: false })
        }
      }
    });


    FetchAllApi.settings_sales_purchase(client_id, (err, response) => {

      if (response.status === 1) {
        if (response.data.length == 1) {
          this.setState({
            purchase_order_prefix: response.data[0].purchase_order_prefix,
            purchase_next_no: response.data[0].next_no,
            purchase_thanking_message: response.data[0].thanking_message,
            purchase_terms: response.data[0].terms_conditions,
            purchase_edit: true
          })
        } else if (response.data.length == 0) {
          this.setState({ purchase_edit: false })
        }
      }
    });


    FetchAllApi.settings_sales_statement(client_id, (err, response) => {

      if (response.status === 1) {
        if (response.data.length == 1) {
          this.setState({
            statement_prefix: response.data[0].statement_prefix,
            statement_next_no: response.data[0].next_no,
            statement_thanking_message: response.data[0].thanking_message,
            statement_terms: response.data[0].terms_conditions,
            statement_edit: true
          })
        } else if (response.data.length == 0) {
          this.setState({ statement_edit: false })
        }
      }
    });


    FetchAllApi.settings_sales_journal(client_id, (err, response) => {

      if (response.status === 1) {
        if (response.data.length == 1) {
          this.setState({
            journal_prefix: response.data[0].manual_gerenal_prefix,
            journal_next_no: response.data[0].next_no,
            journal_edit: true
          })
        } else if (response.data.length == 0) {
          this.setState({ journal_edit: false })
        }
      }
    });

  };




  save = () => {

    let client_id = this.state.logged_client_id
    if (this.state.pageSelected == "Estimate") {
      let estimate = {
        client_id: client_id,
        estmate_prefix: this.state.estimate_prefix,
        next_no: this.state.estimate_next_no,
        estimate_expiry_date: this.state.estimate_expiry_date,
        estimate_expiry_month: this.state.estimate_expiry_month,
        thanking_message: this.state.estimate_thanking_message,
        terms_conditions: this.state.estimate_terms,
      }
      if (this.state.estimate_edit == false) {
        FetchAllApi.create_sales_estimate(estimate, (err, response) => {
          if (response.status === 1) {
            alert("Quotation Updated successfully")
          }
        })
      } else {

        FetchAllApi.create_sales_estimate_edit(estimate, (err, response) => {
          if (response.status === 1) {
            alert("Quotation Edited successfully")
          }
        })
      };
    } else if (this.state.pageSelected == "Invoice") {
      let invoice = {
        client_id: client_id,
        invoice_prefix: this.state.invoice_prefix,
        next_no: this.state.invoice_next_no,
        invoice_default_due_date: this.state.selected_due_date,
        invoice_expiry_month: this.state,
        thanking_message: this.state.invoice_thanking_message,
        terms_conditions: this.state.invoice_terms,
      }

      if (this.state.invoice_edit == false) {
        FetchAllApi.create_sales_invoice1(invoice, (err, response) => {
          if (response.status === 1) {
            alert("Invoice Updated successfully")
          }
        })
      } else {

        FetchAllApi.create_sales_invoice1_edit(invoice, (err, response) => {
          if (response.status === 1) {
            alert("Invoice Edited successfully")
          }
        })
      };
    } else if (this.state.pageSelected == "Sales Order") {
      let sales_order = {
        client_id: client_id,
        sales_order_prefix: this.state.sales_order_prefix,
        next_no: this.state.sales_next_no,
        thanking_message: this.state.sales_thanking_message,
        terms_conditions: this.state.sales_terms
      }
      if (this.state.order_edit == false) {
        FetchAllApi.create_sales_order(sales_order, (err, response) => {
          if (response.status === 1) {
            alert("SalesOrder Updated successfully")

          }
        })
      } else {
        FetchAllApi.create_sales_order_edit(sales_order, (err, response) => {
          if (response.status === 1) {
            alert("SalesOrder edited successfully")

          }
        });
      }
    } else if (this.state.pageSelected == "Credit Memo") {

      let credit = {
        client_id: client_id,
        credit_max_prfix: this.state.credit_memo_prefix,
        next_no: this.state.memo_next_no,
        thanking_message: this.state.credit_thanking_message,
        terms_conditions: this.state.credit_terms
      }

      if (this.state.credit_edit == false) {
        FetchAllApi.create_sales_credit(credit, (err, response) => {
          if (response.status === 1) {
            alert("salescredit Updated successfully")

          }
        })
      } else {
        FetchAllApi.create_sales_credit_edit(credit, (err, response) => {
          if (response.status === 1) {
            alert("salescredit edited successfully")

          }
        })
      }

    } else if (this.state.pageSelected == "Purchase Order") {
      let purchase = {
        client_id: client_id,
        purchase_order_prefix: this.state.purchase_order_prefix,
        next_no: this.state.purchase_next_no,
        thanking_message: this.state.purchase_thanking_message,
        terms_conditions: this.state.purchase_terms
      }

      if (this.state.purchase_edit == false) {
        FetchAllApi.create_sales_purchase(purchase, (err, response) => {
          if (response.status === 1) {
            alert("sales purchase updated successfully")
          }
        })
      } else {
        FetchAllApi.create_sales_purchase_edit(purchase, (err, response) => {
          if (response.status === 1) {
            alert("sales purchase edited successfully")

          }
        })
      }

    } else if (this.state.pageSelected == "Statements") {
      let statement = {
        client_id: client_id,
        statement_prefix: this.state.statement_prefix,
        next_no: this.state.statement_next_no,
        thanking_message: this.state.statement_thanking_message,
        terms_conditions: this.state.statement_terms
      }

      if (this.state.statement_edit == false) {
        FetchAllApi.create_sales_statement(statement, (err, response) => {
          if (response.status === 1) {
            alert("statement updated successfully")

          }
        })
      } else {

        FetchAllApi.create_sales_statement_edit(statement, (err, response) => {
          if (response.status === 1) {
            alert("statement edited successfully")

          }
        })
      }

    } else if (this.state.pageSelected == "Manual Journal") {
      let journal = {
        client_id: client_id,
        manual_gerenal_prefix: this.state.journal_prefix,
        next_no: this.state.journal_next_no,
      }

      if (this.state.journal_edit == false) {
        FetchAllApi.create_sales_journal(journal, (err, response) => {
          if (response.status === 1) {
            alert("Manual journal updated successfully")

          }
        })
      } else {

        FetchAllApi.create_sales_journal_edit(journal, (err, response) => {
          if (response.status === 1) {
            alert("Manual journal edited successfully")
          }
        });

      }
    }

  };


  defaultcategorylist_onchange = (x, y) => {
    let keyy = "";
    let from_create_invoice = 1;
    var client_id = this.state.logged_client_id;

    FetchAllApi.defaultcategorylist_onchange2(
      keyy,
      from_create_invoice,
      client_id,
      (err, response) => {
        if (response.status === 1) {
          if (x == "added") {
            this.setState({
              selectNeedIndex: response.list.length - 1,
              nameFilter: y,
            });
          }
          this.setState(
            {
              default_category_list: response.list,
            },
            () => {
              window.jQuery("#categry_id0").selectpicker("refresh");
            }
          );
        } else {
          this.setState({
            default_category_list: [],
          });
        }
      }
    );
  };

  getItems = (text, id) => {
    var client_id = this.state.logged_client_id;
    let from_settings = 1
    FetchAllApi.sales_product_item_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ serviceList: response.list });
      }
    });
  };

  getPoItems = (text, id) => {
    var client_id = this.state.logged_client_id;
    let from_settings = 1
    FetchAllApi.purchase_product_item_list(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ poserviceList: response.list });
      }
    });
  };


  deleteServiceItem = (id, status) => {
    var client_id = this.state.logged_client_id;
    let item_id = id
    let action = status
    let input;
    if (action == 0) {
      input = {
        client_id: client_id,
        item_id: item_id,
        status: 0
      }
    } else if (action == 1) {
      input = {
        client_id: client_id,
        item_id: item_id,
        status: 2
      }
    } else {
      input = {
        client_id: client_id,
        item_id: item_id,
        status: 1
      }
    }
    FetchAllApi.service_item_delete(input, (err, response) => {
      if (response.status === 1) {
        if (action == 0) {
          alert("Item deleted successfully")
          window.location.reload(true)
        } else if (action == 1) {
          alert("Item status change successfully")
          window.location.reload(true)
        } else {
          alert("Item status change successfully")
          window.location.reload(true)
        }
      }
    });
  };

  deletePOServiceItem = (e, status) => {
    var client_id = this.state.logged_client_id;
    let item = e
    let action = status
    let input;
    if (action == 0) {
      input = {
        client_id: client_id,
        item_id: item.item_id,
        item_name: item.item_name,
        category_id: item.account_name_category,
        rate: item.rate,
        description: item.descrption,
        status: 0
      }
    } else if (action == 1) {
      input = {
        client_id: client_id,
        item_id: item.item_id,
        item_name: item.item_name,
        category_id: item.account_name_category,
        rate: item.rate,
        description: item.descrption,
        status: 2
      }
    } else {
      input = {
        client_id: client_id,
        item_id: item.item_id,
        item_name: item.item_name,
        category_id: item.account_name_category,
        rate: item.rate,
        description: item.descrption,
        status: 1
      }
    }
    FetchAllApi.edit_purchase_product_item(input, (err, response) => {
      if (response.status === 1) {
        if (action == 0) {
          alert("Item deleted successfully")
          this.getPoItems();
        } else if (action == 1) {
          alert("Item status change successfully")
          this.getPoItems();
        } else {
          alert("Item status change successfully")
          this.getPoItems();
        }
      }
    });
  };


  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    // console.log("letme", this.state.selected_due_date)
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
            <Sidebar pageSubmit={e => this.pageLink(e)} />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Sales</h3>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <ul className="nav nav-pills transparent nowrap ofx-auto">
                    <li class="active"><a data-toggle="pill" onClick={() => { this.selectedPage("Services") }} href="#services">Services</a></li>
                    <li><a data-toggle="pill" onClick={() => { this.selectedPage("Estimate") }} href="#estimate">Quotation</a></li>
                    <li><a data-toggle="pill" href="#invoice" onClick={() => { this.selectedPage("Invoice") }}>Invoice</a></li>
                    <li><a data-toggle="pill" href="#sales-order" onClick={() => { this.selectedPage("Sales Order") }}>Sales Order</a></li>
                    <li><a data-toggle="pill" href="#credit-memo" onClick={() => { this.selectedPage("Credit Memo") }}>Credit Memo</a></li>
                    {/* <li><a data-toggle="pill" href="#purchase-order" onClick={()=>{this.selectedPage("Purchase Order")}}>Purchase Order</a></li>
                    <li><a data-toggle="pill" onClick={()=>{this.selectedPage("poservices")}} href="#poservices">Purchase Order Services</a></li> */}
                    {/* <li><a data-toggle="pill" href="#statement" onClick={()=>{this.selectedPage("Statements")}}>Statements</a></li> */}
                  </ul>
                </div>

                <div className="row tab-content mar-top pad-top">
                  <div id="services" className="col-md-12 tab-pane fade active in pad-no">
                    <div className="col-md-12 col-xs-12 pad-no">
                      <div className="pills-search">
                        <div>
                          <button className="btn btn-blue add-new" data-toggle="modal" data-target="#add_items" onClick={this.newFunc}>
                            <img className="filter-white" src="images/plus-add.svg" alt="icon" />
                            Add New Item
                          </button>
                          {/* <div className="dib">
                            <div className="dropdown menu-item">
                              <button className="btn btn-blue dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false">Export<span className="caret" /></button>
                              <ul className="dropdown-menu align-right">
                                <li><a href="javascript:;">Export as Excel</a></li>
                                <li><a href="javascript:;">Export as PDF</a></li>
                              </ul>
                            </div>
                          </div> */}
                        </div>
                        {/* <form className="custom-form h-small mar-b-no">
                          <div className="form-group search-box mar-no">
                            <input type="text" name="search" className="form-control" placeholder="Search..." />
                          </div>
                        </form> */}
                      </div>
                    </div>
                    {this.state.serviceList.length == 0 ? (
                      <div className="col-md-12 tab-pane fade in pad-no">
                        <div className="landing-wrap">
                          <div className="img-concept text-center">
                            <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                            <p>Looks like there's no data</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="report-table reconcile-table col-md-12 col-xs-12 pad-no">
                        <div className="table-responsive">
                          <table className="table detail-report">
                            <thead>
                              <tr>
                                <th>
                                  <label className="custom-checkbox small">
                                    <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                  </label>
                                </th>
                                <th>Name</th>
                                <th>Description</th>
                                <th className="text-right">Rate</th>
                                <th>Category</th>
                                <td><span className="sr-only">Action</span></td>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.serviceList.map((serv, idx) => {
                                return (
                                  <tr>
                                    <td>
                                      <label className="custom-checkbox small">
                                        <input type="checkbox" name="all" />&nbsp;
                                  <span className="checkmark" />
                                      </label>
                                    </td>
                                    <td>{serv.item_name}</td>
                                    <td>{serv.description}</td>
                                    <td className="text-right"><Comma value={serv.rate} /></td>
                                    <td>{this.state.default_category_list.map((cat) => {
                                      if (cat.id === serv.account_name_category) {
                                        return cat.name
                                      }
                                    })}</td>
                                    <td className="text-right">
                                      <div className="dropdown menu-item new-cus">
                                        <button className="btn btn-green dropdown-toggle" type="button" data-toggle="dropdown">Action
                                    <span className="caret" /></button>
                                        <ul className="dropdown-menu align-right">
                                          <li><a href="javascript:;" data-toggle="modal" data-target="#add_items" onClick={() => { this.editFunc(serv) }}>Edit</a></li>
                                          <li><a href="javascript:;" onClick={() => { this.deleteServiceItem(serv.item_id, 0) }}>Delete</a></li>
                                          <li><a href="javascript:;" onClick={() => { this.deleteServiceItem(serv.item_id, serv.status) }}>Inactive</a></li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                  <div id="estimate" className="col-md-12 tab-pane fade in pad-no">
                    <form className="custom-form col-lg-4 col-md-8">
                      <div className="row">
                        <div className="form-group">
                          <div className="input-group half-input">
                            <div>
                              <label>Quotation Prefix</label>
                              <input type="text" className="form-control" name="estimate_prefix" value={this.state.estimate_prefix} onChange={this.change} />
                            </div>
                            <div>
                              <label>Next No#</label>
                              <input type="text" className="form-control" name="estimate_next_no" value={this.state.estimate_next_no} onChange={this.change} />
                            </div>
                          </div>
                        </div>
                        {/* <div className="form-group">
                          <div className="input-group half-input">
                            <div>
                              <label>Estimate Expiry Date</label>
                              <input type="text" className="form-control" name="estimate_expiry_date" data-provide="datepicker" data-date-format="dd/mm/yyyy" value={this.state.estimate_expiry_date} onBlur={this.change} placeholder="Due" />
                            </div>
                            <div>
                              <label className="label-invisible">Due</label>
                              <div className="custom-select-drop dropdown">
                                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                                  <span id="selected">{this.state.estimate_expiry_month} </span><span className="caret" />
                                </a>
                                <ul className="dropdown-menu">
                                  <li className="active"><a href="javascript:;" onClick={()=>this.estimateExpiry("of the current month")}>of the current month</a></li>
                                  <li><a href="javascript:;" onClick={()=>this.estimateExpiry("of the next month")} >of the next month</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="form-group">
                          <label>Thank you message and Banking details</label>
                          <textarea className="form-control" cols={10} rows={6} name="estimate_thanking_message" value={this.state.estimate_thanking_message} onChange={this.change} />
                        </div>
                        <div className="form-group">
                          <label>Terms &amp; Conditions</label>
                          <textarea className="form-control" cols={10} rows={6} name="estimate_terms" value={this.state.estimate_terms} onChange={this.change} />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div id="invoice" className="col-md-12 tab-pane fade in pad-no">
                    <form className="custom-form col-lg-4 col-md-8">
                      <div className="row">
                        <div className="form-group">
                          <div className="input-group half-input">
                            <div>
                              <label>Invoice Prefix</label>
                              <input type="text" className="form-control" name="invoice_prefix" value={this.state.invoice_prefix} onChange={this.change} />
                            </div>
                            <div>
                              <label>Next No#</label>
                              <input type="text" className="form-control" name="invoice_next_no" value={this.state.invoice_next_no} onChange={this.change} />
                            </div>
                          </div>
                        </div>



                        <div className="form-group">
                          {/* <label>Entity Type<span className="astrick">*</span></label> */}
                          <div className="custom-select-drop dropdown">
                            <select
                              className="selectpicker form-control hh "
                              data-live-search="true"
                              value={this.state.selected_due_date}
                              onChange={(e) => this.setState({ selected_due_date: e.target.value })}
                              title="Choose..."
                              required>
                              {
                                this.state.sales_default_due_date_terms && this.state.sales_default_due_date_terms.map((t, index) => {
                                  return (
                                    <option value={t.id} >{t.name}</option>
                                  )
                                })
                              }
                            </select>
                          </div>

                        </div>


                        {/* <div className="form-group">
                          <div className="input-group ">
                            <div>
                              <label className="label-nowrap">Invoice Default Due Date</label>
                              <input type="text"  className="form-control" name="invoice_due_date" data-provide="datepicker" data-date-format="dd/mm/yyyy" value={this.state.invoice_due_date} onBlur={this.change} placeholder="Due" />
                            </div>
                            <div>
                              <label className="label-invisible">Due</label>
                              <div className="custom-select-drop dropdown">
                                <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                                  <span id="selected">{this.state.invoice_expiry_month} </span><span className="caret" />
                                </a>
                                <ul className="dropdown-menu">
                                  <li className="active"><a href="javascript:;" onClick={() => this.invoiceExpiry("of the current month")}>of the current month</a></li>
                                  <li><a href="javascript:;" onClick={() => this.invoiceExpiry("of the next month")}>of the next month</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="form-group">
                          <label>Thank you message and Banking details</label>
                          <textarea className="form-control" cols={10} rows={6} onChange={this.change} value={this.state.invoice_thanking_message} name="invoice_thanking_message" />
                        </div>
                        <div className="form-group">
                          <label>Terms &amp; Conditions</label>
                          <textarea className="form-control" cols={10} rows={6} onChange={this.change} value={this.state.invoice_terms} name="invoice_terms" />
                        </div>
                      </div>
                    </form>
                    {/* <div className="invoice-reminder-sec col-md-12">
                      <span className="editor-label">
                        <label className="switch">
                          <input type="checkbox" id="myCheck" onClick={this.overDue} />
                          <span className="drag-ball">
                            <span className="off" />
                            <span className="on" />
                          </span>
                        </label>
                        <span className="form-label">Invoice Reminder</span>
                      </span>
                      <div style={{display:this.state.display}}>
                      <p className="fs-13 fw-med">Email customers when an invoice is...</p>
                      
                      <div className="due-block-encl">
                      {this.state.add.map(()=>{
                        return(
                        <div className="due-block">
                          {this.state.displayEdit=="none"?
                          (
                          <input type="text"  className="form-control amount-under" name style={{display:"none"}} />
                          ):(<input type="text"  className="form-control amount-under" name style={{display:"block"}} />)}
                        
                          <a href="javascript:;" className="edit-icon">
                          
                            <img src="images/pencil-icon.svg" alt="icon" onClick={this.overDueEdit} />
                          </a>
                          <div>
                          <span>07</span>days overdue
                          </div>
              
                      
                        </div>
                        )})}
                      
                        <div className="new-due" onClick={this.overDueAdd}>
                          <img src="images/plus-add.svg"  alt="icon" />
                        </div>
                      </div>
                      <div className="form-group mar-b-no">
                        <label className="custom-checkbox small">
                          <input type="radio" name="mail-address" defaultChecked="checked" />
                          Include quick link to online invoice and detail summary
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="form-group mar-b-no">
                        <label className="custom-checkbox small">
                          <input type="radio" name="mail-address" defaultChecked="checked" />
                          Include a link to the invoice PDF
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="custom-checkbox small">
                          <input type="radio" name="mail-address" defaultChecked="checked" />
                          Don't send reminders for amounts owing on an invoice under
                          <span className="checkmark" />
                        </label>
                        <input type="text" className="form-control amount-under" name defaultValue={1.00} />
                      </div>
                      <p className="fs-13 fw-med mar-top mar-b-no"><em>Send replies to johndoe908@gmail.com</em></p>
                    </div>
                  </div> */}
                  </div>
                  <div id="sales-order" className="col-md-12 tab-pane fade in pad-no">
                    <form className="custom-form col-lg-4 col-md-8">
                      <div className="row">
                        <div className="form-group">
                          <div className="input-group half-input">
                            <div>
                              <label>Sales Order Prefix</label>
                              <input type="text" className="form-control" name="sales_order_prefix" onChange={this.change} value={this.state.sales_order_prefix} />
                            </div>
                            <div>
                              <label>Next No#</label>
                              <input type="text" className="form-control" name="sales_next_no" onChange={this.change} value={this.state.sales_next_no} />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Thank you message and Banking details</label>
                          <textarea className="form-control" cols={10} rows={6} defaultValue={""} name='sales_thanking_message' onChange={this.change} value={this.state.sales_thanking_message} />
                        </div>
                        <div className="form-group">
                          <label>Terms &amp; Conditions</label>
                          <textarea className="form-control" cols={10} rows={6} defaultValue={""} name="sales_terms" onChange={this.change} value={this.state.sales_terms} />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div id="credit-memo" className="col-md-12 tab-pane fade in pad-no">
                    <form className="custom-form col-lg-4 col-md-8">
                      <div className="row">
                        <div className="form-group">
                          <div className="input-group half-input">
                            <div>
                              <label>Credit Memo Prefix</label>
                              <input type="text" className="form-control" name="credit_memo_prefix" onChange={this.change} value={this.state.credit_memo_prefix} />
                            </div>
                            <div>
                              <label>Next No#</label>
                              <input type="text" className="form-control" name="memo_next_no" onChange={this.change} value={this.state.memo_next_no} />
                              {/* <input type="text" className="form-control" name="credit_memo_prefix" value={this.state.credit_memo_prefix} onChange={this.change} defaultValue="CM-" /> */}
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Thank you message and Banking details</label>
                            <textarea className="form-control" cols={10} rows={6} defaultValue={""} name="credit_thanking_message" value={this.state.credit_thanking_message} onChange={this.change} />
                          </div>
                          <div className="form-group">
                            <label>Terms &amp; Conditions</label>
                            <textarea className="form-control" cols={10} rows={6} defaultValue={""} name="credit_terms" value={this.state.credit_terms} onChange={this.change} />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* <div id="statement" className="col-md-12 tab-pane fade in pad-no">
                    <form className="custom-form col-lg-4 col-md-8">
                      <div className="row">
                        <div className="form-group">
                          <div className="input-group half-input">
                            <div className="no-edit">
                              <label className="label-nowrap">Statement Prefix</label>
                              <input type="text" className="form-control" name="statement_prefix" value={this.state.statement_prefix} onChange={this.change} defaultValue="[Company Short Code]" />
                            </div>
                            <div>
                              <label className="label-invisible">Prefix</label>
                              <input type="text" className="form-control"  defaultValue="STO-" name="prefix" value={this.state.prefix} onChange={this.change} />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="label-nowrap">Statement Next No#</label>
                          <input type="text" className="form-control" name="statement_next_no" value={this.state.statement_next_no} onChange={this.change}  />
                        </div>
                        <div className="form-group">
                          <label>Thanking Message</label>
                          <textarea className="form-control" cols={10} rows={6} defaultValue={""} name="statement_thanking_message" value={this.state.statement_thanking_message} onChange={this.change} />
                        </div>
                        <div className="form-group">
                          <label>Terms &amp; Conditions</label>
                          <textarea className="form-control" cols={10} rows={6} defaultValue={""} name="statement_terms" value={this.state.statement_terms} onChange={this.change} />
                        </div>
                      </div>
                    </form>
                  </div> */}

                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          {this.state.pageSelected == "Services" ? (
            null
          ) : (
            <div className="pf-btm-wrap bg-sticky">
              <div className="col-md-12 text-right pad-no">
                <button className="btn btn-lightgray mar-rgt-5" onClick={() => { this.props.history.push('/loading', ['/preference_sales']) }}>Cancel</button>
                <button className="btn btn-green mar-rgt-5" onClick={this.save}>Save</button>
              </div>
            </div>
          )}
          {/* pf-btm-wrap Ends here */}
          <div className="modal fade pop-modal" id="add_items" role="dialog">
            <div className="modal-dialog modal-md custom-modal">
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
                onClick={() => {
                  jQuery("#item_categeory option")
                    .prop("selected", false)
                    .trigger("change");
                  jQuery("#item_text").val("");
                  jQuery("#item_rate").val("");
                  jQuery("#hiddenCategID").val("");
                  jQuery("#item_descrption").val("");
                }}
              >
                <img
                  className="img-responsive"
                  src="../../images/close-red.svg"
                  alt="icon"
                />
              </button>
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h3>Add New Items</h3>
                  <form className="custom-form row">
                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Item Name<span className="astrick">*</span></label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          id="item_text"
                          name="item_name"
                          value={this.state.item_name}
                          onChange={this.popUpChange}
                        />
                        <div style={{ float: "left" }}>
                          {this.state.item_fill == true ? (
                            <small style={{ color: "red" }}>*Required.</small>
                          ) : null}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Rate<span className="astrick">*</span></label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          id="item_rate"
                          name="item_rate"
                          value={this.state.item_rate}
                          onChange={this.popUpChange}
                        />
                        <input
                          type="hidden"
                          className="form-control"
                          id="iamfrom"
                        />
                        <div style={{ float: "left" }}>
                          {this.state.rate_fill == true ? (
                            <small style={{ color: "red" }}>*Required.</small>
                          ) : (null)}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Description<span className="astrick">*</span></label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <textarea
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          id="item_descrption"
                          name="item_descrption"
                          onChange={this.popUpChange}
                          value={this.state.item_descrption}
                        />
                        <div style={{ float: "left" }}>
                          {this.state.pop_desc == true ? (
                            <small style={{ color: "red" }}>*Required.</small>
                          ) : null}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>category<span className="astrick">*</span></label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <select
                          className="selectpicker form-control add-new kk"
                          data-live-search="true"
                          title="Choose Category"
                          id="item_categeory"
                          onChange={(e) => {
                            if (e.target.value == "1e") {
                              window.jQuery("#pop-modal").modal("show");
                            } else {
                              jQuery("#hiddenCategID").val(e.target.value);
                            }
                          }}
                        >
                          <option value="1e">Create New </option>
                          {this.state.default_category_list &&
                            this.state.default_category_list.map((item, k) => {
                              var usee = item.name;
                              if (usee.includes(this.state.nameFilter)) {
                                // alert(this.state.nameFilter)
                                var selected = true;
                                jQuery("#hiddenCategID").val(item.id);

                                // jQuery('.kk').val(item.id)
                              }

                              // if(this.state.selectNeedIndex==k){
                              //    var usee=item.name

                              //   // jQuery('.kk').val(item.id)
                              //   // setTimeout(()=>{
                              //     // jQuery('#item_categeory').val(item.id)
                              //   // },3000)

                              //   if(this.state.selectNeedIndex !='empty'){
                              //     this.setState({selectNeedIndex:'empty'})

                              //   }
                              // }else{
                              //   var selected=false

                              // }
                              return (
                                <option
                                  selected={selected}
                                  value={item.id}
                                  data-status={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                        <input
                          autoComplete="off"
                          type="hidden"
                          className="form-control"
                          id="hiddenCategID"
                          placeholder="Enter new item"
                        />
                        <div style={{ float: "left" }}>
                          {this.state.pop_cate == true ? (
                            <small style={{ color: "red" }}>*Required.</small>
                          ) : null}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                      <button
                        className="btn btn-lightgray"
                        data-dismiss="modal"
                        onClick={() => {
                          this.setState({ roleStringLen: false });
                          jQuery("#item_categeory option")
                            .prop("selected", false)
                            .trigger("change");

                          jQuery("#item_text").val("");
                          jQuery("#item_rate").val("");
                          jQuery("#hiddenCategID").val("");
                          jQuery("#item_descrption").val("");
                        }}
                      >
                        Cancel
                      </button>
                      <span>{"   "}</span>
                      <input type="hidden" id="colid" />

                      <button
                        className="btn btn-green"
                        type="button"
                        onClick={() => {
                          const item = jQuery("#item_text").val();

                          if (item == "" || item == null || item == undefined) {
                            this.setState({ item_fill: true })
                          } else {
                            this.setState({ item_fill: false })
                          };

                          const item_descrption = jQuery(
                            "#item_descrption"
                          ).val();

                          if (item_descrption == "" || item_descrption == null || item_descrption == undefined) {
                            this.setState({ pop_desc: true })
                          } else {
                            this.setState({ pop_desc: false })
                          };

                          const item_rate = jQuery("#item_rate").val();
                          if (item_rate == "" || item_rate == null || item_rate == undefined) {
                            this.setState({ rate_fill: true })
                          } else {
                            this.setState({ rate_fill: false })
                          };
                          const item_categeory = jQuery("#hiddenCategID").val();

                          if (item_categeory == "" || item_categeory == null || item_categeory == undefined) {
                            this.setState({ pop_cate: true })
                          } else {
                            this.setState({ pop_cate: false })
                          };
                          // const item_categeory_id=jQuery("#item_categeory").val()
                          // if(item_categeory_id =="" || item_categeory_id == null || item_categeory_id == undefined){
                          //   this.setState({pop_cate:true})
                          // }else{
                          //   this.setState({pop_cate:false})
                          // };

                          var coreData = {
                            client_id: this.state.logged_client_id,
                            item_name: item,
                            category_id: item_categeory,
                            rate: item_rate,
                            description: item_descrption,
                          };
                          console.log("nor", coreData)

                          var editCoreDate = {
                            client_id: this.state.logged_client_id,
                            item_name: item,
                            category_id: item_categeory,
                            rate: item_rate,
                            description: item_descrption,
                            status: 1,
                            item_id: this.state.item_id,
                          }

                          if (this.state.item_fill == false && this.state.pop_desc == false && this.state.rate_fill == false && this.state.pop_cate == false) {
                            if (this.state.edit == true) {
                              FetchAllApi.editServiceItems(editCoreDate, (err, response) => {
                                console.log("vendor_names", response);

                                if (response.status === 1) {
                                  this.getItems(
                                    jQuery("#item_text").val(),
                                    jQuery("#iamfrom").val()
                                  );

                                  alert("success");
                                  this.setState({ roleStringLen: false });
                                  jQuery("#item_categeory option")
                                    .prop("selected", false)
                                    .trigger("change");

                                  jQuery("#item_text").val("");
                                  jQuery("#item_rate").val("");
                                  jQuery("#hiddenCategID").val("");
                                  jQuery("#item_descrption").val("");
                                  window.jQuery("#add_items").modal("hide");
                                } else {
                                  alert(response.message)
                                }
                              });

                            } else {
                              FetchAllApi.addItems(coreData, (err, response) => {
                                console.log("vendor_names", response);

                                if (response.status === 1) {
                                  this.getItems(
                                    jQuery("#item_text").val(),
                                    jQuery("#iamfrom").val()
                                  );

                                  alert("success");
                                  this.setState({ roleStringLen: false });
                                  jQuery("#item_categeory option")
                                    .prop("selected", false)
                                    .trigger("change");

                                  jQuery("#item_text").val("");
                                  jQuery("#item_rate").val("");
                                  jQuery("#hiddenCategID").val("");
                                  jQuery("#item_descrption").val("");
                                  window.jQuery("#add_items").modal("hide");
                                } else {
                                }
                              });
                            }
                          }
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade pop-modal" id="poadd_items" role="dialog">
            <div className="modal-dialog modal-md custom-modal">
              <button
                type="button"
                className="close hidden-xs"
                data-dismiss="modal"
                onClick={() => {
                  jQuery("#item_categeory option")
                    .prop("selected", false)
                    .trigger("change");
                  jQuery("#item_text").val("");
                  jQuery("#item_rate").val("");
                  jQuery("#hiddenCategID").val("");
                  jQuery("#item_descrption").val("");
                }}
              >
                <img
                  className="img-responsive"
                  src="../../images/close-red.svg"
                  alt="icon"
                />
              </button>
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h3>Add New Items</h3>
                  <form className="custom-form row">
                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Item Name<span className="astrick">*</span></label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          id="item_text"
                          name="item_name"
                          value={this.state.item_name}
                          onChange={this.popUpChange}
                        />
                        <div style={{ float: "left" }}>
                          {this.state.item_fill == true ? (
                            <small style={{ color: "red" }}>*Required.</small>
                          ) : null}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Rate<span className="astrick">*</span></label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          id="item_rate"
                          name="item_rate"
                          value={this.state.item_rate}
                          onChange={this.popUpChange}
                        />
                        <input
                          type="hidden"
                          className="form-control"
                          id="iamfrom"
                        />
                        <div style={{ float: "left" }}>
                          {this.state.rate_fill == true ? (
                            <small style={{ color: "red" }}>*Required.</small>
                          ) : (null)}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Description<span className="astrick">*</span></label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <textarea
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          id="item_descrption"
                          name="item_descrption"
                          onChange={this.popUpChange}
                          value={this.state.item_descrption}
                        />
                        <div style={{ float: "left" }}>
                          {this.state.pop_desc == true ? (
                            <small style={{ color: "red" }}>*Required.</small>
                          ) : null}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 pad-no ">
                      <div className="col-md-4 col-sm-4 col-xs-12">
                        <label>Category<span className="astrick">*</span></label>
                      </div>
                      <div className="col-md-8 col-sm-8 col-xs-12">
                        <select
                          className="selectpicker form-control add-new kk"
                          data-live-search="true"
                          title="Choose Category"
                          id="item_categeory"
                          onChange={(e) => {
                            if (e.target.value == "1e") {
                              window.jQuery("#pop-modal").modal("show");
                            } else {
                              jQuery("#hiddenCategID").val(e.target.value);
                            }
                          }}
                        >
                          <option value="1e">Create New </option>
                          {this.state.default_category_list &&
                            this.state.default_category_list.map((item, k) => {
                              var usee = item.name;
                              if (usee.includes(this.state.nameFilter)) {
                                // alert(this.state.nameFilter)
                                var selected = true;
                                jQuery("#hiddenCategID").val(item.id);

                                // jQuery('.kk').val(item.id)
                              }

                              // if(this.state.selectNeedIndex==k){
                              //    var usee=item.name

                              //   // jQuery('.kk').val(item.id)
                              //   // setTimeout(()=>{
                              //     // jQuery('#item_categeory').val(item.id)
                              //   // },3000)

                              //   if(this.state.selectNeedIndex !='empty'){
                              //     this.setState({selectNeedIndex:'empty'})

                              //   }
                              // }else{
                              //   var selected=false

                              // }
                              return (
                                <option
                                  selected={selected}
                                  value={item.id}
                                  data-status={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                        <input
                          autoComplete="off"
                          type="hidden"
                          className="form-control"
                          id="hiddenCategID"
                          placeholder="Enter new item"
                        />
                        <div style={{ float: "left" }}>
                          {this.state.pop_cate == true ? (
                            <small style={{ color: "red" }}>*Required.</small>
                          ) : null}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                      <button
                        className="btn btn-lightgray"
                        data-dismiss="modal"
                        onClick={() => {
                          this.setState({ roleStringLen: false });
                          jQuery("#item_categeory option")
                            .prop("selected", false)
                            .trigger("change");

                          jQuery("#item_text").val("");
                          jQuery("#item_rate").val("");
                          jQuery("#hiddenCategID").val("");
                          jQuery("#item_descrption").val("");
                        }}
                      >
                        Cancel
                      </button>
                      <span>{"   "}</span>
                      <input type="hidden" id="colid" />

                      <button
                        className="btn btn-green"
                        type="button"
                        onClick={() => {
                          const item = jQuery("#item_text").val();

                          if (item == "" || item == null || item == undefined) {
                            this.setState({ item_fill: true })
                          } else {
                            this.setState({ item_fill: false })
                          };

                          const item_descrption = jQuery(
                            "#item_descrption"
                          ).val();

                          if (item_descrption == "" || item_descrption == null || item_descrption == undefined) {
                            this.setState({ pop_desc: true })
                          } else {
                            this.setState({ pop_desc: false })
                          };

                          const item_rate = jQuery("#item_rate").val();
                          if (item_rate == "" || item_rate == null || item_rate == undefined) {
                            this.setState({ rate_fill: true })
                          } else {
                            this.setState({ rate_fill: false })
                          };
                          const item_categeory = jQuery("#hiddenCategID").val();

                          if (item_categeory == "" || item_categeory == null || item_categeory == undefined) {
                            this.setState({ pop_cate: true })
                          } else {
                            this.setState({ pop_cate: false })
                          };
                          // const item_categeory_id=jQuery("#item_categeory").val()
                          // if(item_categeory_id =="" || item_categeory_id == null || item_categeory_id == undefined){
                          //   this.setState({pop_cate:true})
                          // }else{
                          //   this.setState({pop_cate:false})
                          // };

                          var coreData = {
                            client_id: this.state.logged_client_id,
                            item_name: item,
                            category_id: item_categeory,
                            rate: item_rate,
                            description: item_descrption,
                          };

                          var editCoreDate = {
                            client_id: this.state.logged_client_id,
                            item_name: item,
                            category_id: item_categeory,
                            rate: item_rate,
                            description: item_descrption,
                            status: 1,
                            item_id: this.state.item_id,
                          }

                          if (this.state.item_fill == false && this.state.pop_desc == false && this.state.rate_fill == false && this.state.pop_cate == false) {
                            if (this.state.edit == true) {
                              FetchAllApi.edit_purchase_product_item(editCoreDate, (err, response) => {

                                if (response.status === 1) {
                                  this.getPoItems(
                                    jQuery("#item_text").val(),
                                    jQuery("#iamfrom").val()
                                  );

                                  alert("success");
                                  this.setState({ roleStringLen: false });
                                  jQuery("#item_categeory option")
                                    .prop("selected", false)
                                    .trigger("change");

                                  jQuery("#item_text").val("");
                                  jQuery("#item_rate").val("");
                                  jQuery("#hiddenCategID").val("");
                                  jQuery("#item_descrption").val("");
                                  window.jQuery("#poadd_items").modal("hide");
                                } else {
                                  alert(response.message)
                                }
                              });

                            } else {
                              FetchAllApi.add_purchase_product_item(coreData, (err, response) => {

                                if (response.status === 1) {
                                  this.getPoItems(
                                    jQuery("#item_text").val(),
                                    jQuery("#iamfrom").val()
                                  );

                                  alert("success");
                                  this.setState({ roleStringLen: false });
                                  jQuery("#item_categeory option")
                                    .prop("selected", false)
                                    .trigger("change");

                                  jQuery("#item_text").val("");
                                  jQuery("#item_rate").val("");
                                  jQuery("#hiddenCategID").val("");
                                  jQuery("#item_descrption").val("");
                                  window.jQuery("#poadd_items").modal("hide");
                                } else {
                                }
                              });
                            }
                          }
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Category
            defaultcategorylist_onchange={this.defaultcategorylist_onchange}
            logoutSubmit={(e) => this.logoutLink(e)}
          />
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