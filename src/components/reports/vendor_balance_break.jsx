import React from "react";
import LeftSidebar from "../left_sidebar";
import Footer from "../footer";
import FetchAllApi from "../../api_links/fetch_all_api";
import Topbar from "../topbar";

import moment from "moment";

import { PDFtoIMG } from "react-pdf-to-image";
import DatePicker from "react-date-picker";
import Loader from "react-loader-spinner";
import config from "../../api_links/api_links";

import jQuery from "jquery";
// import 'bootstrap';
// import 'bootstrap-select';

class vendor_balance_detail_break extends React.Component {
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

      selectedAccountIds: '',
      total_revenue: "",
      cost_of_goods_sold: "",
      gross_profit: "",
      net_income: "",
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
      response: [],
      final_total: "",
      show_coulmns_filter: [],
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

      coulmns_head: [],
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
        // {
        //   id: 5,
        //   heading_name: 'Company address',
        //   clsname: 'Companyaddress'
        // },
        // {
        //   id: 6,
        //   heading_name: 'Company name',
        //   clsname: 'Companyname'
        // },
        {
          id: 7,
          heading_name: "Invoice date",
          clsname: "Invoicedate",
        },
        {
          id: 8,
          heading_name: "Vendor name",
          clsname: "Customername",
        },
        // {
        //   id: 9,
        //   heading_name: 'Job name',
        //   clsname: 'jobname'
        // },
        {
          id: 10,
          heading_name: "Vendor address",
          clsname: "customer_address",
        },
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

      customer_type: [],
      paymentTerms: [],
      selectedTerms: [],
      selectedCustomer_type: [],
      result_array: [],
      all_report_name_id: "",
      date_start: "",
      date_end: "",

      type: false,
      sort_type: "asc",
      sortBynames: [],
      selectedName: "",
      filter_key_names: [],

