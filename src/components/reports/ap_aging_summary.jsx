import React from 'react'
import LeftSidebar from '../left_sidebar'
import Footer from '../footer'
import FetchAllApi from '../../api_links/fetch_all_api'
import config from '../../api_links/api_links'

import Topbar from '../topbar'
import moment from 'moment'
import { PDFtoIMG } from 'react-pdf-to-image'

import Loader from 'react-loader-spinner'

import jQuery from 'jquery'
// import 'bootstrap';
// import 'bootstrap-select';

class ap_aging_summary extends React.Component {
  constructor(props) {
    super(props)
    //const { history } = this.props;
    this.state = {
      loading: true,
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),


      country_sortname: localStorage.getItem("country_sortname"),
      language_code: localStorage.getItem("language_code"),
      home_currency: localStorage.getItem("home_currency"),

      incorporation_date: localStorage.getItem("incorporation_date"),
      home_currency_symbol: localStorage.getItem("home_currency_symbol"),
      // home_currency: 'SGD',


      total_revenue: '',
      cost_of_goods_sold: '',
      gross_profit: '',
      net_income: '',
      reportObject: [],
      numberOfColumns: [],
      dateList: [],
      endDate: '',
      startDate: '',
      dropdown: '',
      show_column: '',
      inbox_list: [],
      response_stus: 0,
      response_msg: 'No data found',
      item_details: '',
      item_file_path: '',
      waiting_re: [],
      re_assigned: [],
      client_id: 1,
      start_date: localStorage.getItem("incorporation_date"),
      end_date: moment().format("YYYY-MM-DD"),
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
      total_amnt_array: [],
      interval: 20,
      duedays: 85,
      totalAmount: '',
      gostart: '',
      goend: "",
      show_coulmns_filter: [],
      filtervalue: [],
      options: '',
      From: '',
      To: '',
      filter_options: { condition: '', value: '', from: '', to: '' },
      valueAmount: '',
      valueAmount_type: '',
      disable: false,
      selectedFil: 0,
      currencies: [],
      vendorNames: [],

      selected_vendor_ids: [],
      changefromDate_duedate: '',
      todate_duedate: '',
      selectedCurrencies: '',

      result_array: [],
      valueAmount_type1: '',
      valueAmount_type2: '',
      valueAmount_type3: '',
      valueAmount_type4: '',
      valueAmount1: '',
      valueAmount2: '',
      valueAmount3: '',
      valueAmount4: '',

      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      text6: '',
      text7: '',

      date_start: '',
      date_end: '',

      selectedTerms: [],
      selectedVendor_type: [],
      vendor_type: [],
      paymentTerms: [],
      all_report_name_id: '',
      date_range: 'Custom',
    }
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

  all_report_name = () => {

    FetchAllApi.all_report_name((err, response) => {
      if (response.status === 1) {
        let report_ids = response.response
        for (var i = 0; i < report_ids.length; i++) {
          if (report_ids[i].column_name == 'Ap_ageing_summary') {
            this.setState({ all_report_name_id: report_ids[i].report_id }, () => { this.callAPIDATA() })
          }
        }

      } else {
      }
    })
  }


  customRadioChange1 = x => { this.setState({ valueAmount_type1: x }) }
  customRadioChange2 = x => { this.setState({ valueAmount_type2: x }) }
  customRadioChange3 = x => { this.setState({ valueAmount_type3: x }) }
  customRadioChange4 = x => { this.setState({ valueAmount_type4: x }) }

