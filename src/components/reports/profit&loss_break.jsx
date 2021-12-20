import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import FetchAllApi from "../../api_links/fetch_all_api";
import Topbar from "../topbar";
import moment from "moment";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import jQuery from "jquery";
import config from "./../../api_links/api_links";

// import { split } from "lodash";
var _ = require("lodash");
const urlParams = new URLSearchParams(window.location.search);

class GeneralLedgerBreak extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      show_coulmns_filter: [],
      filtervalue: [],
      loading: true,
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),

      country_sortname: localStorage.getItem("country_sortname"),
      language_code: localStorage.getItem("language_code"),
      home_currency: localStorage.getItem("home_currency"),

      incorporation_date: localStorage.getItem("incorporation_date"),
      home_currency_symbol: localStorage.getItem("home_currency_symbol"),
      // home_currency: 'SGD',

      total_revenue: "",
      cost_of_goods_sold: "",
      gross_profit: "",
      net_income: "",
      selectedCurrencies: "",
      selectedAccountIds: '',
      multiSelectedTypeIds: '',
      multiplejobSelected: '',
      reportObject: [],
      numberOfColumns: [],
      dateList: [],
      endDate: "2020-01-31",
      startDate: "2020-01-01",
      start_date: localStorage.getItem("incorporation_date"),
      end_date: moment().add(10, 'years').format("YYYY-MM-DD"),
      dropdown: "",
      show_column: "",
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",
      waiting_re: [],
      re_assigned: [],
      Subcat_array: [],
      response: "",
      coulmns_head: [],
      final_total: "",
      options: "",
      From: "",
      To: "",
      filter_options: { condition: "", value: "", from: "", to: "" },
      valueAmount: "",
      valueAmount_type: "",
      disable: false,
      selectedFil: 0,
      currencies: [],
      vendorNames: [],
      ColscountArray: [],
      source_name: '',

      selected_vendor_ids: [],
      changefromDate_duedate: "",
      todate_duedate: "",
      tableData: [],
      tableSize: 28,
      myArray: [],
      resData: [],
      data: [
        {
          id: 1,
          heading_name: "Type",
          clsname: "Type",
        },

        {
          id: 3,
          heading_name: "Customer Id",
          clsname: "customer_id",
        },
        {
          id: 4,
          heading_name: "Vendor email",
          clsname: "Customeremail",
        },
        {
          id: 5,
          heading_name: "Vendor address",
          clsname: "Companyaddress",
        },
        {
          id: 6,
          heading_name: "Vendor name",
          clsname: "Companyname",
        },
        {
          id: 7,
          heading_name: "Invoice date",
          clsname: "Invoicedate",
        },
        // {
        //   id: 8,
        //   heading_name: 'Customer name',
        //   clsname: 'Customername'
        // },
        // {
        //   id: 9,
        //   heading_name: 'Job name',
        //   clsname: 'jobname'
        // },
        // {
        //   id: 10,
        //   heading_name: 'Customer address',
        //   clsname: 'customer_address'
        // },
        {
          id: 11,
          heading_name: "Vendor phone",
          clsname: "customer_phone",
        },
        {
          id: 12,
          heading_name: "Memo",
          clsname: "Memo",
        },
        // {
        //   id: 13,
        //   heading_name: 'Item total home currency',
        //   clsname: 'Itemtotalhomecurrency'
        // },
        // {
        //   id: 14,
        //   heading_name: 'Tax amount home currency',
        //   clsname: 'Taxamounthomecurrency'
        // },
        // {
        //   id: 15,
        //   heading_name: 'Grand total home currency',
        //   clsname: 'Grandtotalhomecurrency'
        // },
        {
          id: 16,
          heading_name: "Foreign currency",
          clsname: "Foreigncurrency",
        },
        {
          id: 17,
          heading_name: "Exchange rate",
          clsname: "Exchangerate",
        },
        {
          id: 18,
          heading_name: "Due date",
          clsname: "Duedate",
        },
        {
          id: 19,
          heading_name: "Terms",
          clsname: "Termsconditions",
        },
        {
          id: 20,
          heading_name: "Invoice number",
          clsname: "Invoicenumber",
        },
        {
          id: 21,
          heading_name: "Shipping address",
          clsname: "Shippingaddress",
        },
        {
          id: 22,
          heading_name: "Credit",
          clsname: "credit",
        },
        {
          id: 23,
          heading_name: "Debit",
          clsname: "debit",
        },
        {
          id: 24,
          heading_name: "Open Balance Home currency",
          clsname: "Grandforeigncurrency",
        },
      ],

      valueAmount_type1: "",
      valueAmount1: "",
      date_start: "",
      date_end: "",
      number_from: "",
      number_to: "",
      memo: "",
      result_array: [],
      all_report_name_id: "",
      open_balance: "",
      Exchange_rate: "",
      F_open: "",
      Address: "",
      website: "",
      mail: "",
      accnum: "",
      phone_number: "",
      vendor_type: [],
      customer_type: [],
      paymentTerms: [],
      selectedTerms: [],
      selectedCustomer_type: [],
      selectedVendor_type: [],
      valueAmount_type2: "",
      valueAmount_type3: "",
      valueAmount2: "",
      valueAmount3: "",
      specificRowIndex: "",
      scrolledPixel: 0,
      scrolledPixelIN_X: 0,
      scrolledPixelIN_Y: 0,
      hh: "",
      filter_key_names: [],

      type: false,
      sort_type: "asc",
      sortBynames: [],
      selectedName: "",
      filter_key_names: [],

      view: true,
      date_range:''
    };
  }


  rename = (obj, curr) => {
    let a = {}
    Object.keys(obj).map((key) => {
      let newKey = key.replace(curr, '')
      Object.assign(a, { [newKey]: obj[key] })
    })
    return a
  }


  showHide = () => {
    this.setState({ view: !this.state.view });

    setTimeout(() => {
      if (this.state.view) {
        jQuery("td:nth-child(" + 13 + "),th:nth-child(" + 13 + ")").hide();
        jQuery("td:nth-child(" + 18 + "),th:nth-child(" + 18 + ")").hide();
        jQuery("td:nth-child(" + 26 + "),th:nth-child(" + 26 + ")").hide();
      } else {
        jQuery("td:nth-child(" + 13 + "),th:nth-child(" + 13 + ")").show();
        jQuery("td:nth-child(" + 18 + "),th:nth-child(" + 18 + ")").show();
        jQuery("td:nth-child(" + 26 + "),th:nth-child(" + 26 + ")").show();
      }
    }, 2000);
  };

  sortByNames = () => {
    let report_id = this.state.all_report_name_id;
    // alert('hjgh')
    FetchAllApi.reportSortbyOptions(report_id, (err, response) => {
      if (response.status === 1) {
        console.log("rty", response);
        this.setState({ sortBynames: response.list });
      } else {
      }
    });
  };

  repeat = (sub_categories, paddingLeft) => {
    console.log("july", paddingLeft);

    if (sub_categories) {
      return (
        <React.Fragment>
          {sub_categories &&
            sub_categories.length > 0 &&
            Object.keys(sub_categories[0]).map((itm, i) => {
              // console.log('july',sub_categories[0][itm])
              return (
                <React.Fragment key={i}>
                  {/* invoice heading others */}
                  {sub_categories[0][itm].invoices &&
                    !isNaN(Number(sub_categories[0][itm].total_amount)) &&
                    sub_categories[0][itm].is_transactions_available == 1
                    // Number(sub_categories[0][itm].total_amount) != 0 

                    &&

                    (
                      <React.Fragment>
                        <tr class="item-step1 sub-title">
                          <td
                            style={{
                              paddingLeft: `${paddingLeft}px`,
                              position: "sticky",
                              left: "0.25rem",backgroundColor: "#EFEFFF"
                            }}
                          >
                            <div> {sub_categories[0][itm].category_name} </div>
                          </td>

                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>

                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>

                          <td>
                            <div> </div>
                          </td>
                          <td class="trans" style={{ paddingLeft: 1 }}>
                            <div>
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].prevoius_closing_balance)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].prevoius_closing_balance
                                )
                              )
                                ? "0.00"
                                : Number(
                                  sub_categories[0][itm]
                                    .prevoius_closing_balance
                                ).toFixed(2)} */}
                            </div>{" "}
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td class="trans" style={{ paddingLeft: 1 }}>
                            <div></div>
                          </td>
                          <div>
                            {" "}
                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                              { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].prevoius_closing_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                            {/* {isNaN(
                              Number(
                                sub_categories[0][itm]
                                  .prevoius_closing_foreign_balance
                              )
                            )
                              ? "0.00"
                              : Number(
                                sub_categories[0][itm]
                                  .prevoius_closing_foreign_balance
                              ).toFixed(2)} */}
                          </div>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                          <td>
                            <div> </div>
                          </td>
                        </tr>

                        {sub_categories[0][itm].is_child_data_available == 1 &&
                          this.repeat(
                            sub_categories[0][itm].sub_categories,
                            paddingLeft + 45
                          )}
                        {sub_categories[0][itm].is_child_data_available == 1 &&
                          sub_categories[0][itm].invoices &&
                          sub_categories[0][itm].invoices.length > 0 && (
                            <tr class="item-step1 sub-title">
                              <td
                                style={{
                                  paddingLeft: `${paddingLeft}px`,
                                  position: "sticky",
                                  left: "0.25rem",backgroundColor: "#EFEFFF"
                                }}
                              >
                                <div>
                                  {sub_categories[0][itm].category_name} {""}-
                                  {""} others{" "}
                                </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>

                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>

                              <td>
                                <div> </div>
                              </td>
                              <td class="trans" style={{ paddingLeft: 1 }}>
                                <div>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].prevoius_closing_others_balance)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm]
                                        .prevoius_closing_others_balance
                                    )
                                  )
                                    ? "0.00"
                                    : Number(
                                      sub_categories[0][itm]
                                        .prevoius_closing_others_balance
                                    ).toFixed(2)} */}
                                </div>{" "}
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td class="trans" style={{ paddingLeft: 1 }}>
                                <div></div>
                              </td>
                              <div>
                                {" "}
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].prevoius_closing_others_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(
                                  Number(
                                    sub_categories[0][itm]
                                      .prevoius_closing_others_foreign_balance
                                  )
                                )
                                  ? "0.00"
                                  : Number(
                                    sub_categories[0][itm]
                                      .prevoius_closing_others_foreign_balance
                                  ).toFixed(2)} */}
                              </div>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                              <td>
                                <div> </div>
                              </td>
                            </tr>
                          )}
                      </React.Fragment>
                    )}

                  {/* others total */}

                  {/* others map */}
                  {sub_categories[0][itm].invoices &&
                    !isNaN(Number(sub_categories[0][itm].total_amount)) &&
                    // Number(sub_categories[0][itm].total_amount) != 0 
                    sub_categories[0][itm].is_transactions_available == 1
                    &&
                    sub_categories[0][itm].invoices.map((e1) => {
                      return (
                        <>
                          <tr
                            className="item-step1"
                            onClick={() => {
                              localStorage.setItem('comingFrom', 'General Ledger')
                              var elmnt = document.getElementById(
                                "sticky-tb-hdr"
                              );
                              var x = elmnt.scrollLeft;
                              var y = elmnt.scrollTop;
                              var value = x + "=" + y;
                              localStorage.setItem("scrollposition", value);

                              // alert(jQuery(this).parents("tr").get(0).rowIndex)
                              if (
                                e1.type == "Sales Invoice" ||
                                e1.type == "Single Payment"
                              ) {
                                if (e1.type == "Sales Invoice") {
                                  var setID = e1.trans;
                                } else if (e1.type == "Single Payment") {
                                  var setID = e1.invoice_id + "=" + e1.trans;
                                }

                                localStorage.setItem("invoice_id", setID);
                                localStorage.setItem("job_id", e1.job_id);
                                // alert("job id" + e1.job_id);

                                var win = window.open(
                                  "/create_invoice",
                                  "_blank"
                                );
                                win.focus();
                              }

                              if (e1.type == "Bill") {
                                if (e1.type == "Bill") {
                                  let arr = [e1.type, e1.invoice_id];
                                  console.log("hy", e1);
                                  localStorage.setItem(
                                    "vendor_bill",
                                    JSON.stringify(arr)
                                  );
                                }

                                var win = window.open(
                                  "/data_tagging/" +
                                  e1.list_id +
                                  "/" +
                                  e1.file_id,
                                  "_blank"
                                );
                                win.focus();
                              }

                              if (e1.type == "Bill payment") {
                                let arr = [
                                  e1.type,
                                  e1.invoice_id,
                                  e1.payment_id,
                                ];

                                localStorage.setItem(
                                  "vendor_bill",
                                  JSON.stringify(arr)
                                );

                                // alert(e1.payment_id)
                                // this.props.history.push('/data_tagging/' + e1.list_id + '/' + e1.file_id)
                                var win = window.open(
                                  "/data_tagging/" +
                                  e1.list_id +
                                  "/" +
                                  e1.file_id,
                                  "_blank"
                                );
                                win.focus();
                              }

                              if (e1.type == "Customer credit note") {
                                var setID = e1.credit_memo_id;

                                localStorage.setItem("credit_id", setID);
                                window.open("/create_creditmemo?memo_id=" + setID)
                                // alert(e1.credit_memo_id);

                                // var win = window.open(
                                //   "/create_creditmemo",
                                //   "_blank"
                                // );
                                // win.focus();
                              }
                              // if (
                              //   e1.type == "Bill" ||
                              //   e1.type == "Bill payment" ||  e1.type == "Credit memo"
                              // ) {
                              //   if (e1.type == "Bill") {
                              //     var setID = e1.trans;
                              //   } else if (e1.type == "Bill payment") {
                              //     var setID = e1.invoice_id + "=" + e1.trans;
                              //   } else if (e1.type == "Credit memo") {
                              //     var setID = e1.trans;
                              //   }

                              // localStorage.setItem("invoice_id", setID);

                              //   var win = window.open(
                              //     "/create_invoice",
                              //     "_blank"
                              //   );
                              //   win.focus();
                              // }

                              // if (
                              //   e1.type == "Bill" ||
                              //   e1.type == "Bill payment" ||  e1.type == "Credit"
                              // ) {

                              //   if( e1.type == "Bill"  || e1.type == "Credit"){
                              //     let arr = [ e1.type,e1.invoice_id]
                              //     localStorage.setItem("vendor_bill", JSON.stringify(arr)
                              //     );
                              //   }

                              //   var win = window.open(
                              //     '/data_tagging/' +  e1.list_id + '/' +  e1.file_id,
                              //         "_blank"
                              //       );
                              //       win.focus();
                              //   }
                              // if (
                              //   e1.type == "Bill" ||
                              //   e1.type == "Bill payment" ||  e1.type == "Credit memo"
                              // ) {

                              //   // this.props.history.push('/data_tagging/' + e1.list_id + '/' + e1.file_id)

                              //   var win = window.open(
                              //     '/data_tagging/' +  e1.list_id + '/' +  e1.file_id,
                              //         "_blank"
                              //       );
                              //       win.focus();
                              // }


                              if (
                                e1.type == "Vendor credit note"
                              ) {
                                let arr = [
                                  e1.type,
                                  e1.credit_memo_id,
                                ];
                                console.log(
                                  "hy",
                                  e1.credit_memo_id
                                );
                                localStorage.setItem(
                                  "vendor_bill",
                                  JSON.stringify(arr)
                                );


                                var win = window.open(
                                  "/data_tagging/" +
                                  e1.list_id +
                                  "/" +
                                  e1.file_id,
                                  "_blank"
                                );
                                win.focus();
                              }


                              if (
                                e1.type == "Customer Multipayment"
                              ) {
                                let arr = [
                                  e1.customer_id,
                                  e1.multi_payment_applied_invoices,
                                ];

                                localStorage.setItem(
                                  "edit_customer_receive_payment",
                                  JSON.stringify(arr)
                                );


                                var win = window.open('/Customer_receive_payment', "_blank");
                                win.focus();
                              }

                            }}
                          >
                            <td
                              className=".headcol "
                              style={{ paddingLeft: `${paddingLeft}px` }}
                            >
                              <span>{e1.transaction_number}</span>
                            </td>
                            <td className="">
                              <span>{e1.type}</span>
                            </td>
                            <td className="">
                              <span>{e1.last_modified}</span>
                            </td>
                            <td className="">
                              <span>{e1.last_modified_by}</span>
                            </td>
                            <td className="">
                              <span>{e1.transaction_date}</span>
                            </td>
                            <td className="">
                              <span>{e1.num}</span>
                            </td>
                            <td className="">
                              <span>{e1.name}</span>
                            </td>

                            <td className="">
                              <span>{e1.source_name}</span>
                            </td>
                            <td className="">
                              <span>{e1.job_name}</span>
                            </td>
                            <td className="">
                              <span>{e1.memo}</span>
                            </td>
                            <td className="">
                              <span>{e1.account}</span>
                            </td>
                            <td className="">
                              <span>{e1.split != "" ? e1.split : ""}</span>
                            </td>
                            <td>
                              <span>{""} </span>
                            </td>
                            {/* <td className=''>
                    <span>{e1.open_balance_home_currency}</span>
                  </td> */}

                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.open_balance_home_currency)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(
                                  Number(e1.open_balance_home_currency).toFixed(
                                    2
                                  )
                                )
                                  ? "0"
                                  : Number(
                                    e1.open_balance_home_currency
                                  ).toFixed(2)} */}
                              </span>
                            </td>
                            {/* <td className=''>
                    <span>{e1.debit}</span>
                  </td>
                  <td className=''>
                    <span>{e1.credit}</span>
                  </td> */}

                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.debit)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(Number(e1.debit).toFixed(2))
                                  ? "0"
                                  : Number(e1.debit).toFixed(2)} */}
                              </span>
                            </td>

                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.credit)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(Number(e1.credit).toFixed(2))
                                  ? "0"
                                  : Number(e1.credit).toFixed(2)} */}
                              </span>
                            </td>
                            {/* <td className=''>
                    <span>{e1.amount}</span>
                  </td> */}

                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.amount)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(Number(e1.amount).toFixed(2))
                                  ? "0"
                                  : Number(e1.amount).toFixed(2)} */}
                              </span>
                            </td>
                            <td>
                              <span>{""} </span>
                            </td>
                            {/* <td className=''>
                    <span>{e1.balance}</span>
                  </td> */}
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.balance)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(Number(e1.balance).toFixed(2))
                                  ? "0"
                                  : Number(e1.balance).toFixed(2)} */}
                              </span>
                            </td>
                            <td className="">
                              <span>{e1.currency}</span>
                            </td>
                            <td className="">
                              <span>{e1.exchange_rate}</span>
                            </td>
                            {/* <td className=''>
                    <span>{e1.open_balance_foreign_currency}</span>
                  </td> */}
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.open_balance_foreign_currency)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(
                                  Number(
                                    e1.open_balance_foreign_currency
                                  ).toFixed(2)
                                )
                                  ? "0"
                                  : Number(
                                    e1.open_balance_foreign_currency
                                  ).toFixed(2)} */}
                              </span>
                            </td>

                            {/* <td className=''>
                    <span>{e1.foreign_debit}</span>
                  </td> */}
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.foreign_debit)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(Number(e1.foreign_debit).toFixed(2))
                                  ? "0"
                                  : Number(e1.foreign_debit).toFixed(2)} */}
                              </span>
                            </td>

                            {/* <td className=''>
                    <span>{e1.foreign_credit}</span>
                  </td> */}

                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.foreign_credit)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(Number(e1.foreign_credit).toFixed(2))
                                  ? "0"
                                  : Number(e1.foreign_credit).toFixed(2)} */}
                              </span>
                            </td>
                            {/* <td className=''>
                    <span>{e1.foreign_amount}</span>
                  </td> */}

                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.foreign_amount)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(Number(e1.foreign_amount).toFixed(2))
                                  ? "0"
                                  : Number(e1.foreign_amount).toFixed(2)} */}
                              </span>
                            </td>
                            <td>
                              <span>{""} </span>
                            </td>

                            {/* <td className=''>
                    <span>{e1.split != '' ? e1.split : ''}</span>
                  </td> */}

                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(e1.foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                {/* {isNaN(Number(e1.foreign_balance).toFixed(2))
                                  ? "0"
                                  : Number(e1.foreign_balance).toFixed(2)} */}
                              </span>
                            </td>
                            {/* <td className=''>
                    <span>{e1.foreign_balance}</span>
                  </td> */}
                            <td className="">
                              <span>{e1.aging}</span>
                            </td>
                            <td className="">
                              <span>{e1.terms != null ? e1.terms : ""}</span>
                            </td>
                            <td className="">
                              <span>{e1.contact}</span>
                            </td>
                            <td className="">
                              <span>{e1.postal_code}</span>
                            </td>
                            <td className="">
                              <span>{e1.province}</span>
                            </td>
                            <td className="">
                              <span>{e1.city}</span>
                            </td>
                            <td className="">
                              <span>{e1.address}</span>
                            </td>
                            <td className="">
                              <span>{e1.email}</span>
                            </td>
                            <td className="">
                              <span>{e1.phone}</span>
                            </td>
                            <td className="">
                              <span>{e1.fax}</span>
                            </td>
                          </tr>
                          {this.state.view == false &&
                            e1.split_breakdown_string &&
                            e1.split_breakdown_string.map((item, i) => {
                              return (
                                <tr className="item-step1 istep-2 title1">
                                  <td>
                                    <span> </span>
                                  </td>
                                  <td>
                                    <span className="text-right"></span>
                                  </td>
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>
                                  <td>
                                    <span className="text-right"></span>
                                  </td>
                                  <td>
                                    <span className="">
                                      {e1.split_breakdown_string[i]}
                                    </span>
                                  </td>
                                  <td>
                                    <span className=""></span>
                                  </td>
                                  <td>
                                    <span className=""></span>
                                  </td>{" "}
                                  <td>
                                    <span className=""></span>
                                  </td>
                                  <td>
                                    <span className=" "></span>
                                  </td>
                                  <td>
                                    <span className="">
                                      {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                        { style: 'currency', currency: this.state.home_currency }).format(e1.split_breakdown_amount[i])).replace(this.state.home_currency_symbol, '')}
                                      {/* {e1.split_breakdown_amount[i]} */}
                                    </span>
                                  </td>
                                  <td>
                                    <span className=" "></span>
                                  </td>
                                  <td>
                                    <span className="text-right"></span>
                                  </td>
                                  <td>
                                    <span className="text-right"></span>
                                  </td>
                                  <td>
                                    <span className=" "></span>
                                  </td>
                                  <td>
                                    <span className=" "></span>
                                  </td>
                                  <td>
                                    <span className=" "></span>
                                  </td>
                                  <td>
                                    <span className=" "></span>
                                  </td>
                                  <td>
                                    <span className="">
                                      {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                        { style: 'currency', currency: this.state.home_currency }).format(e1.split_breakdown_foreign_amount[i])).replace(this.state.home_currency_symbol, '')}
                                      {/* {e1.split_breakdown_foreign_amount[i]} */}
                                    </span>
                                  </td>
                                  <td>
                                    <span className=" "></span>
                                  </td>
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                  <td>
                                    <span className="text-right"></span>
                                  </td>{" "}
                                </tr>
                              );
                            })}
                        </>
                      );
                    })}
                  {sub_categories[0][itm].invoices &&
                    !isNaN(Number(sub_categories[0][itm].total_amount)) &&
                    sub_categories[0][itm].is_transactions_available == 1
                    // Number(sub_categories[0][itm].total_amount) != 0 

                    && (
                      <React.Fragment>
                        {sub_categories[0][itm].is_child_data_available == 1 &&
                          sub_categories[0][itm].invoices &&
                          sub_categories[0][itm].invoices.length > 0 && (
                            <tr className="item-step1 istep-2 title1">
                              <td style={{ paddingLeft: `${paddingLeft}px` }}>
                                <span>
                                  Total {""}{" "}
                                  {sub_categories[0][itm].category_name} {""}-
                                  {""} others{" "}
                                </span>
                              </td>
                              {/* 
                                  <td>
                                    <span className='text-right'>
                                      {Number(invoices.total_amount).toFixed(
                                        2
                                      )}
                                    </span>
                                  </td> */}
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className="">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_others_open_balance)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm]
                                        .total_others_open_balance
                                    ).toFixed(2)
                                  )
                                    ? "0.00"
                                    : Number(
                                      sub_categories[0][itm]
                                        .total_others_open_balance
                                    ).toFixed(2)} */}
                                </span>
                              </td>
                              <td>
                                <span className="">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_others_debit)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm].total_others_debit
                                    ).toFixed(2)
                                  )
                                    ? "0.00"
                                    : Number(
                                      sub_categories[0][itm]
                                        .total_others_debit
                                    ).toFixed(2)} */}
                                </span>
                              </td>{" "}
                              <td>
                                <span className="">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_others_credit)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm].total_others_credit
                                    ).toFixed(2)
                                  )
                                    ? "0.00"
                                    : Number(
                                      sub_categories[0][itm]
                                        .total_others_credit
                                    ).toFixed(2)}{" "} */}
                                </span>
                              </td>
                              <td>
                                <span className=" ">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_others_amount)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm].total_others_amount
                                    ).toFixed(2)
                                  )
                                    ? 0
                                    : Number(
                                      sub_categories[0][itm]
                                        .total_others_amount
                                    ).toFixed(2)} */}
                                </span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className=" ">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].current_others_closing_balance)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm]
                                        .current_others_closing_balance
                                    ).toFixed(2)
                                  )
                                    ? 0
                                    : Number(
                                      sub_categories[0][itm]
                                        .current_others_closing_balance
                                    ).toFixed(2)} */}
                                </span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className=" ">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_others_open_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm]
                                        .total_others_open_foreign_balance
                                    ).toFixed(2)
                                  )
                                    ? 0
                                    : Number(
                                      sub_categories[0][itm]
                                        .total_others_open_foreign_balance
                                    ).toFixed(2)} */}
                                </span>
                              </td>
                              <td>
                                <span className=" ">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_others_foreign_debit)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm]
                                        .total_others_foreign_debit
                                    ).toFixed(2)
                                  )
                                    ? 0
                                    : Number(
                                      sub_categories[0][itm]
                                        .total_others_foreign_debit
                                    ).toFixed(2)} */}
                                </span>
                              </td>
                              <td>
                                <span className=" ">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_others_foreign_credit)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm]
                                        .total_others_foreign_credit
                                    ).toFixed(2)
                                  )
                                    ? 0
                                    : Number(
                                      sub_categories[0][itm]
                                        .total_others_foreign_credit
                                    ).toFixed(2)} */}
                                </span>
                              </td>
                              <td>
                                <span className=" ">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_others_foreign_amount)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm]
                                        .total_others_foreign_amount
                                    ).toFixed(2)
                                  )
                                    ? 0
                                    : Number(
                                      sub_categories[0][itm]
                                        .total_others_foreign_amount
                                    ).toFixed(2)} */}
                                </span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className=" ">
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].current_others_closing_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                  {/* {isNaN(
                                    Number(
                                      sub_categories[0][itm]
                                        .current_others_closing_foreign_balance
                                    ).toFixed(2)
                                  )
                                    ? 0
                                    : Number(
                                      sub_categories[0][itm]
                                        .current_others_closing_foreign_balance
                                    ).toFixed(2)} */}
                                </span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>{" "}
                              <td>
                                <span className="text-right"></span>
                              </td>
                            </tr>
                          )}
                        <tr className="item-step1 istep-2 title1">
                          <td style={{ paddingLeft: `${paddingLeft}px` }}>
                            <span>
                              Total {sub_categories[0][itm].category_name}{" "}
                            </span>
                          </td>
                          {/* 
                                  <td>
                                    <span className='text-right'>
                                      {Number(invoices.total_amount).toFixed(
                                        2
                                      )}
                                    </span>
                                  </td> */}
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className="">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_open_balance)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].total_open_balance
                                ).toFixed(2)
                              )
                                ? "0.00"
                                : Number(
                                  sub_categories[0][itm].total_open_balance
                                ).toFixed(2)} */}
                            </span>
                          </td>
                          <td>
                            <span className="">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_debit)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].total_debit
                                ).toFixed(2)
                              )
                                ? "0.00"
                                : Number(
                                  sub_categories[0][itm].total_debit
                                ).toFixed(2)} */}
                            </span>
                          </td>{" "}
                          <td>
                            <span className="">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_credit)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].total_credit
                                ).toFixed(2)
                              )
                                ? "0.00"
                                : Number(
                                  sub_categories[0][itm].total_credit
                                ).toFixed(2)}{" "} */}
                            </span>
                          </td>
                          <td>
                            <span className=" ">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_amount)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].total_amount
                                ).toFixed(2)
                              )
                                ? 0
                                : Number(
                                  sub_categories[0][itm].total_amount
                                ).toFixed(2)} */}
                            </span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className=" ">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].current_closing_balance)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].current_closing_balance
                                ).toFixed(2)
                              )
                                ? 0
                                : Number(
                                  sub_categories[0][itm]
                                    .current_closing_balance
                                ).toFixed(2)} */}
                            </span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className=" ">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_open_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm]
                                    .total_open_foreign_balance
                                ).toFixed(2)
                              )
                                ? 0
                                : Number(
                                  sub_categories[0][itm]
                                    .total_open_foreign_balance
                                ).toFixed(2)} */}
                            </span>
                          </td>
                          <td>
                            <span className=" ">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_foreign_debit)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].total_foreign_debit
                                ).toFixed(2)
                              )
                                ? 0
                                : Number(
                                  sub_categories[0][itm].total_foreign_debit
                                ).toFixed(2)} */}
                            </span>
                          </td>
                          <td>
                            <span className=" ">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_foreign_credit)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].total_foreign_credit
                                ).toFixed(2)
                              )
                                ? 0
                                : Number(
                                  sub_categories[0][itm].total_foreign_credit
                                ).toFixed(2)} */}
                            </span>
                          </td>
                          <td>
                            <span className=" ">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].total_foreign_amount)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm].total_foreign_amount
                                ).toFixed(2)
                              )
                                ? 0
                                : Number(
                                  sub_categories[0][itm].total_foreign_amount
                                ).toFixed(2)} */}
                            </span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className=" ">
                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                { style: 'currency', currency: this.state.home_currency }).format(sub_categories[0][itm].current_closing_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                              {/* {isNaN(
                                Number(
                                  sub_categories[0][itm]
                                    .current_closing_foreign_balance
                                ).toFixed(2)
                              )
                                ? 0
                                : Number(
                                  sub_categories[0][itm]
                                    .current_closing_foreign_balance
                                ).toFixed(2)} */}
                            </span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                          <td>
                            <span className="text-right"></span>
                          </td>{" "}
                        </tr>
                      </React.Fragment>
                    )}
                  {/* others  ends */}
                </React.Fragment>
              );
            })}
        </React.Fragment>
      );
    }
  };

  all_report_name = () => {
    FetchAllApi.all_report_name((err, response) => {
      if (response.status === 1) {
        console.log("nvnvnv", response);
        let report_ids = response.response;
        for (var i = 0; i < report_ids.length; i++) {
          if (report_ids[i].column_name == "General_ledger") {
            this.setState(
              { all_report_name_id: report_ids[i].report_id },
              () => {
                this.callAPIDATA();
                this.sortByNames();
              }
            );
          }
        }
      } else {
      }
    });
  };

  vendor_type = () => {
    var client_id = this.state.logged_client_id;

    FetchAllApi.vendorTypes(client_id, (err, response) => {
      console.log("Customer list", response);

      if (response.status === 1) {
        this.setState({ vendor_type: response.list });
      } else {
        this.setState({ vendor_type: [] });
      }
    });
  };

  customer_type = () => {
    FetchAllApi.customerTypes((err, response) => {
      console.log("Customer list", response);
      if (response.status === 1) {
        this.setState({ customer_type: response.lists });
      } else {
        this.setState({ customer_type: [] });
      }
    });
  };

  paymentTerms = () => {
    FetchAllApi.payment_terms((err, response) => {
      console.log("Customer list", response);
      if (response.status === 1) {
        this.setState({ paymentTerms: response.lists });
      } else {
        this.setState({ paymentTerms: [] });
      }
    });
  };

  get_vendorNames = () => {
    let client_id = this.state.logged_client_id;
    // alert('hjgh')
    FetchAllApi.getVendorNames(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ vendorNames: response.list });
      } else {
      }
    });
  };
  get_currencies = () => {
    // fetch("https://api.exchangerate-api.com/v4/latest/SGD")
    fetch(`https://api.currencylayer.com/live?access_key=${config.api_key}&source=SGD`)

      .then((response) => response.json())
      .then((data) => {
        let newObj = this.rename(data.quotes, 'SGD')

        const currencyAr = [];
        let first = newObj;
        for (const key in first) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr, currency_clone: currencyAr });
      });
  };

  componentWillMount() {

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }


    this.get_currencies();
    this.get_col();
    this.all_report_name();
    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }



  }

  comma = (w) => {
    var amt = w;
    var x = amt.toLocaleString();
   // alert(x);
    var y = Number(w).toFixed(2);
    //alert(y);
  };

  componentDidUpdate() {
    setTimeout(() => {
      this.kks();
    }, 4000);
    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
    this.setColCount();
  }

  setColCount = () => {
    var foo = document.getElementById("mytable");
    if (foo) {
      let count = foo.tBodies["0"].firstElementChild.children.length;
      if (this.state.tableSize === count) {
      } else {
        this.setState({ tableSize: count });
      }
    }
  };
  kks = () => {
    //   var THIS=this;
    //   jQuery("#mytable td").click(function() {
    //     // alert(jQuery(this).parents("tr").get(0).rowIndex)
    // var myval=jQuery(this).parents("tr").get(0).rowIndex
    //     // this.setState({specificRowIndex:myval});
    //     THIS.setState({specificRowIndex:myval},()=>{
    //       // alert(THIS.state.specificRowIndex)
    //     });
    // });
  };



  all_account_list = () => {
    let input = {
      client_id: this.state.logged_client_id
    }
    // alert('hjgh')
    FetchAllApi.all_account_list(input, (err, response) => {
      if (response.status === 1) {
        this.setState({ all_account_list: response.list });
      } else {
      }
    });
  };


  all_transaction_type_list = () => {
    let input = {
      client_id: this.state.logged_client_id
    }
    // alert('hjgh')
    FetchAllApi.all_transaction_type_list(input, (err, response) => {
      if (response.status === 1) {
        this.setState({ all_transaction_type_list: response.list });
      } else {
      }
    });
  };

  job_name_list = () => {
    let input = {
      client_id: this.state.logged_client_id
    }
    // alert('hjgh')
    FetchAllApi.job_name_list(input, (err, response) => {
      if (response.status === 1) {
        this.setState({ job_name_list: response.list });
      } else {
      }
    });
  };



  componentDidMount() {
    // window.jQuery(document).ready(function () {
    // window.jQuery('#mytable').sticky({
    //  'top': " tr:first-child",
    //  'left': " tr td:first-child",
    // 'left': " #oneSticky",
    // 'left': " #two",
    //  "right": " tr td:last-child",
    //  "bottom": " tr:last-child"
    // });

    // setTimeout(function () {
    // - $('.table-base').unstick();
    // }, 1000);
    // })
    const urlParams = new URLSearchParams(window.location.search);
    let start = urlParams.get("start");
    let end = urlParams.get("end");
    let range = urlParams.get("range");
    
    this.setState({
      start_date: start,
      end_date: end,
      date_range : range
    })
    if(range != 'All'){
      jQuery('#fromdate').val(moment(start).format("DD-MM-YYYY"))
      jQuery('#todate').val(moment(end).format("DD-MM-YYYY"))
    }else{
      jQuery('#fromdate').val('')
      jQuery('#todate').val('')
    }
    


    this.all_account_list()
    this.all_transaction_type_list()
    this.job_name_list()

    this.watchMe();
    document
      .getElementById("sticky-tb-hdr")
      .addEventListener("scroll", function () {
        var translate = "translate(0," + this.scrollTop + "px)";
        if (
          this.querySelector("thead") != null &&
          this.querySelector("thead") != undefined &&
          this.querySelector("thead").style != null
        ) {
          this.querySelector("thead").style.transform = translate;
        }
      });

    // alert(this.state.logged_client_id)
    this.vendor_type();
    this.customer_type();
    this.paymentTerms();
    this.show_columnslist();
    this.get_vendorNames();
    // jQuery(".custom-select-drop .dropdown-menu a").click(function () {
    //   jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
    //     "active"
    //   );
    //   jQuery(this).parent("li").addClass("active");
    //   jQuery(".open #selected").text(jQuery(this).text());
    // });
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

    jQuery(".snippet").mouseenter(function () {
      jQuery(".snippet").removeClass("active");
      jQuery(this).addClass("active");
    });

    jQuery(".filter-btn").click(function () {
      jQuery(this).css("visibility", "hidden");
      jQuery(".report-filter").slideDown();
    });

    jQuery(".report-filter .close-btn").click(function () {
      jQuery(".filter-btn").css("visibility", "visible");
      jQuery(".report-filter").slideUp();
    });
    this.callAPIDATA();
    setTimeout(() => {
      this.kks();
    }, 4000);
  }

  customRadioChange = (x) => {
    this.setState({ valueAmount_type: x });
  };

  customRadioChange1 = (x) => {
    this.setState({ valueAmount_type1: x });
  };
  customRadioChange2 = (x) => {
    this.setState({ valueAmount_type2: x });
  };
  customRadioChange3 = (x) => {
    this.setState({ valueAmount_type3: x });
  };
  customRadioChange4 = (x) => {
    this.setState({ valueAmount_type4: x });
  };

  selected_item = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    let show_columns = optionElement.getAttribute("data-id");
    this.setState({ show_columns: show_columns }, () => {
      this.callAPIDATA();
    });
  };
  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  show_coulmn_filter = (e) => {
    var names = [];
    var result = [];
    console.log("jskdghjkg", e.target.options);

    var options = e.target.options;
    var opt;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        let value = JSON.parse(opt.value);
        result.push(value.b || opt.text);
        names.push(value.a || opt.text);
        // alert(opt.text)
        jQuery(
          "td:nth-child(" + value.b + "),th:nth-child(" + value.b + ")"
        ).show();
      } else {
        let value = JSON.parse(opt.value);
        jQuery(
          "td:nth-child(" + value.b + "),th:nth-child(" + value.b + ")"
        ).hide();
      }
    }
    this.setState({ ColscountArray: result }, this.filterFilters(names));
  };

  filterFilters = (result) => {
    let filter_key_names = [];
    this.state.coulmns_head &&
      this.state.coulmns_head !== undefined &&
      this.state.coulmns_head.map((item, i) => {
        console.log("filter_key_names", item);
        console.log("filter_key_w", result);

        if (result.includes(item.id))
          filter_key_names.push(`'${item.filter_key_name}'`);
      });
    console.log("filter_key_wq", filter_key_names);
    this.setState({ filter_key_names: filter_key_names });
    // this.callAPIDATA()
    FetchAllApi.filter_column(
      this.state.all_report_name_id,this.state.logged_client_id,
      filter_key_names,
      (errResponse, filtervalue) => {
        console.log("Fijkjlter Result", filtervalue);
        this.setState({ filtervalue: filtervalue });
      }
    );
  };

  selectedVendorIds = (e) => {
    var result = [];

    this.setState({ selected_vendor_ids: result }, () => {
      this.callAPIDATA();
    });

    var options = e.target.options;
    var opt;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      } else {
      }
    }
  };
  selectedTerms = (e) => {
    var result = [];

    this.setState({ selectedTerms: result }, () => {
      this.callAPIDATA();
    });

    var options = e.target.options;
    var opt;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(Number(opt.value) || Number(opt.text));
      } else {
      }
    }
  };
  selectedCustomer_type = (e) => {
    var result = [];

    this.setState({ selectedCustomer_type: result }, () => {
      this.callAPIDATA();
    });

    var options = e.target.options;
    var opt;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      } else {
      }
    }
  };
  selectedVendor_type = (e) => {
    var result = [];

    this.setState({ selectedVendor_type: result }, () => {
      this.callAPIDATA();
    });

    var options = e.target.options;
    var opt;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      } else {
      }
    }
  };
  selected_filters = (e) => {
    var result = [];
    var options = e.target.options;
    var opt;
    var j = 0;
    var array = [];
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result[j] = Number(opt.value);
        j++;
      }
    }
    this.setState({ result_array: result }
      , () => {
        this.callAPIDATA();
      }
    );

    if (result.length > 0) {
      if (result.includes(1)) {
        this.setState({ selectedFil: 1 });
      }
      if (result.includes(2)) {
        this.setState({ selectedFil: 2 });
      }
      if (result.includes(3)) {
        this.setState({ selectedFil: 3 });
      }
      if (result.includes(5)) {
        this.setState({ selectedFil: 5 });
      }
      if (result.includes(6)) {
        this.setState({ selectedFil: 6 });
      }
      if (result.includes(7)) {
        this.setState({ selectedFil: 7 });
      }
      if (result.includes(8)) {
        this.setState({ selectedFil: 8 });
      }
      if (result.includes(10)) {
        this.setState({ selectedFil: 10 });
      }
      if (result.includes(11)) {
        this.setState({ selectedFil: 11 });
      }

      if (result.includes(13)) {
        this.setState({ selectedFil: 13 });
      }
      if (result.includes(17)) {
        this.setState({ selectedFil: 17 });
      }
      if (result.includes(18)) {
        this.setState({ selectedFil: 18 });
      }
      if (result.includes(24)) {
        this.setState({ selectedFil: 24 });
      }
      if (result.includes(25)) {
        this.setState({ selectedFil: 25 });
      }
      if (result.includes(26)) {
        this.setState({ selectedFil: 26 });
      }
      if (result.includes(27)) {
        this.setState({ selectedFil: 27 });
      }
      if (result.includes(28)) {
        this.setState({ selectedFil: 28 });
      }

      if (result.includes(22)) {
        this.setState({ selectedFil: 22 });
      }
      if (result.includes(23)) {
        this.setState({ selectedFil: 23 });
      }
      if (result.includes(29)) {
        this.setState({ selectedFil: 29 });
      }

      if (result.includes(32)) {
        this.setState({ selectedFil: 32 });
      }

      if (result.includes(50)) {
        this.setState({ selectedFil: 50 });
      }

      if (result.includes(33)) {
        this.setState({ selectedFil: 33 });
      }

      if (result.includes(49)) {
        this.setState({ selectedFil: 49 });
      }


      if (result.includes(35)) {
        this.setState({ selectedFil: 35 });
      }

      if (result.includes(48)) {
        this.setState({ selectedFil: 48 });
      }

    } else {
      this.setState({ selectedFil: 0 });
    }
  };
  changeText = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: this.state.valueAmount_type,
            value: this.state.valueAmount,
            from: this.state.From,
            to: this.state.To,
          },
          filter_options1: {
            condition: this.state.valueAmount_type,
            value: this.state.valueAmount,
            from: this.state.From,
            to: this.state.To,
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText1 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: this.state.valueAmount_type1,
            value: this.state.valueAmount1,
            from: this.state.From,
            to: this.state.To,
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText2 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: this.state.valueAmount_type2,
            value: this.state.valueAmount2,
            from: this.state.From,
            to: this.state.To,
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText3 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: this.state.valueAmount_type3,
            value: this.state.valueAmount3,
            from: this.state.From4,
            to: this.state.To4,
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };

  changeText4 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: this.state.valueAmount_type3,
            value: this.state.valueAmount3,
            from: this.state.From4,
            to: this.state.To4,
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };

  changeText_Num = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.number_from,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };

  changeText_memo = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.memo,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };

  changeText_open = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.open_balance,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText_Exchange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.Exchange_rate,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText_Fopen = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.F_open,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText_addr = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.Address,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText_web = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.website,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText_mail = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.mail,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText_acc = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.accnum,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };
  changeText_phone = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.phone_number,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };

  changeText_split = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.split_filter,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };

  changeText_Source_name = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.source_name,
            from: "",
            to: "",
          },
        },
        () => {
          this.callAPIDATA();
        }
      );
    });
  };




  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }
  multiSelectedCurrency = () => {
    //alert(jQuery('#slectedCurrency').val())
    this.setState(
      { selectedCurrencies: jQuery("#slectedCurrency").val() },
      () => {
        this.callAPIDATA();
      }
    );
  };


  multiSelectedAccount = () => {
    this.setState(
      { selectedAccountIds: jQuery("#selectedAccountIds").val() },
      () => {
        this.callAPIDATA();
      }
    );
  };


  multiSelectedType = () => {
    this.setState(
      { multiSelectedTypeIds: jQuery("#multiSelectedTypeIds").val() },
      () => {
        this.callAPIDATA();
      }
    );
  };


  multiplejobSelected = () => {
    this.setState(
      { multiplejobSelected: jQuery("#multiplejobSelected").val() },
      () => {
        this.callAPIDATA();
      }
    );
  };


  changedatevalue(seleteddateformat) {
    var dateresult = moment();
    let from_date, to_date;

    if (seleteddateformat === "This Month-to-date") {
      from_date = dateresult.startOf("month");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      document.getElementById("todate").value = moment(new Date()).format(
        "DD-MM-YYYY"
      );
      this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
      this.callAPIDATA();
    } else if (seleteddateformat === "This Week") {
      from_date = dateresult.startOf("week");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      console.log("startdate", this.state.start_date);
      to_date = dateresult.endOf("week");
      document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.callAPIDATA();
    } else if (seleteddateformat === "This Month") {
      from_date = dateresult.startOf("month");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("month");
      document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.callAPIDATA();
    } else if (seleteddateformat === "This Week-to-date") {
      from_date = dateresult.startOf("week");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      document.getElementById("todate").value = moment(new Date()).format(
        "DD-MM-YYYY"
      );
      this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
      this.callAPIDATA();
    } else if (seleteddateformat === "This Year") {
      from_date = dateresult.startOf("year");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("year");
      document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.callAPIDATA();
    } else if (seleteddateformat === "This Year-to-date") {
      from_date = dateresult.startOf("year");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = moment(new Date()).format("YYYY-MM-DD");
      document.getElementById("todate").value = moment(to_date).format(
        "DD-MM-YYYY"
      );
      this.state.end_date = to_date;
      this.callAPIDATA();
    }

    // let startDate = jQuery('#fromdate').val()
    // let end_date = jQuery('#todate').val()
    // this.setState({ start_date: startDate, end_date: end_date }, () => {
    //   this.callAPIDATA();
    // })

    if (seleteddateformat == "ALL") {
      this.setState(
        {
          start_date: "1970-01-01",
          end_date: moment().add(10, 'years').format("YYYY-MM-DD"),
        },
        () => {
          this.callAPIDATA();
        }
      );
      document.getElementById("fromdate").value = "";
      document.getElementById("todate").value = "";
    }
  }
  changefromDate(fromdate) {
    let date = jQuery("#fromdate").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ start_date: date_formated }, () => {
        this.callAPIDATA();
      });
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }
  changefromDate1(fromdate) {
    let date = jQuery("#fromdate1").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ date_start: date_formated }, () => {
        this.callAPIDATA();
      });
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }
  changefromDate_duedate(fromdate) {
    let date = jQuery("#fromdate_duedate").val();
    console.log("fromdate RTEdsadaasdadasdadad", date);
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      console.log("fromdate RTERE", date_formated);
      this.setState({ changefromDate_duedate: date_formated }, () => {
        this.callAPIDATA();
      });
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }

  get_col = () => {
    let report_id = 11;
    FetchAllApi.get_col(this.state.logged_client_id,report_id, (err, response) => {
      if (response.status === 1) {
        var active = [];
        let active_headings = response.response.map((item) => {
          if (item.status === 1) {
            active.push(item.heading_name);
          }
        });

        let coulmns_head = response.response;

        // let coulmns_head=[];
        // for(let i=0;i<coulmns.length;i++){

        //   if(i==6){
        //     var obj=coulmns[i];
        //     coulmns_head.push(obj);
        //     coulmns_head.push(coulmns[coulmns.length-1]);

        //   }else{
        //     if(i!==32){   var objj=coulmns[i];
        //       coulmns_head.push(objj);}

        //   }
        // }

        // for(let i=0;i<coulmns.length;i++){
        //   var myObj=coulmns[i]
        //   if(i>21){
        //     myObj['status']=2
        //   }else{
        //     myObj['status']=1
        //   }
        //   coulmns_head.push(myObj)

        // }

        let optionList = "";
        if (coulmns_head) {
          var options = coulmns_head.map((item, i) => {
            return <option>{item.heading_name}</option>;
          });
        }

        console.log("jhjkhjkhj", coulmns_head);

        this.setState(
          {
            selected_vals: active,
            coulmns_head: coulmns_head,
            options: options,
          },
          () => {
            setTimeout(() => {
              for (let k = 0; k <= coulmns_head.length; k++) {
                // if (k > 23) {
                //   jQuery(
                //     "td:nth-child(" + k + "),th:nth-child(" + k + ")"
                //   ).hide();
                // }
                // if (k == 8) {
                //   jQuery(
                //     "td:nth-child(" + 8 + "),th:nth-child(" + 8 + ")"
                //   ).hide();
                // }

                // if (k == 9) {
                //   jQuery(
                //     "td:nth-child(" + 9 + "),th:nth-child(" + 9 + ")"
                //   ).hide();
                // }
                if (k == 13) {
                  jQuery(
                    "td:nth-child(" + 13 + "),th:nth-child(" + 13 + ")"
                  ).hide();
                }
                if (k == 18) {
                  jQuery(
                    "td:nth-child(" + 18 + "),th:nth-child(" + 18 + ")"
                  ).hide();
                }
                if (k == 26) {
                  jQuery(
                    "td:nth-child(" + 26 + "),th:nth-child(" + 26 + ")"
                  ).hide();
                }
                // if (k == 28) {
                //   jQuery(
                //     "td:nth-child(" + 28 + "),th:nth-child(" + 28 + ")"
                //   ).hide();
                // }
              }
            }, 1000);
          }
        );
      } else {
        this.setState({
          gst_list: [],
        });
      }
    });
  };

  show_columnslist = () => {
    let report_name = "balance_sheet";
    FetchAllApi.get_coulmnlist(report_name, (err, response) => {
      if (response.status === 1) {
        this.setState({
          show_coulmns_filter: response.details,
        });
      } else {
        this.setState({
          gst_list: [],
        });
      }
    });
  };

  onChange_filterbysubvalue = (val) => {
    var sub_columns;
    if (val === 2 || val === 3) {
      sub_columns = [1];
      if (val === 2) {
        if (jQuery("#cadchanges2").prop("checked") == true)
          this.setState({ cadchange: true });
        else this.setState({ cadchange: false });
      } else {
        if (jQuery("#cadpercentage2").prop("checked") == true)
          this.setState({ cadpercentage: true });
        else this.setState({ cadpercentage: false });
      }
    } else {
      sub_columns = [4];
      if (val === 5) {
        if (jQuery("#cadchanges1").prop("checked") == true)
          this.setState({ cadchange: true });
        else this.setState({ cadchange: false });
      } else {
        if (jQuery("#cadpercentage1").prop("checked") == true)
          this.setState({ cadpercentage: true });
        else this.setState({ cadpercentage: false });
      }
    }
    this.setState({ sub_columns: sub_columns }, () => {
      this.callAPIDATA();
      // alert(this.state.cadchange)
    });
  };

  onChange_filterby = (val) => {
    var sub_columns = [val];
    if (val === 1) {
      this.setState({ isChecked2: false, isChecked: true });
    } else {
      this.setState({ isChecked: false, isChecked2: true });
    }
    this.setState({ sub_columns: sub_columns }, () => {
      this.callAPIDATA();
    });

    // FetchAllApi.profit_and_loss_sub_columns(sub_columns, (err, response) => {
    //   if (response.status === 1) {
    //     console.log('jhasgjkghasjk',response)
    //     this.setState({
    //     })
    //   } else {
    //     this.setState({
    //       gst_list: []
    //     })
    //   }
    // })
  };
  changetoDate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate").val();
    if (date != undefined && date!='') {
    var array = date.split("/");
    var date_formated = array[2] + "-" + array[1] + "-" + array[0];
    if(array!='' && array!=undefined){
    this.setState({ end_date: date_formated }, () => {
      this.callAPIDATA();
    });
  }}

    // this.state.end_date = moment(date).format('YYYY-MM-DD')
    //  alert(moment(todate).format('YYYY-MM-DD'))
  }
  changetoDate1(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate1").val();
    if (date != undefined && date!='') {
    var array = date.split("/");
    var date_formated = array[2] + "-" + array[1] + "-" + array[0];
    if(array!='' && array!=undefined){
    this.setState({ date_end: date_formated }, () => {
      this.callAPIDATA();
    });
  }}
    // this.state.end_date = moment(date).format('YYYY-MM-DD')
    //  alert(moment(todate).format('YYYY-MM-DD'))
  }
  changetoDate_duedate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate_duedate").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      if(array!='' && array!=undefined){
      this.setState({ todate_duedate: date_formated }, () => {
        this.callAPIDATA();
      });
    }
    }
  }

  callAPIDATA = (x) => {
    let filter_id = this.state.result_array;


    let filter_options = {
      1: {
        condition: this.state.valueAmount_type,
        value: this.state.valueAmount,
        from: this.state.From,
        to: this.state.To,
      },
      2: {
        condition: this.state.valueAmount_type1,
        value: this.state.valueAmount1,
        from: "",
        to: "",
      },

      3: {
        condition: "",
        value: "",
        from: this.state.changefromDate_duedate,
        to: this.state.todate_duedate,
      },
      5: {
        condition: "",
        value: [...this.state.selected_vendor_ids],
        from: "",
        to: "",
      },
      6: {
        condition: "",
        value: [...this.state.selectedCurrencies],
        from: "",
        to: "",
      },
      8: {
        condition: "",
        value: "",
        from: this.state.date_start,
        to: this.state.date_end,
      },
      10: {
        condition: "",
        value: "",
        from: this.state.number_from,
        to: this.state.number_to,
      },
      11: {
        condition: "",
        value: this.state.memo,
        from: "",
        to: "",
      },
      13: {
        condition: this.state.valueAmount_type2,
        value: this.state.valueAmount2,
        from: "",
        to: "",
      },
      17: {
        condition: "",
        value: this.state.Exchange_rate,
        from: "",
        to: "",
      },
      18: {
        condition: this.state.valueAmount_type3,
        value: this.state.valueAmount3,
        from: "",
        to: "",
      },
      22: {
        condition: "",
        value: [...this.state.selectedTerms],
        from: "",
        to: "",
      },
      23: {
        condition: "",
        value: [...this.state.selectedVendor_type],
        from: "",
        to: "",
      },
      24: {
        condition: "",
        value: this.state.Address,
        from: "",
        to: "",
      },
      25: {
        condition: "",
        value: this.state.website,
        from: "",
        to: "",
      },
      26: {
        condition: "",
        value: this.state.mail,
        from: "",
        to: "",
      },
      27: {
        condition: "",
        value: this.state.accnum,
        from: "",
        to: "",
      },
      28: {
        condition: "",
        value: this.state.phone_number,
        from: "",
        to: "",
      },
      29: {
        condition: "",
        value: [...this.state.selectedCustomer_type],
        from: "",
        to: "",
      },
      // 30: {
      //   condition: "",
      //   value: [...this.state.account],
      //   from: "",
      //   to: "",
      // },
    };

    this.setState({ loading: true });
    let { start_date, end_date, show_columns, sub_columns, account } = this.state;

    FetchAllApi.filter_column(
      this.state.all_report_name_id,this.state.logged_client_id, this.state.filter_key_names,
      (errResponse, filtervalue) => {
        console.log("Fijkjlter Result", filtervalue);
        this.setState({ filtervalue: filtervalue });
      }
    );


    let startDate = moment(start_date).format("YYYY-MM-DD");
    let endDate = moment(end_date).format("YYYY-MM-DD");
    console.log(urlParams)
    if (urlParams.get('breakdown_by')) {
      console.log("first")
      let account_type_id_array = [];
      let category_id_array = [];
      let is_others = 0;
      let breakdown_by = urlParams.get("breakdown_by")
      FetchAllApi.genearl_ledger_break(
        startDate,
        endDate,
        show_columns,
        account,
        this.state.logged_client_id,
        sub_columns,
        filter_id,
        filter_options,
        this.state.selectedName,
        this.state.sort_type,
        account_type_id_array,
        category_id_array,
        breakdown_by,
        is_others,

        (err, response) => {
          if (response.status === 1) {
            // chars = _.orderBy(chars, ['name'],['asc']); // Use Lodash to sort array by 'name'
            this.get_col();
            console.log(
              "Object.values(first)",
              Object.values(response.details)
            );

            this.setState(
              {
                resData: response,
                loading: false,
                // tableData: _.orderBy(Object.values(response.details), ['category_name'], ['asc'])
                tableData: Object.values(response.details),
              },
              () => {
                setTimeout(() => {
                  if (x !== undefined) {
                    var val = localStorage.getItem("scrollposition");
                    var brek = val.split("=");
                    var elmnt = document.getElementById("sticky-tb-hdr");
                    elmnt.scrollLeft = Number(brek[0]);
                    elmnt.scrollTop = Number(brek[1]);
                    var val = localStorage.setItem("scrollposition", "");
                  }
                }, 1000);
              }
            );
          } else {
            this.setState({ response: [], loading: false });
          }
        }
      )
    } else if (urlParams.get("category_id_array")) {
      console.log("second")
      let account_type_id_array = [];
      let number = Number(urlParams.get("category_id_array"))
      let category_id_array = [number];
      let is_others = 0;
      let breakdown_by = "";


      FetchAllApi.genearl_ledger_break(
        startDate,
        endDate,
        show_columns,
        account,
        this.state.logged_client_id,
        sub_columns,
        filter_id,
        filter_options,
        this.state.selectedName,
        this.state.sort_type,
        account_type_id_array,
        category_id_array,
        breakdown_by,
        is_others,

        (err, response) => {
          if (response.status === 1) {
            // chars = _.orderBy(chars, ['name'],['asc']); // Use Lodash to sort array by 'name'
            this.get_col();
            console.log(
              "Object.values(second)",
              Object.values(response.details)
            );

            this.setState(
              {
                resData: response,
                loading: false,
                // tableData: _.orderBy(Object.values(response.details), ['category_name'], ['asc'])
                tableData: Object.values(response.details),
              },
              () => {
                setTimeout(() => {
                  if (x !== undefined) {
                    var val = localStorage.getItem("scrollposition");
                    var brek = val.split("=");
                    var elmnt = document.getElementById("sticky-tb-hdr");
                    elmnt.scrollLeft = Number(brek[0]);
                    elmnt.scrollTop = Number(brek[1]);
                    var val = localStorage.setItem("scrollposition", "");
                  }
                }, 1000);
              }
            );
          } else {
            this.setState({ response: [], loading: false });
          }
        }
      )
    } else if (urlParams.get('category_id')) {
      console.log("third")
      let account_type_id_array = [];
      let number = Number(urlParams.get('category_id'))
      let category_id_array = [number]
      let is_others = 1;
      let breakdown_by = "";

      FetchAllApi.genearl_ledger_break(
        startDate,
        endDate,
        show_columns,
        account,
        this.state.logged_client_id,
        sub_columns,
        filter_id,
        filter_options,
        this.state.selectedName,
        this.state.sort_type,
        account_type_id_array,
        category_id_array,
        breakdown_by,
        is_others,

        (err, response) => {
          if (response.status === 1) {
            // chars = _.orderBy(chars, ['name'],['asc']); // Use Lodash to sort array by 'name'
            this.get_col();
            console.log(
              "Object.values(second)",
              Object.values(response.details)
            );

            this.setState(
              {
                resData: response,
                loading: false,
                // tableData: _.orderBy(Object.values(response.details), ['category_name'], ['asc'])
                tableData: Object.values(response.details),
              },
              () => {
                setTimeout(() => {
                  if (x !== undefined) {
                    var val = localStorage.getItem("scrollposition");
                    var brek = val.split("=");
                    var elmnt = document.getElementById("sticky-tb-hdr");
                    elmnt.scrollLeft = Number(brek[0]);
                    elmnt.scrollTop = Number(brek[1]);
                    var val = localStorage.setItem("scrollposition", "");
                  }
                }, 1000);
              }
            );
          } else {
            this.setState({ response: [], loading: false });
          }
        })
    } else if (urlParams.get('account_type_id_array')) {
      console.log("four")
      let number = Number(urlParams.get('account_type_id_array'))
      let account_type_id_array = [number]
      let category_id_array = [];
      let is_others = 0;
      let breakdown_by = "";


      FetchAllApi.genearl_ledger_break(
        startDate,
        endDate,
        show_columns,
        account,
        this.state.logged_client_id,
        sub_columns,
        filter_id,
        filter_options,
        this.state.selectedName,
        this.state.sort_type,
        account_type_id_array,
        category_id_array,
        breakdown_by,
        is_others,

        (err, response) => {
          if (response.status === 1) {
            // chars = _.orderBy(chars, ['name'],['asc']); // Use Lodash to sort array by 'name'
            this.get_col();
            console.log(
              "Object.values(second)",
              Object.values(response.details)
            );

            this.setState(
              {
                resData: response,
                loading: false,
                // tableData: _.orderBy(Object.values(response.details), ['category_name'], ['asc'])
                tableData: Object.values(response.details),
              },
              () => {
                setTimeout(() => {
                  if (x !== undefined) {
                    var val = localStorage.getItem("scrollposition");
                    var brek = val.split("=");
                    var elmnt = document.getElementById("sticky-tb-hdr");
                    elmnt.scrollLeft = Number(brek[0]);
                    elmnt.scrollTop = Number(brek[1]);
                    var val = localStorage.setItem("scrollposition", "");
                  }
                }, 1000);
              }
            );
          } else {
            this.setState({ response: [], loading: false });
          }
        }
      )
    }

  };
  changevaluetotals() {
    this.state.changetotal1 = this.state.changetotal;
    this.state.changetotal = 0;
  }
  changevalueper() {
    this.state.changetotal3 = this.state.changetotal2;
    this.state.changetotal2 = 0;
  }
  changevalueperx(value) {
    let x =
      (parseFloat(this.state.changetotal) - parseFloat(value)) / value / 100;
    if (x || isNaN(x)) x = 0;
    this.state.changetotal2 = x.toFixed(2) + " %";
  }
  changevaluetotalsx(value) {
    this.state.changetotal = parseInt(this.state.changetotal) - parseInt(value);
  }

  watchMe = () => {
    // isUpdated=
    // console.log('dskjhskj',isUpdated)
    // if(isUpdated !==undefined && isUpdated !=='' && isUpdated !==null){
    //  this.callAPIDATA()
    //   localStorage.setItem('updated','')
    // }

    setInterval(() => {
      var updated = localStorage.getItem("updated");
      console.log("i am here1", updated);

      if (
        updated !== undefined &&
        updated !== "" &&
        updated !== null &&
        updated === "yes"
      ) {
        this.callAPIDATA("jii");

        localStorage.setItem("updated", "");
        console.log("i am here2", updated);
      }
    }, 5000);
  };

  render() {
    var amnt = 0;
    var finalArray = [];

    console.log("jjjjjjjjjjjj", this.state.coulmns_head);
    if (this.state.coulmns_head) {
      var list = this.state.coulmns_head.map((item, i) => {
        return <option key={i}>{item.heading_name}</option>;
      });
      // window.jQuery('#myselect').selectpicker().val(list)
    }

    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items;

    console.log("response_stus", this.state.options);

    if (
      this.state.item_details.user_image !== "" &&
      this.state.item_details.user_image !== "null"
    ) {
      var item_user_image = this.state.item_details.user_image;
    } else {
      var item_user_image = "images/user-img-1.png";
    }

    if (
      this.state.item_file_path !== "" &&
      this.state.item_file_path !== "null"
    ) {
      item_file_path = [];
      var split_file_path = this.state.item_file_path.toString().split(",");
      var split_file_id = this.state.item_file_id.toString().split(",");
      if (split_file_path.length >= 1) {
        for (var i = 0; i < split_file_path.length; i++) {
          var get_file_url = split_file_path[i];
          var split_file_name = split_file_path[i].toString().split("/");
          var arr_reverse = split_file_name.reverse();

          var get_file_name = arr_reverse[0].substring(
            arr_reverse[0].length - 15,
            arr_reverse[0].length
          );

          var get_file_ext = arr_reverse[0].substring(
            arr_reverse[0].lastIndexOf(".") + 1,
            arr_reverse[0].length
          );
          if (get_file_ext === "pdf") {
            var file_icon = "images/pdf-icon.png";
          } else {
            var file_icon = "images/img-icon.png";
          }

          //console.log('pdf_file_link',get_file_url);

          if (get_file_ext === "pdf") {
            item_file_path.push(
              <div className="attach-item">
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  className="img-wrap"
                  data-id={split_file_id[i]}
                >
                  <iframe
                    src={get_file_url}
                    id="pdf_thumb_viewer"
                    frameborder="0"
                    scrolling="no"
                    width="190"
                    height="190"
                  ></iframe>
                  <span className="go">
                    <img
                      src="../images/next-arrow-white.svg"
                      className="mCS_img_loaded"
                    />
                  </span>
                </a>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={get_file_url}
                  data-id={split_file_id[i]}
                >
                  <span>{get_file_name}</span>
                  <img
                    src="../images/download-icon.svg"
                    alt="Icon"
                    className="mCS_img_loaded"
                  />
                </a>
              </div>
            );
          } else {
            item_file_path.push(
              <div className="attach-item">
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  className="img-wrap"
                  data-id={split_file_id[i]}
                >
                  <img
                    className="img-responsive mCS_img_loaded"
                    src={get_file_url}
                    alt={get_file_ext}
                  />
                  <span className="go">
                    <img
                      src="../images/next-arrow-white.svg"
                      className="mCS_img_loaded"
                    />
                  </span>
                </a>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={get_file_url}
                  data-id={split_file_id[i]}
                >
                  <span>{get_file_name}</span>
                  <a href={get_file_url} download={get_file_name}>
                    {get_file_name}
                    <img
                      src="../images/download-icon.svg"
                      alt="Icon"
                      className="mCS_img_loaded"
                    />
                  </a>
                </a>
              </div>
            );
          }
        }
      }
    }

    options.push(<option>ORG-250</option>);

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />

            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <div className="nav-brand-res visible-xs">
                  <img
                    className="img-responsive"
                    src="../images/logo-icon.png"
                    alt="LogoIcon"
                  />
                </div>
                <a href="javascript:;" className="back hidden-xs">
                  <img src="../images/back-arrow-blue.svg" onClick={() => this.props.history.goBack()} />
                </a>
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a href="javascript:;">Report</a>
                  </li>
                  <li>Transactions</li>
                </ul>

                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
              {/* 
              <div className='content-top col-md-12 col-xs-12'>
                <h4 className='fw-sbold mar-t-no'>General Ledger</h4>
                <h5 className='fw-sbold'>
                  {moment(new Date()).format('MMM YYYY')}
                </h5>
              </div>
 */}
              <div>
                {/* Top bar Ends here */}
                <div className="col-md-12 col-xs-12 mar-top visible-xs">
                  <a href="javascript:;" className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  <span className="page-title">General Ledger</span>
                </div>
                {/* content-top Starts here */}
                <div className="content-top col-md-12 col-xs-12">
                  <h4 className="fw-sbold mar-t-no">Transaction Details</h4>
                  <h5 className="fw-sbold"></h5>
                  <div className="row">
                    <div className="report-setting col-md-12 col-xs-12">
                      <form className="custom-form form-inline col-md-12 col-xs-12 pad-no">
                        <div className="row">
                          <div className="form-group col-md-3 col-sm-6 col-xs-12">
                            <label>Date Range</label>
                            <div className="form-cont w-100"  >
                              <select
                                id="custom"
                                className="selectpicker form-control hh "
                                data-live-search="true"
                                value={this.state.date_range}
                                onChange={(e) =>
                                  this.changedatevalue(e.target.value)
                                }
                              >
                                <option >ALL</option>
                                <option selected={true}>Custom</option>

                                <option>This Month-to-date</option>
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>This Week-to-date</option>
                                <option>This Year</option>
                                <option>This Year-to-date</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group col-md-3 col-sm-6 col-xs-12">
                            <label>From</label>
                            <div
                              className="input-group date mar-t-no"
                              data-date-format="dd/mm/yyyy"
                            >
                              <input
                                type="text"
                                id="fromdate"
                                onBlur={(e) => {
                                  let value = e.target.value
                                  this.setState({date_range: "Custom"})
                                  setTimeout(() => {
                                    jQuery("#custom").val("Custom")
                                    this.changefromDate(value)
                                  }, 500)
                                }}
                                className="form-control"
                              />
                              <div className="input-group-addon" onClick={() => jQuery('#fromdate').focus()}>
                                <img
                                  src="images/calendar-icon.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-md-3 col-sm-6 col-xs-12">
                            <label>To</label>
                            <div
                              className="input-group date mar-t-no"
                              data-date-format="dd/mm/yyyy"
                            >
                              <input
                                type="text"
                                id="todate"
                                onBlur={(e) => {
                                  let value = e.target.value
                                  this.setState({date_range: "Custom"})
                                  setTimeout(() => {
                                    jQuery("#custom").val("Custom");
                                    this.changetoDate(value);
                                  }, 500)
                                }}

                                className="form-control"
                              />
                              <div className="input-group-addon" onClick={() => jQuery('#todate').focus()} >
                                <img
                                  src="images/calendar-icon.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-md-3 col-sm-6 col-xs-12">
                            {/* <a href="javascript:;" className="text-link filter-btn">Advanced</a> */}
                            <a
                              href="javascript:;"
                              className="text-link filter-btn mar-rgt"
                            >
                              Advanced
                            </a>
                            <a
                              href="javascript:;"
                              className="fa fa-refresh"
                              onClick={() => {
                                this.callAPIDATA();
                              }}
                            >
                              <img
                                src="images/refresh.svg"
                                className=" mar-rgt-5 "
                                style={{ width: "20px" }}
                              />
                            </a>

                            <a
                              href="javascript:;"
                              className="text-link mar-rgt-5 "
                              onClick={() => this.showHide()}
                            >
                              {this.state.view
                                ? "expand view"
                                : "collapse view"}
                            </a>
                          </div>
                        </div>
                      </form>
                      {/* <div className="pull-right">
                        <div className="dropdown menu-item">
                          <button
                            className="btn btn-green dropdown-toggle btn-arrow"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Export
                            <span className="caret" />
                          </button>
                          <ul className="dropdown-menu align-right">
                            <li>
                              <a href="javascript:;">Export as PDF</a>
                            </li>
                            <li>
                              <a href="javascript:;">Export as Excel</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    */}


                    </div>
                  </div>
                </div>
                {/* content-top Starts here */}
              </div>

              <div className="main-content col-md-12 col-xs-12">
                <div className="report-setting">
                  <div className="col-md-12 col-xs-12 report-filter">
                    <a href="javascript:;" className="close-btn">
                      <img src="images/icons8-minus.png" />
                    </a>
                    <form className="custom-form">
                      <div className="col-lg-4 col-md-12 pad-l-no">
                        <div className="row">
                          <div className="form-group col-md-12 col-xs-12">
                            <div className="row">
                              <div className="col-lg-5 col-md-3">
                                <label className="fw-sbold">Show Columns</label>
                              </div>
                              <div className="col-lg-7 col-md-9">
                                <div className="custom-select-drop dropdown">
                                  {this.state.coulmns_head &&
                                    this.state.coulmns_head !== undefined && (
                                      <select
                                        className="selectpicker form-control "
                                        id="myselect"
                                        multiple
                                        data-live-search="true"
                                        onChange={(e) =>
                                          this.show_coulmn_filter(e)
                                        }
                                      >
                                        {this.state.coulmns_head &&
                                          this.state.coulmns_head !==
                                          undefined &&
                                          this.state.coulmns_head &&
                                          this.state.coulmns_head.map(
                                            (item, i) => {
                                              let statusSelected = "";
                                              if (item.status === 1 && i !== 7)
                                                statusSelected = "selected";
                                              let object = {
                                                a: item.id,
                                                b: i + 1,
                                              };

                                              return (
                                                <option
                                                  value={JSON.stringify(object)}
                                                  // value={i + 1}
                                                  selected={statusSelected}
                                                >
                                                  {item.heading_name}
                                                </option>
                                              );
                                            }
                                          )}
                                      </select>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group col-md-12 col-xs-12">
                            <div className="row">
                              <div className="col-lg-5 col-md-3">
                                <label className="fw-sbold">Filter by</label>
                              </div>
                              <div className="col-lg-7 col-md-9">
                                <div className="custom-select-drop dropdown">
                                  <select
                                    className="selectpicker form-control"
                                    multiple
                                    data-live-search="true"
                                    onChange={(e) => {
                                      console.log(e.target.options);
                                      this.selected_filters(e);
                                    }}
                                  >
                                    {this.state.filtervalue &&
                                      this.state.filtervalue.name &&
                                      this.state.filtervalue.name.map(
                                        (item, index) => {
                                          console.log('jdhyuikh', item)
                                          return (
                                            <option
                                              key={index}
                                              id={item.filter_name}
                                              data-id={item.id}
                                              value={item.id}
                                            >
                                              {item.filter_name}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group col-md-12 col-xs-12 mar-b-no">
                            <div className="row">
                              <div className="col-lg-5 col-md-3">
                                <label className="fw-sbold">Sort By</label>
                              </div>
                              <div className="col-lg-7 col-md-9">
                                <div id="currency_selected">
                                  <select
                                    className="selectpicker form-control"
                                    id="customer_type"
                                    data-live-search="true"
                                    onChange={(e) => {
                                      this.setState({ selectedName: e.target.value })
                                      setTimeout(() => { this.callAPIDATA() }, 500)
                                    }}
                                  >
                                    <option selected={true}>Choose</option>
                                    {this.state.sortBynames &&
                                      this.state.sortBynames.map((item) => {
                                        return (
                                          <React.Fragment>
                                            <option value={item.column_key}>
                                              {item.name}
                                            </option>
                                          </React.Fragment>
                                        );
                                      })}
                                  </select>
                                </div>

                                <div style={{ float: "right" }}>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      let a = this.state.sort_type == "desc" ? "asc" : "desc";
                                      this.setState({ sort_type: a });
                                      setTimeout(() => {
                                        if (this.state.selectedName != "") {
                                          this.callAPIDATA();
                                        }
                                      }, 500)
                                    }}
                                  >
                                    {this.state.sort_type == "desc" ? "asc" : "desc"}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-12 pad-r-no">
                        <div className="row"></div>
                      </div>

                      {this.state.selectedFil == 5 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <div className="custom-select-drop dropdown">
                                  <label>Name</label>
                                  <select
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    onChange={(e) => this.selectedVendorIds(e)}
                                  >
                                    {this.state.vendorNames &&
                                      this.state.vendorNames.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              id={item.filter_name}
                                              data-id={item.id}
                                              value={item.id}
                                            >
                                              {item.vendor_name}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                {this.state.disable && (
                                  <div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.selectedFil === 3 && (
                        <div className="col-lg-4 col-md-12 pad-r-no">
                          <div className="row">
                            <div className="form-group mar-rgt">
                              <label>From</label>
                              <div
                                className="input-group date mar-t-no"
                                data-date-format="dd/mm/yyyy"
                              >
                                <input
                                  type="text"
                                  id="fromdate_duedate"
                                  onBlur={(e) => {
                                    let value = e.target.value
                                    setTimeout(() => {
                                      this.changefromDate_duedate(value)
                                    }, 500)
                                  }}
                                  className="form-control"
                                  autoComplete="off"
                                  style={{ height: "43px" }}
                                />
                                <div className="input-group-addon" onClick={() => jQuery('#fromdate_duedate').focus()} >
                                  <img
                                    src="images/calendar-icon.svg"
                                    alt="icon"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group mar-rgt">
                              <label>To</label>
                              <div
                                className="input-group date mar-t-no"
                                data-date-format="dd/mm/yyyy"
                              >
                                <input
                                  type="text"
                                  id="todate_duedate"
                                  onBlur={(e) => {
                                    let value = e.target.value
                                    setTimeout(() => {
                                      this.changetoDate_duedate(value)
                                    }, 500)
                                  }}
                                  className="form-control"
                                  autoComplete="off"
                                  style={{ height: "43px" }}
                                />
                                <div className="input-group-addon" onClick={() => jQuery('#todate_duedate').focus()}>
                                  <img
                                    src="images/calendar-icon.svg"
                                    alt="icon"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>{" "}
                        </div>
                      )}

                      {this.state.selectedFil === 8 && (
                        <div className="col-lg-4 col-md-12 pad-r-no">
                          <div className="row">
                            <div className="form-group mar-rgt">
                              <label>From</label>
                              <div
                                className="input-group date mar-t-no"
                                data-date-format="dd/mm/yyyy"
                              >
                                <input
                                  type="text"
                                  id="fromdate1"
                                  onBlur={(e) => {
                                    let value = e.target.value
                                    setTimeout(() => {
                                      this.changefromDate1(value)
                                    }, 500)
                                  }}
                                  className="form-control"
                                  autoComplete="off"
                                  style={{ height: "43px" }}
                                />
                                <div className="input-group-addon" onClick={() => jQuery('#fromdate1').focus()}>
                                  <img
                                    src="images/calendar-icon.svg"
                                    alt="icon"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group mar-rgt">
                              <label>To</label>
                              <div
                                className="input-group date mar-t-no"
                                data-date-format="dd/mm/yyyy"
                              >
                                <input
                                  type="text"
                                  id="todate1"
                                  onBlur={(e) => {
                                    let value = e.target.value
                                    setTimeout(() => {
                                      this.changetoDate1(value)
                                    }, 500)
                                  }}
                                  className="form-control"
                                  autoComplete="off"
                                  style={{ height: "43px" }}
                                />
                                <div className="input-group-addon" onClick={() => jQuery('#todate1').focus()}>
                                  <img
                                    src="images/calendar-icon.svg"
                                    alt="icon"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>{" "}
                        </div>
                      )}
                      {this.state.selectedFil == 6 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <div className="custom-select-drop dropdown">
                                  <label>Currency</label>
                                  <select
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    id="slectedCurrency"
                                    onChange={(e) => {
                                      this.multiSelectedCurrency(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {this.state.currencies &&
                                      this.state.currencies.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              id={item.filter_name}
                                              data-id={item.id}
                                              value={item.id}
                                            >
                                              {item}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                {this.state.disable && (
                                  <div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.selectedFil == 50 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <div className="custom-select-drop dropdown">
                                  <label>Accounts</label>
                                  <select
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    id='selectedAccountIds'
                                    onChange={(e) => {
                                      this.multiSelectedAccount(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {this.state.all_account_list &&
                                      this.state.all_account_list.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              id={item.name}
                                              data-id={item.id}
                                              value={item.id}
                                            >
                                              {item.name}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                {this.state.disable && (
                                  <div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}


                      {this.state.selectedFil == 33 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <div className="custom-select-drop dropdown">
                                  <label>Types</label>
                                  <select
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    id='multiSelectedTypeIds'
                                    onChange={(e) => {
                                      this.multiSelectedType(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {this.state.all_transaction_type_list &&
                                      this.state.all_transaction_type_list.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              id={item.name}
                                              data-id={item.id}
                                              value={item.id}
                                            >
                                              {item.name}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                {this.state.disable && (
                                  <div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}


                      {this.state.selectedFil == 49 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <div className="custom-select-drop dropdown">
                                  <label>Job Name</label>
                                  <select
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    id='multiplejobSelected'
                                    onChange={(e) => {
                                      this.multiplejobSelected(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {this.state.job_name_list &&
                                      this.state.job_name_list.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              id={item.job_name}
                                              data-id={item.job_id}
                                              value={item.job_id}
                                            >
                                              {item.job_name}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                {this.state.disable && (
                                  <div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.selectedFil === 2 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"="}
                                    onChange={(e) => {
                                      this.customRadioChange1(e.target.value);
                                    }}
                                  />
                                  =
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"<="}
                                    onChange={(e) => {
                                      this.customRadioChange1(e.target.value);
                                    }}
                                  />
                                  &lt;=
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={">="}
                                    onChange={(e) => {
                                      this.customRadioChange1(e.target.value);
                                    }}
                                  />
                                  &gt;=
                                  <span className="checkmark" />
                                </label>
                                {/* <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"true"}
                                    onChange={(e) => {
                                      this.customRadioChange1(e.target.value);
                                    }}
                                  />
                                  any
                                  <span className="checkmark" />
                                </label> */}
                                <div>
                                  <input
                                    type="text"
                                    id="male"
                                    name="valueAmount1"
                                    className="form-control"
                                    onChange={this.changeText1}
                                    style={{ width: "128px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 1 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"="}
                                    onChange={(e) => {
                                      this.customRadioChange(e.target.value);
                                    }}
                                  />
                                  =
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"<="}
                                    onChange={(e) => {
                                      this.customRadioChange(e.target.value);
                                    }}
                                  />
                                  &lt;=
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={">="}
                                    onChange={(e) => {
                                      this.customRadioChange(e.target.value);
                                    }}
                                  />
                                  &gt;=
                                  <span className="checkmark" />
                                </label>
                                {/* <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"true"}
                                    onChange={(e) => {
                                      this.customRadioChange(e.target.value);
                                    }}
                                  />
                                  any
                                  <span className="checkmark" />
                                </label> */}
                                <div>
                                  <input
                                    type="text"
                                    id="male"
                                    name="valueAmount"
                                    className="form-control"
                                    onChange={this.changeText}
                                    style={{ width: "128px" }}
                                  />
                                </div>

                                <div>
                                  <div>
                                    <label>From</label>
                                    <input
                                      type="text"
                                      id="male"
                                      name="From"
                                      className="form-control"
                                      style={{ width: "128px" }}
                                      onChange={this.changeText}
                                    />
                                  </div>
                                  <div>
                                    <label>To</label>
                                    <input
                                      type="text"
                                      id="male"
                                      name="To"
                                      onChange={this.changeText}
                                      className="form-control"
                                      style={{ width: "128px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 32 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"="}
                                    onChange={(e) => {
                                      this.customRadioChange4(e.target.value);
                                    }}
                                  />
                                  =
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"<="}
                                    onChange={(e) => {
                                      this.customRadioChange4(e.target.value);
                                    }}
                                  />
                                  &lt;=
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={">="}
                                    onChange={(e) => {
                                      this.customRadioChange4(e.target.value);
                                    }}
                                  />
                                  &gt;=
                                  <span className="checkmark" />
                                </label>
                                {/* <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"true"}
                                    onChange={(e) => {
                                      this.customRadioChange4(e.target.value);
                                    }}
                                  />
                                  any
                                  <span className="checkmark" />
                                </label> */}
                                <div>
                                  <input
                                    type="text"
                                    id="male"
                                    name="valueAmount4"
                                    className="form-control"
                                    onChange={this.changeText4}
                                    style={{ width: "128px" }}
                                  />
                                </div>

                                <div>
                                  <div>
                                    <label>From</label>
                                    <input
                                      type="text"
                                      id="male"
                                      name="From4"
                                      className="form-control"
                                      style={{ width: "128px" }}
                                      onChange={this.changeText4}
                                    />
                                  </div>
                                  <div>
                                    <label>To</label>
                                    <input
                                      type="text"
                                      id="male"
                                      name="To4"
                                      onChange={this.changeText4}
                                      className="form-control"
                                      style={{ width: "128px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 10 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <div>
                                  <label>Number</label>
                                  <input
                                    type="text"
                                    id="male"
                                    name="number_from"
                                    className="form-control"
                                    style={{ width: "128px" }}
                                    onChange={this.changeText_Num}
                                  />
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 11 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>Memo</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="memo"
                                  className="form-control"
                                  onChange={this.changeText_memo}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.selectedFil === 35 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>Split</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="split_filter"
                                  className="form-control"
                                  onChange={this.changeText_split}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.selectedFil === 48 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>Source Name</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="source_name"
                                  className="form-control"
                                  onChange={this.changeText_Source_name}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 13 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"="}
                                    onChange={(e) => {
                                      this.customRadioChange2(e.target.value);
                                    }}
                                  />
                                  =
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"<="}
                                    onChange={(e) => {
                                      this.customRadioChange2(e.target.value);
                                    }}
                                  />
                                  &lt;=
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={">="}
                                    onChange={(e) => {
                                      this.customRadioChange2(e.target.value);
                                    }}
                                  />
                                  &gt;=
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"true"}
                                    onChange={(e) => {
                                      this.customRadioChange2(e.target.value);
                                    }}
                                  />
                                  any
                                  <span className="checkmark" />
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    id="male"
                                    name="valueAmount2"
                                    className="form-control"
                                    onChange={this.changeText2}
                                    style={{ width: "128px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 17 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>Exchange_rate</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="Exchange_rate"
                                  className="form-control"
                                  onChange={this.changeText_Exchange}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 18 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"="}
                                    onChange={(e) => {
                                      this.customRadioChange3(e.target.value);
                                    }}
                                  />
                                  =
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"<="}
                                    onChange={(e) => {
                                      this.customRadioChange3(e.target.value);
                                    }}
                                  />
                                  &lt;=
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={">="}
                                    onChange={(e) => {
                                      this.customRadioChange3(e.target.value);
                                    }}
                                  />
                                  &gt;=
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox mar-rgt">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultValue={"true"}
                                    onChange={(e) => {
                                      this.customRadioChange3(e.target.value);
                                    }}
                                  />
                                  any
                                  <span className="checkmark" />
                                </label>
                                <div>
                                  <input
                                    type="text"
                                    id="male"
                                    name="valueAmount3"
                                    className="form-control"
                                    onChange={this.changeText3}
                                    style={{ width: "128px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 24 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>Address</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="Address"
                                  className="form-control"
                                  onChange={this.changeText_addr}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 25 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>website</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="website"
                                  className="form-control"
                                  onChange={this.changeText_web}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 26 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>E-mail</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="mail"
                                  className="form-control"
                                  onChange={this.changeText_mail}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 27 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>Acc No</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="accnum"
                                  className="form-control"
                                  onChange={this.changeText_acc}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil === 28 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div>
                                <label>phone number</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="phone_number"
                                  className="form-control"
                                  onChange={this.changeText_phone}
                                  style={{ width: "128px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil == 22 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div style={{ display: "block" }}>
                                <div className="custom-select-drop dropdown">
                                  <label>payment-terms</label>
                                  <select
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    onChange={(e) => this.selectedTerms(e)}
                                  >
                                    {this.state.paymentTerms &&
                                      this.state.paymentTerms.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              id={item.filter_name}
                                              data-id={item.id}
                                              value={item.id}
                                            >
                                              {item.terms}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                {this.state.disable && (
                                  <div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil == 23 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <div className="custom-select-drop dropdown">
                                  <label>vendor type</label>
                                  <select
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    onChange={(e) =>
                                      this.selectedVendor_type(e)
                                    }
                                  >
                                    {this.state.vendor_type &&
                                      this.state.vendor_type.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              id={item.filter_name}
                                              data-id={item.id}
                                              value={item.id}
                                            >
                                              {item.name}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                {this.state.disable && (
                                  <div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.state.selectedFil == 29 && (
                        <div
                          className="col-lg-4 col-md-12 pad-r-no"
                          style={{ paddingLeft: 55 }}
                          id="hideme"
                        >
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <div id={1} style={{ display: "block" }}>
                                <div className="custom-select-drop dropdown">
                                  <label>customer type</label>
                                  <select
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    onChange={(e) =>
                                      this.selectedCustomer_type(e)
                                    }
                                  >
                                    {this.state.customer_type &&
                                      this.state.customer_type.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              id={item.filter_name}
                                              data-id={item.id}
                                              value={item.id}
                                            >
                                              {item.name}
                                            </option>
                                          );
                                        }
                                      )}
                                  </select>
                                </div>

                                {this.state.disable && (
                                  <div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                <div className="report-table col-md-12 col-xs-12 pad-no">
                  {/* <p >  <span id='current'>fdfd</span> </p> */}
                  <div
                    className="table-responsive"
                    id="sticky-tb-hdr"
                    onScroll={() => {
                      // // jQuery("#sticky-tb-hdr").scroll(function () {
                      //   if (oldScrollTop == jQuery("#sticky-tb-hdr").scrollTop()) {
                      //     jQuery('#current').html('Horizontal');

                      //     if (jQuery(".transs").visible(true)) {
                      //       jQuery(".transs").css({"position": "fixed"});
                      //       // The element is visible, do something
                      //   } else {
                      //     jQuery(".transs").css({"position": "relative"});
                      //       // The element is NOT visible, do something else
                      //   }

                      //   }
                      //   else {
                      //     jQuery('#current').html('Vertical');

                      //   }
                      //   oldScrollTop = jQuery("#sticky-tb-hdr").scrollTop();
                      //   oldScrollLeft = jQuery("#sticky-tb-hdr").scrollLeft();
                      // // });

                      var elmnt = document.getElementById("sticky-tb-hdr");
                      var x = elmnt.scrollLeft;

                      //  this.setState({scrolledPixelIN_X:x, scrolledPixelIN_Y:elmnt.scrollTop},()=>{
                      // console.log(object)                      })
                      // elmnt.scrollLeft=250;
                      console.log("runinng", x);
                      // this.setState({hh:x})
                    }}
                  >
                    <Loader
                      type="ThreeDots"
                      color="#00BFFF"
                      height={100}
                      width={100}
                      visible={this.state.loading}
                    />
                    {!this.state.loading && (
                      <table className="table custom table-base" id="mytable">
                        <thead style={{ zIndex: 3 }}>
                          <tr style={{ backgroundColor: "#fff" }}>
                            {this.state.coulmns_head &&
                              this.state.coulmns_head.map((x, y) => {
                                return (
                                  <th
                                    className="text-right"
                                    className={x.clsname}
                                  >
                                    {x.heading_name}
                                    <i className="th-sort">
                                      <img
                                        src="../images/sort-icon.svg"
                                        alt="SortIcon"
                                      />
                                    </i>
                                  </th>
                                );
                              })}
                            {/* <th ></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.tableData &&
                            this.state.tableData.map((primary) => {
                              var x =
                                primary.totalpaymanent != undefined
                                  ? primary.totalpaymanent
                                  : 0;
                              var y =
                                primary.totalcredit != undefined
                                  ? primary.totalcredit
                                  : 0;
                              amnt = amnt + Number(x + y);

                              return (
                                <React.Fragment>
                                  {/* main heading */}
                                  {isNaN(Number(primary.total_amount))
                                    ? 0
                                    :
                                    // Number(primary.total_amount) != 0 
                                    primary.is_transactions_available == 1
                                    && (
                                      <tr class="title-1">
                                        <td
                                          class="trans"
                                          id="oneSticky"
                                          style={{
                                            position: "sticky",
                                            left: "0.25rem",backgroundColor: "#EFEFFF"
                                          }}
                                        >
                                          {primary.category_name}
                                        </td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>

                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>

                                        <td class="trans"></td>
                                        <td
                                          class="trans"
                                          style={{ paddingLeft: 1 }}
                                        >
                                          {isNaN(
                                            Number(
                                              primary.prevoius_closing_balance
                                            )
                                          )
                                            ? "0.00"
                                            : Number(
                                              primary.prevoius_closing_balance
                                            ).toFixed(2)}
                                        </td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td
                                          class="trans"
                                          style={{ paddingLeft: 1 }}
                                        ></td>
                                        {/* <td class='trans'></td> */}
                                        <td class="trans">
                                          {isNaN(
                                            Number(
                                              primary.prevoius_closing_foreign_balance
                                            )
                                          )
                                            ? "0.00"
                                            : Number(
                                              primary.prevoius_closing_foreign_balance
                                            ).toFixed(2)}
                                        </td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                        <td class="trans"></td>
                                      </tr>
                                    )}
                                  {/* main heading  ends */}

                                  {/* recursive logic starts */}
                                  {!isNaN(Number(primary.total_amount)) &&
                                    primary.is_child_data_available == 1 &&
                                    primary.is_transactions_available == 1
                                    // Number(primary.total_amount) != 0 

                                    &&
                                    this.repeat(primary.sub_categories, 45)}
                                  {/* recursive logic ends */}

                                  {/* invoice heading others */}
                                  {primary.invoices &&
                                    primary.invoices.length > 0 &&
                                    primary.is_child_data_available == 1 &&
                                    !isNaN(Number(primary.total_amount)) &&
                                    primary.is_transactions_available == 1
                                    // Number(primary.total_amount) != 0 
                                    && (
                                      <tr class="item-step1 sub-title">
                                        <td
                                          style={{
                                            position: "sticky",
                                            left: "0.25rem",backgroundColor: "#EFEFFF"
                                          }}
                                        >
                                          <div>
                                            {primary.category_name}
                                            {""}- {""} Others{" "}
                                          </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>

                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>

                                        <td>
                                          <div> </div>
                                        </td>
                                        <td
                                          class="trans"
                                          style={{ paddingLeft: 1 }}
                                        >
                                          <div>
                                            {isNaN(
                                              Number(
                                                primary.prevoius_closing_others_balance
                                              )
                                            )
                                              ? "0"
                                              : Number(
                                                primary.prevoius_closing_others_balance
                                              ).toFixed(2)}
                                          </div>{" "}
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td
                                          class="trans"
                                          style={{ paddingLeft: 1 }}
                                        >
                                          <div>
                                            {isNaN(
                                              Number(
                                                primary.prevoius_closing_others_foreign_balance
                                              )
                                            )
                                              ? "0"
                                              : Number(
                                                primary.prevoius_closing_others_foreign_balance
                                              ).toFixed(2)}
                                          </div>
                                        </td>
                                        {/* <td><div> </div></td> */}
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                        <td>
                                          <div> </div>
                                        </td>
                                      </tr>
                                    )}
                                  {/* others total */}

                                  {/* others map */}
                                  {primary.invoices &&
                                    !isNaN(Number(primary.total_amount)) &&
                                    // Number(primary.total_amount) != 0
                                    primary.is_transactions_available == 1
                                    &&
                                    primary.invoices.map((e1) => {
                                      return (
                                        <>
                                          <tr
                                            className="item-step1"
                                            onClick={() => {
                                              localStorage.setItem('comingFrom', 'General Ledger')
                                              var elmnt = document.getElementById(
                                                "sticky-tb-hdr"
                                              );
                                              var x = elmnt.scrollLeft;
                                              var y = elmnt.scrollTop;
                                              var value = x + "=" + y;
                                              localStorage.setItem(
                                                "scrollposition",
                                                value
                                              );

                                              // alert(jQuery(this).parents("tr").get(0).rowIndex)
                                              if (
                                                e1.type == "Sales Invoice" ||
                                                e1.type == "Single Payment"
                                              ) {
                                                if (
                                                  e1.type == "Sales Invoice"
                                                ) {
                                                  var setID = e1.trans;
                                                } else if (
                                                  e1.type == "Single Payment"
                                                ) {
                                                  var setID =
                                                    e1.invoice_id +
                                                    "=" +
                                                    e1.trans;
                                                }

                                                localStorage.setItem(
                                                  "invoice_id",
                                                  setID
                                                );

                                                localStorage.setItem(
                                                  "job_id",
                                                  e1.job_id
                                                );
                                                // alert("job id" + e1.job_id);

                                                var win = window.open(
                                                  "/create_invoice",
                                                  "_blank"
                                                );
                                                win.focus();
                                              }

                                              if (
                                                e1.type == "Bill"
                                              ) {
                                                if (
                                                  e1.type == "Bill"
                                                ) {
                                                  let arr = [
                                                    e1.type,
                                                    e1.invoice_id,
                                                  ];
                                                  console.log(
                                                    "hy",
                                                    e1.invoice_id
                                                  );
                                                  localStorage.setItem(
                                                    "vendor_bill",
                                                    JSON.stringify(arr)
                                                  );
                                                }

                                                var win = window.open(
                                                  "/data_tagging/" +
                                                  e1.list_id +
                                                  "/" +
                                                  e1.file_id,
                                                  "_blank"
                                                );
                                                win.focus();
                                              }

                                              if (e1.type == "Bill payment") {
                                                let arr = [
                                                  e1.type,
                                                  e1.invoice_id,
                                                  e1.payment_id,
                                                ];

                                                localStorage.setItem(
                                                  "vendor_bill",
                                                  JSON.stringify(arr)
                                                );

                                                // alert(e1.payment_id)
                                                // this.props.history.push('/data_tagging/' + e1.list_id + '/' + e1.file_id)
                                                var win = window.open(
                                                  "/data_tagging/" +
                                                  e1.list_id +
                                                  "/" +
                                                  e1.file_id,
                                                  "_blank"
                                                );
                                                win.focus();
                                              }

                                              if (
                                                e1.type ==
                                                "Customer credit note"
                                              ) {
                                                var setID = e1.credit_memo_id;

                                                localStorage.setItem(
                                                  "credit_id",
                                                  setID
                                                );
                                                window.open("/create_creditmemo?memo_id=" + setID)
                                                // alert(e1.credit_memo_id);

                                                // var win = window.open(
                                                //   "/create_creditmemo",
                                                //   "_blank"
                                                // );
                                                // win.focus();
                                              }


                                              if (
                                                e1.type == "Vendor credit note"
                                              ) {
                                                let arr = [
                                                  e1.type,
                                                  e1.credit_memo_id,
                                                ];
                                                console.log(
                                                  "hy",
                                                  e1.credit_memo_id
                                                );
                                                localStorage.setItem(
                                                  "vendor_bill",
                                                  JSON.stringify(arr)
                                                );


                                                var win = window.open(
                                                  "/data_tagging/" +
                                                  e1.list_id +
                                                  "/" +
                                                  e1.file_id,
                                                  "_blank"
                                                );
                                                win.focus();
                                              }

                                              if (
                                                e1.type == "Customer Multipayment"
                                              ) {
                                                let arr = [
                                                  e1.customer_id,
                                                  e1.multi_payment_applied_invoices,
                                                ];

                                                localStorage.setItem(
                                                  "edit_customer_receive_payment",
                                                  JSON.stringify(arr)
                                                );


                                                var win = window.open('/Customer_receive_payment', "_blank");
                                                win.focus();
                                              }

                                            }}


                                          >
                                            <td className=".headcol ">
                                              <span>
                                                {e1.transaction_number}
                                              </span>
                                            </td>
                                            <td className="">
                                              <span>{e1.type}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.last_modified}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.last_modified_by}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.transaction_date}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.num}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.name}</span>
                                            </td>

                                            <td className="">
                                              <span>{e1.source_name}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.job_name}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.memo}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.account}</span>
                                            </td>
                                            <td className="">
                                              <span>
                                                {e1.split != "" ? e1.split : ""}
                                              </span>
                                            </td>
                                            <td>
                                              <span>{""} </span>
                                            </td>
                                            {/* <td className=''>
                <span>{e1.open_balance_home_currency}</span>
              </td> */}

                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.open_balance_home_currency)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(
                                                    e1.open_balance_home_currency
                                                  ).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(
                                                    e1.open_balance_home_currency
                                                  ).toFixed(2)} */}
                                              </span>
                                            </td>
                                            {/* <td className=''>
                <span>{e1.debit}</span>
              </td>
              <td className=''>
                <span>{e1.credit}</span>
              </td> */}

                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.debit)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(e1.debit).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(e1.debit).toFixed(2)} */}
                                              </span>
                                            </td>

                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.credit)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(e1.credit).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(e1.credit).toFixed(
                                                    2
                                                  )} */}
                                              </span>
                                            </td>

                                            {/* <td className=''>
                <span>{e1.amount}</span>
              </td> */}

                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.amount)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(e1.amount).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(e1.amount).toFixed(
                                                    2
                                                  )} */}
                                              </span>
                                            </td>
                                            <td>
                                              <span>{""} </span>
                                            </td>
                                            {/* <td className=''>
                <span>{e1.balance}</span>
              </td> */}
                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.balance)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(e1.balance).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(e1.balance).toFixed(
                                                    2
                                                  )} */}
                                              </span>
                                            </td>
                                            <td className="">
                                              <span>{e1.currency}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.exchange_rate}</span>
                                            </td>
                                            {/* <td className=''>
                <span>{e1.open_balance_foreign_currency}</span>
              </td> */}
                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.open_balance_foreign_currency)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(
                                                    e1.open_balance_foreign_currency
                                                  ).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(
                                                    e1.open_balance_foreign_currency
                                                  ).toFixed(2)} */}
                                              </span>
                                            </td>
                                            {/* <td className=''>
                <span>{e1.foreign_debit}</span>
              </td> */}
                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.foreign_debit)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(
                                                    e1.foreign_debit
                                                  ).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(
                                                    e1.foreign_debit
                                                  ).toFixed(2)} */}
                                              </span>
                                            </td>

                                            {/* <td className=''>
                <span>{e1.foreign_credit}</span>
              </td> */}

                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.foreign_credit)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(
                                                    e1.foreign_credit
                                                  ).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(
                                                    e1.foreign_credit
                                                  ).toFixed(2)} */}
                                              </span>
                                            </td>
                                            {/* <td className=''>
                <span>{e1.foreign_amount}</span>  
              </td> */}

                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.foreign_amount)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(
                                                    e1.foreign_amount
                                                  ).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(
                                                    e1.foreign_amount
                                                  ).toFixed(2)} */}
                                              </span>
                                            </td>
                                            <td>
                                              <span>{""} </span>
                                            </td>

                                            {/* <td className=''>
                <span>{e1.split != '' ? e1.split : ''}</span>
              </td> */}

                                            <td className="">
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(e1.foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                                {/* {isNaN(
                                                  Number(
                                                    e1.foreign_balance
                                                  ).toFixed(2)
                                                )
                                                  ? "0"
                                                  : Number(
                                                    e1.foreign_balance
                                                  ).toFixed(2)} */}
                                              </span>
                                            </td>
                                            {/* <td className=''>
                <span>{e1.foreign_balance}</span>
              </td> */}
                                            <td className="">
                                              <span>{e1.aging}</span>
                                            </td>
                                            <td className="">
                                              <span>
                                                {e1.terms != null
                                                  ? e1.terms
                                                  : ""}
                                              </span>
                                            </td>
                                            <td className="">
                                              <span>{e1.contact}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.postal_code}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.province}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.city}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.address}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.email}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.phone}</span>
                                            </td>
                                            <td className="">
                                              <span>{e1.fax}</span>
                                            </td>
                                          </tr>

                                          {this.state.view == false &&
                                            e1.split_breakdown_string &&
                                            e1.split_breakdown_string.map(
                                              (item, i) => {
                                                return (
                                                  <tr className="item-step1 istep-2 title1">
                                                    <td>
                                                      <span> </span>
                                                    </td>
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>
                                                    <td>
                                                      <span className="">
                                                        {
                                                          e1
                                                            .split_breakdown_string[
                                                          i
                                                          ]
                                                        }
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <span className=""></span>
                                                    </td>
                                                    <td>
                                                      <span className=""></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className=""></span>
                                                    </td>
                                                    <td>
                                                      <span className=" "></span>
                                                    </td>
                                                    <td>
                                                      <span className="">
                                                        {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                          { style: 'currency', currency: this.state.home_currency }).format(e1.split_breakdown_amount[i])).replace(this.state.home_currency_symbol, '')}
                                                        {/* {isNaN(
                                                          Number(
                                                            e1.split_breakdown_amount[i]
                                                          ).toFixed(2)
                                                        )
                                                          ? "0"
                                                          : Number(
                                                            e1
                                                              .split_breakdown_amount[
                                                            i
                                                            ]
                                                          ).toFixed(2)} */}
                                                      </span>
                                                      {/* <span className="">{e1.split_breakdown_amount[i]}</span> */}
                                                    </td>
                                                    <td>
                                                      <span className=" "></span>
                                                    </td>
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>
                                                    <td>
                                                      <span className=" "></span>
                                                    </td>
                                                    <td>
                                                      <span className=" "></span>
                                                    </td>
                                                    <td>
                                                      <span className=" "></span>
                                                    </td>
                                                    <td>
                                                      <span className=" "></span>
                                                    </td>
                                                    <td>
                                                      <span className="">
                                                        {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                          { style: 'currency', currency: this.state.home_currency }).format(e1.split_breakdown_foreign_amount[i])).replace(this.state.home_currency_symbol, '')}
                                                        {/* {isNaN(
                                                          Number(
                                                            e1
                                                              .split_breakdown_foreign_amount[
                                                            i
                                                            ]
                                                          ).toFixed(2)
                                                        )
                                                          ? "0"
                                                          : Number(
                                                            e1
                                                              .split_breakdown_foreign_amount[
                                                            i
                                                            ]
                                                          ).toFixed(2)} */}
                                                      </span>
                                                      {/* <span className="">{e1.split_breakdown_foreign_amount[i]}</span> */}
                                                    </td>
                                                    <td>
                                                      <span className=" "></span>
                                                    </td>
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                    <td>
                                                      <span className="text-right"></span>
                                                    </td>{" "}
                                                  </tr>
                                                );
                                              }
                                            )}
                                        </>
                                      );
                                    })}
                                  {primary.invoices &&
                                    primary.invoices.length > 0 &&
                                    primary.is_child_data_available == 1 &&
                                    !isNaN(Number(primary.total_amount)) &&
                                    // Number(primary.total_amount) != 0 
                                    primary.is_transactions_available == 1
                                    && (
                                      <tr className="item-step1 istep-2 title1">
                                        <td>
                                          <span>
                                            Total {""} {primary.category_name}
                                            {""}- {""} others{" "}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_others_open_balance)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_others_open_balance
                                              ).toFixed(2)
                                            )
                                              ? "0.00"
                                              : Number(
                                                primary.total_others_open_balance
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_others_debit)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_others_debit
                                              ).toFixed(2)
                                            )
                                              ? "0.00"
                                              : Number(
                                                primary.total_others_debit
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>{" "}
                                        <td>
                                          <span className="">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_others_credit)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_others_credit
                                              ).toFixed(2)
                                            )
                                              ? "0.00"
                                              : Number(
                                                primary.total_others_credit
                                              ).toFixed(2)}{" "} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_others_amount)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_others_amount
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_others_amount
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.current_others_closing_balance)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.current_others_closing_balance
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.current_others_closing_balance
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_others_open_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_others_open_foreign_balance
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_others_open_foreign_balance
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_others_foreign_debit)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_others_foreign_debit
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_others_foreign_debit
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_others_foreign_credit)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_others_foreign_credit
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_others_foreign_credit
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_others_foreign_amount)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_others_foreign_amount
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_others_foreign_amount
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.current_others_closing_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.current_others_closing_foreign_balance
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.current_others_closing_foreign_balance
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                      </tr>
                                    )}
                                  {/* others  ends */}

                                  {/* main total starts  */}
                                  {isNaN(Number(primary.total_amount))
                                    ? 0
                                    :
                                    // Number(primary.total_amount) != 0 
                                    primary.is_transactions_available == 1
                                    && (
                                      <tr className="item-step1 title1 bdr-no">
                                        <td>
                                          <span>
                                            Total{" "}
                                            {" " + primary.category_name}{" "}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className=""></span>
                                        </td>
                                        <td></td>
                                        <td>
                                          <span className=""></span>
                                        </td>
                                        <td>
                                          <span className="">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_open_balance)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_open_balance
                                              ).toFixed(2)
                                            )
                                              ? "0.00"
                                              : Number(
                                                primary.total_open_balance
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_debit)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_debit
                                              ).toFixed(2)
                                            )
                                              ? "0.00"
                                              : Number(
                                                primary.total_debit
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>{" "}
                                        <td>
                                          <span className="">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_credit)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_credit
                                              ).toFixed(2)
                                            )
                                              ? "0.00"
                                              : Number(
                                                primary.total_credit
                                              ).toFixed(2)}{" "} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_amount)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_amount
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_amount
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.current_closing_balance)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.current_closing_balance
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.current_closing_balance
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_open_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_open_foreign_balance
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_open_foreign_balance
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_foreign_debit)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_foreign_debit
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_foreign_debit
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_foreign_credit)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_foreign_credit
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_foreign_credit
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.total_foreign_amount)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.total_foreign_amount
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.total_foreign_amount
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className=" ">
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primary.current_closing_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                            {/* {isNaN(
                                              Number(
                                                primary.current_closing_foreign_balance
                                              ).toFixed(2)
                                            )
                                              ? 0
                                              : Number(
                                                primary.current_closing_foreign_balance
                                              ).toFixed(2)} */}
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>{" "}
                                        <td>
                                          <span className="text-right"></span>
                                        </td>
                                      </tr>
                                    )}
                                  {/* main total ends  */}
                                </React.Fragment>
                              );
                            })}

                          {/* final Total */}

                          <tr
                            className="item-step1 title1 bdr-no"
                            style={{ backgroundColor: "lightgrey" }}
                          >
                            <td>
                              <span>Total </span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_home_open_balance)).replace(this.state.home_currency_symbol, '')}
                                {/* {Number(
                                  this.state.resData
                                    .overall_total_home_open_balance
                                ).toFixed(2)} */}
                              </span>
                            </td>
                            <td>
                              <span className="">
                                {((new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_home_debit)).replace(this.state.home_currency_symbol, ''))}
                                {/* {Number(
                                  this.state.resData.overall_total_home_debit
                                ).toFixed(2)} */}
                              </span>
                            </td>
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_home_credit)).replace(this.state.home_currency_symbol, '')}
                                {/* {Number(
                                  this.state.resData.overall_total_home_credit
                                ).toFixed(2)} */}
                              </span>
                            </td>
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_home_amount)).replace(this.state.home_currency_symbol, '')}
                                {/* {Number(
                                  this.state.resData.overall_total_home_amount
                                ).toFixed(2)} */}
                              </span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_home_balance)).replace(this.state.home_currency_symbol, '')}
                                {/* {Number(
                                  this.state.resData.overall_total_home_balance
                                ).toFixed(2)} */}
                              </span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_foreign_open_balance)).replace(this.state.home_currency_symbol, '')}
                                {/* {(new Intl.NumberFormat("en-US").format(
                                  this.state.resData
                                    .overall_total_foreign_open_balance
                                )} */}
                              </span>
                            </td>{" "}
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_foreign_debit)).replace(this.state.home_currency_symbol, '')}
                                {/* {Number(
                                  this.state.resData.overall_total_foreign_debit
                                ).toFixed(2)} */}
                              </span>
                            </td>{" "}
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_foreign_credit)).replace(this.state.home_currency_symbol, '')}
                                {/* {Number(
                                  this.state.resData
                                    .overall_total_foreign_credit
                                ).toFixed(2)} */}
                              </span>
                            </td>{" "}
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_foreign_amount)).replace(this.state.home_currency_symbol, '')}
                                {/* {Number(
                                  this.state.resData
                                    .overall_total_foreign_amount
                                ).toFixed(2)} */}
                              </span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>
                            <td>
                              <span className="">
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.resData.overall_total_foreign_balance)).replace(this.state.home_currency_symbol, '')}
                                {/* {Number(
                                  this.state.resData.overall_total_foreign_balance
                                ).toFixed(2)} */}
                              </span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>
                            <td>
                              <span className=""></span>
                            </td>{" "}
                            <td>
                              <span className=""></span>
                            </td>
                          </tr>
                          {/* final total ends */}
                        </tbody>
                      </table>
                    )}
                    {/* <button onClick={this.props.increment}>jdhsjjksdhk</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer logoutSubmit={(e) => this.logoutLink()} />
      </div>
    );
  }
}
// export default GeneralLedger
const mapStateToProps = (state) => {
  return {
    userAuthdetails: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () =>
      dispatch({ type: "ADD_LOGGED_USER_DETAILS", payload: "hiiiiiii" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GeneralLedgerBreak);
