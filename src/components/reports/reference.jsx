



//old code
import React from 'react'
import LeftSidebar from '../left_sidebar'
import Footer from '../footer'
import FetchAllApi from '../../api_links/fetch_all_api'
import Topbar from '../topbar'

import { PDFtoIMG } from 'react-pdf-to-image'
import DatePicker from 'react-date-picker'


import jQuery from 'jquery'


class profit_loss_report extends React.Component {
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
      re_assigned: []
    }
  }
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  UNSAFE_componentWillMount() {
    // TODO: Move this
    var user_id = parseFloat(this.state.logged_user_id)
    var endDate = new Date()
    var startDate = new Date()
    startDate.setDate(endDate.getDate() - 5)
    console.log(
      'DATW' +
      startDate.toISOString().substring(0, 10) +
      '......' +
      endDate.toLocaleDateString()
    )
    var startISO = startDate.toISOString().substring(0, 10)
    var endISO = endDate.toISOString().substring(0, 10)
    this.fetch_report(startISO, endISO, '2')
    jQuery(document.body).removeClass('minimize_leftbar')
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery('title').html('Profit and loss Report | GBSC')

    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === 'null' ||
      this.state.logged_user_id === 'undefined'
    ) {
      this.props.history.push('/')
    }

    this.get_inbox_list()
  }

  componentDidMount() {

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
    // jQuery('.custom-select-drop .dropdown-menu a').click(function(){
    //     jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass("active");
    //     jQuery(this).parent("li").addClass("active");
    //     jQuery('.open #selected').text(jQuery(this).text());
    // });
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push('/data_tagging/' + list_id + '/' + file_id)
    window.scrollTo(0, 0)
  }
  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  handleChange(event) {
    var endDate = this.state.endDate
    var showCol = this.state.show_column ? this.state.show_column : '1'
    this.setState({
      [event.target.name]: event.target.value
    })
    var startDate = event.target.value
    if (endDate && startDate) {
      this.fetch_report(startDate, endDate, showCol)
    }
  }
  setShowColumn(event) {
    var showCol = ''
    if (event.target.name === 'week') {
      this.setState({
        show_column: '3'
      })
      showCol = '3'
    } else if (event.target.name === 'month') {
      this.setState({
        show_column: '7'
      })
      showCol = '7'
    } else {
      this.setState({
        show_column: '1'
      })
      showCol = '1'
    }
    var start = this.state.startDate
    var end = this.state.endDate
    if (showCol && start && end) {
      this.fetch_report(start, end, showCol)
    }
  }

  fetch_report = (startDate, endDate, showCol) => {
    // MAKE THE API CALL
    console.log('DARE !!=>', startDate)
    console.log('DARE !!=>', endDate)
    var showColumns = showCol ? showCol : '1'
    var user_id = parseFloat(this.state.logged_user_id)
    FetchAllApi.reports_list(
      user_id,
      startDate,
      endDate,
      showColumns,
      (err, response) => {
        console.log('LIST RETURNED=>', response)
        if (response.status == 1) {
          var arrayOfElements = []
          var numberOfColumns = []
          var dateList = []
          var subcategory
          for (let category in response.details) {
            if (response.details.hasOwnProperty(category)) {
              numberOfColumns = response.details[category].date_array.length
              dateList = response.details[category].date_array
              arrayOfElements.push(response.details[category])
            }
          }
          // for(let subCategory in arrayOfElements){
          //
          // }
          console.log(
            JSON.stringify(arrayOfElements) + '    ' + arrayOfElements
          )
          // let listOfDates= Object.key(response.details)[0];
          // console.log("FIRST OBJECT =>", listOfDates);
          this.setState({
            total_revenue: response.total_revenue,
            cost_of_goods_sold: response.cost_of_goods_sold,
            gross_profit: response.gross_profit,
            net_income: response.net_income,
            reportObject: arrayOfElements,
            numberOfColumns: numberOfColumns,
            dateList: dateList
          })
        }
      }
    )
  }
  handleChangeEndDate(event) {
    console.log('Thus is called 222')
    // TODO: Deepa add the validation ( before and after)
    this.setState({
      [event.target.name]: event.target.value
    })
    var startDate = this.state.startDate
    var endDate = event.target.value
    this.fetch_report(startDate, endDate, '2')
  }

  get_inbox_list = () => {
    var page_no = 1
    var items_limit = 10
    var filter_status = ''
    var client_id = ''

    FetchAllApi.inboxList(
      page_no,
      items_limit,
      filter_status,
      client_id,
      (err, response) => {
        console.log('Article Data', response.message)
        if (response.status === 1) {
          this.setState({
            inbox_list: response.list,
            response_msg: response.message,
            response_stus: response.status
          })
          jQuery('.item-listwrap').css('display', 'block')
          jQuery('.inbox-right').css('display', 'flex')
          jQuery('.no_rec').css('display', 'none')
        } else {
          jQuery('.item-listwrap, .inbox-right').css('display', 'none')
          jQuery('.no_rec').css('display', 'block')
        }
      }
    )
  }

  getItemDetails(list_id) {
    var status = 0
    var client_id = 0

    this.setState({
      list_id: list_id
    })

    FetchAllApi.getItemDetails(list_id, status, client_id, (err, response) => {
      //console.log('Category Subcat Data', response);
      jQuery('.inbox-item').removeClass('active')
      if (response.status === 1) {
        jQuery('#list-' + list_id).addClass('active')
        jQuery('#inboxRgt').removeClass('inboxRgtDisp')
        jQuery('#inboxLft').removeClass('fluid')

        this.setState({
          item_details: response.details,
          item_file_path: response.details.file_path,
          item_file_id: response.details.attachments
        })

        if (response.details.previous_record !== '') {
          jQuery('#prev').removeClass('in-active')
        } else {
          jQuery('#prev').addClass('in-active')
        }
        if (response.details.next_record !== '') {
          jQuery('#next').removeClass('in-active')
        } else {
          jQuery('#next').addClass('in-active')
        }
      } else {
        jQuery('#inboxRgt').addClass('inboxRgtDisp')
      }
    })
  }

  filterInboxItem(page_no, items_limit, filter_stat, client_id) {
    var selected_sorting = [...this.state.waiting_re, ...this.state.re_assigned]
    if (selected_sorting != '') {
      var filter_status = selected_sorting
      //console.log('hhhhkjslljdhh',filter_status)
      FetchAllApi.inboxList(
        page_no,
        items_limit,
        filter_status,
        (client_id = this.state.logged_client_id),
        (err, response) => {
          console.log('response', response.status)
          if (response.status === 1) {
            this.setState({
              inbox_list: response.list,
              response_msg: response.message,
              response_stus: response.status
            })
            jQuery('.item-listwrap').css('display', 'block')
            jQuery('.inbox-right').css('display', 'flex')
            jQuery('.no_rec').css('display', 'none')
          } else {
            jQuery('.item-listwrap, .inbox-right').css('display', 'none')
            jQuery('.no_rec').css('display', 'block')
          }
        }
      )
    } else {
      this.get_inbox_list()
    }
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items

    //console.log('response_stus',this.state.response_stus);

    // if(this.state.response_stus === 0){
    //     no_items = "<span className='no_rec'>No items found!</span>"
    // } else{
    //     no_items = ''
    // }

    if (
      this.state.item_details.user_image !== '' &&
      this.state.item_details.user_image !== 'null'
    ) {
      var item_user_image = this.state.item_details.user_image
    } else {
      var item_user_image = 'images/user-img-1.png'
    }

    //console.log('item_files', this.state.item_file_path);
    if (
      this.state.item_file_path !== '' &&
      this.state.item_file_path !== 'null'
    ) {
      item_file_path = []
      var split_file_path = this.state.item_file_path.toString().split(',')
      var split_file_id = this.state.item_file_id.toString().split(',')
      if (split_file_path.length >= 1) {
        for (var i = 0; i < split_file_path.length; i++) {
          var get_file_url = split_file_path[i]
          var split_file_name = split_file_path[i].toString().split('/')
          var arr_reverse = split_file_name.reverse()

          var get_file_name = arr_reverse[0].substring(
            arr_reverse[0].length - 15,
            arr_reverse[0].length
          )

          var get_file_ext = arr_reverse[0].substring(
            arr_reverse[0].lastIndexOf('.') + 1,
            arr_reverse[0].length
          )
          if (get_file_ext === 'pdf') {
            var file_icon = 'images/pdf-icon.png'
          } else {
            var file_icon = 'images/img-icon.png'
          }

          //console.log('pdf_file_link',get_file_url);

          if (get_file_ext === 'pdf') {
            item_file_path.push(
              <div className='attach-item'>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  className='img-wrap'
                  data-id={split_file_id[i]}
                >
                  <iframe
                    src={get_file_url}
                    id='pdf_thumb_viewer'
                    frameborder='0'
                    scrolling='no'
                    width='190'
                    height='190'
                  ></iframe>
                  <span className='go'>
                    <img
                      src='../images/next-arrow-white.svg'
                      className='mCS_img_loaded'
                    />
                  </span>
                </a>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  data-toggle='tooltip'
                  data-placement='top'
                  title={get_file_url}
                  data-id={split_file_id[i]}
                >
                  <span>{get_file_name}</span>
                  <img
                    src='../images/download-icon.svg'
                    alt='Icon'
                    className='mCS_img_loaded'
                  />
                </a>
              </div>
            )
          } else {
            item_file_path.push(
              <div className='attach-item'>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  className='img-wrap'
                  data-id={split_file_id[i]}
                >
                  <img
                    className='img-responsive mCS_img_loaded'
                    src={get_file_url}
                    alt={get_file_ext}
                  />
                  <span className='go'>
                    <img
                      src='../images/next-arrow-white.svg'
                      className='mCS_img_loaded'
                    />
                  </span>
                </a>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  data-toggle='tooltip'
                  data-placement='top'
                  title={get_file_url}
                  data-id={split_file_id[i]}
                >
                  <span>{get_file_name}</span>
                  <a href={get_file_url} download={get_file_name}>
                    {get_file_name}
                    <img
                      src='../images/download-icon.svg'
                      alt='Icon'
                      className='mCS_img_loaded'
                    />
                  </a>
                </a>
              </div>
            )
          }
        }
      }
    }

    options.push(<option>ORG-250</option>)

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
                <span className='page-title hidden-xs'>Profit &amp; Loss</span>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='content-top col-md-12 col-xs-12'>
                <h4 className='fw-sbold mar-t-no'>Profit &amp; Loss</h4>
                <h5 className='fw-sbold'>Jan 2020</h5>
                <div className='row snippet-row'>
                  <div className='col-md-3 col-sm-6'>
                    <div className='snippet active'>
                      <div>
                        <small>Total Revenue</small>
                        <span className='value'>
                          $ {this.state.total_revenue}
                        </span>
                        <img
                          className='snippet-arrow visible-lg'
                          src='../images/snippet-arrow.svg'
                          alt='icon'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='snippet'>
                      <div>
                        <small>Cost of Goods Sold</small>
                        <span className='value'>
                          $ {this.state.cost_of_goods_sold}
                        </span>
                        <img
                          className='snippet-arrow visible-lg'
                          src='../images/snippet-arrow.svg'
                          alt='icon'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='snippet'>
                      <div>
                        <small>Gross Profit</small>
                        <span className='value'>
                          $ {this.state.gross_profit}
                        </span>
                        <img
                          className='snippet-arrow visible-lg'
                          src='../images/snippet-arrow.svg'
                          alt='icon'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='snippet'>
                      <div>
                        <small>Net Income</small>
                        <span className='value'>$ {this.state.net_income}</span>
                        <img
                          className='snippet-arrow visible-lg'
                          src='../images/snippet-arrow.svg'
                          alt='icon'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='main-content col-md-12 col-xs-12'>
                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no"></div>
                <form className='custom-form form-inline'>
                  <div className='form-group mar-rgt'>
                    <label>Date Range</label>
                    <div className='custom-select-drop dropdown'>
                      <a
                        aria-expanded='false'
                        aria-haspopup='true'
                        role='button'
                        data-toggle='dropdown'
                        className='dropdown-toggle btn form-control'
                        href='javascript:;'
                      >
                        <span id='selected'>This Month-to-date</span>
                        <span className='caret'></span>
                      </a>
                      <ul className='dropdown-menu'>
                        <li className='active'>
                          <a
                            href='javascript:;'
                            name='month_to_date'
                            value='1'
                            onClick={event => this.setShowColumn(event)}
                          >
                            This Month-to-date
                          </a>
                        </li>
                        <li>
                          <a
                            href='javascript:;'
                            name='week'
                            onClick={event => this.setShowColumn(event)}
                          >
                            This Week
                          </a>
                        </li>
                        <li>
                          <a
                            href='javascript:;'
                            name='month'
                            onClick={event => this.setShowColumn(event)}
                          >
                            This Month
                          </a>
                        </li>
                        <li>
                          <a
                            href='javascript:;'
                            name='week_to_date'
                            onClick={event => this.setShowColumn(event)}
                          >
                            This Week-to-date
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='form-group mar-rgt'>
                    <label>From</label>
                    <div
                      className='input-group date mar-t-no'
                      data-date-format='dd/mm/yyyy'
                    >
                      {
                        <input
                          type='date'
                          name='startDate'
                          id='startDate'
                          onChange={event => this.handleChange(event)}
                          className='form-control'
                          required
                        />
                      }
                      <div className='input-group-addon'>
                        <img src='../images/calendar-icon.svg' alt='icon'></img>
                      </div>
                    </div>
                  </div>
                  <div className='form-group mar-rgt'>
                    <label>To</label>
                    <div
                      className='input-group date mar-t-no'
                      data-date-format='dd/mm/yyyy'
                    >
                      {
                        <input
                          type='date'
                          name='endDate'
                          id='endDate'
                          onChange={event => this.handleChangeEndDate(event)}
                          className='form-control'
                          required
                        />
                      }
                      <div className='input-group-addon'>
                        <img src='../images/calendar-icon.svg' alt='icon'></img>
                      </div>
                    </div>
                  </div>
                  <a className='text-link filter-btn' href='javascript:;'>
                    Advanced
                  </a>
                  <div className='pull-right'>
                    <div className='dropdown menu-item'>
                      <button
                        className='btn btn-green dropdown-toggle btn-arrow'
                        data-toggle='dropdown'
                        aria-expanded='false'
                      >
                        Export<span className='caret'></span>
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
                </form>
                <div className='report-table col-md-12 col-xs-12 pad-no'>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>&nbsp;</th>

                          {this.state.dateList.map((date, index) => {
                            return (
                              <th className="text-right">

                                {date}
                                <i className="th-sort"><img src="../images/sort-icon.svg"
                                  alt="SortIcon" /></i>
                              </th>
                            )
                          })}

                        </tr>
                      </thead>
                      <tbody>
                        {this.state.reportObject.map((parentCategory, index) => {
                          return (<><tr className="title-1">
                            <td>
                              {parentCategory.account_type}
                            </td>
                            {this.state.dateList.map((eachDate) => {
                              return (
                                <td>&nbsp;</td>
                              )
                            })}
                          </tr>

                            {parentCategory && parentCategory.sub_categories && parentCategory.sub_categories.map((eachCategory) => {
                              let subValue = {};
                              for (let subCategory in eachCategory) {
                                if (eachCategory.hasOwnProperty(subCategory)) {
                                  subValue = eachCategory[subCategory];
                                  return (
                                    <>
                                      <tr className="item-step1">
                                        {subValue && subValue.category_name && subValue.category_name.length > 0 &&
                                          <td><span>{subValue.category_name}</span></td>
                                        }

                                        {subValue.amount_array && subValue.amount_array.map((value, indexValue) => {
                                          return (<td><span className="text-right"><a href="javascript:;">{value.toFixed(2)}</a></span></td>)
                                        })}
                                      </tr>
                                    </>
                                  )
                                }
                              }

                            })
                            }
                            <tr className="item-step1 title1 bdr-no">
                              <td><span>Total {parentCategory.account_type}</span></td>
                              {parentCategory.amount_array && parentCategory.amount_array.map((total) => {
                                return (<td><span className="text-right"> {total.toFixed(2)}
                                </span></td>)
                              })}

                            </tr>
                          </>


                          )
                        })}

                      </tbody>
                    </table>
                  </div>


                </div>














                {/* <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>&nbsp;</th>

                                            {this.state.dateList.map((date, index) => {
                                                return (
                                                    <th className="text-right">

                                                        {date}
                                                        <i className="th-sort"><img src="../images/sort-icon.svg"
                                                                                    alt="SortIcon"/></i>
                                                    </th>
                                                )
                                            })}

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.reportObject.map((parentCategory, index)=>{
                                            return( <><tr className="title-1">

                                                    {parentCategory.account_type}
                                                    {this.state.dateList.map((eachDate)=>{
                                                        return(
                                                            <td>&nbsp;</td>
                                                        )
                                                    })}
                                                </tr>

                                                    {parentCategory && parentCategory.sub_categories && parentCategory.sub_categories.map((eachCategory)=>{
                                                        let subValue = {};
                                                        for(let subCategory in eachCategory){
                                                            if( eachCategory.hasOwnProperty(subCategory) ) {
                                                                subValue  = eachCategory[subCategory];
                                                                return(
                                                                    <>
                                                                        <tr className="item-step1">
                                                                            {subValue && subValue.category_name && subValue.category_name.length > 0 &&
                                                                            <td><span>{subValue.category_name}</span></td>
                                                                            }

                                                                            {subValue.amount_array && subValue.amount_array.map((value, indexValue)=>{
                                                                                return( <td><span className="text-right"><a href="javascript:;">{value}</a></span></td>)
                                                                            })}
                                                                        </tr>
                                                                    </>
                                                                )
                                                            }
                                                        }

                                                    })
                                                    }
                                                    <tr className="item-step1 title1 bdr-no">
                                                        <td><span>Total {parentCategory.account_type}</span></td>
                                                        {parentCategory.amount_array && parentCategory.amount_array.map((total)=>{
                                                            return( <td><span className="text-right"> {total}
                                                        </span></td>)
                                                        })}

                                                    </tr>
                                                </>


                                            )
                                        })}

                                        </tbody>
                                    </table>
                                </div>
                          */}


















              </div>
            </div>
          </div>
        </div>

        <Footer logoutSubmit={e => this.logoutLink()} />
      </div>
    )
  }
}
export default profit_loss_report
//ar aging
import React from 'react'
import LeftSidebar from '../left_sidebar'
import Footer from '../footer'
import FetchAllApi from '../../api_links/fetch_all_api'
import Topbar from '../topbar'

