import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import FetchAllApi from "../../api_links/fetch_all_api";
import Topbar from "../topbar";
import jQuery from "jquery";
import moment from "moment";
import Loader from "react-loader-spinner";
import Comma from "../comma";
import config from "./../../api_links/api_links";

import jsPDF from "jspdf";
// import jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// import jsPDF from 'yworks-pdf' // using yworks fork
// import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
import autoTable from "jspdf-autotable";
var _ = require("lodash");
class profit_loss_report extends React.Component {
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

      country_sortname: localStorage.getItem("country_sortname"),
      language_code: localStorage.getItem("language_code"),
      home_currency: localStorage.getItem("home_currency"),
      home_currency_symbol: localStorage.getItem("home_currency_symbol"),
      // home_currency: 'SGD',

      total_revenue: "",
      cost_of_goods_sold: "",
      gross_profit: "",
      net_income: "",
      option: 0,
      lastinvoicedate: "",
      reportObject: {},
      numberOfColumns: [],
      show_column_option_list: [],
      dateList: [],
      endDate: "",
      startDate: "",
      dropdown: "",
      show_column: 1,
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",
      waiting_re: [],
      re_assigned: [],
      selected: "",
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
      end_date: moment().endOf("month").format("YYYY-MM-DD"),
      previous_period_from_date: '',
      previous_period_to_date: '',
      loading: true,
      show_coulmns_filter: [],

      filtervalue: [],
      localFilter: localStorage.getItem("filter"),

      result_array: [],
      valueAmount_type1: "",
      valueAmount_type2: "",
      valueAmount_type3: "",
      valueAmount_type4: "",
      valueAmount1: "",
      valueAmount2: "",
      valueAmount3: "",
      valueAmount4: "",

      text1: "",
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      text6: "",
      text7: "",

      date_start: "",
      date_end: "",

      customer_type: [],
      selectedCustomer_type: [],
      selectedTerms: [],
      selectedVendor_type: [],
      vendor_type: [],
      paymentTerms: [],
      all_report_name_id: "",

      selected_vendor_ids: [],
      todate_duedate: "",
      changefromDate_duedate: "",
      selectedCurrencies: "",
      currencies: [],
      valueAmount_type: "",
      valueAmount: "",
      vendorNames: [],

      type: false,
      sort_type: "Ascending Order",
      sortBynames: [],
      selectedName: "",
      filter_key_names: [],

      detailsArray: [],
      selectedAccountIds: '',
      date_range: 'Custom',
      report_type: 1,
      is_all_option:0,
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



  repeat = (sub_categories, paddingLeft) => {
    if (sub_categories) {
      // console.log("1111", sub_categories);

      return (
        <React.Fragment>
          {sub_categories &&
            sub_categories.length > 0 &&
            sub_categories.map((itm, i) => {
              // console.log("11112", Object.values(itm));
              // console.log("11113", Object.values(itm)[0]);
              // console.log("11114", Object.values(itm)[0].total_amount);
              // console.log("11113", itm[Object.keys(itm)[0]].total_amount);
              var a = Object.values(itm)[0];
              if (a.total_amount !== 0) {

                return (
                  <React.Fragment>
                    {a &&
                      a.total_amount &&
                      a.total_amount !== 0 &&
                      !a.is_child_data_available ? (
                      <>
                        <tr className="item-step1">
                          <td
                            style={{
                              paddingLeft: `${paddingLeft}px`,
                            }}
                          >
                            {" "}
                            <span>{a.category_name}</span>
                          </td>
                          {a.amount_array.map((item, j) => {




                            // % row 
                            let first_value = item
                            let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[j]) : 0

                            let row

                            if (first_value == 0 && second_value != 0) {
                              row = 0.00
                            } else if (first_value != 0 && second_value == 0) {
                              row = 100.00
                            } else if (first_value == 0 && second_value == 0) {
                              row = 0.00
                            } else {

                              row = (first_value / second_value) * 100
                            }
                            // % row 

                            // % column

                            let first_value_col = item

                            let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[j]) : 0
                            let column

                            if (first_value_col == 0 && second_value_col != 0) {
                              column = 0.00
                            } else if (first_value_col != 0 && second_value_col == 0) {
                              column = 100.00
                            } else if (first_value_col == 0 && second_value_col == 0) {
                              column = 0.00
                            } else {

                              column = (first_value_col / second_value_col) * 100
                            }

                            // % column

                            // % income

                            let first_value_inc = item
                            let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[j]) : 0
                            let income

                            if (first_value_inc == 0 && second_value_inc != 0) {
                              income = 0.00
                            } else if (first_value_inc != 0 && second_value_inc == 0) {
                              income = 100.00
                            } else if (first_value_inc == 0 && second_value_inc == 0) {
                              income = 0.00
                            } else {
                              income = (first_value_inc / second_value_inc) * 100
                            }

                            // % income

                            // % expense

                            let first_value_exp = item
                            let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[j]) : 0
                            let expense

                            if (first_value_exp == 0 && second_value_exp != 0) {
                              expense = 0.00
                            } else if (first_value_exp != 0 && second_value_exp == 0) {
                              expense = 100.00
                            } else if (first_value_exp == 0 && second_value_exp == 0) {
                              expense = 0.00
                            } else {
                              expense = (first_value_exp / second_value_exp) * 100
                            }

                            // % expense

                            // Amount change
                            let change
                            if ((j + 1) % 2 == 0) {
                              change = a.amount_array[j - 1] - a.amount_array[j]
                            }
                            // Amount change


                            // % change
                            let per_change
                            if ((j + 1) % 2 == 0) {

                              let first_value_per = change
                              let second_value_per = a.amount_array[j]


                              if (first_value_per == 0 && second_value_per != 0) {
                                per_change = 0.00
                              } else if (first_value_per != 0 && second_value_per == 0) {
                                per_change = 100.00
                              } else if (first_value_per == 0 && second_value_per == 0) {
                                per_change = 0.00
                              } else {
                                per_change = (first_value_per / second_value_per) * 100
                              }

                            }
                            // % change


                            return (
                              <>
                                <td
                                  className="text-right"
                                  key={j}
                                  onDoubleClick={() => {
                                    this.subCategory(a.category_id);
                                  }}
                                >
                                  {" "}
                                  <span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(Number(item))).replace(this.state.home_currency_symbol, '')}
                                    {/* {item.toFixed(2)} */}
                                  </span>{" "}
                                </td>



                                {this.state.row && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.column && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.income && <td className="text-right" > <span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.expense && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {(j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                  <td className="text-right" ><span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                  </span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                  <td className="text-right" ><span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                  </span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                  <td className="text-right" ><span>000</span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                  <td className="text-right" ><span>000</span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                  <td className="text-right" ><span>000</span> </td>
                                }

                              </>
                            )
                          })}
                        </tr>
                      </>
                    ) : a &&
                      a.total_amount &&
                      a.total_amount !== 0 &&
                      a.is_child_data_available &&
                      a.is_child_data_available === 0 ? (
                      <>
                        <tr className="item-step1">
                          <td
                            style={{
                              paddingLeft: `${paddingLeft}px`,
                            }}
                          >
                            {" "}
                            <span>{a.category_name}</span>
                          </td>
                          {a.amount_array.map((item, j) => {



                            // % row 
                            let first_value = item
                            let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[j]) : 0

                            let row

                            if (first_value == 0 && second_value != 0) {
                              row = 0.00
                            } else if (first_value != 0 && second_value == 0) {
                              row = 100.00
                            } else if (first_value == 0 && second_value == 0) {
                              row = 0.00
                            } else {

                              row = (first_value / second_value) * 100
                            }
                            // % row 

                            // % column

                            let first_value_col = item

                            let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[j]) : 0
                            let column

                            if (first_value_col == 0 && second_value_col != 0) {
                              column = 0.00
                            } else if (first_value_col != 0 && second_value_col == 0) {
                              column = 100.00
                            } else if (first_value_col == 0 && second_value_col == 0) {
                              column = 0.00
                            } else {

                              column = (first_value_col / second_value_col) * 100
                            }

                            // % column

                            // % income

                            let first_value_inc = item
                            let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[j]) : 0
                            let income

                            if (first_value_inc == 0 && second_value_inc != 0) {
                              income = 0.00
                            } else if (first_value_inc != 0 && second_value_inc == 0) {
                              income = 100.00
                            } else if (first_value_inc == 0 && second_value_inc == 0) {
                              income = 0.00
                            } else {
                              income = (first_value_inc / second_value_inc) * 100
                            }

                            // % income

                            // % expense

                            let first_value_exp = item
                            let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[j]) : 0
                            let expense

                            if (first_value_exp == 0 && second_value_exp != 0) {
                              expense = 0.00
                            } else if (first_value_exp != 0 && second_value_exp == 0) {
                              expense = 100.00
                            } else if (first_value_exp == 0 && second_value_exp == 0) {
                              expense = 0.00
                            } else {
                              expense = (first_value_exp / second_value_exp) * 100
                            }

                            // % expense

                            // Amount change
                            let change
                            if ((j + 1) % 2 == 0) {
                              change = a.amount_array[j - 1] - a.amount_array[j]
                            }
                            // Amount change


                            // % change
                            let per_change
                            if ((j + 1) % 2 == 0) {

                              let first_value_per = change
                              let second_value_per = a.amount_array[j]


                              if (first_value_per == 0 && second_value_per != 0) {
                                per_change = 0.00
                              } else if (first_value_per != 0 && second_value_per == 0) {
                                per_change = 100.00
                              } else if (first_value_per == 0 && second_value_per == 0) {
                                per_change = 0.00
                              } else {
                                per_change = (first_value_per / second_value_per) * 100
                              }

                            }
                            // % change


                            return (
                              <>
                                <td
                                  className="text-right"
                                  key={j}
                                  onDoubleClick={() => {
                                    this.subCategory(a.category_id);
                                  }}
                                >
                                  {" "}
                                  <span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(item)).replace(this.state.home_currency_symbol, '')}
                                    {/* {item.toFixed(2)}  */}
                                  </span>{" "}
                                </td>


                                {this.state.row && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.column && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.income && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.expense && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {(j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                  <td className="text-right" ><span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                  </span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                  <td className="text-right" ><span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                  </span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                  <td className="text-right" ><span>000</span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                  <td className="text-right" ><span>000</span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                  <td className="text-right" ><span>000</span> </td>
                                }

                              </>
                            )
                          })}
                        </tr>
                      </>
                    ) : (
                      ""
                    )}