  paymentTerms = () => {
    FetchAllApi.payment_terms((err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ paymentTerms: response.lists })
      } else {
        this.setState({ paymentTerms: [] })
      }
    })
  }

  vendor_type = () => {
    var client_id = this.state.logged_client_id;

    FetchAllApi.vendorTypes(client_id, (err, response) => {
      console.log("Customer list", response);

      if (response.status === 1) {
        this.setState({ vendor_type: response.list });
      } else {
        this.setState({ vendor_type: [] });
      }
    })
  }

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
        result.push(Number(opt.value) || Number(opt.text))
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
        result.push(Number(opt.value) || Number(opt.text))
      } else {
      }
    }
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
      )
    })
  }
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
      )
    })
  }
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
          this.callAPIDATA()
        }
      )
    })
  }
  changeText4 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: this.state.valueAmount_type4,
            value: this.state.valueAmount4,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA()
        }
      )
    })
  }

  text1 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text1,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA();
        }
      )
    })
  }

  text2 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text2,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA();
        }
      )
    })
  }

  text3 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text3,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA();
        }
      )
    })
  }

  text4 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text4,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA();
        }
      )
    })
  }

  text5 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text5,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA();
        }
      )
    })
  }

  text6 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text6,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA();
        }
      )
    })
  }

  text7 = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: "",
            value: this.state.text7,
            from: '',
            to: '',
          },
        },
        () => {
          this.callAPIDATA();
        }
      )
    })
  }
  changetoDate_duedate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery('#todate_duedate').val()
    if (date != undefined && date!='') {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      if(array!='' && array!=undefined){
      this.setState({ todate_duedate: date_formated }, () => {
        this.callAPIDATA()
      })
    }
    }
  }
  changefromDate_duedate(fromdate) {
    let date = jQuery('#fromdate_duedate').val()
    console.log("fromdate RTEdsadaasdadasdadad", date)
    if (date != undefined && date!='') {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      if(array!='' && array!=undefined){
      this.setState({ changefromDate_duedate: date_formated }, () => {
        this.callAPIDATA()      
      })
    }
    }
  }
  multiSelectedCurrency = cur => {
    //alert(jQuery('#slectedCurrency').val())
    this.setState(
      { selectedCurrencies: jQuery('#slectedCurrency').val() },
      () => {
        this.callAPIDATA()
      }
    )
  }
  customRadioChange = x => {

    this.setState({ valueAmount_type: x })
  }


  selected_filters = e => {
    var result = []
    var options = e.target.options
    var opt
    var j = 0
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i]

      if (opt.selected) {
        result[j] = Number(opt.value)
        j++
      }
    }
    this.setState({ result_array: result }, () => { this.callAPIDATA() })


    if (result.length > 0) {
      if (result.includes(1)) { this.setState({ selectedFil: 1 }) }
      if (result.includes(2)) { this.setState({ selectedFil: 2 }) }
      if (result.includes(3)) { this.setState({ selectedFil: 3 }) }
      if (result.includes(5)) { this.setState({ selectedFil: 5 }) }
      if (result.includes(6)) { this.setState({ selectedFil: 6 }) }
      if (result.includes(8)) { this.setState({ selectedFil: 8 }) }
      if (result.includes(10)) { this.setState({ selectedFil: 10 }) }
      if (result.includes(11)) { this.setState({ selectedFil: 11 }) }

      if (result.includes(13)) { this.setState({ selectedFil: 13 }) }
      if (result.includes(17)) { this.setState({ selectedFil: 17 }) }
      if (result.includes(18)) { this.setState({ selectedFil: 18 }) }
      if (result.includes(22)) { this.setState({ selectedFil: 22 }) }

      if (result.includes(23)) { this.setState({ selectedFil: 23 }) }
      if (result.includes(24)) { this.setState({ selectedFil: 24 }) }
      if (result.includes(25)) { this.setState({ selectedFil: 25 }) }
      if (result.includes(26)) { this.setState({ selectedFil: 26 }) }
      if (result.includes(27)) { this.setState({ selectedFil: 27 }) }
      if (result.includes(28)) { this.setState({ selectedFil: 28 }) }

    }
    else { this.setState({ selectedFil: 0 }) }
  }
  changeText = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState(
        {
          filter_options: {
            condition: this.state.valueAmount_type,
            value: this.state.valueAmount,
            from: this.state.From,
            to: this.state.To
          },
          filter_options1: {
            condition: this.state.valueAmount_type,
            value: this.state.valueAmount,
            from: this.state.From,
            to: this.state.To
          }
        },
        () => {
          this.callAPIDATA()
        }
      )
    })
  }
  get_currencies = () => {
    fetch(
      // 'https://api.exchangerate-api.com/v4/latest/SGD'
      `https://api.currencylayer.com/live?access_key=${config.api_key}&source=SGD`

    )
      .then(response => response.json())
      .then(data => {
        let newObj = this.rename(data.quotes, 'SGD')

        const currencyAr = []
        let first = newObj
        for (const key in first) {
          currencyAr.push(key)
        }
        this.setState({ currencies: currencyAr, currency_clone: currencyAr })
      })
  }
  get_vendorNames = () => {
    let client_id = this.state.logged_client_id
    // alert('hjgh')
    FetchAllApi.getVendorNames(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ vendorNames: response.list })
      } else {
      }
    })
  }
  selectedVendorIds = e => {
    var result = []

    this.setState({ selected_vendor_ids: result }, () => {
      this.callAPIDATA()
    })

    var options = e.target.options
    var opt
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i]

      if (opt.selected) {
        result.push(opt.value || opt.text)
      } else {
      }
    }
  }
  componentDidMount() {
    this.get_currencies() //didMount 
    this.show_columnslist()
    this.get_vendorNames()

    this.paymentTerms()
    this.vendor_type()
    this.all_report_name()

    document.getElementById("sticky-tb-hdr").addEventListener("scroll", function () {
      var translate = "translate(0," + this.scrollTop + "px)";
      if (this.querySelector("thead") != null && this.querySelector("thead") != undefined && this.querySelector("thead").style != null) {
        this.querySelector("thead").style.transform = translate;
      }
    });

    // jQuery('.custom-select-drop .dropdown-menu a').click(function () {
    //   jQuery('.open.custom-select-drop .dropdown-menu li.active').removeClass(
    //     'active'
    //   )
    //   jQuery(this)
    //     .parent('li')
    //     .addClass('active')
    //   jQuery('.open #selected').text(jQuery(this).text())
    // })

    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });

    jQuery('.snippet').mouseenter(function () {
      jQuery('.snippet').removeClass('active')
      jQuery(this).addClass('active')
    })

    jQuery('.filter-btn').click(function () {
      jQuery(this).css('visibility', 'hidden')
      jQuery('.report-filter').slideDown()
    })

    jQuery('.report-filter .close-btn').click(function () {
      jQuery('.filter-btn').css('visibility', 'visible')
      jQuery('.report-filter').slideUp()
    })

    if (localStorage.getItem('fiscal_start_year') != '' && localStorage.getItem('fiscal_start_year') != null && localStorage.getItem('fiscal_start_year') != undefined) {
      let start = moment(localStorage.getItem('fiscal_start_year')).format("DD-MM-YYYY");
      let end = moment(localStorage.getItem('fiscal_end_year')).format("DD-MM-YYYY");
      this.setState({ start_date: localStorage.getItem('fiscal_start_year'), end_date: localStorage.getItem('fiscal_end_year') });
      // this.setState({ start_date: localStorage.getItem('fiscal_start_year'), end_date: moment().format("YYYY-MM-DD") });
      document.getElementById("fromdate").value = start;
      document.getElementById("todate").value = end;
      setTimeout(() => {
        // alert(this.state.start_date,this.state.end_date)
        this.callAPIDATA();
      }, 300);
    } else {
      this.setState({ date_range: "All" })
      this.changedatevalue("All")
    };

    
  }
  selected_item = e => {
    var index = e.target.selectedIndex
    var optionElement = e.target.childNodes[index]
    let show_columns = optionElement.getAttribute('data-id')
    this.setState({ show_columns: show_columns }, () => {
      this.callAPIDATA()
    })
  }
  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  slected_itemid = id => {
   // alert(id)
  }
  changedatevalue(seleteddateformat) {
    var dateresult = moment()
    let from_date, to_date
    this.setState({ date_range: seleteddateformat })

    if (seleteddateformat === 'This Month-to-date') {
      from_date = dateresult.startOf('month')
      document.getElementById('fromdate').value = from_date.format('DD-MM-YYYY')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      document.getElementById('todate').value = moment(new Date()).format(
        'DD-MM-YYYY'
      )
      this.state.end_date = moment(new Date()).format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Week') {
      from_date = dateresult.startOf('week')
      document.getElementById('fromdate').value = from_date.format('DD-MM-YYYY')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      console.log('startdate', this.state.start_date)
      to_date = dateresult.endOf('week')
      document.getElementById('todate').value = to_date.format('DD-MM-YYYY')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Month') {
      from_date = dateresult.startOf('month')
      document.getElementById('fromdate').value = from_date.format('DD-MM-YYYY')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = dateresult.endOf('month')
      document.getElementById('todate').value = to_date.format('DD-MM-YYYY')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Week-to-date') {
      from_date = dateresult.startOf('week')
      document.getElementById('fromdate').value = from_date.format('DD-MM-YYYY')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      document.getElementById('todate').value = moment(new Date()).format(
        'DD-MM-YYYY'
      )
      this.state.end_date = moment(new Date()).format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Year') {
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('DD-MM-YYYY')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = dateresult.endOf('year')
      document.getElementById('todate').value = to_date.format('DD-MM-YYYY')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Year-to-date') {
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('DD-MM-YYYY')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = moment(new Date()).format('YYYY-MM-DD')
      document.getElementById('todate').value = moment(new Date()).format('DD-MM-YYYY')
      this.state.end_date = to_date
      this.callAPIDATA()
    } else if (seleteddateformat == 'All') {
      this.setState({ start_date: "1970-01-01", end_date: moment().format("YYYY-MM-DD") }, () => this.callAPIDATA());
      document.getElementById('fromdate').value = ''
      document.getElementById('todate').value = ''
    }
    // let startDate = jQuery('#fromdate').val()
    // let end_date = jQuery('#todate').val()
    // this.setState({ start_date: startDate, end_date: end_date }, () => {
    //   this.callAPIDATA()
    // })
  }
  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh');
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });;//DidUpdate
  }
  changefromDate(fromdate) {
    let date = jQuery('#fromdate').val()
    if (date != undefined && date!='') {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      this.setState({ start_date: date_formated }, () => {
        this.callAPIDATA()
      })
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }

  show_columnslist = () => {
    let report_name = 'balance_sheet'
    FetchAllApi.get_coulmnlist(report_name, (err, response) => {
      if (response.status === 1) {
        this.setState({
          show_coulmns_filter: response.details
        })
      } else {
        this.setState({
          gst_list: []
        })
      }
    })
  }

  onChange_filterbysubvalue = val => {
    var sub_columns
    if (val === 2 || val === 3) {
      sub_columns = [1]
      if (val === 2) {
        if (jQuery('#cadchanges2').prop('checked') == true)
          this.setState({ cadchange: true })
        else this.setState({ cadchange: false })
      } else {
        if (jQuery('#cadpercentage2').prop('checked') == true)
          this.setState({ cadpercentage: true })
        else this.setState({ cadpercentage: false })
      }
    } else {
      sub_columns = [4]
      if (val === 5) {
        if (jQuery('#cadchanges1').prop('checked') == true)
          this.setState({ cadchange: true })
        else this.setState({ cadchange: false })
      } else {
        if (jQuery('#cadpercentage1').prop('checked') == true)
          this.setState({ cadpercentage: true })
        else this.setState({ cadpercentage: false })
      }
    }
    this.setState({ sub_columns: sub_columns }, () => {
      this.callAPIDATA()
      // alert(this.state.cadchange)
    })
  }

  onChange_filterby = val => {
    var sub_columns = [val]
    if (val === 1) {
      this.setState({ isChecked2: false, isChecked: true })
    } else {
      this.setState({ isChecked: false, isChecked2: true })
    }
    this.setState({ sub_columns: sub_columns }, () => {
      this.callAPIDATA()
    })

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
  }
  changetoDate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery('#todate').val()
    if (date != undefined && date!='') {
    var array = date.split('/')
    var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    if(array!='' && array!=undefined){
    this.setState({ end_date: date_formated, start_date: '2019-01-01' }, () => {
      this.callAPIDATA()
    })
  }
  }
    // this.state.end_date = moment(date).format('YYYY-MM-DD')
    //  alert(moment(todate).format('YYYY-MM-DD'))
  }


  valSet(id, idx, array) {
    console.log(id, idx, array)
    array.map((val, index) => {
      if (idx == index) {
        this.goToBreak(val.start, val.end, id)
      }
    })
  };

  dateTotalBreak(ind) {
    this.state.reportObject.map(
      (parentCategory, index) => {
        parentCategory.date_string_array.map((val, idx) => {
          if (ind == idx) {
            this.goToDateTotalBreak(val.start, val.end,)
          }
        })
      })
  };

  goToDateTotalBreak(start, end) {
    let id = ""
    var date1 = moment(start).format("YYYY-MM-DD")
    var date2 = moment(end).format("YYYY-MM-DD")
    window.open("/ap_aging_transactions?vendor_id=" + id + "&start=" + date1 + "&end=" + date2 + "&range=" + this.state.date_range)
  }

  goToVendorTotalBreak(ids) {
    let id = ids;
    var date1 =  "1970-01-01";
    var date2 = "";
    window.open("/ap_aging_transactions?vendor_id=" + id + "&start=" + date1 + "&end=" + date2 + "&range=" + this.state.date_range)
  }

  goToBreak(start, end, id) {
    console.log(start, end, id)
    var date1 = start !=''?moment(start).format("YYYY-MM-DD"): "1970-01-01"
    var date2 = moment(end).format("YYYY-MM-DD")
    window.open("/ap_aging_transactions?vendor_id=" + id + "&start=" + date1 + "&end=" + date2 + "&range=" + this.state.date_range)
  }
  totalBreak() {
    let id = "";
    var date1 = "1970-01-01";
    var date2 = "";
    window.open("/ap_aging_transactions?vendor_id=" + id + "&start=" + date1 + "&end=" + date2 + "&range=" + this.state.date_range)
  }


  callAPIDATA() {
    this.setState({ loading: true })
    let filter_id = this.state.result_array
    let filter_options = {
      1: {
        condition: this.state.valueAmount_type,
        value: this.state.valueAmount,
        from: this.state.From,
        to: this.state.To
      },
      3: { condition: '', value: '', from: this.state.changefromDate_duedate, to: this.state.todate_duedate },
      5: {
        condition: '',
        value: [...this.state.selected_vendor_ids],
        from: '',
        to: ''
      },
      6: {
        condition: '',
        value: [...this.state.selectedCurrencies],
        from: '',
        to: ''
      },
      8: { condition: '', value: '', from: this.state.date_start, to: this.state.date_end },

      11: { condition: "", value: this.state.text1, from: '', to: '', },
      17: { condition: "", value: this.state.text2, from: '', to: '', },
      24: { condition: "", value: this.state.text3, from: '', to: '', },
      25: { condition: "", value: this.state.text4, from: '', to: '', },
      26: { condition: "", value: this.state.text5, from: '', to: '', },
      27: { condition: "", value: this.state.text6, from: '', to: '', },
      28: { condition: "", value: this.state.text7, from: '', to: '', },

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

    }

    FetchAllApi.filter_column(this.state.all_report_name_id,this.state.logged_client_id,null, (errResponse, filtervalue) => {
      console.log('Filter Result', filtervalue)
      this.setState({ filtervalue: filtervalue })
    })
    let { start_date, end_date } = this.state
    var interval = this.state.interval
    var duedays = this.state.duedays

    if (interval === '') {
      interval = 20
    }
    if (duedays === '') {
      duedays = 85
    }

    FetchAllApi.ap_aging_summary(
      start_date,
      end_date,
      this.state.logged_client_id,
      parseInt(interval),
      parseInt(duedays),
      filter_id,
      filter_options,

      (err, response) => {

        if (response.details) {
          var myarray = response.details.map((item) => {
            return item.total_amount
          })
          if (myarray) {
            var total_amount = myarray.reduce((a, b) => {
              return a + b
            }, 0)
          }
        }

        console.log('myarray', myarray)
        if (response.status === 1) {

          var arrayOfElements = []
          var numberOfColumns = []
          var dateList = []

          for (let category in response.details) {
            if (response.details.hasOwnProperty(category)) {
              numberOfColumns = response.details[category].date_array.length
              dateList = response.details[category].date_array
              arrayOfElements.push(response.details[category])
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
            total_amnt_array: response.total_amount,
            totalAmount: total_amount,
            loading: false
          })
        } else {
          this.setState({
            balance_sheet_data: [],
            dateList: [],
            bankbalance: [],
            total_assets: [],
            total_liabilities: [],
            total_equity: [],
            reportObject: [],
            total_amnt_array: [],
            loading: false

          })
        }
      }
    )
  }
  changevaluetotals() {
    this.state.changetotal1 = this.state.changetotal
    this.state.changetotal = 0
  }
  changevalueper() {
    this.state.changetotal3 = this.state.changetotal2
    this.state.changetotal2 = 0
  }
  changevalueperx(value) {
    let x =
      (parseFloat(this.state.changetotal) - parseFloat(value)) / value / 100
    if (x || isNaN(x)) x = 0
    this.state.changetotal2 = x.toFixed(2) + ' %'
  }
  changevaluetotalsx(value) {
    this.state.changetotal = parseInt(this.state.changetotal) - parseInt(value)
  }

  render() {
    let balance_sheet_data = this.state.balance_sheet_data
    let total = 0

    let total_array = []
    let array = []
    if (this.state.reportObject.length > 0) {
      total_array = this.state.reportObject[0].amount_array.map(i => 0)
    }


    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <LeftSidebar history={this.props.history} pageSubmit={e => this.pageLink(e)} />

            {/* MainContent Wrapper Starts here */}
            <div className='main-wrap col-md-12 col-xs-12 pad-r-no'>
              <div className='top-bar col-md-12 col-xs-12 pad-r-no'>
                <div className='nav-brand-res visible-xs'>
                  <img
                    className='img-responsive'
                    src='../images/logo-icon.png'
                    alt='LogoIcon'
                  />
                </div>
                <span className='page-title hidden-xs'>Vendor Aging Summary</span>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='col-md-12 col-xs-12 mar-top visible-xs'>
                <a href='javascript:;' className='back'>
                  <img src='images/back-arrow-blue.svg' />
                </a>
                <span className='page-title'>Vendor Aging Summary</span>
              </div>
              {/* content-top Starts here */}
              <div className='content-top col-md-12 col-xs-12'>
                <h4 className='fw-sbold mar-t-no'>Vendor Aging Summary</h4>
                <h5 className='fw-sbold'>
                  {moment(new Date()).format('MMM YYYY')}
                </h5>
              </div>

              <div className='main-content col-md-12 col-xs-12'>
                <div className='content-sec col-md-12 col-xs-12 pad-no mar-t-no'>
                  <div className='report-setting'>
                    <form className='custom-form form-inline'>
                      <div className='form-group mar-rgt'>
                        <label>Date Range</label>
                        <div className="form-cont" >
                          <select
                            id="custom"
                            className="selectpicker form-control hh "
                            data-live-search="true"
                            value={this.state.date_range}
                            onChange={e => this.changedatevalue(e.target.value)}
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
                      <div className='form-group mar-rgt' style={{ display: 'none' }} >
                        <label>From</label>
                        <div
                          className='input-group date mar-t-no'
                          data-date-format='dd/mm/yyyy'
                        >
                          <input
                            type='text'
                            id='fromdate'
                            onBlur={(e) => {
                              let value = e.target.value
                              this.setState({date_range: "Custom"})
                              jQuery("#custom").val("Custom")
                              setTimeout(() => { this.changefromDate(value) }, 500)
                            }}
                            className='form-control'
                            autoComplete='off'
                          />
                          <div className='input-group-addon' onClick={() => jQuery('#fromdate').focus()}>
                            <img src='images/calendar-icon.svg' alt='icon' />
                          </div>
                        </div>
                      </div>
                      <div className='form-group mar-rgt'>
                        <label>Select Date</label>
                        <div
                          className='input-group date mar-t-no'
                          data-date-format='dd/mm/yyyy'
                        >
                          <input
                            type='text'
                            id='todate'
                            onBlur={(e) => {
                              let value = e.target.value
                              this.setState({date_range: "Custom"})
                              jQuery("#custom").val("Custom")
                              setTimeout(() => { this.changetoDate(value) }, 500)
                            }}
                            className='form-control'
                            autoComplete='off'
                          />
                          <div className='input-group-addon' onClick={() => jQuery('#todate').focus()}>
                            <img src='images/calendar-icon.svg' alt='icon' />
                          </div>
                        </div>
                      </div>
                      <a href='javascript:;' className='text-link filter-btn'>
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

                    {/* <div className='pull-right'>
                      <div className='dropdown menu-item'>
                        <button
                          className='btn btn-green dropdown-toggle btn-arrow'
                          data-toggle='dropdown'
                          aria-expanded='false'
                        >
                          Export
                          <span className='caret' />
                        </button>
                        <ul className='dropdown-menu align-right'>
                          <li>
                            <a href='javascript:;'>Export as PDF</a>
                          </li>
                          <li>
                            <a href='javascript:;'>Export as Excel</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    
                     */}
                    <div className='col-md-12 col-xs-12 report-filter'>
                      <a href='javascript:;' className='close-btn'>
                        <img src='images/icons8-minus.png' />
                      </a>
                      <form className='custom-form'>
                        <div className='col-lg-4 col-md-12 pad-l-no'>
                          <div className='row'>
                            <div className='form-group col-md-12 col-xs-12'>
                              <div className='row'>


                                <div className='col-lg-5 col-md-3'>
                                  <label className='fw-sbold'>
                                    Interval(days){' '}
                                  </label>
                                </div>
                                <div className='col-lg-7 col-md-9'>
                                  <div className='custom-select-drop dropdown'>
                                    <input
                                      id='interval'
                                      autoComplete='off'
                                      className='form-control'
                                      maxlength='2'
                                      onChange={() => {
                                        if (
                                          !isNaN(
                                            parseInt(jQuery('#interval').val())
                                          )
                                        ) {
                                          this.setState(
                                            {
                                              interval: jQuery(
                                                '#interval'
                                              ).val()
                                            },
                                            () => {
                                              this.callAPIDATA()
                                            }
                                          )
                                        } else {
                                          jQuery('#interval').val('')
                                          this.setState(
                                            { interval: '' },
                                            () => {
                                              this.callAPIDATA()
                                            }
                                          )
                                        }
                                      }}
                                    />
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


                            <div className='form-group col-md-12 col-xs-12'>
                              <div className='row'>
                                <div className='col-lg-5 col-md-3'>
                                  <label className='fw-sbold'>
                                    Through(days past due){' '}
                                  </label>
                                </div>
                                <div className='col-lg-7 col-md-9'>
                                  <div className='custom-select-drop dropdown'>
                                    <input
                                      id='duedays'
                                      autoComplete='off'
                                      className='form-control'
                                      maxlength='3'
                                      onChange={() => {
                                        if (
                                          !isNaN(
                                            parseInt(jQuery('#duedays').val())
                                          )
                                        ) {
                                          this.setState(
                                            {
                                              duedays: jQuery('#duedays').val()
                                            },
                                            () => {
                                              this.callAPIDATA()
                                            }
                                          )
                                        } else {
                                          jQuery('#duedays').val('')
                                          this.setState({ duedays: '' }, () => {
                                            this.callAPIDATA()
                                          })
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className='form-group col-md-12 col-xs-12 mar-b-no'></div> */}
                          </div>
                        </div>
                        <div className='col-lg-8 col-md-12 pad-r-no'>
                          <div className='row'>
                            {/* <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                              <div className='col-md-4 col-sm-4'>
                                <label className='custom-checkbox'>
                                  <input
                                    type='checkbox'
                                    name
                                    checked={this.state.isChecked}
                                    onClick={() => this.onChange_filterby(1)}
                                  />{' '}
                                  Previous Period
                                  <span className='checkmark' />
                                </label>
                                {this.state.isChecked && (
                                  <div className='checkbox-block'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='cadchanges2'
                                        defaultChecked={false}
                                        onClick={() =>
                                          this.onChange_filterbysubvalue(2)
                                        }
                                      />{' '}
                                      CAD Change
                                      <span className='checkmark' />
                                    </label>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='cadpercentage2'
                                        defaultChecked={false}
                                        onClick={() =>
                                          this.onChange_filterbysubvalue(3)
                                        }
                                      />{' '}
                                      % Change
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                )}
                              </div>
                              <div className='col-md-4 col-sm-4'>
                                <label className='custom-checkbox'>
                                  <input
                                    type='checkbox'
                                    name
                                    checked={this.state.isChecked2}
                                    onClick={() => this.onChange_filterby(4)}
                                  />{' '}
                                  Previous Year
                                  <span className='checkmark' />
                                </label>
                                {this.state.isChecked2 && (
                                  <div className='checkbox-block'>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='cadchanges1'
                                        defaultChecked={false}
                                        onClick={() =>
                                          this.onChange_filterbysubvalue(5)
                                        }
                                      />{' '}
                                      CAD Change
                                      <span className='checkmark' />
                                    </label>
                                    <label className='custom-checkbox'>
                                      <input
                                        type='checkbox'
                                        id='cadpercentage1'
                                        defaultChecked={false}
                                        onClick={() =>
                                          this.onChange_filterbysubvalue(6)
                                        }
                                      />{' '}
                                      % Change
                                      <span className='checkmark' />
                                    </label>
                                  </div>
                                )}
                              </div>
                            </div>
                           */}
                          </div>
                        </div>
                        <div className='col-lg-1 col-md-12 pad-r-no'>
                          <div className='row'></div>
                        </div>
                        {this.state.selectedFil == 5 && (
                          <div
                            className='col-lg-4 col-md-12 pad-r-no'
                            style={{ paddingLeft: 55 }}
                            id='hideme'
                          >
                            <div className='row'>
                              <div className='form-group col-md-12 col-xs-12'>
                                <div id={1} style={{ display: 'block' }}>
                                  <div className='custom-select-drop dropdown'>
                                    <label>Name</label>
                                    <select
                                      className='selectpicker'
                                      multiple
                                      data-live-search='true'
                                      onChange={e => this.selectedVendorIds(e)}
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
                                            )
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
                          <div className='col-lg-4 col-md-12 pad-r-no'>
                            <div className='row'>
                              <div className='form-group mar-rgt'>
                                <label>From</label>
                                <div
                                  className='input-group date mar-t-no'
                                  data-date-format='dd/mm/yyyy'
                                >
                                  <input
                                    type='text'
                                    id='fromdate_duedate'
                                    onBlur={(e) => {
                                      let value = e.target.value
                                      setTimeout(() => {
                                        this.changefromDate_duedate(value)
                                      }, 500)
                                    }}
                                    className='form-control'
                                    autoComplete='off'
                                    style={{ height: '43px' }}
                                  />
                                  <div className='input-group-addon' onClick={() => jQuery('#fromdate_duedate').focus()}>
                                    <img
                                      src='images/calendar-icon.svg'
                                      alt='icon'
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='form-group mar-rgt'>
                                <label>To</label>
                                <div
                                  className='input-group date mar-t-no'
                                  data-date-format='dd/mm/yyyy'
                                >
                                  <input
                                    type='text'
                                    id='todate_duedate'
                                    onBlur={(e) => {
                                      let value = e.target.value
                                      setTimeout(() => {
                                        this.changetoDate_duedate(value)
                                      }, 500)
                                    }}
                                    className='form-control'
                                    autoComplete='off'
                                    style={{ height: '43px' }}
                                  />
                                  <div className='input-group-addon' onClick={() => jQuery('#todate_duedate').focus()}>
                                    <img
                                      src='images/calendar-icon.svg'
                                      alt='icon'
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>{' '}
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
                            className='col-lg-4 col-md-12 pad-r-no'
                            style={{ paddingLeft: 55 }}
                            id='hideme'
                          >
                            <div className='row'>
                              <div className='form-group col-md-12 col-xs-12'>
                                <div id={1} style={{ display: 'block' }}>
                                  <div className='custom-select-drop dropdown'>
                                    <label>Currency</label>
                                    <select
                                      className='selectpicker'
                                      multiple
                                      data-live-search='true'
                                      id='slectedCurrency'
                                      onChange={e => {
                                        this.multiSelectedCurrency(e.target.value)
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
                                            )
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
                            className='col-lg-4 col-md-12 pad-r-no'
                            style={{ paddingLeft: 55 }}
                            id='hideme'
                          >
                            <div className='row'>
                              <div className='form-group col-md-12 col-xs-12'>
                                <div id={1} style={{ display: 'block' }}>
                                  <label className='custom-checkbox mar-rgt'>
                                    <input
                                      type='radio'
                                      id='male'
                                      name='gender'
                                      defaultValue={'='}
                                      onChange={e => {
                                        this.customRadioChange(e.target.value)
                                      }}
                                    />
                                  =
                                  <span className='checkmark' />
                                  </label>
                                  <label className='custom-checkbox mar-rgt'>
                                    <input
                                      type='radio'
                                      id='male'
                                      name='gender'
                                      defaultValue={'<='}
                                      onChange={e => {
                                        this.customRadioChange(e.target.value)
                                      }}
                                    />
                                  &lt;=
                                  <span className='checkmark' />
                                  </label>
                                  <label className='custom-checkbox mar-rgt'>
                                    <input
                                      type='radio'
                                      id='male'
                                      name='gender'
                                      defaultValue={'>='}
                                      onChange={e => {
                                        this.customRadioChange(e.target.value)
                                      }}
                                    />
                                  &gt;=
                                  <span className='checkmark' />
                                  </label>
                                  <label className='custom-checkbox mar-rgt'>
                                    <input
                                      type='radio'
                                      id='male'
                                      name='gender'
                                      defaultValue={'true'}
                                      onChange={e => {
                                        this.customRadioChange(e.target.value)
                                      }}
                                    />
                                  any
                                  <span className='checkmark' />
                                  </label>
                                  <div>
                                    <input
                                      type='text'
                                      id='male'
                                      name='valueAmount'
                                      className='form-control'
                                      onChange={this.changeText}
                                      style={{ width: '128px' }}

                                    />
                                  </div>

                                  <div>
                                    <div>
                                      <label>From</label>
                                      <input
                                        type='text'
                                        id='male'
                                        name='From'
                                        className='form-control'
                                        style={{ width: '128px' }}
                                        onChange={this.changeText}
                                      />
                                    </div>
                                    <div>
                                      <label>To</label>
                                      <input
                                        type='text'
                                        id='male'
                                        name='To'
                                        onChange={this.changeText}
                                        className='form-control'
                                        style={{ width: '128px' }}
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
                                      onChange={(e) => this.selectedVendor_type(e)}
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

                      </form>
                    </div>
                  </div>

                  <div className='report-table'>
                    <div className='table-responsive' id='sticky-tb-hdr'>
                      <Loader
                        type='ThreeDots'
                        color='#00BFFF'
                        height={100}
                        width={100}
                        visible={this.state.loading}
                      />
                      {
                        !this.state.loading &&
                        <table className='table'>
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              {/*add the new table headers based on the filter*/
                                this.state.dateList.map((date, index) => {
                                  return (
                                    <React.Fragment>
                                      <th className='text-right'>
                                        {date}
                                        <i className='th-sort'>
                                          <img
                                            src='../images/sort-icon.svg'
                                            alt='SortIcon'
                                          />
                                        </i>
                                      </th>
                                      {/* <th className='text-right'>
                              Total
                              <i className='th-sort'>
                                <img
                                  src='../images/sort-icon.svg'
                                  alt='SortIcon'
                                />
                              </i>
                            </th> */}

                                      {this.state.cadchange && index % 2 !== 0 && (
                                        <th className='text-right'>
                                          Change
                                          <i className='th-sort'>
                                            <img
                                              src='../images/sort-icon.svg'
                                              alt='SortIcon'
                                            />
                                          </i>
                                        </th>
                                      )}
                                      {this.state.cadpercentage && index % 2 !== 0 && (
                                        <th className='text-right'>
                                          % Change
                                          <i className='th-sort'>
                                            <img
                                              src='../images/sort-icon.svg'
                                              alt='SortIcon'
                                            />
                                          </i>
                                        </th>
                                      )}
                                    </React.Fragment>
                                  )
                                })}
                              <th className='text-right'>
                                Total
                        <i className='th-sort'>
                                  <img
                                    src='../images/sort-icon.svg'
                                    alt='SortIcon'
                                  />
                                </i>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.reportObject.map(
                              (parentCategory, index) => {
                                let totalParent = parentCategory.total_amount

                                var sum = total_array.map(function (num, idx) {
                                  return num + parentCategory.amount_array[idx];
                                })

                                total_array = sum

                                console.log('asjhgdkja', this.state.reportObject)
                                return (
                                  <>
                                    {/* <tr className='title-1'>
                              <td>{parentCategory.account_type}</td>
                              {this.state.dateList.map(eachDate => {
                                return <td>&nbsp;</td>
                              })}
                            </tr> */}

                                    {parentCategory &&
                                      parentCategory.sub_categories &&
                                      parentCategory.sub_categories.map(
                                        eachCategory => {
                                          let subValue = {}
                                          for (let subCategory in eachCategory) {
                                            if (
                                              eachCategory.hasOwnProperty(
                                                subCategory
                                              )
                                            ) {
                                              subValue = eachCategory[subCategory]
                                              return (
                                                <>
                                                  <tr className='item-step1'>
                                                    {subValue && (
                                                      <td>
                                                        <span>{subValue}</span>
                                                      </td>
                                                    )}
                                                    {eachCategory.amount_array &&
                                                      eachCategory.amount_array.map(
                                                        (value, indexValue) => {
                                                          return (
                                                            <React.Fragment>
                                                              <td >
                                                                <span className='text-right'>
                                                                  <a href='javascript:;'>
                                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                                      { style: 'currency', currency: this.state.home_currency }).format(value)).replace(this.state.home_currency_symbol, '')}

                                                                    {/* {value.toFixed(
                                                                      2
                                                                    )} */}
                                                                  </a>
                                                                </span>
                                                              </td>
                                                              {this.state
                                                                .cadchange &&
                                                                indexValue % 2 !==
                                                                0 ? (
                                                                <React.Fragment>
                                                                  {this.changevaluetotals()}

                                                                  <td>
                                                                    <span className='text-right'>
                                                                      <a href='javascript:;'>
                                                                        {
                                                                          this
                                                                            .state
                                                                            .changetotal1
                                                                        }
                                                                      </a>
                                                                    </span>
                                                                  </td>
                                                                </React.Fragment>
                                                              ) : (
                                                                this.changevaluetotalsx(
                                                                  value
                                                                )
                                                              )}
                                                              {this.state
                                                                .cadpercentage &&
                                                                indexValue % 2 !==
                                                                0 ? (
                                                                <React.Fragment>
                                                                  {this.changevalueper()}

                                                                  <td>
                                                                    <span className='text-right'>
                                                                      <a href='javascript:;'>
                                                                        {
                                                                          this
                                                                            .state
                                                                            .changetotal3
                                                                        }
                                                                      </a>
                                                                    </span>
                                                                  </td>
                                                                </React.Fragment>
                                                              ) : (
                                                                this.changevalueperx(
                                                                  value
                                                                )
                                                              )}
                                                            </React.Fragment>
                                                          )
                                                        }
                                                      )}
                                                  </tr>
                                                </>
                                              )
                                            }
                                          }
                                        }
                                      )}
                                    <tr className='item-step1'>
                                      <td>
                                        <span>{parentCategory.vendor_name}</span>
                                      </td>
                                      {parentCategory.amount_array &&
                                        parentCategory.amount_array.map(
                                          (total, indexValue) => {
                                            let index = indexValue
                                            return (
                                              <React.Fragment>

                                                <td onDoubleClick={() => { this.valSet(parentCategory.vendor_id, index, parentCategory.date_string_array) }}>
                                                  <span className='text-right'>
                                                    {' '}
                                                    {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                                      { style: 'currency', currency: this.state.home_currency }).format(total)).replace(this.state.home_currency_symbol, '')}

                                                    {/* {total.toFixed(2)} */}
                                                  </span>
                                                </td>

                                                {this.state.cadchange &&
                                                  indexValue % 2 !== 0 ? (
                                                  <React.Fragment>
                                                    {this.changevaluetotals()}

                                                    <td>
                                                      <span className='text-right'>
                                                        <a href='javascript:;'>
                                                          {
                                                            this.state
                                                              .changetotal1
                                                          }
                                                        </a>
                                                      </span>
                                                    </td>
                                                  </React.Fragment>
                                                ) : (
                                                  this.changevaluetotalsx(total)
                                                )}
                                                {this.state.cadpercentage &&
                                                  indexValue % 2 !== 0 ? (
                                                  <React.Fragment>
                                                    {this.changevalueper()}

                                                    <td>
                                                      <span className='text-right'>
                                                        <a href='javascript:;'>
                                                          {
                                                            this.state
                                                              .changetotal3
                                                          }
                                                        </a>
                                                      </span>
                                                    </td>
                                                  </React.Fragment>
                                                ) : (
                                                  this.changevalueperx(total)
                                                )}
                                              </React.Fragment>
                                            )
                                          }
                                        )}
                                      <td onDoubleClick={() => { this.goToVendorTotalBreak(parentCategory.vendor_id) }}>
                                        <span className='text-right'>
                                          {' '}
                                          {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                            { style: 'currency', currency: this.state.home_currency }).format(parentCategory.total_amount)).replace(this.state.home_currency_symbol, '')}

                                          {/* {parentCategory.total_amount.toFixed(2)} */}
                                        </span>
                                      </td>
                                    </tr>
                                  </>
                                )
                              }
                            )}

                            <tr className='item-step1 title1 bdr-no'>
                              <td>
                                <span>Total</span>
                              </td>

                              {total_array &&
                                total_array.map((amount, index) => {
                                  return (
                                    <td onDoubleClick={() => { this.dateTotalBreak(index) }}>
                                      <span className='text-right'>
                                        {/* {amount.toFixed(2)} */}
                                        {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                          { style: 'currency', currency: this.state.home_currency }).format(amount)).replace(this.state.home_currency_symbol, '')}
                                      </span>
                                    </td>
                                  )
                                })}
                              <td onDoubleClick={() => { this.totalBreak() }}>
                                <span className='text-right'>
                                  {/* {parseFloat(this.state.totalAmount).toFixed(2)} */}
                                  {(new Intl.NumberFormat(this.state.language_code + '-' + this.state.country_sortname,
                                    { style: 'currency', currency: this.state.home_currency }).format(this.state.totalAmount)).replace(this.state.home_currency_symbol, '')}

                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      }
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
        <footer className='container-fluid'>
          <p>?? Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
      </div>
    )
  }
}
export default ap_aging_summary