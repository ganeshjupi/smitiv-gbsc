import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import Topbar from "../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import config from "../../api_links/api_links";
import jQuery from "jquery";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import create_invoice from './../create_invoice'
// import 'react-style-sheet.css';

import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

// class Acc extends React.Component {
//   constructor(props) {
//     super(props);


//     this.state = {
//       default_category_list: []
//     }

//   }
//   defaultcategorylist_onchange = (x, y) => {
//     let keyy = "";
//     let from_create_invoice = 0;
//     var client_id = 14

//     FetchAllApi.defaultcategorylist_onchange2(
//       keyy,
//       from_create_invoice,
//       client_id,
//       (err, response) => {
//         console.log("defaultcat9999egorylist", response);
//         if (response.status === 1) {
//           this.setState({
//             default_category_list: response.list,
//           })
//           // if (x == "added") {
//           //   this.setState({
//           //     selectNeedIndex: response.list.length - 1,
//           //     nameFilter: y,
//           //   });
//           // }
//           // this.setState(
//           //   {
//           //     default_category_list: response.list,
//           //   },
//           //   () => {
//           //     window.jQuery("#categry_id0").selectpicker("refresh");
//           //   }
//           // );
//         } else {
//           this.setState({
//             default_category_list: [],
//           });
//         }
//       }
//     );
//   };

//   componentDidMount() {
//     this.defaultcategorylist_onchange()
//   }

//   render() {
//     return (


//       <select
//         className="selectpicker form-control add-new cus hello"
//         data-live-search="true"
//         title="Choose"
//         id={`categry_id${1}`}
//         onChange={(e) => {
//           if (e.target.value == "1e") {
//             jQuery(
//               `#categry_id${1} option`
//             )
//               .prop("selected", false)
//               .trigger("change");

//             window
//               .jQuery("#pop-modal")
//               .modal("show");
//           }
//         }}
//       >
//         <option value="1e">
//           Create New{" "}
//         </option>
//         {this.state.default_category_list && this.state.default_category_list.map(
//           (item) => {
//             return (
//               <option
//                 value={item.id}
//                 data-status={item.id}
//               >
//                 {item.name}
//               </option>
//             );
//           }
//         )}
//       </select>
//     )
//   }

// }




class AddBankAccount extends create_invoice {
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


      role_permissions:
        JSON.parse(localStorage.getItem("role_permissions")) || [],

      currencies: [],
      currency_clone: [],
      transaction_type: '',
      currency: '',
      account_type: '',
      SubAccountList: [],
      default_category_list: [],
      gst_list: [],
      search_key_gst: '',
      clientHomeCurrency: "",
      currency_list: [],
      selectedColumnType: "",
      selectedOption: "option2",
      number_of_columns_list: [],
      coulmns: [],
      modal_info_msg:'',
      result_account: '',
      array: [],
      grid: [
        [
          { readOnly: true, value: '' },
          { a: 'Invoice / Credit memo date', readOnly: true },
          { a: 'Invoice/ Credit memo  no', readOnly: true },
          { a: 'Customer name ', readOnly: true },
          { a: 'Description', readOnly: true },
          { a: 'Account', readOnly: true },
          { a: `Gross amount(  )`, readOnly: true },
          { a: 'Sales tax rate', readOnly: true },
          { a: `Sales tax amount ()`, readOnly: true },
          { a: `Total amount ( )`, readOnly: true },
          { a: 'Exchange rate', readOnly: true },

          { a: `Gross amount`, readOnly: true },
          { a: `Sales tax amount`, readOnly: true },
          { a: `Total amount `, readOnly: true },
          { a: `Type `, readOnly: true },
        ],
        [
          { readOnly: true, value: '5' },
          { a: '', },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: `` },
          { a: '' },
          { a: ` `, readOnly: true },
          { a: ``, readOnly: true },
          { a: '' },

          { a: `` },
          { a: `` },
          { a: `` },
          { a: `` }
        ],
        [
          { readOnly: true, value: '5' },
          { a: '', },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: `` },
          { a: '' },
          { a: ` `, readOnly: true },
          { a: ``, readOnly: true },
          { a: '' },

