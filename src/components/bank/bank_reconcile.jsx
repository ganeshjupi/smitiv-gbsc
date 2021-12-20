import React from 'react'
// import FetchAllApi from '../api_links/fetch_all_api'

import jQuery from 'jquery'

class BankReconcileCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidMount() {

  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    } else {
      return (
        <div className='container-fluid create-match'>
          <div className='row reconcile-sticky'>
            <div className='container reconcile-body pad-no'>
              <h3 className='col-md-12'>Create Match</h3>
              <a className='close-btn' onClick={() => {
                this.props.history.push('/bank-reconcile-match')
              }}>
                <img
                  className='img-responsive'
                  src='images/close-circle-red.svg'
                />
              </a>
              <div className='col-md-12 reconcile-item-encl'>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                  <div className='row reconcile-item'>
                    <div className='col-md-6 col-xs-6 pad-l-no'>
                      <p>23 Apr 2020</p>
                      <p>Ridgeway University</p>
                      <p>Ref: 0045</p>
                      <p className='more'>
                        <a href='javascript:;'>More</a>
                        <span className='more-detail'>
                          <span>
                            <strong>Memo:</strong> Lorem ipsum dolor seit
                          </span>
                          <span>
                            <strong>Transaction Type:</strong> Direct Deposit
                          </span>
                          <span>
                            <strong>Cheque No:</strong> -
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className='col-md-3 col-xs-3 pad-l-no text-right'>
                      <p>-</p>
                    </div>
                    <div className='col-md-3 col-xs-3 pad-l-no pad-r-no text-right'>
                      <p>6,187.50</p>
                    </div>
                    <p className='create-rule'>
                      <a href='javascript:;'>Create Bank Rule</a>
                    </p>
                    <a href='javascript:;' className='remove-item'>
                      <img
                        className='img-responsive'
                        src='images/delete-icon.svg'
                        alt='icon'
                      />
                    </a>
                  </div>
                </div>
                <button className='btn btn-green match-btn'>
                  <img
                    className='filter-white'
                    src='images/tick-big.svg'
                    alt='icon'
                  />
                </button>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                  <div className='row transact-item'>
                    <button className='btn btn-white find-match'>
                      Find &amp; Match
                    </button>
                    <ul className='nav nav-tabs'>
                      <li className='active'>
                        <a
                          className='match-trans'
                          data-toggle='tab'
                          href='#match'
                        >
                          Match
                        </a>
                      </li>
                      <li>
                        <a
                          className='create-trans'
                          data-toggle='tab'
                          href='#create'
                        >
                          Create
                        </a>
                      </li>
                    </ul>
                    <div className='tab-content'>
                      <div id='match' className='tab-pane fade in active'>
                        <div className='row'>
                          <div className='col-md-6 col-xs-6'>
                            <p>23 Apr 2020</p>
                            <p>Ridgeway University</p>
                            <p>Ref: 0045</p>
                          </div>
                          <div className='col-md-3 col-xs-3 text-right'>
                            <p>-</p>
                          </div>
                          <div className='col-md-3 col-xs-3 text-right'>
                            <p>6,187.50</p>
                          </div>
                        </div>
                      </div>
                      <div id='create' className='tab-pane fade in'>
                        <div className='row'>
                          <div className='col-md-12'>
                            <button className='btn-small btn btn-blue'>
                              <img
                                className='filter-white mar-rgt-5'
                                src='images/plus-add.svg'
                                alt='icon'
                              />
                              Add Transactions
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row create-match-body'>
            <div className='content-sec container inbox-listing'>
              <div className='col-md-12 col-xs-12 scanned-wrap'>
                <p className='visible-xs note-content'>
                  This feature cant use in mobile. Please use Desktop
                </p>
                <div className='col-lg-6 col-md-12 col-xs-12 scanned-left hidden-xs'>
                  <div className='doc-wrap'>
                    <div className='scanned-file no-data'>
                      <img
                        className='img-responsive mar-auto'
                        src='images/no-data.svg'
                        alt='img'
                      />
                      <p>Looks like there's no receipt</p>
                    </div>
                    <form className='comment-sec'>
                      <textarea
                        cols={3}
                        rows={5}
                        className='form-control'
                        placeholder='Comments'
                        defaultValue={''}
                      />
                      <button className='btn btn-green' type='submit'>
                        Send
                      </button>
                    </form>
                    <div className='comments-wrap'>
                      <div className='comment-sec col-md-12 col-xs-12 pad-no'>
                        <div className='avatar-img'>
                          <img
                            className='img-responsive'
                            src='images/avatar-1.png'
                            alt='AvatarIMG'
                          />
                        </div>
                        <div className='comment-cont'>
                          <span className='label label-success'>Resolved</span>
                          <span className='col-md-12 col-xs-12 pad-no user-name'>
                            Harvey Dean
                          </span>
                          <span className='col-md-12 col-xs-12 pad-no date'>
                            4 hrs ago
                          </span>
                          <p className='col-md-12 col-xs-12 pad-no comment-txt'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore
                          </p>
                          <a
                            href='javascript:;'
                            className='pull-left reply-link'
                          >
                            Reply
                          </a>
                          <form className='col-md-12 col-xs-12 pad-no reply-form'>
                            <textarea
                              className='col-md-12 col-xs-12'
                              placeholder='Reply...'
                              defaultValue={''}
                            />
                            <div className='pull-right'>
                              <a href='javascript:;' className=' btn btn-empty'>
                                <img src='images/attach-icon.svg' alt='icon' />
                              </a>
                              <button type='submit' className='btn btn-green'>
                                <img src='images/reply-icon.svg' alt='icon' />
                                Reply
                              </button>
                            </div>
                          </form>
                          <div className='reply-cont col-md-12 col-xs-12'>
                            <div className='col-md-12 col-xs-12 pad-no'>
                              <div className='avatar-img'>
                                <img
                                  className='img-responsive'
                                  src='images/avatar-2.png'
                                  alt='AvatarIMG'
                                />
                              </div>
                              <div className='reply-user'>
                                <span className='col-md-12 col-xs-12 pad-no user-name'>
                                  Mattie Howell
                                </span>
                                <span className='col-md-12 col-xs-12 pad-no date'>
                                  3 hrs ago
                                </span>
                              </div>
                              <div className='dropdown menu-item'>
                                <a
                                  href='javascript'
                                  className='dropdown-toggle'
                                  data-toggle='dropdown'
                                >
                                  <img src='images/menu-dot.svg' alt='icon' />
                                </a>
                                <ul className='dropdown-menu'>
                                  <li>
                                    <a href='javascript:;'>Edit</a>
                                  </li>
                                  <li>
                                    <a href='javascript:;'>Delete</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <p className='col-md-12 col-xs-12 pad-no comment-txt'>
                              Excepteur sint occaecat cupidatat non proident,
                              sunt in culpa qui officia deserunt mollit anim
                            </p>
                            <div className='attachment-item col-md-12 col-xs-12 pad-no'>
                              <a href='javascript:;'>
                                <img src='images/pdf-icon.png' alt='PDF' />
                                <span>Bill-payment.pdf</span>
                              </a>
                              <a href='javascript:;'>
                                <img src='images/img-icon.png' alt='PDF' />
                                <span>Taxi-bill.png</span>
                              </a>
                            </div>
                          </div>
                          <div className='col-md-12 col-xs-12 pad-no'>
                            <button className='btn btn-lightgray'>
                              Resolved
                            </button>
                            <a href='javascript:;' className='reply-link'>
                              Reply
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='comment-sec col-md-12 col-xs-12 pad-no'>
                        <div className='avatar-img'>
                          <img
                            className='img-responsive'
                            src='images/avatar-2.png'
                            alt='AvatarIMG'
                          />
                        </div>
                        <div className='comment-cont'>
                          <span className='col-md-12 col-xs-12 pad-no user-name'>
                            Sharlene May
                          </span>
                          <span className='col-md-12 col-xs-12 pad-no date'>
                            35 min ago
                          </span>
                          <p className='col-md-12 col-xs-12 pad-no comment-txt'>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium
                          </p>
                          <a
                            href='javascript:;'
                            className='pull-left reply-link'
                          >
                            Reply
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-md-12 col-xs-12 scanned-right hidden-xs'>
                  <form className='data-feed'>
                    <div className='form-group col-md-12 col-xs-12'>
                      <label>Company Name</label>
                      <input
                        type='text'
                        name='company-name'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group col-md-6 col-sm-6'>
                      <label>invoice No</label>
                      <input
                        type='text'
                        name='invoice-no'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group col-md-6 col-sm-6'>
                      <label>Date</label>
                      <input type='text' name='date' className='form-control' />
                    </div>
                    <div className='form-group col-md-12 col-xs-12'>
                      <label>Address</label>
                      <textarea
                        cols={3}
                        rows={5}
                        className='form-control'
                        defaultValue={''}
                      />
                    </div>
                    <div className='form-group col-md-6 col-sm-6'>
                      <label>Currency</label>
                      <div className='custom-select-drop dropdown'>
                        <a
                          aria-expanded='false'
                          aria-haspopup='true'
                          role='button'
                          data-toggle='dropdown'
                          className='dropdown-toggle btn'
                          href='javascript:;'
                        >
                          <span id='selected'>USD</span>
                          <span className='caret' />
                        </a>
                        <ul className='dropdown-menu'>
                          <li className='active'>
                            <a href='javascript:;'>USD</a>
                          </li>
                          <li>
                            <a href='javascript:;'>SGD</a>
                          </li>
                          <li>
                            <a href='javascript:;'>INR</a>
                          </li>
                          <li>
                            <a href='javascript:;'>AED</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='form-group col-md-6 col-sm-6'>
                      <label>Account Category</label>
                      <div className='custom-select-drop dropdown'>
                        <a
                          aria-expanded='false'
                          aria-haspopup='true'
                          role='button'
                          data-toggle='dropdown'
                          className='dropdown-toggle btn'
                          href='javascript:;'
                        >
                          <span id='selected'>Choose Category</span>
                          <span className='caret' />
                        </a>
                        <ul className='dropdown-menu category'>
                          <li>
                            <input
                              type='text'
                              name='search'
                              className='form-control'
                              placeholder='Search'
                            />
                            <button
                              type='button'
                              className='btn btn-rounded btn-blue'
                              data-toggle='modal'
                              data-target='#pop-modal'
                            >
                              Create New{' '}
                              <span className='fw-sbold'>"Loan"</span>
                              <img
                                className='arrow-icon'
                                src='images/right-arrow.svg'
                                alt='icon'
                              />
                            </button>
                          </li>
                          <li>
                            <ul className='list-unstyled'>
                              <li className='li-head'>Bank Fees</li>
                              <li>
                                <a href='javascript:;'>Interest</a>
                              </li>
                              <li>
                                <a href='javascript:;'>Service Charges</a>
                              </li>
                              <li>
                                <a href='javascript:;'>Transaction Fee</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <ul className='list-unstyled'>
                              <li className='li-head'>Utility</li>
                              <li>
                                <a href='javascript:;'>Phone</a>
                              </li>
                              <li>
                                <a href='javascript:;'>Electricity</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='form-group col-md-6 col-sm-6'>
                      <label>GST</label>
                      <div className='custom-select-drop dropdown'>
                        <a
                          aria-expanded='false'
                          aria-haspopup='true'
                          role='button'
                          data-toggle='dropdown'
                          className='dropdown-toggle btn'
                          href='javascript:;'
                        >
                          <span id='selected'>Standard-Rated Supplies</span>
                          <span className='caret' />
                        </a>
                        <ul className='dropdown-menu'>
                          <li className='add-new'>
                            <input
                              type='text'
                              name='search'
                              className='form-control'
                              placeholder='Search'
                            />
                            <button
                              type='button'
                              className='btn btn-rounded btn-blue'
                              data-toggle='modal'
                              data-target='#pop-modal-1'
                            >
                              Create New{' '}
                              <span className='fw-sbold'>"Text"</span>
                              <img
                                className='arrow-icon'
                                src='images/right-arrow.svg'
                                alt='icon'
                              />
                            </button>
                          </li>
                          <li className='active'>
                            <a href='javascript:;'>Standard-Rated Supplies</a>
                          </li>
                          <li>
                            <a href='javascript:;'>Zero-Rated Supplies</a>
                          </li>
                          <li>
                            <a href='javascript:;'>Exempt Supplies</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='form-group col-md-6 col-sm-6'>
                      <span className='form-label clearfix'>Taxes</span>
                      <label className='custom-checkbox'>
                        <input type='checkbox' defaultChecked='checked' />{' '}
                        Including Tax
                        <span className='checkmark' />
                      </label>
                    </div>
                    <div className='form-table mar-top'>
                      <table>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Items</th>
                            <th>Oty</th>
                            <th>Sub Total</th>
                            <th>Category</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>01</td>
                            <td>Cafe Latte</td>
                            <td>01</td>
                            <td>35,000</td>
                            <td>
                              <div className='custom-select-drop dropdown'>
                                <a
                                  aria-expanded='false'
                                  aria-haspopup='true'
                                  role='button'
                                  data-toggle='dropdown'
                                  className='dropdown-toggle btn'
                                  href='javascript:;'
                                >
                                  <span id='selected'>Choose Category</span>
                                  <span className='caret' />
                                </a>
                                <ul className='dropdown-menu category'>
                                  <li>
                                    <input
                                      type='text'
                                      name='search'
                                      className='form-control'
                                      placeholder='Search'
                                    />
                                    <button
                                      type='button'
                                      className='btn btn-rounded btn-blue'
                                    >
                                      Create New{' '}
                                      <span className='fw-sbold'>"Loan"</span>
                                      <img
                                        className='arrow-icon'
                                        src='images/right-arrow.svg'
                                        alt='icon'
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <ul className='list-unstyled'>
                                      <li className='li-head'>Bank Fees</li>
                                      <li>
                                        <a href='javascript:;'>Interest</a>
                                      </li>
                                      <li>
                                        <a href='javascript:;'>
                                          Service Charges
                                        </a>
                                      </li>
                                      <li>
                                        <a href='javascript:;'>
                                          Transaction Fee
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul className='list-unstyled'>
                                      <li className='li-head'>Utility</li>
                                      <li>
                                        <a href='javascript:;'>Phone</a>
                                      </li>
                                      <li>
                                        <a href='javascript:;'>Electricity</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>02</td>
                            <td>Creamcheese Walnut Bread</td>
                            <td>01</td>
                            <td>40,000</td>
                            <td>
                              <div className='custom-select-drop dropdown'>
                                <a
                                  aria-expanded='false'
                                  aria-haspopup='true'
                                  role='button'
                                  data-toggle='dropdown'
                                  className='dropdown-toggle btn'
                                  href='javascript:;'
                                >
                                  <span id='selected'>Choose Category</span>
                                  <span className='caret' />
                                </a>
                                <ul className='dropdown-menu category'>
                                  <li>
                                    <input
                                      type='text'
                                      name='search'
                                      className='form-control'
                                      placeholder='Search'
                                    />
                                    <button
                                      type='button'
                                      className='btn btn-rounded btn-blue'
                                    >
                                      Create New{' '}
                                      <span className='fw-sbold'>"Loan"</span>
                                      <img
                                        className='arrow-icon'
                                        src='images/right-arrow.svg'
                                        alt='icon'
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <ul className='list-unstyled'>
                                      <li className='li-head'>Bank Fees</li>
                                      <li>
                                        <a href='javascript:;'>Interest</a>
                                      </li>
                                      <li>
                                        <a href='javascript:;'>
                                          Service Charges
                                        </a>
                                      </li>
                                      <li>
                                        <a href='javascript:;'>
                                          Transaction Fee
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul className='list-unstyled'>
                                      <li className='li-head'>Utility</li>
                                      <li>
                                        <a href='javascript:;'>Phone</a>
                                      </li>
                                      <li>
                                        <a href='javascript:;'>Electricity</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <a href='javascript:;' className='add-col'>
                        <img src='images/plus-icon.svg' alt='icon' />
                      </a>
                    </div>
                    <div className='form-group currency-label'>
                      <span>Foreign Currency (USD)</span>
                      <span>Home Currency (SGD)</span>
                    </div>
                    <div className='form-group total-input'>
                      <label>Item Total</label>
                      <div>
                        <input
                          type='text'
                          name='item-total-fc'
                          className='form-control'
                        />
                        <input
                          type='text'
                          name='item-total-hc'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='form-group total-input'>
                      <label>Tax</label>
                      <div>
                        <input
                          type='text'
                          name='tax-total-fc'
                          className='form-control'
                        />
                        <input
                          type='text'
                          name='tax-total-hc'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='form-group total-input'>
                      <label>Grand Total</label>
                      <div>
                        <input
                          type='text'
                          name='grand-total-fc'
                          className='form-control'
                        />
                        <input
                          type='text'
                          name='grand-total-hc'
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='form-group total-input'>
                      <label>Category</label>
                      <div style={{ paddingLeft: '5px' }}>
                        <div className='custom-select-drop dropdown'>
                          <a
                            aria-expanded='false'
                            aria-haspopup='true'
                            role='button'
                            data-toggle='dropdown'
                            className='dropdown-toggle btn'
                            href='javascript:;'
                          >
                            <span id='selected'>Choose Category</span>
                            <span className='caret' />
                          </a>
                          <ul className='dropdown-menu'>
                            <li>
                              <a href='javascript:;'>Accounts Payable</a>
                            </li>
                            <li>
                              <a href='javascript:;'>Accounts Receivable</a>
                            </li>
                            <li>
                              <a href='javascript:;'>Paid</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='form-group exchange-rate'>
                      <label>Exchange Rate 1 USD</label>
                      <div>
                        <input
                          type='text'
                          name='exchangeRate'
                          className='form-control text-right'
                          defaultValue='1.38'
                        />
                        <span className='label'>SGD</span>
                      </div>
                    </div>
                    <div className='form-group total-input text-right'>
                      <div className='submit-enclose'>
                        {/* <button className='btn btn-gray' type='submit'>
                          Clear
                        </button>
                        <button className='btn btn-yellow' type='submit'>
                          Save Draft
                        </button> */}
                        <button className='btn btn-green' type='submit'>
                          Save &amp; Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>


        </div>
      )
    }
  }
}

export default BankReconcileCreate
