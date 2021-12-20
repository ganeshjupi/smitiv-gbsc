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

class CreateTransfer extends React.Component {
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
      DateSelected: []
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  routedChange(parameter) {
    this.props.history.push('/' + parameter)
    window.scrollTo(0, 0)
  }
  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh')
    //  window.jQuery('.input-group.date').datepicker({format: "dd/mm/yyyy"});

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

  componentDidMount() {
    window.jQuery('#useme').datepicker('refresh')
    window.jQuery('.selectpicker').selectpicker('refresh')


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

    jQuery(document)
      .on('shown.bs.dropdown', '.dropdown', function () {
        // calculate the required sizes, spaces
        var jQueryul = jQuery(this).children('.dropdown-menu')
        var jQuerybutton = jQuery(this).children('.dropdown-toggle')
        var ulOffset = jQueryul.offset()
        // how much space would be left on the top if the dropdown opened that direction
        if (ulOffset.length) {
          var spaceUp =
            ulOffset.top -
            jQuerybutton.height() -
            jQueryul.height() -
            jQuery(window).scrollTop()
          // how much space is left at the bottom
          var spaceDown =
            jQuery(window).scrollTop() +
            jQuery(window).height() -
            (ulOffset.top + jQueryul.height())
        }

        // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
        if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
          jQuery(this).addClass('dropup')
      })
      .on('hidden.bs.dropdown', '.dropdown', function () {
        // always reset after close
        jQuery(this).removeClass('dropup')
      })

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

  saveDebitRule = () => {
    let Debit_title = jQuery('#Debit_tiltle').val()
    let Assigned_contact = jQuery('#Assigned_contact').val()
    alert(Assigned_contact)
    var CoreData = [{

      "type": 1,
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

        "title": Debit_title,

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


    var CoreData = [{

      "type": 2,
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

  //saveTrasferRule
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
                    onClick={this.routedChange.bind(this, 'Vendors_list')}
                  >
                    <img src='../images/back-arrow-blue.svg' />
                  </a>
                  {/* <span className='page-title hidden-xs'>Inbox</span> */}
                  <ul className='list-unstyled breadcrumb page-title hidden-xs'>
                    <li>
                      <a
                        href='javascript: ;'
                        onClick={this.routedChange.bind(this, 'Vendors_list')}
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
                      <li ><a data-toggle="pill" onClick={() => { this.props.history.push('/create-bank-rule') }}>Debit Amount Rule</a></li>
                      <li><a data-toggle="pill" onClick={() => { this.props.history.push('/create-credit-rule') }}>Credit Amount Rule</a></li>
                      <li className="active"><a data-toggle="pill" >Transfer Amount Rule</a></li>
                    </ul>
                  </div>
                  {/* content-top Starts here */}
                  {/* Main Content Starts here */}
                  <div className="main-content col-md-12 col-xs-12">
                    <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                      <div className="tab-content">


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
                                    data-live-search='true'

                                  >
                                    <option selected={true}>Choose</option>
                                    <option>Bank account 1</option>
                                    <option>Bank account 2</option>
                                    <option>TargBank account 2</option>
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

                                >
                                  <option selected={true}>Choose</option>
                                  <option>Bank account 1</option>
                                  <option>Bank account 2</option>
                                  <option>TargBank account 2</option>
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
                                </select></div>
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
                            <div className="row">
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
                            </div>
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
export default CreateTransfer
