import React from 'react'
import jQuery from 'jquery';
import LeftSidebar from './left_sidebar'
import Footer from './footer'
import Topbar from './topbar';
import Comma from './comma';
import FetchAllApi from '../api_links/fetch_all_api';
import moment from "moment";

class Lists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),
      page_select: "Invoice",
      list: [],
      customer_and_job_list: [],
      vendor_names: [],
      filterarr: [],
      search: '',
    }
  };


  componentDidMount() {
    this.listApiFunc();
    this.customerApiFunc();
    this.getVendorNames();
    localStorage.setItem("customer_id","0");
  };


  toggleFunc = (val) => {
    this.setState({ page_select: val, list: [], filterarr: [] }, this.listApiFunc)
  };

  getVendorNames = () => {
    var client_id = this.state.logged_client_id

    FetchAllApi.getVendorNames(client_id, (err, response) => {
      console.log('vendor_namesooooooooooooooooo', response)

      if (response.status === 1) {
        // alert('hii')
        this.setState({ vendor_names: response.list })
      } else {
      }
    })
  }

  listApiFunc = () => {
    let client_id = this.state.logged_client_id
    if (this.state.page_select == "Invoice") {
      FetchAllApi.invoice_list(client_id, (err, response) => {
        if (response.status === 1) {
          this.setState({ list: response.list, filterarr: response.list }, this.change)
        }
      })
    } else if (this.state.page_select == "Estimate") {
      FetchAllApi.estimate_list(client_id, (err, response) => {
        if (response.status === 1) {
          this.setState({ list: response.list, filterarr: response.list }, this.change)
        }
      })
    } else if (this.state.page_select == "Salesorder") {
      FetchAllApi.sales_order_list(client_id, (err, response) => {
        if (response.status === 1) {
          this.setState({ list: response.list, filterarr: response.list }, this.change)
        }
      })
    } else if (this.state.page_select == "Creditmemo") {
      FetchAllApi.credit_memo_list(client_id, (err, response) => {
        if (response.status === 1) {
          this.setState({ list: response.list, filterarr: response.list }, this.change)
        }
      })

    } else if (this.state.page_select == "Purchaseorder") {
      FetchAllApi.purchase_order_list(client_id, (err, response) => {
        if (response.status === 1) {
          this.setState({ list: response.list, filterarr: response.list }, this.change)
        }
      })
    } else if (this.state.page_select == "VendorBill") {
      FetchAllApi.vendor_bill_list(client_id, (err, response) => {
        if (response.status === 1) {
          this.setState({ list: response.list, filterarr: response.list }, this.change)
        }
      })
    } else {
      FetchAllApi.vendor_credit_note_list(client_id, (err, response) => {
        if (response.status === 1) {
          this.setState({ list: response.list, filterarr: response.list }, this.change)
        }
      })

    }
  };

  customerApiFunc = () => {
    var client_id = this.state.logged_client_id;
    var from_customer_receive_payment = 0;

    FetchAllApi.customer_and_job_list(
      client_id,
      from_customer_receive_payment,
      (err, response) => {

        if (response.status === 1) {
          let myArray = response.list;

          this.setState(
            { customer_and_job_list: response.list })
        }
      })

  }


  print = () => {
    var getHTML = jQuery("#printing_template").html();
    fetch("https://v2018.api2pdf.com/chrome/html", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "f3b5939c-e9a2-412d-8c82-9386bb9cbcb4", //Get your API key from https://portal.api2pdf.com      11011305-f6cf-4868-b731-74c53dcf9f89
      },
      body: JSON.stringify({
        html: getHTML,
        inlinePdf: true,
        fileName: "test.pdf",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          console.log("test_pdf", res);
          window.open(res.pdf);
          //window.location.href = res.pdf;
        } else {
          console.log("test_pdf", res.error);
        }
      });

  };

  searchFunc = (val) => {
    this.setState({ search: val }, this.change)
  };


  change = () => {
    const arr = this.state.list
    if (!this.state.search.trim()) {
      return this.setState({ filterarr: [...arr] })
    }
    const fill = arr.filter((obj) => {
      if (this.state.page_select == "Invoice") {
        let customer = ""
        this.state.customer_and_job_list.map((cus) => {
          if (cus.id == obj.customer_id) {
            return customer = cus.name
          }
        })
        if (obj.invoice_number.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.job_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.currency.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || customer.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
          return true
        }
        else {
          return false
        }
      } else if (this.state.page_select == "Estimate") {
        let customer = ""
        this.state.customer_and_job_list.map((cus) => {
          if (cus.id == obj.customer_id) {
            return customer = cus.name
          }
        })
        if (obj.estimate_number.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.job_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.currency.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || customer.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
          return true
        }
        else {
          return false
        }
      } else if (this.state.page_select == "Salesorder") {
        let customer = ""
        this.state.customer_and_job_list.map((cus) => {
          if (cus.id == obj.customer_id) {
            return customer = cus.name
          }
        })
        if (obj.sales_number.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.job_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.currency.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || customer.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
          return true
        }
        else {
          return false
        }
      } else if (this.state.page_select == "Creditmemo") {
        let customer = ""
        this.state.customer_and_job_list.map((cus) => {
          if (cus.id == obj.customer_id) {
            return customer = cus.name
          }
        })
        if (obj.credit_number.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.job_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.currency.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || customer.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
          return true
        }
        else {
          return false
        }
      } else if (this.state.page_select == "Purchaseorder") {
        let vendor = ""
        this.state.vendor_names.map((cus) => {
          if (cus.id == obj.vendor_id) {
            return vendor = cus.vendor_name
          }
        })
        if (obj.purchaseorder_number.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.currency.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || vendor.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
          return true
        }
        else {
          return false
        }
      } else if (this.state.page_select == "VendorBill") {
        let vendor = ""
        this.state.vendor_names.map((cus) => {
          if (cus.id == obj.vendor_id) {
            return vendor = cus.vendor_name
          }
        })
        if (obj.invoice_number.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.currency.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || vendor.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
          return true
        }
        else {
          return false
        }
      } else {
        let vendor = ""
        this.state.vendor_names.map((cus) => {
          if (cus.id == obj.vendor_id) {
            return vendor = cus.vendor_name
          }
        })
        if (obj.credit_number.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || obj.currency.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || vendor.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
          return true
        }
        else {
          return false
        }
      }
    })
    return this.setState({ filterarr: fill })
  };

  print = () => {
    var getHTML = jQuery("#printing_template").html();
    fetch("https://v2018.api2pdf.com/chrome/html", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "f3b5939c-e9a2-412d-8c82-9386bb9cbcb4", //Get your API key from https://portal.api2pdf.com      11011305-f6cf-4868-b731-74c53dcf9f89
      },
      body: JSON.stringify({
        html: getHTML,
        inlinePdf: true,
        fileName: "test.pdf",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          console.log("test_pdf", res);
          window.open(res.pdf);
          //window.location.href = res.pdf;
        } else {
          console.log("test_pdf", res.error);
        }
      });

  };

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  };

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  };


  render() {
    return (
      <React.Fragment>
        <div className='container-fluid'>
          <div className='row'>
            <LeftSidebar history={this.props.history} pageSubmit={e => this.pageLink(e)} />

            <div className='main-wrap col-md-12 col-xs-12 pad-r-no'>
              <div className='top-bar col-md-12 col-xs-12 pad-r-no'>
                <div className='nav-brand-res visible-xs'>
                  <img
                    className='img-responsive'
                    src='../images/logo-icon.png'
                    alt='LogoIcon'
                  />
                </div>
                <a href='javascript:;' class='back hidden-xs' onClick={() => this.props.history.goBack()}>
                  <img src='../images/back-arrow-blue.svg' />
                </a>
                {/* <span className='page-title hidden-xs'>Inbox</span> */}
                <ul className='list-unstyled breadcrumb page-title hidden-xs'>
                  <li>
                    <a
                      href='javascript: ;'

                    >
                      Customers & vendors
                    </a>
                  </li>
                  <li>All Lists</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />

              </div>

              <div className="main-content col-md-12 col-xs-12">
                <div className="form-group search-box mar-rgt ">
                  <input type="text" name="search" onChange={(e) => { this.searchFunc(e.target.value) }} className="form-control" placeholder="Search..." />
                </div>
                <div>
                  <div className="row">
                    <ul className="nav nav-pills transparent nowrap ofx-auto">
                      <li class="active"><a data-toggle="pill" onClick={() => { this.toggleFunc("Invoice") }} href="#Invoice">Invoice</a></li>
                      <li><a data-toggle="pill" onClick={() => { this.toggleFunc("Estimate") }} href="#Estimate">Quotation</a></li>
                      <li><a data-toggle="pill" onClick={() => { this.toggleFunc("Salesorder") }} href="#Salesorder">Sales Order</a></li>
                      <li><a data-toggle="pill" onClick={() => { this.toggleFunc("Creditmemo") }} href="#Creditmemo">Credit Memo</a></li>
                      <li><a data-toggle="pill" onClick={() => { this.toggleFunc("Purchaseorder") }} href="#Purchaseorder">Purchase Order</a></li>
                      <li><a data-toggle="pill" onClick={() => { this.toggleFunc("VendorBill") }} href="#VendorBill">Vendor Bill</a></li>
                      <li><a data-toggle="pill" onClick={() => { this.toggleFunc("VendorCredit") }} href="#VendorCredit">Vendor Credit</a></li>
                    </ul>
                  </div>
                </div>
                <div className="row tab-content mar-top pad-top">
                  <div id="Invoice" className="col-md-12 tab-pane fade active in pad-no">
                    <table className='table' >
                      <thead>
                        <tr>


                          <th>Invoice No</th>
                          <th>Invoice Date</th>
                          <th>Customer Name</th>
                          <th>Job Name</th>
                          <th className="all-list-currency">Currency</th>
                          <th className="text-right">Exchange rate</th>

                          <th className="text-right">Foreign Currency Amount </th>
                          <th className="text-right">Home Currency Amount </th>
                          <th className="text-right">Open Balance Foreign Currency </th>
                          <th className="text-right">Open Balance Home Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.filterarr &&
                          this.state.filterarr.map((item, i) => {
                            return (
                              <tr

                                onClick={() => {
                                  localStorage.setItem('comingFrom', 'General Ledger')

                                  var setID = item.invoice_id;

                                  localStorage.setItem("invoice_id", setID);
                                  localStorage.setItem("job_id", item.job_id);

                                  var win = window.open(
                                    "/create_invoice",
                                    "_blank"
                                  );
                                  win.focus();


                                }}

                              >



                                <td className='cont-detail'>
                                  <span className='fw-med'>
                                    {item.invoice_number}
                                  </span>

                                </td>
                                <td>{item.invoice_date}</td>
                                {this.state.customer_and_job_list.map((cus) => {
                                  if (cus.id == item.customer_id) {
                                    return (
                                      <td>{cus.name}</td>
                                    )
                                  }
                                })}

                                <td>{item.job_name}</td>
                                <td>{item.currency}</td>
                                <td className="text-right">{item.exchange_rate}</td>
                                <td className="text-right"><Comma value={item.grand_total_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.grand_total_home_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_home_currency} /></td>

                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div id="Estimate" className="col-md-12 tab-pane fade in pad-no">
                    <table className='table' >
                      <thead>
                        <tr>


                          <th>Quotation No</th>
                          <th>Quotation Date</th>
                          <th>Customer Name</th>
                          <th>Job Name</th>
                          <th className="all-list-currency">Currency</th>
                          <th className="text-right">Exchange rate</th>
                          <th className="text-right">Foreign Currency Amount </th>
                          <th className="text-right">Home Currency Amount </th>
                          <th className="text-right">Open Balance Foreign Currency </th>
                          <th className="text-right">Open Balance Home Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.filterarr &&
                          this.state.filterarr.map((item, i) => {
                            return (
                              <tr onClick={() => {
                                var setID = item.id + "=" + item.client_id;
                                localStorage.setItem("invoice_id", setID)
                                var win = window.open(
                                  "/create_estimate",
                                  "_blank"
                                );
                                win.focus();
                              }
                              }
                              >

                                <td className='cont-detail'>
                                  <span className='fw-med'>
                                    {item.estimate_number}
                                  </span>

                                </td>
                                <td>{moment(item.date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                {this.state.customer_and_job_list.map((cus) => {
                                  if (cus.id == item.customer_id) {
                                    return (
                                      <td>{cus.name}</td>
                                    )
                                  }
                                })}
                                <td>{item.job_name}</td>
                                <td>{item.currency}</td>
                                <td className="text-right">{item.exchange_rate}</td>
                                <td className="text-right"><Comma value={item.grand_total_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.grand_total_home_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_home_currency} /></td>

                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div id="Salesorder" className="col-md-12 tab-pane fade in pad-no">
                    <table className='table' >
                      <thead>
                        <tr>


                          <th>Salesorder No</th>
                          <th>Salesorder Date</th>
                          <th>Customer Name</th>
                          <th>Job Name</th>
                          <th className="all-list-currency">Currency</th>
                          <th className="text-right">Exchange rate</th>
                          <th className="text-right">Foreign Currency Amount </th>
                          <th className="text-right">Home Currency Amount </th>
                          <th className="text-right">Open Balance Foreign Currency </th>
                          <th className="text-right">Open Balance Home Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.filterarr &&
                          this.state.filterarr.map((item, i) => {
                            return (
                              <tr
                                onClick={() => {
                                  var setID = item.id + "=" + item.client_id;
                                  localStorage.setItem("invoice_id", setID)
                                  var win = window.open(
                                    "/create_salesorder",
                                    "_blank"
                                  );
                                  win.focus();
                                }
                                }
                              >



                                <td className='cont-detail'>
                                  <span className='fw-med'>
                                    {item.sales_number}
                                  </span>

                                </td>
                                <td>{moment(item.date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                {this.state.customer_and_job_list.map((cus) => {
                                  if (cus.id == item.customer_id) {
                                    return (
                                      <td>{cus.name}</td>
                                    )
                                  }
                                })}
                                <td>{item.job_name}</td>
                                <td>{item.currency}</td>
                                <td className="text-right">{item.exchange_rate}</td>
                                <td className="text-right"><Comma value={item.grand_total_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.grand_total_home_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_home_currency} /></td>

                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div id="Creditmemo" className="col-md-12 tab-pane fade in pad-no">
                    <table className='table' >
                      <thead>
                        <tr>


                          <th>CreditMemo No</th>
                          <th>CreditMemo Date</th>
                          <th>Customer Name</th>
                          <th>Job Name</th>
                          <th className="all-list-currency">Currency</th>
                          <th className="text-right">Exchange rate</th>
                          <th className="text-right">Foreign Currency Amount </th>
                          <th className="text-right">Home Currency Amount </th>
                          <th className="text-right">Open Balance Foreign Currency </th>
                          <th className="text-right">Open Balance Home Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.filterarr &&
                          this.state.filterarr.map((item, i) => {
                            return (
                              <tr
                                onClick={() => {
                                  var setID = item.credit_id;

                                  localStorage.setItem("credit_id", setID);
                                  window.open("/create_creditmemo?memo_id=" + setID)
                                }}


                              >



                                <td className='cont-detail'>
                                  <span className='fw-med'>
                                    {item.credit_number}
                                  </span>

                                </td>
                                <td>{item.credit_date}</td>
                                {this.state.customer_and_job_list.map((cus) => {
                                  if (cus.id == item.customer_id) {
                                    return (
                                      <td>{cus.name}</td>
                                    )
                                  }
                                })}
                                <td>{item.job_name}</td>
                                <td>{item.currency}</td>
                                <td className="text-right">{item.exchange_rate}</td>
                                <td className="text-right"><Comma value={item.grand_total_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.grand_total_home_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_home_currency} /></td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div id="Purchaseorder" className="col-md-12 tab-pane fade in pad-no">
                    <table className='table' >
                      <thead>
                        <tr >


                          <th>Purchaseorder No</th>
                          <th>Purchaseorder Date</th>
                          <th className="all-list-currency">Vendor Name</th>
                          <th className="all-list-currency">Currency</th>
                          <th className="text-right">Exchange rate</th>
                          <th className="text-right">Foreign Currency Amount </th>
                          <th className="text-right">Home Currency Amount </th>
                          <th className="text-right">Open Balance Foreign Currency </th>
                          <th className="text-right">Open Balance Home Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.filterarr &&
                          this.state.filterarr.map((item, i) => {
                            return (
                              <tr onClick={() => {
                                var setID = item.id + "=" + item.client_id;
                                localStorage.setItem("invoice_id", setID)
                                var win = window.open(
                                  "/create_purchaseorder",
                                  "_blank"
                                );
                                win.focus();
                              }
                              }>



                                <td className='cont-detail'>
                                  <span className='fw-med'>
                                    {item.purchaseorder_number}
                                  </span>
                                </td>

                                <td>{moment(item.date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                {this.state.vendor_names.map((cus) => {
                                  if (cus.id == item.vendor_id) {
                                    return (
                                      <td>{cus.vendor_name}</td>
                                    )
                                  }
                                })}
                                <td>{item.currency}</td>
                                <td className="text-right">{item.exchange_rate}</td>
                                <td className="text-right"><Comma value={item.grand_total_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.grand_total_home_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_home_currency} /></td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div id="VendorBill" className="col-md-12 tab-pane fade in pad-no">
                    <table className='table' >
                      <thead>
                        <tr>


                          <th>VendorBill No</th>
                          <th>VendorBill Date</th>
                          <th className="all-list-currency">Vendor Name</th>

                          <th className="all-list-currency">Currency</th>
                          <th className="text-right">Exchange rate</th>
                          <th className="text-right">Foreign Currency Grand Total </th>
                          <th className="text-right">Home Currency Grand Total </th>
                          <th className="text-right">Open Balance Foreign Currency </th>
                          <th className="text-right">Open Balance Home Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.filterarr &&
                          this.state.filterarr.map((item, i) => {
                            return (
                              <tr

                                onClick={
                                  () => {




                                    let arr = ["Bill", item.invoice_id];

                                    localStorage.setItem(
                                      "vendor_bill",
                                      JSON.stringify(arr)
                                    );


                                    var win = window.open(
                                      "/data_tagging/" +
                                      item.list_id +
                                      "/" +
                                      item.file_id,
                                      "_blank"
                                    );
                                    win.focus();



                                    // let Input = {
                                    //   client_id: item.logged_client_id,
                                    //   list_id: item.list_id,
                                    //   file_id: item.file_id
                                    // }
                                    // FetchAllApi.get_bill_by_attachment(Input, (err, response) => {
                                    //   if (response.status === 1) {
                                    //     localStorage.setItem('processed', "Processed")

                                    //     localStorage.setItem('logged_client_id', item.client_id)
                                    //     localStorage.setItem('logged_company_name', item.company_name ? item.company_name : '--')

                                    //     localStorage.setItem(
                                    //       "vendor_bill",
                                    //       JSON.stringify(['from_inbox_pages', item.list_id, item.file_id])
                                    //     );

                                    //     localStorage.setItem('comingFrom', 'All Lists')
                                    //     this.props.history.push("/data_tagging/" + item.list_id + "/" + item.file_id, item.list_id);
                                    //     window.scrollTo(0, 0);


                                    //   } else {
                                    //     localStorage.setItem('processed', "Not Processed")

                                    //     // localStorage.setItem('processed', item.processed_status_array[i])
                                    //     localStorage.setItem('logged_client_id', item.client_id)
                                    //     localStorage.setItem('logged_company_name', item.company_name ? item.company_name : '--')

                                    //     localStorage.setItem(
                                    //       "vendor_bill",
                                    //       JSON.stringify(['from_inbox_pages', item.list_id, item.file_id])
                                    //     );

                                    //     localStorage.setItem('comingFrom', 'All Lists')
                                    //     this.props.history.push("/data_tagging/" + item.list_id + "/" + item.file_id, item.list_id);
                                    //     window.scrollTo(0, 0);
                                    //   }
                                    // })


                                  }
                                }



                              >



                                <td className='cont-detail'>
                                  <span className='fw-med'>
                                    {item.invoice_number}
                                  </span>
                                </td>
                                <td>{moment(item.invoice_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                {this.state.vendor_names.map((cus) => {
                                  if (cus.id == item.vendor_id) {
                                    return (
                                      <td>{cus.vendor_name}</td>
                                    )
                                  }
                                })}

                                <td>{item.currency}</td>
                                <td className="text-right">{item.exchange_rate}</td>
                                <td className="text-right"><Comma value={item.grand_total_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.grand_total_home_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_home_currency} /></td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div id="VendorCredit" className="col-md-12 tab-pane fade in pad-no">
                    <table className='table' >
                      <thead>
                        <tr>


                          <th>Vendor Credit No</th>
                          <th>Vendor Credit Date</th>
                          <th className="all-list-currency">Vendor Name</th>

                          <th className="all-list-currency">Currency</th>
                          <th className="text-right">Exchange rate</th>
                          <th className="text-right">Foreign Currency Amount </th>
                          <th className="text-right">Home Currency Amount </th>
                          <th className="text-right">Open Balance Foreign Currency </th>
                          <th className="text-right">Open Balance Home Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.filterarr &&
                          this.state.filterarr.map((item, i) => {
                            return (
                              <tr
                                onClick={
                                  () => {




                                    let Input = {
                                      client_id: item.logged_client_id,
                                      list_id: item.list_id,
                                      file_id: item.file_id
                                    }
                                    FetchAllApi.get_bill_by_attachment(Input, (err, response) => {
                                      if (response.status === 1) {
                                        localStorage.setItem('processed', "Processed")

                                        localStorage.setItem('logged_client_id', item.client_id)
                                        localStorage.setItem('logged_company_name', item.company_name ? item.company_name : '--')

                                        localStorage.setItem(
                                          "vendor_bill",
                                          JSON.stringify(['from_inbox_pages', item.list_id, item.file_id])
                                        );

                                        localStorage.setItem('comingFrom', 'All Lists')
                                        this.props.history.push("/data_tagging/" + item.list_id + "/" + item.file_id, item.list_id);
                                        window.scrollTo(0, 0);


                                      } else {
                                        localStorage.setItem('processed', "Not Processed")

                                        // localStorage.setItem('processed', item.processed_status_array[i])
                                        localStorage.setItem('logged_client_id', item.client_id)
                                        localStorage.setItem('logged_company_name', item.company_name ? item.company_name : '--')

                                        localStorage.setItem(
                                          "vendor_bill",
                                          JSON.stringify(['from_inbox_pages', item.list_id, item.file_id])
                                        );

                                        localStorage.setItem('comingFrom', 'All Lists')
                                        this.props.history.push("/data_tagging/" + item.list_id + "/" + item.file_id, item.list_id);
                                        window.scrollTo(0, 0);
                                      }
                                    })





                                    //     let arr = [
                                    //       "Vendor credit note",
                                    //       item.credit_id,
                                    //     ];

                                    //     localStorage.setItem(
                                    //       "vendor_bill",
                                    //       JSON.stringify(arr)
                                    //     );


                                    //     var win = window.open(
                                    //       "/data_tagging/" +
                                    //       item.list_id +
                                    //       "/" +
                                    //       item.file_id,
                                    //       "_blank"
                                    //     );
                                    //     win.focus();
                                  }
                                }

                              >



                                <td className='cont-detail'>
                                  <span className='fw-med'>
                                    {item.credit_number}
                                  </span>

                                </td>
                                <td>{moment(item.credit_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                                {
                                  this.state.vendor_names.map((cus) => {
                                    if (cus.id == item.vendor_id) {
                                      return (
                                        <td>{cus.vendor_name}</td>
                                      )
                                    }
                                  })
                                }
                                <td>{item.currency}</td>
                                <td className="text-right">{item.exchange_rate}</td>
                                <td className="text-right"><Comma value={item.grand_total_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.grand_total_home_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_foreign_currency} /></td>
                                <td className="text-right"><Comma value={item.open_balance_home_currency} /></td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment >

    )
  }
};


export default Lists;