import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import FetchAllApi from "../../api_links/fetch_all_api";
import config from "../../api_links/api_links";
import Topbar from "../topbar";
import Comma from "../comma";

import moment from "moment";
import { PDFtoIMG } from "react-pdf-to-image";
import DatePicker from "react-date-picker";
import Loader from "react-loader-spinner";

import jQuery from "jquery";
var _ = require("lodash");
// import 'bootstrap';
// import 'bootstrap-select';
class GST_Details extends React.Component {
  constructor(props) {
    super(props);
    //const { history CONVER} = this.props;
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

      home_currency_symbol: localStorage.getItem("home_currency_symbol"),

      total_revenue: "",
      cost_of_goods_sold: "",
      gross_profit: "",
      net_income: "",
      reportObject: [],
      numberOfColumns: [],
      dateList: [],
      endDate: "",
      startDate: "",
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
      end_date: moment(new Date()).format("YYYY-MM-DD"),
      show_columns: 2,
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
      isInvoice: true,
      selected_vals: [],
      coulmns_head: [],
      filtervalue: [],
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
      selectedCurrencies: "",
      selected_vendor_ids: [],
      changefromDate_duedate: "",
      todate_duedate: "",

      data: [
        {
          id: 1,
          // heading_name: "Trans#",
          heading_name: "Transction Number",
          clsname: "trans",
        },
        {
          id: 2,
          heading_name: "Last Modified",
          clsname: "lastmodified",
        },
        {
          id: 3,
          heading_name: "Last Modified By",
          clsname: "lastmodifiedby",
        },
        {
          id: 4,
          heading_name: "Num",
          clsname: "num",
        },
        {
          id: 5,
          heading_name: "Memo",
          clsname: "memo",
        },
        {
          id: 6,
          heading_name: "Account",
          clsname: "account",
        },
        {
          id: 7,
          heading_name: "Open Balance",
          clsname: "openbalance",
        },
        {
          id: 8,
          heading_name: "Debit",
          clsname: "debit",
        },
        {
          id: 9,
          heading_name: "Credit",
          clsname: "credit",
        },
        {
          id: 10,
          heading_name: "Balance",
          clsname: "balance",
        },
        {
          id: 11,
          heading_name: "Currency",
          clsname: "currency",
        },
        {
          id: 12,
          heading_name: "Exchange Rate",
          clsname: "exchangerate",
        },
      ],
      response: [],

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
      selectedTerms: [],
      selectedVendor_type: [],
      vendor_type: [],
      paymentTerms: [],
      all_report_name_id: "",
      customer_type: [],
      selectedCustomer_type: [],

      type: false,
      sort_type: "desc",
      sortBynames: [],
      selectedName: "",
      filter_key_names: [],

      fullResponse: {},
      date_range: 'Custom',
    };
  };



  rename = (obj, curr) => {
    let a = {}
    Object.keys(obj).map((key) => {
      let newKey = key.replace(curr, '')
      Object.assign(a, { [newKey]: obj[key] })
    })
    return a
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

  sortingApi = () => {
    if (this.state.selectedName != "") {
      this.callAPIDATA();
    }
  };

  sortByNames = () => {
    let report_id = 17
    // alert('hjgh')
    FetchAllApi.reportSortbyOptions(report_id, (err, response) => {
      if (response.status === 1) {
        console.log("rty", response);
        this.setState({ sortBynames: response.list });
      } else {
      }
    });
  };
generatepdf=()=>{
let htmlcontent=`<html><body><div className="report-table"><div className="table-responsive" id="sticky-tb-hdr"> 
<table className="table" id="mytable"> <thead> <tr><th>&nbsp;</th><th>&nbsp;</th></tr>
<tbody>
`+this.state.gst_report_summary &&
  this.state.gst_report_summary.details.map(
    (item, i) => {
      return (+`
<tr class="title-1"> <td> `+ item.name +` </td> <td>""</td> </tr>
`+ item.list &&
  item.list.map((listItem, j) => {
    return (+`
<tr class="item-step1 sub-title">
 <td><div>`+listItem.tax_name +`" " </div>
 </td>
 <td>
   " "
   <div> "" </div>" "
 </td>
</tr>`+
listItem.categories &&
  listItem.categories.map(
    (sub, k) => {
      return ( +`
              <tr class="item-step"> 
                <td> 
                 <span> 
                 `+sub.category_name +`
                  </span> 
                </td> 
                <td> 
                   <span class="text-right"> 
              `+sub.total_amount +`
                   </span> 
                 </td> 
               </tr> 
               `
               );}
               ) +`
               <tr class="item-step1 title1 bdr-no"> 
                 <td>  {" "}
                   <span> 
                   Total  `+listItem.tax_name +`   
                    </span> 
                 </td> 
                 <td> 
                   <span class="text-right"> 
                   `+listItem.total_amount +` 
                   
                   </span> 
                 </td> 
               </tr>
               `);
              })+ `    
             <tr class="item-step1 title1 bdr-no"> 
               <td>  {" "}
                 <span>Total `+item.name+` </span> 
               </td> 
               <td> 
               {" "}
               <span class="text-right">
                 {" "}
                 <span class="text-right"> 
                 `+item.total_amount  +`               
                 </span> 
               </td> 
             </tr>  
             `);
            }
          )+`      
           <tr class="title-1"> 
             <td> Net GST to be Paid </td> 
             <td class="text-right"> 
               <span> 
            this.state.gst_report_summary.net_gst_to_paid /> 
              </span> 
             </td> </tr>  </tbody> </table></div></div></body></html>`
             console.log(htmlcontent)
             console.log(jQuery("#sticky-tb-hdr").html())
             let data={
              client_id:this.state.logged_client_id,
              html_content:jQuery("#sticky-tb-hdr").html(),
              from_date:this.state.start_date,
              to_date:this.state.end_date
             }
             FetchAllApi.file_tax_return_generate_pdf(data,(err, response) => {
              if (response.status === 1) {
                alert(response.message)
                
              } else {
                alert(response.message)
              }
            });

}
  all_report_name = () => {
    FetchAllApi.all_report_name((err, response) => {
      if (response.status === 1) {
        let report_ids = response.response;
        for (var i = 0; i < report_ids.length; i++) {
          if (report_ids[i].column_name == "Open_invoices") {
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
  }
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

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true }); //DidUpdate
  }
  componentDidMount() {
    this.all_report_name();
    this.get_col();
    this.get_currencies(); //didMount
    this.get_vendorNames();

    this.paymentTerms();
    this.vendor_type();
    this.customer_type();

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

    // this.show_columnslist()
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
    if (localStorage.getItem('fiscal_start_year') != '' && localStorage.getItem('fiscal_start_year') != null && localStorage.getItem('fiscal_start_year') != undefined) {
      let start = moment(localStorage.getItem('fiscal_start_year')).format("DD-MM-YYYY");
      let end = moment(localStorage.getItem('fiscal_end_year')).format("DD-MM-YYYY");
      this.setState({ start_date: localStorage.getItem('fiscal_start_year'), end_date: localStorage.getItem('fiscal_end_year') });
      document.getElementById("fromdate").value = start;
      document.getElementById("todate").value = end;
    } else {
      this.setState({ date_range: "All" })
      this.changedatevalue("All")
    };
    this.callAPIDATA();
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  get_col = () => {
    let report_id = 17
    FetchAllApi.get_col(this.state.logged_client_id,report_id, (err, response) => {
      if (response.status === 1) {
        var active = [];
        let active_headings = response.response.map((item) => {
          if (item.status === 1) {
            active.push(item.heading_name);
          }
        });
        let coulmns_head = response.response;

        let optionList = "";
        if (coulmns_head) {
          var options = coulmns_head.map((item, i) => {
            return <option>{item.heading_name}</option>;
          });
        }

        this.setState({
          selected_vals: active,
          coulmns_head: coulmns_head,
          options: options,
        });

        //hide default coulmns
        const inactiveArray = coulmns_head.filter(
          (item) => item.status_range === "Deactive"
        );
        // console.log('hshshshshsh', inactiveArray)
        setTimeout(() => {
          inactiveArray.forEach((item) => {
            jQuery(
              "td:nth-child(" + item.id + "),th:nth-child(" + item.id + ")"
            ).hide();
          });
        }, 5000);
      } else {
        this.setState({
          gst_list: [],
        });
      }
    });
  };

  selected_item = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    let show_columns = optionElement.getAttribute("data-id");
    this.setState({ show_columns: show_columns }, () => {
      this.callAPIDATA();
    });
  };
  selected_items = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    let show_columns = optionElement.getAttribute("data-id");

    // this.setState({ show_columns: show_columns }, () => {
    //   this.callAPIDATA()
    // })
  };

  slected_itemid = (id) => {
    //alert(id);
  };
  changedatevalue(seleteddateformat) {
    var dateresult = moment();
    let from_date, to_date;
    this.setState({ date_range: seleteddateformat })

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
      document.getElementById("todate").value = moment(new Date()).format(
        "DD-MM-YYYY"
      );
      this.state.end_date = to_date;
      this.callAPIDATA();
    } else if (seleteddateformat == "All") {
      this.setState(
        {
          start_date: "1970-01-01",
          end_date: moment().add(10, 'years').format("YYYY-MM-DD"),
        },
        () => this.callAPIDATA()
      );
      document.getElementById("fromdate").value = "";
      document.getElementById("todate").value = "";
    }
    // let startDate = jQuery('#fromdate').val()
    // let end_date = jQuery('#todate').val()
    // this.setState({ start_date: startDate, end_date: end_date }, () => {
    //   this.callAPIDATA()
    // })
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

  show_columnslist = () => {
    let report_name = "balance_sheet";
    FetchAllApi.get_coulmnlist(report_name, (err, response) => {
      if (response.status === 1) {
        // console.log(('jsjsjsjsgsg',response.details))
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
      if (val === 2) this.setState({ cadchange: true, cadpercentage: false });
      else this.setState({ cadchange: false, cadpercentage: true });
    } else {
      sub_columns = [4];
      if (val === 5) this.setState({ cadchange: true, cadpercentage: false });
      else this.setState({ cadchange: false, cadpercentage: true });
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

  callAPIDATA() {
    let filter_id = this.state.result_array;
    let filter_options = {
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
    };

    FetchAllApi.filter_column(
      //this.state.all_report_name_id,this.state.logged_client_id,
      17,this.state.logged_client_id,
      this.state.filter_key_names,
      (errResponse, filtervalue) => {
        console.log("Filter Result", filtervalue);
        this.setState({ filtervalue: filtervalue });
      }
    );
    this.setState({ loading: true });
    let {
      start_date,
      end_date,
      show_columns,
      sub_columns,
      logged_client_id,
      sort_type,
      selectedName,
    } = this.state;
    console.log("start date", start_date);
    console.log("End date", end_date);
    // alert(this.state.logged_client_id);
    FetchAllApi.gst_report_summary(
      start_date,
      end_date,
      show_columns,
      logged_client_id,
      sub_columns,
      filter_id,
      filter_options,
      selectedName,
      sort_type,
      (err, response) => {
        if (response.status === 1) {
          // alert("hi");
          this.setState({ gst_report_summary: response, type: !this.state.type, loading: false });
        } else {
          this.setState({ gst_report_summary: "", loading: false });
        }
      }
    );
  }

  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
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
      console.log("fromdate RTERE", date_formated);
      this.setState({ changefromDate_duedate: date_formated }, () => {
        this.callAPIDATA();
      });
    }
  }
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
  convertToarray(str) {
    console.log("subcat string", str);
    console.log("Sub Cat", Object.values(str));
    return Object.values(str);
  }

  show_coulmn_filter = (e) => {
    var names = [];
    var result = [];
    var options = e.target.options;
    var opt;
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        let value = JSON.parse(opt.value);

        result.push(value.b || opt.text);
        names.push(value.a || opt.text);

        // result.push(opt.value || opt.text)
        var optvals = value.b + 1;
        jQuery(
          "td:nth-child(" + optvals + "),th:nth-child(" + optvals + ")"
        ).show();
      } else {
        let value = JSON.parse(opt.value);
        var optvals = value.b + 1;
        // var optvals = parseInt(opt.value) + 1
        jQuery(
          "td:nth-child(" + optvals + "),th:nth-child(" + optvals + ")"
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

  changevaluetotals() {
    this.state.changetotal1 = this.state.changetotal;
    this.state.changetotal = 0;
  }
  changevaluetotalsx(value) {
    this.state.changetotal = parseInt(this.state.changetotal) - parseInt(value);
  }
  renderRows = (mapArray) => {
    return mapArray.map((overallinvoice) => {
      return (
        <React.Fragment>
          {/* <tr className='item-step1 istep-3' key={overallinvoice}>
            <td className=''>
              <span></span>
            </td>

            <td className='trans'>
              <span>{overallinvoice.invoice_id}</span>
            </td>
            <td className='lastmodified'>
              <span>{overallinvoice.lastmodified}</span>
            </td>
            <td className='lastmodifiedby'>
              <span>{overallinvoice.lastmodifiedby}</span>
            </td>
            <td className='num'>
              <span>{overallinvoice.invoice_number}</span>
            </td>
            <td className='memo'>
              <span>{overallinvoice.memo}</span>
            </td>
            <td className='account'>
              <span>{overallinvoice.account}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.open_balance_home_currency}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.debit}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.credit}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.open_balance_home_currency}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.foreign_currency}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.exchange_rate}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.grand_total_foreign_currency}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.open_balance_foreign_currency}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.foreign_balance}</span>
            </td>
            <td className=''>
              <span>
                {overallinvoice.split != '' ? overallinvoice.split : ''}
              </span>
            </td>
            <td className=''>
              <span>
                {overallinvoice.aging != '' ? overallinvoice.aging : ''}
              </span>
            </td>
            <td className=''>
              <span>{overallinvoice.terms}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.contact}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.postal_code}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.province}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.city}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.address}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.email}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.phone}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.job_name}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.fax}</span>
            </td>
            <td className=''>
              <span>{overallinvoice.type_name}</span>
            </td>
          </tr> */}
        </React.Fragment>
      );
    });
  };

  render() {
    console.log("oiiiioioi", this.state.selected_vals);
    // let balance_sheet_data = this.state.balance_sheet_data
    // let total = 0

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
                <span className="page-title hidden-xs">GST Report Summary</span>

                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>

              <div className="col-md-12 col-xs-12 mar-top visible-xs">
                <a href="javascript:;" className="back">
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <span className="page-title">GST Report Summary</span>
              </div>
              {/* content-top Starts here */}
              <div className="content-top col-md-12 col-xs-12">
                <h4 className="fw-sbold mar-t-no">GST Report Summary</h4>
                <h5 className="fw-sbold">
                  {moment(new Date()).format("MMM YYYY")}
                </h5>
                <div className="row snippet-row">
                  <div className="col-md-3 col-sm-6">
                    <div className="snippet active">
                      <div>
                        <small>Total Supplies</small>
                        <span className="value">
                          {this.state.home_currency_symbol}{" "}
                          {this.state.gst_report_summary !=
                            undefined
                            ? <Comma value={this.state.gst_report_summary.total_supplies} />
                            : null}
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
                        <small>Output Tax Due</small>
                        <span className="value">
                          {this.state.home_currency_symbol}{" "}
                          {this.state.gst_report_summary !=
                            undefined
                            ? <Comma value={this.state.gst_report_summary.total_output_tax} />
                            : ''}
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
                        <small>Input Tax & Refunds Claimed</small>
                        <span className="value">
                          {this.state.home_currency_symbol}{" "}
                          {this.state.gst_report_summary !=
                            undefined
                            ? <Comma value={this.state.gst_report_summary.total_input_tax} />
                            : ''}
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
                        <small>
                        {this.state.gst_report_summary != undefined  && this.state.gst_report_summary.net_gst_to_paid > 0
                            ? "Net GST to be Received" 
                            : "Net GST to be Paid"}
                          </small>
                        <span className="value">
                          {this.state.home_currency_symbol}{" "}
                          {this.state.gst_report_summary != undefined
                            ? <Comma value={this.state.gst_report_summary.net_gst_to_paid} />
                            : ''}
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
                    <form className="custom-form form-inline reduce-width column-4">
                      <div class="form-group mar-rgt">
                        <label>Date Range</label>

                        <select
                          id="custom"
                          className="selectpicker form-control hh"
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

                      <div class="form-group mar-rgt">
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
                              jQuery("#custom").val("Custom")
                              setTimeout(() => { this.changefromDate(value) }, 500)
                            }}
                            className="form-control"
                            autoComplete="off"
                          />
                          <div className="input-group-addon" onClick={() => jQuery('#fromdate').focus()}>
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
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
                              jQuery("#custom").val("Custom")
                              setTimeout(() => { this.changetoDate(value) }, 500)
                            }}
                            className="form-control"
                            autoComplete="off"
                          />
                          <div className="input-group-addon" onClick={() => jQuery('#todate').focus()}>
                            <img src="images/calendar-icon.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <a href="javascript:;" className="text-link filter-btn">
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
                        style={{ width: "20px", marginLeft:'10px' }}
                      />

                    </a>
                    </form>
                    <div className="pull-right">
                      <button className="btn btn-blue pull-left mar-rgt-5"
                      onClick={() => {
                        this.generatepdf();
                      }}>
                        
                        File Tax Return
                      </button>
                      <div className="dropdown menu-item pull-left">
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

                  
                  
                    <div className="col-md-12 col-xs-12 report-filter">
                      <a href="javascript:;" className="close-btn">
                        <img src="images/cross-red.svg" />
                      </a>

                      <form className="custom-form">
                        <div className="col-lg-4 col-md-12 pad-l-no">
                          <div className="row">
                            {/* <div className="form-group col-md-12 col-xs-12">
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
                                      defaultChecked="checked"
                                    />{" "}
                                    Accural
                                    <span className="checkmark" />
                                  </label>
                                  <label className="custom-checkbox radio">
                                    <input type="radio" name="tax-item" /> Cash
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </div>
                            </div>
                           
                           
                            */}
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
                                      {/* { this.state.coulmns_head && this.state.coulmns_head !==undefined && 
                this.state.coulmns_head && 
                
                this.state.coulmns_head.map((item,i)=>{
                let statusSelected="";
                if(item.status === 1)
                    statusSelected="selected"

                return(<option value={ i+1 } selected={ statusSelected } >{item.heading_name}</option>)
                

                }) } */}
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
                            <div className="form-group col-md-12 col-xs-12">
                              <div className="row">
                                <div className="col-lg-5 col-md-3">
                                  <label className="fw-sbold">
                                    Show Columns
                                  </label>
                                </div>
                                <div className="col-lg-7 col-md-9">
                                  <div className="custom-select-drop dropdown">
                                    {this.state.coulmns_head &&
                                      this.state.coulmns_head !== undefined && (
                                        <select
                                          className="selectpicker"
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
                                                if (item.status === 1)
                                                  statusSelected = "selected";
                                                let object = {
                                                  a: item.id,
                                                  b: i + 1,
                                                };
                                                return (
                                                  <option
                                                    value={JSON.stringify(
                                                      object
                                                    )}
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
                                            // sort_type: "asc",
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
                                        let a = this.state.type
                                          ? "desc"
                                          : "asc";
                                        console.log("yyyt", a);
                                        this.setState(
                                          {
                                            sort_type: a,

                                          },
                                          this.sortingApi()
                                        );
                                      }}
                                    >
                                      {this.state.type ? "asc" : "desc"}
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
                        {this.state.selectedFil == 43 && (
                          <div
                            className="col-lg-4 col-md-12 pad-r-no"
                            style={{ paddingLeft: 55 }}
                            id="hideme"
                          >
                            <div className="row">
                              <div className="form-group ">
                                <div id={1} style={{ display: "block" }}>
                                  <div>
                                    <input
                                      type="radio"
                                      className="custom-control-input"
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          this.setState(
                                            { sort_type: "desc" },
                                            this.sortingApi()
                                          );
                                        }
                                      }}
                                      value="asc"
                                      checked={this.state.sort_type === "desc"}
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="customRadioInline1"
                                      style={{ margin: "4%" }}
                                    >
                                      Increment
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      type="radio"
                                      className="custom-control-input"
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          this.setState(
                                            { sort_type: "asc" },
                                            this.sortingApi()
                                          );
                                        }
                                      }}
                                      value="desc"
                                      checked={this.state.sort_type === "asc"}
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="customRadioInline2"
                                      style={{ margin: "4%" }}
                                    >
                                      Decrement
                                    </label>
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
                        <table className="table" id="mytable">
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              <th>&nbsp;</th>
                              {/* {this.state.coulmns_head.map((x, y) => {
                                console.log("ee", x.heading_name);
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
                              })} */}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.gst_report_summary &&
                              this.state.gst_report_summary.details.map(
                                (item, i) => {
                                  return (
                                    <React.Fragment>
                                      <tr class="title-1">
                                        <td> {item.name} </td>
                                        <td> {""} </td>
                                      </tr>

                                      {item.list &&
                                        item.list.map((listItem, j) => {
                                          return (
                                            <React.Fragment>
                                              <tr class="item-step1 sub-title">
                                                <td>
                                                  <div>
                                                    {listItem.tax_name}{" "}
                                                  </div>
                                                </td>
                                                <td>
                                                  {" "}
                                                  <div> {""} </div>{" "}
                                                </td>
                                              </tr>

                                              {listItem.categories &&
                                                listItem.categories.map(
                                                  (sub, k) => {
                                                    return (
                                                      <tr class="item-step1 ">
                                                        <td>
                                                          <span>
                                                            {" "}
                                                            {
                                                              sub.category_name
                                                            }{" "}
                                                          </span>
                                                        </td>
                                                        <td>
                                                          <span class="text-right">
                                                            {" "}
                                                            <Comma value={sub.total_amount} />
                                                            {/* {
                                                              sub.total_amount
                                                            } */}
                                                            {/* {sub.total_amount.toFixed(
                                                              2
                                                            )}{" "} */}
                                                          </span>
                                                        </td>
                                                      </tr>
                                                    );
                                                  }
                                                )}

                                              <tr class="item-step1 title1 bdr-no">
                                                <td>
                                                  {" "}
                                                  <span>
                                                    Total {listItem.tax_name}{" "}
                                                  </span>{" "}
                                                </td>
                                                <td>
                                                  {" "}
                                                  <span class="text-right">
                                                    {" "}
                                                    <Comma value={listItem.total_amount} />
                                                    {/* {
                                                      listItem.total_amount
                                                    } */}
                                                    {/* {listItem.total_amount.toFixed(
                                                      2
                                                    )}{" "} */}
                                                  </span>
                                                </td>
                                              </tr>
                                            </React.Fragment>
                                          );
                                        })}

                                      <tr class="item-step1 title1 bdr-no">
                                        <td>
                                          {" "}
                                          <span>Total {item.name} </span>{" "}
                                        </td>
                                        <td>
                                          {" "}
                                          <span class="text-right">
                                            {" "}
                                            <Comma value={item.total_amount} />
                                            {/* {item.total_amount} */}
                                            {/* {item.total_amount.toFixed(2)}{" "} */}
                                          </span>
                                        </td>
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              )}

                            <tr class="title-1">
                              <td> Net GST to be Paid </td>
                              <td class="text-right">
                                {" "}
                                <span>
                                  <Comma value={this.state.gst_report_summary.net_gst_to_paid} />
                                  {/* {this.state.gst_report_summary.net_gst_to_paid} */}
                                  {/* {
                                    this.state.gst_report_summary
                                      .net_gst_to_paid.toFixed(2)
                                  } */}
                                </span>{" "}
                              </td>
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
        <footer className="container-fluid">
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
      </div>
    );
  }
}
export default GST_Details;