      view: true,
      date_range:'',

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
    this.setState(
      { view: !this.state.view })

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
    }, 2000)

  }

  sortingApi = () => {
    if (this.state.selectedName != "") {
      this.callAPIDATA();
    }
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

  all_report_name = () => {
    FetchAllApi.all_report_name((err, response) => {
      if (response.status === 1) {
        let report_ids = response.response;
        for (var i = 0; i < report_ids.length; i++) {
          if (report_ids[i].column_name == "Unpaid_bills_details") {
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

  get_currencies = () => {
    fetch(
      // "https://api.exchangerate-api.com/v4/latest/SGD"
      `https://api.currencylayer.com/live?access_key=${config.api_key}&source=SGD`

    )
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
    FetchAllApi.getVendorNames(client_id, (err, response) => {
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



  multiSelectedAccount = () => {
    this.setState(
      { selectedAccountIds: jQuery("#selectedAccountIds").val() },
      () => {
        this.callAPIDATA();
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
    this.get_col();
    this.get_currencies(); //didMount
    this.get_vendorNames();

    this.customer_type();
    this.paymentTerms();
    this.all_report_name();

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
    this.callAPIDATA();
  };

  componentWillMount() {
    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  };
  get_col = () => {
    // alert('hi')
    let report_id = 15;
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
        }, 2000)

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
  pageLink(page_slug) {
    this.props.history.push("/" + page_slug);
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
        // var optvals = parseInt(opt.value)
        var optvals = value.b;
        jQuery(
          "td:nth-child(" + optvals + "),th:nth-child(" + optvals + ")"
        ).show();
      } else {
        let value = JSON.parse(opt.value);
        var optvals = value.b + 1;

        // var optvals = parseInt(opt.value)
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

  slected_itemid = (id) => {
   // alert(id);
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
  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
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

  callAPIDATA() {
    const urlParams = new URLSearchParams(window.location.search);


    if (urlParams.get("selected-vendor-id")) {
      let filter_id = [5]


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
        3: {
          condition: "",
          value: "",
          from: this.state.changefromDate_duedate,
          to: this.state.todate_duedate,
        },
        5: {
          condition: "",
          value: [urlParams.get("selected-vendor-id")],
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

        22: {
          condition: "",
          value: [...this.state.selectedTerms],
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
        this.state.all_report_name_id,this.state.logged_client_id,
        this.state.filter_key_names,
        (errResponse, filtervalue) => {
          console.log("Filter Result", filtervalue);
          this.setState({ filtervalue: filtervalue });
        }
      );
      this.setState({ loading: true });
      let { start_date, end_date, show_columns, sub_columns } = this.state;
      console.log("start date", start_date.toString());
      console.log("End date", end_date.toString());
      FetchAllApi.vendor_balance_detail(
        start_date,
        end_date,
        show_columns,
        this.state.logged_client_id,
        sub_columns,
        filter_id,
        filter_options,
        this.state.selectedName,
        this.state.sort_type,

        (err, response) => {
          console.log("BalanceSheet Data", response);
          if (response.status == 1) {
            console.log("popmusic");
            this.setState({ response: response });
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
              final_total: response.finalResponse[0].totalamount,
              loading: false,
            });
          } else {
            this.setState({
              loading: false,
              response: "",
              reportObject: [],
              final_total: "",
              balance_sheet_data: "",
            });
          }
        }
      );
    } else {
      let filter_id = [urlParams.get("filter_id")]


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
        3: {
          condition: "",
          value: "",
          from: this.state.changefromDate_duedate,
          to: this.state.todate_duedate,
        },
        5: {
          condition: "",
          value: [],
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

        22: {
          condition: "",
          value: [...this.state.selectedTerms],
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
        this.state.all_report_name_id,this.state.logged_client_id,
        this.state.filter_key_names,
        (errResponse, filtervalue) => {
          console.log("Filter Result", filtervalue);
          this.setState({ filtervalue: filtervalue });
        }
      );
      this.setState({ loading: true });
      let { start_date, end_date, show_columns, sub_columns } = this.state;
      console.log("start date", start_date.toString());
      console.log("End date", end_date.toString());
      FetchAllApi.vendor_balance_detail(
        start_date,
        end_date,
        show_columns,
        this.state.logged_client_id,
        sub_columns,
        filter_id,
        filter_options,
        this.state.selectedName,
        this.state.sort_type,

        (err, response) => {
          console.log("BalanceSheet Data", response);
          if (response.status == 1) {
            console.log("popmusic");
            this.setState({ response: response });
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
              final_total: response.finalResponse[0].totalamount,
              loading: false,
            });
          } else {
            this.setState({
              loading: false,
              response: "",
              reportObject: [],
              final_total: "",
              balance_sheet_data: "",
            });
          }
        }
      );

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

  sub_categories = (sub_categories) => {
    return sub_categories.map((i2, b) => {
      console.log("zz", i2)
      return (
        <React.Fragment>
          <tr className="item-step1 sub-title">
            {this.state.coulmns_head.map((x, y) => {
              if (y === 0) {
                return (
                  <td
                    className={x.clsname}
                    style={{
                      position: "sticky",
                      left: "0.25rem",backgroundColor: "#EFEFFF"
                    }}
                  >
                    <div>
                      {i2.currency_name}</div>
                  </td>
                );
              } else {
                return (
                  <td className={x.clsname}><div></div> </td>
                );
              }
            })}{" "}
          </tr>

          {this.renderItemlist(i2.itemlist)}

          <tr className="item-step1 title1 ">
            <td className="">
              <span>Total {'' + i2.currency_name} </span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>  <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>
                {i2.total_open_balance}
              </span>
            </td>
            <td className="">
              <span>{i2.total_debit}</span>
            </td>
            <td className="">
              <span>{i2.total_credit}</span>
            </td>
            <td className="">
              <span>{i2.total_amount}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{i2.total_balance}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>
                {
                  i2.total_open_foreign_balance
                }
              </span>
            </td>
            <td className="">
              <span>
                {i2.total_foreign_debit}
              </span>
            </td>
            <td className="">
              <span>
                {i2.total_foreign_credit}
              </span>
            </td>
            <td className="">
              <span>
                {i2.total_foreign_amount}
              </span>
            </td>
            <td className="">
              <span>{""}</span>
            </td>
            <td className="">
              <span>{i2.total_foreign_balance}</span>
            </td>

            {/* <td>
                               <span>Total </span>
                             </td>
                             <td>
                               <span className='text-right'> 0.00</span>
                             </td> */}
          </tr>



        </React.Fragment>
      );
    });
  };


  renderItemlist = (itemlist) => {
    return itemlist.map((i2, b) => {
      console.log("zz", i2)
      return (
        <React.Fragment>
          <tr className="item-step1" onDoubleClick={() => { this.break(i2) }}>
            <td className="">
              <span>{i2.transaction_number != "" ? i2.transaction_number : ""}</span>
            </td>
            <td className="" >
              <span>{i2.type != "" ? i2.type : ""}</span>
            </td>
            {/* <td className=''>
              {(i2.type === 1) ? 
               <span>Bill</span>
              :
              <span>Credit</span>
              }
              
            </td> */}
            <td className="">
              <span>{i2.lastmodified != "" ? i2.lastmodified : ""}</span>
            </td>
            <td className="">
              <span>{i2.lastmodifiedby != "" ? i2.lastmodifiedby : ""}</span>
            </td>
            <td className="">
              <span>{i2.transaction_date}</span>
            </td>
            <td className="">
              <span>{i2.invoice_number}</span>
            </td>
            <td className="">
              <span>{i2.related_invoice_number}</span>
            </td>
            <td className="">
              <span>{i2.name}</span>
            </td>
            <td className="">
              <span>{i2.source_name}</span>
            </td>
            <td className="">
              <span>{i2.memo}</span>
            </td>
            <td className="">
              <span>{i2.account}</span>
            </td>
            <td className="">
              <span>{i2.split}</span>
            </td>
            <td className="">
              <span></span>
            </td>
            <td className="">
              <span>{i2.open_balance_home_currency}</span>
            </td>
            <td className="">
              <span>{i2.debit}</span>
            </td>
            <td className="">
              <span>{i2.credit}</span>
            </td>
            <td className="">
              <span>{i2.amount}</span>
            </td>
            <td className="">
              <span></span>
            </td>
            <td className="">
              <span>{i2.balance}</span>
            </td>
            <td className="">
              <span>{i2.foreign_currency}</span>
            </td>
            <td className="">
              <span>{i2.exchange_rate}</span>
            </td>
            <td className="">
              <span>{i2.open_balance_foreign_currency}</span>
            </td>
            <td className="">
              <span>{i2.foreign_debit}</span>
            </td>
            <td className="">
              <span>{i2.foreign_credit}</span>
            </td>
            <td className="">
              <span>{i2.foreign_amount}</span>
            </td>
            <td className="">
              <span></span>
            </td>
            <td className="">
              <span>{i2.foreign_balance}</span>
            </td>
            {/* <td className=''>
              <span>0.00</span>
            </td> */}
          </tr>

          { this.state.view == false && i2.split_breakdown_string &&
            i2.split_breakdown_string.map((item, i) => {
              return (
                <tr className="item-step1 istep-2 title1">
                  <td>
                    <span> </span>
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
                      {i2.split_breakdown_string[i]}
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
                      {i2.split_breakdown_amount[i]}
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
                      {i2.split_breakdown_foreign_amount[i]}
                    </span>
                  </td>
                  <td>
                    <span className=" "></span>
                  </td>

                </tr>
              );
            })}

        </React.Fragment>
      );
    });
  };

  renderCreditlist = (creditslist, vendor_name) => {
    return creditslist.map((e1, b) => {
      console.log("jwghjkjqkj", e1);
      return (
        <React.Fragment>
          <tr className="item-step1" onDoubleClick={() => { this.break(e1) }}>
            <td className="">
              <span>{e1.transaction_number}</span>
            </td>
            <td className="" >
              <span>{e1.type != "" ? e1.type : ""}</span>
            </td>
            <td className="">
              <span>{e1.lastmodified}</span>
            </td>
            <td className="">
              <span>{e1.lastmodifiedby}</span>
            </td>
            <td className="">
              <span>{e1.invoice_number}</span>
            </td>
            <td className="">
              <span>{e1.related_invoice_number}</span>
            </td>
            <td className="">
              <span>{e1.name}</span>
            </td>
            <td className="">
              <span>{e1.source_name}</span>
            </td>
            <td className="">
              <span>{e1.memo}</span>
            </td>
            <td className="">
              <span>{e1.account}</span>
            </td>
            <td className="">
              <span></span>
            </td>
            <td className="">
              <span>{e1.open_balance_home_currency}</span>
            </td>
            <td className="">
              <span>{e1.debit}</span>
            </td>
            <td className="">
              <span>{e1.credit}</span>
            </td>
            <td className="">
              <span>{e1.open_balance_home_currency}</span>
            </td>
            <td className="">
              <span></span>
            </td>
            <td className="">
              <span>{e1.foreign_currency}</span>
            </td>
            <td className="">
              <span>{e1.exchange_rate}</span>
            </td>
            <td className="">
              <span>{e1.grand_total_foreign_currency}</span>
            </td>
            <td className="">
              <span>{e1.open_balance_foreign_currency}</span>
            </td>
            <td className="">
              <span></span>
            </td>
            <td className="">
              <span>{e1.foreign_balance}</span>
            </td>
            <td className="">
              <span>
                {e1.typej_name != "" ? e1.type_jname : ""}Key is not avail
              </span>
            </td>
            <td className="">
              <span>{e1.aging != "" ? e1.aging : ""}</span>
            </td>
            <td className="">
              <span>{e1.terms}</span>
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
              <span>{e1.vendor_name}</span>
            </td>
            <td className="">
              <span>{e1.fax}</span>
            </td>
            <td className="">
              <span>{e1.type_name}</span>
            </td>
          </tr>

          {this.state.view == false && e1.split_breakdown_string &&
            e1.split_breakdown_string.map((item, i) => {
              return (
                <tr className="item-step1 istep-2 title1">
                  <td>
                    <span> </span>
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
                      {e1.split_breakdown_amount[i]}
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
                      {e1.split_breakdown_foreign_amount[i]}
                    </span>
                  </td>
                  <td>
                    <span className=" "></span>
                  </td>

                </tr>
              );
            })}

        </React.Fragment>
      );
    });
  };
  break = (e1) => {
    console.log("break", e1)
    if (
      e1.type == "Sales Invoice" ||
      e1.type == "Payment"
    ) {
      if (e1.type == "Sales Invoice") {
        var setID = e1.trans;
      } else if (e1.type == "Payment") {
        var setID = e1.invoice_id + "=" + e1.trans;
      }

      localStorage.setItem("invoice_id", setID);
      localStorage.setItem("job_id", e1.job_id);
      //alert("job id" + e1.job_id);

      var win = window.open(
        "/create_invoice",
        "_blank"
      );
      win.focus();
    }

    if (e1.type == "Bill" || e1.type == "Credit") {
      if (e1.type == "Bill" || e1.type == "Credit") {
        let arr = [e1.type, e1.invoice_id];
        console.log("hy", e1.invoice_id);
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
    if (e1.type == "Third Party payment") {
      if (e1.third_party_payment_from == "vendor bill payment") {
        let arr = [e1.type, e1.invoice_id];

        localStorage.setItem(
          "vendor_bill",
          JSON.stringify(arr)
        );

        // alert(e1.payment_id)
        // this.props.history.push('/data_tagging/' + e1.list_id + '/' + e1.file_id)
        var win = window.open(
          "/data_tagging/" +
          e1.type +
          "/" +
          e1.invoice_id,
          "_blank"
        );
        win.focus();
      } else if (e1.third_party_payment_from == "customer invoice payment") {
        let arr = [e1.type, e1.invoice_id];
        var setID = e1.trans;

        localStorage.setItem("invoice_id", setID);
        localStorage.setItem("job_id", e1.job_id);
        localStorage.setItem(
          "vendor_bill",
          JSON.stringify(arr)
        );

        // alert(e1.payment_id)
        // this.props.history.push('/data_tagging/' + e1.list_id + '/' + e1.file_id)
        var win = window.open(
          "/create_invoice",
          "_blank"
        );
        win.focus();
      }
    }
    if (e1.type == "Vendor credit note") {


      // alert(e1.payment_id)
      // this.props.history.push('/data_tagging/' + e1.list_id + '/' + e1.file_id)
      var win = window.open(
        "/create_creditmemo?memo_id=" + e1.credit_memo_id,
        "_blank"
      );
      win.focus();
    }

  };

  render() {
    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items;

    console.log("response_stus", this.state.Subcat_array);

    // if(this.state.response_stus === 0){
    //     no_items = "<span className='no_rec'>No items found!</span>"
    // } else{
    //     no_items = ''
    // }

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
                <span className="page-title hidden-xs">
                  Vendor Balance Transactions
                </span>

                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
              </div>

              <div className="content-top col-md-12 col-xs-12">
                <h4 className="fw-sbold mar-t-no">Vendor Balance Transactions</h4>
                <h5 className="fw-sbold">
                  {moment(new Date()).format("MMM YYYY")}
                </h5>
              </div>

              <div className="main-content col-md-12 col-xs-12">
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
                          <option>All</option>
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
                            jQuery("#custom").val("Custom")
                            let value = e.target.value
                            this.setState({date_range: "Custom"})
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
                            jQuery("#custom").val("Custom")
                            let value = e.target.value
                            this.setState({date_range: "Custom"})
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
                    <a href="javascript:;" className="text-link filter-btn mar-rgt-5 ">
                      Advanced
                    </a>
                    {'' + '' + '' + ''}
                    <a
                      href="javascript:;"
                      className="text-link mar-rgt-5"
                      onClick={() =>

                        this.showHide()

                      }
                    >
                      {this.state.view
                        ? "expand view"
                        : "collapse view"}
                    </a>
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
                                                  value={JSON.stringify(object)}
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
                      <table className="table">
                        <thead>
                          <tr>
                            {this.state.coulmns_head.map((x, y) => {
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
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.response &&
                            this.state.response != undefined &&
                            this.state.response.finalResponse.map(
                              (primaryObj, i) => {
                                // console.log("sdjkfhdj",primaryObj.creditslist)
                                var total = primaryObj.total;

                                var vendor_name = primaryObj.vendor_name;

                                var creditslist = primaryObj.creditslist;

                                var itemlist = primaryObj.itemlist;

                                var total_amnt = primaryObj.total;

                                if (i !== 0) {
                                  return (
                                    <React.Fragment key={i}>
                                      {" "}
                                      <tr className="title-1">
                                        {this.state.coulmns_head.map((x, y) => {
                                          if (y === 0) {
                                            return (
                                              <td
                                                className={x.clsname}
                                                style={{
                                                  position: "sticky",
                                                  left: "0.25rem",backgroundColor: "#EFEFFF"
                                                }}
                                              >
                                                {vendor_name}
                                              </td>
                                            );
                                          } else {
                                            return (
                                              <td className={x.clsname}></td>
                                            );
                                          }
                                        })}{" "}
                                      </tr>
                                      {/* {this.renderCreditlist(
                                        creditslist,
                                        vendor_name
                                      )} */}
                                      {this.sub_categories(primaryObj.sub_categories)}
                                      <tr className="item-step1 title1 bdr-no">
                                        <td className="">
                                          <span>Total</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>  <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_open_balance)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_open_balance} */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_debit)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_debit} */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_credit)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_credit} */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_amount)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_amount} */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_balance)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_balance} */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_open_foreign_balance)).replace(this.state.home_currency_symbol, '')}

                                            {/* {
                                              primaryObj.total_open_foreign_balance
                                            } */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_foreign_debit)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_foreign_debit} */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_foreign_credit)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_foreign_credit} */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_foreign_amount)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_foreign_amount} */}
                                          </span>
                                        </td>
                                        <td className="">
                                          <span>{""}</span>
                                        </td>
                                        <td className="">

                                          <span>
                                            {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                              { style: 'currency', currency: this.state.home_currency }).format(primaryObj.total_foreign_balance)).replace(this.state.home_currency_symbol, '')}

                                            {/* {primaryObj.total_foreign_balance} */}
                                          </span>
                                        </td>

                                        {/* <td>
                               <span>Total </span>
                             </td>
                             <td>
                               <span className='text-right'> 0.00</span>
                             </td> */}
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              }
                            )}

                          <tr
                            className="item-step1 title1 bdr-no"
                            style={{ backgroundColor: "lightgrey" }}
                          >
                            <td>
                              <span>Total </span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>

                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_home_open_balance)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_home_open_balance
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_home_debit)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response.overall_total_home_debit
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_home_credit)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_home_credit
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_home_amount)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_home_amount
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_home_balance)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_home_balance
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_foreign_open_balance)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_foreign_open_balance
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_foreign_debit)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_foreign_debit
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_foreign_credit)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_foreign_credit
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_foreign_amount)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_foreign_amount
                                } */}
                              </span>
                            </td>
                            <td className="">
                              <span>{""}</span>
                            </td>
                            <td className="">
                              <span>
                                {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                  { style: 'currency', currency: this.state.home_currency }).format(this.state.response.overall_total_foreign_balance)).replace(this.state.home_currency_symbol, '')}

                                {/* {
                                  this.state.response
                                    .overall_total_foreign_balance
                                } */}
                              </span>
                            </td>

                            {/* <td>
                               <span>Total </span>
                             </td>
                             <td>
                               <span className='text-right'> 0.00</span>
                             </td> */}
                          </tr>
                        </tbody>
                      </table>
                    )}
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
export default vendor_balance_detail_break;
