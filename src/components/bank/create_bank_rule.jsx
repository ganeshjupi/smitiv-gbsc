import React from 'react'
import LeftSidebar from '../left_sidebar'
import Footer from '../footer'
import FetchAllApi from '../../api_links/fetch_all_api'
import Topbar from '../topbar'

import moment from 'moment'
import { connect } from 'react-redux'

import Loader from 'react-loader-spinner'

import jQuery from 'jquery'
var _ = require('lodash')
// import 'bootstrap';
// import 'bootstrap-select';

class CreateBankRule extends React.Component {
  constructor(props) {
    super(props)
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),
      arrayPicked: [],
      DateSelected: [],
      fieldList: [],
      condition_list: [],
      Debit_add_newNewLine_rows: ['row1'],
      Debit_add_newNewLine_initial: 0,
      rows: ['row 1'],
      initial_value: 0,
      initial_value_debit: 0,
      debitCondtionRows: ['row1'],
      rowsClone: ['row1'],
      initial_value_debit_clone: 0,
      bankaccountlist: [],
      ConditionsArray: [],
      list_items: [],
      allocate_items: [],
      default_category_list:[],
      gst_list:[],
      sourceNameOptions:[],
      search_key_gst:'',

    }
  }
  addRowClone = () => {
    var rows = this.state.rowsClone
    rows.push('row' + (this.state.initial_value_debit_clone + 1))

    this.setState({
      isAdd: false,
      initial_value_debit_clone: this.state.initial_value_debit_clone + 1
    })

    this.setState({ rowsClone: rows })
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }
  sourceNameOption = () => {
    let client_Id = this.state.logged_client_id;
    FetchAllApi.settings_defaultNamelist(client_Id, (err, response) => {
      // alert(response.country_id)
      if (response.status === 1) {
        this.setState({ sourceNameOptions: response.list });
      }
    });

  }
  handleCheck_get_selected_tax(
    selectednow_id,
    itemid,
    id,
    valueres,
    rate,
    type
  ) {   
    if (selectednow_id > 0) {     
      jQuery("#" + id).html(valueres);
      jQuery("#selectedrate_id" + itemid).val(rate);
      jQuery("#selectedtype_id" + itemid).val(type);
      jQuery("#selectednow_id" + itemid).html(selectednow_id);
      this.getFixedValueMemo(valueres, this.state.rows.length - 1);
      jQuery(".form-table").removeClass("ovrFlwRmve");
    } else {
     // alert("sorry fault is here only");
    }
    jQuery("#gst_search").val("");
    this.get_gst_list();
  };

  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  }
  componentDidUpdate() {
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
    //  window.jQuery('.input-group.date').datepicker({format: "dd/mm/yyyy"});

  }
  addRow = () => {
    var rows = this.state.rows
    rows.push('row' + (this.state.initial_value + 1))

    this.setState({
      isAdd: false,
      initial_value: this.state.initial_value + 1
    })

    this.setState({ rows: rows })
  }
  addRowCondtion = () => {
    var rows = this.state.debitCondtionRows
    rows.push('row' + (this.state.initial_value + 1))

    this.setState({
      isAdd: false,
      initial_value: this.state.initial_value_debit + 1
    })

    this.setState({ debitCondtionRows: rows })
  }
  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass('minimize_leftbar')

    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push('/')
    }
  }
  setUpdatedDate = () => {

    let fromDate = this.convert_date(jQuery('#fromDate').val())
    let toDate = this.convert_date(jQuery('#toDate').val())
    if (fromDate != undefined && fromDate != 'undefined-undefined-' && toDate != undefined && toDate != 'undefined-undefined-') {
      this.setState({
        DateSelected: [fromDate, toDate]
      })
    } else {
      this.setState({
        DateSelected: []
      })
    }

  }
  getFields = () => {

    FetchAllApi.field_list((err, response) => {
      console.log('vendor_names', response)
      // alert(response.message)

      if (response.status === 1) {
        this.setState({
          fieldList: response.list
        })
      }
      else {
      }
    })
  }
  condition_list = () => {

    FetchAllApi.condition_list((err, response) => {
      console.log('vendor_names', response)
      // alert(response.message)

      if (response.status === 1) {
        this.setState({
          condition_list: response.list
        })
      }
      else {
      }
    })
  }


  get_bankaccountlist = () => {

    FetchAllApi.get_bankaccountlist((err, response) => {
      console.log('vendor_names', response)
      // alert(response.message)

      if (response.status === 1) {
        this.setState({
          bankaccountlist: response.customerData
        })
      }
      else {
      }
    })
  }
  //condition_list

  //condition_list
  componentDidMount() {
    window.jQuery('#useme').datepicker('refresh')
    this.forceUpdate()
    this.getFields()
    this.condition_list()
    this.sourceNameOption();
    this.get_bankaccountlist()
    this.get_gst_list();
    this.defaultcategorylist();
    //script starts
    jQuery(window).on('load', function () {
      jQuery('.mscroll-y').mCustomScrollbar({
        axis: 'y',
        scrollEasing: 'linear',
        scrollInertia: 600,
        autoHideScrollbar: 'true',
        autoExpandScrollbar: 'true'
      })
      jQuery('.mscroll-x').mCustomScrollbar({
        axis: 'x',
        scrollEasing: 'linear',
        scrollInertia: 600,
        autoHideScrollbar: 'true',
        autoExpandScrollbar: 'true'
      })

      jQuery('.ib-scroll').mCustomScrollbar({
        scrollEasing: 'linear',
        scrollInertia: 600,
        scrollbarPosition: 'outside'
      })
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
      window.jQuery('.select-picker').selectpicker()
      jQuery('.label-enclose .label').click(function () {
        jQuery(this).toggleClass('active')
      })
      jQuery('.nav-brand-res').click(function () {
        jQuery('.left-navbar').addClass('active')
      })
      jQuery('.menu-close').click(function () {
        jQuery('.left-navbar').removeClass('active')
      })
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

      jQuery('.dis-link').click(function () {
        jQuery(this).toggleClass('active')
        jQuery('.discount-wrap').slideToggle()
      })
    })

    // jQuery(document)
    //   .on('shown.bs.dropdown', '.dropdown', function () {
    //     // calculate the required sizes, spaces
    //     var jQueryul = jQuery(this).children('.dropdown-menu')
    //     var jQuerybutton = jQuery(this).children('.dropdown-toggle')
    //     var ulOffset = jQueryul.offset()
    //     // how much space would be left on the top if the dropdown opened that direction
    //     if (ulOffset.length) {
    //       var spaceUp =
    //         ulOffset.top -
    //         jQuerybutton.height() -
    //         jQueryul.height() -
    //         jQuery(window).scrollTop()
    //       // how much space is left at the bottom
    //       var spaceDown =
    //         jQuery(window).scrollTop() +
    //         jQuery(window).height() -
    //         (ulOffset.top + jQueryul.height())
    //     }

    //     // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
    //     if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
    //       jQuery(this).addClass('dropup')
    //   })
    //   .on('hidden.bs.dropdown', '.dropdown', function () {
    //     // always reset after close
    //     jQuery(this).removeClass('dropup')
    //   })

    //script ends here
    //jQuery(".select-picker").selectpicker();

    require('jquery-mousewheel')
    require('malihu-custom-scrollbar-plugin')

    jQuery('.item-listwrap').mCustomScrollbar({
      scrollEasing: 'linear',
      scrollInertia: 600,
      scrollbarPosition: 'outside'
    })

    jQuery('.label-enclose .label span').click(function () {
      //jQuery('.label-enclose .label').removeClass('active')
      jQuery(this)
        .parent('.label-enclose .label')
        .addClass('active')
    })
    jQuery('.label-enclose .label a').click(function () {
      jQuery(this)
        .parent('.label-enclose .label')
        .removeClass('active')
    })
  }
  get_gst_list = () => {
    let country_code = this.state.country_code
    //alert(country_code)
    let keyword = this.state.search_key_gst
    FetchAllApi.get_gst_list(country_code, keyword, this.state.logged_client_id, (err, response) => {
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
  defaultcategorylist= () => {
    var client_id = this.state.logged_client_id
  FetchAllApi.defaultcategorylist(client_id, (err, response) => {
    console.log('defaultcategorylist', response)
    if (response.status === 1) {
      this.setState({
        default_category_list: response.list
      })
    } else {
    }
  })
}
  saveDebitRule = () => {
    let isDebit = jQuery('#debit_check').hasClass('active')
    let Debit_title = jQuery('#Debit_title').val()
    let Assigned_contact = jQuery('#Assigned_contact option:selected').val();
    let bankid=jQuery('#debitpayment_terms').val();
    var CoreData = [{

      "type": isDebit ? 1 : 2,
      "client_id":this.state.logged_client_id,
      "condition_list": this.state.ConditionsArray,
      "bank_id":bankid,
      "line_items": this.state.list_items,

      "allocate_items": this.state.allocate_items,
      "bankrule": {
        "title": Debit_title,

        "reference": "bank fees",
        "client_id": this.state.logged_client_id,

        "bank_statement_id": 0,
        "contact_id": Assigned_contact,
        "contact_name": "child job",
        "transfer_id": 1,
        "transfer_name": "world warrior",
        "bank_id": bankid,
        "selected_user_type":Assigned_contact.type
        
      }




    }]

    FetchAllApi.saveDebitRule(CoreData, (err, response) => {
      console.log('vendor_names', response)
      alert(response.message)

      if (response.status === 1) {
        this.props.history.push('/loading', ['/create-bank-rule'])

      }
      else {
      }
    })


  }
  saveCreditRule = () => {
    let bankid=jQuery('#debitpayment_terms').val();

    var CoreData = [{

      "type": 2,
      "client_id": this.state.logged_client_id,
      "bank_id": bankid,
      "condition_list": [{
        "fieldname": "payee",
        "condiition": "LIKE '%%'",
        "values": "hello",
        "conditionid": 1
      },
      {
        "fieldname": "amount",
        "condiition": "=",
        "values": "heloo",
        "conditionid": 2
      }],

      "line_items": [{
        "descripation": "fine",
        "account": "adversting",
        "taxrate": "standard",
        "amount": "3000"

      },
      {
        "descripation": "fine",
        "account": "purchase",
        "taxrate": "standard",

        "amount": "3000"



      }],
      "allocate_items": [{
        "descripation": "fine",
        "account": "sales",
        "taxrate": "standared",

        "percentage": "5"



      }, {
        "descripation": "how r u ",
        "account": "sales",
        "taxrate": "standared",

        "percentage": "5"



      }],
      "bankrule": {

        "title": "2020-01-01",

        "reference": "bank fees",
        "client_id": this.state.logged_client_id,

        "bank_statement_id": 0,
        "contact_id": 1,
        "contact_name": "child job",
        "transfer_id": 1,
        "transfer_name": "world warrior",
        "bank_id": bankid
      }




    }]



    FetchAllApi.saveCreditRule(CoreData, (err, response) => {
      console.log('vendor_names', response)
      alert(response.message)

      if (response.status === 1) {
        this.props.history.push('/loading', ['/create-bank-rule'])

      }
      else {
      }
    })


  }
  saveTrasferRule = () => {


    var CoreData = [{

      "type": 3,
      "condition_list": [{
        "fieldname": "payee",
        "condiition": "LIKE '%%'",
        "values": "hello",
        "conditionid": 1
      },
      {
        "fieldname": "amount",
        "condiition": "=",
        "values": "heloo",
        "conditionid": 2
      }],

      "line_items": [{
        "descripation": "fine",
        "account": "adversting",
        "taxrate": "standard",
        "amount": "3000"

      },
      {
        "descripation": "fine",
        "account": "purchase",
        "taxrate": "standard",

        "amount": "3000"



      }],
      "allocate_items": [{
        "descripation": "fine",
        "account": "sales",
        "taxrate": "standared",

        "percentage": "5"



      }, {
        "descripation": "how r u ",
        "account": "sales",
        "taxrate": "standared",

        "percentage": "5"



      }],
      "bankrule": {

        "title": "2020-01-01",

        "reference": "bank fees",
        "client_id": 1,

        "bank_statement_id": 0,
        "contact_id": 1,
        "contact_name": "child job",
        "transfer_id": 1,
        "transfer_name": "world warrior",
        "bank_id": 1
      }




    }]



    FetchAllApi.saveTrasferRule(CoreData, (err, response) => {
      console.log('vendor_names', response)
      alert(response.message)

      if (response.status === 1) {
        this.props.history.push('/loading', ['/create-bank-rule'])

      }
      else {
      }
    })


  }



  Debit_Memo_delete_Rows = (id) => {
    var itemid = id
    var rows_actual = this.state.rows
    // console.log('jkdghkshakd', this.state.myarray)
    if (this.state.rows.length > 1) {
      if (itemid > -1) {
        rows_actual.splice(itemid, 1)
      }
      this.setState({ rows: rows_actual }, () => {
        // this.forceUpdate()
      })
    }
  }
  cDebit_Memo_delete_Rows = (id) => {
    var itemid = id
    var rows_actual = this.state.rowsClone
    // console.log('jkdghkshakd', this.state.myarray)
    if (this.state.rowsClone.length > 1) {
      if (itemid > -1) {
        rows_actual.splice(itemid, 1)
      }
      this.setState({ rowsClone: rows_actual }, () => {
        this.forceUpdate()
      })
    }
  }

  getConditionsArray = () => {
    let Result = []
    this.state.debitCondtionRows.forEach((item, i) => {
      let values = jQuery(`#condtion_text${i}`).val()
      let fieldname = jQuery(`#payee${i} option:selected`).val();
      let condiition_id = jQuery(`#condition${i} option:selected`).val();
      let condiition = jQuery(`#condition${i} option:selected`).data('status');

      var Obj = {
        "fieldname": fieldname,
        "condiition": condiition,
        "values": values,
        "conditionid": condiition_id

      }
      Result.push(Obj)


    })
    this.setState({
      ConditionsArray: Result
    })
    console.log('kkkk', Result)

  }
  update_search_keyword = (event) => {
    this.setState({ search_key_gst: event.target.value }, () => {
      this.get_gst_list();
    });
  };
  getFixedValueMemo = () => {
    let Result = []
    this.state.rows.forEach((item, i) => {
      let row_memo = jQuery(`#row_memo${i}`).val()
      let row_tax = jQuery(`#row_tax${i}`).val()
      let row_total = jQuery(`#row_total${i}`).val()
      let row_account = jQuery(`#row_account${i} option:selected`).data('status');

      var Obj = {
        "descripation": row_memo,
        "account": row_account,
        "taxrate": row_tax,
        "amount": row_total

      }
      Result.push(Obj)


    })
    this.setState({
      list_items: Result
    })

  }
  cgetFixedValueMemo = () => {
    let Result = []
    this.state.rowsClone.forEach((item, i) => {
      let row_memo = jQuery(`#crow_memo${i}`).val()
      let row_tax = jQuery(`#crow_tax${i}`).val()
      let row_total = jQuery(`#crow_total${i}`).val()
      let row_account = jQuery(`#crow_account${i} option:selected`).data('status');

      var Obj = {
        "descripation": row_memo,
        "account": row_account,
        "taxrate": row_tax,
        "amount": row_total

      }
      Result.push(Obj)


    })
    this.setState({
      allocate_items: Result
    })

  }
  render() {
    console.log('arrayPicked', this.state.arrayPicked)
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    } else {
      return (
        <div>
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
                    class='back hidden-xs'
                    onClick={() => {
                      this.props.history.goBack()
                    }}
                  >
                    <img src='../images/back-arrow-blue.svg' />
                  </a>
                  {/* <span className='page-title hidden-xs'>Inbox</span> */}
                  <ul className='list-unstyled breadcrumb page-title hidden-xs'>
                    <li>
                      <a
                        href='javascript: ;'
                        onClick={this.routedChange.bind(this, 'bank-reconcile-match')}
                      >
                        Create Bank Rule
                      </a>
                    </li>

                  </ul>
                  <Topbar history={this.props.history} logoutSubmit={e => this.logutLink()} />
                </div>
                <div>
                  {/* content-top Starts here */}
                  <div className="content-top col-md-12 col-xs-12">
                    <ul className="nav nav-pills transparent nowrap">
                      <li className="active" id='debit_check'><a data-toggle="pill" href="#debit-rule">Debit Amount Rule</a></li>
                      <li><a data-toggle="pill" href="#debit-rule">Credit Amount Rule</a></li>
                      {/* <li><a data-toggle="pill" href="#transfer-rule">Transfer Amount Rule</a></li> */}
                    </ul>
                  </div>
                  {/* content-top Starts here */}
                  {/* Main Content Starts here */}
                  <div className="main-content col-md-12 col-xs-12">
                    <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                      <div className="tab-content">
                        <div id="debit-rule" className="tab-pane fade in active">
                          <form className="custom-form invoice-form col-md-12 col-xs-12 legend-form rule-form pad-no">
                            <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <label>Rule Title<span className="astrick">*</span></label>
                                <input type="text" name="cus-name" className="form-control" autoComplete='off' id='Debit_title' />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12 col-xs-12 mar-b-no">
                                <label>When money spent on the bank statement matches of the following conditions</label>
                                <div className="set-w">
                                  <select
                                    className='selectpicker form-control'
                                    id='payment_terms'
                                    title='Choose'
                                  >
                                    <option>Any</option>
                                    <option>All</option>

                                  </select>
                                </div>
                              </div>
                            </div>
                            {this.state.debitCondtionRows.map((item, i) => {
                              return (
                                <div className="row bg-add-sec" key={item}>

                                  <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <select
                                      className='selectpicker form-control'
                                      id={`payee${i}`}
                                      data-live-search='true'
                                      title='Choose'
                                      onChange={() => {
                                        this.getConditionsArray()
                                      }}
                                    >
                                      {this.state.fieldList.map((item) => {
                                        return (
                                          <option value={item.name}>{item.name}</option>
                                        )
                                      })}
                                    </select>

                                  </div>
                                  <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">

                                    <select
                                      className='selectpicker form-control'
                                      id={`condition${i}`}
                                      data-live-search='true'
                                      onChange={() => {
                                        this.getConditionsArray()
                                      }}
                                      title='Choose'
                                    >
                                      {this.state.condition_list.map((item) => {
                                        return (
                                          <option value={item.id} data-status={item.name}>{item.name}</option>
                                        )
                                      })}
                                    </select>






                                  </div>
                                  <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <input className='form-control' type='text' id={`condtion_text${i}`} onChange={() => {
                                      this.getConditionsArray()
                                    }}
                                    />

                                  </div>
                                </div>
                              )
                            })

                            }
                            <a href="javascript:;" className="add-input" onClick={() => {
                              this.addRowCondtion()
                            }}>Add Condition</a>
                            <div className="row">
                              <div className="col-md-12 col-xs-12">
                                <label>Assign the Contact</label>
                              </div>
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <select
                                  className='selectpicker form-control'
                                  id='Assigned_contact'
                                  data-live-search='true'

                                >
                                   <option value="new">Choose...</option>
                                   {this.state.sourceNameOptions.map((val) => {
                        return (
                          <option value={JSON.stringify(val)} >{val.name}</option>
                        )
                      })}
                                </select>
                              </div>
                              {/* <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <input type="text" className="form-control" name />
                              </div> */}
                            </div>
                            <div className="row">
                              <div className="col-md-12 col-xs-12">
                                <label>Automatically allocate fixed value line items</label>
                              </div>
                              <div className="form-group col-md-12 col-xs-12">
                                <div className="table-responsive col-md-12">
                                  <table className="invoice-item-table rule-table">
                                    <thead>
                                      <tr>
                                        <th>Memo</th>
                                        <th>Account</th>
                                        <th className="text-right">Tax</th>
                                        <th className="text-right">Amount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.rows.map((item, id) => {
                                        let itemid = id;
                                        return (
                                          <tr key={item}>
                                            <td >
                                              <textarea className="form-control" onChange={() => { this.getFixedValueMemo() }}
                                                placeholder="Enter Memo" id={`row_memo${id}`} defaultValue={""} />
                                            </td>
                                            <td>
                                        
                                              <select
                                                  className='selectpicker form-control'
                                                id={`row_account${id}`} data-live-search='true'
                                                title='Choose'
                                                onChange={() => { this.getFixedValueMemo() }}
                                              >
                                                 <option value="new">
                      Choose...
                      </option>
                                                {this.state.default_category_list &&
                                            this.state.default_category_list.map(
                                              item => {
                                                return (
                                                  <option
                                                    value={item.id}
                                                    data-status={item.id}
                                                  >
                                                    {item.name}
                                                  </option>
                                                )
                                              }
                                            )}
                                                {/* {this.state.bankaccountlist != undefined && this.state.bankaccountlist.map((item) => {
                                                  return (
                                                    <option value={item.id} data-status={item.name}>{item.name}</option>
                                                  )
                                                })} */}
                                              </select>
                                             
                                            </td>
                                            <td className="Tax_width text-right">
                                              {/* <input type="text" name="tax" onChange={() => { this.getFixedValueMemo() }}
                                                id={`row_tax${id}`} className="form-control text-right" placeholder={"00.00"} /> */}
                                                  <div className="custom-select-drop  dropdown cus">
                                          <a
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                            role="button"
                                            data-toggle="dropdown"
                                            className="dropdown-toggle btn useDRP"
                                            id={`taxdisable${itemid}`}
                                            href="javascript:;"
                                            value={this.state.selected}
                                            required
                                          >


                                            <span
                                              id={`selectednow${itemid}`}
                                              className="salesTaxName"
                                            >
                                              {this.state.selected != ""
                                                ? this.state.selected
                                                : "Choose"}{" "}
                                            </span>

                                            <span
                                              id={`selectednow_id${itemid}`}
                                              style={{ display: "none" }}
                                            >
                                              NO_VALUE
                                            </span>
                                            <input
                                              type="hidden"
                                              id={`selectedrate_id${itemid}`}
                                            />
                                            <input
                                              type="hidden"
                                              id={`selectedtype_id${itemid}`}
                                            />

                                            <span className="caret"></span>
                                          </a>
                                                   <ul className="dropdown-menu category" >                                           
                                            <li>
                                              <input
                                                type="text"
                                                name="search"
                                                id="gst_search"
                                                autoComplete="off"
                                                className="form-control"
                                                onInput={(event) =>
                                                  this.update_search_keyword(
                                                    event
                                                  )
                                                }
                                                required
                                              />
                                              <button
                                                type="button"
                                                className="btn btn-rounded btn-blue"
                                                data-toggle="modal"
                                                data-target="#pop-modal-1"
                                              >
                                                Add New
                                                <img
                                                  className="arrow-icon"
                                                  src="../../images/right-arrow.svg"
                                                  alt="icon"
                                                />
                                              </button>
                                            </li>
                                            <li>
                                              <ul className="list-unstyled">
                                                {this.state.gst_list.map(
                                                  (item, index) => {
                                                    return (
                                                      <li
                                                        key={index}
                                                        onClick={this.handleCheck_get_selected_tax.bind(
                                                          this,
                                                          item.id,
                                                          itemid,
                                                          "selectednow" +
                                                          itemid,
                                                          item.sales_tax_name,
                                                          item.rate,
                                                          item.rate_type
                                                        )}
                                                        data-name={
                                                          item.sales_tax_name
                                                        }
                                                        data-rate={item.rate}
                                                        data-type={
                                                          item.rate_type
                                                        }
                                                      >
                                                        <a
                                                          href="javascript:;"
                                                          value={item.name}
                                                        >
                                                          {item.sales_tax_name}
                                                        </a>
                                                      </li>
                                                    );
                                                  }
                                                )}
                                              </ul>
                                            </li>
                                          </ul>
                                          </div>
                                            </td>
                                            <td>
                                              <input type="text" name="total" onChange={() => { this.getFixedValueMemo() }}
                                                id={`row_total${id}`} className="form-control text-right" placeholder={"00.00"} />
                                              <div className="action-wrap">
                                                <a href="javascript:;" className="del-row" onClick={() => { this.Debit_Memo_delete_Rows(id) }}>
                                                  <img className="img-responsive" src="images/delete-icon.svg" alt="icon" />
                                                </a>
                                              </div>
                                            </td>
                                          </tr>


                                        )
                                      })}

                                    </tbody>
                                  </table>
                                  <div className="form-group col-md-12 mar-b-no">
                                    <a href="javascript:;" className="add-input" onClick={this.addRow}>ADD New Line</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12 col-xs-12">
                                <label>With the remainder, allocate items in following ratios</label>
                              </div>
                              <div className="form-group col-md-12 col-xs-12">
                                <div className="table-responsive col-md-12">
                                  <table className="invoice-item-table rule-table">
                                    <thead>
                                      <tr>
                                        <th>Memo</th>
                                        <th>Account</th>
                                        <th className="text-right">Tax</th>
                                        <th className="text-right">Amount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.rowsClone.map((item, id) => {
                                        return (
                                          <tr key={item}>
                                            <td style={{ width: '46%' }}>
                                              <textarea className="form-control" onChange={() => { this.cgetFixedValueMemo() }}
                                                placeholder="Enter Memo" id={`crow_memo${id}`} defaultValue={""} />
                                            </td>
                                            <td>

                                              <select
                                                className='selectpicker form-control'
                                                id={`crow_account${id}`} data-live-search='true'
                                                title='Choose'
                                                onChange={() => { this.cgetFixedValueMemo() }}
                                              >
                                                {this.state.bankaccountlist != undefined && this.state.bankaccountlist.map((item) => {
                                                  return (
                                                    <option value={item.id} data-status={item.name}>{item.name}</option>
                                                  )
                                                })}
                                              </select>
                                            </td>
                                            <td className="Tax_width text-right">
                                              {/* <input type="text" name="tax" onChange={() => { this.getFixedValueMemo() }}
                                                id={`row_tax${id}`} className="form-control text-right" placeholder={"00.00"} /> */}
                                                  <div className="custom-select-drop  dropdown cus">
                                          <a
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                            role="button"
                                            data-toggle="dropdown"
                                            className="dropdown-toggle btn useDRP"
                                            id={`crow_tax${id}`}
                                            href="javascript:;"
                                            value={this.state.selected}
                                            required
                                          >


                                            <span
                                              id={`selectedcnow${id}`}
                                              className="salesTaxName"
                                            >
                                              {this.state.selected != ""
                                                ? this.state.selected
                                                : "Choose"}{" "}
                                            </span>

                                            <span
                                              id={`selectedcnow_id${id}`}
                                              style={{ display: "none" }}
                                            >
                                              NO_VALUE
                                            </span>
                                            <input
                                              type="hidden"
                                              id={`selectedcrate_id${id}`}
                                            />
                                            <input
                                              type="hidden"
                                              id={`selectedctype_id${id}`}
                                            />

                                            <span className="caret"></span>
                                          </a>
                                                   <ul className="dropdown-menu category" >                                           
                                            <li>
                                              <input
                                                type="text"
                                                name="search"
                                                id="gst_search"
                                                autoComplete="off"
                                                className="form-control"
                                                onInput={(event) =>
                                                  this.update_search_keyword(
                                                    event
                                                  )
                                                }
                                                required
                                              />
                                              <button
                                                type="button"
                                                className="btn btn-rounded btn-blue"
                                                data-toggle="modal"
                                                data-target="#pop-modal-1"
                                              >
                                                Add New
                                                <img
                                                  className="arrow-icon"
                                                  src="../../images/right-arrow.svg"
                                                  alt="icon"
                                                />
                                              </button>
                                            </li>
                                            <li>
                                              <ul className="list-unstyled">
                                                {this.state.gst_list.map(
                                                  (item, index) => {
                                                    return (
                                                      <li
                                                        key={index}
                                                        onClick={this.handleCheck_get_selected_tax.bind(
                                                          this,
                                                          item.id,
                                                          id,
                                                          "selectednow" +
                                                          id,
                                                          item.sales_tax_name,
                                                          item.rate,
                                                          item.rate_type
                                                        )}
                                                        data-name={
                                                          item.sales_tax_name
                                                        }
                                                        data-rate={item.rate}
                                                        data-type={
                                                          item.rate_type
                                                        }
                                                      >
                                                        <a
                                                          href="javascript:;"
                                                          value={item.name}
                                                        >
                                                          {item.sales_tax_name}
                                                        </a>
                                                      </li>
                                                    );
                                                  }
                                                )}
                                              </ul>
                                            </li>
                                          </ul>
                                          </div>
                                            </td>
                                            {/* <td>
                                              <input type="text" name="tax" onChange={() => { this.cgetFixedValueMemo() }}
                                                id={`crow_tax${id}`} className="form-control text-right" placeholder={"00.00"} />
                                            </td> */}
                                            <td>
                                              <input type="text" name="total" onChange={() => { this.cgetFixedValueMemo() }}
                                                id={`crow_total${id}`} className="form-control text-right" placeholder={"00.00"} />
                                              <div className="action-wrap">
                                                <a href="javascript:;" className="del-row" onClick={() => { this.cDebit_Memo_delete_Rows(id) }}>
                                                  <img className="img-responsive" src="images/delete-icon.svg" alt="icon" />
                                                </a>
                                              </div>
                                            </td>
                                          </tr>


                                        )
                                      })}

                                    </tbody>
                                  </table>
                                  <div className="form-group col-md-12 mar-b-no">
                                    <a href="javascript:;" className="add-input" onClick={this.addRowClone}>ADD New Line</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-xs-12">
                                <label>Assign the Reference</label>
                                <div className="custom-select-drop dropdown">
                                  <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                                    <span id="selected">by me during bank rec</span><span className="caret" />
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li className="active"><a href="javascript:;">by me during bank rec</a></li>
                                    <li><a href="javascript:;">Lorem ipsum dolor</a></li>
                                    <li><a href="javascript:;">Ipsum dolor</a></li>
                                    <li><a href="javascript:;">Dolor seit amet</a></li>
                                  </ul>
                                </div>
                              </div>
                            </div> */}
                            <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-xs-12">
                                <label>Assign Bank Account</label>
                                <select
                                  className='selectpicker form-control'
                                  id='debitpayment_terms'
                                  data-live-search='true'
                                  title='Choose'
                                >
                                  {this.state.bankaccountlist != undefined && this.state.bankaccountlist.map((item) => {
                                    return (
                                      <option value={item.id}>{item.name}</option>
                                    )
                                  })}
                                </select>
                              </div>
                            </div>

                            <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-xs-12">

                              </div>
                            </div>

                            <div className="pf-btm-wrap">
                              <div className="col-md-12 col-xs-12 text-right pad-no">
                                <button className="btn btn-lightgray" style={{ marginRight: 10 }} type='button' onClick={() => {
                                  this.props.history.push('/loading', ['/create-bank-rule'])

                                }}>Cancel</button>
                                <button className="btn btn-green" type='button' onClick={() => { this.saveDebitRule() }}>Save</button>
                              </div>
                            </div>

                          </form>
                        </div>

                        {/* Debit section Ends here */}


                        <div id="credit-rule" className="tab-pane fade in">
                          <form className="custom-form invoice-form col-md-12 col-xs-12 legend-form rule-form pad-no">
                            <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <label>Rule Title<span className="astrick">*</span></label>
                                <input type="text" name="cus-name" className="form-control" />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12 col-xs-12 mar-b-no">
                                <label>When money credit on the bank statement matches of the following conditions</label>
                                <div className="set-w">
                                  <select
                                    className='selectpicker form-control'
                                    id='payment_terms'

                                    title='Choose'

                                  >                              <option>Any</option>

                                    <option>All</option>
                                  </select>

                                </div>
                              </div>
                            </div>
                            <div className="row bg-add-sec">
                              {/* <a href="javascript:;" class="outer-del">
                                  <img class="img-responsive" src="images/delete-icon.svg" alt="icon"/>
                              </a> */}
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'
                                  title='Choose'
                                >
                                  {this.state.fieldList.map((item) => {
                                    return (
                                      <option value={item.id}>{item.name}</option>
                                    )
                                  })}
                                </select>


                              </div>
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">

                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'
                                  title='Choose'
                                >
                                  {this.state.condition_list.map((item) => {
                                    return (
                                      <option value={item.id}>{item.name}</option>
                                    )
                                  })}
                                </select>
                              </div>
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
                                </select>
                              </div>
                            </div>
                            <a href="javascript:;" className="add-input">Add Condition</a>
                            <div className="row">
                              <div className="col-md-12 col-xs-12">
                                <label>Assign the Contact</label>
                              </div>
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
                                </select>
                              </div>
                              {/* <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <input type="text" className="form-control" name />
                              </div> */}
                            </div>
                            <div className="row">
                              <div className="col-md-12 col-xs-12">
                                <label>Automatically allocate fixed value line items</label>
                              </div>
                              <div className="form-group col-md-12 col-xs-12">
                                <div className="table-responsive col-md-12">
                                  <table className="invoice-item-table rule-table">
                                    <thead>
                                      <tr>
                                        <th>Description</th>
                                        <th>Account</th>
                                        <th className="text-right">Tax</th>
                                        <th className="text-right">Amount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td style={{ width: '46%' }}>
                                          <textarea className="form-control" placeholder="Enter Description" defaultValue={""} />
                                        </td>
                                        <td>
                                          <select
                                            className='selectpicker form-control'
                                            id='payment_terms'
                                            data-live-search='true'

                                          >
                                            <option selected={true}>Choose</option>
                                            <option>Bank account 1</option>
                                            <option>Bank account 2</option>
                                            <option>TargBank account 2</option>
                                          </select>

                                        </td>
                                        <td>
                                          <input type="text" name="tax" className="form-control text-right" placeholder={"00.00"} />
                                        </td>
                                        <td>
                                          <input type="text" name="total" className="form-control text-right" placeholder={"00.00"} />
                                          <div className="action-wrap">
                                            <a href="javascript:;" className="del-row">
                                              <img className="img-responsive" src="images/delete-icon.svg" alt="icon" />
                                            </a>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div className="form-group col-md-12 mar-b-no">
                                    <a href="javascript:;" className="add-input">ADD New Line</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-xs-12">
                                <label>Assign the Reference</label>
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
                                </select>

                              </div>
                            </div> */}
                            <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-xs-12">
                                <label>Assign Bank Account</label>
                                <select
                                  className='selectpicker form-control'
                                  id='creditpayment_terms'
                                  data-live-search='true'

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
                                </select>
                              </div>
                            </div>
                            <div className="pf-btm-wrap">
                              <div className="col-md-12 col-xs-12 text-right pad-no">
                                <button className="btn btn-lightgray" style={{ marginRight: 10 }} type='button' onClick={() => {
                                  this.props.history.push('/loading', ['/create-bank-rule'])

                                }}>Cancel</button>                <button className="btn btn-green" type='button' onClick={() => {
                                  this.saveCreditRule()
                                }}>Save</button>
                              </div>
                            </div>
                          </form>
                        </div>

                        {/* Credit section Ends here */}
                        <div id="transfer-rule" className="tab-pane fade in">
                          <form className="custom-form invoice-form col-md-12 col-xs-12 legend-form rule-form pad-no">
                            <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <label>Rule Title<span className="astrick">*</span></label>
                                <input type="text" name="cus-name" className="form-control" />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12 col-xs-12 mar-b-no">
                                <label>When money transferred on the bank statement matches of the following conditions</label>
                                <div className="set-w">
                                  <select
                                    className='selectpicker form-control'
                                    id='payment_terms'

                                    title='Choose'

                                  >                              <option>Any</option>

                                    <option>All</option>
                                  </select>

                                </div>
                              </div>
                            </div>
                            <div className="row bg-add-sec">
                              {/* <a href="javascript:;" class="outer-del">
                                  <img class="img-responsive" src="images/delete-icon.svg" alt="icon"/>
                              </a> */}
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'
                                  title='Choose'
                                >
                                  {this.state.fieldList.map((item) => {
                                    return (
                                      <option value={item.id}>{item.name}</option>
                                    )
                                  })}
                                </select>


                              </div>
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">

                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'
                                  title='Choose'
                                >
                                  {this.state.condition_list.map((item) => {
                                    return (
                                      <option value={item.id}>{item.name}</option>
                                    )
                                  })}
                                </select>
                              </div>
                              <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
                                </select>  </div>
                            </div>
                            <a href="javascript:;" className="add-input">Add Condition</a>
                            <div className="row mar-top">
                              <div className="form-group col-lg-4 col-md-6 col-xs-12 mar-top">
                                <label>
                                  Create Transfer
                  <span className="tag">Between the account being reconciled and</span>
                                </label>
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
                                </select></div>
                            </div>
                            {/* <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-xs-12">
                                <label>Assign the Reference</label>
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
                                </select> </div>
                            </div> */}
                            <div className="row">
                              <div className="form-group col-lg-4 col-md-6 col-xs-12">
                                <label>Assign Bank Account</label>
                                <select
                                  className='selectpicker form-control'
                                  id='payment_terms'
                                  data-live-search='true'

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
                                </select> </div>
                            </div>
                            <div className="pf-btm-wrap">
                              <div className="col-md-12 col-xs-12 text-right pad-no">
                                <button className="btn btn-lightgray" style={{ marginRight: 10 }} type='button' onClick={() => {
                                  this.props.history.push('/loading', ['/create-bank-rule'])

                                }}>Cancel</button>                <button className="btn btn-green" type='button' onClick={() => {
                                  this.saveTrasferRule()
                                }}>Save</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Main Content Ends here */}
                </div>


              </div>

              {/* Contentent goes here */}



            </div>

            <Footer logoutSubmit={e => this.logoutLink()} />
          </div>
        </div>
      )
    }
  }
}
export default CreateBankRule
