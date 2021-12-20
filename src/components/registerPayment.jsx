import React, { Component } from 'react'
import jQuery from 'jquery'
import DatePicker from 'react-datepicker'

import FetchAllApi from '../api_links/fetch_all_api'
import 'react-datepicker/dist/react-datepicker.css'

export default class registerPayment extends React.Component {
  constructor (props) {
    super(props)
    //const { history } = this.props;
    this.state = {
      standardAmount: 0,

      standard: 0,
      Advanced: 0,
      premium: 0,
      itemTotal: '',
      Data: [],
      months: 1,
      PrevAmount: 0
    }
  }
  callMe = () => {
    // let k = this.state.standardAmount + 2.18;
    // let res = k.toFixed(2);
    // this.setState({ itemTotal: res });
  }
  calculate = e => {
    this.setState({
      months: Number(e.target.value),

      standardAmount: Number(
        Number(e.target.value) * this.state.PrevAmount
      ).toFixed(2)
    })
  }
  componentDidUpdate () {
    window.jQuery('.selectpicker').selectpicker('refresh')
    // jQuery("#currency_selected").val(4);
  }
  componentDidMount () {
    this.getData()
    var THIS = this
    jQuery(document).on('click', '.callthislist', function () {
      THIS.setState({
        standardAmount: Number(THIS.state.months * THIS.state.standard).toFixed(
          2
        ),
        PrevAmount: Number(THIS.state.months * THIS.state.standard).toFixed(2)
      })
      THIS.callMe()
    })

    jQuery(document).on('click', '.callme2', function () {
      THIS.setState({
        standardAmount: Number(THIS.state.months * THIS.state.Advanced).toFixed(
          2
        ),
        PrevAmount: Number(THIS.state.months * THIS.state.Advanced).toFixed(2)
      })
      THIS.callMe()
    })

    jQuery(document).on('click', '.callme3', function () {
      THIS.setState({
        standardAmount: Number(THIS.state.months * THIS.state.premium).toFixed(
          2
        ),
        PrevAmount: Number(THIS.state.months * THIS.state.premium).toFixed(2)
      })
      THIS.callMe()
    })

    jQuery(document).ready(function () {
      jQuery('button').click(function () {
        jQuery('#paynow').addClass('hide')
        jQuery('#cart').removeClass('hide')
      })

      jQuery('a').click(function () {
        jQuery('#cart').addClass('hide')
        jQuery('#paynow').removeClass('hide')
      })

      jQuery('.plan-list > ul > li.active .plan-detail').css('display', 'block')
      jQuery('.plan-list > ul > li').click(function () {
        jQuery(this)
          .siblings()
          .removeClass('active')
          .find('.plan-detail')
          .slideUp()
        jQuery(this)
          .addClass('active')
          .find('.plan-detail')
          .slideDown()
      })
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  getData = () => {
    FetchAllApi.getData((err, response) => {
      if (response.status === 1) {
        for (let i = 0; i < response.list.length; i++) {
          // standard:'',
          // Advanced:'',
          // premium:'',

          if (response.list[i].name == 'standard') {
            this.setState({ standard: response.list[i].price_per_year ,standardAmount:response.list[i].price_per_year,PrevAmount:response.list[i].price_per_year})
          }

          if (response.list[i].name == 'advanced') {
            this.setState({ Advanced: response.list[i].price_per_year })
          }
          if (response.list[i].name == 'Premium') {
            this.setState({ premium: response.list[i].price_per_year })
          }
        }

        this.setState({ Data: response.subplandata })
      } else {
      }
    })
  }

  render () {
    console.log('qwerty', this.state.entitynum)
    return (
      <div>
        <div className='container-fluid'>
          <div className='row dflex'>
            <div className='col-md-7 plan-left'>
              <div className='register-head col-md-12 col-xs-12'>
                <a href='javascript:;' className='back hidden-xs' onClick={()=>{
                  this.props.history.push('/register_finished')
                }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18.5'
                    height='14.249'
                    viewBox='0 0 18.5 14.249'
                  >
                    <g
                      id='left-arrow_2_'
                      data-name='left-arrow (2)'
                      transform='translate(0 -58.83)'
                    >
                      <g
                        id='Group_25'
                        data-name='Group 25'
                        transform='translate(0 65.207)'
                      >
                        <g
                          id='Group_24'
                          data-name='Group 24'
                          transform='translate(0 0)'
                        >
                          <path
                            id='Path_19'
                            data-name='Path 19'
                            d='M17.753,235.318H.747a.747.747,0,0,0,0,1.495H17.753a.747.747,0,0,0,0-1.495Z'
                            transform='translate(0 -235.318)'
                          />
                        </g>
                      </g>
                      <g
                        id='Group_27'
                        data-name='Group 27'
                        transform='translate(0 58.83)'
                      >
                        <g
                          id='Group_26'
                          data-name='Group 26'
                          transform='translate(0 0)'
                        >
                          <path
                            id='Path_20'
                            data-name='Path 20'
                            d='M1.8,65.954l5.849-5.849A.747.747,0,1,0,6.6,59.049L.219,65.426a.747.747,0,0,0,0,1.057L6.6,72.86A.747.747,0,1,0,7.653,71.8Z'
                            transform='translate(0 -58.83)'
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
                <span>
                  You're Almost Done!
                  <br />
                  <small>Choose your plan & pay</small>
                </span>
                <div className='pull-right nav-brand'>
                  <img
                    className='img-responsive'
                    src='images/logo-genie.png'
                    alt='Logo'
                  />
                </div>
              </div>
              <div className='plan-list col-md-12 col-xs-12'>
                <ul className='list-unstyled col-md-12 col-xs-12 pad-no'>
                  <li className='col-md-12 col-xs-12 active callthislist'>
                    <div className='plan-title'>
                      <span>
                        <img src='images/circle-tick-green.svg' alt='icon' />
                        Standard
                      </span>
                      <span className='price'>$ {this.state.standard}</span>
                    </div>
                    <div className='plan-detail'>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam
                      </p>
                      <ul className='list-unstyled'>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Accounts Receivables
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Accounts Payable
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Bill of Entry
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          GST Filing
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Multi Currency Handling
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Inventory Management
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Predefined User Roles
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Import PDF Statement
                        </li>
                      </ul>
                      <a>
                        {' '}
                        <span className='price-box'>
                          $ {this.state.standard}
                        </span>
                      </a>
                      <span className='note'>
                        *Billed annually or $ {this.state.standard}{' '}
                        month-to-month
                      </span>
                    </div>
                  </li>

                  <li className='col-md-12 col-xs-12 callme2'>
                    <div className='plan-title'>
                      <span>
                        <img src='images/circle-tick-green.svg' alt='icon' />
                        Advanced
                      </span>
                      <a>
                        <span className='price'>$ {this.state.Advanced}</span>
                      </a>
                    </div>
                    <div className='plan-detail'>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam
                      </p>
                      <ul className='list-unstyled'>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Accounts Receivables
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Accounts Payable
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Bill of Entry
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          GST Filing
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Multi Currency Handling
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Inventory Management
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Predefined User Roles
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Import PDF Statement
                        </li>
                      </ul>
                      <a></a>{' '}
                      <span className='price-box'>
                        $ {this.state.Advanced}{' '}
                      </span>
                      <span className='note'>
                        *Billed annually or ${this.state.Advanced}{' '}
                        month-to-month
                      </span>
                    </div>
                  </li>
                  <li className='col-md-12 col-xs-12 callme3'>
                    <div className='plan-title'>
                      <span>
                        <img src='images/circle-tick-green.svg' alt='icon' />
                        Premium
                      </span>
                      <span className='price' id='premium'>
                        $ {this.state.premium}
                      </span>
                    </div>
                    <div className='plan-detail'>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam
                      </p>
                      <ul className='list-unstyled'>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Accounts Receivables
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Accounts Payable
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Bill of Entry
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          GST Filing
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Multi Currency Handling
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Inventory Management
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Predefined User Roles
                        </li>
                        <li>
                          <img src='images/blue-tick.svg' alt='icon' />
                          Import PDF Statement
                        </li>
                      </ul>
                      <span className='price-box'>$ {this.state.premium}</span>
                      <span className='note'>
                        *Billed annually or $ {this.state.premium}month-to-month
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-md-5 col-xs-12 payment-right'>
              <div className='col-md-12 col-xs-12'>
                <div
                  id='paynow'
                  className='cart-enclose col-md-12 col-xs-12 pad-no'
                >
                  <div className='text-center cart-head col-md-12 col-xs-12 pad-no'>
                    <img src='images/notepad-icon.svg' alt='Icon' />
                    <span>Your subscription details</span>
                  </div>
                  <table className='table cart-table'>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th className='text-center'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Standard Plan <small>(With Genie Accountant)</small>
                          <br />
                          <select
                            className='select-dropdown selectpicker'
                            onChange={this.calculate}
                          >
                            {this.state.Data.map(item => {
                              return (
                                <option value={item.planperoid}>
                                  {item.name}
                                </option>
                              )
                            })}
                          </select>
                        </td>
                        <td className='amount text-center'>
                          $ {this.state.standardAmount}
                          <small>/mo</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className='table total no-borderd'>
                    <tbody>
                      <tr>
                        <td>Item Total</td>
                        <td>$ {this.state.standardAmount}</td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td>$ 0.00</td>
                      </tr>
                      <tr>
                        <td>Grand Total</td>
                        <td className='grand-total'>
                          $ {this.state.standardAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className='col-md-12 col-xs-12 text-center'>
                    <button className='btn btn-blue btn-rounded'>
                      Pay Now
                    </button>
                  </div>
                </div>

                <div id='cart' className='hide col-md-12 col-xs-12 pad-no'>
                  <div className='text-center cart-head col-md-12 col-xs-12 pad-no'>
                    <img src='images/creditcard-icon.svg' alt='Icon' />
                    <span>
                      Payable Amount{' '}
                      <span className='amount'>$ {this.state.itemTotal}</span>
                    </span>
                  </div>
                  <div className='col-md-12 col-xs-12 pad-no'>
                    <form className='custom-form pay-form'>
                      <div className='form-group'>
                        <label>Card Holder's Name</label>
                        <input
                          type='text'
                          name='c-name'
                          placeholder='Eg: John Smith'
                          className='form-control'
                        />
                      </div>
                      <div className='form-group'>
                        <label>Card Number</label>
                        <input
                          type='text'
                          name='c-num'
                          placeholder='XXXX XXXX XXXX XXXX'
                          className='form-control'
                        />
                        <div className='card-type'>
                          <img src='images/visa-icon.svg' alt='icon' />
                        </div>
                      </div>
                      <div className='col-md-12 col-xs-12 pad-no'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Expiration</label>
                              <input
                                type='text'
                                name='c-exp'
                                placeholder='MM/YYYY'
                                className='form-control'
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>CVV / CVC</label>
                              <input
                                type='text'
                                name='c-cvv'
                                placeholder=''
                                className='form-control'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-12 col-xs-12 pad-no text-center'>
                        <button className='btn btn-blue full-w'>
                          Pay Now $ {this.state.itemTotal}
                        </button>
                        <a href='javascript:;' className='text-link'>
                          <img src='images/back-arrow-small.svg' alt='icon' />
                          Back
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