          { a: ``, readOnly: true },
          { a: ``, readOnly: true },
          { a: ``, readOnly: true },
          { a: ``, readOnly: true }
        ],
        [
          { readOnly: true, value: '5' },
          { a: '', },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: `` },
          { a: '' },
          { a: ` `, readOnly: true },
          { a: ``, readOnly: true },
          { a: '' },

          { a: ``, readOnly: true },
          { a: ``, readOnly: true },
          { a: ``, readOnly: true },
          { a: ``, readOnly: true }
        ],
        [
          { readOnly: true, value: '5' },
          { a: '', },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: `` },
          { a: '' },
          { a: ` `, readOnly: true },
          { a: ``, readOnly: true },
          { a: '' },

          { a: ``, readOnly: true },
          { a: ``, readOnly: true },
          { a: ``, readOnly: true },
          { a: ``, readOnly: true }
        ],
        [
          { readOnly: true, value: '5' },
          { a: '', },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: '' },
          { a: `` },
          { a: '' },
          { a: ` `, readOnly: true },
          { a: ``, readOnly: true },
          { a: '' },

          { a: ``, readOnly: true },
          { a: ``, readOnly: true },
          { a: ``, readOnly: true },
          { a: ``, readOnly: true }
        ],

      ],
      exchangeRate: '',
      drop: '',
      isChecked: false,
      totalcreditgross:0,
      totalcredittax:0,
      totalcreditnet:0,
      totalsalesgross:0,
      totalsalestax:0,
      totalsalesnet:0,
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


  toggleChange = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
      }
    );
  };

  addNewAcc = () => {
    // jQuery(
    //   `#categry_id${1} option`
    // )
    //   .prop("selected", false)
    //   .trigger("change");

    window
      .jQuery("#pop-modal")
      .modal("show");
  }



  get_client_home_currency = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.get_client_home_currency(client_id, (err, response) => {
      if (response.status === 1) {
        console.log("Basio state", response);
        this.get_currencies(response.currency)
        this.setState({
          clientHomeCurrency: response.currency,
        });
      } else {
      }
    });
  };


  get_gst_list = (exchange_rate) => {
    let country_code = 196;
    //alert(country_code)
    let keyword = this.state.search_key_gst;
    FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
      console.log("defaultcategorylist", response);
      //alert(response.message)
      if (response.status === 1) {

        this.setState({
          gst_list: response.list,
        }, this.defaultcategorylist_onchange(exchange_rate));
      } else {
        this.setState({
          gst_list: [],
        });
      }
    });
  };


  defaultcategorylist_onchange = (exchange_rate, x, y) => {
    let keyy = "";
    let from_create_invoice = 0;
    var client_id = this.state.logged_client_id;

    FetchAllApi.defaultcategorylist_onchange2(
      keyy,
      from_create_invoice,
      client_id,
      (err, response) => {
        console.log("defaultcat9999egorylist", response);
        if (response.status === 1) {


          // for first time only load
          // if (this.state.default_category_list.length == 0) {


          var my_grid = [
            [
              { readOnly: true, value: '' },
              { a: 'Invoice / Credit memo date', readOnly: true },
              { a: 'Invoice/ Credit memo  no', readOnly: true },
              { a: 'Customer name ', readOnly: true },
              { a: 'Description', readOnly: true },
              { a: 'Account', readOnly: true },
              { a: `Gross amount( ${this.state.currency} )`, readOnly: true },
              { a: 'Sales tax rate', readOnly: true },
              { a: `Sales tax amount (${this.state.currency} )`, readOnly: true },
              { a: `Total amount (${this.state.currency} )`, readOnly: true },
              { a: 'Exchange rate', readOnly: true },

              { a: `Gross amount( ${this.state.clientHomeCurrency} )`, readOnly: true },
              { a: `Sales tax amount (${this.state.clientHomeCurrency} )`, readOnly: true },
              { a: `Total amount (${this.state.clientHomeCurrency} )`, readOnly: true },
              { a: `Type`, readOnly: true },
              
            ]
          ]

          for (let i = 1; i <= 50; i++) {
            let row = [

              { readOnly: true, a: i },
              {
                a: '',
              },
              { a: '' },
              { a: '' },
              { a: '' },
              {
                a: '', component: (
                  // <div className='excel-select'>
                  //   <Select options={options} />
                  // </div>
                  <select

                    data-live-search="true"
                    onChange={(e) => {
                      if (e.target.value == 'added') {
                        this.addNewAcc()
                      }
                      let data = this.state.grid
                      data[i][5] = { ...data[i][5], a: e.target.value }
                      this.setState({ grid: data, drop: 'yes' })

                    }
                    }
                  >
                    <option value="added">
                      Create New{" "}
                    </option>
                    {response.list && response.list.map(
                      (item) => {
                        return (
                          <option
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      }
                    )}
                  </select>

                )
              },
              { a: '' },
              {
                a: '',
                component: (
                  <select
                    onChange={(e) => {
                      if (e.target.value == '1e') {
                        this.openTaxModal()
                      }
                      let data = this.state.grid
                      data[i][7] = { ...data[i][7], a: e.target.value }
                      this.setState({ grid: data, drop: 'yes' })
                    }
                    }
                  >
                    <option value="1e">
                      Choose...
                      </option>
                    <option value="1e">
                      Create New{" "}
                    </option>
                    {this.state.gst_list && this.state.gst_list.map(
                      (item) => {
                        return (
                          <option
                            value={item.sales_tax_name}
                          >
                            {item.sales_tax_name}
                          </option>
                        );
                      }
                    )}
                  </select>
                )
              },
              { a: '', readOnly: true },
              { a: '', readOnly: true },
              { a: exchange_rate },
              { a: '', readOnly: true },
              { a: '', readOnly: true },
              { a: '', readOnly: true },
              { a: '', 
              component: (
                <select
                  // onChange={(e) => {
                  //   if (e.target.value == '1e') {
                  //     this.openTaxModal()
                  //   }
                  //   let data = this.state.grid
                  //   data[i][7] = { ...data[i][7], a: e.target.value }
                  //   this.setState({ grid: data, drop: 'yes' })
                  // }
                  // }
                >
                  <option value=""> Choose... </option>
                  <option value="customer"> Customer</option>
                  <option value="vendor"> Vendor</option>
                  <option value="employee"> Employee</option>
                  <option value="others"> Others</option>
                </select>
              ) },
            ]
            my_grid.push(row)

          }
          this.setState({ grid: my_grid })
          // }

          // for first time only load
          this.setState(
            {
              default_category_list: response.list, grid: my_grid
            },
            () => {
              window.jQuery("#categry_id0").selectpicker("refresh");
            }
          );
        }

        // if (x == "added") {
        //   this.setState({
        //     selectNeedIndex: response.list.length - 1,
        //     nameFilter: y,
        //   });
        // }

        else {
          this.setState({
            default_category_list: [],
          });
        }
      }
    );

  };

  // for data sheet

  isValidDate = dateString => {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
      return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };




  valueRenderer = cell => {
    console.log('cell', cell)
    console.log('a val', cell.a)
    return cell.a
    // if (cell.value == '' || cell.value == undefined) {
    //   return cell.a
    // }
    // else {
    //   return cell.value
    // }
  }

  onCellsChanged = changes => {
    console.log('cellChanges', changes)
    const grid = this.state.grid;
    changes.forEach(({ cell, row, col, value }) => {

      //  finding drop down input data error

      // if (col == 5) {
      //   let error = true
      //   if ((value == '' && (cell.value == undefined || cell.value == '')) || (cell.value != undefined && cell.value != '')) {
      //     error = false
      //   }
      //   this.state.default_category_list.map(itm => {
      //     if (itm.name == value) {
      //       error = false
      //     }
      //   })
      //   if (error) {
      //     jQuery(`#sticky-tb-hdr tbody tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).css({ "border": "2px solid #ff7676", "background": "#ffd1d1" });
      //   } else {
      //     jQuery(`#sticky-tb-hdr tbody tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).css({ "border": "", "background": "" });
      //   }
      // }


      // if (col == 7) {
      //   let error = true
      //   if ((value == '' && (cell.value == undefined || cell.value == '')) || (cell.value != undefined && cell.value != '')) {
      //     error = false
      //   }
      //   this.state.gst_list.map(itm => {
      //     if (itm.rate == value) {
      //       error = false
      //     }
      //   })
      //   if (error) {
      //     jQuery(`#sticky-tb-hdr tbody tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).css({ "border": "2px solid #ff7676", "background": "#ffd1d1" });
      //   } else {
      //     jQuery(`#sticky-tb-hdr tbody tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).css({ "border": "", "background": "" });
      //   }
      // }



      //  finding drop down input data error

      if (this.state.drop == 'yes') {

        // to avoid error box
        jQuery(`#sticky-tb-hdr tbody tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).css({ "border": "", "background": "" });
        // to avoid error box

        grid[row][col] = { ...grid[row][col], a: cell.a };
        this.setState({ drop: '' })

        if (col == 5) {
          this.state.default_category_list.map(itm => {
            if (itm.name == value) {
              grid[row][col] = { ...grid[row][col], id: itm.id };
            }
          })
        }

        if (col == 7) {
          this.state.gst_list.map(itm => {
            if (itm.sales_tax_name == cell.a) {

              // tax calculations 
              alert(itm.rate_type)
              if (itm.rate_type == 2) {
                let tax_rate = itm.rate

                let gross_amount
                let tax_amount
                let total_amount

                if (this.state.isChecked) {
                  total_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number((total_amount * (tax_rate / (tax_rate + 100))).toFixed(2))
                  gross_amount = gross_amount - tax_amount
                } else {
                  gross_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number((gross_amount * (tax_rate / 100)).toFixed(2))
                  total_amount = gross_amount + tax_amount
                }

                let exchange_rate = Number(grid[row][10].a == '' ? 0 : grid[row][10].a)
                let home_tax_amount = (tax_amount * exchange_rate).toFixed(2)
                let home_total_amount = (total_amount * exchange_rate).toFixed(2)


                grid[row][8] = { ...grid[row][8], a: tax_amount };
                grid[row][9] = { ...grid[row][9], a: total_amount };
                grid[row][12] = { ...grid[row][12], a: home_tax_amount };
                grid[row][13] = { ...grid[row][13], a: home_total_amount };
              }
              if (itm.rate_type == 1) {
                let tax_rate = itm.rate

                let gross_amount
                let tax_amount
                let total_amount

                if (this.state.isChecked) {
                  total_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number(tax_rate)
                  gross_amount = total_amount - tax_amount
                } else {
                  gross_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number(tax_rate)
                  total_amount = gross_amount + tax_amount
                }



                let exchange_rate = Number(grid[row][10].a == '' ? 0 : grid[row][10].a)
                let home_tax_amount = (tax_amount * exchange_rate).toFixed(2)
                let home_total_amount = (total_amount * exchange_rate).toFixed(2)

                grid[row][8] = { ...grid[row][8], a: tax_rate };
                grid[row][9] = { ...grid[row][9], a: total_amount };
                grid[row][12] = { ...grid[row][12], a: home_tax_amount };
                grid[row][13] = { ...grid[row][13], a: home_total_amount };

              }
              // tax calculations

              grid[row][col] = { ...grid[row][col], id: itm.id };
            }
          })
        }

      } else {
        // for error box handle
        let error = true
        if (value == '' || (col != 5 && col != 7)) {
          error = false
        }
        if (col == 5) {
          this.state.default_category_list.map(itm => {
            if (itm.name == value) {
              error = false
              grid[row][col] = { ...grid[row][col], id: itm.id };
            }
          })
        }
        if (col == 7) {
          this.state.gst_list.map(itm => {
            if (itm.sales_tax_name == value) {
              error = false
              grid[row][col] = { ...grid[row][col], id: itm.id };

              // tax calculations 

              if (itm.rate_type == 2) {
                let tax_rate = itm.rate


                let gross_amount
                let tax_amount
                let total_amount

                if (this.state.isChecked) {
                  total_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number((total_amount * (tax_rate / (tax_rate + 100))).toFixed(2))
                  gross_amount = total_amount - tax_amount
                } else {
                  gross_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number((gross_amount * (tax_rate / 100)).toFixed(2))
                  total_amount = gross_amount + tax_amount
                }


                // let gross_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                // let tax_amount = Number((gross_amount * tax_rate).toFixed(2))
                // let total_amount = gross_amount + tax_amount

                let exchange_rate = Number(grid[row][10].a == '' ? 0 : grid[row][10].a)
                let home_tax_amount = (tax_amount * exchange_rate).toFixed(2)
                let home_total_amount = (total_amount * exchange_rate).toFixed(2)
                grid[row][12] = { ...grid[row][12], a: home_tax_amount };
                grid[row][13] = { ...grid[row][13], a: home_total_amount };

                grid[row][8] = { ...grid[row][8], a: tax_amount };
                grid[row][9] = { ...grid[row][9], a: total_amount };
              }
              if (itm.rate_type == 1) {
                let tax_rate = itm.rate

                let gross_amount
                let tax_amount
                let total_amount

                if (this.state.isChecked) {
                  total_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number(tax_rate)
                  gross_amount = total_amount - tax_amount
                } else {
                  gross_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number(tax_rate)
                  total_amount = gross_amount + tax_amount
                }

                // let gross_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                // let tax_amount = Number(tax_rate)
                // let total_amount = gross_amount + tax_amount

                let exchange_rate = Number(grid[row][10].a == '' ? 0 : grid[row][10].a)
                let home_tax_amount = (tax_amount * exchange_rate).toFixed(2)
                let home_total_amount = (total_amount * exchange_rate).toFixed(2)
                grid[row][12] = { ...grid[row][12], a: home_tax_amount };
                grid[row][13] = { ...grid[row][13], a: home_total_amount };

                grid[row][8] = { ...grid[row][8], a: tax_rate };
                grid[row][9] = { ...grid[row][9], a: total_amount };
              }

              // tax calculations 
            }
          })
        }

        if (error) {
          jQuery(`#sticky-tb-hdr tbody tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).css({ "border": "2px solid #ff7676", "background": "#ffd1d1" });
        } else {
          jQuery(`#sticky-tb-hdr tbody tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).css({ "border": "", "background": "" })
        }



        // home value calculations based on exchange rate

        if (col == 6) {
          let gross_amount = value == '' ? 0 : value
          let exchange_rate = grid[row][10].a == '' ? 0 : grid[row][10].a
          let gross_home = (gross_amount * exchange_rate).toFixed(2) == 0.00 ? '' : (gross_amount * exchange_rate).toFixed(2)
          grid[row][11] = { ...grid[row][11], a: gross_home };


          this.state.gst_list.map(itm => {
            if (itm.sales_tax_name == grid[row][7].a) {


              // tax calculations 

              if (itm.rate_type == 2) {
                let tax_rate = itm.rate

                let gross_amount
                let tax_amount
                let total_amount

                if (this.state.isChecked) {
                  total_amount = Number(value == '' ? 0 : value)
                  tax_amount = Number((total_amount * (tax_rate / (tax_rate + 100))).toFixed(2))
                  gross_amount = total_amount - tax_amount
                } else {
                  gross_amount = Number(value == '' ? 0 : value)
                  tax_amount = Number((gross_amount * (tax_rate / 100)).toFixed(2))
                  total_amount = gross_amount + tax_amount
                }

                // let gross_amount = Number(value == '' ? 0 : value)
                // let tax_amount = Number((gross_amount * tax_rate).toFixed(2))
                // let total_amount = gross_amount + tax_amount

                let exchange_rate = Number(grid[row][10].a == '' ? 0 : grid[row][10].a)
                let home_tax_amount = (tax_amount * exchange_rate).toFixed(2)
                let home_total_amount = (total_amount * exchange_rate).toFixed(2)
                grid[row][12] = { ...grid[row][12], a: home_tax_amount };
                grid[row][13] = { ...grid[row][13], a: home_total_amount };

                grid[row][8] = { ...grid[row][8], a: tax_amount };
                grid[row][9] = { ...grid[row][9], a: total_amount };
              }
              if (itm.rate_type == 1) {
                let tax_rate = itm.rate

                let gross_amount
                let tax_amount
                let total_amount

                if (this.state.isChecked) {
                  total_amount = Number(value == '' ? 0 : value)
                  tax_amount = Number(tax_rate)
                  gross_amount = total_amount - tax_amount
                } else {
                  gross_amount = Number(value == '' ? 0 : value)
                  tax_amount = Number(tax_rate)
                  total_amount = gross_amount + tax_amount
                }

                // let gross_amount = Number(value == '' ? 0 : value)
                // let tax_amount = Number(tax_rate)
                // let total_amount = gross_amount + tax_amount

                let exchange_rate = Number(grid[row][10].a == '' ? 0 : grid[row][10].a)
                let home_tax_amount = (tax_amount * exchange_rate).toFixed(2)
                let home_total_amount = (total_amount * exchange_rate).toFixed(2)
                grid[row][12] = { ...grid[row][12], a: home_tax_amount };
                grid[row][13] = { ...grid[row][13], a: home_total_amount };

                grid[row][8] = { ...grid[row][8], a: tax_rate };
                grid[row][9] = { ...grid[row][9], a: total_amount };
              }

              // tax calculations 
            }
          })


        } if (col == 10) {
          let exchange_rate = Number(value == '' ? 0 : value)
          let gross_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
          let gross_home = Number((gross_amount * exchange_rate).toFixed(2))

          this.state.gst_list.map(itm => {
            if (itm.sales_tax_name == grid[row][7].a) {

              if (itm.rate_type == 2) {
                let tax_rate = Number(itm.rate)

                let tax_amount
                let total_amount

                if (this.state.isChecked) {
                  total_amount = Number(grid[row][6].a == '' ? 0 : grid[row][6].a)
                  tax_amount = Number((total_amount * (tax_rate / (tax_rate + 100))).toFixed(2))
                  gross_amount = total_amount - tax_amount
                } else {
                  tax_amount = Number((gross_amount * tax_rate).toFixed(2))
                  total_amount = Number(gross_amount + tax_amount)
                }

                // let tax_amount = Number((gross_amount * tax_rate).toFixed(2))
                // let total_amount = Number(gross_amount + tax_amount)


                let home_tax_amount = (tax_amount * exchange_rate).toFixed(2)
                let home_total_amount = (total_amount * exchange_rate).toFixed(2)
                grid[row][12] = { ...grid[row][12], a: home_tax_amount };
                grid[row][13] = { ...grid[row][13], a: home_total_amount };

              }
              if (itm.rate_type == 1) {
                let tax_rate = itm.rate


                let tax_amount
                let total_amount

                if (this.state.isChecked) {
                  total_amount = Number(value == '' ? 0 : value)
                  tax_amount = Number(tax_rate)
                  gross_amount = total_amount - tax_amount
                } else {
                  tax_amount = Number(tax_rate)
                  total_amount = Number(gross_amount + tax_amount)
                }

                // let tax_amount = Number(tax_rate)
                // let total_amount = Number(gross_amount + tax_amount)

                let home_tax_amount = (tax_amount * exchange_rate).toFixed(2)
                let home_total_amount = (total_amount * exchange_rate).toFixed(2)
                grid[row][12] = { ...grid[row][12], a: home_tax_amount };
                grid[row][13] = { ...grid[row][13], a: home_total_amount };

              }


            }
          })

          grid[row][11] = { ...grid[row][11], a: gross_home };
        }

        // home value calculations based on exchange rate




        grid[row][col] = { ...grid[row][col], a: value };
      }
      // for error box handle

    });
    this.setState({ grid });

  };
  onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;

  // for data sheet
  modal_cancel = () => {
    jQuery("#sales_tax_code").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#sales_tax_name").val("");
    jQuery("#tax").val("");
    this.setState({ modal_info_msg: "" });
    window.jQuery("#pop-modal-1").modal("hide");
  };
 
 
  selected_account = (curr) => {

    // for exchange rate

    var exchangeRate = ''
    fetch(
      // `https://api.exchangerate-api.com/v4/latest/${curr}`
      `https://api.currencylayer.com/live?access_key=${config.api_key}&source=${curr}`

    )
      .then((response) => response.json())
      .then((data) => {
        let newObj = this.rename(data.quotes, curr)

        const currencyAr = [];
        let first = newObj;
        for (const key in first) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr, currency_clone: currencyAr, currency_list: first });
        exchangeRate = first[this.state.clientHomeCurrency]

        console.log('1111', this.state.clientHomeCurrency)
        console.log('11112', first)
        console.log('11113', first[this.state.clientHomeCurrency])

        // for exchange rate

        var currency = curr;
        var result = [];
        this.state.SubAccountList.forEach((item, i) => {
          var fullString = item.name.split("-");
          var list_curr = fullString[1];

          console.log("matched", item.name + "=" + list_curr + "=" + currency);
          var kk = "Accounts Receivable-" + currency;

          console.log("one", item.name);
          console.log("one1", kk);
          if (item.name == kk) {
            console.log("one2", 'ok');
            result.push(item);
            this.setState({ result_account: item.id, exchangeRate: exchangeRate }, this.get_gst_list(exchangeRate))

          }
        });

      })

  }


  getSubAccountList = () => {
    var coreData = {
      account_type_id: 2,
      client_id: this.state.logged_client_id,
    };

    FetchAllApi.getSubAccountList(coreData, (err, response) => {
      console.log("vendor_nljfskdkdssdkfames", response);

      if (response.status === 1) {
        this.setState({ SubAccountList: response.list });

        // alert('success')
        // this.getItems()
        // window.jQuery('#add_items').modal('hide')
      } else {
      }
    });
  };

  save_transaction = () => {
    let coreData = {
      client_id: this.state.logged_client_id,
      transaction_type: this.state.transaction_type,
      currency: this.state.currency,
      main_array: JSON.stringify(this.state.grid),
      account: this.state.result_account,
      including_tax: this.state.isChecked == true ? 1 : 0
    }
    FetchAllApi.create_batch_transaction(coreData, (err, response) => {
      console.log("defaultcategorylist", response);
      //alert(response.message)
      if (response.status === 1) {
        alert('batch transactions - invoices added sucessfully') 
       // this.defaultcategorylist_onchange();
        // this.setState({
        //   gst_list: response.list,
        // });
      } else {
        alert(response.message)
        // this.setState({
        //   gst_list: [],
        // });
      }
    });
   
  };


  add_coulmn = (colType) => {
    var user_id = parseFloat(this.state.logged_user_id);
    let type = this.state.selectedColumnType;
    type = type ? type : colType;
    if (type === "textField") {
      var type_ = 1;
    } else {
      var type_ = 2;
    }
    var myVal = type_;
    let coulmn_name = jQuery("#coulmn_name").val();

    var coulmnData = this.state.number_of_columns_list;
    var obJ = {
      column_name: coulmn_name,
      type: myVal,
      options: [],
      is_visible: 1,
    };
    // alert(coulmnData)

    coulmnData.push(obJ);
    var coreData = {
      name: coulmn_name,
      type: myVal,
      client_id:this.state.logged_client_id,
      options:''

    };

    FetchAllApi.add_batch_enter_custom_column(coreData, (err, response) => {
      console.log("new document", response.message);
      alert(response.message);
      if (response.status === 1) {
        this.getColumns();

        //   this.setState({items: response.list[0].columns })
      } else {
      }
    });

    window.jQuery("#pop-modal-2").modal("hide");
  };


  get_currencies = (client_home_currency) => {
    fetch(
      `https://api.exchangerate-api.com/v4/latest/${client_home_currency}`
    )
      .then((response) => response.json())
      .then((data) => {
        const currencyAr = [];
        let first = data.rates;
        for (const key in first) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr, currency_clone: currencyAr, currency_list: first });
      });
  };

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
    // jQuery("#currency_selected").val(4);
  }

  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery("title").html("Customer | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === "null" ||
      this.state.logged_user_id === "undefined"
    ) {
      this.props.history.push("/");
    }
  }

  routedChange(parameter) {
    this.props.history.push("/" + parameter);
    window.scrollTo(0, 0);
  }
  getColumns = () => {
    this.setState({ number_of_columns_list: [] });    
    FetchAllApi.get_batch_enter_custom_column(this.state.logged_client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ number_of_columns_list: response.list[0].columns },);
      } else {
      }
    });
  };
  componentDidMount() {
    this.get_client_home_currency()
    this.getSubAccountList()
    this.getColumns();

    // this.defaultcategorylist_onchange()

    document.getElementById("sticky-tb-hdr").addEventListener("scroll", function () {
      var translate = "translate(0," + this.scrollTop + "px)";
      if (this.querySelector("tbody tr:first-child") != null && this.querySelector("tbody tr:first-child") != undefined && this.querySelector("tbody tr:first-child").style != null) {
        this.querySelector("tbody tr:first-child").style.transform = translate;
      }
    });



    jQuery(window).on("load", function () {
      window.jQuery(".mscroll-y").mCustomScrollbar({
        axis: "y",
        scrollEasing: "linear",
        scrollInertia: 600,
        autoHideScrollbar: "true",
        autoExpandScrollbar: "true",
      });

      window.jQuery(".ib-scroll").mCustomScrollbar({
        scrollEasing: "linear",
        scrollInertia: 600,
        scrollbarPosition: "outside",
      });
    });

    jQuery(document).ready(function () {
      jQuery(".left-navmenu .has-sub").click(function () {
        jQuery(".left-navmenu li a").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".left-navmenu li a:not(.active)")
          .siblings(".sub-menu")
          .slideUp();
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
      window.jQuery(".select-picker").selectpicker();
      jQuery(".label-enclose .label").click(function () {
        jQuery(this).toggleClass("active");
      });
      jQuery(".nav-brand-res").click(function () {
        jQuery(".left-navbar").addClass("active");
      });
      jQuery(".menu-close").click(function () {
        jQuery(".left-navbar").removeClass("active");
      });
    });
  }

  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
  }

  render() {

    console.log('iucgdde1', this.state.grid)
    return (
      <div>

        {/* Main Wrapper Starts here */}
        <div className="container-fluid">
          <div className="row">
            {/* left-navbar Starts here */}
            <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />
            {/* left-navbar Ends here */}
            {/* MainContent Wrapper Starts here */}
            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              {/* Top bar Starts here */}
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <form className="hdr-search">
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    placeholder="Search..."
                  />
                  {/* <button type="submit" class="btn btn-green">Search</button> */}
                  <a href="javascript:;" className="close-icon">
                    <img src="images/close-icon-red.svg" alt="Close" />
                  </a>
                </form>
                <div className="nav-brand-res visible-xs">
                  <img
                    className="img-responsive"
                    src="images/logo-icon.png"
                    alt="LogoIcon"
                  />
                </div>
                <a href="javascript:;" className="back hidden-xs">
                  <img src="images/back-arrow-blue.svg" onClick={() => this.props.history.goBack()} />
                </a>
                {/* <span class="page-title hidden-xs">Preference</span> */}
                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li>
                    <a href="javascript:;">Batch Posting</a>
                  </li>
                  <li>Batch Enter Transaction</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>
              {/* <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <button className="btn btn-blue sidebar-toggle">
                  <img className="img-responsive" src="images/genie-icon.png" alt="LogoIcon" />
                  <span />
                  <span />
                  <span />
                </button>
                <form className="hdr-search">
                  <input type="text" className="form-control" name="search" placeholder="Search..." />
                  {/* <button type="submit" class="btn btn-green">Search</button> */}
                 {/*  <a href="javascript:;" className="close-icon"><img src="images/close-icon-red.svg" alt="Close" /></a>
                </form>
                <div className="nav-brand-res visible-xs"><img className="img-responsive" src="images/logo-icon.png" alt="LogoIcon" /></div>
                <a href="javascript:;" className="back hidden-xs">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                {/* <span class="page-title hidden-xs">Preference</span> */}
               {/* <ul className="list-unstyled breadcrumb page-title hidden-xs">
                  <li><a href="javascript:;">Accountant</a></li>
                  <li>Batch Enter Transaction</li>
                </ul>
                <div className="pull-right">
                  <div className="search-wrap">
                    <a className="search-btn" href="javascript:;">
                      <img className="search" src="images/search-icon.svg" alt="Search" />
                    </a>
                  </div>
                  <div className="notify-wrap">
                    <a href="javascript:;"><img src="images/notification-icon.svg" alt="Notification" /></a>
                  </div>
                  <div className="profile-wrap dropdown">
                    <a href="javascript:;" className="avatar dropdown-toggle" data-toggle="dropdown">
                      <span className="avatar-img"><img className="img-responsive" src="images/user-img-1.png" alt="Harvey Dean" /></span>
                      <span className="hidden-xs">Harvey Dean</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="javascript:;"><img src="images/edit-icon.svg" alt="icon" />Edit Profile</a>
                      </li>
                      <li><a href="javascript:;"><img src="images/settings-icon.svg" alt="icon" />Settings</a></li>
                      <li><a href="javascript:;"><img src="images/turn-off-icon.svg" alt="icon" />Logout</a></li>
                    </ul>
                  </div>
                </div>
              </div> */}
              {/* Top bar Ends here */}
              <div className="col-md-12 col-xs-12 mar-top visible-xs">
                <a href="javascript:;" className="back">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <span className="page-title">Accountant</span>
              </div>
              {/* content-top Starts here */}
              <div className="content-top col-md-12 col-xs-12 bg-trans">
                <h4>Batch Enter Transaction</h4>
                <form className="custom-form row">

                  <div className="form-group col-md-3 col-sm-4">
                    <label>Transaction Type</label>
                    <select
                      className="selectpicker form-control add-new"
                      data-live-search="true"
                      title="Choose..."
                      value={this.state.transaction_type}
                      onChange={(e) => {
                        let type;
                        if (this.state.currency !== '') {

                          if (e.target.value == 1 || e.target.value == 4) {
                            type = `Accounts Receivable ${this.state.currency}`
                          } else if (e.target.value == 2 || e.target.value == 3) {
                            type = `Accounts Payable ${this.state.currency}`
                          } else {
                            type = ''
                          }
                        }
                        this.setState({
                          transaction_type: e.target.value, account_type: type
                        });
                      }}
                    >
                      <option value="">Choose...</option>
                      <option value="1">Sales Invoices &amp; Credit Memo</option>
                      <option value="2">Bills &amp; Bill Credits</option>
                      <option value="3">Cheque</option>
                      <option value="4">Deposit</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3 col-sm-4">
                    <label>Currency</label>
                    <select
                      className="selectpicker form-control add-new"
                      data-live-search="true"
                      title="Choose..."
                      value={this.state.currency}
                      onChange={(e) => {

                        let type;
                        if (this.state.transaction_type == 1 || this.state.transaction_type == 4) {
                          type = `Accounts Receivable ${e.target.value}`
                        } else if (this.state.transaction_type == 2 || this.state.transaction_type == 3) {
                          type = `Accounts Payable ${e.target.value}`
                        } else {
                          type = ''
                        }


                        this.setState({
                          currency: e.target.value, account_type: type
                        }, this.selected_account(e.target.value))
                      }}
                    >
                      <option value="">Choose...</option>
                      {this.state.currencies.map(
                        (item, index) => {
                          return (
                            <option value={item}>{item}</option>
                          )
                        })}
                    </select>
                  </div>
                  <div className="form-group col-md-3 col-sm-4 no-edit">
                    <label>Accounts Receivable</label>
                    <input type="text" className="form-control" defaultValue={this.state.account_type} name />
                  </div>
                  <div className="form-group col-md-3 col-sm-12 text-right btn-btm">
                  {/* <a
                                title="Add new column"
                                href="javascript:;"
                                className="add-col"
                                data-toggle="modal"
                                data-target="#pop-modal-2"
                              >  </a>*/}
                              <button type='button' className="btn btn-blue"  data-toggle="modal"
                                data-target="#pop-modal-2"
                    >Customize Field</button>
                  </div>
                </form>
              </div>

             
              {/* <div className="th-action-inv">
                <a
                  title="Add new column"
                  href="javascript:;"
                  className="add-col"
                  data-toggle="modal"
                  data-target="#pop-modal-2"
                >
                  <img
                    className="img-responsive"
                    src="../images/plus-icon.svg"
                    alt="icon"
                  />
                </a>
                <a
                  title="Edit columns"
                  href="javascript:;"
                  // data-toggle='modal'
                  // data-target='#editCol'
                  onClick={() => {
                    var win = window.open(
                      "/batch_column_rearrange",
                      "_blank"
                    );
                    win.focus();
                    // this.setState({
                    //   isEditCol: !this.state.isEditCol
                    // })
                  }}
                  className="add-col edit-col"
                >
                  <img
                    className="img-responsive"
                    src="../images/pen-blue.svg"
                    alt="icon"
                  />
                </a>
              </div> */}



              <div class="main-content col-md-12 col-xs-12 pad-t-no">


                <div class="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div class="report-table reconcile-table col-md-12 col-xs-12 mar-t-no mar-b-no pad-no">

                    {/* for including tax */}
                    <div className=" row ">
                      <div className="form-group col-md-12">


                        <label className="custom-checkbox small fw-med">
                          <input
                            id="changeme"
                            type="checkbox"
                            checked={this.state.isChecked}
                            onChange={this.toggleChange}
                          />{" "}
                            &nbsp;Including Tax
                            <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    {/* for including tax */}
 
                    <div className="table-responsive excel-table" id='sticky-tb-hdr'>


                      <ReactDataSheet
                        data={this.state.grid}
                        valueRenderer={this.valueRenderer}
                        onContextMenu={this.onContextMenu}
                        onCellsChanged={this.onCellsChanged}
                      />

                    </div>
                    <div className="batch-btm">
                      <table>
                        <tbody>
                          <tr>
                            <td>Total Credit Gross Amount</td>
                            <td>-10.00</td>
                          </tr>
                          <tr>
                            <td>Total Sales Tax Amount</td>
                            <td>-0.70</td>
                          </tr>
                          <tr>
                            <td>Total Credit Net Amount</td>
                            <td>-10.70</td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>Total Sales Gross Amount</td>
                            <td>100.00</td>
                          </tr>
                          <tr>
                            <td>Total Sales Tax Amount</td>
                            <td>7.00</td>
                          </tr>
                          <tr>
                            <td>Total Sales Net Amount</td>
                            <td>107.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* content-top Starts here */}
              {/* Main Content Starts here */}
              {/* <div className="main-content col-md-12 col-xs-12">
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                  <div className="report-table reconcile-table col-md-12 col-xs-12 mar-t-no mar-b-no pad-no">
                    <div className="table-responsive" id='sticky-tb-hdr'>
                      <table className="table detail-report batch-table">
                        <thead>
                          <tr>
                            <th className="text-left">Invoice / Credit Memo <br />Date</th>
                            <th className="text-left">Invoice / Credit Memo <br />No#</th>
                            <th>Customer Name</th>
                            <th>Description</th>
                            <th>Account</th>
                            <th className="text-right">Gross Amount</th>
                            <th className="text-center">Sales Tax Rate</th>
                            <th className="text-right">Sales Tax Amount</th>
                            <th className="text-right">Total Amount</th>
                            <th className="text-right">Exchange Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>12-08-2020</td>
                            <td>390</td>
                            <td>John Doe</td>
                            <td>Lorem ipsum...</td>
                            <td>Lorem ipsum...</td>
                            <td className="text-right">100.00</td>
                            <td className="text-center">7%</td>
                            <td className="text-right">7.00</td>
                            <td className="text-right">107.00</td>
                            <td className="text-right">1.3</td>
                          </tr>
                          <tr>
                            <td>16-08-2020</td>
                            <td>126</td>
                            <td>John Doe</td>
                            <td>Sed ut persp..</td>
                            <td>Lorem ipsum...</td>
                            <td className="text-right">-10.00</td>
                            <td className="text-center">7%</td>
                            <td className="text-right">-0.70</td>
                            <td className="text-right">-10.70</td>
                            <td className="text-right">1.4</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  */}

              {/* </div>
          </div> */}




              <div
                className="modal fade pop-modal"
                id="pop-modal-2"
                role="dialog"
              >
                <div className="modal-dialog modal-md custom-modal">
                  <button
                    type="button"
                    className="close hidden-xs"
                    data-dismiss="modal"
                    onClick={this.cancel_gst_modal}
                  >
                    <img
                      className="img-responsive"
                      src="../../images/close-red.svg"
                      alt="icon"
                    />
                  </button>
                  <div className="modal-content">
                            <div className="modal-body text-center">
                              <h3>Add New Column</h3>
                              <form className="custom-form row">
                                <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                  <div className="col-md-4 col-sm-4 col-xs-12">
                                    <label>Type Of the Editable Field</label>
                                  </div>
                                  <div className="col-md-8 col-sm-8 col-xs-12">
                                    <label className="custom-checkbox radio mar-rgt taxable">
                                      <input
                                        type="radio"
                                        name="editableField"
                                        value="textField"
                                        checked={
                                          this.state.selectedColumnType ===
                                          "textField"
                                        }
                                        onChange={this.typeOfColumnTobeModified}
                                      />
                                      Text
                                      <span className="checkmark"></span>
                                    </label>
                                    <label className="custom-checkbox radio non-taxable">
                                      <input
                                        type="radio"
                                        name="editableField"
                                        value="dropDownField"
                                        checked={
                                          this.state.selectedColumnType ===
                                          "dropDownField"
                                        }
                                        onChange={this.typeOfColumnTobeModified}
                                      />{" "}
                                      Drop Down
                                      <span className="checkmark"></span>
                                    </label>
                                  </div>
                                </div>

                                <div className="form-group col-md-12 col-xs-12 pad-no mar-b-no">
                                  <div className="col-md-4 col-sm-4 col-xs-12">
                                    <label>Coulmn Name</label>
                                  </div>
                                  <div className="col-md-8 col-sm-8 col-xs-12">
                                    <input
                                      autoComplete="off"
                                      type="text"
                                      className="form-control"
                                      id="coulmn_name"
                                    />
                                  </div>
                                </div>

                                {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                                <small
                                  style={{ color: "red" }}
                                  className="mymsg"
                                >
                                  {this.state.modal_info_msg}{" "}
                                </small>

                                <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                                  {this.state.show_succes ? (
                                    <div className="alert alert-success">
                                      <strong>Success!</strong> Your new GST is
                                      added.
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <button
                                    className="btn btn-lightgray btn-align"
                                    data-dismiss="modal"
                                    onClick={this.modal_cancel}
                                  >
                                    Cancel
                                  </button>
                                  <span>{"   "}</span>
                                  <button
                                    className="btn btn-green btn-align"
                                    type="button"
                                    onClick={this.add_coulmn}
                                  >
                                    Save
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                </div>
              </div>





              {/* Main Content Ends here */}
              <div className="invoice-form">
                <div className="pf-btm-wrap">
                  <div className="col-md-12 col-xs-12 text-right pad-no">
                    <button className="btn btn-lightgray btn-align" >Clear</button>
                    <button type='button' className="btn btn-green btn-align"
                      onClick={this.save_transaction}
                    >Save Transactions</button>
                  </div>
                </div>
              </div>
            </div>
            {/* MainContent Wrapper Ends here */}
          </div>
        </div >
        {/* Main Wrapper Ends here */}

        {/* for addd new tax */}

        {/* for add new tax */}

        {/* footer Starts here */}
        <Footer />
        {/* footer Ends here */}
      </div >

    );


  }
}
export default AddBankAccount;