                    {a &&
                      a.total_amount &&
                      a.total_amount != 0 &&
                      a.is_child_data_available === 1 ? (
                      <tr className="item-step1 sub-title">
                        <td
                          style={{
                            position: "sticky",
                            left: "0.25rem",backgroundColor: "#EFEFFF",
                            paddingLeft: `${paddingLeft}px`,
                          }}
                        >
                          <div>{a.category_name} </div>
                        </td>
                        {a.amount_array.map((item, j) => {
                          return (
                            <>
                              <td
                                className="text-right"
                                key={j}
                                onDoubleClick={() => {
                                  this.subCategory(a.category_id);
                                }}
                              >
                                <div></div>
                              </td>

                              {this.state.row && <td><div></div> </td>}
                              {this.state.column && <td><div></div> </td>}
                              {this.state.income && <td><div></div> </td>}
                              {this.state.expense && <td><div></div> </td>}
                              {(j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                <td><div></div> </td>
                              }
                              {(j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                <td><div></div> </td>
                              }
                              {(j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                <td><div></div> </td>
                              }
                              {(j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                <td><div></div> </td>
                              }
                              {(j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                <td><div></div> </td>}

                            </>
                          )
                        })}
                      </tr>
                    ) : (
                      ""
                    )}

                    {a &&
                      a.total_amount &&
                      a.total_amount != 0 &&
                      a.is_child_data_available === 1 &&
                      this.repeat(a.sub_categories, paddingLeft + 45)}

                    {a &&
                      a.total_amount &&
                      a.total_amount !== 0 &&
                      a.is_child_data_available === 1 &&
                      a.total_others_amount !== 0 ? (
                      <>
                        <tr className="item-step1">
                          <td
                            style={{
                              paddingLeft: `${paddingLeft}px`,
                            }}
                          >
                            {" "}
                            <span>
                              {" "}
                              {a.category_name} {""} - {""} Others
                            </span>
                          </td>
                          {a.others_others_amount_array && a.others_others_amount_array.map((item, j) => {




                            // % row 
                            let first_value = item
                            let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[j]) : 0

                            let row

                            if (first_value == 0 && second_value != 0) {
                              row = 0.00
                            } else if (first_value != 0 && second_value == 0) {
                              row = 100.00
                            } else if (first_value == 0 && second_value == 0) {
                              row = 0.00
                            } else {

                              row = (first_value / second_value) * 100
                            }
                            // % row 

                            // % column

                            let first_value_col = item

                            let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[j]) : 0
                            let column

                            if (first_value_col == 0 && second_value_col != 0) {
                              column = 0.00
                            } else if (first_value_col != 0 && second_value_col == 0) {
                              column = 100.00
                            } else if (first_value_col == 0 && second_value_col == 0) {
                              column = 0.00
                            } else {

                              column = (first_value_col / second_value_col) * 100
                            }

                            // % column

                            // % income

                            let first_value_inc = item
                            let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[j]) : 0
                            let income

                            if (first_value_inc == 0 && second_value_inc != 0) {
                              income = 0.00
                            } else if (first_value_inc != 0 && second_value_inc == 0) {
                              income = 100.00
                            } else if (first_value_inc == 0 && second_value_inc == 0) {
                              income = 0.00
                            } else {
                              income = (first_value_inc / second_value_inc) * 100
                            }

                            // % income

                            // % expense

                            let first_value_exp = item
                            let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[j]) : 0
                            let expense

                            if (first_value_exp == 0 && second_value_exp != 0) {
                              expense = 0.00
                            } else if (first_value_exp != 0 && second_value_exp == 0) {
                              expense = 100.00
                            } else if (first_value_exp == 0 && second_value_exp == 0) {
                              expense = 0.00
                            } else {
                              expense = (first_value_exp / second_value_exp) * 100
                            }

                            // % expense

                            // Amount change
                            let change
                            if ((j + 1) % 2 == 0) {
                              change = a.others_amount_array[j - 1] - a.others_amount_array[j]
                            }
                            // Amount change


                            // % change
                            let per_change
                            if ((j + 1) % 2 == 0) {

                              let first_value_per = change
                              let second_value_per = a.others_amount_array[j]


                              if (first_value_per == 0 && second_value_per != 0) {
                                per_change = 0.00
                              } else if (first_value_per != 0 && second_value_per == 0) {
                                per_change = 100.00
                              } else if (first_value_per == 0 && second_value_per == 0) {
                                per_change = 0.00
                              } else {
                                per_change = (first_value_per / second_value_per) * 100
                              }

                            }
                            // % change



                            return (
                              <>
                                <td
                                  className="text-right"
                                  key={j}
                                  onDoubleClick={() => {
                                    this.subCategoryOthers(a.category_id);
                                  }}
                                >
                                  {" "}
                                  <span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(item)).replace(this.state.home_currency_symbol, '')}
                                    {/* {item.toFixed(2)}  */}
                                  </span>{" "}
                                </td>




                                {this.state.row && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.column && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.income && <td className="text-right" > <span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.expense && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {(j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                  <td className="text-right" ><span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                  </span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                  <td className="text-right" ><span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                  </span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                  <td className="text-right" ><span>000</span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                  <td className="text-right" ><span>000</span> </td>
                                }
                                {(j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                  <td className="text-right" ><span>000</span> </td>
                                }

                              </>
                            );
                          })}
                        </tr>
                      </>
                    ) : (
                      ""
                    )}

                    {a &&
                      a.total_amount &&
                      a.total_amount != 0 &&
                      a.is_child_data_available === 1 ? (
                      <tr className="item-step1 sub-title">
                        <td
                          style={{
                            paddingLeft: `${paddingLeft}px`,
                          }}
                        >
                          <div>Total {a.category_name}</div>
                        </td>
                        {a.amount_array.map((item, j) => {




                          // % row 
                          let first_value = item
                          let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[j]) : 0

                          let row

                          if (first_value == 0 && second_value != 0) {
                            row = 0.00
                          } else if (first_value != 0 && second_value == 0) {
                            row = 100.00
                          } else if (first_value == 0 && second_value == 0) {
                            row = 0.00
                          } else {

                            row = (first_value / second_value) * 100
                          }
                          // % row 

                          // % column

                          let first_value_col = item

                          let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[j]) : 0
                          let column

                          if (first_value_col == 0 && second_value_col != 0) {
                            column = 0.00
                          } else if (first_value_col != 0 && second_value_col == 0) {
                            column = 100.00
                          } else if (first_value_col == 0 && second_value_col == 0) {
                            column = 0.00
                          } else {

                            column = (first_value_col / second_value_col) * 100
                          }

                          // % column

                          // % income

                          let first_value_inc = item
                          let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[j]) : 0
                          let income

                          if (first_value_inc == 0 && second_value_inc != 0) {
                            income = 0.00
                          } else if (first_value_inc != 0 && second_value_inc == 0) {
                            income = 100.00
                          } else if (first_value_inc == 0 && second_value_inc == 0) {
                            income = 0.00
                          } else {
                            income = (first_value_inc / second_value_inc) * 100
                          }

                          // % income

                          // % expense

                          let first_value_exp = item
                          let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[j]) : 0
                          let expense

                          if (first_value_exp == 0 && second_value_exp != 0) {
                            expense = 0.00
                          } else if (first_value_exp != 0 && second_value_exp == 0) {
                            expense = 100.00
                          } else if (first_value_exp == 0 && second_value_exp == 0) {
                            expense = 0.00
                          } else {
                            expense = (first_value_exp / second_value_exp) * 100
                          }

                          // % expense

                          // Amount change
                          let change
                          if ((j + 1) % 2 == 0) {
                            change = a.amount_array[j - 1] - a.amount_array[j]
                          }
                          // Amount change


                          // % change
                          let per_change
                          if ((j + 1) % 2 == 0) {

                            let first_value_per = change
                            let second_value_per = a.amount_array[j]


                            if (first_value_per == 0 && second_value_per != 0) {
                              per_change = 0.00
                            } else if (first_value_per != 0 && second_value_per == 0) {
                              per_change = 100.00
                            } else if (first_value_per == 0 && second_value_per == 0) {
                              per_change = 0.00
                            } else {
                              per_change = (first_value_per / second_value_per) * 100
                            }

                          }
                          // % change



                          return (
                            <>
                              <td
                                className="text-right"
                                key={j}
                                onDoubleClick={() => {
                                  this.subCategory(a.category_id);
                                }}
                              >
                                {" "}
                                <div>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(item)).replace(this.state.home_currency_symbol, '')}
                                  {/* {item.toFixed(2)} */}
                                </div>{" "}
                              </td>




                              {this.state.row && <td className="text-right" ><div>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                              </div> </td>}
                              {this.state.column && <td className="text-right" ><div>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                              </div> </td>}
                              {this.state.income && <td className="text-right" > <div>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                              </div> </td>}
                              {this.state.expense && <td className="text-right" ><div>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                              </div> </td>}
                              {(j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                <td className="text-right" ><div>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                </div> </td>
                              }
                              {(j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                <td className="text-right" ><div>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                </div> </td>
                              }
                              {(j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                <td className="text-right" ><div>000</div> </td>
                              }
                              {(j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                <td className="text-right" ><div>000</div> </td>
                              }
                              {(j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                <td className="text-right" ><div>000</div> </td>
                              }

                            </>



                          )
                        })}
                      </tr>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                )
              }
            })}
        </React.Fragment>
      )
    }
  }

  mainCategory(val) {
    console.log(this.state.reportObject);
    const keys = Object.keys(this.state.reportObject.details);
    keys.forEach((input, idx) => {
      console.log(this.state.reportObject.details[input].account_type_id);
      if (this.state.reportObject.details[input].account_type === val) {
        this.props.history.push("/transaction_history", {
          account_type_id_array: [
            this.state.reportObject.details[input].account_type_id,
          ],
          breakdown_by: val,
        });
      }
    });
  }

  goToBreak(input) {
    window.open(
      "/transaction_history?breakdown_by=" +
      input +
      "&start=" +
      this.state.start_date +
      "&end=" +
      this.state.end_date +
      "&range=" +
      this.state.date_range

    );
  }

  mainIncome(id) {
    window.open(
      "/transaction_history?account_type_id_array=" +
      id +
      "&start=" +
      this.state.start_date +
      "&end=" +
      this.state.end_date +
      "&range=" +
      this.state.date_range
    );
  }

  subCategoryOthers(subId) {
    window.open(
      "/transaction_history?category_id=" +
      subId +
      "&start=" +
      this.state.start_date +
      "&end=" +
      this.state.end_date +
      "&range=" +
      this.state.date_range
    );
  }

  subCategory(subId) {
    window.open(
      "/transaction_history?category_id_array=" +
      subId +
      "&start=" +
      this.state.start_date +
      "&end=" +
      this.state.end_date +
      "&range=" +
      this.state.date_range
    );
  }

  sortingApi = () => {
    if (this.state.selectedName != "") {
      this.fetch_report();
    }
  };

  sortByNames = () => {
    let report_id = 1;
    // alert('hjgh')
    FetchAllApi.reportSortbyOptions(report_id, (err, response) => {
      if (response.status === 1) {
        console.log("rty", response);
        this.setState({ sortBynames: response.list });
      } else {
      }
    });
  };

  get_vendorNames = () => {
    let client_id = this.state.logged_client_id;
    // alert('hjgh')
    FetchAllApi.getCustomerNames(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ vendorNames: response.list });
      } else {
      }
    });
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
          this.fetch_report();
        }
      );
    });
  };

  multiSelectedCurrency = (cur) => {
    //alert(jQuery('#slectedCurrency').val())
    this.setState(
      { selectedCurrencies: jQuery("#slectedCurrency").val() },
      () => {
        this.fetch_report();
      }
    );
  };
  customRadioChange = (x) => {
    this.setState({ valueAmount_type: x });
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

  changefromDate1(fromdate) {
    let date = jQuery("#fromdate1").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({ date_start: date_formated }, () => {
        this.fetch_report();
      });
    }
  }

  changetoDate1(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate1").val();
    if (date != undefined && date!='') {
    var array = date.split("/");
    var date_formated = array[2] + "-" + array[1] + "-" + array[0];
    if(array!='' && array!=undefined){
    this.setState({ date_end: date_formated }, () => {
      this.fetch_report();
    });
  }}
  }

  changetoDate_duedate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate_duedate").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      if(array!='' && array!=undefined){
      this.setState({ todate_duedate: date_formated }, () => {
        this.fetch_report();
      });
    }
    }
  }

  changefromDate_duedate(fromdate) {
    let date = jQuery("#fromdate_duedate").val();
    console.log("fromdate RTEdsadaasdadasdadad", date);
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      if(array!='' && array!=undefined){
      this.setState({ changefromDate_duedate: date_formated }, () => {
        this.fetch_report();
      });
    }
    }
  }

  selectedVendorIds = (e) => {
    var result = [];

    this.setState({ selected_vendor_ids: result }, () => {
      this.fetch_report();
    });

    var options = e.target.options;
    var opt;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        var vas = { customer_id: opt.value || opt.text, job_id: 0 };
        result.push(vas);
      } else {
      }
    }
  };

  all_report_name = () => {
    FetchAllApi.all_report_name((err, response) => {
      if (response.status === 1) {
        let report_ids = response.response;
        for (var i = 0; i < report_ids.length; i++) {
          if (report_ids[i].column_name == "profit_loss") {
            this.setState(
              { all_report_name_id: report_ids[i].report_id },
              () => {
                this.fetch_report();
                this.sortByNames();
              }
            );
          }
        }
      } else {
      }
    });
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

  selectedVendor_type = (e) => {
    var result = [];

    this.setState({ selectedVendor_type: result }, () => {
      this.fetch_report();
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
      this.fetch_report();
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

  selectedTerms = (e) => {
    var result = [];

    this.setState({ selectedTerms: result }, () => {
      this.fetch_report();
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

  changefromDate1(fromdate) {
    let date = jQuery("#fromdate1").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      if(array!='' && array!=undefined){
      this.setState({ date_start: date_formated }, () => {
        this.fetch_report();
      });
    }
    }
  }

  changetoDate1(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate1").val();
    if (date != undefined && date!='') {
    var array = date.split("/");
    var date_formated = array[2] + "-" + array[1] + "-" + array[0];
    if(array!='' && array!=undefined){
    this.setState({ date_end: date_formated }, () => {
      this.fetch_report();
    });}
  }
  }

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
          this.fetch_report();
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
          this.fetch_report();
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
            from: this.state.From,
            to: this.state.To,
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };
  changeText4 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: this.state.valueAmount_type4,
            value: this.state.valueAmount4,
            from: "",
            to: "",
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };

  text1 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text1,
            from: "",
            to: "",
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };

  text2 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text2,
            from: "",
            to: "",
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };

  text3 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text3,
            from: "",
            to: "",
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };

  text4 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text4,
            from: "",
            to: "",
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };

  text5 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text5,
            from: "",
            to: "",
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };

  text6 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text6,
            from: "",
            to: "",
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };

  text7 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text7,
            from: "",
            to: "",
          },
        },
        () => {
          this.fetch_report();
        }
      );
    });
  };

  selected_filters = (e) => {
    var result = [];
    var options = e.target.options;
    var opt;
    var j = 0;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result[j] = Number(opt.value);
        j++;
      }
    }
    localStorage.setItem("filter", result);
    this.setState({ result_array: result }, () => {
      this.fetch_report();
    });

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
      if (result.includes(22)) {
        this.setState({ selectedFil: 22 });
      }

      if (result.includes(23)) {
        this.setState({ selectedFil: 23 });
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
      if (result.includes(29)) {
        this.setState({ selectedFil: 29 });
      }

      if (result.includes(32)) {
        this.setState({ selectedFil: 32 });
      }

      if (result.includes(50)) {
        this.setState({ selectedFil: 50 });
      }

    } else {
      this.setState({ selectedFil: 0 });
    }
  };

  UNSAFE_componentWillMount() {
    // TODO: Move this
    var startDate = new Date();
    var endISO = startDate.toISOString().substring(0, 10);
    var start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    start = new Date(start);
    start =
      start.getFullYear() +
      "-" +
      (start.getMonth() + 1) +
      "-" +
      start.getDate();
    this.fetch_report();
    jQuery(document.body).removeClass("minimize_leftbar");
    this.setState({
      startDate: start,
      endDate: endISO,
    });
    this.show_column_option_list();
    jQuery("title").html("User Inbox | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  }
  show_columnslist = () => {
    let report_name = "profit_and_loss";
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
  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true }); //DidUpdate

    jQuery(".turn_off").hide();
    jQuery(".turn_off_percentage").hide();
  }


  customRadioChange4 = (x) => {
    this.setState({ valueAmount_type4: x },
      () => {
        this.fetch_report();
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
          this.fetch_report();
        }
      );
    });
  };



  multiSelectedAccount = () => {
    this.setState(
      { selectedAccountIds: jQuery("#selectedAccountIds").val() },
      () => {
        this.fetch_report();
      }
    );
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


  componentDidMount() {
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

    this.all_account_list()
    this.show_columnslist();
    this.get_currencies(); //didMount
    this.get_vendorNames();

    this.customer_type();
    this.paymentTerms();
    this.all_report_name();

    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

    jQuery(".left-navmenu .has-sub").click(function () {
      jQuery(".left-navmenu li a").removeClass("active");
      jQuery(this).addClass("active");
      jQuery(".left-navmenu li a:not(.active)").siblings(".sub-menu").slideUp();
      jQuery(this).siblings(".sub-menu").slideToggle();
    });
    jQuery(".left-navmenu .sub-menu li a").click(function () {
      jQuery(".left-navmenu .sub-menu li a").removeClass("active");
      jQuery(this).addClass("active");
    });
    jQuery(".search-btn").click(function () {
      jQuery(".hdr-search").addClass("active");
    });
    jQuery(".hdr-search .close-icon").click(function () {
      jQuery(".hdr-search").removeClass("active");
    });
    jQuery(".label-enclose .label").click(function () {
      jQuery(this).toggleClass("active");
    });
    jQuery(".nav-brand-res").click(function () {
      jQuery(".left-navbar").addClass("active");
    });
    jQuery(".menu-close").click(function () {
      jQuery(".left-navbar").removeClass("active");
    });

    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
    // document.getElementById("fromdate").value = moment(
    //   this.state.startDate
    // ).format("DD/MM/YYYY");
    // document.getElementById("todate").value = moment().format("DD/MM/YYYY");
    // go through cea54132f2a792d069b6c7052243f324d566e56d commit
    // jQuery(".custom-select-drop .dropdown-menu a").click(function () {
    //   jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
    //     "active"
    //   );
    //   //jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass("active");
    //   jQuery(this).parent("li").addClass("active");
    //   jQuery(".open #selected").text(jQuery(this).text());
    // });

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
    //   jQuery(document)
    //     .on('shown.bs.dropdown', '.dropdown', function () {
    //       // calculate the required sizes, spaces
    //       var $ul = jQuery(this).children('.dropdown-menu')
    //       var $button = jQuery(this).children('.dropdown-toggle')
    //       var ulOffset = $ul.offset()
    //       // how much space would be left on the top if the dropdown opened that direction
    //       var spaceUp =
    //         ulOffset.top -
    //         $button.height() -
    //         $ul.height() -
    //         jQuery(window).scrollTop()
    //       // how much space is left at the bottom
    //       var spaceDown =
    //         jQuery(window).scrollTop() +
    //         jQuery(window).height() -
    //         (ulOffset.top + $ul.height())
    //       // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
    //       if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
    //         jQuery(this).addClass('dropup')
    //     })
    //     .on('hidden.bs.dropdown', '.dropdown', function () {
    //       // always reset after close
    //       jQuery(this).removeClass('dropup')
    //     })
    const urlParams = new URLSearchParams(window.location.search);
    let start = urlParams.get("start");
    let end = urlParams.get("end");
    let range = urlParams.get("range");    
   
    if (localStorage.getItem('fiscal_start_year') != '' && localStorage.getItem('fiscal_start_year') != null && localStorage.getItem('fiscal_start_year') != undefined) {
      let start = moment(localStorage.getItem('fiscal_start_year')).format("DD-MM-YYYY");
      let end = moment(localStorage.getItem('fiscal_end_year')).format("DD-MM-YYYY");
      this.setState({ start_date: localStorage.getItem('fiscal_start_year'), end_date: localStorage.getItem('fiscal_end_year') });
      document.getElementById("fromdate").value = start;
      document.getElementById("todate").value = end;
    } 
    else if(urlParams!=null && urlParams!=undefined)
    {
      this.setState({
        start_date: start,
        end_date: end,
        date_range : range
      })
      this.fetch_report();
    }
    else {
      this.setState({ date_range: "All" })
      this.changedatevalue("All")
    };
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push("/data_tagging/" + list_id + "/" + file_id);
    window.scrollTo(0, 0);
  }

  handleChange(fromDate) {
    // TODO: Deepa move this to a common fn or use moment
    var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    console.log("FROM ADTE", fromDate);
    var arrayDate = fromDate.match(pattern);
    console.log("DATE ARRAY ==>", arrayDate);
    var formattedDate = arrayDate
      ? new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1])
      : "";
    //var formattedDate = new Date(dt);
    formattedDate = formattedDate
      ? formattedDate.getFullYear() +
      "-" +
      (formattedDate.getMonth() + 1) +
      "-" +
      formattedDate.getDate()
      : "";
    var endDate = this.state.endDate;
    var showCol = this.state.show_column ? this.state.show_column : "2";
    this.setState({ startDate: formattedDate });
    var startDate = formattedDate;
    if (endDate && startDate) {
      this.fetch_report(startDate, endDate, showCol);
    }
  }
  changefromDate(fromdate) {
    let date = jQuery("#fromdate").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      var fomrat = moment(date_formated, "YYYY-MM-DD").format("DD-MM-YYYY");
      jQuery("#fromdate").val(fomrat);
      this.setState({ start_date: date_formated }, () => {
        this.fetch_report();
      });
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }

  previous_period_from_date() {
    let date = jQuery("#previous_period_from_date").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      var fomrat = moment(date_formated, "YYYY-MM-DD").format("DD-MM-YYYY");
      jQuery("#previous_period_from_date").val(fomrat);
      this.setState({ previous_period_from_date: date_formated }, () => {
        this.fetch_report();
      });
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }
  previous_period_to_date() {
    let date = jQuery("#previous_period_to_date").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      var fomrat = moment(date_formated, "YYYY-MM-DD").format("DD-MM-YYYY");
      jQuery("#previous_period_to_date").val(fomrat);
      this.setState({ previous_period_to_date: date_formated }, () => {
        this.fetch_report();
      });
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }

  selected_item = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    let show_columns = optionElement.getAttribute("data-id");

    this.setState({ show_column: show_columns }, () => {
      this.fetch_report();
    });
  };
  changetoDate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate").val();
    if (date != undefined && date!='') {
    var array = date.split("/");
    var date_formated = array[2] + "-" + array[1] + "-" + array[0];
    if(array!='' && array!=undefined){
    var fomrat = moment(date_formated, "YYYY-MM-DD").format("DD-MM-YYYY");
    jQuery("#todate").val(fomrat)
    this.setState({ end_date: date_formated }, () => {
      this.fetch_report();
    });}
  }
    // this.state.end_date = moment(date).format('YYYY-MM-DD')
    //  alert(moment(todate).format('YYYY-MM-DD'))
  }
  // changedatevalue (seleteddateformat) {
  //   var dateresult = moment()
  //   let from_date, to_date

  //    if (seleteddateformat === 'This Month-to-date') {
  //     //from_date = dateresult.startOf('monfetch_reportth')
  //     from_date = dateresult.startOf('month')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     document.getElementById('todate').value = moment().format(
  //       'YYYY-MM-DD'
  //     )
  //     this.state.end_date = moment().format('YYYY-MM-DD')
  //     this.setState({ show_column: 1 }, () => this.fetch_report())
  //     //this.setState({ show_column: 2 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Week') {
  //     from_date = dateresult.startOf('week')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     console.log('startdate', this.state.start_date)
  //     to_date = dateresult.endOf('week')
  //     document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
  //     this.state.end_date = to_date.format('YYYY-MM-DD')
  //     this.setState({ show_column: 1 }, () => this.fetch_report())
  //     // this.setState({ show_column: 3 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Month') {
  //     from_date = dateresult.startOf('month')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = dateresult.endOf('month')
  //     document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
  //     this.state.end_date = to_date.format('YYYY-MM-DD')
  //     this.setState({ show_column: 1 }, () => this.fetch_report())
  //    // this.setState({ show_column: 7 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Week-to-date') {
  //     from_date = dateresult.startOf('week')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     document.getElementById('todate').value = moment().format(
  //       'YYYY-MM-DD'
  //     )
  //     this.state.end_date = moment().format('YYYY-MM-DD')
  //     this.setState({ show_column: 1 }, () => this.fetch_report())
  //     //this.setState({ show_column: 2 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Year') {
  //     from_date = dateresult.startOf('year')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = dateresult.endOf('year')
  //     document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
  //     this.state.end_date = to_date.format('YYYY-MM-DD')
  //     this.setState({ show_column: 1 }, () => this.fetch_report())
  //     //this.setState({ show_column: 2 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Year-to-date') {
  //     from_date = dateresult.startOf('year')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = moment(new Date()).format('YYYY-MM-DD')
  //     document.getElementById('todate').value = to_date
  //     this.state.end_date = to_date
  //     this.setState({ show_column: 1 }, () => this.fetch_report())
  //   }

  //   let startDate = jQuery('#fromdate').val()
  //   let end_date = jQuery('#todate').val()
  //   this.setState({ start_date: startDate, end_date: end_date }, () => {
  //     this.fetch_report()
  //     if (seleteddateformat === 'All') {
  //       //from_date = dateresult.startOf('monfetch_reportth')
  //       // from_date = dateresult.startOf('month')
  //       // document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //       // this.state.start_date = from_date.format('YYYY-MM-DD')
  //       // document.getElementById('todate').value = moment().format(
  //       //   'YYYY-MM-DD'
  //       // )
  //      // this.state.end_date = moment().format('YYYY-MM-DD')
  //       this.setState({ show_column: 1 ,start_date:'',end_date: ''}, () => this.fetch_report())
  //       //this.setState({ show_column: 2 }, () => this.fetch_report())
  //       document.getElementById('fromdate').value =''
  //       document.getElementById('todate').value =''
  //     }
  //   })

  // }

  changedatevalue(seleteddateformat) {
    var dateresult = moment();
    let from_date, to_date;
    this.setState({ date_range: seleteddateformat,is_all_option: seleteddateformat == "All" ? 1 : 0 })
setTimeout(() => {
  

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
      this.state.option = 0;
      this.fetch_report();
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
      this.state.option = 0;
      this.fetch_report();
    } else if (seleteddateformat === "This Month") {
      from_date = dateresult.startOf("month");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("month");
      document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.state.option = 0;
      this.fetch_report();
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
      this.state.option = 0;
      this.fetch_report();
    } else if (seleteddateformat === "This Year") {
      from_date = dateresult.startOf("year");
      document.getElementById("fromdate").value = from_date.format(
        "DD-MM-YYYY"
      );
      this.state.start_date = from_date.format("YYYY-MM-DD");
      to_date = dateresult.endOf("year");
      document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
      this.state.end_date = to_date.format("YYYY-MM-DD");
      this.state.option = 0;
      this.fetch_report();
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
      this.state.option = 0;
      this.fetch_report();
    } else if (seleteddateformat == "All") {
      // setTimeout(() => {
        this.setState({ start_date: "1970-01-01", end_date: moment().add(10, 'years').format("YYYY-MM-DD"), option: 1 }, () => {
          this.fetch_report();
        });
        document.getElementById("fromdate").value = "";
        document.getElementById("todate").value = "";
      // }, 1000);
     
    } else if (seleteddateformat == "Custom") {
      this.state.option = 0;
    }
  }, 500);
    // let startDate = jQuery("#fromdate").val();
    // let end_date = jQuery("#todate").val();
    // this.setState(
    //   { start_date: startDate, end_date: end_date, option: 0 },
    //   () => {
    //     this.fetch_report();
    //     if (seleteddateformat == "Custom") {
    //       this.state.option = 0;
    //     }
    //     if (seleteddateformat == "All") {
    //       this.setState({ start_date: localStorage.getItem("incorporation_date"), end_date:moment().add(10, 'years').format("YYYY-MM-DD"), option: 1 }, () => {
    //         this.fetch_report();
    //       });
    //       document.getElementById("fromdate").value = "";
    //       document.getElementById("todate").value = "";
    //     }
    //   }
    // );
  }
  // changedatevalue =(seleteddateformat) =>{
  //   var dateresult = moment()
  //   let from_date, to_date
  //    if (seleteddateformat === 'This Month-to-date') {
  //     //from_date = dateresult.startOf('monfetch_reportth')
  //     from_date = dateresult.startOf('month')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     document.getElementById('todate').value = moment().format(
  //       'YYYY-MM-DD'
  //     )
  //     this.state.end_date = moment().format('YYYY-MM-DD')
  //     this.setState({ show_column: this.state.show_column }, () => this.fetch_report())
  //     //this.setState({ show_column: 2 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Week') {
  //     from_date = dateresult.startOf('week')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     console.log('startdate', this.state.start_date)
  //     to_date = dateresult.endOf('week')
  //     document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
  //     this.state.end_date = to_date.format('YYYY-MM-DD')
  //     this.setState({ show_column: this.state.show_column }, () => this.fetch_report())
  //     // this.setState({ show_column: 3 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Month') {
  //     from_date = dateresult.startOf('month')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = dateresult.endOf('month')
  //     document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
  //     this.state.end_date = to_date.format('YYYY-MM-DD')
  //     this.setState({ show_column: this.state.show_column }, () => this.fetch_report())
  //    // this.setState({ show_column: 7 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Week-to-date') {
  //     from_date = dateresult.startOf('week')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     document.getElementById('todate').value = moment().format(
  //       'YYYY-MM-DD'
  //     )
  //     this.state.end_date = moment().format('YYYY-MM-DD')
  //     this.setState({ show_column: this.state.show_column }, () => this.fetch_report())
  //     //this.setState({ show_column: 2 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Year') {
  //     from_date = dateresult.startOf('year')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = dateresult.endOf('year')
  //     document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
  //     this.state.end_date = to_date.format('YYYY-MM-DD')
  //     this.setState({ show_column: this.state.show_column }, () => this.fetch_report())
  //     //this.setState({ show_column: 2 }, () => this.fetch_report())
  //   } else if (seleteddateformat === 'This Year-to-date') {
  //     from_date = dateresult.startOf('year')
  //     document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //     this.state.start_date = from_date.format('YYYY-MM-DD')
  //     to_date = moment(new Date()).format('YYYY-MM-DD')
  //     document.getElementById('todate').value = to_date
  //     this.state.end_date = to_date
  //     this.setState({ show_column: this.state.show_column }, () => this.fetch_report())
  //   }
  //   let startDate = jQuery('#fromdate').val()
  //   let end_date = jQuery('#todate').val()
  //   this.setState({ start_date: startDate, end_date: end_date }, () => {
  //     this.fetch_report()
  //     if (seleteddateformat === 'All') {
  //       //from_date = dateresult.startOf('monfetch_reportth')
  //       // from_date = dateresult.startOf('month')
  //       // document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
  //       // this.state.start_date = from_date.format('YYYY-MM-DD')
  //       // document.getElementById('todate').value = moment().format(
  //       //   'YYYY-MM-DD'
  //       // )
  //      // this.state.end_date = moment().format('YYYY-MM-DD')
  //       this.setState({ show_column: this.state.show_column ,start_date:'',end_date: ''}, () => this.fetch_report())
  //       //this.setState({ show_column: 2 }, () => this.fetch_report())
  //       document.getElementById('fromdate').value =''
  //       document.getElementById('todate').value =''
  //     }
  //   })
  // }
  handleChangeEndDate(toDate) {
    var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    console.log("TODATE =", toDate);
    var arrayDate = toDate.match(pattern);
    var formattedDate = arrayDate
      ? new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1])
      : "";
    formattedDate = formattedDate
      ? formattedDate.getFullYear() +
      "-" +
      (formattedDate.getMonth() + 1) +
      "-" +
      formattedDate.getDate()
      : "";
    this.setState({ endDate: formattedDate });
    var showCol = this.state.show_column ? this.state.show_column : "2";
    var startDate = this.state.startDate;
    var endDate = formattedDate;
    this.fetch_report(startDate, endDate, showCol);
  }

  setShowColumn(event) {
    // alert(event.currentTarget.dataset.name)
    //document.getElementById(".custom-select-drop .dropdown .open").value= event.currentTarget.dataset.rate;
    this.setState({
      selected: event.currentTarget.dataset.name,
    });
    var showCol = event.currentTarget.dataset.rate;
    this.setState(
      {
        show_column: showCol,
      },
      () => {
        this.fetch_report();
      }
    );
  }

  // TODO: Deepa - handle the month to date filter options
  setShowColumnDateRange(event) {
    var showCol = "";
    var start;
    let from_date, to_date;
    var end = new Date().toISOString().substring(0, 10);
    if (event.target.name === "week") {
      this.setState({
        show_column: "3",
      });
      showCol = "3";
      var startDate = new Date();
      var day = startDate.getDay(),
        diff = startDate.getDate() - day; // adjust when day is sunday
      start = new Date(startDate.setDate(diff));
      document.getElementById("fromdate").value = moment(start).format(
        "DD/MM/YYYY"
      );
      start =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();
      document.getElementById("todate").value = moment().format("DD/MM/YYYY");
      console.log("DATE WEEK START===>", start);
      this.setState({
        startDate: start,
        endDate: end,
      });
    } else if (event.target.name === "month") {
      this.setState({
        show_column: "7",
      });
      showCol = "7";
      var startDate = new Date();
      start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      start = new Date(start);
      document.getElementById("fromdate").value = moment(start).format(
        "DD/MM/YYYY"
      );
      start =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();
      document.getElementById("todate").value = moment().format("DD/MM/YYYY");
      console.log("DATE OF THE MONTH=> ", start);
      this.setState({
        startDate: start,
        endDate: end,
      });
    } else if (event.target.name === "month_to_date") {
      this.setState({
        show_column: "2",
      });
      showCol = "2";
      var startDate = new Date();
      start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      start = new Date(start);
      document.getElementById("fromdate").value = moment(start).format(
        "DD/MM/YYYY"
      );
      start =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();
      document.getElementById("todate").value = moment().format("DD/MM/YYYY");
      this.setState({
        startDate: start,
        endDate: end,
      });
    } else if (event.target.name === "week_to_date") {
      this.setState({
        show_column: "2",
      });
      showCol = "2";
      var startDate = new Date();
      var day = startDate.getDay(),
        diff = startDate.getDate() - day; // adjust when day is sunday
      start = new Date(startDate.setDate(diff));
      document.getElementById("fromdate").value = moment(start).format(
        "DD/MM/YYYY"
      );
      start =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();
      document.getElementById("todate").value = moment().format("DD/MM/YYYY");
      this.setState({
        startDate: start,
        endDate: end,
      });
    } else if (event.target.name === "year") {
      this.setState({
        show_column: "2",
      });
      showCol = "2";
      var startDate = new Date();
      var day = startDate.getDay(),
        diff = startDate.getDate() - day; // adjust when day is sunday
      start = new Date(startDate.setDate(diff));
      var dateresult = moment();
      from_date = dateresult.startOf("year");
      document.getElementById("fromdate").value = from_date.format(
        "DD/MM/YYYY"
      );

      start =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();
      to_date = dateresult.endOf("year");
      document.getElementById("todate").value = to_date.format("DD/MM/YYYY");
      this.setState({
        startDate: from_date.format("YYYY-MM-DD"),
        endDate: to_date.format("YYYY-MM-DD"),
      });
    } else if (event.target.name === "year_to_date") {
      this.setState({
        show_column: "2",
      });
      showCol = "2";
      var startDate = new Date();
      var day = startDate.getDay(),
        diff = startDate.getDate() - day; // adjust when day is sunday
      start = new Date(startDate.setDate(diff));
      var dateresult = moment();
      from_date = dateresult.startOf("year");
      document.getElementById("fromdate").value = from_date.format(
        "DD/MM/YYYY"
      );
      start =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();
      document.getElementById("todate").value = moment().format("DD/MM/YYYY");
      this.setState({
        startDate: from_date.format("YYYY-MM-DD"),
        endDate: end,
      });
    }
    if (showCol && start && end) {
      this.fetch_report(start, end, showCol);
    }
  }
  fetch_report = () => {
    let filter_id = this.state.result_array;
    let filter_options = {
      0:{
        is_all_option : this.state.is_all_option
      },
      1: {
        condition: this.state.valueAmount_type,
        value: this.state.valueAmount,
        from: this.state.From,
        to: this.state.To,
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

      11: { condition: "", value: this.state.text1, from: "", to: "" },
      17: { condition: "", value: this.state.text2, from: "", to: "" },
      24: { condition: "", value: this.state.text3, from: "", to: "" },
      25: { condition: "", value: this.state.text4, from: "", to: "" },
      26: { condition: "", value: this.state.text5, from: "", to: "" },
      27: { condition: "", value: this.state.text6, from: "", to: "" },
      28: { condition: "", value: this.state.text7, from: "", to: "" },

      2: {
        condition: this.state.valueAmount_type1,
        value: this.state.valueAmount1,
        from: "",
        to: "",
      },
      10: {
        condition: this.state.valueAmount_type2,
        value: this.state.valueAmount2,
        from: "",
        to: "",
      },
      13: {
        condition: this.state.valueAmount_type3,
        value: this.state.valueAmount3,
        from: "",
        to: "",
      },
      18: {
        condition: this.state.valueAmount_type4,
        value: this.state.valueAmount4,
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

      29: {
        condition: "",
        value: [...this.state.selectedCustomer_type],
        from: "",
        to: "",
      },

      50: {
        condition: "",
        value: [...this.state.selectedAccountIds],
        from: "",
        to: "",
      },


      32: {
        condition: this.state.valueAmount_type4,
        value: this.state.valueAmount4,
        from: this.state.From4,
        to: this.state.To4,
      },

    };

    FetchAllApi.filter_column(
      this.state.all_report_name_id,this.state.logged_client_id,
      null,
      (errResponse, filtervalue) => {
        console.log("Filter Result", filtervalue);
        this.setState({ filtervalue: filtervalue });
      }
    );

    this.setState({ loading: true });
    let { start_date, end_date } = this.state;

    var showColumns = this.state.show_column;

    // var showColumns = showCol ? showCol : '1'
    var user_id = parseFloat(this.state.logged_client_id);
    FetchAllApi.reports_list(
      user_id,
      start_date,
      end_date,
      showColumns,
      filter_id,
      filter_options,
      this.state.selectedName,
      this.state.sort_type == "Ascending Order" ? 'asc' : 'desc',
      this.state.sub_columns,
      this.state.report_type,
      this.state.previous_period_from_date,
      this.state.previous_period_to_date,
      (err, response) => {
        console.log("LIST RETURNEDjkhkshkkdsh=>", response);
        if (response.status == 1) {
          this.setState({
            reportObject: response,
            loading: false,
            detailsArray: Object.values(response.details),
          });
        } else {
          this.setState({
            reportObject: {},
            loading: false,
            detailsArray: [],
          });
        }
      }
    );
  };
  show_column_option_list = () => {
    var reqBody = { report_name: "profit_and_loss" };
    var user_id = parseFloat(this.state.logged_user_id);
    FetchAllApi.show_column_option_list(user_id, reqBody, (err, response) => {
      console.log("JSON RESULT SHOW LIST>", response);
      if (response.status == 1) {
        console.log(
          "JSON RESULT SHOW LIST==>",
          JSON.stringify(response.details)
        );
        this.setState({
          show_column_option_list: response.details,
        });
      }
    });
  };
  handleCheck_get_selected_tax(e) {
    this.setState(
      {
        show_column: e.currentTarget.dataset.type,
      },
      () => {
        this.handleChangeItems(0, this.state.rows.length - 1);
      }
    );

    jQuery("#show_col_search").val("");
    this.show_column_option_list();
  }

  update_search_keyword = (event) => {
    this.setState({ search_key_gst: event.target.value }, () => {
      this.get_gst_list();
    });
  };

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  readTableData = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: "#table" });
    doc.save("table.pdf");
  };

  render() {
    console.log("list", this.state.reportObject);
    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items;

    if (
      this.state.item_details.user_image !== "" &&
      this.state.item_details.user_image !== "null"
    ) {
      var item_user_image = this.state.item_details.user_image;
    } else {
      var item_user_image = "images/user-img-1.png";
    }

    //console.log('item_files', this.state.item_file_path);
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
                <a href="javascript:;" className="back hidden-xs" onClick={() => this.props.history.goBack()}>
                  <img src="../images/back-arrow-blue.svg" />
                </a>
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a href="javascript:;">Report</a>
                  </li>
                  <li>Profit &amp; Loss</li>
                </ul>

                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>

              <div className="content-top col-md-12 col-xs-12">
                <h4 className="fw-sbold mar-t-no">Profit &amp; Loss</h4>
                <h5 className="fw-sbold"></h5>
                <div className="row snippet-row">
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet active">
                      <div>
                        <small>Total Revenue</small>
                        <span className="value">
                          {this.state.home_currency_symbol}{" "}
                          <Comma value={this.state.reportObject.total_revenue} />
                        </span>
                        <img
                          className="snippet-arrow visible-lg"
                          src="../images/snippet-arrow.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet">
                      <div>
                        <small>Cost of Goods Sold</small>
                        <span className="value">
                          {this.state.home_currency_symbol}{" "}<Comma value={this.state.reportObject.cost_of_goods_sold} />

                        </span>
                        <img
                          className="snippet-arrow visible-lg"
                          src="../images/snippet-arrow.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet">
                      <div>
                        <small>Gross Profit</small>
                        <span className="value">
                          {this.state.home_currency_symbol}{" "} <Comma value={this.state.reportObject.gross_profit} />

                        </span>
                        <img
                          className="snippet-arrow visible-lg"
                          src="../images/snippet-arrow.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet">
                      <div>
                        <small>Net Income</small>
                        <span className="value">
                          {this.state.home_currency_symbol}{" "}<Comma value={this.state.reportObject.net_income} />

                        </span>
                        <img
                          className="snippet-arrow visible-lg"
                          src="../images/snippet-arrow.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-content col-md-12 col-xs-12">
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no"></div>
                <div className="report-setting">
                  <form className="custom-form form-inline">
                    <div className="form-group mar-rgt">
                      <label>Date Range</label>
                      <div className="form-cont" >
                        <select
                          id="custom"
                          className="selectpicker form-control hh "
                          data-live-search="true"
                          value={this.state.date_range}
                          onChange={(e) => this.changedatevalue(e.target.value)}
                        >
                          <option value="All">All</option>
                          <option value="Custom">Custom</option>
                          <option value="This Month-to-date">This Month-to-date</option>
                          <option value="This Week">This Week</option>
                          <option value="This Month">This Month</option>
                          <option value="This Week-to-date">This Week-to-date</option>
                          <option value="This Year">This Year</option>
                          <option value="This Year-to-date">This Year-to-date</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group mar-rgt">
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
                              jQuery("#custom").val("Custom");
                              this.changefromDate(value);
                            }, 500)
                          }}
                          //onBlur={e => this.changefromDate(e.target.value)}
                          className="form-control"
                          autoComplete="off"
                        />
                        <div className="input-group-addon" onClick={() => jQuery('#fromdate').focus()}>
                          <img src="images/calendar-icon.svg" alt="icon" />
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
                          id="todate"
                          onBlur={(e) => {
                            let value = e.target.value
                            this.setState({date_range: "Custom"})
                            setTimeout(() => {
                              jQuery("#custom").val("Custom");
                              this.changetoDate(value);
                            }, 500)
                          }}
                          //onBlur={e => this.changetoDate(e.target.value)}
                          className="form-control"
                          autoComplete="off"
                        />
                        <div className="input-group-addon" onClick={() => jQuery('#todate').focus()}>
                          <img src="images/calendar-icon.svg" alt="icon" />
                        </div>
                      </div>
                    </div>

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
                        this.fetch_report();
                      }}
                    >
                      <img
                        src="images/refresh.svg"
                        style={{ width: "20px" }}
                      />

                    </a>
                  </form>
                  {/* <div className="pull-right">
                    <div className="dropdown menu-item">
                      <button
                        className="btn btn-green dropdown-toggle btn-arrow"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Export<span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu align-right">
                        <li>
                          <a
                            href="javascript:;"
                            onClick={() => {
                              this.readTableData();
                            }}
                          >
                            Export as PDF
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:;"
                            id="hi"
                            onClick={() => {
                              var elem = document.getElementById("hi");
                              var table = document.getElementById("table");
                              var html = table.outerHTML;
                              var url =
                                "data:application/vnd.ms-excel," + escape(html); // Set your html table into url
                              elem.setAttribute("href", url);
                              elem.setAttribute("download", "export.xls"); // Choose the file name
                              return false;
                            }}
                          >
                            Export as Excel
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                 
                  */}
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
                                <label className="fw-sbold">
                                  Report Basics
                                  </label>
                              </div>
                              <div className="col-lg-7 col-md-9">
                                <label className="custom-checkbox radio mar-t-no mar-rgt">
                                  <input
                                    type="radio"
                                    name="tax-item"
                                    checked={this.state.report_type == 1 ? true : false}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        this.setState({ report_type: 1 }, () => this.fetch_report())
                                      }
                                    }}
                                  />{" "}
                                    Accrual
                                    <span className="checkmark" />
                                </label>
                                <label className="custom-checkbox radio">
                                  <input type="radio" name="tax-item"
                                    checked={this.state.report_type == 2 ? true : false}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        this.setState({ report_type: 2 }, () => this.fetch_report())
                                      }
                                    }}
                                  /> Cash
                                    <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="form-group col-md-12 col-xs-12">
                            <div className="row">
                              <div className="col-lg-5 col-md-3">
                                <label className="fw-sbold">Show Columns</label>
                              </div>
                              <div className="col-lg-7 col-md-9">
                                <div className="custom-select-drop dropdown">
                                  <select
                                    className="form-control"
                                    onChange={(e) => this.selected_item(e)}
                                  >
                                    {this.state.show_coulmns_filter &&
                                      this.state.show_coulmns_filter.map(
                                        (item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              data-id={item.id}
                                            >
                                              {item.option_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    {/* <option>This Week</option>
                          <option>This Month</option>
                          <option>This Week-to-date</option> */}
                                  </select>
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
                                    className="selectpicker"
                                    multiple
                                    data-live-search="true"
                                    onChange={(e) => this.selected_filters(e)}
                                  >
                                    {this.state.filtervalue &&
                                      this.state.filtervalue.name &&
                                      this.state.filtervalue.name.map(
                                        (item, index) => {
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
                                      this.setState(
                                        {
                                          // alert(e.target.value)
                                          selectedName: e.target.value,
                                          sort_type: "Ascending Order",
                                        },
                                        this.sortingApi
                                      );
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
                                      let a = this.state.type ? "Descending Order" : "Ascending Order";
                                      console.log("yyyt", a);
                                      this.setState(
                                        {
                                          sort_type: a,
                                          type: !this.state.type,
                                        },
                                        this.sortingApi()
                                      );
                                    }}
                                  >
                                    {this.state.type ? "Ascending Order" : "Descending Order"}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* frontend filter calculations */}


                      <div className="col-lg-8 col-md-12 pad-r-no">
                        <div className="row">
                          <div className="form-group col-md-12 col-xs-12">
                            <label className="fw-sbold mar-rgt">
                              Add Subcolumns
                              </label>
                            <label className='custom-checkbox mar-rgt'>
                              <input type='checkbox' name checked={this.state.income}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    this.setState({ income: true })
                                  } else {
                                    this.setState({ income: false })
                                  }
                                }} /> % of Income
                                <span className='checkmark' />
                            </label>

                            <label className="custom-checkbox mar-rgt">
                              <input type="checkbox" name checked={this.state.row}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    this.setState({ row: true })
                                  } else {
                                    this.setState({ row: false })
                                  }
                                }}
                              /> % of Gross Income   {/* % of row */}
                              <span className="checkmark" />
                            </label>
                            <label className='custom-checkbox'>
                              <input type='checkbox' name checked={this.state.expense}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    this.setState({ expense: true })
                                  } else {
                                    this.setState({ expense: false })
                                  }
                                }} /> % of Expense
                                <span className='checkmark' />
                            </label>

                            <label className="custom-checkbox mar-rgt">
                              <input type="checkbox" name checked={this.state.column}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    this.setState({ column: true })
                                  } else {
                                    this.setState({ column: false })
                                  }
                                }} /> % of Net Income    {/* % of column */}
                              <span className="checkmark" />
                            </label>
                          </div>

                          <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                            <div
                              className="col-md-8 col-sm-8"
                              style={{ paddingLeft: 61 }}
                            >
                              <label className="custom-checkbox">
                                <input type="checkbox" name="" checked={this.state.previous_period}
                                  onChange={(e) => {
                                    if (e.target.checked == true) {
                                      this.setState({ previous_period: true, previous_year: false, year_to_date: false, previous_period_cad: false, previous_period_change: false, sub_columns: [1] }, () => this.fetch_report())
                                    } else {
                                      this.setState({ previous_period: false, previous_period_cad: false, previous_period_change: false, sub_columns: [] }, () => this.fetch_report())
                                    }
                                  }}
                                /> Previous
                                  Period
                                  <span className="checkmark"></span>
                              </label>
                              {this.state.previous_period &&
                                <>
                                  <div className="report-setting">
                                    <form className="custom-form form-inline">

                                      <div className="form-group mar-rgt">
                                        <label>From</label>
                                        <div
                                          className="input-group date mar-t-no"
                                          data-date-format="dd/mm/yyyy"
                                        >
                                          <input
                                            type="text"
                                            id="previous_period_from_date"
                                            style={{ height: '42px' }}
                                            onBlur={(e) => {
                                              let value = e.target.value
                                              setTimeout(() => {
                                                this.previous_period_from_date(value);
                                              }, 500)
                                            }}
                                            className="form-control"
                                            autoComplete="off"
                                          />
                                          <div className="input-group-addon" onClick={() => jQuery('#previous_period_from_date').focus()}>
                                            <img src="images/calendar-icon.svg" alt="icon" />
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
                                            id="previous_period_to_date"
                                            style={{ height: '42px' }}
                                            onBlur={(e) => {
                                              let value = e.target.value
                                              setTimeout(() => {
                                                this.previous_period_to_date(value);
                                              }, 500)
                                            }}
                                            //onBlur={e => this.changetoDate(e.target.value)}
                                            className="form-control"
                                            autoComplete="off"
                                          />
                                          <div className="input-group-addon" onClick={() => jQuery('#previous_period_to_date').focus()}>
                                            <img src="images/calendar-icon.svg" alt="icon" />
                                          </div>
                                        </div>
                                      </div>

                                    </form>
                                  </div>
                                  <div className="checkbox-block">
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name=""
                                        checked={this.state.previous_period_cad}
                                        onChange={(e) => {
                                          if (e.target.checked == true) {
                                            this.setState({ previous_period_cad: true })
                                          } else {
                                            this.setState({ previous_period_cad: false })
                                          }
                                        }}
                                      />{" "}
                                         Amount change
                                           <span className="checkmark"></span>
                                    </label>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name=""
                                        checked={this.state.previous_period_change}
                                        onChange={(e) => {
                                          if (e.target.checked == true) {
                                            this.setState({ previous_period_change: true })
                                          } else {
                                            this.setState({ previous_period_change: false })
                                          }
                                        }}
                                      />{" "}
                                             % Change
                                        <span className="checkmark"></span>
                                    </label>
                                  </div>
                                </>
                              }

                            </div>
                            {/* <div className="col-md-4 col-sm-4">
                              <label className="custom-checkbox">
                                <input type="checkbox" name=""
                                  checked={this.state.previous_year}
                                  onChange={(e) => {
                                    if (e.target.checked == true) {
                                      this.setState({ previous_period: false, previous_year: true, year_to_date: false, previous_year_cad: false, previous_year_change: false, sub_columns: [4] }, () => this.fetch_report())
                                    } else {
                                      this.setState({ previous_year: false, previous_year_cad: false, previous_year_change: false, sub_columns: [] }, () => this.fetch_report())
                                    }
                                  }} /> Previous
                                  Year
                                  <span className="checkmark"></span>
                              </label>
                              {this.state.previous_year &&
                                <div className="checkbox-block">
                                  <label className="custom-checkbox">
                                    <input
                                      type="checkbox"
                                      name=""
                                      checked={this.state.previous_year_cad}
                                      onChange={(e) => {
                                        if (e.target.checked == true) {
                                          this.setState({ previous_year_cad: true })
                                        } else {
                                          this.setState({ previous_year_cad: false })
                                        }
                                      }}
                                    />{" "}
                                    CAD Change
                                    <span className="checkmark"></span>
                                  </label>
                                  <label className="custom-checkbox">
                                    <input
                                      type="checkbox"
                                      name=""
                                      checked={this.state.previous_year_change}
                                      onChange={(e) => {
                                        if (e.target.checked == true) {
                                          this.setState({ previous_year_change: true })
                                        } else {
                                          this.setState({ previous_year_change: false })
                                        }
                                      }}
                                    />{" "}
                                    % Change
                                    <span className="checkmark"></span>
                                  </label>
                                </div>}
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <label className="custom-checkbox">
                                <input type="checkbox" name="" checked={this.state.year_to_date} onChange={(e) => {
                                  if (e.target.checked == true) {
                                    this.setState({ previous_period: false, previous_year: false, year_to_date: true, year_to_date_ytd: false })
                                  } else {
                                    this.setState({ year_to_date: false, year_to_date_ytd: false })
                                  }
                                }}
                                /> Year-to-Date
                                  <span className="checkmark"></span>
                              </label>
                              {this.state.year_to_date &&
                                <div className="checkbox-block">
                                  <label className="custom-checkbox">
                                    <input type="checkbox" name="" checked={this.state.year_to_date_ytd}
                                      onChange={(e) => {
                                        if (e.target.checked == true) {
                                          this.setState({ year_to_date_ytd: true })
                                        } else {
                                          this.setState({ year_to_date_ytd: false })
                                        }
                                      }} /> % of YTD
                                    <span className="checkmark"></span>
                                  </label>
                                </div>}
                            </div>
                          */}
                          </div>


                        </div>
                      </div>



                      {/* frontend filter calculations */}






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
                                  <label>Name &nbsp;</label>
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
                                              id={item.id}
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
                                <div className="input-group-addon" onClick={() => jQuery('#fromdate_duedate').focus()}>
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
                                <label className="custom-checkbox mar-rgt">
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
                                </label>
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
                                <label className="custom-checkbox mar-rgt">
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
                                </label>
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
                      {this.state.selectedFil === 10 && (
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
                                <label className="custom-checkbox mar-rgt">
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
                                </label>
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
                                <label>memo</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="text1"
                                  className="form-control"
                                  onChange={this.text1}
                                  style={{ width: "128px" }}
                                />
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
                                <label>Exchange rate</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="text2"
                                  className="form-control"
                                  onChange={this.text2}
                                  style={{ width: "128px" }}
                                />
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
                                <label>address</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="text3"
                                  className="form-control"
                                  onChange={this.text3}
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
                                  name="text4"
                                  className="form-control"
                                  onChange={this.text4}
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
                                <label>email</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="text5"
                                  className="form-control"
                                  onChange={this.text5}
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
                                <label>Acc num</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="text6"
                                  className="form-control"
                                  onChange={this.text6}
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
                                <label>phonenumber</label>
                                <input
                                  type="text"
                                  id="male"
                                  name="text7"
                                  className="form-control"
                                  onChange={this.text7}
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
                    </form>
                  </div>
                  <div className="report-table col-md-12 col-xs-12 pad-no">
                    <div className="table-responsive" id="sticky-tb-hdr">
                      <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        visible={this.state.loading}
                      />
                      {!this.state.loading && (
                        <table className="table" id="table">
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              {

                                this.state.detailsArray.length > 0 &&
                                this.state.detailsArray[0].date_array.map(
                                  (date, index) => {
                                    return (
                                      <>
                                        <th className="text-right" key={index}>
                                          {" "}
                                          {date}
                                          <i className="th-sort">
                                            <img
                                              src="../images/sort-icon.svg"
                                              alt="SortIcon"
                                            />
                                          </i>
                                        </th>


                                        {/* added based on frontend filter */}

                                        {this.state.row && <th className="text-right" >
                                          { /* % of Row */} % of Gross Income
                                        <i className="th-sort">
                                            <img
                                              src="../images/sort-icon.svg"
                                              alt="SortIcon"
                                            />
                                          </i>
                                        </th>

                                        }
                                        {this.state.column && <th className="text-right" >
                                          { /* % of Column*/}  % of Net Income
                                        <i className="th-sort">
                                            <img
                                              src="../images/sort-icon.svg"
                                              alt="SortIcon"
                                            />
                                          </i>
                                        </th>

                                        }
                                        {this.state.income && <th className="text-right" >
                                          % of Income
                                        <i className="th-sort">
                                            <img
                                              src="../images/sort-icon.svg"
                                              alt="SortIcon"
                                            />
                                          </i>
                                        </th>

                                        }
                                        {this.state.expense && <th className="text-right" >
                                          % of Expense
                                        <i className="th-sort">
                                            <img
                                              src="../images/sort-icon.svg"
                                              alt="SortIcon"
                                            />
                                          </i>
                                        </th>

                                        }
                                        {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                          <th className="text-right" >
                                            Amount Change
                                          <i className="th-sort">
                                              <img
                                                src="../images/sort-icon.svg"
                                                alt="SortIcon"
                                              />
                                            </i><td>{""}</td>
                                          </th>
                                        }
                                        {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                          <th className="text-right" >
                                            % Change
                                          <i className="th-sort">
                                              <img
                                                src="../images/sort-icon.svg"
                                                alt="SortIcon"
                                              />
                                            </i>
                                          </th>
                                        }

                                        {/* added based on frontend filter */}
                                      </>
                                    );
                                  }
                                )
                              }




                            </tr>
                          </thead>
                          <tbody>
                            {
                              console.log("2222", this.state.detailsArray)
                              //  console.log('2222a',Object.values( this.state.reportObject.details))
                            }
                            {this.state.detailsArray &&
                              this.state.detailsArray.length > 0 &&
                              this.state.detailsArray.map((details, index) => {
                                if (details.account_type == "Income") {
                                  return (
                                    <React.Fragment key={index}>
                                      <tr className="title-1">
                                        <td
                                          style={{
                                            position: "sticky",
                                            left: "0.25rem",backgroundColor: "#EFEFFF"
                                          }}
                                        >
                                          {details.account_type}
                                        </td>
                                        {details.amount_array.map((item, index) => {
                                          return (<>
                                            <td className="text-right"></td>


                                            {this.state.row && <td>{""}</td>}
                                            {this.state.column && <td>{""}</td>}
                                            {this.state.income && <td>{""}</td>}
                                            {this.state.expense && <td>{""}</td>}
                                            {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                              <td>{""}</td>
                                            }
                                            {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                              <td>{""}</td>
                                            }
                                            {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                              <td>{""}</td>
                                            }
                                            {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                              <td>{""}</td>
                                            }
                                            {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                              <td>{""}</td>
                                            }


                                          </>
                                          );
                                        })}
                                      </tr>

                                      {details.total_amount !== 0 &&
                                        details.sub_categories &&
                                        details.sub_categories.length > 0 &&
                                        this.repeat(details.sub_categories, 15)}

                                      <tr className="item-step1 title1 bdr-no">
                                        <td>
                                          <span>
                                            Total {details.account_type}
                                          </span>
                                        </td>
                                        {details.amount_array &&
                                          details.amount_array.map(
                                            (total, i) => {



                                              // % row 
                                              let first_value = total
                                              let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                              let row

                                              if (first_value == 0 && second_value != 0) {
                                                row = 0.00
                                              } else if (first_value != 0 && second_value == 0) {
                                                row = 100.00
                                              } else if (first_value == 0 && second_value == 0) {
                                                row = 0.00
                                              } else {

                                                row = (first_value / second_value) * 100
                                              }
                                              // % row 

                                              // % column

                                              let first_value_col = total

                                              let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                              let column

                                              if (first_value_col == 0 && second_value_col != 0) {
                                                column = 0.00
                                              } else if (first_value_col != 0 && second_value_col == 0) {
                                                column = 100.00
                                              } else if (first_value_col == 0 && second_value_col == 0) {
                                                column = 0.00
                                              } else {

                                                column = (first_value_col / second_value_col) * 100
                                              }

                                              // % column

                                              // % income

                                              let first_value_inc = total
                                              let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                              let income

                                              if (first_value_inc == 0 && second_value_inc != 0) {
                                                income = 0.00
                                              } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                income = 100.00
                                              } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                income = 0.00
                                              } else {
                                                income = (first_value_inc / second_value_inc) * 100
                                              }

                                              // % income

                                              // % expense

                                              let first_value_exp = total
                                              let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                              let expense

                                              if (first_value_exp == 0 && second_value_exp != 0) {
                                                expense = 0.00
                                              } else if (first_value_exp != 0 && second_value_exp == 0) {
                                                expense = 100.00
                                              } else if (first_value_exp == 0 && second_value_exp == 0) {
                                                expense = 0.00
                                              } else {
                                                expense = (first_value_exp / second_value_exp) * 100
                                              }

                                              // % expense

                                              // Amount change
                                              let change
                                              if ((i + 1) % 2 == 0) {
                                                change = details.amount_array[i - 1] - details.amount_array[i]
                                              }
                                              // Amount change


                                              // % change
                                              let per_change
                                              if ((i + 1) % 2 == 0) {

                                                let first_value_per = change
                                                let second_value_per = details.amount_array[i]


                                                if (first_value_per == 0 && second_value_per != 0) {
                                                  per_change = 0.00
                                                } else if (first_value_per != 0 && second_value_per == 0) {
                                                  per_change = 100.00
                                                } else if (first_value_per == 0 && second_value_per == 0) {
                                                  per_change = 0.00
                                                } else {
                                                  per_change = (first_value_per / second_value_per) * 100
                                                }

                                              }
                                              // % change




                                              return (<>
                                                <td
                                                  className="text-right"
                                                  onDoubleClick={() => {
                                                    this.mainIncome(
                                                      details.account_type_id
                                                    );
                                                  }}
                                                >
                                                  <span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                                    {/* {total.toFixed(2)} */}
                                                  </span>
                                                </td>

                                                {this.state.row && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.column && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.income && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.expense && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                  <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                  <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }



                                              </>
                                              );
                                            }
                                          )}
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              })}

                            {this.state.detailsArray &&
                              this.state.detailsArray.length > 0 &&
                              this.state.detailsArray.map((details, index) => {
                                if (
                                  details.account_type == "Cost of goods sold"
                                ) {
                                  return (
                                    <React.Fragment key={index}>
                                      <tr className="title-1">
                                        <td
                                          style={{
                                            position: "sticky",
                                            left: "0.25rem",backgroundColor: "#EFEFFF"
                                          }}
                                        >
                                          {details.account_type}
                                        </td>
                                        {details.amount_array.map((item, index) => {
                                          return (
                                            <>
                                              <td className="text-right"></td>

                                              {this.state.row && <td>{""}</td>}
                                              {this.state.column && <td>{""}</td>}
                                              {this.state.income && <td>{""}</td>}
                                              {this.state.expense && <td>{""}</td>}
                                              {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                <td>{""}</td>
                                              }
                                              {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                <td>{""}</td>
                                              }
                                              {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                <td>{""}</td>
                                              }
                                              {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                <td>{""}</td>
                                              }
                                              {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                <td>{""}</td>
                                              }

                                            </>
                                          );
                                        })}
                                      </tr>

                                      {details.total_amount !== 0 &&
                                        details.sub_categories &&
                                        details.sub_categories.length > 0 &&
                                        this.repeat(details.sub_categories, 15)}

                                      <tr className="item-step1 title1 bdr-no">
                                        <td>
                                          <span>
                                            Total {details.account_type}
                                          </span>
                                        </td>
                                        {details.amount_array &&
                                          details.amount_array.map(
                                            (total, i) => {


                                              // % row 
                                              let first_value = total
                                              let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                              let row

                                              if (first_value == 0 && second_value != 0) {
                                                row = 0.00
                                              } else if (first_value != 0 && second_value == 0) {
                                                row = 100.00
                                              } else if (first_value == 0 && second_value == 0) {
                                                row = 0.00
                                              } else {

                                                row = (first_value / second_value) * 100
                                              }
                                              // % row 

                                              // % column

                                              let first_value_col = total

                                              let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                              let column

                                              if (first_value_col == 0 && second_value_col != 0) {
                                                column = 0.00
                                              } else if (first_value_col != 0 && second_value_col == 0) {
                                                column = 100.00
                                              } else if (first_value_col == 0 && second_value_col == 0) {
                                                column = 0.00
                                              } else {

                                                column = (first_value_col / second_value_col) * 100
                                              }

                                              // % column

                                              // % income

                                              let first_value_inc = total
                                              let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                              let income

                                              if (first_value_inc == 0 && second_value_inc != 0) {
                                                income = 0.00
                                              } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                income = 100.00
                                              } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                income = 0.00
                                              } else {
                                                income = (first_value_inc / second_value_inc) * 100
                                              }

                                              // % income

                                              // % expense

                                              let first_value_exp = total
                                              let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                              let expense

                                              if (first_value_exp == 0 && second_value_exp != 0) {
                                                expense = 0.00
                                              } else if (first_value_exp != 0 && second_value_exp == 0) {
                                                expense = 100.00
                                              } else if (first_value_exp == 0 && second_value_exp == 0) {
                                                expense = 0.00
                                              } else {
                                                expense = (first_value_exp / second_value_exp) * 100
                                              }

                                              // % expense

                                              // Amount change
                                              let change
                                              if ((i + 1) % 2 == 0) {
                                                change = details.amount_array[i - 1] - details.amount_array[i]
                                              }
                                              // Amount change


                                              // % change
                                              let per_change
                                              if ((i + 1) % 2 == 0) {

                                                let first_value_per = change
                                                let second_value_per = details.amount_array[i]


                                                if (first_value_per == 0 && second_value_per != 0) {
                                                  per_change = 0.00
                                                } else if (first_value_per != 0 && second_value_per == 0) {
                                                  per_change = 100.00
                                                } else if (first_value_per == 0 && second_value_per == 0) {
                                                  per_change = 0.00
                                                } else {
                                                  per_change = (first_value_per / second_value_per) * 100
                                                }

                                              }
                                              // % change


                                              return (
                                                <>
                                                  <td
                                                    className="text-right"
                                                    onDoubleClick={() => {
                                                      this.mainIncome(
                                                        details.account_type_id
                                                      );
                                                    }}
                                                  >
                                                    <span>
                                                      {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                        { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                                      {/* {total.toFixed(2)} */}
                                                    </span>
                                                  </td>

                                                  {this.state.row && <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>}
                                                  {this.state.column && <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>}
                                                  {this.state.income && <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>}
                                                  {this.state.expense && <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>}
                                                  {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                    <td className="text-right" ><span>
                                                      {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                        { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                                    </span> </td>
                                                  }
                                                  {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                    <td className="text-right" ><span>
                                                      {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                        { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                                    </span> </td>
                                                  }
                                                  {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                    <td className="text-right" ><span>000</span> </td>
                                                  }
                                                  {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                    <td className="text-right" ><span>000</span> </td>
                                                  }
                                                  {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                    <td className="text-right" ><span>000</span> </td>
                                                  }

                                                </>
                                              );
                                            }
                                          )}
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              })}

                            {Object.keys(this.state.reportObject).length !==
                              0 && (
                                <tr className="item-step1 title1 bdr-no">
                                  <td>
                                    <span>Gross profit / (loss)</span>
                                  </td>
                                  {this.state.reportObject.gross_profit_array &&
                                    this.state.reportObject.gross_profit_array.map(
                                      (total, i) => {

                                        // % row 
                                        let first_value = total
                                        let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                        let row

                                        if (first_value == 0 && second_value != 0) {
                                          row = 0.00
                                        } else if (first_value != 0 && second_value == 0) {
                                          row = 100.00
                                        } else if (first_value == 0 && second_value == 0) {
                                          row = 0.00
                                        } else {

                                          row = (first_value / second_value) * 100
                                        }
                                        // % row 

                                        // % column

                                        let first_value_col = total

                                        let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                        let column

                                        if (first_value_col == 0 && second_value_col != 0) {
                                          column = 0.00
                                        } else if (first_value_col != 0 && second_value_col == 0) {
                                          column = 100.00
                                        } else if (first_value_col == 0 && second_value_col == 0) {
                                          column = 0.00
                                        } else {

                                          column = (first_value_col / second_value_col) * 100
                                        }

                                        // % column

                                        // % income

                                        let first_value_inc = total
                                        let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                        let income

                                        if (first_value_inc == 0 && second_value_inc != 0) {
                                          income = 0.00
                                        } else if (first_value_inc != 0 && second_value_inc == 0) {
                                          income = 100.00
                                        } else if (first_value_inc == 0 && second_value_inc == 0) {
                                          income = 0.00
                                        } else {
                                          income = (first_value_inc / second_value_inc) * 100
                                        }

                                        // % income

                                        // % expense

                                        let first_value_exp = total
                                        let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                        let expense

                                        if (first_value_exp == 0 && second_value_exp != 0) {
                                          expense = 0.00
                                        } else if (first_value_exp != 0 && second_value_exp == 0) {
                                          expense = 100.00
                                        } else if (first_value_exp == 0 && second_value_exp == 0) {
                                          expense = 0.00
                                        } else {
                                          expense = (first_value_exp / second_value_exp) * 100
                                        }

                                        // % expense

                                        // Amount change
                                        let change
                                        if ((i + 1) % 2 == 0) {
                                          change = this.state.reportObject.gross_profit_array[i - 1] - this.state.reportObject.gross_profit_array[i]
                                        }
                                        // Amount change


                                        // % change
                                        let per_change
                                        if ((i + 1) % 2 == 0) {

                                          let first_value_per = change
                                          let second_value_per = this.state.reportObject.gross_profit_array[i]


                                          if (first_value_per == 0 && second_value_per != 0) {
                                            per_change = 0.00
                                          } else if (first_value_per != 0 && second_value_per == 0) {
                                            per_change = 100.00
                                          } else if (first_value_per == 0 && second_value_per == 0) {
                                            per_change = 0.00
                                          } else {
                                            per_change = (first_value_per / second_value_per) * 100
                                          }

                                        }
                                        // % change



                                        return (
                                          <>
                                            <td
                                              className="text-right"
                                              onDoubleClick={() => {
                                                this.goToBreak("gross_profit");
                                              }}
                                            >
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                                {/* {total.toFixed(2)} */}
                                              </span>
                                            </td>


                                            {this.state.row && <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>}
                                            {this.state.column && <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>}
                                            {this.state.income && <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>}
                                            {this.state.expense && <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>}
                                            {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                              <td className="text-right" ><span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                              </span> </td>
                                            }
                                            {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                              <td className="text-right" ><span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                              </span> </td>
                                            }
                                            {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                              <td className="text-right" ><span>000</span> </td>
                                            }
                                            {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                              <td className="text-right" ><span>000</span> </td>
                                            }
                                            {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                              <td className="text-right" ><span>000</span> </td>
                                            }


                                          </>
                                        );
                                      }
                                    )}
                                ;
                                </tr>
                              )}

                            {this.state.detailsArray &&
                              this.state.detailsArray.length > 0 &&
                              this.state.detailsArray.map((details, index) => {
                                if (details.account_type == "Other income") {
                                  return (
                                    <React.Fragment key={index}>
                                      <tr className="title-1">
                                        <td
                                          style={{
                                            position: "sticky",
                                            left: "0.25rem",backgroundColor: "#EFEFFF"
                                          }}
                                        >
                                          {details.account_type}
                                        </td>
                                        {details.amount_array.map((item, j) => {
                                          return (
                                            <>
                                              <td className="text-right"></td>
                                              {this.state.row && <td>{""}</td>}
                                              {this.state.column && <td>{""}</td>}
                                              {this.state.income && <td>{""}</td>}
                                              {this.state.expense && <td>{""}</td>}
                                              {(j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                <td>{""}</td>
                                              }
                                              {(j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                <td>{""}</td>
                                              }
                                              {(j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                <td>{""}</td>
                                              }
                                              {(j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                <td>{""}</td>
                                              }
                                              {(j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                <td>{""}</td>
                                              }
                                            </>);
                                        })}
                                      </tr>

                                      {details.total_amount !== 0 &&
                                        details.sub_categories &&
                                        details.sub_categories.length > 0 &&
                                        this.repeat(details.sub_categories, 15)}

                                      <tr className="item-step1 title1 bdr-no">
                                        <td>
                                          <span>
                                            Total {details.account_type}
                                          </span>
                                        </td>
                                        {details.amount_array &&
                                          details.amount_array.map(
                                            (total, i) => {


                                              // % row 
                                              let first_value = total
                                              let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                              let row

                                              if (first_value == 0 && second_value != 0) {
                                                row = 0.00
                                              } else if (first_value != 0 && second_value == 0) {
                                                row = 100.00
                                              } else if (first_value == 0 && second_value == 0) {
                                                row = 0.00
                                              } else {

                                                row = (first_value / second_value) * 100
                                              }
                                              // % row 

                                              // % column

                                              let first_value_col = total

                                              let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                              let column

                                              if (first_value_col == 0 && second_value_col != 0) {
                                                column = 0.00
                                              } else if (first_value_col != 0 && second_value_col == 0) {
                                                column = 100.00
                                              } else if (first_value_col == 0 && second_value_col == 0) {
                                                column = 0.00
                                              } else {

                                                column = (first_value_col / second_value_col) * 100
                                              }

                                              // % column

                                              // % income

                                              let first_value_inc = total
                                              let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                              let income

                                              if (first_value_inc == 0 && second_value_inc != 0) {
                                                income = 0.00
                                              } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                income = 100.00
                                              } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                income = 0.00
                                              } else {
                                                income = (first_value_inc / second_value_inc) * 100
                                              }

                                              // % income

                                              // % expense

                                              let first_value_exp = total
                                              let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                              let expense

                                              if (first_value_exp == 0 && second_value_exp != 0) {
                                                expense = 0.00
                                              } else if (first_value_exp != 0 && second_value_exp == 0) {
                                                expense = 100.00
                                              } else if (first_value_exp == 0 && second_value_exp == 0) {
                                                expense = 0.00
                                              } else {
                                                expense = (first_value_exp / second_value_exp) * 100
                                              }

                                              // % expense

                                              // Amount change
                                              let change
                                              if ((i + 1) % 2 == 0) {
                                                change = details.amount_array[i - 1] - details.amount_array[i]
                                              }
                                              // Amount change


                                              // % change
                                              let per_change
                                              if ((i + 1) % 2 == 0) {

                                                let first_value_per = change
                                                let second_value_per = details.amount_array[i]


                                                if (first_value_per == 0 && second_value_per != 0) {
                                                  per_change = 0.00
                                                } else if (first_value_per != 0 && second_value_per == 0) {
                                                  per_change = 100.00
                                                } else if (first_value_per == 0 && second_value_per == 0) {
                                                  per_change = 0.00
                                                } else {
                                                  per_change = (first_value_per / second_value_per) * 100
                                                }

                                              }
                                              // % change



                                              return (<>
                                                <td
                                                  className="text-right"
                                                  onDoubleClick={() => {
                                                    this.mainIncome(
                                                      details.account_type_id
                                                    );
                                                  }}
                                                >
                                                  <span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                                    {/* {total.toFixed(2)} */}
                                                  </span>
                                                </td>


                                                {this.state.row && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.column && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.income && <td className="text-right" > <span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.expense && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                  <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                  <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }



                                              </>
                                              );
                                            }
                                          )}
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              })}

                            {Object.keys(this.state.reportObject).length !==
                              0 && (
                                <tr className="item-step1 title1 bdr-no">
                                  <td>
                                    <span>Total operating income</span>
                                  </td>
                                  {this.state.reportObject
                                    .total_operating_income_array &&
                                    this.state.reportObject.total_operating_income_array.map(
                                      (total, i) => {


                                        // % row 
                                        let first_value = total
                                        let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                        let row

                                        if (first_value == 0 && second_value != 0) {
                                          row = 0.00
                                        } else if (first_value != 0 && second_value == 0) {
                                          row = 100.00
                                        } else if (first_value == 0 && second_value == 0) {
                                          row = 0.00
                                        } else {

                                          row = (first_value / second_value) * 100
                                        }
                                        // % row 

                                        // % column

                                        let first_value_col = total

                                        let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                        let column

                                        if (first_value_col == 0 && second_value_col != 0) {
                                          column = 0.00
                                        } else if (first_value_col != 0 && second_value_col == 0) {
                                          column = 100.00
                                        } else if (first_value_col == 0 && second_value_col == 0) {
                                          column = 0.00
                                        } else {

                                          column = (first_value_col / second_value_col) * 100
                                        }

                                        // % column

                                        // % income

                                        let first_value_inc = total
                                        let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                        let income

                                        if (first_value_inc == 0 && second_value_inc != 0) {
                                          income = 0.00
                                        } else if (first_value_inc != 0 && second_value_inc == 0) {
                                          income = 100.00
                                        } else if (first_value_inc == 0 && second_value_inc == 0) {
                                          income = 0.00
                                        } else {
                                          income = (first_value_inc / second_value_inc) * 100
                                        }

                                        // % income

                                        // % expense

                                        let first_value_exp = total
                                        let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                        let expense

                                        if (first_value_exp == 0 && second_value_exp != 0) {
                                          expense = 0.00
                                        } else if (first_value_exp != 0 && second_value_exp == 0) {
                                          expense = 100.00
                                        } else if (first_value_exp == 0 && second_value_exp == 0) {
                                          expense = 0.00
                                        } else {
                                          expense = (first_value_exp / second_value_exp) * 100
                                        }

                                        // % expense

                                        // Amount change
                                        let change
                                        if ((i + 1) % 2 == 0) {
                                          change = this.state.reportObject.total_operating_income_array[i - 1] - this.state.reportObject.total_operating_income_array[i]
                                        }
                                        // Amount change


                                        // % change
                                        let per_change
                                        if ((i + 1) % 2 == 0) {

                                          let first_value_per = change
                                          let second_value_per = this.state.reportObject.total_operating_income_array[i]


                                          if (first_value_per == 0 && second_value_per != 0) {
                                            per_change = 0.00
                                          } else if (first_value_per != 0 && second_value_per == 0) {
                                            per_change = 100.00
                                          } else if (first_value_per == 0 && second_value_per == 0) {
                                            per_change = 0.00
                                          } else {
                                            per_change = (first_value_per / second_value_per) * 100
                                          }

                                        }
                                        // % change



                                        return (<>
                                          <td
                                            className="text-right"
                                            onDoubleClick={() => {
                                              this.goToBreak("operating_income");
                                            }}
                                          >
                                            <span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                              {/* {total.toFixed(2)} */}
                                            </span>
                                          </td>

                                          {this.state.row && <td className="text-right" ><span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                          </span> </td>}
                                          {this.state.column && <td className="text-right" ><span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                          </span> </td>}
                                          {this.state.income && <td className="text-right" > <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                          </span> </td>}
                                          {this.state.expense && <td className="text-right" ><span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                          </span> </td>}
                                          {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                            <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>
                                          }
                                          {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                            <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>
                                          }
                                          {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                            <td className="text-right" ><span>000</span> </td>
                                          }
                                          {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                            <td className="text-right" ><span>000</span> </td>
                                          }
                                          {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                            <td className="text-right" ><span>000</span> </td>
                                          }

                                        </>
                                        );
                                      }
                                    )}
                                </tr>
                              )}

                            {this.state.detailsArray &&
                              this.state.detailsArray.length > 0 &&
                              this.state.detailsArray.map((details, index) => {
                                if (details.account_type == "Expenses") {
                                  return (
                                    <React.Fragment key={index}>
                                      <tr className="title-1">
                                        <td
                                          style={{
                                            position: "sticky",
                                            left: "0.25rem",backgroundColor: "#EFEFFF"
                                          }}
                                        >
                                          {details.account_type}
                                        </td>
                                        {details.amount_array.map((item, j) => {
                                          return (<>
                                            <td className="text-right"></td>
                                            {this.state.row && <td>{""}</td>}
                                            {this.state.column && <td>{""}</td>}
                                            {this.state.income && <td>{""}</td>}
                                            {this.state.expense && <td>{""}</td>}
                                            {(j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                              <td>{""}</td>
                                            }
                                            {(j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                              <td>{""}</td>
                                            }
                                            {(j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                              <td>{""}</td>
                                            }
                                            {(j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                              <td>{""}</td>
                                            }
                                            {(j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                              <td>{""}</td>
                                            }
                                          </>);
                                        })}
                                      </tr>

                                      {details.total_amount !== 0 &&
                                        details.sub_categories &&
                                        details.sub_categories.length > 0 &&
                                        this.repeat(details.sub_categories, 15)}

                                      <tr className="item-step1 title1 bdr-no">
                                        <td>
                                          <span>
                                            Total {details.account_type}
                                          </span>
                                        </td>
                                        {details.amount_array &&
                                          details.amount_array.map(
                                            (total, i) => {



                                              // % row 
                                              let first_value = total
                                              let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                              let row

                                              if (first_value == 0 && second_value != 0) {
                                                row = 0.00
                                              } else if (first_value != 0 && second_value == 0) {
                                                row = 100.00
                                              } else if (first_value == 0 && second_value == 0) {
                                                row = 0.00
                                              } else {

                                                row = (first_value / second_value) * 100
                                              }
                                              // % row 

                                              // % column

                                              let first_value_col = total

                                              let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                              let column

                                              if (first_value_col == 0 && second_value_col != 0) {
                                                column = 0.00
                                              } else if (first_value_col != 0 && second_value_col == 0) {
                                                column = 100.00
                                              } else if (first_value_col == 0 && second_value_col == 0) {
                                                column = 0.00
                                              } else {

                                                column = (first_value_col / second_value_col) * 100
                                              }

                                              // % column

                                              // % income

                                              let first_value_inc = total
                                              let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                              let income

                                              if (first_value_inc == 0 && second_value_inc != 0) {
                                                income = 0.00
                                              } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                income = 100.00
                                              } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                income = 0.00
                                              } else {
                                                income = (first_value_inc / second_value_inc) * 100
                                              }

                                              // % income

                                              // % expense

                                              let first_value_exp = total
                                              let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                              let expense

                                              if (first_value_exp == 0 && second_value_exp != 0) {
                                                expense = 0.00
                                              } else if (first_value_exp != 0 && second_value_exp == 0) {
                                                expense = 100.00
                                              } else if (first_value_exp == 0 && second_value_exp == 0) {
                                                expense = 0.00
                                              } else {
                                                expense = (first_value_exp / second_value_exp) * 100
                                              }

                                              // % expense

                                              // Amount change
                                              let change
                                              if ((i + 1) % 2 == 0) {
                                                change = details.amount_array[i - 1] - details.amount_array[i]
                                              }
                                              // Amount change


                                              // % change
                                              let per_change
                                              if ((i + 1) % 2 == 0) {

                                                let first_value_per = change
                                                let second_value_per = details.amount_array[i]


                                                if (first_value_per == 0 && second_value_per != 0) {
                                                  per_change = 0.00
                                                } else if (first_value_per != 0 && second_value_per == 0) {
                                                  per_change = 100.00
                                                } else if (first_value_per == 0 && second_value_per == 0) {
                                                  per_change = 0.00
                                                } else {
                                                  per_change = (first_value_per / second_value_per) * 100
                                                }

                                              }
                                              // % change



                                              return (<>
                                                <td
                                                  className="text-right"
                                                  onDoubleClick={() => {
                                                    this.mainIncome(
                                                      details.account_type_id
                                                    );
                                                  }}
                                                >
                                                  <span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                                    {/* {total.toFixed(2)} */}
                                                  </span>
                                                </td>


                                                {this.state.row && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.column && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.income && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {this.state.expense && <td className="text-right" ><span>
                                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                    { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                                </span> </td>}
                                                {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                  <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                  <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }
                                                {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                  <td className="text-right" ><span>000</span> </td>
                                                }



                                              </>);
                                            }
                                          )}
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              })}

                            {Object.keys(this.state.reportObject).length !==
                              0 && (
                                <tr className="item-step1 title1 bdr-no">
                                  <td>
                                    <span>Total operating profit</span>
                                  </td>

                                  {this.state.reportObject.totaloperatingprofit &&
                                    this.state.reportObject.totaloperatingprofit.map(
                                      (total, i) => {


                                        // % row 
                                        let first_value = total
                                        let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                        let row

                                        if (first_value == 0 && second_value != 0) {
                                          row = 0.00
                                        } else if (first_value != 0 && second_value == 0) {
                                          row = 100.00
                                        } else if (first_value == 0 && second_value == 0) {
                                          row = 0.00
                                        } else {

                                          row = (first_value / second_value) * 100
                                        }
                                        // % row 

                                        // % column

                                        let first_value_col = total

                                        let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                        let column

                                        if (first_value_col == 0 && second_value_col != 0) {
                                          column = 0.00
                                        } else if (first_value_col != 0 && second_value_col == 0) {
                                          column = 100.00
                                        } else if (first_value_col == 0 && second_value_col == 0) {
                                          column = 0.00
                                        } else {

                                          column = (first_value_col / second_value_col) * 100
                                        }

                                        // % column

                                        // % income

                                        let first_value_inc = total
                                        let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                        let income

                                        if (first_value_inc == 0 && second_value_inc != 0) {
                                          income = 0.00
                                        } else if (first_value_inc != 0 && second_value_inc == 0) {
                                          income = 100.00
                                        } else if (first_value_inc == 0 && second_value_inc == 0) {
                                          income = 0.00
                                        } else {
                                          income = (first_value_inc / second_value_inc) * 100
                                        }

                                        // % income

                                        // % expense

                                        let first_value_exp = total
                                        let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                        let expense

                                        if (first_value_exp == 0 && second_value_exp != 0) {
                                          expense = 0.00
                                        } else if (first_value_exp != 0 && second_value_exp == 0) {
                                          expense = 100.00
                                        } else if (first_value_exp == 0 && second_value_exp == 0) {
                                          expense = 0.00
                                        } else {
                                          expense = (first_value_exp / second_value_exp) * 100
                                        }

                                        // % expense

                                        // Amount change
                                        let change
                                        if ((i + 1) % 2 == 0) {
                                          change = this.state.reportObject.totaloperatingprofit[i - 1] - this.state.reportObject.totaloperatingprofit[i]
                                        }
                                        // Amount change


                                        // % change
                                        let per_change
                                        if ((i + 1) % 2 == 0) {

                                          let first_value_per = change
                                          let second_value_per = this.state.reportObject.totaloperatingprofit[i]


                                          if (first_value_per == 0 && second_value_per != 0) {
                                            per_change = 0.00
                                          } else if (first_value_per != 0 && second_value_per == 0) {
                                            per_change = 100.00
                                          } else if (first_value_per == 0 && second_value_per == 0) {
                                            per_change = 0.00
                                          } else {
                                            per_change = (first_value_per / second_value_per) * 100
                                          }

                                        }
                                        // % change



                                        return (<>
                                          <td
                                            className="text-right"
                                            onDoubleClick={() => {
                                              this.goToBreak("operating_profit");
                                            }}
                                          >
                                            <span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                              {/* {total.toFixed(2)} */}
                                            </span>
                                          </td>

                                          {this.state.row && <td className="text-right" ><span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                          </span> </td>}
                                          {this.state.column && <td className="text-right" ><span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                          </span> </td>}
                                          {this.state.income && <td className="text-right" ><span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                          </span> </td>}
                                          {this.state.expense && <td className="text-right" ><span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                          </span> </td>}
                                          {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                            <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>
                                          }
                                          {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                            <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>
                                          }
                                          {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                            <td className="text-right" ><span>000</span> </td>
                                          }
                                          {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                            <td className="text-right" ><span>000</span> </td>
                                          }
                                          {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                            <td className="text-right" ><span>000</span> </td>
                                          }

                                        </>
                                        );
                                      }
                                    )}
                                </tr>
                              )}

                            {this.state.detailsArray &&
                              this.state.detailsArray.length > 0 &&
                              this.state.detailsArray.map((details, index) => {
                                if (details.account_type == "Other expenses") {
                                  return (
                                    <React.Fragment key={index}>
                                      <tr className="title-1">
                                        <td
                                          style={{
                                            position: "sticky",
                                            left: "0.25rem",backgroundColor: "#EFEFFF"
                                          }}
                                        >
                                          {details.account_type}
                                        </td>
                                        {details.amount_array.map((item, j) => {
                                          return (<>
                                            <td className="text-right"></td>

                                            {this.state.row && <td>{""}</td>}
                                            {this.state.column && <td>{""}</td>}
                                            {this.state.income && <td>{""}</td>}
                                            {this.state.expense && <td>{""}</td>}
                                            {(j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                              <td>{""}</td>
                                            }
                                            {(j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                              <td>{""}</td>
                                            }
                                            {(j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                              <td>{""}</td>
                                            }
                                            {(j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                              <td>{""}</td>
                                            }
                                            {(j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                              <td>{""}</td>
                                            }

                                          </>);
                                        })}
                                      </tr>

                                      {details.total_amount !== 0 &&
                                        details.sub_categories &&
                                        details.sub_categories.length > 0 &&
                                        this.repeat(details.sub_categories, 15)}

                                      <tr className="item-step1 title1 bdr-no">
                                        <td>
                                          <span>
                                            Total {details.account_type}
                                          </span>
                                        </td>
                                        {details.amount_array &&
                                          details.amount_array.map(
                                            (total, i) => {



                                              // % row 
                                              let first_value = total
                                              let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                              let row

                                              if (first_value == 0 && second_value != 0) {
                                                row = 0.00
                                              } else if (first_value != 0 && second_value == 0) {
                                                row = 100.00
                                              } else if (first_value == 0 && second_value == 0) {
                                                row = 0.00
                                              } else {

                                                row = (first_value / second_value) * 100
                                              }
                                              // % row 

                                              // % column

                                              let first_value_col = total

                                              let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                              let column

                                              if (first_value_col == 0 && second_value_col != 0) {
                                                column = 0.00
                                              } else if (first_value_col != 0 && second_value_col == 0) {
                                                column = 100.00
                                              } else if (first_value_col == 0 && second_value_col == 0) {
                                                column = 0.00
                                              } else {

                                                column = (first_value_col / second_value_col) * 100
                                              }

                                              // % column

                                              // % income

                                              let first_value_inc = total
                                              let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                              let income

                                              if (first_value_inc == 0 && second_value_inc != 0) {
                                                income = 0.00
                                              } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                income = 100.00
                                              } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                income = 0.00
                                              } else {
                                                income = (first_value_inc / second_value_inc) * 100
                                              }

                                              // % income

                                              // % expense

                                              let first_value_exp = total
                                              let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                              let expense

                                              if (first_value_exp == 0 && second_value_exp != 0) {
                                                expense = 0.00
                                              } else if (first_value_exp != 0 && second_value_exp == 0) {
                                                expense = 100.00
                                              } else if (first_value_exp == 0 && second_value_exp == 0) {
                                                expense = 0.00
                                              } else {
                                                expense = (first_value_exp / second_value_exp) * 100
                                              }

                                              // % expense

                                              // Amount change
                                              let change
                                              if ((i + 1) % 2 == 0) {
                                                change = details.amount_array[i - 1] - details.amount_array[i]
                                              }
                                              // Amount change


                                              // % change
                                              let per_change
                                              if ((i + 1) % 2 == 0) {

                                                let first_value_per = change
                                                let second_value_per = details.amount_array[i]


                                                if (first_value_per == 0 && second_value_per != 0) {
                                                  per_change = 0.00
                                                } else if (first_value_per != 0 && second_value_per == 0) {
                                                  per_change = 100.00
                                                } else if (first_value_per == 0 && second_value_per == 0) {
                                                  per_change = 0.00
                                                } else {
                                                  per_change = (first_value_per / second_value_per) * 100
                                                }

                                              }
                                              // % change



                                              return (
                                                <>
                                                  <td
                                                    className="text-right"
                                                    onDoubleClick={() => {
                                                      this.mainIncome(
                                                        details.account_type_id
                                                      );
                                                    }}
                                                  >
                                                    <span>
                                                      {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                        { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                                      {/* {total.toFixed(2)} */}
                                                    </span>
                                                  </td>

                                                  {this.state.row && <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>}
                                                  {this.state.column && <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>}
                                                  {this.state.income && <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>}
                                                  {this.state.expense && <td className="text-right" ><span>
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                                  </span> </td>}
                                                  {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                    <td className="text-right" ><span>
                                                      {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                        { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                                    </span> </td>
                                                  }
                                                  {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                    <td className="text-right" ><span>
                                                      {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                        { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                                    </span> </td>
                                                  }
                                                  {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                    <td className="text-right" ><span>000</span> </td>
                                                  }
                                                  {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                    <td className="text-right" ><span>000</span> </td>
                                                  }
                                                  {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                    <td className="text-right" ><span>000</span> </td>
                                                  }

                                                </>
                                              );
                                            }
                                          )}
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              })}

                            {Object.keys(this.state.reportObject).length !==
                              0 && (
                                <tr className="item-step1 title1 bdr-no">
                                  <td>
                                    <span>Net income</span>
                                  </td>
                                  {this.state.reportObject.net_profit_array &&
                                    this.state.reportObject.net_profit_array.map(
                                      (total, i) => {



                                        // % row 
                                        let first_value = total
                                        let second_value = this.state.reportObject.gross_profit_array ? Number(this.state.reportObject.gross_profit_array[i]) : 0

                                        let row

                                        if (first_value == 0 && second_value != 0) {
                                          row = 0.00
                                        } else if (first_value != 0 && second_value == 0) {
                                          row = 100.00
                                        } else if (first_value == 0 && second_value == 0) {
                                          row = 0.00
                                        } else {

                                          row = (first_value / second_value) * 100
                                        }
                                        // % row 

                                        // % column

                                        let first_value_col = total

                                        let second_value_col = this.state.reportObject.net_profit_array ? Number(this.state.reportObject.net_profit_array[i]) : 0
                                        let column

                                        if (first_value_col == 0 && second_value_col != 0) {
                                          column = 0.00
                                        } else if (first_value_col != 0 && second_value_col == 0) {
                                          column = 100.00
                                        } else if (first_value_col == 0 && second_value_col == 0) {
                                          column = 0.00
                                        } else {

                                          column = (first_value_col / second_value_col) * 100
                                        }

                                        // % column

                                        // % income

                                        let first_value_inc = total
                                        let second_value_inc = this.state.reportObject.income_array ? Number(this.state.reportObject.income_array[i]) : 0
                                        let income

                                        if (first_value_inc == 0 && second_value_inc != 0) {
                                          income = 0.00
                                        } else if (first_value_inc != 0 && second_value_inc == 0) {
                                          income = 100.00
                                        } else if (first_value_inc == 0 && second_value_inc == 0) {
                                          income = 0.00
                                        } else {
                                          income = (first_value_inc / second_value_inc) * 100
                                        }

                                        // % income

                                        // % expense

                                        let first_value_exp = total
                                        let second_value_exp = this.state.reportObject.expenses_array ? Number(this.state.reportObject.expenses_array[i]) : 0
                                        let expense

                                        if (first_value_exp == 0 && second_value_exp != 0) {
                                          expense = 0.00
                                        } else if (first_value_exp != 0 && second_value_exp == 0) {
                                          expense = 100.00
                                        } else if (first_value_exp == 0 && second_value_exp == 0) {
                                          expense = 0.00
                                        } else {
                                          expense = (first_value_exp / second_value_exp) * 100
                                        }

                                        // % expense

                                        // Amount change
                                        let change
                                        if ((i + 1) % 2 == 0) {
                                          change = this.state.reportObject.net_profit_array[i - 1] - this.state.reportObject.net_profit_array[i]
                                        }
                                        // Amount change


                                        // % change
                                        let per_change
                                        if ((i + 1) % 2 == 0) {

                                          let first_value_per = change
                                          let second_value_per = this.state.reportObject.net_profit_array[i]


                                          if (first_value_per == 0 && second_value_per != 0) {
                                            per_change = 0.00
                                          } else if (first_value_per != 0 && second_value_per == 0) {
                                            per_change = 100.00
                                          } else if (first_value_per == 0 && second_value_per == 0) {
                                            per_change = 0.00
                                          } else {
                                            per_change = (first_value_per / second_value_per) * 100
                                          }

                                        }
                                        // % change




                                        console.log(this.state.reportObject);
                                        return (
                                          <>
                                            <td
                                              className="text-right"
                                              onDoubleClick={() => {
                                                this.goToBreak("net_profit");
                                              }}
                                            >
                                              <span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}
                                                {/* {total.toFixed(2)} */}
                                              </span>
                                            </td>

                                            {this.state.row && <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(row)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>}
                                            {this.state.column && <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(column)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>}
                                            {this.state.income && <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>}
                                            {this.state.expense && <td className="text-right" ><span>
                                              {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                { style: 'currency', currency: this.state.home_currency }).format(expense)).replace(this.state.home_currency_symbol, '')}
                                            </span> </td>}
                                            {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                              <td className="text-right" ><span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                              </span> </td>
                                            }
                                            {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                              <td className="text-right" ><span>
                                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                  { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                              </span> </td>
                                            }
                                            {(i + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                              <td className="text-right" ><span>000</span> </td>
                                            }
                                            {(i + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                              <td className="text-right" ><span>000</span> </td>
                                            }
                                            {(i + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                              <td className="text-right" ><span>000</span> </td>
                                            }



                                          </>
                                        );
                                      }
                                    )}
                                </tr>
                              )}
                          </tbody>
                        </table>
                      )}
                    </div>
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

export default profit_loss_report;
