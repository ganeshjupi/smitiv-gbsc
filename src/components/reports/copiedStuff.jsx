import React from 'react'
import LeftSidebar from '../left_sidebar'
import Footer from '../footer'
import FetchAllApi from '../../api_links/fetch_all_api'
import config from '../../api_links/api_links'
import Topbar from '../topbar'

import moment from 'moment'
import { PDFtoIMG } from 'react-pdf-to-image'
import DatePicker from 'react-date-picker'
import Loader from 'react-loader-spinner'

import jQuery from 'jquery'
import { object } from 'prop-types'
// import 'bootstrap';
// import 'bootstrap-select';
class open_invoice extends React.Component {
  constructor(props) {
    super(props)
    //const { history CONVER} = this.props;
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
      start_date: '2020-01-01',
      end_date: '2020-01-31',
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
      selectedCurrencies: '',
      selected_vendor_ids: [],
      changefromDate_duedate: '',
      todate_duedate: '',

      data: [
        {
          id: 1,
          // heading_name: "Trans#",
          heading_name: "Transction Number",
          clsname: 'trans'
        },
        {
          id: 2,
          heading_name: 'Last Modified',
          clsname: 'lastmodified'
        },
        {
          id: 3,
          heading_name: 'Last Modified By',
          clsname: 'lastmodifiedby'
        },
        {
          id: 4,
          heading_name: 'Num',
          clsname: 'num'
        },
        {
          id: 5,
          heading_name: 'Memo',
          clsname: 'memo'
        },
        {
          id: 6,
          heading_name: 'Account',
          clsname: 'account'
        },
        {
          id: 7,
          heading_name: 'Open Balance',
          clsname: 'openbalance'
        },
        {
          id: 8,
          heading_name: 'Debit',
          clsname: 'debit'
        },
        {
          id: 9,
          heading_name: 'Credit',
          clsname: 'credit'
        },
        {
          id: 10,
          heading_name: 'Balance',
          clsname: 'balance'
        },
        {
          id: 11,
          heading_name: 'Currency',
          clsname: 'currency'
        },
        {
          id: 12,
          heading_name: 'Exchange Rate',
          clsname: 'exchangerate'
        }
      ],
      response: [],

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
      customer_type: [],
      selectedCustomer_type: [],


    }
  }


  rename = (obj, curr) => {
    let a = {}
    Object.keys(obj).map((key) => {
      let newKey = key.replace(curr, '')
      Object.assign(a, { [newKey]: obj[key] })
    })
    return a
  }


  all_report_name = () => {

    FetchAllApi.all_report_name((err, response) => {
      if (response.status === 1) {
        let report_ids = response.response
        for (var i = 0; i < report_ids.length; i++) {
          if (report_ids[i].column_name == 'Open_invoices') {
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
    var client_id = 1;

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
      this.setState({ date_start: date_formated }, () => {
        this.callAPIDATA();
      });
    }
  }

  changetoDate1(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery("#todate1").val();
    if (date != undefined && date!='') {
    var array = date.split("/");
    var date_formated = array[2] + "-" + array[1] + "-" + array[0];
    console.log("ewewew", array);
    this.setState({ date_end: date_formated }, () => {
      this.callAPIDATA();
    });
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
        result.push(Number(opt.value) || Number(opt.text))
      } else {
      }
    }
  }

  customer_type = () => {
    FetchAllApi.customerTypes((err, response) => {
      console.log('Customer list', response)
      if (response.status === 1) {
        this.setState({ customer_type: response.lists })
      } else {
        this.setState({ customer_type: [] })
      }
    })
  }


  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh');
    window.jQuery('.input-group.date').datepicker({ format: "dd/mm/yyyy" });//DidUpdate
  }
  componentDidMount() {
    this.all_report_name()
    this.get_col()
    this.get_currencies() //didMount 
    this.get_vendorNames()

    this.paymentTerms()
    this.vendor_type()
    this.customer_type()


    // this.show_columnslist()
    // jQuery('.custom-select-drop .dropdown-menu a').click(function () {
    //   jQuery('.open.custom-select-drop .dropdown-menu li.active').removeClass(
    //     'active'
    //   )
    //   jQuery(this)
    //     .parent('li')
    //     .addClass('active')
    //   jQuery('.open #selected').text(jQuery(this).text())
    // })

    window.jQuery('.input-group.date').datepicker({ format: 'dd/mm/yyyy' })

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
    this.callAPIDATA()
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  get_col = () => {
    let report_id = 7
    FetchAllApi.get_col(this.state.logged_client_id,report_id, (err, response) => {
      if (response.status === 1) {
        var active = []
        let active_headings = response.response.map(item => {
          if (item.status === 1) {
            active.push(item.heading_name)
          }
        })
        let coulmns_head = response.response
        let optionList = ''
        if (coulmns_head) {
          var options = coulmns_head.map((item, i) => {
            return <option>{item.heading_name}</option>
          })
        }

        this.setState({
          selected_vals: active,
          coulmns_head: coulmns_head,
          options: options
        })
      } else {
        this.setState({
          gst_list: []
        })
      }
    })
  }

  selected_item = e => {
    var index = e.target.selectedIndex
    var optionElement = e.target.childNodes[index]
    let show_columns = optionElement.getAttribute('data-id')
    this.setState({ show_columns: show_columns }, () => {
      this.callAPIDATA()
    })
  }
  selected_items = e => {
    var index = e.target.selectedIndex
    var optionElement = e.target.childNodes[index]
    let show_columns = optionElement.getAttribute('data-id')

    // this.setState({ show_columns: show_columns }, () => {
    //   this.callAPIDATA()
    // })
  }

  slected_itemid = id => {
   // alert(id)
  }
  changedatevalue(seleteddateformat) {
    var dateresult = moment()
    let from_date, to_date

    if (seleteddateformat === 'This Month-to-date') {
      from_date = dateresult.startOf('month')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      document.getElementById('todate').value = moment(new Date()).format(
        'YYYY-MM-DD'
      )
      this.state.end_date = moment(new Date()).format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Week') {
      from_date = dateresult.startOf('week')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      console.log('startdate', this.state.start_date)
      to_date = dateresult.endOf('week')
      document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Month') {
      from_date = dateresult.startOf('month')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = dateresult.endOf('month')
      document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Week-to-date') {
      from_date = dateresult.startOf('week')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      document.getElementById('todate').value = moment(new Date()).format(
        'YYYY-MM-DD'
      )
      this.state.end_date = moment(new Date()).format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Year') {
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = dateresult.endOf('year')
      document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === 'This Year-to-date') {
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = moment(new Date()).format('YYYY-MM-DD')
      document.getElementById('todate').value = to_date
      this.state.end_date = to_date
      this.callAPIDATA()
    }
    let startDate = jQuery('#fromdate').val()
    let end_date = jQuery('#todate').val()
    this.setState({ start_date: startDate, end_date: end_date }, () => {
      this.callAPIDATA()
    })
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
      if (val === 2) this.setState({ cadchange: true, cadpercentage: false })
      else this.setState({ cadchange: false, cadpercentage: true })
    } else {
      sub_columns = [4]
      if (val === 5) this.setState({ cadchange: true, cadpercentage: false })
      else this.setState({ cadchange: false, cadpercentage: true })
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
  }
  changetoDate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery('#todate').val()
    if (date != undefined && date!='') {
    var array = date.split('/')
    var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    console.log('ewewew', array)
    this.setState({ end_date: date_formated }, () => {
      this.callAPIDATA()
    })
  }
    // this.state.end_date = moment(date).format('YYYY-MM-DD')
    //  alert(moment(todate).format('YYYY-MM-DD'))
  }

  callAPIDATA() {
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
      29: {
        condition: "",
        value: [...this.state.selectedCustomer_type],
        from: "",
        to: "",
      },

    }

    FetchAllApi.filter_column(this.state.all_report_name_id,this.state.logged_client_id,null, (errResponse, filtervalue) => {
      console.log('Filter Result', filtervalue)
      this.setState({ filtervalue: filtervalue })
    })
    this.setState({ loading: true })
    let { start_date, end_date, show_columns, sub_columns } = this.state
    console.log('start date', start_date)
    console.log('End date', end_date)

    FetchAllApi.open_invoices(
      start_date,
      end_date,
      show_columns,
      1,
      sub_columns,
      filter_id,
      filter_options,
      (err, response) => {


        if (response.status === 1) {
          console.log('1111111res1', response)
          console.log('1111111res2', response.details)
          this.setState({
            response: Object.values(response.details),
            customername: response, loading: false
          })
          // console.log

        } else {
          this.setState({ response: [], customername: [], loading: false })
        }
      }
    )
  }
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  changetoDate_duedate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery('#todate_duedate').val()
    if (date != undefined && date!='') {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      console.log('ewewew', array)
      this.setState({ todate_duedate: date_formated }, () => {
        this.callAPIDATA()
      })
    }
  }
  changefromDate_duedate(fromdate) {
    let date = jQuery('#fromdate_duedate').val()
    console.log("fromdate RTEdsadaasdadasdadad", date)
    if (date != undefined && date!='') {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      console.log("fromdate RTERE", date_formated)
      this.setState({ changefromDate_duedate: date_formated }, () => {
        this.callAPIDATA()
      })
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




  get_currencies = () => {
    // fetch('https://api.exchangerate-api.com/v4/latest/SGD')
    fetch(`https://api.currencylayer.com/live?access_key=${config.api_key}&source=SGD`)

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
    let client_id = 1
    // alert('hjgh')
    FetchAllApi.getCustomerNames(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({ vendorNames: response.list })
      } else {
      }
    })
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
      if (result.includes(29)) { this.setState({ selectedFil: 29 }) }

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
        var vas = { customer_id: opt.value || opt.text, job_id: 0 }
        result.push(vas)
      } else {
      }
    }
  }
  convertToarray(str) {
    console.log('subcat string', str)
    console.log('Sub Cat', Object.values(str))
    return Object.values(str)
  }
  show_coulmn_filter = e => {
    var result = []
    var options = e.target.options
    var opt
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i]

      if (opt.selected) {
        result.push(opt.value || opt.text)
        var optvals = parseInt(opt.value) + 1
        jQuery(
          'td:nth-child(' + optvals + '),th:nth-child(' + optvals + ')'
        ).show()
      } else {
        var optvals = parseInt(opt.value) + 1
        jQuery(
          'td:nth-child(' + optvals + '),th:nth-child(' + optvals + ')'
        ).hide()
      }
    }
  }

  changevaluetotals() {
    this.state.changetotal1 = this.state.changetotal
    this.state.changetotal = 0
  }
  changevaluetotalsx(value) {
    this.state.changetotal = parseInt(this.state.changetotal) - parseInt(value)
  }
  render() {
    console.log('oiiiioioi', this.state.selected_vals)
    // let balance_sheet_data = this.state.balance_sheet_data
    // let total = 0

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
                <span className='page-title hidden-xs'>Open Invoice</span>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='col-md-12 col-xs-12 mar-top visible-xs'>
                <a href='javascript:;' className='back'>
                  <img src='images/back-arrow-blue.svg' />
                </a>
                <span className='page-title'>Open Invoice</span>
              </div>
              {/* content-top Starts here */}
              <div className='content-top col-md-12 col-xs-12'>
                <h4 className='fw-sbold mar-t-no'>Open Invoices</h4>
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
                        <select
                          className='form-control'
                          onChange={e => this.changedatevalue(e.target.value)}
                        >
                          <option>This Month-to-date</option>
                          <option>This Week</option>
                          <option>This Month</option>
                          <option>This Week-to-date</option>
                          <option>This Year</option>
                          <option>This Year-to-date</option>
                        </select>
                      </div>
                      <div className='form-group mar-rgt'>
                        <label>From</label>
                        <div
                          className='input-group date mar-t-no'
                          data-date-format='dd/mm/yyyy'
                        >
                          <input
                            type='text'
                            id='fromdate'
                            onBlur={e => this.changefromDate(e.target.value)}
                            className='form-control'
                            autoComplete='off'
                          />
                          <div className='input-group-addon'>
                            <img src='images/calendar-icon.svg' alt='icon' />
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
                            id='todate'
                            onBlur={e => this.changetoDate(e.target.value)}
                            className='form-control'
                            autoComplete='off'
                          />
                          <div className='input-group-addon'>
                            <img src='images/calendar-icon.svg' alt='icon' />
                          </div>
                        </div>
                      </div>
                      <a href='javascript:;' className='text-link filter-btn'>
                        Advanced
                      </a>
                    </form>
                    <div className='pull-right'>
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
                            <a href='javascript:;' onClick={() => {
                              alert(jQuery('#mytable tr').length)
                            }}>Export as PDF</a>
                          </li>
                          <li>
                            <a href='javascript:;'>Export as Excel</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-md-12 col-xs-12 report-filter'>
                      <a href='javascript:;' className='close-btn'>
                        <img src='images/cross-red.svg' />
                      </a>

                      <form className='custom-form'>
                        <div className='col-lg-4 col-md-12 pad-l-no'>
                          <div className='row'>
                            <div className='form-group col-md-12 col-xs-12'>
                              <div className='row'>
                                <div className='col-lg-5 col-md-3'>
                                  <label className='fw-sbold'>
                                    Report Basics
                                  </label>
                                </div>
                                <div className='col-lg-7 col-md-9'>
                                  <label className='custom-checkbox radio mar-t-no mar-rgt'>
                                    <input
                                      type='radio'
                                      name='tax-item'
                                      defaultChecked='checked'
                                    />{' '}
                                    Accural
                                    <span className='checkmark' />
                                  </label>
                                  <label className='custom-checkbox radio'>
                                    <input type='radio' name='tax-item' /> Cash
                                    <span className='checkmark' />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className='form-group col-md-12 col-xs-12'>
                              <div className='row'>
                                <div className='col-lg-5 col-md-3'>
                                  <label className='fw-sbold'>Filter by</label>
                                </div>
                                <div className='col-lg-7 col-md-9'>
                                  <div className='custom-select-drop dropdown'>
                                    <select
                                      className='selectpicker'
                                      multiple
                                      data-live-search='true'
                                      onChange={e => this.selected_filters(e)}
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
                                            )
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
                                    Show Columns
                                  </label>
                                </div>
                                <div className='col-lg-7 col-md-9'>
                                  <div className='custom-select-drop dropdown'>
                                    {this.state.coulmns_head &&
                                      this.state.coulmns_head !== undefined && (
                                        <select
                                          className='selectpicker'
                                          id='myselect'
                                          multiple
                                          data-live-search='true'
                                          onChange={e =>
                                            this.show_coulmn_filter(e)
                                          }
                                        >
                                          {this.state.coulmns_head &&
                                            this.state.coulmns_head !==
                                            undefined &&
                                            this.state.coulmns_head &&
                                            this.state.coulmns_head.map(
                                              (item, i) => {
                                                let statusSelected = ''
                                                if (item.status === 1)
                                                  statusSelected = 'selected'

                                                return (
                                                  <option
                                                    value={i + 1}
                                                    selected={statusSelected}
                                                  >
                                                    {item.heading_name}
                                                  </option>
                                                )
                                              }
                                            )}
                                        </select>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='form-group col-md-12 col-xs-12 mar-b-no'>
                              <div className='row'>
                                <div className='col-lg-5 col-md-3'>
                                  <label className='fw-sbold'>Sort By</label>
                                </div>
                                <div className='col-lg-7 col-md-9'>
                                  <div className='custom-select-drop dropdown'>
                                    <a
                                      aria-expanded='false'
                                      aria-haspopup='true'
                                      role='button'
                                      data-toggle='dropdown'
                                      className='dropdown-toggle btn form-control'
                                      href='javascript:;'
                                    >
                                      <span id='selected'>Default</span>
                                      <span className='caret' />
                                    </a>
                                    <ul className='dropdown-menu'>
                                      <li className='active'>
                                        <a href='javascript:;'>Default</a>
                                      </li>
                                      <li>
                                        <a href='javascript:;'>Total</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                                    <label>Name &nbsp;</label>
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
                                                id={item.id}
                                                data-id={item.id}
                                                value={item.id}
                                              >
                                                {item.name}
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
                                    onBlur={e =>
                                      this.changefromDate_duedate(e.target.value)
                                    }
                                    className='form-control'
                                    autoComplete='off'
                                    style={{ height: '43px' }}
                                  />
                                  <div className='input-group-addon'>
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
                                    onBlur={e =>
                                      this.changetoDate_duedate(e.target.value)
                                    }
                                    className='form-control'
                                    autoComplete='off'
                                    style={{ height: '43px' }}
                                  />
                                  <div className='input-group-addon'>
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
                                    onBlur={(e) =>
                                      this.changefromDate1(e.target.value)
                                    }
                                    className="form-control"
                                    autoComplete="off"
                                    style={{ height: "43px" }}
                                  />
                                  <div className="input-group-addon">
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
                                    onBlur={(e) =>
                                      this.changetoDate1(e.target.value)
                                    }
                                    className="form-control"
                                    autoComplete="off"
                                    style={{ height: "43px" }}
                                  />
                                  <div className="input-group-addon">
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
                                      onChange={(e) => this.selectedCustomer_type(e)}
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
                  <div className='report-table'>
                    <div className='table-responsive'>
                      <Loader
                        type='ThreeDots'
                        color='#00BFFF'
                        height={100}
                        width={100}
                        visible={this.state.loading}
                      />
                      {!this.state.loading && (
                        <table className='table' id='mytable'>
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              {this.state.coulmns_head.map((x, y) => {
                                return (
                                  <th
                                    className='text-right'
                                    className={x.clsname}
                                  >
                                    {x.heading_name}
                                    <i className='th-sort'>
                                      <img
                                        src='../images/sort-icon.svg'
                                        alt='SortIcon'
                                      />
                                    </i>
                                  </th>
                                )
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className='title-1'>
                              <td>Customer Report</td>

                              {this.state.coulmns_head.map((x, y) => {
                                return <td className={x.clsname}>&nbsp;</td>
                              })}
                            </tr>

                            {this.state.response &&
                              this.state.response.map((entry, key) => {
                                let subcategoryvalues = entry.sub_categories
                                subcategoryvalues = this.convertToarray(
                                  subcategoryvalues[0]
                                )

                                return (
                                  <React.Fragment>
                                    <tr className='item-step1 sub-title'>
                                      <td>
                                        <div>{entry.customer_name}</div>
                                      </td>
                                      {this.state.coulmns_head.map((a, b) => {
                                        return (
                                          <td className={a.clsname}>
                                            <div>&nbsp;</div>
                                          </td>
                                        )
                                      })}
                                    </tr>

                                    {subcategoryvalues &&
                                      subcategoryvalues.map((entry1, key1) => {
                                        console.log(entry1)
                                        let invoices = this.convertToarray(
                                          entry1.sub_categories[0]
                                        )

                                        let invoiceTotals = 0

                                        return (
                                          <React.Fragment>
                                            <tr className='item-step1 sub-title'>
                                              <td>
                                                <div>{entry1.job_name}</div>
                                              </td>
                                              {this.state.coulmns_head.map(
                                                (a, b) => {
                                                  return (
                                                    <td className={a.clsname}>
                                                      <div>&nbsp;</div>
                                                    </td>
                                                  )
                                                }
                                              )}
                                            </tr>
                                            {entry1.invoices &&
                                              entry1.invoices.map(
                                                (
                                                  overallinvoice,
                                                  overallkeys
                                                ) => {
                                                  invoiceTotals =
                                                    invoiceTotals +
                                                    overallinvoice.grand_total_home_currency
                                                  return (
                                                    <React.Fragment>
                                                      <tr
                                                        className='item-step1 istep-3'
                                                        key={overallkeys}
                                                      >
                                                        <td className=''>
                                                          <span></span>
                                                        </td>

                                                        <td className='trans'>
                                                          <span>
                                                            {
                                                              overallinvoice.invoice_id
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className='lastmodified'>
                                                          <span>
                                                            {
                                                              overallinvoice.lastmodified
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className='lastmodifiedby'>
                                                          <span>
                                                            {
                                                              overallinvoice.lastmodifiedby
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className='num'>
                                                          <span>
                                                            {
                                                              overallinvoice.invoice_number
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className='memo'>
                                                          <span>
                                                            {
                                                              overallinvoice.memo
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className='account'>
                                                          <span>
                                                            {
                                                              overallinvoice.account
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.open_balance_home_currency
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.debit
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.credit
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.open_balance_home_currency
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.foreign_currency
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.exchange_rate
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.grand_total_foreign_currency
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.open_balance_foreign_currency
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.foreign_balance
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {overallinvoice.split !=
                                                              ''
                                                              ? overallinvoice.split
                                                              : ''}
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {overallinvoice.aging !=
                                                              ''
                                                              ? overallinvoice.aging
                                                              : ''}
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.terms
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.contact
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.postal_code
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.province
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.city
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.address
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.email
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.phone
                                                            }
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {entry1.job_name}
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {overallinvoice.fax}
                                                          </span>
                                                        </td>
                                                        <td className=''>
                                                          <span>
                                                            {
                                                              overallinvoice.type_name
                                                            }
                                                          </span>
                                                        </td>
                                                      </tr>
                                                    </React.Fragment>
                                                  )
                                                }
                                              )}
                                            {invoices &&
                                              invoices.map(
                                                (
                                                  invoicesubcat,
                                                  invoiceskeys
                                                ) => {
                                                  let invoicevals =
                                                    invoicesubcat.invoices
                                                  return (
                                                    <React.Fragment>
                                                      <tr className='item-step1 istep-2 sub-title'>
                                                        <td>
                                                          <div>
                                                            {
                                                              invoicesubcat.job_name
                                                            }
                                                          </div>
                                                        </td>
                                                        {this.state.coulmns_head.map(
                                                          (a, b) => {
                                                            return (
                                                              <td
                                                                className={
                                                                  a.clsname
                                                                }
                                                              >
                                                                <div>
                                                                  &nbsp;
                                                                </div>
                                                              </td>
                                                            )
                                                          }
                                                        )}
                                                      </tr>
                                                      {invoicevals &&
                                                        invoicevals.map(
                                                          (
                                                            overallinvoice,
                                                            overallkeys
                                                          ) => {
                                                            invoiceTotals =
                                                              invoiceTotals +
                                                              overallinvoice.grand_total_home_currency
                                                            return (
                                                              <React.Fragment>
                                                                <tr
                                                                  className='item-step1 istep-3'
                                                                  key={
                                                                    overallkeys
                                                                  }
                                                                >
                                                                  <td className=''>
                                                                    <span></span>
                                                                  </td>

                                                                  <td className='trans'>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.invoice_id
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className='lastmodified'>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.lastmodified
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className='lastmodifiedby'>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.lastmodifiedby
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className='num'>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.invoice_number
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className='memo'>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.memo
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className='account'>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.account
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.open_balance_home_currency
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.debit
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.credit
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.open_balance_home_currency
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.foreign_currency
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.exchange_rate
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.grand_total_foreign_currency
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.open_balance_foreign_currency
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.foreign_balance
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {overallinvoice.split !=
                                                                        ''
                                                                        ? overallinvoice.split
                                                                        : ''}
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {overallinvoice.aging !=
                                                                        ''
                                                                        ? overallinvoice.aging
                                                                        : ''}
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.terms
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.contact
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.postal_code
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.province
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.city
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.address
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.email
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.phone
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    {console.log(
                                                                      'entry1.job_name ',
                                                                      entry1.job_name
                                                                    )}
                                                                    <span>
                                                                      {
                                                                        entry1.job_name
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.fax
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                  <td className=''>
                                                                    <span>
                                                                      {
                                                                        overallinvoice.type_name
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                </tr>
                                                              </React.Fragment>
                                                            )
                                                          }
                                                        )}
                                                    </React.Fragment>
                                                  )
                                                }
                                              )}
                                            <tr className='item-step1 sub-title'>
                                              <td>
                                                <div>
                                                  Total {entry1.job_name}
                                                </div>
                                              </td>
                                              <td className='trans'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='lastmodified'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='lastmodifiedby'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='num'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='memo'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='account'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='openbalance'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='debit'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='credit'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='balance'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='currency'>
                                                <div>&nbsp;</div>
                                              </td>
                                              <td className='exchangerate'>
                                                <div>
                                                  {entry1.total_amount}
                                                </div>
                                              </td>
                                            </tr>
                                          </React.Fragment>
                                        )
                                      })}
                                  </React.Fragment>
                                )
                              })}
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
        <footer className='container-fluid'>
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
      </div>
    )
  }
}
export default open_invoice