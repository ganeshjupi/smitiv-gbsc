import React from 'react'
import LeftSidebar from './left_sidebar'
import Footer from './footer.jsx'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api'
import config from "../api_links/api_links";

import DatePicker from 'react-date-picker'

// import PDFViewer from 'pdf-viewer-reactjs'

import HTMLReactParser from 'html-react-parser'

import parse from 'html-react-parser'
import data from './reports/CountryCodes'

import { ToWords } from 'to-words'

import jQuery from 'jquery'
var _ = require('lodash')

// import 'bootstrap';
// import 'bootstrap-select';

class invoice_template_listing extends React.Component {
  constructor(props) {
    super(props)
    //const { history } = this.props;
    this.state = {
      isClose: false,
      accounts_selected: '',
      accounts_dropdown: [],
      current_val: 0,
      subTotal: '00.00',
      name: 'Still, Jaime',
      rank: 'SGT',
      description: 'Demonstrate how to export an HTML section to PDF',
      html_content: '',
      dataUrl: '',
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),
      logged_subscription_start_date: localStorage.getItem(
        'logged_subscription_start_date'
      ),
      logged_subscription_end_date: localStorage.getItem(
        'logged_subscription_end_date'
      ),
      logged_plan_id: localStorage.getItem('logged_plan_id'),
      dropdown: '',
      inbox_list: [],
      response_stus: 0,
      response_msg: 'No data found',
      item_details: '',
      item_file_path: '',
      list_id: '',
      response: [],
      htmlcont: '',
      selected_templateName: 'Choose',
      active: 0,
      properties_values: '',
      date: new Date(),
      customer_list: '',
      selected_customer_name: '',
      active_selected: 0,
      currency_customer: 'USD',

      /* =================== */
      isChecked: false,
      selected: '',
      selectedindex: '',
      gst_list: [],
      sales_tax_name: 'Zero-rated supplies',
      sales_tax_rate: 0,
      sales_tax_type: 1,
      search_key_gst: '',
      selected_rate_type: '%',
      maximum_chr_lngth: 4,
      sales_tax_code: '',
      rate_entered: '',
      salesTax_name_entered: '',
      rows: ['row 1'],
      coulmns: [],
      myarray: [],
      currencies: [],
      item_total_home_currency: '',
      tax_amount_foreign_currency: '',
      grand_total_foreign_currency: '',
      grand_total_home_currency: '0.00',
      sub_total_home_currency: '0.00',
      tax_home_currency: '0.00',
      item_total_foreign_currency: '',
      ToCurrency: 'USD',
      isTable_notEmpty: false,
      category_id: '',
      specific_id_delete: '',
      initial_value: 0,
      isAdd: false,
      isInvoice_to: false,
      isShippingt_to: false,
      isThanking_msg: false,
      isTerms_cond_msg: false,
      isInvoice_no: false,
      isjob_name: false,
      isTablefilled: false,
      isCustomername: false,
      isTemplate_selected: false,
      isMobileno: false,
      isRejected: false,
      reject_msg: '',

      Basic_info: [],
      billing_address: '',
      shipping_address: '',
      customerjoblist: [],
      selectCustomer: '',

      sales_tax_code: '',
      salesTax_name_entered: '',
      selectedOption: 'option2',
      modal_info_msg: '',
      show_succes: false,
      grandTotal: '',
      job_id: '1',
      job_name: '',
      cus_rate_rate: null,
      exchange_value_ref: '',
      selectedColumnType: '',
      selectedOption: 'option2',
      coulmns: [],
      payment_method_list: [],
      payment_date: '',
      sales_product_item_list: []
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



  add_gst_details = e => {
    e.preventDefault()
    let sales_tax_code = this.state.sales_tax_code
    let sales_tax_name = this.state.salesTax_name_entered
    let show_on_list = 1
    let tax_type = this.state.selectedOption === 'option1' ? 1 : 2
    let rate = this.state.rate_entered

    if (
      this.state.selected_rate_type != 'Fixed price' &&
      this.state.selected_rate_type === '%'
    ) {
      var rate_type = 1
    } else {
      var rate_type = 2
    }

    let country = this.state.country_code
    let items = {
      sales_tax_code: sales_tax_code,
      sales_tax_name: sales_tax_name,
      show_on_list: show_on_list,
      tax_type: tax_type,
      rate: rate,
      rate_type: rate_type,
      country: country,
      client_id: this.state.logged_client_id
    }
    console.log('hjagsjkhlkasjh', items)
    FetchAllApi.add_gst_details(items, (err, response) => {
      console.log('add comment', response.status)

      if (response.status === 1) {
        jQuery('#sales_tax_code').val('')
        jQuery('#sales_tax_name').val('')
        jQuery('#sales_tax_name').val('')
        jQuery('#tax').val('')
        this.setState({ show_succes: true })
        this.get_gst_list()
        var THIS = this
        setTimeout(function () {
          THIS.setState({ show_succes: false })
        }, 4000)
        window.jQuery('#pop-modal-1').modal('hide')
      } else {
        this.setState({ modal_info_msg: response.message })
        jQuery('.mymsg').fadeIn(2000)
        setTimeout(function () {
          jQuery('.mymsg').fadeOut(2000)
        }, 8000)
      }
    })
  }

  modal_cancel = () => {
    jQuery('#sales_tax_code').val('')
    jQuery('#sales_tax_name').val('')
    jQuery('#sales_tax_name').val('')
    jQuery('#tax').val('')
    this.setState({ modal_info_msg: '' })
    window.jQuery('#pop-modal-1').modal('hide')
  }
  update_rate_fixed = () => {
    jQuery('#tax').val('')
    this.setState({
      selected_rate_type: 'Fixed price',
      maximum_chr_lngth: 100
    })
  }
  update_rate_type = () => {
    jQuery('#tax').val('')
    this.setState({
      selected_rate_type: '%',
      maximum_chr_lngth: 4
    })
  }
  handleChange_gst_type = event => {
    if (this.state.selected_rate_type != 'Fixed price') {
      let entered_value = event.target.value
      // alert(entered_value)
      if (isNaN(entered_value)) {
        jQuery('#tax').val('')
      } else {
        if (entered_value > 100) {
          jQuery('#tax').val('')
        } else {
          this.setState({ rate_entered: entered_value })
        }
      }
    } else {
      let entered_value = event.target.value
      if (isNaN(entered_value)) {
        jQuery('#tax').val('')
      } else {
        this.setState({ rate_entered: entered_value })
      }
    }
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    })
  }
  handleChangeTax(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => this.validation_clean()
    )
  }
  validation_clean = () => {
    this.state.company_name != ''
      ? this.setState({ isCompany_name: true })
      : this.setState({})
    this.state.invoice_no != ''
      ? this.setState({ isInvoice_no: true })
      : this.setState({})
    this.state.balance_sheet_category_id != ''
      ? this.setState({ isBalance_sheet_category_name: true })
      : this.setState({})
  }

  newJob = job_name => {
    if (job_name == 'Create New') {
      this.props.history.push('/add-job', this.state.selectCustomer)
    } else {
      let job_id = jQuery('#jobName option:selected').data('status')
      this.setState({ job_id: job_id })
      this.setState({ job_name: job_name })
    }
  }

  customerjoblist = id => {
    // var client_id = localStorage.getItem("logged_client_id") ;
    var client_id = 1
    var customer_id = id

    FetchAllApi.customerjoblist(client_id, customer_id, (err, response) => {
      console.log('vendor_names', response)

      if (response.status === 1) {
        this.setState({ customerjoblist: response.results })
      } else {
      }
    })
  }

  Basic_info = id => {
    let client_id = 1
    let customer_id = id

    FetchAllApi.Basic_info(client_id, customer_id, (err, response) => {
      if (response.status === 1) {
        console.log('Basicinfo state', response.response)
        this.setState({
          Basic_info: response.response,
          billing_address: response.response[0].billing_address,
          shipping_address: response.response[0].shipping_address,
          customer_name: response.response[0].customer_name,
          currency_customer: response.response[0].currency,
          ToCurrency: response.response[0].currency
        })
      } else {
      }
    })
  }

  handleChange = selected_option => {
    if (selected_option == 'Create New') {
      this.props.history.push('/add-new-customer')
    } else {
      let job_id = jQuery('#jobName option:selected').data('status')
      let variable_pay_type = jQuery('#variable_pay_type option:selected').data(
        'status'
      )

      this.setState({
        selectCustomer: variable_pay_type,
        vendorName: jQuery('#variable_pay_type').val()
      })

      this.Basic_info(variable_pay_type)
      this.customerjoblist(variable_pay_type)
    }
  }
  customer_and_job_list = () => {
    // var client_id = localStorage.getItem("logged_client_id") ;
    var client_id = 1
    var from_customer_receive_payment = 0

    FetchAllApi.customer_and_job_list(client_id, from_customer_receive_payment, (err, response) => {
      console.log('vendor_names', response)

      if (response.status === 1) {
        this.setState({ customer_and_job_list: response.list })
      } else {
      }
    })
  }

  onChange = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState(state => {
      state[name] = value
      return state
    })
  }

  convertPDF = () => {
    alert()
  }
  onChange = date => this.setState({ date })

  UNSAFE_componentWillMount() {
    // this.get_customerlist()

    this.get_invoice_list()
    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === 'null' ||
      this.state.logged_user_id === 'undefined'
    ) {
      this.props.history.push('/')
    }

    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 //January is 0!
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    var today_date = yyyy + '-' + mm + '-' + dd

    console.log('logged_user_id', this.state.logged_user_id)
    console.log(
      'logged_subscription_end_date',
      this.state.logged_subscription_end_date
    )

    if (this.state.logged_subscription_end_date < today_date) {
      //this.props.history.push('/register_Payment');
    }

    /* =================== */
    let client_Id = this.state.logged_client_id
    FetchAllApi.get_country_id(client_Id, (err, response) => {
      // alert(response.country_id)
      if (response.status === 1) {
        this.setState(
          {
            country_code: response.country_id
          },
          () => this.get_gst_list()
        )
      }
    })
    /* =================== */
  }

  /* =================== */
  Chk_table_validation = () => {
    var item_check = jQuery(
      `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
    ).val()
    if (
      this.state.myarray.length > this.state.rows.length - 1 &&
      this.state.myarray[this.state.myarray.length - 1].price > 0 &&
      this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
      this.state.myarray[this.state.myarray.length - 1].category_id.length >
      0 &&
      item_check != ''
    ) {
      return true
    } else {
      return false
    }
  }
  val_me = () => {
    if (this.Chk_table_validation()) {
      this.setState({ isTable_notEmpty: false })
    } else {
    }
  }
  val_me_Check = () => {
    if (this.Chk_table_validation()) {
    } else {
      this.setState({ isTable_notEmpty: true })
    }
  }

  toggleChange = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked
      },
      () => {
        this.handleChangeItems(0, this.state.rows.length - 1)
      }
    )
  }

  update_search_keyword = event => {
    this.setState({ search_key_gst: event.target.value }, () => {
      this.get_gst_list()
    })
  }

  get_gst_list = () => {
    let country_code = this.state.country_code
    //alert(country_code)
    let keyword = this.state.search_key_gst
    FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
      console.log('defaultcategorylist', response)
      //alert(response.message)
      if (response.status === 1) {
        this.setState({
          gst_list: response.list
        })
      } else {
        this.setState({
          gst_list: []
        })
      }
    })
  }

  handleCheck_get_selected_tax(selectednow_id, itemid, id, valueres, e) {
    console.log('selectednow_id', id)

    // this.setState(
    //   {
    //     sales_tax_name: e.currentTarget.dataset.name,
    //     sales_tax_rate: e.currentTarget.dataset.rate,
    //     sales_tax_type: e.currentTarget.dataset.type
    //   }
    // )

    if (selectednow_id > 0) {
      // document.getElementById(id).innerHTML = valueres;
      // document.getElementById('selectedrate_id' + itemid).value = e.currentTarget.dataset.rate
      // document.getElementById('selectedtype_id' + itemid).value = e.currentTarget.dataset.type
      // document.getElementById('selectednow_id' + itemid).innerHTML = selectednow_id

      jQuery('#' + id).html(valueres)
      jQuery('#' + 'selectedrate_id' + itemid).val(e.currentTarget.dataset.rate)
      jQuery('#' + 'selectedtype_id' + itemid).val(e.currentTarget.dataset.type)
      jQuery('#' + 'selectednow_id' + itemid).html(selectednow_id)

      this.handleChangeItems(valueres, this.state.rows.length - 1)

      jQuery('.form-table').removeClass('ovrFlwRmve')
    } else {
      alert('sorry fault is here only')
    }

    jQuery('#gst_search').val('')
    this.get_gst_list()
  }

  handleChangeItems(e, itemid) {
    // alert(itemid)
    console.log('itemid', itemid)

    var result = []
    var itemprice = []
    var subTotal = 0
    var tax_total = 0

    for (var i = itemid; i >= 0; i--) {
      // alert(i)
      if (document.getElementById('selectednow_id' + i) != null) {
        //subTotal+=jQuery('#subtotal'+i).val();

        var item_name =
          jQuery('#item' + i).val() != '' ? jQuery('#item' + i).val() : 0
        var descr =
          jQuery('#descr' + i).val() != '' ? jQuery('#descr' + i).val() : 0
        var quantity_check =
          jQuery('#quantity' + i).val() != ''
            ? jQuery('#quantity' + i).val()
            : 0
        var quantity = isNaN(quantity_check)
          ? jQuery('#quantity' + i).val('')
          : quantity_check
        var unit_price_check =
          jQuery('#unit_price' + i).val() != ''
            ? jQuery('#unit_price' + i).val()
            : 0
        var unit_price = isNaN(unit_price_check)
          ? jQuery('#unit_price' + i).val('')
          : unit_price_check
        var price = quantity * unit_price
        var selectednow_id = document.getElementById('selectednow_id' + i)
          .innerText
        var category_id =
          selectednow_id != 'NO_VALUE'
            ? selectednow_id
            : this.state.selectedindex != ''
              ? this.state.selectedindex
              : ''

        console.log('category_id', category_id)
        var id = i
        // if(this.state.isChecked){
        // var Total =  this.state.sales_tax_type != 2 ? (price / (parseFloat(this.state.sales_tax_rate) + 100)) * 100: price - parseFloat(this.state.sales_tax_rate)
        // }else{
        //   var Total=this.state.sales_tax_type != 2 ? price:price
        // }

        var sales_tax_type =
          jQuery('#selectedtype_id' + i).val() != ''
            ? jQuery('#selectedtype_id' + i).val()
            : 0
        var sales_tax_rate =
          jQuery('#selectedrate_id' + i).val() != ''
            ? jQuery('#selectedrate_id' + i).val()
            : 0

        console.log(
          'sales_tax_type',
          price + ' ' + sales_tax_rate + ' ' + sales_tax_type + ' ' + quantity
        )

        if (this.state.isChecked) {
          if (
            parseFloat(sales_tax_rate) > 0 &&
            parseInt(sales_tax_type) === 1
          ) {
            var tax = price * (parseFloat(sales_tax_rate) / 100)

            // var tax = price / parseFloat(sales_tax_rate)
            // var Total = parseFloat(price) - tax
            var Total = parseFloat(price)
          } else if (parseInt(sales_tax_type) === 2) {
            var tax = parseFloat(sales_tax_rate)
            // var Total = parseFloat(price) - tax;
            var Total = parseFloat(price)
          } else {
            var tax = 0
            var Total = parseFloat(price)
          }
        } else {
          if (
            parseFloat(sales_tax_rate) > 0 &&
            parseInt(sales_tax_type) === 1
          ) {
            var tax = price * (parseFloat(sales_tax_rate) / 100)
            var Total = parseFloat(price)
          } else if (parseInt(sales_tax_type) === 2) {
            var tax = parseFloat(sales_tax_rate)
            var Total = parseFloat(price)
          } else {
            var tax = 0
            var Total = parseFloat(price)
          }
        }

        console.log('Total', Total)
        if (isNaN(Total)) {
          jQuery('#subtotal' + id).val('0.00')
        } else {
          jQuery('#subtotal' + id).val(parseFloat(Total).toFixed(2))
        }

        // } else {jQuery("#subtotal" + id).val(this.formatCurrency(this.state.currency_customer)(parseFloat(Total).toFixed(2)))}

        subTotal += Total
        tax_total += tax

        console.log('subTotal', subTotal)
      }

      let item_list = {
        item_name: item_name,
        descr: descr,
        quantity: quantity,
        price: price,
        unit_price: unit_price,
        category_id: category_id,
        tax_name: jQuery('#selectednow' + itemid).text(),
        tax_rate: jQuery('#selectedrate_id' + itemid).val(),
        tax_type: jQuery('#selectedtype_id' + itemid).val(),
        item_tax: tax.toFixed(2),
        item_total: Total.toFixed(2)
        // ...custom_details
      }
      result.push(item_list)
      console.log('item_list', result)

      itemprice.push(parseFloat(price))
      // this.setState({subTotal:subTotal})
    }
    if (isNaN(subTotal)) {
      jQuery('#homecurrencytyt').html('0')
    } else {
      jQuery('#homecurrencytyt').html(
        this.formatCurrency('EUR')(Number(parseFloat(subTotal.toFixed(2))))
      )
    }
    // else { jQuery("#homecurrencytyt").html(this.formatCurrency(this.state.currency_customer)(parseFloat(subTotal.toFixed(2)))) }
    if (isNaN(tax_total)) {
      jQuery('#home_tax_total').html('0')
    } else {
      jQuery('#home_tax_total').html(parseFloat(tax_total.toFixed(2)))
    }
    // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }

    if (!this.state.isChecked) {
      var grandTotal = parseFloat(subTotal) + tax_total
      if (isNaN(grandTotal)) {
        jQuery('#home_grand_total').html('0')
      } else {
        jQuery('#home_grand_total').html(
          this.formatCurrency('EUR')(Number(parseFloat(grandTotal).toFixed(2)))
        )
        // } else { jQuery("#home_grand_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(grandTotal).toFixed(2)))
        this.setState({
          grandTotal: this.formatCurrency('EUR')(
            Number(parseFloat(grandTotal).toFixed(2))
          )
        })
      }
    } else {
      // alert('hjj')
      var grandTotal = parseFloat(subTotal).toFixed(2)
      if (isNaN(grandTotal)) {
        jQuery('#home_grand_total').html('0')
      } else {
        jQuery('#home_grand_total').html(parseFloat(grandTotal).toFixed(2))
        // jQuery("#home_grand_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(grandTotal).toFixed(2)))
        this.setState({
          grandTotal: this.formatCurrency('EUR')(
            Number(parseFloat(grandTotal).toFixed(2))
          )
        })
      }
      let fore_grandtotal =
        jQuery('#home_grand_total').html() != undefined
          ? Number(jQuery('#home_grand_total').html())
          : 0.0
      let fore_tax =
        jQuery('#home_tax_total').html() != undefined
          ? Number(jQuery('#home_tax_total').html())
          : 0.0
      let fore_subtotal = (fore_grandtotal - fore_tax).toFixed(2)
      jQuery('#homecurrencytyt').html(
        this.formatCurrency('EUR')(Number(fore_subtotal))
      )

      // alert(hme_subtotal)
      setTimeout(() => {
        let home_grandtotal =
          jQuery('#foreign_grand_total').html() != undefined
            ? Number(jQuery('#foreign_grand_total').html())
            : 0.0
        let home_tax =
          jQuery('#foreign_tax_total').html() != undefined
            ? Number(jQuery('#foreign_tax_total').html())
            : 0.0
        let hme_subtotal = (home_grandtotal - home_tax).toFixed(2)

        this.setState({ sub_total_home_currency: hme_subtotal }, () => {
          jQuery('#foreigncurrencytyt').html(hme_subtotal)
        })
      }, 500)
    }

    const add = (a, b) => a + b
    const trial = itemprice.length > 0 ? itemprice.reduce(add) : 0
    if (isNaN(trial)) {
      var sum = 0
    } else {
      var sum = trial
    }

    console.log('itemprice', subTotal)
    // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }

    let foreign_currency = this.state.currency_customer
    //   console.log('foreign_currency', foreign_currency)
    let subTotalValue = subTotal
    // let nope = 'https://api.exchangerate-api.com/v4/latest/'
    let nope = `https://api.currencylayer.com/live?access_key=${config.api_key}&source=`


    let res = nope.concat(foreign_currency)
    fetch(res)
      .then(response => response.json())
      .then(data => {
        let newObj = this.rename(data.quotes, foreign_currency)

        if (this.state.cus_rate_rate != null) {
          const val = Number(this.state.cus_rate_rate)
          var todayValue = newObj
          var exchange_value = val
          var grand_total_home_currency = val * grandTotal
          var sub_total_home_currency = val * subTotalValue
          var tax_home_currency = val * tax_total
        } else {
          var todayValue = newObj
          var exchange_value = todayValue['SGD']
          var grand_total_home_currency = todayValue['SGD'] * grandTotal
          var sub_total_home_currency = todayValue['SGD'] * subTotalValue
          var tax_home_currency = todayValue['SGD'] * tax_total
        }

        var todayValue = newObj
        var exchange_value_ref = todayValue['SGD']

        this.setState(
          {
            myarray: result.reverse(),
            exchange_value: Number(exchange_value.toFixed(4)),
            exchange_value_ref: Number(exchange_value_ref.toFixed(4)),
            grand_total_home_currency: grand_total_home_currency.toFixed(2),
            sub_total_home_currency: sub_total_home_currency.toFixed(2),
            tax_home_currency: tax_home_currency.toFixed(2)
          },
          () => {
            this.val_me()
          }
        )
      })
  }

  control_addButton = () => {
    // let item_check = jQuery(
    //   `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
    // ).val()

    console.log('myarray', this.state.myarray)

    if (
      this.state.myarray.length > this.state.rows.length - 1 &&
      this.state.myarray[this.state.myarray.length - 1].price > 0 &&
      this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
      this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
      //&& item_check != ''
    ) {
      return (
        <div class='form-group col-md-12 mar-b-no pad-no'>
          <a href='javascript:;' class='add-input' onClick={this.addRow}>
            ADD ROW
          </a>
        </div>
      )
    }
  }

  addRow = () => {
    if (
      this.state.myarray.length > this.state.rows.length - 1 &&
      this.state.myarray[this.state.myarray.length - 1].price > 0 &&
      this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
      this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
    ) {
      var rows = this.state.rows
      rows.push('row' + (this.state.initial_value + 1))

      this.setState({
        isAdd: false,
        initial_value: this.state.initial_value + 1
      })

      this.setState({ rows: rows })
    } else {
      this.setState({ isAdd: true })
    }
  }

  copyRow = item_id => {
    // if (
    //   this.state.myarray.length > this.state.rows.length - 1 &&
    //   this.state.myarray[this.state.myarray.length - 1].price > 0 &&
    //   this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
    //   this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
    // ) {
    //   var rows = this.state.rows
    //   rows.push('row' + (this.state.initial_value + 1))

    //   this.setState({ isAdd: false, initial_value: this.state.initial_value + 1 })

    //   this.setState({ rows: rows })
    // } else {
    //   this.setState({ isAdd: true })
    // }
    var THIS = this
    if (
      THIS.state.myarray.length > THIS.state.rows.length - 1 &&
      THIS.state.myarray[THIS.state.myarray.length - 1].price > 0 &&
      THIS.state.myarray[THIS.state.myarray.length - 1].item_name.length > 0
      // &&THIS.state.myarray[THIS.state.myarray.length - 1].category_id.length > 0
      //&& item_check != ''
    ) {
      jQuery('.error_tbl_fld').css('display', 'none')
      var rows = this.state.rows
      rows.push('row' + (parseInt(this.state.initial_value) + 1))
      this.setState({
        isAdd: false,
        initial_value: parseInt(this.state.initial_value) + 1
      })
      this.setState({ rows: rows, isTablefilled: false }, () => {
        this.copyRowVal(item_id)
      })
    } else {
      jQuery('.error_tbl_fld').css('display', 'block')
      this.setState({ isTablefilled: true })
    }
  }

  copyRowVal(item_id) {
    var THIS = this

    console.log('rows_length', '#item' + THIS.state.initial_value)
    setTimeout(function () {
      jQuery('#item' + THIS.state.initial_value).val(
        jQuery('#item' + item_id).val()
      )
      jQuery('#descr' + THIS.state.initial_value).val(
        jQuery('#descr' + item_id).val()
      )
      jQuery('#quantity' + THIS.state.initial_value).val(
        jQuery('#quantity' + item_id).val()
      )
      jQuery('#unit_price' + THIS.state.initial_value).val(
        jQuery('#unit_price' + item_id).val()
      )
      jQuery('#selectednow' + THIS.state.initial_value).html(
        jQuery('#selectednow' + item_id).html()
      )
      jQuery('#selectednow_id' + THIS.state.initial_value).html(
        jQuery('#selectednow_id' + item_id).html()
      )
      jQuery('#selectedrate_id' + THIS.state.initial_value).val(
        jQuery('#selectedrate_id' + item_id).val()
      )
      jQuery('#selectedtype_id' + THIS.state.initial_value).val(
        jQuery('#selectedtype_id' + item_id).val()
      )
      jQuery('#subtotal' + THIS.state.initial_value).val(
        jQuery('#subtotal' + item_id).val()
      )

      THIS.handleChangeItems(0, THIS.state.rows.length - 1)
    }, 500)
  }

  delete_Rows = () => {
    var itemid = this.state.specific_id_delete
    var rows_actual = this.state.rows
    var myarray = this.state.myarray
    console.log('jkdghkshakd', this.state.myarray)
    if (this.state.rows.length > 1) {
      if (itemid > -1) {
        rows_actual.splice(itemid, 1)
      }

      this.setState({ rows: rows_actual }, () => {
        this.handleChangeItems(0, this.state.rows.length - 1)
      })

      console.log('After_delete_par_row', this.state.rows)
    } else {
      jQuery('#item0').val('')
      jQuery('#descr0').val('')
      jQuery('#quantity0').val('')
      jQuery('#unit_price0').val('')
      jQuery('#selectednow0').html('Choose')
      jQuery('#selectednow_id0').html('NO_VALUE')
      jQuery('#selectedrate_id0').val('0')
      jQuery('#selectedtype_id0').val('0')

      jQuery('.no-bg').val('')
      this.setState({ myarray: [] }, () => {
        this.handleChangeItems(0, this.state.rows.length - 1)
      })
    }
    window.jQuery('#modal_delete').modal('hide')
  }
  /* =================== */

  get_invoice_list = () => {
    let input = {client_id : this.state.logged_client_id,user_id: this.state.logged_user_id }
    FetchAllApi.get_edit_invoice_html(input, (err, response) => {
      console.log('defaultcatejhwdjkjhgorylist', response)
      if (response.status === 1) {
        this.setState({
          response: response
        })
      } else {
        this.setState({})
      }
    })
  }

  pdf_generate = () => {
    // alert()
  }
  delete_invoice_list = id => {
    let client_id = 2
    let template_id = id
    FetchAllApi.delete_invoice_template(
      client_id,
      template_id,
      (err, response) => {
        console.log('defaultcatejhwdjkjhgorylist', response)
        alert(response.message)
        if (response.status === 1) {
          this.get_invoice_list()
          this.setState({})
        } else {
          this.setState({})
        }
      }
    )
  }

  apply_template_format = (id, name, html) => {
    console.log('html_content', html)

    this.setState({ html_content: html })

    jQuery('#' + id).addClass('active')
    this.setState({
      active: id,
      selected_templateName: name
    })
    if (id !== this.state.active)
      jQuery('#' + this.state.active).removeClass('active')

    let properties_values = JSON.parse(this.state.response.list[id].properties)
    console.log('djshgfjksdh', properties_values)
    if (properties_values.items.itemoptioninvoicenostatus === 'none') {
      // jQuery('#itemoptioninvoicenostatus').hide()
    } else {
      jQuery('#itemoptioninvoicenostatus').show()
    }
    if (properties_values.items.itemoptionbilltostatus === 'none') {
      jQuery('#itemoptionbilltostatus').hide()
    } else {
      jQuery('#itemoptionbilltostatus').show()
    }
    if (properties_values.items.itemoptionDatestatus === 'none') {
      jQuery('#itemoptionDatestatus').hide()
    } else {
      jQuery('#itemoptionDatestatus').show()
    }
    if (properties_values.items.itemoptionshippingtostatus === 'none') {
      jQuery('#itemoptionshippingtostatus').hide()
    } else {
      jQuery('#itemoptionshippingtostatus').show()
    }

    if (properties_values.footer.footeroptionthanksmessagestatus === 'none') {
      jQuery('#footeroptionthanksmessagestatus').hide()
    } else {
      jQuery('#footeroptionthanksmessagestatus').show()
      jQuery('#footeroptionthanksmessages').val(
        properties_values.footer.footeroptionsthankmessage
      )
    }
    if (properties_values.footer.footertermsstatus === 'none') {
      // alert('block')
      jQuery('#termsandconditions').hide()
    } else {
      jQuery('#termsandconditions').show()

      jQuery('#termcondmsg').val(properties_values.footer.footertermsText)
    }
  }
  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh')
  }
  getColList = () => {
    FetchAllApi.get_invoice_column_list(
      this.state.logged_user_id,
      (err, response) => {
        console.log('LIST RETURNED=jjkjk>', response)
        if (response.status === 1) {
          // alert('hi')
          this.setState({
            number_of_columns_list: response.list
          })
        } else {
          this.setState({
            number_of_columns_list: []
          })
        }
      }
    )
  }
  changeDate = () => {
    let date = jQuery('#fromdate').val()
    if (date != undefined) {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      this.setState({ payment_date: date_formated })
    }
  }

  getItems = () => {
    // var client_id = localStorage.getItem("logged_client_id") ;
    var client_id = 1
    FetchAllApi.sales_product_item_list(client_id, (err, response) => {
      console.log('vendor_names', response)

      if (response.status === 1) {
        this.setState({ sales_product_item_list: response.list })
      } else {
      }
    })
  }
  componentDidMount() {
    window.jQuery('.input-group.date').datepicker({ format: 'dd/mm/yyyy' })
    // TODO: Make the API

    this.getColList()
    this.callAllLocale()
    this.handleChangeItems(0, this.state.rows.length - 1)
    this.getPaymethod()
    this.getItems()

    this.customer_and_job_list()
    //   jQuery(document).on('shown.bs.dropdown', '.table-responsive', function (e) {
    //     // The .dropdown container
    //     var jQuerycontainer = jQuery(e.target);

    //     // Find the actual .dropdown-menu
    //     var jQuerydropdown = jQuerycontainer.find('.dropdown-menu');
    //     if (jQuerydropdown.length) {
    //         // Save a reference to it, so we can find it after we've attached it to the body
    //         jQuerycontainer.data('dropdown-menu', jQuerydropdown);
    //     } else {
    //         jQuerydropdown = jQuerycontainer.data('dropdown-menu');
    //     }

    //     jQuerydropdown.css('top', (jQuerycontainer.offset().top + jQuerycontainer.outerHeight()) + 'px');
    //     jQuerydropdown.css('left', jQuerycontainer.offset().left + 'px');
    //     jQuerydropdown.css('position', 'absolute');
    //     jQuerydropdown.css('display', 'block');
    //     jQuerydropdown.appendTo('body');
    // });

    // jQuery(document).on('hide.bs.dropdown', '.table-responsive', function (e) {
    //     // Hide the dropdown menu bound to this button
    //     jQuery(e.target).data('dropdown-menu').css('display', 'none');
    // });
    // let Total= 10000
    //  alert( this.formatCurrency('USD')(parseFloat(Total).toFixed(2)) )

    // alert(this.state.logged_company_name)
    let account_type_id = 2
    var client_id = this.state.logged_client_id

    FetchAllApi.get_accounts_dropdown(account_type_id, client_id, (err, response) => {
      console.log('asjhghdjgh', response)
      if (response.status === 1) {
        this.setState({
          accounts_dropdown: response.list
        })
      }
    })
    //jQuery(".select-picker").selectpicker();

    require('jquery-mousewheel')
    require('malihu-custom-scrollbar-plugin')

    jQuery('.item-listwrap').mCustomScrollbar({
      scrollEasing: 'linear',
      scrollInertia: 600,
      scrollbarPosition: 'outside'
    })

    jQuery('.label-enclose .label span').click(function () {
      jQuery('.label-enclose .label').removeClass('active')
      jQuery(this)
        .parent('.label-enclose .label')
        .addClass('active')
    })
    jQuery('.label-enclose .label a').click(function () {
      jQuery(this)
        .parent('.label-enclose .label')
        .removeClass('active')
    })

    jQuery(document).ready(function () {
      jQuery('.left-navmenu .has-sub').click(function () {
        jQuery('.left-navmenu li a').removeClass('active')
        jQuery(this).addClass('active')
        jQuery('.left-navmenu li a:not(.active)')
          .siblings('.sub-menu')
          .slideUp()
        jQuery(this)
          .siblings('.sub-menu')
          .slideToggle()
      })
      jQuery('.left-navmenu .sub-menu li a').click(function () {
        jQuery('.left-navmenu .sub-menu li a').removeClass('active')
        jQuery(this).addClass('active')
      })
      jQuery('.search-btn').click(function () {
        jQuery('.hdr-search').addClass('active')
      })
      jQuery('.hdr-search .close-icon').click(function () {
        jQuery('.hdr-search').removeClass('active')
      })
      // jQuery(".select-picker").selectpicker();
      jQuery('.label-enclose .label').click(function () {
        jQuery(this).toggleClass('active')
      })
      jQuery('.nav-brand-res').click(function () {
        jQuery('.left-navbar').addClass('active')
      })
      jQuery('.menu-close').click(function () {
        jQuery('.left-navbar').removeClass('active')
      })
      jQuery('.custom-select-drop .dropdown-menu a').click(function () {
        // alert()
        jQuery('.open.custom-select-drop .dropdown-menu li.active').removeClass(
          'active'
        )
        jQuery(this)
          .parent('li')
          .addClass('active')
        jQuery('.open #selected').text(jQuery(this).text())
      })

      // jQuery('.input-group.date').datepicker({format: "dd/mm/yyyy"});

      // jQuery(".invoice-item-table tbody").sortable({
      // appendTo: "parent",
      // helper: "clone"
      // }).disableSelection();

      jQuery('.invoice-item-table')
        .on('change keyup keydown paste cut', 'textarea', function () {
          jQuery(this)
            .height(0)
            .height(this.scrollHeight)
        })
        .find('textarea')
        .change()

      jQuery('.tbl_drop_down').on('click', function () {
        jQuery('.table-responsive').addClass('ovrFlwRmve')
      })
    })
  }
  onDocumentLoadSuccess = () => {
    console.log('success')
  }

  set_accounts_selected = text_selected => {
    this.setState({ accounts_selected: text_selected })
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  //   dataTaggingFunc(list_id,file_id) {
  //     this.props.history.push("/data_tagging/" + list_id + "/" + file_id );
  //     window.scrollTo(0, 0);
  //   }

  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  convertNumberToWords(amount) {
    var words = new Array()
    words[0] = ''
    words[1] = 'One'
    words[2] = 'Two'
    words[3] = 'Three'
    words[4] = 'Four'
    words[5] = 'Five'
    words[6] = 'Six'
    words[7] = 'Seven'
    words[8] = 'Eight'
    words[9] = 'Nine'
    words[10] = 'Ten'
    words[11] = 'Eleven'
    words[12] = 'Twelve'
    words[13] = 'Thirteen'
    words[14] = 'Fourteen'
    words[15] = 'Fifteen'
    words[16] = 'Sixteen'
    words[17] = 'Seventeen'
    words[18] = 'Eighteen'
    words[19] = 'Nineteen'
    words[20] = 'Twenty'
    words[30] = 'Thirty'
    words[40] = 'Forty'
    words[50] = 'Fifty'
    words[60] = 'Sixty'
    words[70] = 'Seventy'
    words[80] = 'Eighty'
    words[90] = 'Ninety'

    // alert(amount)
    // if(amount !== 'Nan' && amount !== undefined){amount = amount.toString()}

    if (amount != undefined) {
      amount = amount.toString()
    }
    // amount=this.state.grandTotal.toString()
    var atemp = amount.split('.')
    var number = atemp[0].split(',').join('')
    var n_length = number.length
    var words_string = ''
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0)
      var received_n_array = new Array()
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1)
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
        n_array[i] = received_n_array[j]
      }
      for (var i = 0, j = 1; i < 9; i++, j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + parseInt(n_array[j])
            n_array[i] = 0
          }
        }
      }
      var value = ''
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10
        } else {
          value = n_array[i]
        }
        if (value != 0) {
          words_string += words[value] + ' '
        }
        if (
          (i == 1 && value != 0) ||
          (i == 0 && value != 0 && n_array[i + 1] == 0)
        ) {
          words_string += 'Crores '
        }
        if (
          (i == 3 && value != 0) ||
          (i == 2 && value != 0 && n_array[i + 1] == 0)
        ) {
          words_string += 'Lakhs '
        }
        if (
          (i == 5 && value != 0) ||
          (i == 4 && value != 0 && n_array[i + 1] == 0)
        ) {
          words_string += 'Thousand '
        }
        if (
          i == 6 &&
          value != 0 &&
          n_array[i + 1] != 0 &&
          n_array[i + 2] != 0
        ) {
          words_string += 'Hundred and '
        } else if (i == 6 && value != 0) {
          words_string += 'Hundred '
        }
      }
      words_string = words_string.split('  ').join(' ')
    }
    return words_string
  }

  convertHtmlToPdf(e) {
    if (this.state.selected_templateName === 'Choose') {
      this.setState({ isTemplate_selected: true })
    } else {
      this.setState({ isTemplate_selected: false })
      if (
        this.state.myarray.length > this.state.rows.length - 1 &&
        this.state.myarray[this.state.myarray.length - 1].price > 0 &&
        this.state.myarray[this.state.myarray.length - 1].item_name.length >
        0 &&
        this.state.myarray[this.state.myarray.length - 1].category_id.length > 0
      ) {
        var selected_date = this.convert_date_format()
        let client_id = this.state.logged_client_id
        let customer_id = this.state.active_selected
        let item_total_home_currency = jQuery('#foreigncurrencytyt').html()
        let tax_amount_home_currency = jQuery('#foreign_tax_total').html()
        let grand_total_home_currency = jQuery('#foreign_grand_total').html()
        let item_total_foreign_currency = jQuery('#homecurrencytyt').html()
        let tax_amount_foreign_currency = jQuery('#home_tax_total').html()
        let grand_total_foreign_currency = jQuery('#home_grand_total').html()
        let currency = this.state.currency_customer
        let exchange_rate = this.state.exchange_value
        let invoice_date = selected_date
        let company_name = this.state.logged_company_name
        let type = 1
        let invoice_number = jQuery('#invoice_no').val()
        let list_id = this.state.logged_user_id
        let tagged_user_id = this.state.tagged_user_id
        let job_name = jQuery('#job_name').val()
        let shipping_address = jQuery('#shipping_to').val()
        let memo = jQuery('#memo').val()
        let thanking_message = jQuery('#footeroptionthanksmessages').val()
        let terms_and_conditions = jQuery('#termcondmsg').val()
        let item_list = this.state.myarray

        let shipping_to = jQuery('#shipping_to').val()
        let company_address = jQuery('#shipping_to').val()
        let footer_memo = jQuery('#footer_memo').val()
        let footer_thankyou = jQuery('#footeroptionthanksmessages').val()
        let footer_termscondition = jQuery('#termcondmsg').val()
        let mobile_no = jQuery('#mobile_no').val()

        if (this.state.isChecked) {
          var tax_type_name = 'inclusive'
        } else {
          var tax_type_name = 'exclusive'
        }

        console.log('item_list_test', this.state.myarray)

        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
        var get_invoice_date = new Date(invoice_date)
        var invoice_month = get_invoice_date.getMonth()
        var invoice_day = get_invoice_date.getDate()
        var invoice_year = get_invoice_date.getFullYear()

        var change_invoice_date =
          invoice_day + ' ' + monthNames[invoice_month] + ' ' + invoice_year

        jQuery('#invoice_no_content').html(
          '<span id="invoice_value" style="font-weight: 600;">Invoice No:</span> ' +
          invoice_number
        )
        jQuery('#billed_to_content')
          .next('p')
          .html(company_address)
        jQuery('#date_content').html(
          '<span id="date_value" style="font-weight: 600;">Date:</span> ' +
          change_invoice_date
        )
        jQuery('#thank_u_msg_tag').html(footer_thankyou)
        jQuery('#terms_cond_msg_tag').html(footer_termscondition)
        jQuery('#footer_address').html(company_address)
        jQuery('#footer_mobile').html('| Mob: ' + mobile_no)

        var item_incre = ''
        item_list.map((item_list_data, index) => {
          console.log('item_list_data', item_list_data)
          console.log('item_list_data_item_name', item_list_data.item_name)
          var incre = parseInt(index) + 1

          item_incre +=
            '<tr id="table_row' +
            incre +
            '"><td id="no' +
            incre +
            '" style="font-size: 13px; padding: 12px 8px;">' +
            incre +
            '</td><td id="item' +
            incre +
            '" style="font-size: 13px; padding: 12px 8px;">' +
            item_list_data.item_name +
            '</td><td id="descrip' +
            incre +
            '" style="font-size: 13px; padding: 12px 8px;">' +
            item_list_data.descr +
            '</td><td id="priceeach' +
            incre +
            '" style="font-size: 13px; padding: 12px 8px;">' +
            item_list_data.unit_price +
            '</td><td id="quantity' +
            incre +
            '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
            item_list_data.quantity +
            '</td><td id="tax' +
            incre +
            '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
            item_list_data.item_tax +
            '</td><td id="total' +
            incre +
            '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
            item_list_data.item_total +
            '</td></tr>'
        })
        jQuery('#data_result table tbody').html(item_incre)

        jQuery('#sub_total_container')
          .next('div')
          .html(item_total_foreign_currency)
        jQuery('#tax_total_container').html(
          'Tax<span style="font-size: 14px;font-weight: normal;font-style: italic;">(' +
          tax_type_name +
          ')</span>'
        )
        jQuery('#tax_total_container')
          .next('div')
          .html(tax_amount_foreign_currency)
        jQuery('#grand_total_container')
          .next('div')
          .html(grand_total_foreign_currency)

        // price number to words
        // var numericValue = grand_total_foreign_currency;
        var numericValue = this.state.grandTotal

        numericValue = parseFloat(numericValue).toFixed(2)
        var amount = numericValue.toString().split('.')
        var split_price = amount[0]
        var split_paisa = amount[1]
        console.log(
          'convert_words',
          this.convertNumberToWords(split_price) +
          ' ' +
          this.convertNumberToWords(split_paisa)
        )
        jQuery('#amount_words_tag')
          .next('div')
          .html(
            this.convertNumberToWords(split_price) +
            'Rupees and ' +
            this.convertNumberToWords(split_paisa) +
            'Paisa only'
          )

        var getHTML = jQuery('.template-item').html()

        fetch('https://v2018.api2pdf.com/chrome/html', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: '11011305-f6cf-4868-b731-74c53dcf9f89' //Get your API key from https://portal.api2pdf.com
          },
          body: JSON.stringify({
            html: getHTML,
            inlinePdf: true,
            fileName: 'test.pdf'
          })
        })
          .then(res => res.json())
          .then(res => {
            if (res.success === true) {
              console.log('test_pdf', res)
              window.open(res.pdf)
              //window.location.href = res.pdf;
            } else {
              console.log('test_pdf', res.error)
            }
          })
      } else {
        this.setState({ isTablefilled: true })
      }
    }
  }

  get_customerlist = () => {
    let client_id = 1
    FetchAllApi.customer_list_create_invoice(client_id, (err, response) => {
      console.log('defaultcatejhwdjkjhgorylist', response)
      console.log('ashdlhkla', response)
      if (response.status === 1) {
        this.setState({ customer_list: response.list })
      } else {
        this.setState({})
      }
    })
  }
  selected_customer = (id, name, currency) => {
    alert(currency)
    this.setState({ currency_customer: currency, ToCurrency: currency })
    jQuery('#selected' + id).addClass('active')
    this.setState({
      active_selected: id,
      selected_customer_name: name
    })
    if (id !== this.state.active)
      jQuery('#selected' + this.state.active).removeClass('active')
  }

  convert_date_format = () => {
    var convert = str => {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2)
      return [date.getFullYear(), mnth, day].join('-')
    }
    return convert(this.state.date)
  }
  save_template = (e, btn_type) => {
    e.preventDefault()
    var btn_type = btn_type
    console.log('jhsvdkjash', this.state.myarray)

    let payment_method = jQuery('#payment_method option:selected').val()
    let payment_date = this.state.payment_date
    let amount_in_words = jQuery('#amount_in_words').val()

    // alert(this.state.exchange_value)

    var selected_date = this.convert_date_format()
    let client_id = this.state.logged_client_id
    // let customer_id = this.state.active_selected
    let customer_id = jQuery('#variable_pay_type option:selected').data(
      'status'
    )
    let item_total_home_currency = jQuery('#foreigncurrencytyt').html()
    let tax_amount_home_currency = jQuery('#foreign_tax_total').html()
    let grand_total_home_currency = jQuery('#foreign_grand_total').html()
    let item_total_foreign_currency = jQuery('#homecurrencytyt').html()
    let tax_amount_foreign_currency = jQuery('#home_tax_total').html()
    let grand_total_foreign_currency = jQuery('#home_grand_total').html()
    let currency = this.state.currency_customer
    let exchange_rate = this.state.exchange_value
    let invoice_date = selected_date
    let company_name = this.state.logged_company_name
    let type = 1
    let invoice_number = jQuery('#invoice_no').val()
    let list_id = this.state.logged_user_id
    let tagged_user_id = this.state.logged_user_id
    let job_name = jQuery('#job_name').val()
    let shipping_address = jQuery('#shipping_to').val()
    let memo = jQuery('#memo').val()
    let thanking_message = jQuery('#footeroptionthanksmessages').val()
    let terms_and_conditions = jQuery('#termcondmsg').val()
    let item_list = this.state.myarray

    let shipping_to = jQuery('#shipping_to').val()
    let company_address = jQuery('#shipping_to').val()
    let footer_memo = jQuery('#footer_memo').val()
    let footer_thankyou = jQuery('#footeroptionthanksmessages').val()
    let footer_termscondition = jQuery('#termcondmsg').val()
    let mobile_no = jQuery('#mobile_no').val()

    if (this.state.isChecked) {
      var tax_type_name = 'inclusive'
    } else {
      var tax_type_name = 'exclusive'
    }

    console.log('item_list_test', this.state.myarray)

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    var get_invoice_date = new Date(invoice_date)
    var invoice_month = get_invoice_date.getMonth()
    var invoice_day = get_invoice_date.getDate()
    var invoice_year = get_invoice_date.getFullYear()

    var change_invoice_date =
      invoice_day + ' ' + monthNames[invoice_month] + ' ' + invoice_year

    jQuery('#invoice_no_content').html(
      '<span id="invoice_value" style="font-weight: 600;">Invoice No:</span> ' +
      invoice_number
    )
    jQuery('#billed_to_content')
      .next('p')
      .html(company_address)
    jQuery('#date_content').html(
      '<span id="date_value" style="font-weight: 600;">Date:</span> ' +
      change_invoice_date
    )
    jQuery('#thank_u_msg_tag').html(footer_thankyou)
    jQuery('#terms_cond_msg_tag').html(footer_termscondition)
    jQuery('#footer_address').html(company_address)
    jQuery('#footer_mobile').html('| Mob: ' + mobile_no)

    var item_incre = ''
    item_list.map((item_list_data, index) => {
      console.log('item_list_data', item_list_data)
      console.log('item_list_data_item_name', item_list_data.item_name)
      var incre = parseInt(index) + 1

      item_incre +=
        '<tr id="table_row' +
        incre +
        '"><td id="no' +
        incre +
        '" style="font-size: 13px; padding: 12px 8px;">' +
        incre +
        '</td><td id="item' +
        incre +
        '" style="font-size: 13px; padding: 12px 8px;">' +
        item_list_data.item_name +
        '</td><td id="descrip' +
        incre +
        '" style="font-size: 13px; padding: 12px 8px;">' +
        item_list_data.descr +
        '</td><td id="priceeach' +
        incre +
        '" style="font-size: 13px; padding: 12px 8px;">' +
        item_list_data.unit_price +
        '</td><td id="quantity' +
        incre +
        '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
        item_list_data.quantity +
        '</td><td id="tax' +
        incre +
        '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
        item_list_data.item_tax +
        '</td><td id="total' +
        incre +
        '" style="font-size: 13px; padding: 12px 8px; text-align: center;">' +
        item_list_data.item_total +
        '</td></tr>'
    })
    jQuery('#data_result table tbody').html(item_incre)

    jQuery('#sub_total_container')
      .next('div')
      .html(item_total_foreign_currency)
    jQuery('#tax_total_container').html(
      'Tax<span style="font-size: 14px;font-weight: normal;font-style: italic;">(' +
      tax_type_name +
      ')</span>'
    )
    jQuery('#tax_total_container')
      .next('div')
      .html(tax_amount_foreign_currency)
    jQuery('#grand_total_container')
      .next('div')
      .html(grand_total_foreign_currency)

    // price number to words
    // var numericValue = grand_total_foreign_currency;
    var numericValue = this.state.grandTotal

    numericValue = parseFloat(numericValue).toFixed(2)
    var amount = numericValue.toString().split('.')
    var split_price = amount[0]
    var split_paisa = amount[1]
    console.log(
      'convert_words',
      this.convertNumberToWords(split_price) +
      ' ' +
      this.convertNumberToWords(split_paisa)
    )
    jQuery('#amount_words_tag')
      .next('div')
      .html(
        this.convertNumberToWords(split_price) +
        'Rupees and ' +
        this.convertNumberToWords(split_paisa) +
        'Paisa only'
      )

    if (company_address === '') {
      this.setState({ isInvoice_to: true })
    } else {
      this.setState({ isInvoice_to: false })
    }
    if (job_name === '') {
      this.setState({ isjob_name: true })
    } else {
      this.setState({ isjob_name: false })
    }
    if (invoice_number === '') {
      this.setState({ isInvoice_no: true })
    } else {
      this.setState({ isInvoice_no: false })
    }

    if (this.state.selected_customer_name === '') {
      this.setState({ isCustomername: true })
    } else {
      this.setState({ isCustomername: false })
    }
    if (company_address === '') {
      this.setState({ isShippingt_to: true })
    }
    if (mobile_no === '') {
      this.setState({ isMobileno: true })
    } else {
      this.setState({ isMobileno: false })
    }

    if (jQuery('#invoice_to').val() === '') {
      this.setState({ isInvoice_to: true })
    } else {
      this.setState({ isInvoice_to: false })
    }
    if (this.state.selected_templateName === 'Choose') {
      this.setState({ isTemplate_selected: true })
    } else {
      this.setState({ isTemplate_selected: false })
    }

    if (jQuery('#shipping_to').val() === '') {
      this.setState({ isShippingt_to: true })
    } else {
      this.setState({ isShippingt_to: false })
    }
    if (
      this.state.myarray.length > this.state.rows.length - 1 &&
      this.state.myarray[this.state.myarray.length - 1].price > 0 &&
      this.state.myarray[this.state.myarray.length - 1].item_name.length > 0 &&
      this.state.myarray[this.state.myarray.length - 1].category_id.length >
      0 &&
      this.state.selected_templateName != 'Choose'
    ) {
      this.setState({ isTablefilled: false })
      let data = {
        client_id: client_id,
        customer_id: customer_id,
        item_total_home_currency: item_total_home_currency,
        tax_amount_home_currency: tax_amount_home_currency,
        grand_total_home_currency: grand_total_home_currency,
        item_total_foreign_currency: item_total_foreign_currency,
        tax_amount_foreign_currency: tax_amount_foreign_currency,
        grand_total_foreign_currency: grand_total_foreign_currency,
        currency: currency,
        exchange_rate: exchange_rate,
        invoice_date: invoice_date,
        company_name: company_name,
        type: type,
        invoice_number: invoice_number,
        company_address: company_address,
        list_id: list_id,
        tagged_user_id: this.state.logged_user_id,
        item_list: item_list,
        // job_name: job_name,
        job_name: this.state.job_name,
        memo: memo,
        shipping_address: shipping_address,
        thanking_message: thanking_message,
        terms_and_conditions: terms_and_conditions,
        // job_id: jQuery("#jobName option:selected").data("status"),
        job_id: this.state.job_id
      }
      console.log('datatnow', data)

      FetchAllApi.create_sales_invoice(data, (err, response) => {
        console.log('defaultcatejhwdjkjhgorylist', response)
        if (response.status === 1) {
          if (btn_type === 'save') {
            this.setState({ isClose: true })
            setTimeout(() => {
              // if (jQuery("#closeme").fadeOut(2000));
              this.setState({ isClose: false })

              jQuery('.form-control').val('')
              jQuery('#homecurrencytyt').html('0')
              jQuery('#foreigncurrencytyt').html('0')
              jQuery('#home_grand_total').html('0')
              jQuery('#foreign_grand_total').html('0')
              jQuery('#selectednow0').html('Choose')
              jQuery('#home_tax_total').html('0')
            }, 4000)
          } else {
            alert('Succesfully saved, Click ok to proceed next one')
            this.props.history.push('/loading', ['/create_invoice'])

            this.setState({ isClose: true })
            setTimeout(() => {
              // if (jQuery("#closeme").fadeOut(2000));
              this.setState({ isClose: false })

              jQuery('.form-control').val('')
              jQuery('#homecurrencytyt').html('0')
              jQuery('#foreigncurrencytyt').html('0')
              jQuery('#home_grand_total').html('0')
              jQuery('#foreign_grand_total').html('0')
              jQuery('#selectednow0').html('Choose')
              jQuery('#home_tax_total').html('0')
            }, 4000)
            setTimeout(() => {
              if (jQuery('#closeme').fadeOut(2000));
            }, 4000)
            // alert(response.message)
            this.setState({
              isClose: true,
              isCustomername: false,
              isAdd: false,
              isInvoice_to: false,
              isShippingt_to: false,
              isThanking_msg: false,
              isTerms_cond_msg: false,
              isInvoice_no: false,
              isjob_name: false,
              isTablefilled: false,
              isCustomername: false,
              selected_customer_name: '',
              tax_home_currency: '0',
              tax_home_currency: '0',
              rows: ['row 1']
            })
            setTimeout(function () {
              if (jQuery('#closeme').fadeOut(2000));
            }, 8000)
            jQuery('.form-control').val('')
            jQuery('#homecurrencytyt').html('0')
            jQuery('#foreigncurrencytyt').html('0')
            jQuery('#home_grand_total').html('0')
            jQuery('#foreign_grand_total').html('0')
            jQuery('#selectednow0').html('Choose')
            jQuery('#home_tax_total').html('0')

            this.setState({})
          }
        } else {
          this.setState({ isRejected: true, reject_msg: response.message })
          setTimeout(function () {
            if (jQuery('#failed_alrt').fadeOut(2000));
          }, 4000)
        }
      })
    } else {
      this.setState({ isTablefilled: true })
    }
  }

  callAllLocale = () => {
    FetchAllApi.locale_list((err, response) => {
      console.log('vendor_names', response)

      if (response.status === 1) {
        this.setState({})
      } else {
      }
    })
  }
  formatCurrency = curr => {
    const filtered = data.filter(item => item.currency == curr)
    if (filtered.length > 0) {
      var useme = filtered[0].locale
    } else {
      let trimed = curr.trim()
      let sliced = trimed.slice(0, 2)
      var useme = 'en' + sliced
    }
    return amnt => {
      return new Intl.NumberFormat(useme, {
        currency: curr
      }).format(amnt)
    }
  }
  typeOfColumnTobeModified = changeEvent => {
    this.setState({
      selectedColumnType: changeEvent.target.value
    })
  }
  add_coulmn = colType => {
    var user_id = parseFloat(this.state.logged_user_id)
    let type = this.state.selectedColumnType
    type = type ? type : colType
    if (type === 'textField') {
      var type_ = 1
    } else {
      var type_ = 2
    }
    let coulmn_name = jQuery('#coulmn_name').val()
    FetchAllApi.add_columns_list(
      user_id,
      type_,
      coulmn_name,
      (err, response) => {
        console.log('Lhouiodis', response)
        if (response.status === 1) {
          this.getColList()
        } else {
          this.setState({
            number_of_columns_list: []
          })
        }
      }
    )

    //       FetchAllApi.get_columns_list(user_id, (err, response) => {
    //   console.log('LIST RETURNED=>', response)
    //   if (response.status === 1) {
    //     this.setState({
    //       number_of_columns_list: response.list
    //     })
    //   } else {
    //     this.setState({
    //       number_of_columns_list: []
    //     })
    //   }
    // })

    // let type = this.state.selectedColumnType
    // type = type ? type : colType
    // var user_id = parseFloat(this.state.logged_user_id)
    // if (type === 'dropDownField') {
    //   // TODO: Make the API
    //   FetchAllApi.get_columns_list(user_id, (err, response) => {
    //     console.log('LIST RETURNED=>', response)
    //     if (response.status === 1) {
    //       this.setState({
    //         number_of_columns_list: response.list
    //       })
    //     } else {
    //       this.setState({
    //         number_of_columns_list: []
    //       })
    //     }
    //   })
    // }
    // let item_check = jQuery(
    //   `#coulmn${this.state.rows.length - 1}${this.state.coulmns.length - 1}`
    // ).val()
    //   var coulmns = this.state.coulmns
    //   coulmns.push('new row')
    //   this.setState({ coulmns: coulmns })

    window.jQuery('#pop-modal-2').modal('hide')
  }
  removeOverFlow = (e, col) => {
    if (col) {
      this.setState({
        columnId: col
      })
    }
    jQuery('.form-table').addClass('ovrFlwRmve')
  }

  getPaymethod = () => {
    FetchAllApi.getPaymethod((err, response) => {
      console.log('vendojkdjnksnames', response)

      if (response.status === 1) {
        this.setState({
          payment_method_list: response.lists
        })
      } else {
      }
    })
  }
  render() {
    if (this.state.sales_product_item_list) {
      var opt = this.state.sales_product_item_list.map(item => {
        return (<>
          <option value={item.item_name} data-status={item.id}>
            {item.item_name}
          </option></>
        )
      })
    }

    const toWords = new ToWords()
    // const toWords = new ToWords();
    console.log('sdghfmg,sd', this.state.customer_list)
    console.log('kusm', this.state.billing_address)

    let THIS = this

    return (
      <div id='mynode'>
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
                <a
                  href='javascript:;'
                  onClick={this.routedChange.bind(this, 'inbox')}
                  className='back hidden-xs'
                  class='back hidden-xs'
                >
                  <img src='../../images/back-arrow-blue.svg' />
                </a>

                <ul class='list-unstyled breadcrumb page-title hidden-xs'>
                  <li>
                    <a href='javascript: ;'>Create Invoice</a>
                  </li>
                  <li>Accounts Receivable</li>
                </ul>
                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>
              <div>
                <div className='content-top col-md-12 col-xs-12'>
                  <form
                    className='custom-form form-inline'
                    id='form_clear_input'
                  >
                    <div className='form-group mar-rgt'>
                      <label>Accounts</label>
                      <div className='custom-select-drop dropdown'>
                        <a
                          aria-expanded='false'
                          aria-haspopup='true'
                          role='button'
                          data-toggle='dropdown'
                          className='dropdown-toggle btn'
                          href='javascript:;'
                        >
                          <span id='selected'>
                            {this.state.accounts_selected === ''
                              ? 'Choose'
                              : this.state.accounts_selected}
                          </span>
                          <span className='caret' />
                        </a>
                        <ul className='dropdown-menu'>
                          {/* <li className='active'>
                            <a href='javascript:;'>Accounts Receivable</a>
                          </li>
                          <li>
                            <a href='javascript:;'>Accounts Receivable (USD)</a>
                          </li>
                          <li>
                            <a href='javascript:;'>Accounts Receivable (INR)</a>
                          </li> */}

                          {this.state.accounts_dropdown &&
                            this.state.accounts_dropdown.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href='javascript:;'
                                    onClick={() =>
                                      this.set_accounts_selected(item.name)
                                    }
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              )
                            })}
                        </ul>
                      </div>
                    </div>
                    <div className='form-group'>
                      <label>Templates</label>
                      <div className='custom-select-drop dropdown'>
                        <a
                          aria-expanded='false'
                          aria-haspopup='true'
                          role='button'
                          data-toggle='dropdown'
                          className='dropdown-toggle btn'
                          href='javascript:;'
                        >
                          <span id='selected'>
                            {this.state.selected_templateName}
                          </span>
                          <span className='caret' />
                        </a>
                        <ul className='dropdown-menu'>
                          {/* {this.render_templateList()} */}
                          {this.state.response.list != undefined &&
                            this.state.response.list.map((item, index) => {
                              console.log('ggggg', this.state.response)
                              return (
                                <li
                                  key={index}
                                  id={index}
                                  onClick={() =>
                                    this.apply_template_format(
                                      index,
                                      this.state.response.list[index]
                                        .template_name,
                                      this.state.response.list[index]
                                        .html_content
                                    )
                                  }
                                >
                                  <a href='javascript:;'>
                                    {
                                      this.state.response.list[index]
                                        .template_name
                                    }
                                  </a>
                                </li>
                              )
                            })}
                        </ul>
                        {this.state.isTemplate_selected ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please choose template.
                            </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className='main-content col-md-12 col-xs-12'>
                <div className='content-sec col-md-12 col-xs-12 pad-no mar-t-no'>
                  <form className='custom-form invoice-form'>
                    <div className='row'>
                      <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                        <label>Customer Name</label>

                        <select
                          className='selectpicker form-control add-new'
                          data-live-search='true'
                          title='Choose customer'
                          id='variable_pay_type'
                          onChange={e => {
                            this.handleChange(e.target.value)
                          }}
                        >
                          <option>Create New </option>
                          {this.state.customer_and_job_list &&
                            this.state.customer_and_job_list.map(item => {
                              return (
                                <option value={item.name} data-status={item.id}>
                                  {item.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>

                      {/* <div className='form-group col-md-4'>
                        <label>Customer Name</label>
                        <div className='custom-select-drop dropdown'>
                          <a
                            aria-expanded='false'
                            aria-haspopup='true'
                            role='button'
                            data-toggle='dropdown'
                            className='dropdown-toggle btn form-control'
                            href='javascript:;'
                          >
                            <span id='selected'>
                              {this.state.selected_customer_name === ''
                                ? 'Choose customer'
                                : this.state.selected_customer_name}
                            </span>
                            <span className='caret' />
                          </a>
                          <ul className='dropdown-menu'>
                            {this.state.customer_list != '' &&
                              this.state.customer_list.map((item, index) => {
                                console.log('ewrwrw', item.name)
                                return (
                                  <li key={index} id={'selected' + index}>
                                    <a
                                      href='javascript:;'
                                      onClick={() =>
                                        this.selected_customer(
                                          index,
                                          item.name,
                                          item.currency
                                        )
                                      }
                                    >
                                      {item.customer_name}
                                    </a>
                                  </li>
                                )
                              })}
                          </ul>{' '}
                          {this.state.isCustomername ? (
                            <div style={{ float: 'left' }}>
                              <small style={{ color: 'red' }}>
                                *Please choose customer name.
                              </small>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <converter ref={this.child} />
                      </div> */}
                      <div
                        className='form-group col-md-4'
                        id='itemoptionDatestatus'
                      >
                        <label>Date</label>
                        <div>
                          <DatePicker
                            onChange={this.onChange}
                            value={this.state.date}
                            className='form-control'
                            clearIcon={null}
                            clearAriaLabel='aria-label'
                            style={{ paddingLeft: 30 }}
                            format='dd-MM-yyyy'
                            placeholder='dd-mm-yyyy'
                          />
                        </div>
                      </div>

                      <div
                        className='form-group col-md-4'
                        id='itemoptioninvoicenostatus'
                      >
                        <label>Invoice No</label>
                        <input
                          type='text'
                          name='inv-no'
                          className='form-control'
                          id='invoice_no'
                          required
                          autoComplete='off'
                        />{' '}
                        {this.state.isInvoice_no ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please fill out invoice no.
                            </small>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className='form-group col-lg-4 col-md-6 col-sm-6 col-xs-12'>
                      <label>Job Name</label>

                      <select
                        className='selectpicker form-control add-new'
                        data-live-search='true'
                        title='Choose...'
                        id='jobName'
                        onChange={e => {
                          this.newJob(e.target.value)
                        }}
                      >
                        <option> Create New </option>
                        {this.state.customerjoblist &&
                          this.state.customerjoblist.map(item => {
                            return (
                              <option
                                value={item.job_name}
                                data-status={item.id}
                              >
                                {item.job_name}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                    {/* <div className='form-group col-md-4'>
                      <label>Job Name</label>
                      <select
                            className="selectpicker form-control add-new"
                            data-live-search="true"
                            title="Choose"
                            id="variable_pay_type"
                                                                                  
                          >
                            <option>Create New </option>
                            <option>job 1</option>
                            <option>job 2</option>
                            <option>job 3</option>
                          </select>
                          </div> */}
                    {/* <textarea
                        className='form-control'
                        defaultValue={''}
                        id='job_name'
                      />
                      {this.state.isjob_name ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out job name.
                          </small>
                        </div>
                      ) : (
                        ''
                      )} */}

                    <div
                      className='form-group col-md-4'
                      id='itemoptionbilltostatus'
                    >
                      <label>Invoice to</label>
                      <textarea
                        id='invoice_to'
                        className='form-control'
                        value={this.state.billing_address}
                        onChange={e => {
                          this.setState({ billing_address: e.target.value })
                        }}
                        required
                      />
                      {this.state.isInvoice_to ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out invoice to.
                          </small>
                        </div>
                      ) : (
                        ''
                      )}{' '}
                    </div>
                    <div
                      className='form-group col-md-4'
                      id='itemoptionshippingtostatus'
                    >
                      <label>Shipping to</label>
                      <textarea
                        id='shipping_to'
                        className='form-control'
                        value={this.state.shipping_address}
                        onChange={e => {
                          this.setState({ shipping_address: e.target.value })
                        }}
                        required
                      ></textarea>
                      {this.state.isShippingt_to ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out shipping to.
                          </small>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>

                    {/* <div
                      className='form-group col-md-4'
                      id='itemoptioninvoicenostatus'
                    >
                      <label>Mobile No.</label>
                      <input
                        type='text'
                        name='mobile_no'
                        className='form-control'
                        id='mobile_no'
                        required
                      />{' '}
                      {this.state.isMobileno ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out mobile no.
                          </small>
                        </div>
                      ) : (
                        ''
                      )}
                    </div> */}
                    {/* //Jp work */}
                    <div
                      className='modal fade pop-modal'
                      id='pop-modal-1'
                      role='dialog'
                    >
                      <div className='modal-dialog modal-md custom-modal'>
                        <button
                          type='button'
                          className='close hidden-xs'
                          data-dismiss='modal'
                          onClick={this.cancel_gst_modal}
                        >
                          <img
                            className='img-responsive'
                            src='../../images/close-red.svg'
                            alt='icon'
                          />
                        </button>
                        <div className='modal-content'>
                          <div className='modal-body text-center'>
                            <h3>Add New GST</h3>
                            <form className='custom-form row'>
                              <div className='form-group col-md-12 col-xs-12 pad-no'>
                                <div className='col-md-4 col-sm-4 col-xs-12'>
                                  <label>
                                    Sales Tax Code
                                    <span className='astrick'>*</span>
                                  </label>
                                </div>
                                <div className='col-md-8 col-sm-8 col-xs-12'>
                                  <input
                                    type='text'
                                    name='sales_tax_code'
                                    id='sales_tax_code'
                                    autoComplete='off'
                                    maxLength='4'
                                    className='form-control'
                                    onChange={event =>
                                      this.handleChangeTax(event)
                                    }
                                    required
                                  />

                                  <p className='input-info'>
                                    (Maximum 4 characters)
                                  </p>
                                </div>
                              </div>
                              <div className='form-group col-md-12 col-xs-12 pad-no'>
                                <div className='col-md-4 col-sm-4 col-md-12'>
                                  <label>
                                    Sales Tax Name
                                    <span className='astrick'>*</span>
                                  </label>
                                </div>
                                <div className='col-md-8 col-sm-8 col-xs-12'>
                                  <input
                                    type='text'
                                    name='salesTax_name_entered'
                                    autoComplete='off'
                                    id='sales_tax_name'
                                    className='form-control'
                                    onChange={event =>
                                      this.handleChangeTax(event)
                                    }
                                    required
                                  />
                                </div>
                              </div>
                              <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                                <div className='col-md-4 col-sm-4 col-xs-12'>
                                  <label>Tax Type</label>
                                </div>
                                <div className='col-md-8 col-sm-8 col-xs-12'>
                                  <label className='custom-checkbox radio mar-rgt taxable'>
                                    <input
                                      type='radio'
                                      name='tax-item'
                                      value='option1'
                                      checked={
                                        THIS.state.selectedOption === 'option1'
                                      }
                                      onChange={THIS.handleOptionChange}
                                    />
                                    Taxable
                                    <span className='checkmark'></span>
                                  </label>
                                  <label className='custom-checkbox radio non-taxable'>
                                    <input
                                      type='radio'
                                      name='tax-item'
                                      value='option2'
                                      checked={
                                        THIS.state.selectedOption === 'option2'
                                      }
                                      onChange={THIS.handleOptionChange}
                                    />{' '}
                                    Non-Taxable/Exempt
                                    <span className='checkmark'></span>
                                  </label>
                                  {THIS.state.selectedOption === 'option1' ? (
                                    <div className='hidden-field col-md-12 col-xs-12'>
                                      <div className='form-group'>
                                        <label className='mar-t-no mar-btm'>
                                          Tax item for purchases & sales
                                        </label>
                                        <div className='col-md-12'>
                                          <div className='row'>
                                            <label
                                              className='mar-rgt'
                                              style={{ marginTop: 8 }}
                                            >
                                              Rate
                                            </label>
                                            { }
                                            <div className='input-group rate-input'>
                                              <input
                                                className='form-control'
                                                type='text'
                                                name='tax'
                                                id='tax'
                                                autoComplete='off'
                                                required
                                                onInput={event =>
                                                  THIS.handleChange_gst_type(
                                                    event
                                                  )
                                                }
                                              />
                                              <div className='input-group-btn'>
                                                <div className='custom-select-drop dropdown'>
                                                  <a
                                                    aria-expanded='false'
                                                    aria-haspopup='true'
                                                    role='button'
                                                    data-toggle='dropdown'
                                                    className='dropdown-toggle btn'
                                                    href='javascript:;'
                                                  >
                                                    <span id='selected'>
                                                      {
                                                        this.state
                                                          .selected_rate_type
                                                      }
                                                    </span>
                                                    <span className='caret'></span>
                                                  </a>
                                                  <ul className='dropdown-menu'>
                                                    <li className='active'>
                                                      <a
                                                        href='javascript:;'
                                                        onClick={
                                                          this.update_rate_type
                                                        }
                                                      >
                                                        %
                                                      </a>
                                                    </li>
                                                    <li>
                                                      <a
                                                        href='javascript:;'
                                                        onClick={
                                                          this.update_rate_fixed
                                                        }
                                                      >
                                                        Fixed price
                                                      </a>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                              {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                              <small style={{ color: 'red' }} className='mymsg'>
                                {this.state.modal_info_msg}{' '}
                              </small>

                              <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                                {this.state.show_succes ? (
                                  <div className='alert alert-success'>
                                    <strong>Success!</strong> Your new GST is
                                    added.
                                  </div>
                                ) : (
                                  ''
                                )}
                                <button
                                  className='btn btn-lightgray'
                                  data-dismiss='modal'
                                  onClick={this.modal_cancel}
                                >
                                  Cancel
                                </button>
                                <span>{'   '}</span>
                                <button
                                  className='btn btn-green'
                                  type='submit'
                                  onClick={this.add_gst_details}
                                >
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='form-group col-md-4'>
                      <label>Tax</label>
                      <br />
                      <label className='custom-checkbox'>
                        <input
                          type='checkbox'
                          checked={this.state.isChecked}
                          onChange={this.toggleChange}
                        />{' '}
                        Including Tax
                        <span className='checkmark'></span>
                      </label>
                    </div>
                    {/* {this.saveAs_pdf()} */}

                    <div className='form-group col-md-12'>
                      <div className='table-responsive col-md-12' style={{ height: 'auto' }}>
                        <table className='invoice-item-table'>
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Description</th>
                              <th>Unit Price</th>
                              <th className='text-center'>Quantity</th>
                              <th className='text-center'>Tax</th>

                              {this.state.coulmns != undefined &&
                                this.state.coulmns.map((coulmn, index) => {
                                  return (
                                    <th
                                      key={coulmn}
                                      id={`header${index}`}
                                      contentEditable
                                      onInput={event =>
                                        THIS.handleChangeItems(
                                          event,
                                          THIS.state.rows.length - 1
                                        )
                                      }
                                      required
                                      placeholder='Editable'
                                    >
                                      Editable
                                    </th>
                                  )
                                })}
                              {this.state.number_of_columns_list != undefined &&
                                this.state.number_of_columns_list.map(
                                  (coulmn, index) => {
                                    return (
                                      <th
                                        key={coulmn.column_name}
                                        id={`header${index}`}
                                        onInput={event =>
                                          THIS.handleChangeItems(
                                            event,
                                            THIS.state.rows.length - 1
                                          )
                                        }
                                        required
                                        placeholder='DropDown'
                                      >
                                        {coulmn.column_name}
                                      </th>
                                    )
                                  }
                                )}
                              <th className='text-center'>Total</th>
                              <th
                                className='text-center'
                                style={{ paddingTop: 1 }}
                              >
                                <a
                                  href='javascript:;'
                                  className='add-col'
                                  data-toggle='modal'
                                  data-target='#pop-modal-2'
                                >
                                  <img
                                    src='../../images/plus-icon.svg'
                                    alt='icon'
                                  />
                                </a>
                              </th>
                            </tr>
                          </thead>
                          <tbody className='ui-sortable'>
                            {this.state.rows.map(function (row, index) {
                              let itemid = index
                              let myvalue =
                                THIS.state.myarray.length > 0 &&
                                  THIS.state.myarray[itemid] &&
                                  THIS.state.myarray[itemid].price != '' &&
                                  THIS.state.myarray[itemid].price != 0
                                  ? THIS.state.myarray[itemid].price
                                  : ''

                              let selected_categeory =
                                THIS.state.myarray.length > 0 &&
                                  THIS.state.myarray[itemid] &&
                                  THIS.state.myarray[itemid].category_id != '' &&
                                  THIS.state.myarray[itemid].category_id != 0
                                  ? THIS.state.myarray[itemid].category_id
                                  : THIS.state.selected
                              //   alert(itemid)
                              return (
                                <tr key={row}>
                                  <td style={{ width: '20%' }}>


                                    <select
                                      className='selectpicker form-control add-new'
                                      data-live-search='true'
                                      title='Choose'
                                    >
                                      <option>Add new</option>

                                      {opt}
                                    </select>

                                  </td>

                                  <td>
                                    <textarea
                                      className='form-control'
                                      placeholder='Enter Description'
                                      style={{ height: '42px', width: '123px' }}
                                      autoComplete='off'
                                      name='description'
                                      id={`descr${itemid}`}
                                      onInput={event =>
                                        THIS.handleChangeItems(
                                          event,
                                          THIS.state.rows.length - 1
                                        )
                                      }
                                    ></textarea>
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      name='unit_price'
                                      className='form-control'
                                      placeholder={'00.00'}
                                      autoComplete='off'
                                      id={`unit_price${itemid}`}
                                      onInput={event =>
                                        THIS.handleChangeItems(
                                          event,
                                          THIS.state.rows.length - 1
                                        )
                                      }
                                      required
                                    />
                                  </td>
                                  <td className='text-center'>
                                    <input
                                      type='text'
                                      name='quantity'
                                      className='form-control'
                                      placeholder={'00.00'}
                                      id={`quantity${itemid}`}
                                      onInput={event =>
                                        THIS.handleChangeItems(
                                          event,
                                          THIS.state.rows.length - 1
                                        )
                                      }
                                      required
                                    />
                                  </td>
                                  <td className='text-center '>
                                    <div className='custom-select-drop dropdown tbl_drop_down'>
                                      <a
                                        aria-expanded='false'
                                        aria-haspopup='true'
                                        role='button'
                                        data-toggle='dropdown'
                                        className='dropdown-toggle btn'
                                        href='javascript:;'
                                        value={THIS.state.selected}
                                        required
                                      >
                                        {/* <span
                                      id='selected'
                                      // onChange={event => this.handleChange(event)}
                                    >
                                      {THIS.state.sales_tax_name}
                                    </span> */}

                                        <span
                                          id={`selectednow${itemid}`}
                                          className='salesTaxName'
                                        >
                                          {THIS.state.selected != ''
                                            ? THIS.state.selected
                                            : 'Choose'}{' '}
                                        </span>

                                        <span
                                          id={`selectednow_id${itemid}`}
                                          style={{ display: 'none' }}
                                        >
                                          NO_VALUE
                                        </span>
                                        <input
                                          type='hidden'
                                          id={`selectedrate_id${itemid}`}
                                        />
                                        <input
                                          type='hidden'
                                          id={`selectedtype_id${itemid}`}
                                        />

                                        <span className='caret'></span>
                                      </a>
                                      <ul
                                        className='dropdown-menu category'
                                        style={
                                          {
                                            // height: 213,
                                            // overflow: 'scroll',
                                            // width: 'auto'
                                          }
                                        }
                                      >
                                        <li>
                                          <input
                                            type='text'
                                            name='search'
                                            id='gst_search'
                                            autoComplete='off'
                                            className='form-control'
                                            placeholder='Search'
                                            onInput={event =>
                                              THIS.update_search_keyword(event)
                                            }
                                            required
                                          />
                                          <button
                                            type='button'
                                            className='btn btn-rounded btn-blue'
                                            data-toggle='modal'
                                            data-target='#pop-modal-1'
                                          >
                                            Add New
                                            <img
                                              className='arrow-icon'
                                              src='../../images/right-arrow.svg'
                                              alt='icon'
                                            />
                                          </button>
                                        </li>
                                        <li>
                                          <ul className='list-unstyled'>
                                            {THIS.state.gst_list.map(
                                              (item, index) => {
                                                return (
                                                  <li
                                                    key={index}
                                                    onClick={THIS.handleCheck_get_selected_tax.bind(
                                                      THIS,
                                                      item.id,
                                                      itemid,
                                                      'selectednow' + itemid,
                                                      item.sales_tax_name
                                                    )}
                                                    data-name={
                                                      item.sales_tax_name
                                                    }
                                                    data-rate={item.rate}
                                                    data-type={item.rate_type}
                                                  >
                                                    <a
                                                      href='javascript:;'
                                                      value={item.name}
                                                    >
                                                      {item.sales_tax_name}
                                                    </a>
                                                  </li>
                                                )
                                              }
                                            )}
                                          </ul>
                                        </li>
                                      </ul>
                                    </div>
                                  </td>

                                  {THIS.state.number_of_columns_list !=
                                    undefined &&
                                    THIS.state.number_of_columns_list.map(
                                      (column, index) => {
                                        console.log('gdsgsdg', column)
                                        var colId = column.id

                                        if (column.type == 2) {
                                          const optionsMap = column.options.map(
                                            item => {
                                              return (
                                                <option value={item}>
                                                  {item}
                                                </option>
                                              )
                                            }
                                          )
                                          return (
                                            <td>
                                              <select
                                                className='selectpicker form-control add-new'
                                                id='customer_type'
                                                data-live-search='true'
                                                title='Choose...'
                                                onChange={e => {
                                                  const userId =
                                                    THIS.state.logged_user_id
                                                  const coulmnId = colId
                                                  const isPopup = e.target.value
                                                  jQuery('#colid').val(coulmnId)
                                                  // alert(isPopup)
                                                  if (isPopup == 1) {
                                                    // alert('ama')
                                                    window
                                                      .jQuery('#add_new_role')
                                                      .modal('show')
                                                  }
                                                }}
                                              >
                                                <option value='1'>
                                                  {' '}
                                                  Add New{' '}
                                                </option>

                                                {optionsMap}
                                              </select>
                                            </td>
                                          )
                                        }
                                        //do here text  field
                                        if (column.type == 1) {
                                          return (
                                            <td className='text-center'>
                                              <input
                                                type='text'
                                                name='quantity'
                                                className='form-control'
                                                placeholder='Type...'
                                                id={`cu${itemid}`}
                                                onInput={event =>
                                                  THIS.handleChangeItems(
                                                    event,
                                                    THIS.state.rows.length - 1
                                                  )
                                                }
                                                required
                                              />
                                            </td>
                                          )
                                        }
                                      }
                                    )}

                                  {THIS.state.coulmns != undefined &&
                                    THIS.state.coulmns.length > 0 &&
                                    THIS.state.coulmns.map((item, p) => {
                                      return (
                                        <td className='text-center'>
                                          <input
                                            type='text'
                                            className='form-control'
                                            placeholder={'00.00'}
                                            name='sub_total1'
                                            id={`subtotal`}
                                          />
                                        </td>
                                      )
                                    })}

                                  <td className='text-center'>
                                    <input
                                      type='text'
                                      className='form-control'
                                      placeholder={'00.00'}
                                      name='sub_total'
                                      id={`subtotal${itemid}`}
                                    />
                                  </td>
                                  <td>
                                    <div className='action-wrap'>
                                      <a
                                        title='copy row'
                                        href='javascript:;'
                                        className='clone-row'
                                        onClick={() => THIS.copyRow(itemid)}
                                      >
                                        <img
                                          src='images/clone-icon.svg'
                                          alt='icon'
                                        />
                                      </a>

                                      <a
                                        title='delete row'
                                        href='javascript:;'
                                        className='del-row'
                                        data-toggle='modal'
                                        data-target='#modal_delete'
                                        onClick={() => {
                                          THIS.setState({
                                            specific_id_delete: itemid
                                          })
                                        }}
                                      >
                                        <img
                                          src='images/delete-icon.svg'
                                          alt='icon'
                                        />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>

                        { }
                        {/* <div className='form-group col-md-12 mar-b-no'>
                            <a href='javascript:;' className='add-input'>ADD ROW</a>
                          </div> */}
                        <div class='form-group'>
                          {' '}
                          {this.control_addButton()}
                          {this.state.isTablefilled ? (
                            <div style={{ float: 'left' }}>
                              <small style={{ color: 'red' }}>
                                *Please fill out all table fields.
                              </small>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        {/* <div className='error_tbl_fld'>
                            Please fill out all table fields.
                          </div> */}
                      </div>
                      <div></div>
                    </div>
                    {this.state.isRejected ? (
                      <div
                        id='failed_alrt'
                        class='alert alert-card danger alert-dismissible fade in'
                      >
                        <a
                          href='#'
                          class='close'
                          data-dismiss='alert'
                          aria-label='close'
                        >
                          &times;
                        </a>
                        <div class='img-wrap'>
                          <img
                            class='img-responsive'
                            src='images/alert-cross.svg'
                            alt='icon'
                          />
                        </div>
                        <div class='alert-cont'>
                          <strong class='title'>Failed!</strong>
                          {this.state.reject_msg}.
                        </div>
                      </div>
                    ) : (
                      ''
                    )}

                    {this.state.isClose ? (
                      <div
                        class='alert alert-card success alert-dismissible fade in'
                        id='closeme'
                      >
                        <a
                          href='#'
                          class='close'
                          data-dismiss='alert'
                          aria-label='close'
                        >
                          &times;
                        </a>
                        <div class='img-wrap'>
                          <img
                            class='img-responsive'
                            src='../../images/alert-success.svg'
                            alt='icon'
                          />
                        </div>
                        <div class='alert-cont'>
                          <strong class='title'>Success!</strong>
                          saved successfully.
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className='col-md-12 total-row'>
                      <div className='row'>
                        <div className='form-group exchange-col col-md-5 col-xs-12'>
                          <label className='fw-sbold'>
                            Exchange Rate 1 {this.state.currency_customer}
                          </label>
                          <div>
                            <input
                              type='text'
                              name='inv-no'
                              className='form-control'
                              id='Exchange'
                              required
                              autoComplete='off'
                              placeholder={this.state.exchange_value_ref}
                              // defaultValue={this.state.exchange_value_ref}
                              onChange={e => {
                                if (e.target.value.length > 0) {
                                  this.setState(
                                    {
                                      cus_rate_rate: e.target.value
                                    },
                                    () => {
                                      this.handleChangeItems(
                                        0,
                                        this.state.rows.length - 1
                                      )
                                    }
                                  )
                                } else {
                                  this.setState(
                                    {
                                      cus_rate_rate: this.state
                                        .exchange_value_ref
                                    },
                                    () => {
                                      this.handleChangeItems(
                                        0,
                                        this.state.rows.length - 1
                                      )
                                    }
                                  )
                                }
                              }}
                            />{' '}
                            {/* <span
                              type='text'
                              name='exchangeRate'
                              className='form-control'
                              defaultValue={this.state.exchange_value}
                            >
                              {this.state.exchange_value}
                            </span> */}
                            <span className='label'>SGD</span>
                          </div>
                        </div>
                        <div className='form-group col-md-7 col-xs-12 total-table'>
                          <table className='pull-right'>
                            <thead>
                              <tr>
                                <th>&nbsp;</th>
                                <th className='text-center'>
                                  Foreign Currency
                                  <br />
                                  {/* ({this.state.currency_customer}) */}
                                  (USD)
                                </th>
                                <th className='text-center'>
                                  Home Currency
                                  <br />
                                  (SGD)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='text-right'>Sub Total</td>

                                <td
                                  className='text-center'
                                  id='homecurrencytyt'
                                >
                                  {isNaN(this.state.subTotal)
                                    ? '0'
                                    : this.formatCurrency('EUR')(
                                      this.state.subTotal
                                    )}
                                </td>
                                <td
                                  // else { jQuery("#home_tax_total").html(this.formatCurrency(this.state.currency_customer)(parseFloat(tax_total.toFixed(2)))) }

                                  className='text-center'
                                  id='foreigncurrencytyt'
                                >
                                  {isNaN(this.state.sub_total_home_currency)
                                    ? '0'
                                    : // : this.formatCurrency('SGD') (parseFloat(this.state.sub_total_home_currency))}
                                    this.state.sub_total_home_currency}
                                </td>
                              </tr>
                              <tr>
                                <td className='text-right'>Tax</td>

                                <td className='text-center' id='home_tax_total'>
                                  00.00
                                </td>
                                <td
                                  className='text-center'
                                  id='foreign_tax_total'
                                >
                                  {isNaN(this.state.tax_home_currency)
                                    ? '0'
                                    : this.state.tax_home_currency
                                    //  this.formatCurrency('SGD') (parseFloat(this.state.tax_home_currency))}
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className='text-right'>Grand Total</td>

                                <td
                                  className='text-center'
                                  id='home_grand_total'
                                >
                                  0.00{' '}
                                  {/* {this.formatCurrency('USD')(parseFloat(0).toFixed(2))} */}
                                </td>
                                <td
                                  className='text-center'
                                  id='foreign_grand_total'
                                >
                                  {isNaN(this.state.grand_total_home_currency)
                                    ? '0'
                                    : this.state.grand_total_home_currency
                                    // this.formatCurrency('SGD')(parseFloat(this.state.grand_total_home_currency).toFixed(2))
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        class='modal fade in'
                        id='modal_delete'
                        role='dialog'
                        style={{ paddingLeft: 15 }}
                      >
                        <div
                          class='modal-dialog modal-md'
                          style={{ width: 440 }}
                        >
                          <button
                            type='button'
                            class='close hidden-xs'
                            data-dismiss='modal'
                          >
                            <img
                              class='img-responsive'
                              src='../../images/close-red.svg'
                              alt='icon'
                            />
                          </button>
                          <div class='modal-content'>
                            <div class='modal-body text-center success-modal'>
                              <div class='pop-icon img-size'>
                                {
                                  <img
                                    src='../../images/delete-icon.svg'
                                    alt='icon'
                                  />
                                }
                              </div>

                              <h3>Are you sure?</h3>

                              <p class='fw-500'>
                                Selected item will be deleted.
                              </p>
                              <button
                                className='btn btn-lightgray'
                                data-dismiss='modal'
                              >
                                Cancel
                              </button>
                              <span>{'   '}</span>
                              <button
                                class='btn btn-red'
                                type='button'
                                onClick={this.delete_Rows}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='form-group col-md-4' id='footertermsstatus'>
                      <label>Payment Method</label>
                      <select
                        className='selectpicker form-control'
                        data-live-search='true'
                        title='Choose customer'
                        id='payment_method'
                      >
                        {this.state.payment_method_list &&
                          this.state.payment_method_list.map(item => {
                            return (
                              <option value={item.name} data-status={item.id}>
                                {item.name}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                    <div className='form-group col-md-4'>
                      <label>Payment Date</label>
                      <div className='input-group date'>
                        <input
                          type='text'
                          autoComplete='off'
                          name='incorport_date'
                          id='fromdate'
                          onBlur={e => this.changeDate(e.target.value)}
                          className='form-control'
                          required
                        />
                        <div className='input-group-addon'>
                          <img src='images/calendar-icon.svg' alt='icon' />
                        </div>
                      </div>
                      <small className='text-red'></small>
                    </div>

                    <div
                      className='form-group col-md-4'
                      id='footeroptionthanksmessagestatus'
                    >
                      <label>Amount</label>
                      <input
                        type='text'
                        name='inv-no'
                        className='form-control'
                        id='amount'
                        required
                        placeholder={'0.00'}
                        autoComplete='off'
                        onChange={e => {
                          if (!isNaN(e.target.value)) {
                            this.setState({ amount_entered: e.target.value })
                          }
                        }}
                      />{' '}
                      {this.state.isThanking_msg ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out thank you message.
                          </small>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div
                      className='form-group col-md-4'
                      id='termsandconditions'
                    >
                      <label>Amount In Words</label>
                      <textarea
                        type='text'
                        name='inv-no'
                        className='form-control'
                        id='amount_in_words'
                        required
                        autoComplete='off'
                        disabled='true'
                        value={
                          this.state.amount_entered > 0
                            ? toWords.convert(
                              this.state.amount_entered != undefined &&
                                this.state.amount_entered != ''
                                ? parseFloat(this.state.amount_entered)
                                : 0
                            )
                            : toWords.convert(
                              this.state.amount_entered != undefined &&
                                this.state.amount_entered != ''
                                ? this.state.amount_entered
                                : 0
                            )
                        }
                      />{' '}
                      {this.state.isTerms_cond_msg ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out terms and conditions.
                          </small>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>

                    <div
                      className='form-group col-md-4'
                      id='termsandconditions'
                    >
                      <label>Reference</label>
                      <input
                        type='text'
                        name='inv-no'
                        className='form-control'
                        id='ref'
                        required
                        autoComplete='off'
                      />{' '}
                      {this.state.isTerms_cond_msg ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out terms and conditions.
                          </small>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>

                    <div className='form-group col-md-4' id='footertermsstatus'>
                      <label>Memo</label>
                      <textarea
                        className='form-control'
                        id='footer_memo'
                        defaultValue={''}
                        required
                      />
                    </div>
                    <div
                      className='form-group col-md-4'
                      id='footeroptionthanksmessagestatus'
                    >
                      <label>Thank you message and Banking details</label>
                      <textarea
                        id='footeroptionthanksmessages'
                        className='form-control'
                        defaultValue={''}
                        required
                      />{' '}
                      {this.state.isThanking_msg ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out thank you message.
                          </small>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div
                      className='form-group col-md-4'
                      id='termsandconditions'
                    >
                      <label>Terms &amp; Conditions</label>
                      <textarea
                        id='termcondmsg'
                        className='form-control'
                        defaultValue={''}
                        required
                      />
                      {this.state.isTerms_cond_msg ? (
                        <div style={{ float: 'left' }}>
                          <small style={{ color: 'red' }}>
                            *Please fill out terms and conditions.
                          </small>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>

                    <div
                      className='modal fade pop-modal'
                      id='pop-modal-2'
                      role='dialog'
                    >
                      <div className='modal-dialog modal-md custom-modal'>
                        <button
                          type='button'
                          className='close hidden-xs'
                          data-dismiss='modal'
                          onClick={this.cancel_gst_modal}
                        >
                          <img
                            className='img-responsive'
                            src='../../images/close-red.svg'
                            alt='icon'
                          />
                        </button>
                        <div className='modal-content'>
                          <div className='modal-body text-center'>
                            <h3>Add New Column</h3>
                            <form className='custom-form row'>
                              <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                                <div className='col-md-4 col-sm-4 col-xs-12'>
                                  <label>Type Of the Editable Field</label>
                                </div>
                                <div className='col-md-8 col-sm-8 col-xs-12'>
                                  <label className='custom-checkbox radio mar-rgt taxable'>
                                    <input
                                      type='radio'
                                      name='editableField'
                                      value='textField'
                                      checked={
                                        this.state.selectedColumnType ===
                                        'textField'
                                      }
                                      onChange={THIS.typeOfColumnTobeModified}
                                    />
                                    Text
                                    <span className='checkmark'></span>
                                  </label>
                                  <label className='custom-checkbox radio non-taxable'>
                                    <input
                                      type='radio'
                                      name='editableField'
                                      value='dropDownField'
                                      checked={
                                        this.state.selectedColumnType ===
                                        'dropDownField'
                                      }
                                      onChange={THIS.typeOfColumnTobeModified}
                                    />{' '}
                                    Drop Down
                                    <span className='checkmark'></span>
                                  </label>
                                </div>
                              </div>

                              <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                                <div className='col-md-4 col-sm-4 col-xs-12'>
                                  <label>Coulmn Name</label>
                                </div>
                                <div className='col-md-8 col-sm-8 col-xs-12'>
                                  <input
                                    autoComplete='off'
                                    type='text'
                                    className='form-control'
                                    id='coulmn_name'
                                  />
                                </div>
                              </div>

                              {/* <div className='mymsg'>{this.state.modal_info_msg}</div> */}
                              <small style={{ color: 'red' }} className='mymsg'>
                                {this.state.modal_info_msg}{' '}
                              </small>

                              <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                                {this.state.show_succes ? (
                                  <div className='alert alert-success'>
                                    <strong>Success!</strong> Your new GST is
                                    added.
                                  </div>
                                ) : (
                                  ''
                                )}
                                <button
                                  className='btn btn-lightgray'
                                  data-dismiss='modal'
                                  onClick={this.modal_cancel}
                                >
                                  Cancel
                                </button>
                                <span>{'   '}</span>
                                <button
                                  className='btn btn-green'
                                  type='button'
                                  onClick={THIS.add_coulmn}
                                >
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='pf-btm-wrap'>
                      <div className='col-md-6 col-sm-6 col-xs-12 pad-no'>
                        <button
                          className='btn btn-empty ico'
                          onClick={this.convertHtmlToPdf.bind(this)}
                        >
                          <img src='images/print-icon.svg' alt='icon' />
                          Print
                        </button>

                        <button
                          type='button'
                          className='btn btn-empty ico'
                          onClick={this.convertHtmlToPdf.bind(this)}
                        >
                          <img src='images/pdf-icon.svg' alt='icon' />
                          Save as PDF
                        </button>
                      </div>
                      <div className='col-md-6 col-sm-6 col-xs-12 text-right pad-no'>
                        <button
                          className='btn btn-lightgray'
                          type='button'
                          onClick={() => {
                            this.props.history.push('/invoice_templates')
                          }}
                        >
                          Close
                        </button>
                        {'  '}
                        <button
                          className='btn btn-yellow'
                          type='button'
                          onClick={e => this.save_template(e, 'saveandnew')}
                        >
                          Save &amp; New
                        </button>
                        {'  '}
                        <input
                          className='btn btn-green'
                          type='button'
                          value='Save'
                          onClick={e => this.save_template(e, 'save')}
                        />
                      </div>
                    </div>
                    <div id='data_result1'>
                      {HTMLReactParser(this.state.html_content)}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='modal fade pop-modal' id='add_new_role' role='dialog'>
          <div className='modal-dialog modal-md custom-modal'>
            <button
              type='button'
              className='close hidden-xs'
              data-dismiss='modal'
              onClick={() => {
                this.setState({ roleStringLen: false })
              }}
            >
              <img
                className='img-responsive'
                src='../../images/close-red.svg'
                alt='icon'
              />
            </button>
            <div className='modal-content'>
              <div className='modal-body text-center'>
                <h3>Add Options</h3>
                <form className='custom-form row'>
                  <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                    <div className='col-md-4 col-sm-4 col-xs-12'>
                      <label>Options</label>
                    </div>
                    <div className='col-md-8 col-sm-8 col-xs-12'>
                      <input
                        autoComplete='off'
                        type='text'
                        className='form-control'
                        id='options'
                        placeholder='Enter options seperate by comma'
                      />
                      <div style={{ float: 'left' }}>
                        {this.state.roleStringLen && (
                          <small style={{ color: 'red' }}>
                            *Please fill out role name.
                          </small>
                        )}
                      </div>{' '}
                    </div>
                  </div>

                  <div className='form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no'>
                    <button
                      className='btn btn-lightgray'
                      data-dismiss='modal'
                      onClick={() => {
                        this.setState({ roleStringLen: false })
                      }}
                    >
                      Cancel
                    </button>
                    <span>{'   '}</span>
                    <input type='hidden' id='colid' />

                    <button
                      className='btn btn-green'
                      type='button'
                      onClick={() => {
                        const userId = Number(THIS.state.logged_user_id)
                        const coulmnId = Number(jQuery('#colid').val())
                        const localString = jQuery('#options').val()
                        const optionsArray = localString

                        FetchAllApi.invoiceadd_dropdown_options(
                          userId,
                          coulmnId,
                          optionsArray,
                          (err, response) => {
                            console.log('vendor_names', response)

                            if (response.status === 1) {
                              alert('success')
                              this.getColList()
                              window.jQuery('#add_new_role').modal('hide')
                            } else {
                            }
                          }
                        )
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

        <Footer logoutSubmit={e => this.logoutLink(e)} />
      </div>
    )
  }
}
export default invoice_template_listing
