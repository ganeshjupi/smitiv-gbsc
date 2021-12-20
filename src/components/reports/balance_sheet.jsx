import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import FetchAllApi from "../../api_links/fetch_all_api";
import config from "../../api_links/api_links";
import Topbar from "../topbar";
import Loader from "react-loader-spinner";
import Comma from "../comma";
import moment from "moment";
import { PDFtoIMG } from "react-pdf-to-image";
import DatePicker from "react-date-picker";

import jQuery from "jquery";
// import 'bootstrap';
// import 'bootstrap-select';
var _ = require("lodash");

class balance_sheet_report extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
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
      reportObject: [],
      numberOfColumns: [],
      dateList: [],
      endDate: "",
      startDate: moment().startOf("month").format("YYYY-MM-DD"),
      dropdown: "",
      show_column: "",
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",
      waiting_re: [],
      re_assigned: [],
      client_id: 1,
      start_date: moment().startOf("month").format("YYYY-MM-DD"),
      end_date: moment().endOf("month").format("YYYY-MM-DD"),
      previous_period_from_date: '',
      previous_period_to_date: '',
      show_columns: 1,
      balance_sheet_data: [],
      columnList: {},
      show_coulmns_filter: [],
      isChecked2: false,
      isChecked: false,
      sub_columns: [],
      cadchange: false,
      cadpercentage: false,
      changetotal: 0,
      changetotal1: 0,
      changetotal2: 0,
      changetotal3: 0,

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
      date_range: 'Custom',
      first_value: 0,
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



  row = (array) => {
    let total = 0
    array.map((amount, i) => { total = total + amount })
    console.log('kjkjkj', total)
    return total
  }

  repeat = (sub_categories, paddingLeft) => { 
     console.log("sub_categories",sub_categories)
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
              var a = Object.values(itm)[0]
              console.log(a,'161');
              if (a.total_amount !== 0) {
                return (
                  <React.Fragment >
                    {a && a.total_amount && a.total_amount !== 0 && a.is_child_data_available === 0 ? (
                      <>
                        <tr className="item-step1">
                          <td
                            style={{
                              // position: "sticky",
                              // left: "0.25rem",
                              paddingLeft: `${paddingLeft}px`
                            }}
                          >
                            {" "}
                            <span>{a.category_name}</span>
                          </td>
                          {a.amount_array.map((item, j) => {

                            // % row 
                            let first_value = item
                            let second_value = Number(this.state.total_assets)
                            // let second_value = this.row(parentCategory.amount_array)
                            let row

                            if (first_value == 0 && second_value != 0) {
                              row = 0.00
                            } else if (first_value != 0 && second_value == 0) {
                              row = 100.00
                            } else if (first_value == 0 && second_value == 0) {
                              row = 0.00
                            } else {
                              // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                              row = ((item) / (Number(this.state.total_assets))) * 100
                            }
                            // % row 

                            // % column

                            let first_value_col = item
                            // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                            let second_value_col = this.state.total_liabilities
                            let column

                            if (first_value_col == 0 && second_value_col != 0) {
                              column = 0.00
                            } else if (first_value_col != 0 && second_value_col == 0) {
                              column = 100.00
                            } else if (first_value_col == 0 && second_value_col == 0) {
                              column = 0.00
                            } else {
                              // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                              column = (item / Number(this.state.total_liabilities)) * 100
                            }

                            // % column

                            // % income

                            let first_value_inc = item
                            // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                            let second_value_inc = this.state.total_equity
                            let income

                            if (first_value_inc == 0 && second_value_inc != 0) {
                              income = 0.00
                            } else if (first_value_inc != 0 && second_value_inc == 0) {
                              income = 100.00
                            } else if (first_value_inc == 0 && second_value_inc == 0) {
                              income = 0.00
                            } else {
                              income = (item / Number(this.state.total_equity)) * 100
                            }

                            // % income

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
                                per_change = (change / a.amount_array[j]) * 100
                              }


                              // per_change = ((a.amount_array[j - 1] - a.amount_array[j]) / a.amount_array[j]) * 100
                            }
                            // % change



                            return (
                              <>
                               {console.log(a, a.category_id)}
                                <td className="text-right" key={j} onDoubleClick={() => { this.subCategory(a.category_id) }}>
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
                                {this.state.expense && <td className="text-right" ><span>000</span> </td>}
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
                    ) : ''
                    }

     {console.log(a,a && a.total_amount && a.total_amount != 0 && a.is_child_data_available)}
                    {a && a.total_amount && a.total_amount != 0 && a.is_child_data_available === 1 ? (
                      <tr className="item-step1 sub-title">
                        <td
                          style={{
                            position: "sticky",
                            left: "0.25rem",backgroundColor: "#EFEFFF",
                            paddingLeft: `${paddingLeft}px`
                          }}
                        ><div>
                            {a.category_name} </div>
                        </td>
                        { a.amount_array.map((item, j) => {
                          return (
                            <>
                              <td className="text-right" key={j} onDoubleClick={() => { this.subCategory(a.category_id) }}><div></div></td>
                              {this.state.row && <td><div></div> </td>}
                              {this.state.column && <td><div></div> </td>}
                              {this.state.income && <td><div></div> </td>}
                              {this.state.expense && <td><div></div> </td>}
                              { (j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                <td><div></div> </td>
                              }
                              { (j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                <td><div></div> </td>
                              }
                              { (j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                <td><div></div> </td>
                              }
                              { (j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                <td><div></div> </td>
                              }
                              { (j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                <td><div></div> </td>
                              }
                            </>
                          )
                        }
                        )}

                      </tr>
                    ) : ''}
                   
                    {a && a.total_amount && a.total_amount != 0 && a.is_child_data_available === 1 &&
                      this.repeat(
                        a.sub_categories, paddingLeft + 45
                      )}

   {console.log(a,a && a.total_amount && a.total_amount != 0 && a.is_child_data_available  && a.total_others_amount !== 0 )}
                    {a && a.total_amount && a.total_amount !== 0 && a.is_child_data_available === 1 && a.total_others_amount !== 0 ? (

                      <>
                        <tr className="item-step1">
                          <td
                            style={{

                              paddingLeft: `${paddingLeft}px`
                            }}
                          >
                            {" "}
                            <span>  {a.category_name} {''} - {''} Others</span>
                          </td>
                          {a.others_amount_array.map((item, j) => {

                            // % row 
                            let first_value = item
                            let second_value = Number(this.state.total_assets)
                            // let second_value = this.row(parentCategory.amount_array)
                            let row

                            if (first_value == 0 && second_value != 0) {
                              row = 0.00
                            } else if (first_value != 0 && second_value == 0) {
                              row = 100.00
                            } else if (first_value == 0 && second_value == 0) {
                              row = 0.00
                            } else {
                              // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                              row = ((item) / (Number(this.state.total_assets))) * 100
                            }
                            // % row 

                            // % column

                            let first_value_col = item
                            // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                            let second_value_col = this.state.total_liabilities
                            let column

                            if (first_value_col == 0 && second_value_col != 0) {
                              column = 0.00
                            } else if (first_value_col != 0 && second_value_col == 0) {
                              column = 100.00
                            } else if (first_value_col == 0 && second_value_col == 0) {
                              column = 0.00
                            } else {
                              // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                              column = (item / Number(this.state.total_liabilities)) * 100
                            }

                            // % column

                            // % income

                            let first_value_inc = item
                            // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                            let second_value_inc = this.state.total_equity
                            let income

                            if (first_value_inc == 0 && second_value_inc != 0) {
                              income = 0.00
                            } else if (first_value_inc != 0 && second_value_inc == 0) {
                              income = 100.00
                            } else if (first_value_inc == 0 && second_value_inc == 0) {
                              income = 0.00
                            } else {
                              income = (item / Number(this.state.total_equity)) * 100
                            }

                            // % income


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
                                per_change = (change / a.others_amount_array[j]) * 100
                              }


                              // per_change = ((a.others_amount_array[j - 1] - a.others_amount_array[j]) / a.others_amount_array[j]) * 100
                            }
                            // % change

                            return (
                              <>
                                <td className="text-right" key={j} onDoubleClick={() => { this.subCategoryOthers(a.category_id) }}>
                                  {" "}
                                  <span>
                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                      { style: 'currency', currency: this.state.home_currency }).format(item)).replace(this.state.home_currency_symbol, '')}
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
                                {this.state.income && <td className="text-right" ><span>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(income)).replace(this.state.home_currency_symbol, '')}
                                </span> </td>}
                                {this.state.expense && <td className="text-right" ><span>000</span> </td>}
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
                    ) : ''}

                    {a && a.total_amount && a.total_amount != 0 && a.is_child_data_available === 1 ? (
                      <tr className="item-step1 sub-title">
                        <td style={{
                          // position: "sticky",
                          // left: "0.25rem",
                          paddingLeft: `${paddingLeft}px`
                        }}>
                          <div>Total {a.category_name}</div>
                        </td>
                        { a.amount_array.map((item, j) => {


                          // % row 
                          let first_value = item
                          let second_value = Number(this.state.total_assets)
                          // let second_value = this.row(parentCategory.amount_array)
                          let row

                          if (first_value == 0 && second_value != 0) {
                            row = 0.00
                          } else if (first_value != 0 && second_value == 0) {
                            row = 100.00
                          } else if (first_value == 0 && second_value == 0) {
                            row = 0.00
                          } else {
                            // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                            row = ((item) / (Number(this.state.total_assets))) * 100
                          }
                          // % row 

                          // % column

                          let first_value_col = item
                          // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                          let second_value_col = this.state.total_liabilities
                          let column

                          if (first_value_col == 0 && second_value_col != 0) {
                            column = 0.00
                          } else if (first_value_col != 0 && second_value_col == 0) {
                            column = 100.00
                          } else if (first_value_col == 0 && second_value_col == 0) {
                            column = 0.00
                          } else {
                            // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                            column = (item / Number(this.state.total_liabilities)) * 100
                          }

                          // % column

                          // % income

                          let first_value_inc = item
                          // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                          let second_value_inc = this.state.total_equity
                          let income

                          if (first_value_inc == 0 && second_value_inc != 0) {
                            income = 0.00
                          } else if (first_value_inc != 0 && second_value_inc == 0) {
                            income = 100.00
                          } else if (first_value_inc == 0 && second_value_inc == 0) {
                            income = 0.00
                          } else {
                            income = (item / Number(this.state.total_equity)) * 100
                          }

                          // % income


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
                              per_change = (change / a.amount_array[j]) * 100
                            }


                            // per_change = ((a.amount_array[j - 1] - a.amount_array[j]) / a.amount_array[j]) * 100
                          }
                          // % change


                          return (
                            <>
                              <td className="text-right" key={j} onDoubleClick={() => { this.subCategory(a.category_id) }}>
                                {" "}
                                <div>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(item)).replace(this.state.home_currency_symbol, '')}
                                  {/* {item.toFixed(2)}  */}
                                </div>{" "}
                              </td>
                              {this.state.row && <td><div></div> </td>}
                              {this.state.column && <td><div></div> </td>}
                              {this.state.income && <td><div></div> </td>}
                              {this.state.expense && <td><div></div> </td>}
                              { (j + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                <td className="text-right"><div>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                </div> </td>
                              }
                              { (j + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                <td className="text-right"><div>
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                </div> </td>
                              }
                              { (j + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                <td><div></div> </td>
                              }
                              { (j + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                <td><div></div> </td>
                              }
                              { (j + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                <td><div></div> </td>
                              }
                            </>
                          );
                        })}

                      </tr>

                    ) : ''}
                  </React.Fragment>
                )
              }

            })}

        </React.Fragment>)
    }
  }


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


  goToBreak(input) {
    window.open("/transaction_history?breakdown_by=" + input + "&start=" + this.state.start_date + "&end=" + this.state.end_date + "&range=" + this.state.date_range)
  }

  mainIncome(id) {
    window.open("/transaction_history?account_type_id_array=" + id + "&start=" + this.state.start_date + "&end=" + this.state.end_date + "&range=" + this.state.date_range)
  }

  subCategoryOthers(subId) {
    window.open("/transaction_history?category_id=" + subId + "&start=" + this.state.start_date + "&end=" + this.state.end_date + "&range=" + this.state.date_range)
  }

  subCategory(subId) {
    if(subId===undefined){
      window.open("/profit_loss_report?start=" + this.state.start_date + "&end=" + this.state.end_date + "&range=" + this.state.date_range)
    }
    else{
    window.open("/transaction_history?category_id_array=" + subId + "&start=" + this.state.start_date + "&end=" + this.state.end_date + "&range=" + this.state.date_range)
    }
  }


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

  multiSelectedCurrency = (cur) => {
    //alert(jQuery('#slectedCurrency').val())
    this.setState(
      { selectedCurrencies: jQuery("#slectedCurrency").val() },
      () => {
        this.callAPIDATA();
      }
    );
  };
  customRadioChange = (x) => {
    this.setState({ valueAmount_type: x },
      () => {
       // this.callAPIDATA()
      })
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


  previous_period_from_date() {
    let date = jQuery("#previous_period_from_date").val();
    if (date && date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      var fomrat = moment(date_formated, "YYYY-MM-DD").format("DD-MM-YYYY");
      jQuery("#previous_period_from_date").val(fomrat);
      this.setState({ previous_period_from_date: date_formated }, () => {
        this.callAPIDATA();
      });
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }
  previous_period_to_date() {
    let date = jQuery("#previous_period_to_date").val();
    if (date && date != undefined) {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      var fomrat = moment(date_formated, "YYYY-MM-DD").format("DD-MM-YYYY");
      jQuery("#previous_period_to_date").val(fomrat);
      this.setState({ previous_period_to_date: date_formated }, () => {
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
      if(array!='' && array!=undefined){
      this.setState({ date_start: date_formated }, () => {
        this.callAPIDATA();
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
      this.callAPIDATA();
    });
  }
  }
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

  changefromDate_duedate(fromdate) {
    let date = jQuery("#fromdate_duedate").val();
    console.log("fromdate RTEdsadaasdadasdadad", date);
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      if(array!='' && array!=undefined){
      this.setState({ changefromDate_duedate: date_formated }, () => {
        this.callAPIDATA();
      });
    }
    }
  }

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
          if (report_ids[i].column_name == "balance_sheet") {
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

  changefromDate1(fromdate) {
    let date = jQuery("#fromdate1").val();
    if (date != undefined && date!='') {
      var array = date.split("/");
      var date_formated = array[2] + "-" + array[1] + "-" + array[0];
      if(array!='' && array!=undefined){
      this.setState({ date_start: date_formated }, () => {
        this.callAPIDATA();
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
      this.callAPIDATA();
    });
  }}
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
          this.callAPIDATA();
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
          this.callAPIDATA();
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
          this.callAPIDATA();
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
          this.callAPIDATA();
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
          this.callAPIDATA();
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
          this.callAPIDATA();
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
          this.callAPIDATA();
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
          this.callAPIDATA();
        }
      );
    });
  };
  DummyData = () => {
    var response = {
      status: 1,
      message: "Balance sheet report generated successfully",
      bank_balance: 3640,
      total_assets: 891070.21,
      total_liabilities: 1297.3653,
      total_equity: 0,
      details: {
        3: {
          account_type: "Current assets",
          account_type_id: 3,
          total_amount: 891070.21,
          date_array: ["Jul 01-2020 - Jul 31, 2020"],
          amount_array: [891070.21],
          date_string_array: [
            {
              start: "2020-07-01T00:00:00.000Z",
              end: "2020-07-31T23:59:59.000Z",
              date_string: "Jul 01-2020 - Jul 31, 2020",
            },
          ],
          sub_categories: [
            {
              1: {
                account_type: "Bank",
                account_type_id: 1,
                total_amount: 3640,
                date_array: ["Jul 01-2020 - Jul 31, 2020"],
                amount_array: [3640],
                date_string_array: [
                  {
                    start: "2020-07-01T00:00:00.000Z",
                    end: "2020-07-31T23:59:59.000Z",
                    date_string: "Jul 01-2020 - Jul 31, 2020",
                  },
                ],
                sub_categories: [
                  {
                    1: {
                      account_type_id: 1,
                      category_id: 1,
                      total_amount: 3000,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [3000],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "DBS Bank - AUD",
                      account_type: "Bank",
                      parent: 0,
                      sub_categories: [
                        {
                          239: {
                            account_type_id: 1,
                            category_id: 239,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "NK",
                            account_type: "Bank",
                            parent: 1,
                          },
                          244: {
                            account_type_id: 1,
                            category_id: 244,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "KK acc",
                            account_type: "Bank",
                            parent: 1,
                          },
                        },
                      ],
                    },
                  },
                  {
                    2: {
                      account_type_id: 1,
                      category_id: 2,
                      total_amount: 640,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [640],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "DBS Bank - EUR",
                      account_type: "Bank",
                      parent: 0,
                      sub_categories: [
                        {
                          249: {
                            account_type_id: 1,
                            category_id: 249,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "RTR",
                            account_type: "Bank",
                            parent: 2,
                          },
                        },
                      ],
                    },
                  },
                  {
                    3: {
                      account_type_id: 1,
                      category_id: 3,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "DBS Bank - JPY",
                      account_type: "Bank",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    248: {
                      account_type_id: 1,
                      category_id: 248,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "KIY",
                      account_type: "Bank",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                ],
              },
            },
            {
              2: {
                account_type: "Accounts receivables",
                account_type_id: 2,
                total_amount: 887430.21,
                date_array: ["Jul 01-2020 - Jul 31, 2020"],
                amount_array: [887430.21],
                date_string_array: [
                  {
                    start: "2020-07-01T00:00:00.000Z",
                    end: "2020-07-31T23:59:59.000Z",
                    date_string: "Jul 01-2020 - Jul 31, 2020",
                  },
                ],
                sub_categories: [
                  {
                    4: {
                      account_type_id: 2,
                      category_id: 4,
                      total_amount: 6349.82,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [6349.82],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-AUD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    5: {
                      account_type_id: 2,
                      category_id: 5,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-EUR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    6: {
                      account_type_id: 2,
                      category_id: 6,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-JPY",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [
                        {
                          233: {
                            account_type_id: 2,
                            category_id: 233,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "meivannan",
                            account_type: "Accounts receivables",
                            parent: 6,
                          },
                        },
                      ],
                    },
                  },
                  {
                    7: {
                      account_type_id: 2,
                      category_id: 7,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [
                        {
                          144: {
                            account_type_id: 2,
                            category_id: 144,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "new",
                            account_type: "Accounts receivables",
                            parent: 7,
                          },
                        },
                      ],
                    },
                  },
                  {
                    146: {
                      account_type_id: 2,
                      category_id: 146,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts receivables-INR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    153: {
                      account_type_id: 2,
                      category_id: 153,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts receivables-USD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    154: {
                      account_type_id: 2,
                      category_id: 154,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-HUF",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    155: {
                      account_type_id: 2,
                      category_id: 155,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-USD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    156: {
                      account_type_id: 2,
                      category_id: 156,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-KRW",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    157: {
                      account_type_id: 2,
                      category_id: 157,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-DKK",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    158: {
                      account_type_id: 2,
                      category_id: 158,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-AF",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [
                        {
                          253: {
                            account_type_id: 2,
                            category_id: 253,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "newrr",
                            account_type: "Accounts receivables",
                            parent: 158,
                          },
                        },
                      ],
                    },
                  },
                  {
                    159: {
                      account_type_id: 2,
                      category_id: 159,
                      total_amount: 8146,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [8146],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-ARS",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [
                        {
                          245: {
                            account_type_id: 2,
                            category_id: 245,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Kart",
                            account_type: "Accounts receivables",
                            parent: 159,
                          },
                        },
                      ],
                    },
                  },
                  {
                    160: {
                      account_type_id: 2,
                      category_id: 160,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-AWG",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [
                        {
                          243: {
                            account_type_id: 2,
                            category_id: 243,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "New Acc",
                            account_type: "Accounts receivables",
                            parent: 160,
                          },
                          251: {
                            account_type_id: 2,
                            category_id: 251,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "DURAI-new",
                            account_type: "Accounts receivables",
                            parent: 160,
                          },
                        },
                      ],
                    },
                  },
                  {
                    162: {
                      account_type_id: 2,
                      category_id: 162,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-AZ",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    163: {
                      account_type_id: 2,
                      category_id: 163,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-BBD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    164: {
                      account_type_id: 2,
                      category_id: 164,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-GBP",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    165: {
                      account_type_id: 2,
                      category_id: 165,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-BND",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    166: {
                      account_type_id: 2,
                      category_id: 166,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-NPR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    167: {
                      account_type_id: 2,
                      category_id: 167,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-ZWD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    168: {
                      account_type_id: 2,
                      category_id: 168,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-VEF",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    169: {
                      account_type_id: 2,
                      category_id: 169,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-UYU",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    170: {
                      account_type_id: 2,
                      category_id: 170,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-UAH",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    171: {
                      account_type_id: 2,
                      category_id: 171,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-INR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    172: {
                      account_type_id: 2,
                      category_id: 172,
                      total_amount: 4000,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [4000],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-BSD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    173: {
                      account_type_id: 2,
                      category_id: 173,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-KHR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    174: {
                      account_type_id: 2,
                      category_id: 174,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-BZD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    175: {
                      account_type_id: 2,
                      category_id: 175,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-EUR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    176: {
                      account_type_id: 2,
                      category_id: 176,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-ALL",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    177: {
                      account_type_id: 2,
                      category_id: 177,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-CUP",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    178: {
                      account_type_id: 2,
                      category_id: 178,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-XCD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    181: {
                      account_type_id: 2,
                      category_id: 181,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-BYR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    182: {
                      account_type_id: 2,
                      category_id: 182,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-SBD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    183: {
                      account_type_id: 2,
                      category_id: 183,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-YER",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    184: {
                      account_type_id: 2,
                      category_id: 184,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-PYG",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    185: {
                      account_type_id: 2,
                      category_id: 185,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-ANG",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    186: {
                      account_type_id: 2,
                      category_id: 186,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-UZS",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    187: {
                      account_type_id: 2,
                      category_id: 187,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-COP",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    188: {
                      account_type_id: 2,
                      category_id: 188,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-CLP",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    189: {
                      account_type_id: 2,
                      category_id: 189,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-HRK",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    190: {
                      account_type_id: 2,
                      category_id: 190,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-IDR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    191: {
                      account_type_id: 2,
                      category_id: 191,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-NIO",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    192: {
                      account_type_id: 2,
                      category_id: 192,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-MKD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    193: {
                      account_type_id: 2,
                      category_id: 193,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-CHF",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    194: {
                      account_type_id: 2,
                      category_id: 194,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-CAD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    195: {
                      account_type_id: 2,
                      category_id: 195,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-ZAR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    196: {
                      account_type_id: 2,
                      category_id: 196,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-TWD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    197: {
                      account_type_id: 2,
                      category_id: 197,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-TRY",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    198: {
                      account_type_id: 2,
                      category_id: 198,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-THB",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    199: {
                      account_type_id: 2,
                      category_id: 199,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-SEK",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    200: {
                      account_type_id: 2,
                      category_id: 200,
                      total_amount: 300,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [300],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-SAR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    201: {
                      account_type_id: 2,
                      category_id: 201,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-RUB",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    202: {
                      account_type_id: 2,
                      category_id: 202,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-RON",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    203: {
                      account_type_id: 2,
                      category_id: 203,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-PLN",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    204: {
                      account_type_id: 2,
                      category_id: 204,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-PKR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    205: {
                      account_type_id: 2,
                      category_id: 205,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-PHP",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    206: {
                      account_type_id: 2,
                      category_id: 206,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-PEN",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    207: {
                      account_type_id: 2,
                      category_id: 207,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-PAB",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    208: {
                      account_type_id: 2,
                      category_id: 208,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-NZD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    209: {
                      account_type_id: 2,
                      category_id: 209,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-NOK",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    210: {
                      account_type_id: 2,
                      category_id: 210,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-MYR",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    211: {
                      account_type_id: 2,
                      category_id: 211,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-MXN",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    212: {
                      account_type_id: 2,
                      category_id: 212,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-KZT",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    213: {
                      account_type_id: 2,
                      category_id: 213,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-JPY",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    214: {
                      account_type_id: 2,
                      category_id: 214,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-ISK",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    215: {
                      account_type_id: 2,
                      category_id: 215,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-ILS",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    216: {
                      account_type_id: 2,
                      category_id: 216,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-HKD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    217: {
                      account_type_id: 2,
                      category_id: 217,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-GTQ",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    218: {
                      account_type_id: 2,
                      category_id: 218,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-FJD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    219: {
                      account_type_id: 2,
                      category_id: 219,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-EGP",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    220: {
                      account_type_id: 2,
                      category_id: 220,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-DOP",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    221: {
                      account_type_id: 2,
                      category_id: 221,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-CZK",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    222: {
                      account_type_id: 2,
                      category_id: 222,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-CNY",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    223: {
                      account_type_id: 2,
                      category_id: 223,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-BRL",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    224: {
                      account_type_id: 2,
                      category_id: 224,
                      total_amount: 1800,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [1800],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-BGN",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    225: {
                      account_type_id: 2,
                      category_id: 225,
                      total_amount: 10992.39,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [10992.39],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-AED",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    226: {
                      account_type_id: 2,
                      category_id: 226,
                      total_amount: 855842,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [855842],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-SGD",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    229: {
                      account_type_id: 2,
                      category_id: 229,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "chellaaccount",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    231: {
                      account_type_id: 2,
                      category_id: 231,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "thuil",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    232: {
                      account_type_id: 2,
                      category_id: 232,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "duraicss",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    242: {
                      account_type_id: 2,
                      category_id: 242,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Nike",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    303: {
                      account_type_id: 2,
                      category_id: 303,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Receivable-undefined",
                      account_type: "Accounts receivables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                ],
              },
            },
            {
              3: {
                account_type: "Other current asset",
                account_type_id: 3,
                total_amount: 0,
                date_array: ["Jul 01-2020 - Jul 31, 2020"],
                amount_array: [0],
                date_string_array: [
                  {
                    start: "2020-07-01T00:00:00.000Z",
                    end: "2020-07-31T23:59:59.000Z",
                    date_string: "Jul 01-2020 - Jul 31, 2020",
                  },
                ],
                sub_categories: [
                  {
                    8: {
                      account_type_id: 3,
                      category_id: 8,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Inventory Asset",
                      account_type: "Other current asset",
                      parent: 0,
                      sub_categories: [
                        {
                          290: {
                            account_type_id: 3,
                            category_id: 290,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "thaj inventory test",
                            account_type: "Other current asset",
                            parent: 8,
                          },
                          291: {
                            account_type_id: 1,
                            category_id: 291,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Cash in hand",
                            account_type: "Bank",
                            parent: 8,
                          },
                        },
                      ],
                    },
                  },
                  {
                    9: {
                      account_type_id: 3,
                      category_id: 9,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Prepayment",
                      account_type: "Other current asset",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    10: {
                      account_type_id: 3,
                      category_id: 10,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Security depsoit",
                      account_type: "Other current asset",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                ],
              },
            },
          ],
        },
        4: {
          account_type: "Non-current assets",
          account_type_id: 4,
          total_amount: 0,
          date_array: ["Jul 01-2020 - Jul 31, 2020"],
          amount_array: [0],
          date_string_array: [
            {
              start: "2020-07-01T00:00:00.000Z",
              end: "2020-07-31T23:59:59.000Z",
              date_string: "Jul 01-2020 - Jul 31, 2020",
            },
          ],
          sub_categories: [
            {
              4: {
                account_type: "Fixed asset",
                account_type_id: 4,
                total_amount: 0,
                date_array: ["Jul 01-2020 - Jul 31, 2020"],
                amount_array: [0],
                date_string_array: [
                  {
                    start: "2020-07-01T00:00:00.000Z",
                    end: "2020-07-31T23:59:59.000Z",
                    date_string: "Jul 01-2020 - Jul 31, 2020",
                  },
                ],
                sub_categories: [
                  {
                    11: {
                      account_type_id: 4,
                      category_id: 11,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Property Plant & Equipment",
                      account_type: "Fixed asset",
                      parent: 0,
                      sub_categories: [
                        {
                          12: {
                            account_type_id: 4,
                            category_id: 12,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Computer Equipment",
                            account_type: "Fixed asset",
                            parent: 11,
                            sub_categories: [
                              {
                                13: {
                                  account_type_id: 4,
                                  category_id: 13,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "Accum. Depn",
                                  account_type: "Fixed asset",
                                  parent: 12,
                                },
                                14: {
                                  account_type_id: 4,
                                  category_id: 14,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "Cost",
                                  account_type: "Fixed asset",
                                  parent: 12,
                                },
                              },
                            ],
                          },
                          15: {
                            account_type_id: 4,
                            category_id: 15,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Computer Software",
                            account_type: "Fixed asset",
                            parent: 11,
                            sub_categories: [
                              {
                                16: {
                                  account_type_id: 4,
                                  category_id: 16,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "Accum. Depn",
                                  account_type: "Fixed asset",
                                  parent: 15,
                                },
                                17: {
                                  account_type_id: 4,
                                  category_id: 17,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "Cost",
                                  account_type: "Fixed asset",
                                  parent: 15,
                                },
                                235: {
                                  account_type_id: 4,
                                  category_id: 235,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "Currently Created",
                                  account_type: "Fixed asset",
                                  parent: 15,
                                },
                                238: {
                                  account_type_id: 4,
                                  category_id: 238,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "New Durai",
                                  account_type: "Fixed asset",
                                  parent: 15,
                                },
                                246: {
                                  account_type_id: 4,
                                  category_id: 246,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "KI",
                                  account_type: "Fixed asset",
                                  parent: 15,
                                  sub_categories: [
                                    {
                                      254: {
                                        account_type_id: 4,
                                        category_id: 254,
                                        total_amount: 0,
                                        date_array: [
                                          "Jul 01-2020 - Jul 31, 2020",
                                        ],
                                        amount_array: [0],
                                        date_string_array: [
                                          {
                                            start: "2020-07-01T00:00:00.000Z",
                                            end: "2020-07-31T23:59:59.000Z",
                                            date_string:
                                              "Jul 01-2020 - Jul 31, 2020",
                                          },
                                        ],
                                        category_name: "JIII",
                                        account_type: "Fixed asset",
                                        parent: 246,
                                      },
                                    },
                                  ],
                                },
                                255: {
                                  account_type_id: 4,
                                  category_id: 255,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "neY",
                                  account_type: "Fixed asset",
                                  parent: 15,
                                },
                              },
                            ],
                          },
                          18: {
                            account_type_id: 4,
                            category_id: 18,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Vehicles",
                            account_type: "Fixed asset",
                            parent: 11,
                            sub_categories: [
                              {
                                19: {
                                  account_type_id: 4,
                                  category_id: 19,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "Accum. Depn",
                                  account_type: "Fixed asset",
                                  parent: 18,
                                },
                                20: {
                                  account_type_id: 4,
                                  category_id: 20,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "Cost",
                                  account_type: "Fixed asset",
                                  parent: 18,
                                },
                                236: {
                                  account_type_id: 4,
                                  category_id: 236,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "KIT",
                                  account_type: "Fixed asset",
                                  parent: 18,
                                },
                                252: {
                                  account_type_id: 4,
                                  category_id: 252,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "Hp book",
                                  account_type: "Fixed asset",
                                  parent: 18,
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  {
                    247: {
                      account_type_id: 4,
                      category_id: 247,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "LOP",
                      account_type: "Fixed asset",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    281: {
                      account_type_id: 4,
                      category_id: 281,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "sons",
                      account_type: "Fixed asset",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                ],
              },
            },
          ],
        },
        5: {
          account_type: "Current liabilities ",
          account_type_id: 5,
          total_amount: 1297.3653,
          date_array: ["Jul 01-2020 - Jul 31, 2020"],
          amount_array: [1297.3653],
          date_string_array: [
            {
              start: "2020-07-01T00:00:00.000Z",
              end: "2020-07-31T23:59:59.000Z",
              date_string: "Jul 01-2020 - Jul 31, 2020",
            },
          ],
          sub_categories: [
            {
              5: {
                account_type: "Accounts payables",
                account_type_id: 5,
                total_amount: 1297.3653,
                date_array: ["Jul 01-2020 - Jul 31, 2020"],
                amount_array: [1297.3653],
                date_string_array: [
                  {
                    start: "2020-07-01T00:00:00.000Z",
                    end: "2020-07-31T23:59:59.000Z",
                    date_string: "Jul 01-2020 - Jul 31, 2020",
                  },
                ],
                sub_categories: [
                  {
                    21: {
                      account_type_id: 5,
                      category_id: 21,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable - EUR",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    22: {
                      account_type_id: 5,
                      category_id: 22,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable - JPY",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    23: {
                      account_type_id: 5,
                      category_id: 23,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable - AUD",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [
                        {
                          138: {
                            account_type_id: 5,
                            category_id: 138,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "test 500",
                            account_type: "Accounts payables",
                            parent: 23,
                          },
                        },
                      ],
                    },
                  },
                  {
                    24: {
                      account_type_id: 5,
                      category_id: 24,
                      total_amount: -12.6347,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [-12.6347],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [
                        {
                          125: {
                            account_type_id: 5,
                            category_id: 125,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Test AC 12",
                            account_type: "Accounts payables",
                            parent: 24,
                          },
                          139: {
                            account_type_id: 5,
                            category_id: 139,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Test600",
                            account_type: "Accounts payables",
                            parent: 24,
                            sub_categories: [
                              {
                                140: {
                                  account_type_id: 5,
                                  category_id: 140,
                                  total_amount: 0,
                                  date_array: ["Jul 01-2020 - Jul 31, 2020"],
                                  amount_array: [0],
                                  date_string_array: [
                                    {
                                      start: "2020-07-01T00:00:00.000Z",
                                      end: "2020-07-31T23:59:59.000Z",
                                      date_string: "Jul 01-2020 - Jul 31, 2020",
                                    },
                                  ],
                                  category_name: "test601",
                                  account_type: "Accounts payables",
                                  parent: 139,
                                },
                              },
                            ],
                          },
                          180: {
                            account_type_id: 5,
                            category_id: 180,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "account payabe",
                            account_type: "Accounts payables",
                            parent: 24,
                          },
                          230: {
                            account_type_id: 5,
                            category_id: 230,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "reat",
                            account_type: "Accounts payables",
                            parent: 24,
                          },
                        },
                      ],
                    },
                  },
                  {
                    227: {
                      account_type_id: 5,
                      category_id: 227,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "meiable",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    237: {
                      account_type_id: 5,
                      category_id: 237,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Netflix Acc",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    259: {
                      account_type_id: 5,
                      category_id: 259,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-ARS",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    260: {
                      account_type_id: 5,
                      category_id: 260,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-SGD",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    261: {
                      account_type_id: 5,
                      category_id: 261,
                      total_amount: -280,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [-280],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-AED",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    262: {
                      account_type_id: 5,
                      category_id: 262,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "acciunt",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    263: {
                      account_type_id: 5,
                      category_id: 263,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "gook",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    264: {
                      account_type_id: 5,
                      category_id: 264,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-USD",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    265: {
                      account_type_id: 5,
                      category_id: 265,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "ghjjj",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    266: {
                      account_type_id: 5,
                      category_id: 266,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "chellaccounting",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    267: {
                      account_type_id: 5,
                      category_id: 267,
                      total_amount: 1590,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [1590],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "acciunting tools",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    268: {
                      account_type_id: 5,
                      category_id: 268,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "uooking",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    269: {
                      account_type_id: 5,
                      category_id: 269,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-BGN",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    270: {
                      account_type_id: 5,
                      category_id: 270,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-BSD",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    271: {
                      account_type_id: 5,
                      category_id: 271,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-CAD",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    272: {
                      account_type_id: 5,
                      category_id: 272,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-CHF",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    273: {
                      account_type_id: 5,
                      category_id: 273,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "hooking",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    274: {
                      account_type_id: 5,
                      category_id: 274,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-AUD",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    275: {
                      account_type_id: 5,
                      category_id: 275,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-BRL",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    276: {
                      account_type_id: 5,
                      category_id: 276,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-DKK",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    277: {
                      account_type_id: 5,
                      category_id: 277,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-EUR",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    278: {
                      account_type_id: 5,
                      category_id: 278,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-JPY",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    279: {
                      account_type_id: 5,
                      category_id: 279,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Accounts Payable-INR",
                      account_type: "Accounts payables",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                ],
              },
            },
            {
              6: {
                account_type: "Other current liability",
                account_type_id: 6,
                total_amount: 0,
                date_array: ["Jul 01-2020 - Jul 31, 2020"],
                amount_array: [0],
                date_string_array: [
                  {
                    start: "2020-07-01T00:00:00.000Z",
                    end: "2020-07-31T23:59:59.000Z",
                    date_string: "Jul 01-2020 - Jul 31, 2020",
                  },
                ],
                sub_categories: [
                  {
                    25: {
                      account_type_id: 6,
                      category_id: 25,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "GST/HST Payable",
                      account_type: "Other current liability",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    26: {
                      account_type_id: 6,
                      category_id: 26,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "PST Payable",
                      account_type: "Other current liability",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    27: {
                      account_type_id: 6,
                      category_id: 27,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Payroll Liabilities",
                      account_type: "Other current liability",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                ],
              },
            },
          ],
        },
        6: {
          account_type: "Non-current liablities ",
          account_type_id: 6,
          total_amount: 0,
          date_array: ["Jul 01-2020 - Jul 31, 2020"],
          amount_array: [0],
          date_string_array: [
            {
              start: "2020-07-01T00:00:00.000Z",
              end: "2020-07-31T23:59:59.000Z",
              date_string: "Jul 01-2020 - Jul 31, 2020",
            },
          ],
          sub_categories: [
            {
              7: {
                account_type: "Long term liability",
                account_type_id: 7,
                total_amount: 0,
                date_array: ["Jul 01-2020 - Jul 31, 2020"],
                amount_array: [0],
                date_string_array: [
                  {
                    start: "2020-07-01T00:00:00.000Z",
                    end: "2020-07-31T23:59:59.000Z",
                    date_string: "Jul 01-2020 - Jul 31, 2020",
                  },
                ],
                sub_categories: [
                  {
                    28: {
                      account_type_id: 7,
                      category_id: 28,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Term Loan",
                      account_type: "Long term liability",
                      parent: 0,
                      sub_categories: [
                        {
                          240: {
                            account_type_id: 7,
                            category_id: 240,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "KK",
                            account_type: "Long term liability",
                            parent: 28,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
        7: {
          account_type: "Equity ",
          account_type_id: 7,
          total_amount: 0,
          date_array: ["Jul 01-2020 - Jul 31, 2020"],
          amount_array: [0],
          date_string_array: [
            {
              start: "2020-07-01T00:00:00.000Z",
              end: "2020-07-31T23:59:59.000Z",
              date_string: "Jul 01-2020 - Jul 31, 2020",
            },
          ],
          sub_categories: [
            {
              8: {
                account_type: "Equity ",
                account_type_id: 8,
                total_amount: 0,
                date_array: ["Jul 01-2020 - Jul 31, 2020"],
                amount_array: [0],
                date_string_array: [
                  {
                    start: "2020-07-01T00:00:00.000Z",
                    end: "2020-07-31T23:59:59.000Z",
                    date_string: "Jul 01-2020 - Jul 31, 2020",
                  },
                ],
                sub_categories: [
                  {
                    29: {
                      account_type_id: 8,
                      category_id: 29,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Opening Balance Equity",
                      account_type: "Equity ",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                  {
                    30: {
                      account_type_id: 8,
                      category_id: 30,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Retained Earnings",
                      account_type: "Equity ",
                      parent: 0,
                      sub_categories: [
                        {
                          124: {
                            account_type_id: 8,
                            category_id: 124,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Test Account 1",
                            account_type: "Equity ",
                            parent: 30,
                          },
                          228: {
                            account_type_id: 8,
                            category_id: 228,
                            total_amount: 0,
                            date_array: ["Jul 01-2020 - Jul 31, 2020"],
                            amount_array: [0],
                            date_string_array: [
                              {
                                start: "2020-07-01T00:00:00.000Z",
                                end: "2020-07-31T23:59:59.000Z",
                                date_string: "Jul 01-2020 - Jul 31, 2020",
                              },
                            ],
                            category_name: "Durai",
                            account_type: "Equity ",
                            parent: 30,
                          },
                        },
                      ],
                    },
                  },
                  {
                    31: {
                      account_type_id: 8,
                      category_id: 31,
                      total_amount: 0,
                      date_array: ["Jul 01-2020 - Jul 31, 2020"],
                      amount_array: [0],
                      date_string_array: [
                        {
                          start: "2020-07-01T00:00:00.000Z",
                          end: "2020-07-31T23:59:59.000Z",
                          date_string: "Jul 01-2020 - Jul 31, 2020",
                        },
                      ],
                      category_name: "Share capital",
                      account_type: "Equity ",
                      parent: 0,
                      sub_categories: [{}],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    };

    if (response.status === 1) {
      var arrayOfElements = [];
      var numberOfColumns = [];
      var dateList = [];

      for (let category in response.details) {
        if (response.details.hasOwnProperty(category)) {
          numberOfColumns = response.details[category].date_array.length;
          dateList = response.details[category].date_array;
          arrayOfElements.push(response.details[category]);
        }
      }
      this.setState({
        balance_sheet_data: response.details,
        dateList: dateList,
        bankbalance: response.bank_balance,
        total_assets: isNaN(Number(response.total_assets))
          ? 0
          : Number(response.total_assets).toFixed(2),
        total_liabilities: isNaN(Number(response.total_liabilities))
          ? 0
          : Number(response.total_liabilities).toFixed(2),
        total_equity: isNaN(Number(response.total_equity) ? 0.00 : Number(response.total_equity).toFixed(2)),
        reportObject: arrayOfElements,
        loading: false,
      });
    } else {
      this.setState({
        balance_sheet_data: "",
        dateList: dateList,
        bankbalance: response.bank_balance,
        total_assets: response.total_assets,
        total_liabilities: response.total_liabilities,
        total_equity: response.total_equity,
        reportObject: [],
        loading: false,
      });
    }
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
    this.setState({ result_array: result }, () => {
      this.callAPIDATA();
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
    } else {
      this.setState({ selectedFil: 0 });
    }
  };

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true }); //DidUpdate
  }

  customRadioChange4 = (x) => {
    this.setState({ valueAmount_type4: x },
      () => {
        this.callAPIDATA();
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

    // alert(2>-8)
    this.show_columnslist();

    this.get_currencies(); //didMount
    this.get_vendorNames();

    this.customer_type();
    this.paymentTerms();
    this.all_report_name();
    // this.changedatevalue("This Year");
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
    // this.callAPIDATA();

    if (localStorage.getItem('fiscal_start_year') != '' && localStorage.getItem('fiscal_start_year') != null && localStorage.getItem('fiscal_start_year') != undefined) {
      let start = moment(localStorage.getItem('fiscal_start_year')).format("DD-MM-YYYY");
      let end = moment(localStorage.getItem('fiscal_end_year')).format("DD-MM-YYYY");
      this.setState({ start_date: localStorage.getItem('fiscal_start_year'), end_date: localStorage.getItem('fiscal_end_year') });
      document.getElementById("fromdate").value = start;
      document.getElementById("todate").value = end;
      setTimeout(() => {
        // alert(this.state.start_date,this.state.end_date)
        this.callAPIDATA();
      }, 300);
    
    } else {

    document.getElementById("fromdate").value = moment(
      this.state.startDate
    ).format("DD/MM/YYYY");
    document.getElementById("todate").value = moment()
      .endOf("month")
      .format("DD/MM/YYYY");

    setTimeout(() => {
      var start_date = moment().startOf("month").format("YYYY-MM-DD");
      var end_date = moment().endOf("month").format("YYYY-MM-DD");
      this.setState(
        {
          start_date: start_date,
          end_date: end_date,
        },
        () => {
          console.log(
            "stat date" +
            this.state.start_date +
            "==============end" +
            this.state.end_date
          );
          this.callAPIDATA();
        }
      );
    }, 100);

      // this.setState({ date_range: "All" })
      // this.changedatevalue("All")
    };

  };
  componentWillMount() {
    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  }

  selected_item = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    let show_columns = optionElement.getAttribute("data-id");
    this.setState({ show_columns: show_columns }, () => {
      this.callAPIDATA();
    });
  };

  slected_itemid = (id) => {
    //alert(id);
  };
  // changedatevalue(seleteddateformat) {
  //   var dateresult = moment();
  //   let from_date, to_date;

  //   if (seleteddateformat === "ALL") {
  //     from_date = dateresult.startOf("month");
  //     document.getElementById("fromdate").value = from_date.format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.start_date = '1970-01-01';
  //     document.getElementById("todate").value = moment(new Date()).format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.end_date =  '3000-01-01';
  //     this.callAPIDATA();
  //   }

  //   if (seleteddateformat === "This Month-to-date") {
  //     from_date = dateresult.startOf("month");
  //     document.getElementById("fromdate").value = from_date.format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     document.getElementById("todate").value = moment(new Date()).format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
  //     this.callAPIDATA();
  //   } else if (seleteddateformat === "This Week") {
  //     from_date = dateresult.startOf("week");
  //     document.getElementById("fromdate").value = from_date.format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     console.log("startdate", this.state.start_date);
  //     to_date = dateresult.endOf("week");
  //     document.getElementById("todate").value = to_date.format("YYYY-MM-DD");
  //     this.state.end_date = to_date.format("YYYY-MM-DD");
  //     this.callAPIDATA();
  //   } else if (seleteddateformat === "This Month") {
  //     from_date = dateresult.startOf("month");
  //     document.getElementById("fromdate").value = from_date.format(
  //       "YYYY-MM-DD"
  //     );

  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     to_date = dateresult.endOf("month");
  //     document.getElementById("todate").value = to_date.format("YYYY-MM-DD");
  //     this.state.end_date = to_date.format("YYYY-MM-DD");
  //     this.callAPIDATA();
  //   } else if (seleteddateformat === "This Week-to-date") {
  //     from_date = dateresult.startOf("week");
  //     document.getElementById("fromdate").value = from_date.format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     document.getElementById("todate").value = moment(new Date()).format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
  //     this.callAPIDATA();
  //   } else if (seleteddateformat === "This Year") {
  //     from_date = dateresult.startOf("year");
  //     document.getElementById("fromdate").value = from_date.format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     to_date = dateresult.endOf("year");
  //     document.getElementById("todate").value = to_date.format("YYYY-MM-DD");
  //     this.state.end_date = to_date.format("YYYY-MM-DD");
  //     this.callAPIDATA();
  //   } else if (seleteddateformat === "This Year-to-date") {
  //     from_date = dateresult.startOf("year");
  //     document.getElementById("fromdate").value = from_date.format(
  //       "YYYY-MM-DD"
  //     );
  //     this.state.start_date = from_date.format("YYYY-MM-DD");
  //     to_date = moment(new Date()).format("YYYY-MM-DD");
  //     document.getElementById("todate").value = to_date;
  //     this.state.end_date = to_date;
  //     this.callAPIDATA();
  //   }
  //   let startDate = jQuery("#fromdate").val();
  //   let end_date = jQuery("#todate").val();
  //   this.setState({ start_date: startDate, end_date: end_date }, () => {
  //     this.callAPIDATA();
  //   });
  // }
  changedatevalue(seleteddateformat) {
    var dateresult = moment();
    let from_date, to_date;
    this.setState({ date_range: seleteddateformat ,is_all_option: seleteddateformat == "All" ? 1 : 0})
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
    if (seleteddateformat == "All") {
      this.setState(
        { start_date: "1970-01-01", end_date: moment().add(10, 'years').format("YYYY-MM-DD") },
        () => {
          this.callAPIDATA();
        }
      );
      document.getElementById("fromdate").value = "";
      document.getElementById("todate").value = "";
    }
  }, 500);
  }
  // changefromDate(fromdate) {
  //   this.state.start_date = moment(fromdate).format("YYYY-MM-DD");
  //   this.callAPIDATA();
  // }
  changefromDate() {

    let date = jQuery("#fromdate").val();
    console.log('ksdfhu', date) 
    if (date !== undefined && date!='' && date.includes("/")) {
      jQuery("#fromdate").val(moment(date, "DD/MM/YYYY").format("DD-MM-YYYY"));
      var fomrat = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
      this.setState({ start_date: fomrat }, () => {
        // this.fetch_report()
        this.callAPIDATA();
      });
    } else if (date == '') {
      this.setState({ start_date: '' }, () => {
        this.callAPIDATA();
      });
    } else {

    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }
  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }
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
  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }
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
  // changetoDate(todate) {
  //   this.state.end_date = moment(todate).format("YYYY-MM-DD");
  //   this.callAPIDATA();
  // }
  changetoDate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate").val();

    if (date != undefined && date!=''&& date.includes("/")) {
      jQuery("#todate").val(moment(date, "DD/MM/YYYY").format("DD-MM-YYYY"));

      var fomrat = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
      this.setState({ end_date: fomrat }, () => {
        this.callAPIDATA();
      });
    }

    // this.state.end_date = moment(date).format('YYYY-MM-DD')
    //  alert(moment(todate).format('YYYY-MM-DD'))
  }

  callAPIDATA() {
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
    let { start_date, end_date, show_columns, sub_columns } = this.state;
    console.log("startkjxk date", start_date);
    console.log("Endlaksjkl date", end_date);
    // this.DummyData()

    FetchAllApi.getbalancesheet(
      this.state.start_date,
      this.state.end_date,
      show_columns,
      this.state.logged_client_id,
      sub_columns,
      filter_options,
      filter_id,
      this.state.selectedName,
      this.state.sort_type == "Ascending Order" ? 'asc' : 'desc',
      this.state.report_type,
      this.state.previous_period_from_date,
      this.state.previous_period_to_date,
      (err, response) => {
        if (response.status === 1) {
          var arrayOfElements = [];
          var numberOfColumns = [];
          var dateList = [];

          for (let category in response.details) {
            if (response.details.hasOwnProperty(category)) {
              numberOfColumns = response.details[category].date_array.length;
              dateList = response.details[category].date_array;
              arrayOfElements.push(response.details[category]);
            }
          }

          this.setState({
            balance_sheet_data: response.details,
            dateList: dateList,
            bankbalance: response.bank_balance,
            total_assets: response.total_assets,
            total_liabilities: response.total_liabilities,
            total_equity: response.total_equity,
            reportObject: arrayOfElements,
            loading: false,
            total_liabilities_and_equity_amount_array: response.total_liabilities_and_equity_amount_array,
            total_asset_amount_array: response.total_asset_amount_array
          });
        } else {
          this.setState({
            balance_sheet_data: "",
            dateList: dateList,
            bankbalance: response.bank_balance,
            total_assets: response.total_assets,
            total_liabilities: response.total_liabilities,
            total_equity: response.total_equity,
            reportObject: [],
            loading: false,
            total_liabilities_and_equity_amount_array: response.total_liabilities_and_equity_amount_array,
            total_asset_amount_array: response.total_asset_amount_array
          });
        }
      }
    );
  }
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

  render() {
    console.log("hfhfhfhfhfh", this.state.reportObject);
    let balance_sheet_data = this.state.balance_sheet_data;
    let total = 0;
    let total1 = 0;

    let first_value_amt = 0




    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />

            {/* MainContent Wrapper Starts here */}
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
                  <li>Balance Sheet</li>
                </ul>

                {/* <span className="page-title hidden-xs">Balance Sheet</span> */}

                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>

              <div className="col-md-12 col-xs-12 mar-top visible-xs">
                <a href="javascript:;" className="back">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <span className="page-title">Balance Sheet</span>
              </div>
              {/* content-top Starts here */}
              <div className="content-top col-md-12 col-xs-12">
                <h4 className="fw-sbold mar-t-no">Balance Sheet</h4>
                <h5 className="fw-sbold">
                  {/* {moment(new Date()).format("MMM YYYY")} */}
                </h5>
                <div className="row snippet-row">
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet active">
                      <div>
                        <small>Bank Balance</small>
                        <span className="value">
                          {this.state.home_currency_symbol} <Comma value={this.state.bankbalance} />
                        </span>
                        <img
                          className="snippet-arrow visible-lg"
                          src="images/snippet-arrow.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet">
                      <div>
                        <small>Total Assets</small>
                        <span className="value">
                          {this.state.home_currency_symbol}  <Comma value={this.state.total_assets} />
                        </span>
                        <img
                          className="snippet-arrow visible-lg"
                          src="images/snippet-arrow.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet">
                      <div>
                        <small>Total Equity</small>
                        <span className="value">
                          {this.state.home_currency_symbol}  <Comma value={this.state.total_equity} />
                        </span>
                        <img
                          className="snippet-arrow visible-lg"
                          src="images/snippet-arrow.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet">
                      <div>
                        <small>Total Liabilities</small>
                        <span className="value">
                          {this.state.home_currency_symbol}  <Comma value={this.state.total_liabilities} />
                        </span>
                        <img
                          className="snippet-arrow visible-lg"
                          src="images/snippet-arrow.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-content col-md-12 col-xs-12">
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
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
                            // onChange={(e) => {
                            //   alert(e.target.value);
                            // }}
                            onBlur={(e) => {
                              let value = e.target.value
                              this.setState({date_range: "Custom"})
                              setTimeout(() => {
                                jQuery("#custom").val("Custom");
                                this.changefromDate(value);
                              }, 500)
                            }}
                            className="form-control"
                            autoComplete="off"
                          />
                          <div className="input-group-addon" onClick={() => jQuery('#fromdate').focus()} >
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
                            className="form-control"
                            autoComplete="off"
                          />
                          <div className="input-group-addon" onClick={() => jQuery('#todate').focus()} >
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
                          this.callAPIDATA();
                        }}
                      >
                        <img
                          src="images/refresh.svg"
                          style={{ width: "20px" }}
                        />
                      </a>
                    </form>
                    {/* 
                    <div className="pull-right">
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
                                          this.setState({ report_type: 1 }, () => this.callAPIDATA())
                                        }
                                      }}
                                    />{" "}
                                    Accural
                                    <span className="checkmark" />
                                  </label>
                                  <label className="custom-checkbox radio">
                                    <input type="radio" name="tax-item"
                                      checked={this.state.report_type == 2 ? true : false}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          this.setState({ report_type: 2 }, () => this.callAPIDATA())
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
                                  <label className="fw-sbold">
                                    Show Columns
                                  </label>
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
                                        let a = this.state.sort_type == "Descending Order" ? "Ascending Order" : "Descending Order";
                                        this.setState({ sort_type: a });
                                        setTimeout(() => {
                                          if (this.state.selectedName != "") {
                                            this.callAPIDATA();
                                          }
                                        }, 500)
                                      }}
                                    >
                                      {this.state.sort_type == "Descending Order" ? "Ascending Order" : "Descending Order"}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-8 col-md-12 pad-r-no">
                          <div className="row">
                            <div className="form-group col-md-12 col-xs-12">
                              <label className="fw-sbold mar-rgt">
                                Add Subcolumns
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
                                /> % of Total Assets
                                <span className="checkmark" />
                              </label>
                              <label className="custom-checkbox mar-rgt">
                                <input type="checkbox" name checked={this.state.column}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      this.setState({ column: true })
                                    } else {
                                      this.setState({ column: false })
                                    }
                                  }} /> % of Total Liability
                                <span className="checkmark" />
                              </label>
                              <label className='custom-checkbox mar-rgt'>
                                <input type='checkbox' name checked={this.state.income}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      this.setState({ income: true })
                                    } else {
                                      this.setState({ income: false })
                                    }
                                  }} /> % of Total Equity / Net Assets  {/* % of income*/}
                                <span className='checkmark' />
                              </label>
                              {/* <label className='custom-checkbox'>
                                <input type='checkbox' name checked={this.state.expense}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      this.setState({ expense: true })
                                    } else {
                                      this.setState({ expense: false })
                                    }
                                  }} /> % of Expense
                                <span className='checkmark' />
                              </label> */}
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
                                        this.setState({ previous_period: true, previous_year: false, year_to_date: false, previous_period_cad: false, previous_period_change: false, sub_columns: [1] }, () => this.callAPIDATA())
                                      } else {
                                        this.setState({ previous_period: false, previous_period_cad: false, previous_period_change: false, sub_columns: [] }, () => this.callAPIDATA())
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
                                        this.setState({ previous_period: false, previous_year: true, year_to_date: false, previous_year_cad: false, previous_year_change: false, sub_columns: [4] }, () => this.callAPIDATA())
                                      } else {
                                        this.setState({ previous_year: false, previous_year_cad: false, previous_year_change: false, sub_columns: [] }, () => this.callAPIDATA())
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
                                      onChange={(e) =>
                                        this.selectedVendorIds(e)
                                      }
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
                                        this.changefromDate_duedate(
                                          value
                                        )
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
                                  <div className="input-group-addon" onClick={() => jQuery('#todate_duedate').focus()} >
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
                                  <div className="input-group-addon" onClick={() => jQuery('#fromdate1').focus()} >
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
                                  <div className="input-group-addon" onClick={() => jQuery('#todate1').focus()} >
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
                      </form>
                    </div>
                  </div>

                  <div className="report-table">
                    <div className="table-responsive" id="sticky-tb-hdr">
                      <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        visible={this.state.loading}
                      />
                      {!this.state.loading && (
                        <table className="table">
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              {
                                /*add the new table headers based on the filter*/
                                this.state.dateList !== undefined &&
                                this.state.dateList &&
                                this.state.dateList !== undefined &&
                                this.state.dateList.map((date, index) => {
                                  return (
                                    <React.Fragment>
                                      <th
                                        className="text-right"
                                      // style={{
                                      //   position: "sticky",
                                      //   top: "0.25rem",
                                      // }}
                                      >
                                        {date}
                                        <i className="th-sort">
                                          <img
                                            src="../images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>
                                      {this.state.row && <th className="text-right" >
                                        % of Total assets
                                        <i className="th-sort">
                                          <img
                                            src="../images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>

                                      }
                                      {this.state.column && <th className="text-right" >
                                        % of Total liability
                                        <i className="th-sort">
                                          <img
                                            src="../images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>

                                      }
                                      {this.state.income && <th className="text-right" >
                                        % of Total equity / Net assets
                                        <i className="th-sort">
                                          <img
                                            src="../images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>

                                      }
                                      {/* {this.state.expense && <th className="text-right" >
                                        % of Expense
                                        <i className="th-sort">
                                          <img
                                            src="../images/sort-icon.svg"
                                            alt="SortIcon"
                                          />
                                        </i>
                                      </th>

                                      } */}
                                      { (index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
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
                                      { (index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
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
                                      { (index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                        <th className="text-right" >
                                          CAD Change
                                          <i className="th-sort">
                                            <img
                                              src="../images/sort-icon.svg"
                                              alt="SortIcon"
                                            />
                                          </i>
                                        </th>
                                      }
                                      { (index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
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
                                      { (index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                        <th className="text-right" >
                                          % YTD
                                          <i className="th-sort">
                                            <img
                                              src="../images/sort-icon.svg"
                                              alt="SortIcon"
                                            />
                                          </i>
                                        </th>
                                      }
                                    </React.Fragment>
                                  );
                                })
                              }

                            </tr>
                          </thead>
                          <tbody>
                            {/* {console.log("1234",Object.values(this.state.balance_sheet_data)
                            )} */}

                            <tr className="title-1">
                              <td
                                style={{ position: "sticky", left: "0.25rem",backgroundColor: "#EFEFFF" }}
                              >
                                Assets
                              </td>

                              {
                                this.state.dateList !== undefined &&
                                this.state.dateList.map((date, index) => {
                                  return (
                                    <>
                                      <td>{""}</td>
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
                                  )
                                })
                              }


                            </tr>

                            {Object.values(this.state.balance_sheet_data) &&
                              Object.values(this.state.balance_sheet_data).map(
                                (parentCategory, index) => {
                                  if (
                                    parentCategory.account_type ==
                                    "Non-current assets"
                                  ) {
                                    return (
                                      <>
                                        <tr className="item-step1 sub-title">
                                          <td
                                            style={{
                                              position: "sticky",
                                              left: "0.25rem",backgroundColor: "#EFEFFF"
                                            }}
                                          >
                                            <div>
                                              {parentCategory.account_type}
                                            </div>
                                          </td>
                                          {
                                            /*add the new table headers based on the filter*/
                                            this.state.dateList !== undefined &&
                                            this.state.dateList.map(
                                              (date, index) => {
                                                return (
                                                  <>
                                                    <td><div></div> </td>
                                                    {this.state.row && <td><div></div> </td>}
                                                    {this.state.column && <td><div></div> </td>}
                                                    {this.state.income && <td><div></div> </td>}
                                                    {this.state.expense && <td><div></div> </td>}
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                      <td><div></div> </td>
                                                    }
                                                  </>
                                                );
                                              }
                                            )
                                          }

                                        </tr>
                                        {console.log(parentCategory.total_amount !== 0,parentCategory)}
                                        {parentCategory.total_amount !== 0 && this.repeat(parentCategory.sub_categories, 45)}

                                        <tr className="item-step1 istep-2 title1">
                                          <td>
                                            <span>
                                              Total{" "}
                                              {parentCategory.account_type}
                                            </span>
                                          </td>
                                          {parentCategory.amount_array &&
                                            parentCategory.amount_array.map(
                                              (total, i) => {

                                                // % row 
                                                let first_value = total
                                                let second_value = Number(this.state.total_assets)
                                                // let second_value = this.row(parentCategory.amount_array)
                                                let row

                                                if (first_value == 0 && second_value != 0) {
                                                  row = 0.00
                                                } else if (first_value != 0 && second_value == 0) {
                                                  row = 100.00
                                                } else if (first_value == 0 && second_value == 0) {
                                                  row = 0.00
                                                } else {
                                                  // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                                                  row = ((total) / (Number(this.state.total_assets))) * 100
                                                }
                                                // % row 

                                                // % column

                                                let first_value_col = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_col = this.state.total_liabilities
                                                let column

                                                if (first_value_col == 0 && second_value_col != 0) {
                                                  column = 0.00
                                                } else if (first_value_col != 0 && second_value_col == 0) {
                                                  column = 100.00
                                                } else if (first_value_col == 0 && second_value_col == 0) {
                                                  column = 0.00
                                                } else {
                                                  // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                                                  column = (total / Number(this.state.total_liabilities)) * 100
                                                }

                                                // % column

                                                // % income

                                                let first_value_inc = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_inc = this.state.total_equity
                                                let income

                                                if (first_value_inc == 0 && second_value_inc != 0) {
                                                  income = 0.00
                                                } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                  income = 100.00
                                                } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                  income = 0.00
                                                } else {
                                                  income = (total / Number(this.state.total_equity)) * 100
                                                }

                                                // % income

                                                // Amount change
                                                let change
                                                if ((i + 1) % 2 == 0) {
                                                  change = parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]
                                                }
                                                // Amount change


                                                // % change
                                                let per_change
                                                if ((i + 1) % 2 == 0) {

                                                  let first_value_per = change
                                                  let second_value_per = parentCategory.amount_array[i]


                                                  if (first_value_per == 0 && second_value_per != 0) {
                                                    per_change = 0.00
                                                  } else if (first_value_per != 0 && second_value_per == 0) {
                                                    per_change = 100.00
                                                  } else if (first_value_per == 0 && second_value_per == 0) {
                                                    per_change = 0.00
                                                  } else {
                                                    per_change = (change / parentCategory.amount_array[i]) * 100
                                                  }


                                                  // per_change = ((parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]) / parentCategory.amount_array[i]) * 100
                                                }
                                                // % change


                                                return (
                                                  <>
                                                    <td onDoubleClick={() => { this.goToBreak("non_current_assets") }}>
                                                      <span className="text-right">
                                                        {" "}
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
                                                    {this.state.expense && <td className="text-right" ><span>000</span> </td>}
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
                                      </>
                                    );
                                  }
                                }
                              )}



                            {Object.values(this.state.balance_sheet_data) &&
                              Object.values(this.state.balance_sheet_data).map(
                                (parentCategory, index) => {
                                  if (
                                    parentCategory.account_type ==
                                    'Current assets'
                                  ) {
                                    return (
                                      <>
                                        <tr className="item-step1 sub-title">
                                          <td
                                            style={{
                                              position: "sticky",
                                              left: "0.25rem",backgroundColor: "#EFEFFF"
                                            }}
                                          >
                                            <div>
                                              {parentCategory.account_type}
                                            </div>
                                          </td>
                                          {
                                            /*add the new table headers based on the filter*/
                                            this.state.dateList !== undefined &&
                                            this.state.dateList.map(
                                              (date, index) => {
                                                return (
                                                  <>
                                                    <td>
                                                      <div></div>
                                                    </td>
                                                    {this.state.row && <td><div></div> </td>}
                                                    {this.state.column && <td><div></div> </td>}
                                                    {this.state.income && <td><div></div> </td>}
                                                    {this.state.expense && <td><div></div> </td>}
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                      <td><div></div> </td>
                                                    }
                                                  </>
                                                );
                                              }
                                            )
                                          }


                                        </tr>
                                        {console.log(parentCategory.total_amount !== 0,parentCategory)}
                                        {parentCategory.total_amount !== 0 && this.repeat(parentCategory.sub_categories, 45)}

                                        <tr className="item-step1 istep-2 title1">
                                          <td>
                                            <span>
                                              Total{" "}
                                              {parentCategory.account_type}
                                            </span>
                                          </td>
                                          {parentCategory.amount_array &&
                                            parentCategory.amount_array.map(
                                              (total, i) => {
                                                // % row 
                                                let first_value = total
                                                let second_value = Number(this.state.total_assets)
                                                // let second_value = this.row(parentCategory.amount_array)
                                                let row

                                                if (first_value == 0 && second_value != 0) {
                                                  row = 0.00
                                                } else if (first_value != 0 && second_value == 0) {
                                                  row = 100.00
                                                } else if (first_value == 0 && second_value == 0) {
                                                  row = 0.00
                                                } else {
                                                  // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                                                  row = ((total) / (Number(this.state.total_assets))) * 100
                                                }
                                                // % row 

                                                // % column

                                                let first_value_col = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_col = this.state.total_liabilities
                                                let column

                                                if (first_value_col == 0 && second_value_col != 0) {
                                                  column = 0.00
                                                } else if (first_value_col != 0 && second_value_col == 0) {
                                                  column = 100.00
                                                } else if (first_value_col == 0 && second_value_col == 0) {
                                                  column = 0.00
                                                } else {
                                                  // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                                                  column = (total / Number(this.state.total_liabilities)) * 100
                                                }

                                                // % column

                                                // % income

                                                let first_value_inc = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_inc = this.state.total_equity
                                                let income

                                                if (first_value_inc == 0 && second_value_inc != 0) {
                                                  income = 0.00
                                                } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                  income = 100.00
                                                } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                  income = 0.00
                                                } else {
                                                  income = (total / Number(this.state.total_equity)) * 100
                                                }

                                                // % income


                                                // Amount change
                                                let change
                                                if ((i + 1) % 2 == 0) {
                                                  change = parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]
                                                }
                                                // Amount change


                                                // % change
                                                let per_change
                                                if ((i + 1) % 2 == 0) {


                                                  let first_value_per = change
                                                  let second_value_per = parentCategory.amount_array[i]


                                                  if (first_value_per == 0 && second_value_per != 0) {
                                                    per_change = 0.00
                                                  } else if (first_value_per != 0 && second_value_per == 0) {
                                                    per_change = 100.00
                                                  } else if (first_value_per == 0 && second_value_per == 0) {
                                                    per_change = 0.00
                                                  } else {
                                                    per_change = (change / parentCategory.amount_array[i]) * 100
                                                  }


                                                  // per_change = ((parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]) / parentCategory.amount_array[i]) * 100

                                                }
                                                // % change


                                                return (
                                                  <>
                                                    <td onDoubleClick={() => { this.goToBreak("current_assets") }}>
                                                      <span className="text-right">
                                                        {" "}
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
                                                    {this.state.expense && <td className="text-right" ><span>000</span> </td>}
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
                                      </>
                                    );
                                  }
                                }
                              )}



                            <tr className="item-step1 title1 bdr-no">
                              <td>
                                <span>Total Assets</span>
                              </td>
                              {
                                /*add the new table headers based on the filter*/
                                this.state.total_asset_amount_array !== undefined &&
                                this.state.total_asset_amount_array.map((total, index) => {
                                  // % row 
                                  let first_value = total
                                  let second_value = Number(this.state.total_assets)
                                  // let second_value = this.row(parentCategory.amount_array)
                                  let row

                                  if (first_value == 0 && second_value != 0) {
                                    row = 0.00
                                  } else if (first_value != 0 && second_value == 0) {
                                    row = 100.00
                                  } else if (first_value == 0 && second_value == 0) {
                                    row = 0.00
                                  } else {
                                    // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                                    row = ((total) / (Number(this.state.total_assets))) * 100
                                  }
                                  // % row 

                                  // % column

                                  let first_value_col = total
                                  // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                  let second_value_col = this.state.total_liabilities
                                  let column

                                  if (first_value_col == 0 && second_value_col != 0) {
                                    column = 0.00
                                  } else if (first_value_col != 0 && second_value_col == 0) {
                                    column = 100.00
                                  } else if (first_value_col == 0 && second_value_col == 0) {
                                    column = 0.00
                                  } else {
                                    // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                                    column = (total / Number(this.state.total_liabilities)) * 100
                                  }

                                  // % column

                                  // % income

                                  let first_value_inc = total
                                  // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                  let second_value_inc = this.state.total_equity
                                  let income

                                  if (first_value_inc == 0 && second_value_inc != 0) {
                                    income = 0.00
                                  } else if (first_value_inc != 0 && second_value_inc == 0) {
                                    income = 100.00
                                  } else if (first_value_inc == 0 && second_value_inc == 0) {
                                    income = 0.00
                                  } else {
                                    income = (total / Number(this.state.total_equity)) * 100
                                  }

                                  // % income


                                  // Amount change
                                  let change
                                  if ((index + 1) % 2 == 0) {
                                    change = this.state.total_asset_amount_array[index - 1] - this.state.total_asset_amount_array[index]
                                  }
                                  // Amount change


                                  // % change
                                  let per_change
                                  if ((index + 1) % 2 == 0) {


                                    let first_value_per = change
                                    let second_value_per = this.state.total_asset_amount_array[index]


                                    if (first_value_per == 0 && second_value_per != 0) {
                                      per_change = 0.00
                                    } else if (first_value_per != 0 && second_value_per == 0) {
                                      per_change = 100.00
                                    } else if (first_value_per == 0 && second_value_per == 0) {
                                      per_change = 0.00
                                    } else {
                                      per_change = (change / this.state.total_asset_amount_array[index]) * 100
                                    }

                                    // per_change = ((this.state.total_asset_amount_array[index - 1] - this.state.total_asset_amount_array[index]) / this.state.total_asset_amount_array[index]) * 100

                                  }
                                  // % change


                                  return (
                                    <>
                                      <td onDoubleClick={() => { this.goToBreak("assets") }}>
                                        <span className="text-right">{
                                          (new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                            { style: 'currency', currency: this.state.home_currency }).format(first_value)).replace(this.state.home_currency_symbol, '')
                                          //  isNaN(Number(this.state.total_assets)) ? 0 : Number(this.state.total_assets).toFixed(2)
                                        }
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
                                      {this.state.expense && <td className="text-right" ><span>000</span> </td>}
                                      {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                        <td className="text-right" ><span>
                                          {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                            { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                        </span> </td>}

                                      {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                        <td className="text-right" ><span>
                                          {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                            { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                        </span> </td>}

                                      {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                        <td className="text-right" ><span>000</span> </td>}

                                      {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                        <td className="text-right" ><span>000</span> </td>}

                                      {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                        <td className="text-right" ><span>000</span> </td>}

                                    </>


                                  );
                                })
                              }


                            </tr>



                            {/* liability area */}

                            <tr className="title-1">
                              <td
                                style={{ position: "sticky", left: "0.25rem",backgroundColor: "#EFEFFF" }}
                              >
                                Equity & Liabilities
                              </td>

                              {
                                this.state.dateList !== undefined &&
                                this.state.dateList.map((date, index) => {
                                  return (<>
                                    <td>{""}</td>
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
                                  )
                                })
                              }


                            </tr>

                            {Object.values(this.state.balance_sheet_data) &&
                              Object.values(this.state.balance_sheet_data).map(
                                (parentCategory, index) => {
                                  if (
                                    parentCategory.account_type ==
                                    'Equity'
                                  ) {
                                    return (
                                      <>
                                        <tr className="item-step1 sub-title">
                                          <td
                                            style={{
                                              position: "sticky",
                                              left: "0.25rem",backgroundColor: "#EFEFFF"
                                            }}
                                          >
                                            <div>
                                              {parentCategory.account_type}
                                            </div>
                                          </td>
                                          {
                                            /*add the new table headers based on the filter*/
                                            this.state.dateList !== undefined &&
                                            this.state.dateList.map(
                                              (date, index) => {
                                                return (
                                                  <>
                                                    <td>
                                                      <div></div>
                                                    </td>
                                                    {this.state.row && <td><div></div> </td>}
                                                    {this.state.column && <td><div></div> </td>}
                                                    {this.state.income && <td><div></div> </td>}
                                                    {this.state.expense && <td><div></div> </td>}
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                      <td><div></div> </td>
                                                    }
                                                  </>
                                                );
                                              }
                                            )
                                          }

                                        </tr>
                                        {console.log(parentCategory.total_amount !== 0,parentCategory)}
                                        {parentCategory.total_amount !== 0 && this.repeat(parentCategory.sub_categories, 45)}

                                        <tr className="item-step1 istep-2 title1">
                                          <td>
                                            <span>
                                              Total{" "}
                                              {parentCategory.account_type}
                                            </span>
                                          </td>
                                          {parentCategory.amount_array &&
                                            parentCategory.amount_array.map(
                                              (total, i) => {
                                                // % row 
                                                let first_value = total
                                                let second_value = Number(this.state.total_assets)
                                                // let second_value = this.row(parentCategory.amount_array)
                                                let row

                                                if (first_value == 0 && second_value != 0) {
                                                  row = 0.00
                                                } else if (first_value != 0 && second_value == 0) {
                                                  row = 100.00
                                                } else if (first_value == 0 && second_value == 0) {
                                                  row = 0.00
                                                } else {
                                                  // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                                                  row = ((total) / (Number(this.state.total_assets))) * 100
                                                }
                                                // % row 

                                                // % column

                                                let first_value_col = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_col = this.state.total_liabilities
                                                let column

                                                if (first_value_col == 0 && second_value_col != 0) {
                                                  column = 0.00
                                                } else if (first_value_col != 0 && second_value_col == 0) {
                                                  column = 100.00
                                                } else if (first_value_col == 0 && second_value_col == 0) {
                                                  column = 0.00
                                                } else {
                                                  // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                                                  column = (total / Number(this.state.total_liabilities)) * 100
                                                }

                                                // % column

                                                // % income

                                                let first_value_inc = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_inc = this.state.total_equity
                                                let income

                                                if (first_value_inc == 0 && second_value_inc != 0) {
                                                  income = 0.00
                                                } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                  income = 100.00
                                                } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                  income = 0.00
                                                } else {
                                                  income = (total / Number(this.state.total_equity)) * 100
                                                }

                                                // % income



                                                // Amount change
                                                let change
                                                if ((i + 1) % 2 == 0) {
                                                  change = parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]
                                                }
                                                // Amount change


                                                // % change
                                                let per_change
                                                if ((i + 1) % 2 == 0) {



                                                  let first_value_per = change
                                                  let second_value_per = parentCategory.amount_array[i]


                                                  if (first_value_per == 0 && second_value_per != 0) {
                                                    per_change = 0.00
                                                  } else if (first_value_per != 0 && second_value_per == 0) {
                                                    per_change = 100.00
                                                  } else if (first_value_per == 0 && second_value_per == 0) {
                                                    per_change = 0.00
                                                  } else {
                                                    per_change = (change / parentCategory.amount_array[i]) * 100
                                                  }



                                                  // per_change = ((parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]) / parentCategory.amount_array[i]) * 100

                                                }
                                                // % change



                                                return (
                                                  <>
                                                    <td onDoubleClick={() => { this.goToBreak("equity") }}>
                                                      <span className="text-right">
                                                        {" "}
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
                                                    {this.state.expense && <td className="text-right" ><span>000</span> </td>}
                                                    {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                      <td className="text-right" ><span>
                                                        {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                          { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}</span> </td>
                                                    }
                                                    {(i + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                      <td className="text-right" ><span>
                                                        {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                          { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}</span> </td>
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
                                      </>
                                    );
                                  }
                                }
                              )}



                            {Object.values(this.state.balance_sheet_data) &&
                              Object.values(this.state.balance_sheet_data).map(
                                (parentCategory, index) => {
                                  if (
                                    parentCategory.account_type ==
                                    "Non-current liablities "
                                  ) {
                                    return (
                                      <>
                                        <tr className="item-step1 sub-title">
                                          <td
                                            style={{
                                              position: "sticky",
                                              left: "0.25rem",backgroundColor: "#EFEFFF"
                                            }}
                                          >
                                            <div>
                                              {parentCategory.account_type}
                                            </div>
                                          </td>
                                          {
                                            /*add the new table headers based on the filter*/
                                            this.state.dateList !== undefined &&
                                            this.state.dateList.map(
                                              (date, index) => {
                                                return (
                                                  <>
                                                    <td>
                                                      <div></div>
                                                    </td>
                                                    {this.state.row && <td><div></div> </td>}
                                                    {this.state.column && <td><div></div> </td>}
                                                    {this.state.income && <td><div></div> </td>}
                                                    {this.state.expense && <td><div></div> </td>}
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                      <td><div></div> </td>
                                                    }
                                                  </>
                                                );
                                              }
                                            )
                                          }



                                        </tr>
                                        {console.log(parentCategory.total_amount !== 0,parentCategory)}
                                        {parentCategory.total_amount !== 0 && this.repeat(parentCategory.sub_categories, 45)}

                                        <tr className="item-step1 istep-2 title1">
                                          <td>
                                            <span>
                                              Total{" "}
                                              {parentCategory.account_type}
                                            </span>
                                          </td>
                                          {parentCategory.amount_array &&
                                            parentCategory.amount_array.map(
                                              (total, i) => {
                                                // % row 
                                                let first_value = total
                                                let second_value = Number(this.state.total_assets)
                                                // let second_value = this.row(parentCategory.amount_array)
                                                let row

                                                if (first_value == 0 && second_value != 0) {
                                                  row = 0.00
                                                } else if (first_value != 0 && second_value == 0) {
                                                  row = 100.00
                                                } else if (first_value == 0 && second_value == 0) {
                                                  row = 0.00
                                                } else {
                                                  // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                                                  row = ((total) / (Number(this.state.total_assets))) * 100
                                                }
                                                // % row 

                                                // % column

                                                let first_value_col = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_col = this.state.total_liabilities
                                                let column

                                                if (first_value_col == 0 && second_value_col != 0) {
                                                  column = 0.00
                                                } else if (first_value_col != 0 && second_value_col == 0) {
                                                  column = 100.00
                                                } else if (first_value_col == 0 && second_value_col == 0) {
                                                  column = 0.00
                                                } else {
                                                  // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                                                  column = (total / Number(this.state.total_liabilities)) * 100
                                                }

                                                // % column

                                                // % income

                                                let first_value_inc = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_inc = this.state.total_equity
                                                let income

                                                if (first_value_inc == 0 && second_value_inc != 0) {
                                                  income = 0.00
                                                } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                  income = 100.00
                                                } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                  income = 0.00
                                                } else {
                                                  income = (total / Number(this.state.total_equity)) * 100
                                                }

                                                // % income


                                                // Amount change
                                                let change
                                                if ((i + 1) % 2 == 0) {
                                                  change = parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]
                                                }
                                                // Amount change


                                                // % change
                                                let per_change
                                                if ((i + 1) % 2 == 0) {



                                                  let first_value_per = change
                                                  let second_value_per = parentCategory.amount_array[i]


                                                  if (first_value_per == 0 && second_value_per != 0) {
                                                    per_change = 0.00
                                                  } else if (first_value_per != 0 && second_value_per == 0) {
                                                    per_change = 100.00
                                                  } else if (first_value_per == 0 && second_value_per == 0) {
                                                    per_change = 0.00
                                                  } else {
                                                    per_change = (change / parentCategory.amount_array[i]) * 100
                                                  }


                                                  // per_change = ((parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]) / parentCategory.amount_array[i]) * 100

                                                }
                                                // % change



                                                return (
                                                  <>
                                                    <td onDoubleClick={() => { this.goToBreak("non_current_liabilities") }}>
                                                      <span className="text-right">
                                                        {" "}
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
                                                    {this.state.expense && <td className="text-right" ><span>000</span> </td>}
                                                    {(i + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                      <td className="text-right" ><span>
                                                        {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                          { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}</span> </td>
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
                                      </>
                                    );
                                  }
                                }
                              )}



                            {Object.values(this.state.balance_sheet_data) &&
                              Object.values(this.state.balance_sheet_data).map(
                                (parentCategory, index) => {
                                  if (
                                    parentCategory.account_type ==
                                    "Current liabilities "
                                  ) {
                                    return (
                                      <>
                                        <tr className="item-step1 sub-title">
                                          <td
                                            style={{
                                              position: "sticky",
                                              left: "0.25rem",backgroundColor: "#EFEFFF"
                                            }}
                                          >
                                            <div>
                                              {parentCategory.account_type}
                                            </div>
                                          </td>
                                          {
                                            /*add the new table headers based on the filter*/
                                            this.state.dateList !== undefined &&
                                            this.state.dateList.map(
                                              (date, index) => {
                                                return (
                                                  <>
                                                    <td>
                                                      <div></div>
                                                    </td>
                                                    {this.state.row && <td><div></div> </td>}
                                                    {this.state.column && <td><div></div> </td>}
                                                    {this.state.income && <td><div></div> </td>}
                                                    {this.state.expense && <td><div></div> </td>}
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                                      <td><div></div> </td>
                                                    }
                                                    {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                                      <td><div></div> </td>
                                                    }
                                                  </>
                                                );
                                              }
                                            )
                                          }


                                        </tr>
                                        {console.log(parentCategory.total_amount !== 0,parentCategory)}
                                        {parentCategory.total_amount !== 0 && this.repeat(parentCategory.sub_categories, 45)}

                                        <tr className="item-step1 istep-2 title1">
                                          <td >
                                            <span>
                                              Total{" "}
                                              {parentCategory.account_type}
                                            </span>
                                          </td>
                                          {parentCategory.amount_array &&
                                            parentCategory.amount_array.map(
                                              (total, i) => {
                                                // % row 
                                                let first_value = total
                                                let second_value = Number(this.state.total_assets)
                                                // let second_value = this.row(parentCategory.amount_array)
                                                let row

                                                if (first_value == 0 && second_value != 0) {
                                                  row = 0.00
                                                } else if (first_value != 0 && second_value == 0) {
                                                  row = 100.00
                                                } else if (first_value == 0 && second_value == 0) {
                                                  row = 0.00
                                                } else {
                                                  // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                                                  row = ((total) / (Number(this.state.total_assets))) * 100
                                                }
                                                // % row 

                                                // % column

                                                let first_value_col = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_col = this.state.total_liabilities
                                                let column

                                                if (first_value_col == 0 && second_value_col != 0) {
                                                  column = 0.00
                                                } else if (first_value_col != 0 && second_value_col == 0) {
                                                  column = 100.00
                                                } else if (first_value_col == 0 && second_value_col == 0) {
                                                  column = 0.00
                                                } else {
                                                  // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                                                  column = (total / Number(this.state.total_liabilities)) * 100
                                                }

                                                // % column

                                                // % income

                                                let first_value_inc = total
                                                // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                                let second_value_inc = this.state.total_equity
                                                let income

                                                if (first_value_inc == 0 && second_value_inc != 0) {
                                                  income = 0.00
                                                } else if (first_value_inc != 0 && second_value_inc == 0) {
                                                  income = 100.00
                                                } else if (first_value_inc == 0 && second_value_inc == 0) {
                                                  income = 0.00
                                                } else {
                                                  income = (total / Number(this.state.total_equity)) * 100
                                                }

                                                // % income



                                                // Amount change
                                                let change
                                                if ((i + 1) % 2 == 0) {
                                                  change = parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]
                                                }
                                                // Amount change


                                                // % change
                                                let per_change
                                                if ((i + 1) % 2 == 0) {


                                                  let first_value_per = change
                                                  let second_value_per = parentCategory.amount_array[i]


                                                  if (first_value_per == 0 && second_value_per != 0) {
                                                    per_change = 0.00
                                                  } else if (first_value_per != 0 && second_value_per == 0) {
                                                    per_change = 100.00
                                                  } else if (first_value_per == 0 && second_value_per == 0) {
                                                    per_change = 0.00
                                                  } else {
                                                    per_change = (change / parentCategory.amount_array[i]) * 100
                                                  }


                                                  // per_change = ((parentCategory.amount_array[i - 1] - parentCategory.amount_array[i]) / parentCategory.amount_array[i]) * 100

                                                }
                                                // % change



                                                return (
                                                  <>
                                                    <td onDoubleClick={() => { this.goToBreak("current_liabilities") }}>
                                                      <span className="text-right">
                                                        {" "}
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
                                                    {this.state.expense && <td className="text-right" ><span>000</span> </td>}
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
                                      </>
                                    );
                                  }
                                }
                              )}


                            <tr className="item-step1 title1 bdr-no">
                              <td>
                                <span>Total Equity &amp; Liabilities</span>
                              </td>
                              {
                                /*add the new table headers based on the filter*/
                                this.state.total_liabilities_and_equity_amount_array !== undefined &&
                                this.state.total_liabilities_and_equity_amount_array.map((total, index) => {

                                  // % row 
                                  let first_value = total
                                  let second_value = Number(this.state.total_assets)
                                  // let second_value = this.row(parentCategory.amount_array)
                                  let row

                                  if (first_value == 0 && second_value != 0) {
                                    row = 0.00
                                  } else if (first_value != 0 && second_value == 0) {
                                    row = 100.00
                                  } else if (first_value == 0 && second_value == 0) {
                                    row = 0.00
                                  } else {
                                    // row = ((total) / (this.row(parentCategory.amount_array))) * 100
                                    row = ((total) / (Number(this.state.total_assets))) * 100
                                  }
                                  // % row 

                                  // % column

                                  let first_value_col = total
                                  // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                  let second_value_col = this.state.total_liabilities
                                  let column

                                  if (first_value_col == 0 && second_value_col != 0) {
                                    column = 0.00
                                  } else if (first_value_col != 0 && second_value_col == 0) {
                                    column = 100.00
                                  } else if (first_value_col == 0 && second_value_col == 0) {
                                    column = 0.00
                                  } else {
                                    // column = (total / this.state.total_liabilities_and_equity_amount_array[i]) * 100 
                                    column = (total / Number(this.state.total_liabilities)) * 100
                                  }

                                  // % column

                                  // % income

                                  let first_value_inc = total
                                  // let second_value_col = this.state.total_liabilities_and_equity_amount_array[i]
                                  let second_value_inc = this.state.total_equity
                                  let income

                                  if (first_value_inc == 0 && second_value_inc != 0) {
                                    income = 0.00
                                  } else if (first_value_inc != 0 && second_value_inc == 0) {
                                    income = 100.00
                                  } else if (first_value_inc == 0 && second_value_inc == 0) {
                                    income = 0.00
                                  } else {
                                    income = (total / Number(this.state.total_equity)) * 100
                                  }

                                  // % income



                                  // Amount change
                                  let change
                                  if ((index + 1) % 2 == 0) {
                                    change = this.state.total_liabilities_and_equity_amount_array[index - 1] - this.state.total_liabilities_and_equity_amount_array[index]
                                  }
                                  // Amount change


                                  // % change
                                  let per_change
                                  if ((index + 1) % 2 == 0) {


                                    let first_value_per = change
                                    let second_value_per = this.state.total_liabilities_and_equity_amount_array[index]


                                    if (first_value_per == 0 && second_value_per != 0) {
                                      per_change = 0.00
                                    } else if (first_value_per != 0 && second_value_per == 0) {
                                      per_change = 100.00
                                    } else if (first_value_per == 0 && second_value_per == 0) {
                                      per_change = 0.00
                                    } else {
                                      per_change = (change / this.state.total_liabilities_and_equity_amount_array[index]) * 100
                                    }

                                    // per_change = ((this.state.total_liabilities_and_equity_amount_array[index - 1] - this.state.total_liabilities_and_equity_amount_array[index]) / this.state.total_liabilities_and_equity_amount_array[index]) * 100

                                  }
                                  // % change




                                  return (
                                    <>
                                      <td onDoubleClick={() => { this.goToBreak("equity_and_liabilities") }}>
                                        <span className="text-right">{
                                          (new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                            { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')
                                          // isNaN(Number(this.state.total_liabilities)) ? 0 : Number(this.state.total_liabilities).toFixed(2) 
                                        }</span>
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
                                      {this.state.expense && <td className="text-right" ><span>000</span> </td>}
                                      {(index + 1) % 2 == 0 && this.state.previous_period_cad && this.state.previous_period &&
                                        <td className="text-right" ><span>
                                          {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                            { style: 'currency', currency: this.state.home_currency }).format(change)).replace(this.state.home_currency_symbol, '')}
                                        </span> </td>
                                      }
                                      {(index + 1) % 2 == 0 && this.state.previous_period_change && this.state.previous_period &&
                                        <td className="text-right" ><span>
                                          {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                            { style: 'currency', currency: this.state.home_currency }).format(per_change)).replace(this.state.home_currency_symbol, '')}
                                        </span> </td>
                                      }
                                      {(index + 1) % 2 == 0 && this.state.previous_year_cad && this.state.previous_year &&
                                        <td className="text-right" ><span>000</span> </td>
                                      }
                                      {(index + 1) % 2 == 0 && this.state.previous_year_change && this.state.previous_year &&
                                        <td className="text-right" ><span>000</span> </td>
                                      }
                                      {(index + 1) % 2 == 0 && this.state.year_to_date_ytd && this.state.year_to_date &&
                                        <td className="text-right" ><span>000</span> </td>
                                      }
                                    </>
                                  );
                                })
                              }

                            </tr>







                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Ends here */}
            </div>
            {/* MainContent Wrapper Ends here */}
          </div>
        </div>
        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}

        {/* <Suspense fallback={<p>Loading...</p>}></Suspense> */}
        <footer className="container-fluid">
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
      </div>
    );
  }
}
export default balance_sheet_report;
