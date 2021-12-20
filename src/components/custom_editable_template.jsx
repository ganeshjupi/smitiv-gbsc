import React, { Component } from 'react'

import FetchAllApi from '../api_links/fetch_all_api'
import parse from 'html-react-parser'
import jQuery from 'jquery'
import InputColor from 'react-input-color'

export class custom_editable_template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),
      html_content: this.props.location.state.details.html_content,
      properties_result: this.props.location.state.details.properties,
      color: {},
      setColor: {},
      logoimg:"",
    }
  }

  save_andContinue = () => {
    var template_id = this.props.match.params.template_id
    let data = {
      user_id: this.state.logged_user_id,
      template_name: 'Template-' + new Date(),
      template_id: template_id,
      client_id: this.state.logged_client_id,
      properties: this.get_all_settings(),
      html_content: jQuery('#get_content').html()
    }
    FetchAllApi.edit_invoice_template(data, (err, response) => {
      console.log('defaultcategorylist', response)
      alert(response.message)
      if (response.status === 1) {
        this.props.history.push('/invoice_templates')
        this.setState({})
      } else {
        this.setState({
          default_category_list: []
        })
      }
    })
  }
  save_asCopy = () => {}
  save_draft = () => {
    let data = {
      template_name: 'temp1',
      client_id: this.state.logged_client_id,
      properties: this.get_all_settings(),
      html_content: jQuery('#get_content').html()
    }
    FetchAllApi.save_invoice_template_draft(data, (err, response) => {
      console.log('defaultcategorylist', response)
      alert(response.message)
      if (response.status === 1) {
        this.props.history.push('/invoice_templates')

        this.setState({})
      } else {
        this.setState({
          default_category_list: []
        })
      }
    })
  }
  UNSAFE_componentWillMount () {
    jQuery(document.body).removeClass('minimize_leftbar')
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery('title').html('Template Editor | GBSC')

    if (
      this.state.logged_user_id === '' ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push('/')
    }
  }
  increase_logo_size = range => {
    jQuery('#logo_img').width(range + '%')

    this.setState({ logosize: range + '%' })
  }
  get_all_settings = () => {
    let value = {
      header: {
        logoStatus: jQuery('#logo_parnt_container').css('display'),
        logoURL: 'ttt',
        logosize: jQuery('#logo_img').css('width'),
        stripebackgroundstatus: jQuery('#stripe').css('display'),
        stripebackgroundtextsize: jQuery('#invoice_stripe').css('font-size'),
        stripebackgroundtextcolor: jQuery('#invoice_stripe').css('color'),
        stripebackgroundcolor: jQuery('#stripe').css('background'),

        entitynamestatus: jQuery('#entity_name').css('display'),

        entityaddressstatus: jQuery('#address').css('display'),
        entitycontactnumberstatus: jQuery('#mobile_number').css('display'),
        entityemailstatus: jQuery('#email_value').css('display')
      },
      items: {
        itemoptiontextsize: jQuery('#header_content').css('font-size'),
        itemoptiontextcolor: jQuery('#header_content').css('color'),
        itemoptioninvoicestatus: jQuery('#header_txt_container_invoice').css(
          'display'
        ),
        itemoptioninvoicelabel: jQuery('#invoice_to_content').html(),
        itemoptionbilltostatus: jQuery('#header_txt_container_billto').css(
          'display'
        ),
        itemoptionbilltolabel: jQuery('#billed_to_content').html(),
        itemoptioninvoicenostatus: jQuery('#invoice_no_content').css('display'),
        itemoptioninvoicenolabel: jQuery('#invoice_value').html(),
        itemoptionDatestatus: jQuery('#date_content').css('display'),
        itemoptionDateLabel: jQuery('#date_value').html(),
        tablepropertiestextsize: jQuery('table').css('font-size'),
        tablepropertiestextscolor: jQuery('table').css('color'),
        tablepropertiesbackground: jQuery('table').css('background-color'),
        tablepropertiesbackgroundHead: jQuery('#table_head').css(
          'background-color'
        ),
        tablepropertiesbackgroundRow: jQuery('#table_row').css(
          'background-color'
        ),
        tablepropertiesbackgroundBorder: jQuery('tbody').css('border'),
        tableLabel: [
          {
            labeltitle: jQuery('#no').html(),
            labelstatus: jQuery('#no').css('display')
          },
          {
            labeltitle: jQuery('#item').html(),
            labelstatus: jQuery('#item').css('display')
          },
          {
            labeltitle: jQuery('#priceeach').html(),
            labelstatus: jQuery('#priceeach').css('display')
          },
          {
            labeltitle: jQuery('#quantity').html(),
            labelstatus: jQuery('#quantity').css('display')
          },
          {
            labeltitle: jQuery('#tax').html(),
            labelstatus: jQuery('#tax').css('display')
          },
          {
            labeltitle: jQuery('#total').html(),
            labelstatus: jQuery('#total').css('display'),
            labelValue: 'Total',
            id: 'total'
          }
        ],
        totalproperties: [
          {
            labeltitle: 'Sub Total',
            labelstatus: jQuery('#subtotalfull').css('display'),
            labelValue: 'Sub Total',
            id: 'subtotal'
          },
          {
            labeltitle: jQuery('#totaltax').html(),
            labelstatus: jQuery('#totaltax').css('display'),
            labelValue: 'Tax',
            id: 'totaltax'
          },
          {
            labeltitle: jQuery('#grandtotal').html(),
            labelstatus: jQuery('#grandtotal').css('display'),
            labelValue: 'Grand Total',
            id: 'grandtotal'
          },
          {
            labeltitle: jQuery('#amountinwords').html(),
            labelstatus: jQuery('#amountinwords').css('display'),
            labelValue: 'Amount In Words',
            id: 'amountinwords'
          }
        ]
      },
      footer: {
        footeroptionstextsize: jQuery('#footer').css('font-size'),
        footeroptionstextcolor: jQuery('#footer').css('color'),
        footeroptionthanksmessagestatus: jQuery('#thank_u_msg_tag').css(
          'display'
        ),
        footeroptionsthankmessage: jQuery('#thank_u_msg_tag').html(),
        footertermsstatus: jQuery('#terms_cond_container').css('display'),
        footertermslabel: jQuery('#terms_condLabel_tag').html(),
        footertermsText: jQuery('#terms_cond_msg_tag').html()
      }
    }
    return value
  }
  

  changeImg=(uploadedPicture)=>{
    let image = uploadedPicture
    
    let  client_id=this.state.logged_client_id
     let user_id=this.state.logged_user_id

  


    FetchAllApi.edit_invoice_template(client_id,user_id,image, (err, response) => {
      if (response.status === 1) {
        console.log('qq',response)
        this.setState({
          logoImg: image,
        });
      }
    });

  }


  componentDidMount () {
    console.log('jair', jQuery('#logo_img').css('width'))
    console.log(this.props.location.state)

    require('jquery-mousewheel')
    require('malihu-custom-scrollbar-plugin')
    jQuery('.item-listwrap').mCustomScrollbar({
      scrollEasing: 'linear',
      scrollInertia: 600,
      scrollbarPosition: 'outside'
    })

    // var client_id = 1
  }
  setlogo (logo_value) {
    var checkBox = document.getElementById('logo_onoff').checked
   
    if (checkBox) {
      jQuery('#logo_parnt_container').css('display', 'block')
      this.setState({ logoStatus: true })
    } else {
      jQuery('#logo_parnt_container').css('display', 'none')
      this.setState({ logoStatus: false })
    }
    // this.setState({isLogoparent:!this.state.isLogoparent})
  }
  stripeBackground (result, value) {
    // alert(value);
    if (result === 'addstrip') {
      var checkBox = document.getElementById('stripe_background').checked
      if (checkBox) {
        jQuery('#stripe').css('display', 'block')
        this.setState({ stripebackgroundstatus: true })
      } else {
        jQuery('#stripe').css('display', 'none')
        this.setState({ stripebackgroundstatus: false })
      }
    } else if (result === 'changecolor') {
      jQuery('#stripe').css('background', value)
      this.setState({ stripebackgroundcolor: value })
    } else if (result === 'textsize') {
      jQuery('#invoice_stripe').css('font-size', value + 'pt')
      this.setState({ stripebackgroundtextsize: value + 'pt' })
    } else if (result === 'changecolor_text') {
      jQuery('#invoice_stripe').css('color', value)
      this.setState({ stripebackgroundtextcolor: value })
    }
  }

  item_header (value, result) {
    if (result === 'textsize') {
      jQuery('#header_content').css('font-size', value + 'pt')
    } else if (result === 'text_allign') {
      jQuery('#text_allign').css('float', value)
    }  else if (result === 'textcolor') {
      jQuery('#header_content').css('color', value)
    } else if (result === 'invoiceto_checkbox') {
      if (document.getElementById(result).checked)
        jQuery('#header_txt_container_invoice').css('display', 'block')
      else jQuery('#header_txt_container_invoice').css('display', 'none')
    } else if (result === 'invoicetovalue') {
      jQuery('#invoice_to_content').html(value)
    } else if (result === 'billto_checkbox') {
      if (document.getElementById(result).checked)
        jQuery('#header_txt_container_billto').css('display', 'block')
      else jQuery('#header_txt_container_billto').css('display', 'none')
    } else if (result === 'billtovalue') {
      jQuery('#billed_to_content').html(value)
    } else if (result === 'invoicenumber_checkbox') {
      if (document.getElementById(result).checked)
        jQuery('#invoice_no_content').css('display', 'block')
      else jQuery('#invoice_no_content').css('display', 'none')
    } else if (result === 'invoicenumbervalue') {
      jQuery('#invoice_value').html(value)
    } else if (result === 'date_value_checkbox') {
      if (document.getElementById(result).checked)
        jQuery('#date_content').css('display', 'block')
      else jQuery('#date_content').css('display', 'none')
    } else if (result === 'date_value_text') {
      jQuery('#date_value').html(value)
    }
  }
  entity_update (value, id) {
    //alert(value)

    var result = document.getElementById(id).checked
    if (result) {
      jQuery('#' + value).css('display', 'block')
    } else jQuery('#' + value).css('display', 'none')
  }
  footer_functions (value, result) {
    if (result === 'termsandcond') {
      jQuery('#terms_cond_msg_tag').html(value)
      this.setState({ footertermslabel: value })
    } else if (result === 'terms') {
      jQuery('#terms_condLabel_tag').html(value)
      this.setState({ footertermsText: value })
    } else if (result === 'terms_checkbox') {
      if (document.getElementById(result).checked) {
        this.setState({ footertermsstatus: true })

        jQuery('#terms_cond_container').css('display', 'block')
      } else {
        this.setState({ footertermsstatus: false })
        jQuery('#terms_cond_container').css('display', 'none')
      }
    } else if (result === 'textSize') {
      jQuery('#footer').css('font-size', value + 'pt')
      this.setState({ footeroptionstextsize: value })
    } else if (result === 'textcolor') {
      jQuery('#footer').css('color', value)
      this.setState({ footeroptionstextcolor: value })
    } else if (result === 'thankmessage_checkbox') {
      if (document.getElementById(result).checked) {
        this.setState({ footeroptionthanksmessagestatus: true })
        jQuery('#thank_u_msg_tag').css('display', 'block')
      } else {
        this.setState({ footeroptionthanksmessagestatus: false })
        jQuery('#thank_u_msg_tag').css('display', 'none')
      }
    } else if (result === 'thankmessage') {
      jQuery('#thank_u_msg_tag').html(value)
      this.setState({ footeroptionsthankmessage: value })
    }
  }
  Change_To_JSON (str) {
    return JSON.stringify(str)
  }
  tableproperties (value, query) {
    if (query === 'tabletextsize') {
      jQuery('table').css('font-size', value + 'pt')
    } else if (query === 'tabletextcolor') {
      jQuery('table').css('color', value)
    } else if (query === 'tablebackground') {
      jQuery('table').css('background-color', value)
    } else if (query === 'tablebackgroundhead') {
      jQuery('#table_head').css('background-color', value)
    } else if (query === 'tablebackgroundrow') {
      jQuery('#table_row').css('background-color', value)
      jQuery('#table_row1').css('background-color', value)
      jQuery('#table_row2').css('background-color', value)
    } else if (query === 'tableborder') {
      var str = '1px solid ' + value
      jQuery('tbody').css('border', str)
    }
  }
  tableLabelScript (value, query) {
    if (query === 'nochecked') {
      if (document.getElementById(query).checked) {
        jQuery('#no').css('display', '')
        jQuery('#no3').css('display', '')
        jQuery('#no2').css('display', '')
        jQuery('#no1').css('display', '')
      } else {
        jQuery('#no').css('display', 'none')
        jQuery('#no1').css('display', 'none')
        jQuery('#no2').css('display', 'none')
        jQuery('#no3').css('display', 'none')
      }
    } else if (query === 'notitle') {
      jQuery('#no').html(value)
    } else if (query === 'itemchecked') {
      if (document.getElementById(query).checked) {
        jQuery('#item').css('display', '')
        jQuery('#item1').css('display', '')
        jQuery('#item2').css('display', '')
        jQuery('#item3').css('display', '')
      } else {
        jQuery('#item').css('display', 'none')
        jQuery('#item3').css('display', 'none')
        jQuery('#item2').css('display', 'none')
        jQuery('#item1').css('display', 'none')
      }
    } else if (query === 'itemtitle') {
      jQuery('#item').html(value)
    } else if (query === 'priceeachchecked') {
      if (document.getElementById(query).checked) {
        jQuery('#priceeach').css('display', '')
        jQuery('#priceeach3').css('display', '')
        jQuery('#priceeach2').css('display', '')
        jQuery('#priceeach1').css('display', '')
      } else {
        jQuery('#priceeach').css('display', 'none')
        jQuery('#priceeach3').css('display', 'none')
        jQuery('#priceeach2').css('display', 'none')
        jQuery('#priceeach1').css('display', 'none')
      }
    } else if (query === 'priceeachtitle') {
      jQuery('#priceeach').html(value)
    } else if (query === 'quantitychecked') {
      if (document.getElementById(query).checked) {
        jQuery('#quantity').css('display', '')
        jQuery('#quantity3').css('display', '')
        jQuery('#quantity2').css('display', '')
        jQuery('#quantity1').css('display', '')
      } else {
        jQuery('#quantity').css('display', 'none')
        jQuery('#quantity3').css('display', 'none')
        jQuery('#quantity2').css('display', 'none')
        jQuery('#quantity1').css('display', 'none')
      }
    } else if (query === 'quantitytitle') {
      jQuery('#quantity').html(value)
    } else if (query === 'taxchecked') {
      if (document.getElementById(query).checked) {
        jQuery('#tax').css('display', '')
        jQuery('#tax3').css('display', '')
        jQuery('#tax2').css('display', '')
        jQuery('#tax1').css('display', '')
      } else {
        jQuery('#tax').css('display', 'none')
        jQuery('#tax3').css('display', 'none')
        jQuery('#tax2').css('display', 'none')
        jQuery('#tax1').css('display', 'none')
      }
    } else if (query === 'taxtitle') {
      jQuery('#tax').html(value)
    } else if (query === 'totalchecked') {
      if (document.getElementById(query).checked) {
        jQuery('#total').css('display', '')
        jQuery('#total3').css('display', '')
        jQuery('#total2').css('display', '')
        jQuery('#total1').css('display', '')
      } else {
        jQuery('#total').css('display', 'none')
        jQuery('#total3').css('display', 'none')
        jQuery('#total2').css('display', 'none')
        jQuery('#total1').css('display', 'none')
      }
    } else if (query === 'totaltitle') {
      jQuery('#total').html(value)
    } else if (query === 'subtotalchecked') {
      if (document.getElementById(query).checked) {
        jQuery('#subtotal').css('display', '')
        jQuery('#subtotalfull').css('display', '')
      } else {
        jQuery('#subtotal').css('display', 'none')
        jQuery('#subtotalfull').css('display', 'none')
      }
    } else if (query === 'subtotaltitle') {
      jQuery('#subtotal').html(value)
    } else if (query === 'totaltaxchecked') {
      if (document.getElementById(query).checked) {
        jQuery('#totaltax').css('display', '')
        jQuery('#totaltaxfull').css('display', '')
      } else {
        jQuery('#totaltax').css('display', 'none')
        jQuery('#totaltaxfull').css('display', 'none')
      }
    } else if (query === 'totaltaxtitle') {
      jQuery('#totaltax').html(value)
    } else if (query === 'grandtotalchecked') {
      if (document.getElementById(query).checked) {
        jQuery('#grandtotal').css('display', '')
        jQuery('#grandtotalfull').css('display', '')
      } else {
        jQuery('#grandtotal').css('display', 'none')
        jQuery('#grandtotalfull').css('display', 'none')
      }
    } else if (query === 'grandtotaltitle') {
      jQuery('#grandtotal').html(value)
    } else if (query === 'amountinwordschecked') {
      if (document.getElementById(query).checked) {
        jQuery('#amountinwords').css('display', '')
        jQuery('#amountinwordsfull').css('display', '')
      } else {
        jQuery('#amountinwords').css('display', 'none')
        jQuery('#amountinwordsfull').css('display', 'none')
      }
    } else if (query === 'amountinwordstitle') {
      jQuery('#amountinwords').html(value)
    }
  }
  addLabelResult () {
    alert('Working on Designs')
  }
  alignmentProperties (value, query) {
    if (query === 'footer' || query === 'thank_u_msg_tag') {
      jQuery('#' + query).css('text-align', value)
    } else if (query === 'terms_cond_container') {
      jQuery('#terms_condLabel_tag').css('text-align', value)
      jQuery('#terms_cond_msg_tag').css('text-align', value)
    } else jQuery('#' + query).css('float', value)
  }
  render () {
    let property_result = JSON.parse(this.state.properties_result)
    console.log('property Result', property_result)
    let header_result = property_result.header
    let item_result = property_result.items
    let footer_result = property_result.footer
    let table_label = item_result.tableLabel
    let table_properties = item_result.totalproperties

    console.log('Property Footer', footer_result)
    console.log('Property header', header_result)
    console.log('Property items', item_result)
    console.log('Property items', table_properties)
    let setColor,
      color = this.state
    return (
      <div>
        {/* Main Wrapper Starts here */}
        <div className='container-fluid invoice-editor'>
          <div className='row'>
            {/* Builder Left Starts here */}
            <div className='builder-left'>
              <div
                className='mscroll-y mCustomScrollbar _mCS_1 mCS-autoHide'
                style={{ position: 'relative', overflow: 'visible' }}
              >
                <div
                  id='mCSB_1'
                  className='mCustomScrollBox mCS-light mCSB_vertical mCSB_outside'
                  style={{ maxHeight: 'none' }}
                  tabIndex={0}
                >
                  <div
                    id='mCSB_1_container'
                    className='mCSB_container'
                    style={{ position: 'relative', top: 0, left: 0 }}
                    dir='ltr'
                  >
                    <h5>Template Properties</h5>
                    <ul className='nav nav-pills'>
                      <li className='active'>
                        <a data-toggle='pill' href='#tab-header'>
                          Header
                        </a>
                      </li>
                      <li>
                        <a data-toggle='pill' href='#tab-item'>
                          Item
                        </a>
                      </li>
                      <li>
                        <a data-toggle='pill' href='#tab-footer'>
                          Footer
                        </a>
                      </li>
                    </ul>
                    <div className='tab-content'>
                      <div id='tab-header' className='tab-pane fade in active'>
                        <form className='custom-form'>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  id='logo_onoff'
                                  defaultChecked={
                                    header_result && header_result.logoStatus
                                      ? 'true'
                                      : ''
                                  }
                                  onChange={e => this.setlogo(e.target.value)}
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>
                                Entity Logo
                                <i
                                  data-toggle='tooltip'
                                  data-placement='right'
                                  tabIndex={0}
                                  title='true'
                                  data-original-title='You can change the logo from Organization settings'
                                >
                                  <img
                                    src='../../images/round-info-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </i>
                              </span>
                            </span>
                            <div className='logo-wrap'>
                              <img
                                className='img-responsive mCS_img_loaded'
                                // src='../../images/form-sample-logo.png'
                                id="logo_img"
                                src={this.state.logoimg}
                                alt='icon'
                                onClick={(e)=>{this.changeImg(e.target.files)}}
                              />
                            </div>
                            <div className='range-encl'>
                              <span className='form-label'>Logo Size</span>
                              <input
                                type='range'
                                name='img-size'
                                onChange={e =>
                                  this.increase_logo_size(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='form-label'>Text Align</span>
                            <div className='input-group'>
                              <select
                                className='form-control'
                                onChange={e =>
                                  this.alignmentProperties(
                                    e.target.value,
                                    'logo_parnt_container'
                                  )
                                }
                              >
                                <option>left</option>
                                <option>center</option>
                                <option>right</option>
                              </select>
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='form-label fw-sbold w-100 mar-btm'>
                              Header Options
                            </span>
                            <div className='clearfix'>
                              <span className='editor-label'>
                                <label className='switch'>
                                  <input
                                    type='checkbox'
                                    defaultChecked={
                                      header_result &&
                                      header_result.stripebackgroundstatus !==
                                        'none'
                                        ? 'true'
                                        : ''
                                    }
                                    onChange={e =>
                                      this.stripeBackground('addstrip', 1)
                                    }
                                    id='stripe_background'
                                  />
                                  <span className='drag-ball'>
                                    <span className='off' />
                                    <span className='on' />
                                  </span>
                                </label>
                                <span className='form-label'>
                                  Stripe Background
                                </span>
                                <div className='input-group'>
                                  <input
                                    type='color'
                                    className='form-control'
                                    name='text-color'
                                    onChange={e =>
                                      this.stripeBackground(
                                        'changecolor',
                                        e.target.value
                                      )
                                    }
                                    defaultValue={
                                      header_result &&
                                      header_result.stripebackgroundcolor
                                    }
                                  />
                                  <span className='input-group-addon'>
                                    <img
                                      src='../../images/color-wheel-icon.svg'
                                      alt='icon'
                                      className='mCS_img_loaded'
                                    />
                                  </span>
                                </div>
                              </span>
                            </div>

                            <div className='clearfix mar-btm'>
                              <span className='form-label'>Text Size</span>
                              <div className='input-group'>
                                <select
                                  className='form-control'
                                  name='text-size'
                                  onChange={e =>
                                    this.stripeBackground(
                                      'textsize',
                                      e.target.value
                                    )
                                  }
                                  contenteditable='true'
                                  defaultValue={
                                    header_result &&
                                    header_result.stripebackgroundtextsize
                                  }
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                </select>

                                <span className='input-group-addon fw-500'>
                                  pt
                                </span>
                              </div>
                            </div>

                            <div className='clearfix mar-btm'>
                              <span className='form-label'>Text Align</span>
                              <div className='input-group'>
                                <select
                                  className='form-control'
                                  onChange={e =>
                                    this.alignmentProperties(
                                      e.target.value,
                                      'invoice_stripe'
                                    )
                                  }
                                >
                                  <option>left</option>
                                  <option>right</option>
                                </select>
                              </div>
                            </div>

                            <div className='clearfix'>
                              <span className='form-label'>Text Color</span>
                              <div className='input-group'>
                                <input
                                  type='color'
                                  className='form-control'
                                  name='text-color'
                                  onChange={e =>
                                    this.stripeBackground(
                                      'changecolor_text',
                                      e.target.value
                                    )
                                  }
                                  defaultValue={
                                    header_result &&
                                    header_result.stripebackgroundtextcolor
                                  }
                                />
                                <span className='input-group-addon'>
                                  <img
                                    src='../../images/color-wheel-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  id='entity_name_check'
                                  onChange={e =>
                                    this.entity_update(
                                      'entity_name',
                                      'entity_name_check'
                                    )
                                  }
                                  defaultChecked={
                                    header_result &&
                                    header_result.entitynamestatus !== 'none'
                                      ? 'true'
                                      : ''
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>Entity Name</span>
                            </span>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  defaultChecked='checked'
                                  id='address_check'
                                  onChange={e =>
                                    this.entity_update(
                                      'address',
                                      'address_check'
                                    )
                                  }
                                  defaultChecked={
                                    header_result &&
                                    header_result.entityaddressstatus !== 'none'
                                      ? 'true'
                                      : ''
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>Entity Address</span>
                            </span>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  defaultChecked='checked'
                                  id='mobile_number_check'
                                  onChange={e =>
                                    this.entity_update(
                                      'mobile_number',
                                      'mobile_number_check'
                                    )
                                  }
                                  defaultChecked={
                                    header_result &&
                                    header_result.entitycontactnumberstatus !==
                                      'none'
                                      ? 'true'
                                      : ''
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>
                                Entity Contact No.
                              </span>
                            </span>
                          </div>
                          <div className='form-group clearfix mar-b-no'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  defaultChecked='checked'
                                  id='email_value_check'
                                  onChange={e =>
                                    this.entity_update(
                                      'email_value',
                                      'email_value_check'
                                    )
                                  }
                                  defaultChecked={
                                    header_result &&
                                    header_result.entityemailstatus !== 'none'
                                      ? 'true'
                                      : ''
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>Entity Email</span>
                            </span>
                          </div>
                          <small>
                            <i>
                              Change header item content from organization
                              profile
                            </i>
                          </small>
                        </form>
                      </div>
                      <div id='tab-item' className='tab-pane fade'>
                        <form className='custom-form'>
                          <div className='form-group clearfix'>
                            <span className='form-label fw-sbold w-100 mar-btm'>
                              Items Options
                            </span>
                            <div className='clearfix mar-btm'>
                              <span className='form-label'>Text Size</span>
                              <div className='input-group'>
                                <select
                                  className='form-control'
                                  id="textsize"
                                  name='text-size'
                                  onChange={e =>
                                    this.item_header(e.target.value, 'textsize')
                                  }
                                  defaultValue={
                                    item_result &&
                                    item_result.itemoptiontextsize
                                  }
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                </select>

                                <span className='input-group-addon fw-500'>
                                  pt
                                </span>
                              </div>
                            </div>

                            <div className='clearfix mar-btm'>
                              <span className='form-label'>Text Align</span>
                              <div className='input-group'>
                                <select className='form-control'
                                id="text_allign"
                                className='form-control'
                                onChange={e =>
                                  this.item_header(
                                    e.target.value,
                                    'text_allign'
                                  ) }
                                >
                                  <option>left</option>
                                  <option>center</option>
                                  <option>right</option>
                                </select>
                              </div>
                            </div>

                            <div className='clearfix'>
                              <span className='form-label'>Text Color</span>
                              <div className='input-group'>
                                <input
                                  type='color'
                                  className='form-control'
                                  name='text-color'
                                  onChange={e =>
                                    this.item_header(
                                      e.target.value,
                                      'textcolor'
                                    )
                                  }
                                  defaultValue={
                                    item_result &&
                                    item_result.itemoptiontextcolor
                                  }
                                />
                                <span className='input-group-addon'>
                                  <img
                                    src='../../images/color-wheel-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  defaultChecked={
                                    item_result &&
                                    item_result.itemoptioninvoicestatus !==
                                      'none'
                                      ? 'true'
                                      : ''
                                  }
                                  id='invoiceto_checkbox'
                                  onChange={e =>
                                    this.item_header(
                                      e.target.value,
                                      'invoiceto_checkbox'
                                    )
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>Invoice to</span>
                            </span>
                            <div className='input-group'>
                              <span className='input-group-addon addon-left fw-500'>
                                Label
                              </span>
                              <input
                                type='text'
                                className='form-control'
                                name='label'
                                defaultValue={
                                  item_result &&
                                  item_result.itemoptioninvoicelabel
                                }
                                onChange={e =>{
                                  console.log(item_result)
                                  this.item_header(
                                    e.target.value,
                                    'invoicetovalue'
                                  )
                                }}
                              />
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  id='billto_checkbox'
                                  onChange={e =>
                                    this.item_header(
                                      e.target.value,
                                      'billto_checkbox'
                                    )
                                  }
                                  defaultChecked={
                                    item_result &&
                                    item_result.itemoptionbilltostatus !==
                                      'none'
                                      ? 'true'
                                      : ''
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>Bill to</span>
                            </span>
                            <div className='input-group'>
                              <span className='input-group-addon addon-left fw-500'>
                                Label
                              </span>
                              <input
                                type='text'
                                className='form-control'
                                name='label'
                                defaultValue={
                                  item_result &&
                                  item_result.itemoptionbilltolabel
                                }
                                onChange={e =>
                                  this.item_header(
                                    e.target.value,
                                    'billtovalue'
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  defaultChecked={
                                    item_result &&
                                    item_result.itemoptioninvoicenostatus !==
                                      'none'
                                      ? 'true'
                                      : ''
                                  }
                                  id='invoicenumber_checkbox'
                                  onChange={e =>
                                    this.item_header(
                                      e.target.value,
                                      'invoicenumber_checkbox'
                                    )
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>Invoice No</span>
                            </span>
                            <div className='input-group'>
                              <span className='input-group-addon addon-left fw-500'>
                                Label
                              </span>
                              <input
                                type='text'
                                className='form-control'
                                name='label'
                                defaultValue={
                                  item_result &&
                                  item_result.itemoptioninvoicenolabel
                                }
                                onChange={e =>
                                  this.item_header(
                                    e.target.value,
                                    'invoicenumbervalue'
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  defaultChecked={
                                    item_result &&
                                    item_result.itemoptionDatestatus !== 'none'
                                      ? 'true'
                                      : ''
                                  }
                                  id='date_value_checkbox'
                                  onChange={e =>
                                    this.item_header(
                                      e.target.value,
                                      'date_value_checkbox'
                                    )
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>Date</span>
                            </span>
                            <div className='input-group'>
                              <span className='input-group-addon addon-left fw-500'>
                                Label
                              </span>
                              <input
                                type='text'
                                className='form-control'
                                name='label'
                                defaultValue={
                                  item_result && item_result.itemoptionDateLabel
                                }
                                onChange={e =>
                                  this.item_header(
                                    e.target.value,
                                    'date_value_text'
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='form-label fw-sbold w-100 mar-btm'>
                              Table Properties
                            </span>
                            <div className='clearfix mar-btm'>
                              <span className='form-label'>Text Size</span>
                              <div className='input-group'>
                                <select
                                  className='form-control'
                                  name='text-size'
                                  id="text-size"
                                  onChange={e =>
                                    this.tableproperties(
                                      e.target.value,
                                      'tabletextsize'
                                    )
                                  }
                                  defaultValue={
                                    item_result &&
                                    item_result.tablepropertiestextsize
                                  }
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                </select>

                                <span className='input-group-addon fw-500'>
                                  pt
                                </span>
                              </div>
                            </div>

                            <div className='clearfix mar-btm'>
                              <span className='form-label'>Text Color</span>
                              <div className='input-group'>
                                <input
                                  type='color'
                                  className='form-control'
                                  name='text-color'
                                  onChange={e =>
                                    this.tableproperties(
                                      e.target.value,
                                      'tabletextcolor'
                                    )
                                  }
                                  defaultValue={
                                    item_result &&
                                    item_result.tablepropertiestextscolor
                                  }
                                />
                                <span className='input-group-addon'>
                                  <img
                                    src='../../images/color-wheel-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </span>
                              </div>
                            </div>
                            <div className='clearfix mar-btm'>
                              <span className='form-label'>
                                Table background
                              </span>
                              <div className='input-group'>
                                <input
                                  type='color'
                                  className='form-control'
                                  name='text-color'
                                  onChange={e =>
                                    this.tableproperties(
                                      e.target.value,
                                      'tablebackground'
                                    )
                                  }
                                  defaultValue={
                                    item_result &&
                                    item_result.tablepropertiesbackground
                                  }
                                />
                                <span className='input-group-addon'>
                                  <img
                                    src='../../images/color-wheel-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </span>
                              </div>
                            </div>
                            <div className='clearfix mar-btm'>
                              <span className='form-label'>
                                Table head background
                              </span>
                              <div className='input-group'>
                                <input
                                  type='color'
                                  className='form-control'
                                  name='text-color'
                                  onChange={e =>
                                    this.tableproperties(
                                      e.target.value,
                                      'tablebackgroundhead'
                                    )
                                  }
                                  defaultValue={
                                    item_result &&
                                    item_result.tablepropertiesbackgroundHead
                                  }
                                />
                                <span className='input-group-addon'>
                                  <img
                                    src='../../images/color-wheel-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </span>
                              </div>
                            </div>
                            <div className='clearfix mar-btm'>
                              <span className='form-label'>
                                Table row background
                              </span>
                              <div className='input-group'>
                                <input
                                  type='color'
                                  className='form-control'
                                  name='text-color'
                                  onChange={e =>
                                    this.tableproperties(
                                      e.target.value,
                                      'tablebackgroundrow'
                                    )
                                  }
                                  defaultValue={
                                    item_result &&
                                    item_result.tablepropertiesbackgroundRow
                                  }
                                />
                                <span className='input-group-addon'>
                                  <img
                                    src='../../images/color-wheel-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </span>
                              </div>
                            </div>
                            <div className='clearfix mar-btm'>
                              <span className='form-label'>
                                Table border color
                              </span>
                              <div className='input-group'>
                                <input
                                  type='color'
                                  className='form-control'
                                  name='text-color'
                                  onChange={e =>
                                    this.tableproperties(
                                      e.target.value,
                                      'tableborder'
                                    )
                                  }
                                  defaultValue={
                                    item_result &&
                                    item_result.tablepropertiesbackgroundBorder
                                  }
                                />
                                <span className='input-group-addon'>
                                  <img
                                    src='../../images/color-wheel-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </span>
                              </div>
                            </div>
                            <span className='form-label fw-sbold w-100 mar-btm'>
                              Table Label
                            </span>
                            <button
                              className='btn btn-blue btn-img mar-btm'
                              onClick={e => this.addLabelResult()}
                              type='button'
                            >
                              <img
                                src='../../images/add-circular-icon.svg'
                                alt='icon'
                                className='mCS_img_loaded'
                              />
                              Add Label
                            </button>
                            {table_label &&
                              table_label.map((res, i) => {
                                return (
                                  
                                  <div className='clearfix mar-btm'>
                                    <span className='editor-label'>
                                      <label className='switch'>
                                        <input
                                          type='checkbox'
                                          defaultChecked={
                                            res.labelstatus !== 'none'
                                              ? 'true'
                                              : ''
                                          }
                                          onChange={e =>{
                                            console.log(res.id)
                                            this.tableLabelScript(
                                              e.target.value,
                                              res.id + 'checked'
                                            )
                                          }}
                                          id={res.id + 'checked'}
                                        />
                                        <span className='drag-ball'>
                                          <span className='off' />
                                          <span className='on' />
                                        </span>
                                      </label>
                                      <span className='form-label'>
                                        {res.labeltitle}
                                      </span>
                                    </span>
                                    <div className='input-group'>
                                      <span className='input-group-addon addon-left fw-500'>
                                        Label
                                      </span>
                                      <input
                                        type='text'
                                        className='form-control'
                                        name='label'
                                        onChange={e =>
                                          this.tableLabelScript(
                                            e.target.value,
                                            res.id + 'title'
                                          )
                                        }
                                        id={res.id + 'title'}
                                        defaultValue={res.labelValue}
                                      />
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                          <div className='form-group clearfix'>
                            <span className='form-label fw-sbold w-100 mar-btm'>
                              Total Properties
                            </span>
                            {table_properties &&
                              table_properties.map((res, i) => {
                                return (
                                  <div className='clearfix mar-btm'>
                                    <span className='editor-label'>
                                      <label className='switch'>
                                        <input
                                          type='checkbox'
                                          defaultChecked={
                                            res.labelstatus !== 'none'
                                              ? 'true'
                                              : ''
                                          }
                                          id={res.id + 'checked'}
                                          onChange={e =>
                                            this.tableLabelScript(
                                              e.target.value,
                                              res.id + 'checked'
                                            )
                                          }
                                        />
                                        <span className='drag-ball'>
                                          <span className='off' />
                                          <span className='on' />
                                        </span>
                                      </label>
                                      <span className='form-label'>
                                        {res.labeltitle}
                                      </span>
                                    </span>
                                    <br />
                                    <div className='input-group'>
                                      <span className='input-group-addon addon-left fw-500'>
                                        Label
                                      </span>
                                      <input
                                        type='text'
                                        className='form-control'
                                        name='label'
                                        id={res.id + 'title'}
                                        onChange={e =>{
                                          console.log(res.labelValue)
                                          this.tableLabelScript(
                                            e.target.value,
                                            res.id + 'title'
                                          )
                                        }}
                                        defaultValue={res.labelValue}
                                      />
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </form>
                      </div>
                      <div id='tab-footer' className='tab-pane fade'>
                        <form className='custom-form'>
                          <div className='form-group clearfix'>
                            <span className='form-label fw-sbold w-100 mar-btm'>
                              Footer Options
                            </span>
                            <div className='clearfix mar-btm'>
                              <span className='form-label'>Text Size</span>
                              <div className='input-group'>
                                <select
                                  className='form-control'
                                  name='text-size'
                                  onChange={e =>
                                    this.footer_functions(
                                      e.target.value,
                                      'textSize'
                                    )
                                  }
                                  defaultValue={
                                    footer_result &&
                                    footer_result.footeroptionstextsize
                                  }
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                </select>

                                <span className='input-group-addon fw-500'>
                                  pt
                                </span>
                              </div>
                            </div>

                            <div className='clearfix mar-btm'>
                              <span className='form-label'>Text Align</span>
                              <div className='input-group'>
                                <select
                                  className='form-control'
                                  onChange={e =>
                                    this.alignmentProperties(
                                      e.target.value,
                                      'footer'
                                    )
                                  }
                                >
                                  <option>left</option>
                                  <option>center</option>
                                  <option>right</option>
                                </select>
                              </div>
                            </div>

                            <div className='clearfix'>
                              <span className='form-label'>Text Color</span>
                              <div className='input-group'>
                                <input
                                  type='color'
                                  className='form-control'
                                  name='text-color'
                                  onChange={e =>
                                    this.footer_functions(
                                      e.target.value,
                                      'textcolor'
                                    )
                                  }
                                  defaultValue={
                                    footer_result &&
                                    footer_result.footeroptionstextcolor
                                  }
                                />
                                <span className='input-group-addon'>
                                  <img
                                    src='../../images/color-wheel-icon.svg'
                                    alt='icon'
                                    className='mCS_img_loaded'
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  defaultChecked={
                                    footer_result &&
                                    footer_result.footeroptionthanksmessagestatus !==
                                      'none'
                                      ? 'true'
                                      : ''
                                  }
                                  id='thankmessage_checkbox'
                                  onChange={e =>
                                    this.footer_functions(
                                      e.target.value,
                                      'thankmessage_checkbox'
                                    )
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>
                                Thank you message and Banking details
                              </span>
                            </span>
                            <textarea
                              className='form-control'
                              placeholder='Thank you'
                              defaultValue={
                                footer_result &&
                                footer_result.footeroptionsthankmessage
                              }
                              onChange={e =>
                                this.footer_functions(
                                  e.target.value,
                                  'thankmessage'
                                )
                              }
                            />
                          </div>

                          <div className='clearfix mar-btm'>
                            <span className='form-label'>Text Align</span>
                            <div className='input-group'>
                              <select
                                className='form-control'
                                onChange={e =>
                                  this.alignmentProperties(
                                    e.target.value,
                                    'thank_u_msg_tag'
                                  )
                                }
                              >
                                <option>left</option>
                                <option>center</option>
                                <option>right</option>
                              </select>
                            </div>
                          </div>

                          <div className='form-group clearfix'>
                            <span className='editor-label'>
                              <label className='switch'>
                                <input
                                  type='checkbox'
                                  defaultChecked={
                                    footer_result &&
                                    footer_result.footertermsstatus !== 'none'
                                      ? 'true'
                                      : ''
                                  }
                                  id='terms_checkbox'
                                  onChange={e =>
                                    this.footer_functions(
                                      e.target.value,
                                      'terms_checkbox'
                                    )
                                  }
                                />
                                <span className='drag-ball'>
                                  <span className='off' />
                                  <span className='on' />
                                </span>
                              </label>
                              <span className='form-label'>
                                Terms &amp; Conditions
                              </span>
                            </span>
                            <div className='input-group mar-btm'>
                              <span className='input-group-addon addon-left fw-500'>
                                Label
                              </span>
                              <input
                                type='text'
                                onChange={e =>
                                  this.footer_functions(e.target.value, 'terms')
                                }
                                className='form-control'
                                name='label'
                                defaultValue={
                                  footer_result &&
                                  footer_result.footertermslabel
                                }
                              />
                            </div>
                            <textarea
                              className='form-control'
                              placeholder='Terms & Conditions'
                              defaultValue={
                                footer_result && footer_result.footertermsText
                              }
                              onChange={e =>
                                this.footer_functions(
                                  e.target.value,
                                  'termsandcond'
                                )
                              }
                            />
                          </div>
                          <div className='clearfix mar-btm'>
                            <span className='form-label'>Text Align</span>
                            <div className='input-group'>
                              <select
                                className='form-control'
                                onChange={e =>
                                  this.alignmentProperties(
                                    e.target.value,
                                    'terms_cond_container'
                                  )
                                }
                              >
                                <option>left</option>
                                <option>center</option>
                                <option>right</option>
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id='mCSB_1_scrollbar_vertical'
                  className='mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical mCSB_scrollTools_onDrag_expand'
                  style={{ display: 'block' }}
                >
                  <div className='mCSB_draggerContainer'>
                    <div
                      id='mCSB_1_dragger_vertical'
                      className='mCSB_dragger'
                      style={{
                        position: 'absolute',
                        minHeight: '30px',
                        display: 'block',
                        height: '15px',
                        maxHeight: '100px',
                        top: '0px'
                      }}
                    >
                      <div
                        className='mCSB_dragger_bar'
                        style={{ lineHeight: '30px' }}
                      />
                    </div>
                    <div className='mCSB_draggerRail' />
                  </div>
                </div>
              </div>
              <div className='btn-wrap text-right hidden-xs'>
                <button
                  className='btn btn-lightgray'
                  type='button'
                  onClick={() => this.get_all_settings()}
                >
                  Preview
                </button>
                <div className='custom-select-drop dropdown btn dropup'>
                  <a
                    aria-expanded='false'
                    aria-haspopup='true'
                    role='button'
                    data-toggle='dropdown'
                    className='dropdown-toggle btn btn-green'
                    href='#'
                  >
                    <span id='selected'>Save</span>
                    <span className='caret' />
                  </a>
                  <ul className='dropdown-menu'>
                    <li className='active'>
                      <a
                        onClick={this.save_andContinue} // data-toggle='modal'
                        // data-target='#successModal'
                      >
                        Save
                      </a>
                    </li>
                    <li>
                      <a onClick={this.save_andContinue}>Save &amp; Continue</a>
                    </li>
                    <li>
                      <a onClick={this.save_draft}>Save as Copy</a>
                    </li>
                    <li>
                      <a onClick={this.save_draft}>Save Draft</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Builder Left Ends here */}
            <div className='builder-right'>
              <form className='custom-form template-name'>
                <input
                  className='form-control'
                  type='text'
                  name='title'
                  placeholder='Template title'
                  id='template_title'
                  defaultValue='test'
                />
              </form>
              <a href='../invoice_templates' className='close-btn'>
                <img
                  className='img-responsive'
                  src='../../images/close-circle-red.svg'
                />
              </a>
              <div id='get_content'>
                {this.state.html_content != ''
                  ? parse(this.state.html_content)
                  : ''}
              </div>

              <div className='zoom-btn'>
                <a href='#' className='plus'>
                  <img src='../../images/zoom-in.svg' alt='icon' />
                </a>
                <a href='#' className='minus'>
                  <img src='../../images/zoom-out.svg' alt='icon' />
                </a>
              </div>
              <div className='btn-wrap text-right visible-xs'>
                <button className='btn btn-lightgray'>Preview</button>
                <div className='custom-select-drop dropdown btn ' >
                  <a
                    aria-expanded='false'
                    aria-haspopup='true'
                    role='button'
                    data-toggle='dropdown'
                    className='dropdown-toggle btn btn-green'
                    href='#'
                  >
                    <span id='selected'>Save</span>
                    <span className='caret'></span>
                  </a>
                  <ul className='dropdown-menu'>
                    <li className='active'>
                      <a href='#'>Save</a>
                    </li>
                    <li>
                      <a href='#'>Save & Continue</a>
                    </li>
                    <li>
                      <a href='#'>Save as Copy</a>
                    </li>
                    <li>
                      <a href='#'>Save Draft</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Wrapper Ends here */}
        {/* Modal Wrapper Starts here */}

        <div className='modal fade' id='successModal' role='dialog'>
          <div className='modal-dialog modal-md'>
            {/* Modal content*/}
            <button
              type='button'
              className='close hidden-xs'
              data-dismiss='modal'
            >
              <img
                className='img-responsive'
                src='../../images/close-red.svg'
                alt='icon'
              />
            </button>
            <div className='modal-content'>
              <div className='modal-body text-center success-modal'>
                <div className='pop-icon'>
                  <img
                    src='../../images/template-success-icon.png'
                    alt='icon'
                  />
                </div>
                <h3>Awesome!</h3>
                <p className='fw-500'>
                  Your invoice template has been saved successfully
                </p>
                <button className='btn btn-green' data-dismiss='modal'>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Wrapper Ends here */}
      </div>
    )
  }
}

export default custom_editable_template
