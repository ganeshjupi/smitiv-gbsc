import React from 'react'
// import FetchAllApi from '../api_links/fetch_all_api'

import jQuery from 'jquery'

class FindMatchTrans extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidMount() {


    jQuery(document).ready(function () {
      jQuery(".left-navmenu .has-sub").click(function () {
        jQuery(".left-navmenu li a").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".left-navmenu li a:not(.active)").siblings(".sub-menu").slideUp();
        jQuery(this).siblings(".sub-menu").slideToggle();
      });
      jQuery(".left-navmenu .sub-menu li a").click(function () {
        jQuery(".left-navmenu .sub-menu li a").removeClass("active");
        jQuery(this).addClass("active");
      });
      jQuery(".search-btn").click(function () {
        jQuery(".hdr-search").addClass("active");
      });
      jQuery(".hdr-search .close-icon").click(function () {
        jQuery(".hdr-search").removeClass("active");
      });
      window.jQuery(".select-picker").selectpicker();
      jQuery(".label-enclose .label").click(function () {
        jQuery(this).toggleClass("active");
      });
      jQuery(".nav-brand-res").click(function () {
        jQuery(".left-navbar").addClass("active");
      });
      jQuery(".menu-close").click(function () {
        jQuery(".left-navbar").removeClass("active");
      });
      // jQuery('.custom-select-drop .dropdown-menu a').click(function(){
      //     jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass("active");
      //     jQuery(this).parent("li").addClass("active");
      //     jQuery('.open #selected').text(jQuery(this).text());
      // });

      window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy",autoclose:true });

      jQuery('[data-toggle="tooltip"]').tooltip();

      jQuery(".collapse.in").each(function () {
        jQuery(this).siblings(".panel-heading").find(".accordion-arrow").addClass("rotate");
      });

      // Toggle plus minus icon on show hide of collapse element
      jQuery(".collapse").on('show.bs.collapse', function () {
        jQuery(this).parent().find(".accordion-arrow").addClass("rotate");
      }).on('hide.bs.collapse', function () {
        jQuery(this).parent().find(".accordion-arrow").removeClass("rotate");
      });

      jQuery(".create-trans").click(function () {
        jQuery(this).parents(".transact-item").addClass("blue");
      })
      jQuery(".match-trans").click(function () {
        jQuery(this).parents(".transact-item").removeClass("blue");
      })

      jQuery(".adjustment").click(function () {
        jQuery(".adjust-form").slideToggle(200);
      });

      jQuery(".adjust-form .remove-item").click(function () {
        jQuery(".adjust-form").slideUp(200);
      });

      var lastScroll = 0;

      jQuery(document).ready(function (jQuery) {
        //jQuery(".reconcile-sticky").addClass("shrink");

        jQuery(window).scroll(function () {
          var scroll = jQuery(window).scrollTop();
          if (scroll > lastScroll) {
            jQuery(".reconcile-sticky").addClass("shrink");
          } else if (scroll < lastScroll) {
            jQuery(".reconcile-sticky").removeClass("shrink");
          }
          lastScroll = scroll;
        });
      });


    });


  }
  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    } else {
      return (
        <div className="container-fluid create-match">
          <div className="row reconcile-sticky">
            <div className="container reconcile-body pad-no">
              <h3 className="col-md-12">Create Match</h3>
              <a onClick={
                () => {
                  this.props.history.goBack()()()
                }
              } className="close-btn"><img className="img-responsive" src="images/close-circle-red.svg" /></a>
              <div className="col-md-12 reconcile-item-encl">
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="row reconcile-item">
                    <div className="col-md-6 col-xs-6 pad-l-no">
                      <p>23 Apr 2020</p>
                      <p>Ridgeway University</p>
                      <p>Ref: 0045</p>
                      <p className="more">
                        <a href="javascript:;">More</a>
                        <span className="more-detail">
                          <span><strong>Memo:</strong> Lorem ipsum dolor seit</span>
                          <span><strong>Transaction Type:</strong> Direct Deposit</span>
                          <span><strong>Cheque No:</strong> -</span>
                        </span>
                      </p>
                    </div>
                    <div className="col-md-3 col-xs-3 pad-l-no text-right">
                      <p>-</p>
                    </div>
                    <div className="col-md-3 col-xs-3 pad-l-no pad-r-no text-right">
                      <p>6,187.50</p>
                    </div>
                    <p className="create-rule">
                      <a href="javascript:;">Create Bank Rule</a>
                    </p>
                    <a href="javascript:;" className="remove-item">
                      <img className="img-responsive" src="images/delete-icon.svg" alt="icon" />
                    </a>
                  </div>
                </div>
                <button className="btn btn-green match-btn">
                  <img className="filter-white" src="images/tick-big.svg" alt="icon" />
                </button>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="row transact-item">
                    <button className="btn btn-white find-match">Find &amp; Match</button>
                    <ul className="nav nav-tabs">
                      <li className="active"><a className="match-trans" data-toggle="tab" href="#match">Match</a></li>
                      <li><a className="create-trans" data-toggle="tab" href="#create">Create</a></li>
                    </ul>
                    <div className="tab-content">
                      <div id="match" className="tab-pane fade in active">
                        <div className="row">
                          <div className="col-md-6 col-xs-6">
                            <p>23 Apr 2020</p>
                            <p>Ridgeway University</p>
                            <p>Ref: 0045</p>
                          </div>
                          <div className="col-md-3 col-xs-3 text-right">
                            <p>-</p>
                          </div>
                          <div className="col-md-3 col-xs-3 text-right">
                            <p>6,187.50</p>
                          </div>
                        </div>
                      </div>
                      <div id="create" className="tab-pane fade in">
                        <div className="row">
                          <div className="col-md-12">
                            <button className="btn-small btn btn-blue">
                              <img className="filter-white mar-rgt-5" src="images/plus-add.svg" alt="icon" />
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
          <div className="row create-match-body">
            <div className="content-sec container">
              <div className="col-md-12 col-xs-12 choose-match">
                <h3>
                  Choose Matching Transaction
                <button className="btn-small btn btn-blue">
                    <img className="filter-white mar-rgt-5" src="images/plus-add.svg" alt="icon" />
                  Add Transactions
                </button>
                </h3>
                <div className="table-responsive">
                  <table className="choose-match-table">
                    <thead>
                      <tr>
                        <th>
                          <label className="custom-checkbox">
                            <input type="checkbox" name="all" />&nbsp;
                          <span className="checkmark" />
                          </label>
                        </th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>No#</th>
                        <th className="text-right">Debit</th>
                        <th className="text-right">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label className="custom-checkbox">
                            <input type="checkbox" name="all" />&nbsp;
                          <span className="checkmark" />
                          </label>
                        </td>
                        <td>15 Apr 2020</td>
                        <td>SMART Agency</td>
                        <td>INV-0090</td>
                        <td className="text-right">--</td>
                        <td className="text-right">216.50</td>
                      </tr>
                      <tr className="match-row">
                        <td>
                          <label className="custom-checkbox">
                            <input type="checkbox" name="all" defaultChecked="checked" />&nbsp;
                          <span className="checkmark" />
                          </label>
                        </td>
                        <td>26 Apr 2020</td>
                        <td>SMART Agency</td>
                        <td>01950210</td>
                        <td className="text-right">4,500.00</td>
                        <td className="text-right">--</td>
                      </tr>
                      <tr>
                        <td>
                          <label className="custom-checkbox">
                            <input type="checkbox" name="all" />&nbsp;
                          <span className="checkmark" />
                          </label>
                        </td>
                        <td>15 Apr 2020</td>
                        <td>SMART Agency</td>
                        <td>INV-0090</td>
                        <td className="text-right">--</td>
                        <td className="text-right">216.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="match-footer">
                  <h4>
                    Transactions must match the money received. Make adjustments, as needed.
                  <a href="javascript:;" className="adjustment">Adjustments</a>
                  </h4>
                  <div className="match-subtotal">
                    <div className="row">
                      <p className="col-md-6 col-xs-6">Sub Total</p>
                      <p className="col-md-6 col-xs-6 text-right fw-sbold">4500.00</p>
                    </div>
                    <div className="row adjust-form">
                      <p className="col-md-6 col-xs-12 mar-b-no">Adjustments</p>
                      <form className="custom-form col-md-6 col-xs-12">
                        <div className="form-group col-md-5 col-xs-6">
                          <input className="form-control" type="text" name />
                        </div>
                        <div className="form-group col-md-5 col-xs-6">
                          <div className="custom-select-drop dropdown inline">
                            <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                              <span id="selected">DBS Bank</span><span className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                              <li className="active"><a href="javascript:;">DBS Bank</a></li>
                              <li><a href="javascript:;">Bank Account 1</a></li>
                              <li><a href="javascript:;">Bank Account 2</a></li>
                              <li><a href="javascript:;">Bank Account 3</a></li>
                            </ul>
                          </div>
                        </div>
                        <a href="javascript:;" className="remove-item">
                          <img className="img-responsive" src="images/delete-icon.svg" alt="icon" />
                        </a>
                      </form>
                    </div>
                    <div className="total">
                      <div className="row">
                        <p className="col-md-6 col-xs-6 fw-sbold">Total</p>
                        <p className="col-md-6 col-xs-6 text-right fw-sbold">4500.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="total-btm">
                    <div className="container">
                      <div className="pull-left">
                        <span className="total-snip green">Must Match: 4,500.00</span>
                        {/* <p class="red">Total is out by: 4,258.00</p> */}
                      </div>
                      <div className="pull-right">
                        <button className="btn btn-white">Cancel</button>
                        <button className="btn btn-green">Reconcile</button>
                      </div>
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
}

export default FindMatchTrans