import moment from 'moment'
import { PDFtoIMG } from 'react-pdf-to-image'
import DatePicker from 'react-date-picker'


import jQuery from 'jquery'
// import 'bootstrap';
// import 'bootstrap-select';

class ar_aging_summary extends React.Component {
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
      changetotal2: 0,
      changetotal3: 0,
      total_amnt_array: [],
      interval: 20,
      duedays: 85
    }
  }
  componentDidMount() {
    this.show_columnslist()
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
  selected_item = e => {
    var index = e.target.selectedIndex
    var optionElement = e.target.childNodes[index]
    let show_columns = optionElement.getAttribute('data-id')
    this.setState({ show_columns: show_columns }, () => {
      this.callAPIDATA()
    })
  }

  slected_itemid = id => {
    //alert(id)
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
  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
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
    console.log('ewewew', array)
    this.setState({ end_date: date_formated }, () => {
      this.callAPIDATA()
    })
  }
    // this.state.end_date = moment(date).format('YYYY-MM-DD')
    //  alert(moment(todate).format('YYYY-MM-DD'))
  }
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  callAPIDATA() {
    let { start_date, end_date } = this.state
    var interval = this.state.interval
    var duedays = this.state.duedays

    if (interval === '') {
      interval = 20
    }
    if (duedays === '') {
      duedays = 85
    }

    FetchAllApi.ar_aging_summary(
      start_date,
      end_date,
      1,
      parseInt(interval),
      parseInt(duedays),

      (err, response) => {
        console.log('BalanceSheet Data', response.details)
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
            total_amnt_array: response.total_amount
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
            total_amnt_array: []
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





                <span className='page-title hidden-xs'>A/R Aging Summary</span>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='col-md-12 col-xs-12 mar-top visible-xs'>

                <span className='page-title'>A/R Aging Summary</span>
              </div>
              {/* content-top Starts here */}
              <div className='content-top col-md-12 col-xs-12'>
                <h4 className='fw-sbold mar-t-no'>A/R Aging Summary</h4>
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
                            <a href='javascript:;'>Export as PDF</a>
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
                        <div className='col-lg-8 col-md-12 pad-r-no'>

                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <div className='report-setting'>
                    <form className='custom-form form-inline'>
                    
                      <div className='form-group mar-rgt'>
                        <label>Interval(days)</label>
                        <div
                        >
                          <input
                            type='text'
                            id='fromdate'
                            className='form-control'
                            autoComplete='off'
                          />
              
                        </div>
                      </div>
                      <div className='form-group mar-rgt'>
                        <label>Through(days past due)</label>
                        <div
                        >
                          <input
                            type='text'
                            id='todate'
                            onBlur={e => this.changetoDate(e.target.value)}
                            className='form-control'
                            autoComplete='off'
                          />

                        </div>
                      </div>

                    </form>

       
   
                  </div>
             */}
                  <div className='report-table'>
                    <div className='table-responsive'>
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
                              var totalParent = parentCategory.total_amount
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
                                            console.log(
                                              'jhsdgjkghjsdg',
                                              eachCategory
                                            )
                                            return (
                                              <>
                                                <tr className='title-1'>
                                                  <td>
                                                    {
                                                      parentCategory.customer_name
                                                    }
                                                  </td>

                                                  {/* 
                                                  {eachCategory.amount_array &&
                                                    eachCategory.amount_array.map(
                                                      (value, indexValue) => {
                                                        return (<td></td>)} */}

                                                  {eachCategory.amount_array && eachCategory.amount_array.map((e, f) => {
                                                    return (<td></td>
                                                    )
                                                  })}
                                                  <td></td>

                                                </tr>
                                                <tr className='item-step1'>
                                                  {subValue && (
                                                    <td>
                                                      <span>
                                                        {parentCategory.customer_name}
                                                      </span>
                                                    </td>
                                                  )}
                                                  {eachCategory.amount_array &&
                                                    eachCategory.amount_array.map(
                                                      (value, indexValue) => {
                                                        return (
                                                          <React.Fragment>
                                                            <td>
                                                              <span className='text-right'>
                                                                <a href='javascript:;'>
                                                                  {value.toFixed(
                                                                    2
                                                                  )}
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
                                                  <td>
                                                    <span className='text-right'>
                                                      <a href='javascript:;'>
                                                        {totalParent.toFixed(2)}
                                                      </a>
                                                    </span>
                                                  </td>
                                                </tr>
                                              </>
                                            )
                                          }
                                        }
                                      }
                                    )}



                                  {/* //current working */}

                                  {parentCategory.sub_categories.map((a, b) => {
                                    let second_subcategeory = a.sub_categories

                                    return (
                                      <React.Fragment>
                                        <tr className='item-step1'>
                                          <td>
                                            <span>{a.job_name}</span>
                                          </td>
                                          {a.amount_array &&
                                            a.amount_array.map(
                                              (total, indexValue) => {
                                                return (
                                                  <React.Fragment>
                                                    <td>
                                                      <span className='text-right'>
                                                        {' '}
                                                        {total.toFixed(2)}
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
                                          <td>
                                            <span className='text-right'>
                                              {' '}
                                              {(a.total_amount)}
                                            </span>
                                          </td>
                                        </tr>





                                        {second_subcategeory && second_subcategeory.map((c, d) => {
                                          return (
                                            <tr className='item-step1'>
                                              <td>
                                                <span>{c.job_name}</span>
                                              </td>
                                              {c.amount_array &&
                                                c.amount_array.map(
                                                  (total, indexValue) => {
                                                    return (
                                                      <React.Fragment>
                                                        <td>
                                                          <span className='text-right'>
                                                            {' '}
                                                            {total.toFixed(2)}
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
                                              <td>
                                                <span className='text-right'>
                                                  {' '}
                                                  {c.total_amount.toFixed(2)}
                                                </span>
                                              </td>
                                            </tr>
                                          )
                                        })
                                        }














                                      </React.Fragment>


                                    )
                                  })}










                                  {/* <tr className='item-step1'>
                                    <td>
                                    <span>{}</span>
                                    </td>
                                    {parentCategory.amount_array &&
                                      parentCategory.amount_array.map(
                                        (total, indexValue) => {
                                          return (
                                            <React.Fragment>
                                              <td>
                                                <span className='text-right'>
                                                  {' '}
                                                  {totalParent.toFixed(2)}
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
                                  </tr>
                                */}




                                </>
                              )
                            }
                          )}

                          <tr className='item-step1 title1 bdr-no'>
                            <td>
                              <span>Total</span>
                            </td>

                            {this.state.total_amnt_array &&
                              this.state.total_amnt_array.map(eachDate => {
                                return (
                                  <td>
                                    <span className='text-right'>
                                      {eachDate.toFixed(2)}
                                    </span>
                                  </td>
                                )
                              })}
                          </tr>
                        </tbody>
                      </table>
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
export default ar_aging_summary
// open invoice
import React from 'react'
import LeftSidebar from '../left_sidebar'
import Footer from '../footer'
import FetchAllApi from '../../api_links/fetch_all_api'
import Topbar from '../topbar'

import moment from 'moment'
import { PDFtoIMG } from 'react-pdf-to-image'
import DatePicker from 'react-date-picker'


import jQuery from 'jquery'
import { object } from 'prop-types'
// import 'bootstrap';
// import 'bootstrap-select';
class open_invoice extends React.Component {
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
      response: []
    }
  }
  componentDidMount() {
    this.get_col()



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
  get_col = () => {
    let report_id = 7
    FetchAllApi.get_col(this.state.logged_client_id,report_id, (err, response) => {

      if (response.status === 1) {
        var active = []
        let active_headings = response.response.map((item) => { if (item.status === 1) { active.push(item.heading_name) } })
        let coulmns_head = response.response

        if (coulmns_head) {
          var options = coulmns_head.map((item, i) => {
            return (
              <option>{item.heading_name}</option>
            )
          })

        }

        this.setState({ selected_vals: active, coulmns_head: coulmns_head, options: options })
        console.log("object_active_headings", active)

      } else {
        this.setState({
          gst_list: []
        })
      }
    })
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
    } else if (seleteddateformat === "This Year") {
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = dateresult.endOf('year')
      document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.callAPIDATA()
    } else if (seleteddateformat === "This Year-to-date") {
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = moment(new Date()).format("YYYY-MM-DD")
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

  // show_columnslist = () => {
  //   let report_name = 'balance_sheet'
  //   FetchAllApi.get_coulmnlist(report_name, (err, response) => {
  //     if (response.status === 1) {
  //       this.setState({
  //         show_coulmns_filter: response.details
  //       })
  //     } else {
  //       this.setState({
  //         gst_list: []
  //       })
  //     }
  //   })
  // }

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
    let { start_date, end_date, show_columns, sub_columns } = this.state
    console.log('start date', start_date)
    console.log('End date', end_date)

    FetchAllApi.open_invoices(
      start_date,
      end_date,
      show_columns,
      1,
      sub_columns,

      (err, response) => {
        console.log('BalanceSheet Data', Object.values(response.details))
        if (response.status === 1) {
          this.setState({
            response: Object.values(response.details),
            customername: response
          })
          // console.log
        } else {
          this.setState({ response: [], customername: [] })
        }
      }
    )
  }
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }
  convertToarray(str) {
    console.log("subcat string", str)
    console.log('Sub Cat', Object.values(str))
    return Object.values(str)
  }
  show_coulmn_filter = e => {
    var names = jQuery('#myselect').val()
    var nameArr = Object.values(names)
    this.setState({ selected_vals: nameArr }, () => {
      if (this.state.selected_vals.length > 0) {
        if (this.state.selected_vals.includes('Trans#')) {
          jQuery('.trans').show()
        } else {
          jQuery('.trans').hide()
        }

        if (this.state.selected_vals.includes('Last Modified')) {
          jQuery('.lastmodified').show()
        } else {
          jQuery('.lastmodified').hide()
        }
        if (this.state.selected_vals.includes('Last Modified By')) {
          jQuery('.lastmodifiedby').show()
        } else {
          jQuery('.lastmodifiedby').hide()
        }
        if (this.state.selected_vals.includes('Num')) {
          jQuery('.num').show()
        } else {
          jQuery('.num').hide()
        }

        if (this.state.selected_vals.includes('Memo')) {
          jQuery('.memo').show()
        } else {
          jQuery('.memo').hide()
        }
        if (this.state.selected_vals.includes('Account')) {
          jQuery('.account').show()
        } else {
          jQuery('.account').hide()
        }
        if (this.state.selected_vals.includes('Open Balance')) {
          jQuery('.openbalance').show()
        } else {
          jQuery('.openbalance').hide()
        }

        if (this.state.selected_vals.includes('Debit')) {
          jQuery('.debit').show()
        } else {
          jQuery('.debit').hide()
        }
        if (this.state.selected_vals.includes('Credit')) {
          jQuery('.credit').show()
        } else {
          jQuery('.credit').hide()
        }
        if (this.state.selected_vals.includes('Balance')) {
          jQuery('.balance').show()
        } else {
          jQuery('.balance').hide()
        }

        if (this.state.selected_vals.includes('Currency')) {
          jQuery('.currency').show()
        } else {
          jQuery('.currency').hide()
        }
        if (this.state.selected_vals.includes('Exchange Rate')) {
          jQuery('.exchangerate').show()
        } else {
          jQuery('.exchangerate').hide()
        }

        if (this.state.selected_vals.includes('Foreign currency')) {
          jQuery('.Foreigncurrency').show()
        } else {
          jQuery('.Foreigncurrency').hide()
        }
        if (this.state.selected_vals.includes('Exchange rate')) {
          jQuery('.Exchangerate').show()
        } else {
          jQuery('.Exchangerate').hide()
        }
        if (this.state.selected_vals.includes('Due date')) {
          jQuery('.Duedate').show()
        } else {
          jQuery('.Duedate').hide()
        }
        if (this.state.selected_vals.includes('Terms && conditions')) {
          jQuery('.Termsconditions').show()
        } else {
          jQuery('.Termsconditions').hide()
        }
        if (this.state.selected_vals.includes('Invoice number')) {
          jQuery('.Invoicenumber').show()
        } else {
          jQuery('.Invoicenumber').hide()
        }
        if (this.state.selected_vals.includes('Shipping address')) {
          jQuery('.Shippingaddress').show()
        } else {
          jQuery('.Shippingaddress').hide()
        }

        if (this.state.selected_vals.includes('Item total foreign currency')) {
          jQuery('.Itemtotalforeigncurrency').show()
        } else {
          jQuery('.Itemtotalforeigncurrency').hide()
        }
        if (this.state.selected_vals.includes('Tax amount foreign currency')) {
          jQuery('.Taxamountforeigncurrency').show()
        } else {
          jQuery('.Taxamountforeigncurrency').hide()
        }
        if (this.state.selected_vals.includes('Grand foreign currency')) {
          jQuery('.Grandforeigncurrency').show()
        } else {
          jQuery('.Grandforeigncurrency').hide()
        }

        if (this.state.selected_vals.includes('Job name')) {
          jQuery('.jobname').show()
        } else {
          jQuery('.jobname').hide()
        }
        if (this.state.selected_vals.includes('Tax amount foreign currency')) {
          jQuery('.customer_address').show()
        } else {
          jQuery('.customer_address').hide()
        }
        if (this.state.selected_vals.includes('Customer phone')) {
          jQuery('.customer_phone').show()
        } else {
          jQuery('.customer_phone').hide()
        }
      } else {
        jQuery('.trans').show()
        jQuery('.lastmodified').show()
        jQuery('.lastmodifiedby').show()
        jQuery('.num').show()
        jQuery('.memo').show()
        jQuery('.account').show()
        jQuery('.openbalance').show()
        jQuery('.debit').show()
        jQuery('.credit').show()
        jQuery('.balance').show()
        jQuery('.currency').show()
        jQuery('.exchangerate').show()
        jQuery('.Foreigncurrency').show()
        jQuery('.Exchangerate').show()
        jQuery('.Duedate').show()
        jQuery('.Termsconditions').show()
        jQuery('.Termsconditions').show()
        jQuery('.Invoicenumber').show()
        jQuery('.Shippingaddress').show()
        jQuery('.Itemtotalforeigncurrency').show()
        jQuery('.Taxamountforeigncurrency').show()
        jQuery('.Grandforeigncurrency').show()
        jQuery('.jobname').show()
        jQuery('.customer_address').show()
        jQuery('.customer_phone').show()
      }
    })
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
                <h5 className='fw-sbold'>{moment(new Date()).format("MMM YYYY")}</h5>
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
                            <a href='javascript:;'>Export as PDF</a>
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
                                  <label className='fw-sbold'>
                                    Show Columns
                                  </label>
                                </div>
                                <div className='col-lg-7 col-md-9'>
                                  <div className='custom-select-drop dropdown'>
                                    <select
                                      className='selectpicker'
                                      id='myselect'
                                      multiple
                                      data-live-search='true'
                                      onChange={e => this.show_coulmn_filter(e)}
                                    >
                                      {this.state.coulmns_head.map((item, index) => {
                                        return (
                                          <option key={index} data-id={item.id}>
                                            {item.heading_name}
                                          </option>
                                        )
                                      })}
                                    </select>
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
                      </form>
                    </div>
                  </div>
                  <div className='report-table'>
                    <div className='table-responsive'>
                      <table className='table'>
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
                                  {subcategoryvalues && subcategoryvalues.map((entry1, key1) => {
                                    console.log(entry1)
                                    let invoices = this.convertToarray(
                                      entry1.sub_categories[0]
                                    )

                                    let invoiceTotals = 0

                                    return (
                                      <React.Fragment>
                                        {entry1.invoices && entry1.invoices.map(
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
                                                    <span>

                                                    </span>
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
                                                    <span>{overallinvoice.typej_name != '' ? overallinvoice.type_jname : ''}Key is not avail</span>
                                                  </td>
                                                  <td className=''>
                                                    <span>{overallinvoice.type_nlame != '' ? overallinvoice.type_njame : ''}Key is not avail</span>
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
                                                    <span>{overallinvoice.Province}</span>
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
                                                    <span>{overallinvoice.vendor_name}</span>
                                                  </td>
                                                  <td className=''>
                                                    <span>{overallinvoice.fax}</span>
                                                  </td>
                                                  <td className=''>
                                                    <span>{overallinvoice.type_name}</span>
                                                  </td>
                                                </tr>
                                              </React.Fragment>
                                            )


                                          })}
                                        {invoices && invoices.map(
                                          (invoicesubcat, invoiceskeys) => {
                                            let invoicevals =
                                              invoicesubcat.invoices
                                            return (
                                              <React.Fragment>
                                                {invoicevals && invoicevals.map(
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
                                                            <span>

                                                            </span>
                                                          </td>

                                                          <td className=''>
                                                            <span>{overallinvoice.invoice_id}</span>
                                                          </td>
                                                          <td className=''>
                                                            <span>{overallinvoice.lastmodified}</span>
                                                          </td>
                                                          <td className=''>
                                                            <span>{overallinvoice.lastmodifiedby}</span>
                                                          </td>
                                                          <td className=''>
                                                            <span>{overallinvoice.invoice_number}</span>
                                                          </td>
                                                          <td className=''>
                                                            <span>{overallinvoice.memo}</span>
                                                          </td>
                                                          <td className=''>
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
                                                            <span>{overallinvoice.typej_name != '' ? overallinvoice.type_jname : ''}Key is not avail</span>
                                                          </td>
                                                          <td className=''>
                                                            <span>{overallinvoice.type_nlame != '' ? overallinvoice.type_njame : ''}Key is not avail</span>
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
                                                            <span>{overallinvoice.Province}</span>
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
                                                            <span>{overallinvoice.vendor_name}</span>
                                                          </td>
                                                          <td className=''>
                                                            <span>{overallinvoice.fax}</span>
                                                          </td>
                                                          <td className=''>
                                                            <span>{overallinvoice.type_name}</span>
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
                                            <div>Total {entry1.job_name}</div>
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
                                              {entry1.total_amount.toFixed(2)}
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



//profit loss

import React from 'react'
import LeftSidebar from '../left_sidebar'
import Footer from '../footer'
import FetchAllApi from '../../api_links/fetch_all_api'
import Topbar from '../topbar'
import jQuery from 'jquery'
import moment from 'moment'
import Loader from 'react-loader-spinner'

class profit_loss_report extends React.Component {
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
      total_revenue: '',
      cost_of_goods_sold: '',
      gross_profit: '',
      net_income: '',
      reportObject: [],
      numberOfColumns: [],
      show_column_option_list: [],
      dateList: [],
      endDate: '',
      startDate: '',
      dropdown: '',
      show_column: 3,
      inbox_list: [],
      response_stus: 0,
      response_msg: 'No data found',
      item_details: '',
      item_file_path: '',
      waiting_re: [],
      re_assigned: [],
      selected: '',
      start_date: '2020-01-01',
      end_date: '2020-01-31',
      loading: true
    }
  }

  UNSAFE_componentWillMount() {
    // TODO: Move this
    var startDate = new Date()
    var endISO = startDate.toISOString().substring(0, 10)
    var start = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
    start = new Date(start)
    start =
      start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
    this.fetch_report()
    jQuery(document.body).removeClass('minimize_leftbar')
    this.setState({
      startDate: start,
      endDate: endISO
    })
    this.show_column_option_list()
    jQuery('title').html('User Inbox | GBSC')

    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === 'null' ||
      this.state.logged_user_id === 'undefined'
    ) {
      this.props.history.push('/')
    }

    this.get_inbox_list()
  }

  componentDidMount() {
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
    jQuery('.label-enclose .label').click(function () {
      jQuery(this).toggleClass('active')
    })
    jQuery('.nav-brand-res').click(function () {
      jQuery('.left-navbar').addClass('active')
    })
    jQuery('.menu-close').click(function () {
      jQuery('.left-navbar').removeClass('active')
    })

    window.jQuery('.input-group.date').datepicker({ format: 'dd/mm/yyyy' })
    document.getElementById('fromdate').value = moment(
      this.state.startDate
    ).format('DD/MM/YYYY')
    document.getElementById('todate').value = moment().format('DD/MM/YYYY')
    // go through cea54132f2a792d069b6c7052243f324d566e56d commit
    jQuery('.custom-select-drop .dropdown-menu a').click(function () {
      jQuery('.open.custom-select-drop .dropdown-menu li.active').removeClass(
        'active'
      )
      //jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass("active");
      jQuery(this)
        .parent('li')
        .addClass('active')
      jQuery('.open #selected').text(jQuery(this).text())
    })

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
    jQuery(document)
      .on('shown.bs.dropdown', '.dropdown', function () {
        // calculate the required sizes, spaces
        var $ul = jQuery(this).children('.dropdown-menu')
        var $button = jQuery(this).children('.dropdown-toggle')
        var ulOffset = $ul.offset()
        // how much space would be left on the top if the dropdown opened that direction
        var spaceUp =
          ulOffset.top -
          $button.height() -
          $ul.height() -
          jQuery(window).scrollTop()
        // how much space is left at the bottom
        var spaceDown =
          jQuery(window).scrollTop() +
          jQuery(window).height() -
          (ulOffset.top + $ul.height())
        // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
        if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
          jQuery(this).addClass('dropup')
      })
      .on('hidden.bs.dropdown', '.dropdown', function () {
        // always reset after close
        jQuery(this).removeClass('dropup')
      })
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push('/')
  }

  dataTaggingFunc(list_id, file_id) {
    this.props.history.push('/data_tagging/' + list_id + '/' + file_id)
    window.scrollTo(0, 0)
  }

  handleChange(fromDate) {
    // TODO: Deepa move this to a common fn or use moment
    var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    console.log('FROM ADTE', fromDate)
    var arrayDate = fromDate.match(pattern)
    console.log('DATE ARRAY ==>', arrayDate)
    var formattedDate = arrayDate
      ? new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1])
      : ''
    //var formattedDate = new Date(dt);
    formattedDate = formattedDate
      ? formattedDate.getFullYear() +
      '-' +
      (formattedDate.getMonth() + 1) +
      '-' +
      formattedDate.getDate()
      : ''
    var endDate = this.state.endDate
    var showCol = this.state.show_column ? this.state.show_column : '2'
    this.setState({ startDate: formattedDate })
    var startDate = formattedDate
    if (endDate && startDate) {
      this.fetch_report(startDate, endDate, showCol)
    }
  }
  changefromDate(fromdate) {
    let date = jQuery('#fromdate').val()
    if (date != undefined && date!='') {
      var array = date.split('/')
      var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      this.setState({ start_date: date_formated }, () => {
        this.fetch_report()
      })
    }

    // this.state.start_date = moment(date).format('YYYY-MM-DD')
  }
  changetoDate(todate) {
    // alert(jQuery('#todate').val())
    let date = jQuery('#todate').val()
    if (date != undefined && date!='') {
    var array = date.split('/')
    var date_formated = array[2] + '-' + array[1] + '-' + array[0]
    console.log('ewewew', array)
    this.setState({ end_date: date_formated }, () => {
      this.fetch_report()
    })
  }
    // this.state.end_date = moment(date).format('YYYY-MM-DD')
    //  alert(moment(todate).format('YYYY-MM-DD'))
  }
  changedatevalue(seleteddateformat) {
    var dateresult = moment()
    let from_date, to_date

    if (seleteddateformat === 'This Month-to-date') {
      from_date = dateresult.startOf('monfetch_reportth')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      document.getElementById('todate').value = moment(new Date()).format(
        'YYYY-MM-DD'
      )
      this.state.end_date = moment(new Date()).format('YYYY-MM-DD')
      this.setState({ show_column: 2 }, () => this.fetch_report())
    } else if (seleteddateformat === 'This Week') {
      from_date = dateresult.startOf('week')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      console.log('startdate', this.state.start_date)
      to_date = dateresult.endOf('week')
      document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.setState({ show_column: 3 }, () => this.fetch_report())
    } else if (seleteddateformat === 'This Month') {
      from_date = dateresult.startOf('month')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = dateresult.endOf('month')
      document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.setState({ show_column: 7 }, () => this.fetch_report())
    } else if (seleteddateformat === 'This Week-to-date') {
      from_date = dateresult.startOf('week')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      document.getElementById('todate').value = moment(new Date()).format(
        'YYYY-MM-DD'
      )
      this.state.end_date = moment(new Date()).format('YYYY-MM-DD')
      this.setState({ show_column: 2 }, () => this.fetch_report())
    } else if (seleteddateformat === 'This Year') {
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = dateresult.endOf('year')
      document.getElementById('todate').value = to_date.format('YYYY-MM-DD')
      this.state.end_date = to_date.format('YYYY-MM-DD')
      this.setState({ show_column: 2 }, () => this.fetch_report())
    } else if (seleteddateformat === 'This Year-to-date') {
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('YYYY-MM-DD')
      this.state.start_date = from_date.format('YYYY-MM-DD')
      to_date = moment(new Date()).format('YYYY-MM-DD')
      document.getElementById('todate').value = to_date
      this.state.end_date = to_date
      this.setState({ show_column: 2 }, () => this.fetch_report())
    }
    let startDate = jQuery('#fromdate').val()
    let end_date = jQuery('#todate').val()
    this.setState({ start_date: startDate, end_date: end_date }, () => {
      this.fetch_report()
    })
  }
  handleChangeEndDate(toDate) {
    var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    console.log('TODATE =', toDate)
    var arrayDate = toDate.match(pattern)
    var formattedDate = arrayDate
      ? new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1])
      : ''
    formattedDate = formattedDate
      ? formattedDate.getFullYear() +
      '-' +
      (formattedDate.getMonth() + 1) +
      '-' +
      formattedDate.getDate()
      : ''
    this.setState({ endDate: formattedDate })
    var showCol = this.state.show_column ? this.state.show_column : '2'
    var startDate = this.state.startDate
    var endDate = formattedDate
    this.fetch_report(startDate, endDate, showCol)
  }

  setShowColumn(event) {
    //document.getElementById(".custom-select-drop .dropdown .open").value= event.currentTarget.dataset.rate;
    this.setState({
      selected: event.currentTarget.dataset.name
    })
    var showCol = event.currentTarget.dataset.rate
    if (event.target.name === 'week') {
      this.setState({
        show_column: 3
      }, () => {
        this.fetch_report()
      });
      showCol = 3
    } else if (event.target.name === 'month') {
      this.setState({
        show_column: 7
      }, () => {
        this.fetch_report()
      });
      showCol = 7
    } else {
      this.setState({
        show_column: 2
      }, () => {
        this.fetch_report()
      });
      showCol = 2
    }
    // var start = this.state.startDate
    // var end = this.state.endDate
    // if (showCol && start && end) {
    //   this.fetch_report(start, end, showCol)
    // }
  }

  // TODO: Deepa - handle the month to date filter options
  setShowColumnDateRange(event) {
    var showCol = ''
    var start
    let from_date, to_date
    var end = new Date().toISOString().substring(0, 10)
    if (event.target.name === 'week') {
      this.setState({
        show_column: '3'
      })
      showCol = '3'
      var startDate = new Date()
      var day = startDate.getDay(),
        diff = startDate.getDate() - day // adjust when day is sunday
      start = new Date(startDate.setDate(diff))
      document.getElementById('fromdate').value = moment(start).format(
        'DD/MM/YYYY'
      )
      start =
        start.getFullYear() +
        '-' +
        (start.getMonth() + 1) +
        '-' +
        start.getDate()
      document.getElementById('todate').value = moment().format('DD/MM/YYYY')
      console.log('DATE WEEK START===>', start)
      this.setState({
        startDate: start,
        endDate: end
      })
    } else if (event.target.name === 'month') {
      this.setState({
        show_column: '7'
      })
      showCol = '7'
      var startDate = new Date()
      start = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      start = new Date(start)
      document.getElementById('fromdate').value = moment(start).format(
        'DD/MM/YYYY'
      )
      start =
        start.getFullYear() +
        '-' +
        (start.getMonth() + 1) +
        '-' +
        start.getDate()
      document.getElementById('todate').value = moment().format('DD/MM/YYYY')
      console.log('DATE OF THE MONTH=> ', start)
      this.setState({
        startDate: start,
        endDate: end
      })
    } else if (event.target.name === 'month_to_date') {
      this.setState({
        show_column: '2'
      })
      showCol = '2'
      var startDate = new Date()
      start = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      start = new Date(start)
      document.getElementById('fromdate').value = moment(start).format(
        'DD/MM/YYYY'
      )
      start =
        start.getFullYear() +
        '-' +
        (start.getMonth() + 1) +
        '-' +
        start.getDate()
      document.getElementById('todate').value = moment().format('DD/MM/YYYY')
      this.setState({
        startDate: start,
        endDate: end
      })
    } else if (event.target.name === 'week_to_date') {
      this.setState({
        show_column: '2'
      })
      showCol = '2'
      var startDate = new Date()
      var day = startDate.getDay(),
        diff = startDate.getDate() - day // adjust when day is sunday
      start = new Date(startDate.setDate(diff))
      document.getElementById('fromdate').value = moment(start).format(
        'DD/MM/YYYY'
      )
      start =
        start.getFullYear() +
        '-' +
        (start.getMonth() + 1) +
        '-' +
        start.getDate()
      document.getElementById('todate').value = moment().format('DD/MM/YYYY')
      this.setState({
        startDate: start,
        endDate: end
      })
    } else if (event.target.name === 'year') {
      this.setState({
        show_column: '2'
      })
      showCol = '2'
      var startDate = new Date()
      var day = startDate.getDay(),
        diff = startDate.getDate() - day // adjust when day is sunday
      start = new Date(startDate.setDate(diff))
      var dateresult = moment()
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('DD/MM/YYYY')

      start =
        start.getFullYear() +
        '-' +
        (start.getMonth() + 1) +
        '-' +
        start.getDate()
      to_date = dateresult.endOf('year')
      document.getElementById('todate').value = to_date.format('DD/MM/YYYY')
      this.setState({
        startDate: from_date.format('YYYY-MM-DD'),
        endDate: to_date.format('YYYY-MM-DD')
      })
    } else if (event.target.name === 'year_to_date') {
      this.setState({
        show_column: '2'
      })
      showCol = '2'
      var startDate = new Date()
      var day = startDate.getDay(),
        diff = startDate.getDate() - day // adjust when day is sunday
      start = new Date(startDate.setDate(diff))
      var dateresult = moment()
      from_date = dateresult.startOf('year')
      document.getElementById('fromdate').value = from_date.format('DD/MM/YYYY')
      start =
        start.getFullYear() +
        '-' +
        (start.getMonth() + 1) +
        '-' +
        start.getDate()
      document.getElementById('todate').value = moment().format('DD/MM/YYYY')
      this.setState({
        startDate: from_date.format('YYYY-MM-DD'),
        endDate: end
      })
    }
    if (showCol && start && end) {
      this.fetch_report(start, end, showCol)
    }
  }
  fetch_report = () => {
    this.setState({ loading: true })
    let { start_date, end_date } = this.state

    var showColumns = this.state.show_column

    // var showColumns = showCol ? showCol : '1'

    var user_id = parseFloat(this.state.logged_user_id)
    FetchAllApi.reports_list(
      user_id,
      start_date,
      end_date,
      showColumns,
      (err, response) => {
        console.log('LIST RETURNEDjkhkshkkdsh=>', response)
        if (response.status == 1) {
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
            total_revenue: response.total_revenue,
            cost_of_goods_sold: response.cost_of_goods_sold,
            gross_profit: response.gross_profit,
            net_income: response.net_income,
            reportObject: arrayOfElements,
            numberOfColumns: numberOfColumns,
            dateList: dateList,
            loading: false
          })
        } else {
          this.setState({
            cost_of_goods_sold: '',
            gross_profit: '',
            net_income: '',
            reportObject: [],
            numberOfColumns: numberOfColumns,
            dateList: [],
            loading: false
          })
        }
      }
    )
  }
  show_column_option_list = () => {
    var reqBody = { report_name: 'profit_and_loss' }
    var user_id = parseFloat(this.state.logged_user_id)
    FetchAllApi.show_column_option_list(user_id, reqBody, (err, response) => {
      console.log('JSON RESULT SHOW LIST>', response)
      if (response.status == 1) {
        console.log(
          'JSON RESULT SHOW LIST==>',
          JSON.stringify(response.details)
        )
        this.setState({
          show_column_option_list: response.details
        })
      }
    })
  }
  handleCheck_get_selected_tax(e) {
    this.setState(
      {
        show_column: e.currentTarget.dataset.type
      },
      () => {
        this.handleChangeItems(0, this.state.rows.length - 1)
      }
    )

    jQuery('#show_col_search').val('')
    this.show_column_option_list()
  }

  update_search_keyword = event => {
    this.setState({ search_key_gst: event.target.value }, () => {
      this.get_gst_list()
    })
  }
  get_inbox_list = () => {
    var page_no = 1
    var items_limit = 10
    var filter_status = ''
    var client_id = ''

    FetchAllApi.inboxList(
      page_no,
      items_limit,
      filter_status,
      client_id,
      (err, response) => {
        console.log('Article Data', response.message)
        if (response.status === 1) {
          this.setState({
            inbox_list: response.list,
            response_msg: response.message,
            response_stus: response.status
          })
          jQuery('.item-listwrap').css('display', 'block')
          jQuery('.inbox-right').css('display', 'flex')
          jQuery('.no_rec').css('display', 'none')
        } else {
          jQuery('.item-listwrap, .inbox-right').css('display', 'none')
          jQuery('.no_rec').css('display', 'block')
        }
      }
    )
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items

    if (
      this.state.item_details.user_image !== '' &&
      this.state.item_details.user_image !== 'null'
    ) {
      var item_user_image = this.state.item_details.user_image
    } else {
      var item_user_image = 'images/user-img-1.png'
    }

    //console.log('item_files', this.state.item_file_path);
    if (
      this.state.item_file_path !== '' &&
      this.state.item_file_path !== 'null'
    ) {
      item_file_path = []
      var split_file_path = this.state.item_file_path.toString().split(',')
      var split_file_id = this.state.item_file_id.toString().split(',')
      if (split_file_path.length >= 1) {
        for (var i = 0; i < split_file_path.length; i++) {
          var get_file_url = split_file_path[i]
          var split_file_name = split_file_path[i].toString().split('/')
          var arr_reverse = split_file_name.reverse()

          var get_file_name = arr_reverse[0].substring(
            arr_reverse[0].length - 15,
            arr_reverse[0].length
          )

          var get_file_ext = arr_reverse[0].substring(
            arr_reverse[0].lastIndexOf('.') + 1,
            arr_reverse[0].length
          )
          if (get_file_ext === 'pdf') {
            var file_icon = 'images/pdf-icon.png'
          } else {
            var file_icon = 'images/img-icon.png'
          }

          //console.log('pdf_file_link',get_file_url);

          if (get_file_ext === 'pdf') {
            item_file_path.push(
              <div className='attach-item'>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  className='img-wrap'
                  data-id={split_file_id[i]}
                >
                  <iframe
                    src={get_file_url}
                    id='pdf_thumb_viewer'
                    frameborder='0'
                    scrolling='no'
                    width='190'
                    height='190'
                  ></iframe>
                  <span className='go'>
                    <img
                      src='../images/next-arrow-white.svg'
                      className='mCS_img_loaded'
                    />
                  </span>
                </a>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  data-toggle='tooltip'
                  data-placement='top'
                  title={get_file_url}
                  data-id={split_file_id[i]}
                >
                  <span>{get_file_name}</span>
                  <img
                    src='../images/download-icon.svg'
                    alt='Icon'
                    className='mCS_img_loaded'
                  />
                </a>
              </div>
            )
          } else {
            item_file_path.push(
              <div className='attach-item'>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  className='img-wrap'
                  data-id={split_file_id[i]}
                >
                  <img
                    className='img-responsive mCS_img_loaded'
                    src={get_file_url}
                    alt={get_file_ext}
                  />
                  <span className='go'>
                    <img
                      src='../images/next-arrow-white.svg'
                      className='mCS_img_loaded'
                    />
                  </span>
                </a>
                <a
                  onClick={this.dataTaggingFunc.bind(
                    this,
                    this.state.list_id,
                    split_file_id[i]
                  )}
                  data-toggle='tooltip'
                  data-placement='top'
                  title={get_file_url}
                  data-id={split_file_id[i]}
                >
                  <span>{get_file_name}</span>
                  <a href={get_file_url} download={get_file_name}>
                    {get_file_name}
                    <img
                      src='../images/download-icon.svg'
                      alt='Icon'
                      className='mCS_img_loaded'
                    />
                  </a>
                </a>
              </div>
            )
          }
        }
      }
    }

    options.push(<option>ORG-250</option>)

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
                <a href='javascript:;' className='back hidden-xs'>
                  <img src='../images/back-arrow-blue.svg' />
                </a>
                <ul className='list-unstyled breadcrumb page-title hidden-xs'>
                  <li>
                    <a href='javascript:;'>Report</a>
                  </li>
                  <li>Profit &amp; Loss</li>
                </ul>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className='content-top col-md-12 col-xs-12'>
                <h4 className='fw-sbold mar-t-no'>Profit &amp; Loss</h4>
                <h5 className='fw-sbold'>Jan 2020</h5>
                <div className='row snippet-row'>
                  <div className='col-md-3 col-sm-6'>
                    <div className='snippet active'>
                      <div>
                        <small>Total Revenue</small>
                        <span className='value'>
                          $ {this.state.total_revenue}
                        </span>
                        <img
                          className='snippet-arrow visible-lg'
                          src='../images/snippet-arrow.svg'
                          alt='icon'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='snippet'>
                      <div>
                        <small>Cost of Goods Sold</small>
                        <span className='value'>
                          $ {this.state.cost_of_goods_sold}
                        </span>
                        <img
                          className='snippet-arrow visible-lg'
                          src='../images/snippet-arrow.svg'
                          alt='icon'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='snippet'>
                      <div>
                        <small>Gross Profit</small>
                        <span className='value'>
                          $ {this.state.gross_profit}
                        </span>
                        <img
                          className='snippet-arrow visible-lg'
                          src='../images/snippet-arrow.svg'
                          alt='icon'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='snippet'>
                      <div>
                        <small>Net Income</small>
                        <span className='value'>$ {this.state.net_income}</span>
                        <img
                          className='snippet-arrow visible-lg'
                          src='../images/snippet-arrow.svg'
                          alt='icon'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='main-content col-md-12 col-xs-12'>
                <div className='content-sec col-md-12 col-xs-12 pad-no mar-t-no'></div>
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
                        Export<span className='caret'></span>
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
                                    checked='checked'
                                  />{' '}
                                  Accural
                                  <span className='checkmark'></span>
                                </label>
                                <label className='custom-checkbox radio'>
                                  <input type='radio' name='tax-item' /> Cash
                                  <span className='checkmark'></span>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className='form-group col-md-12 col-xs-12'>
                            <div className='row'>
                              <div className='col-lg-5 col-md-3'>
                                <label className='fw-sbold'>Show Columns</label>
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
                                    value={this.state.selected}
                                    required
                                  >
                                    <span
                                      id='selected'
                                    //onChange={event => this.handleChange(event)}
                                    >
                                      {this.state.selected != ''
                                        ? this.state.selected
                                        : 'Choose Show Type'}
                                    </span>
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
                                      <ul className='list-unstyled'>
                                        {this.state.show_column_option_list.map(
                                          (item, index) => {
                                            return (
                                              <li
                                                key={index}
                                                onClick={event =>
                                                  this.setShowColumn(event)
                                                }
                                                data-name={item.option_name}
                                                data-rate={item.id}
                                                name={item.option_name}
                                              >
                                                <a
                                                  href='javascript:;'
                                                  value={item.option_name}
                                                >
                                                  {item.option_name}
                                                </a>
                                              </li>
                                            )
                                          }
                                        )}
                                      </ul>
                                    </li>
                                  </ul>
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
                                    <span className='caret'></span>
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
                      <div className='col-lg-8 col-md-12 pad-r-no'>
                        <div className='row'>
                          <div className='form-group col-md-12 col-xs-12'>
                            <label className='fw-sbold mar-rgt'>
                              Add Subcolumns
                            </label>
                            <label className='custom-checkbox mar-rgt'>
                              <input type='checkbox' name='' /> % of Row
                              <span className='checkmark'></span>
                            </label>
                            <label className='custom-checkbox mar-rgt'>
                              <input type='checkbox' name='' /> % of Column
                              <span className='checkmark'></span>
                            </label>
                            <label className='custom-checkbox mar-rgt'>
                              <input type='checkbox' name='' /> % of Income
                              <span className='checkmark'></span>
                            </label>
                            <label className='custom-checkbox'>
                              <input type='checkbox' name='' /> % of Expense
                              <span className='checkmark'></span>
                            </label>
                          </div>
                          <div className='form-group col-md-12 col-xs-12 pad-no mar-b-no'>
                            <div className='col-md-4 col-sm-4'>
                              <label className='custom-checkbox'>
                                <input type='checkbox' name='' /> Previous
                                Period
                                <span className='checkmark'></span>
                              </label>
                              <div className='checkbox-block'>
                                <label className='custom-checkbox'>
                                  <input type='checkbox' name='' /> CAD Change
                                  <span className='checkmark'></span>
                                </label>
                                <label className='custom-checkbox'>
                                  <input type='checkbox' name='' /> % Change
                                  <span className='checkmark'></span>
                                </label>
                              </div>
                            </div>
                            <div className='col-md-4 col-sm-4'>
                              <label className='custom-checkbox'>
                                <input type='checkbox' name='' /> Previous Year
                                <span className='checkmark'></span>
                              </label>
                              <div className='checkbox-block'>
                                <label className='custom-checkbox'>
                                  <input type='checkbox' name='' /> CAD Change
                                  <span className='checkmark'></span>
                                </label>
                                <label className='custom-checkbox'>
                                  <input type='checkbox' name='' /> % Change
                                  <span className='checkmark'></span>
                                </label>
                              </div>
                            </div>
                            <div className='col-md-4 col-sm-4'>
                              <label className='custom-checkbox'>
                                <input type='checkbox' name='' /> Year-to-Date
                                <span className='checkmark'></span>
                              </label>
                              <div className='checkbox-block'>
                                <label className='custom-checkbox'>
                                  <input type='checkbox' name='' /> % of YTD
                                  <span className='checkmark'></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className='report-table col-md-12 col-xs-12 pad-no'>
                    <div className='table-responsive'>
                      <Loader
                        type='ThreeDots'
                        color='#00BFFF'
                        height={100}
                        width={100}
                        visible={this.state.loading}
                      />
                      {!this.state.loading && (
                        <table className='table'>
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              {/*add the new table headers based on the filter*/
                                this.state.dateList.map((date, index) => {
                                  var dateFormatted =
                                    date.split(',').length > 0
                                      ? date.split(',')[0]
                                      : date
                                  return (
                                    <th className='text-right'>
                                      {dateFormatted}
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
                            {this.state.reportObject.map(
                              (parentCategory, index) => {
                                let totalParent = parentCategory.total_amount
                                return (
                                  <>
                                    <tr className='title-1'>
                                      <td>{parentCategory.account_type}</td>
                                      {this.state.dateList.map(eachDate => {
                                        return <td>&nbsp;</td>
                                      })}
                                    </tr>

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
                                              subValue =
                                                eachCategory[subCategory]
                                              return (
                                                <>
                                                  <tr className='item-step1'>
                                                    {subValue &&
                                                      subValue.category_name &&
                                                      subValue.category_name
                                                        .length > 0 && (
                                                        <td>
                                                          <span>
                                                            {
                                                              subValue.category_name
                                                            }
                                                          </span>
                                                        </td>
                                                      )}
                                                    {subValue.amount_array &&
                                                      subValue.amount_array.map(
                                                        (value, indexValue) => {
                                                          return (
                                                            <td>
                                                              <span className='text-right'>
                                                                <a href='javascript:;'>
                                                                  {value.toFixed(
                                                                    2
                                                                  )}
                                                                </a>
                                                              </span>
                                                            </td>
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
                                    <tr className='item-step1 title1 bdr-no'>
                                      <td>
                                        <span>
                                          Total {parentCategory.account_type}
                                        </span>
                                      </td>
                                      {parentCategory.amount_array &&
                                        parentCategory.amount_array.map(
                                          total => {
                                            return (
                                              <td>
                                                <span className='text-right'>
                                                  {' '}
                                                  {total.toFixed(2)}
                                                </span>
                                              </td>
                                            )
                                          }
                                        )}
                                    </tr>
                                  </>
                                )
                              }
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

        <Footer logoutSubmit={e => this.logoutLink()} />
      </div>
    )
  }
}

export default profit_loss_report
