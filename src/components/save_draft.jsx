import React from "react";
import LeftSidebar from './left_sidebar'
import Footer from './footer'

import Topbar from './topbar'

import FetchAllApi from '../api_links/fetch_all_api';
import jQuery from "jquery";
// import 'bootstrap';
// import 'bootstrap-select';

class save_draft extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      logged_subscription_start_date: localStorage.getItem("logged_subscription_start_date"),
      logged_subscription_end_date: localStorage.getItem("logged_subscription_end_date"),
      logged_plan_id: localStorage.getItem("logged_plan_id"),
      dropdown: "",
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",
      list_id: "",
      result_array: []
    };
  }

  inbox_list = e => {
    let search = ''
    var page_no = 1
    var items_limit = 10
    // var filter_status = 3
    // var client_id = this.state.logged_client_id
    var client_id = 14
    // var filter_id = this.state.result_array
    // var status = 3;

    FetchAllApi.get_inboxdraft_list(
      page_no,
      items_limit,
      client_id,
      search,
      (err, response) => {
        console.log('Article Data', response.message);
        if (response.status === 1) {
          this.setState({
            inbox_list: response.response,
            response_msg: response.message,
            response_stus: response.status
          });
          //console.log('hellllooooooooo',this.state.inbox_list)

          jQuery('.item-listwrap').css('display', 'block');
          jQuery('.no_rec').css('display', 'none');
        } else {
          jQuery('.item-listwrap').css('display', 'none');
          jQuery('.no_rec').css('display', 'block');
        }
      })

  }
  UNSAFE_componentWillMount() {

    if (this.state.logged_user_id === "" || this.state.logged_user_id === null || this.state.logged_user_id === undefined) {
      this.props.history.push('/');
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    var today_date = yyyy + '-' + mm + '-' + dd;

    console.log("logged_user_id", this.state.logged_user_id);
    console.log("logged_subscription_end_date", this.state.logged_subscription_end_date);

    if (this.state.logged_subscription_end_date < today_date) {
      //this.props.history.push('/register_Payment');
    }

    jQuery('title').html('Save Draft | GBSC');



  }

  componentDidMount() {

    this.inbox_list('')
    //jQuery(".select-picker").selectpicker();

    require("jquery-mousewheel");
    require("malihu-custom-scrollbar-plugin");

    jQuery(".item-listwrap").mCustomScrollbar({
      scrollEasing: "linear",
      scrollInertia: 600,
      scrollbarPosition: "outside"
    });

    jQuery(".label-enclose .label span").click(function () {
      jQuery(".label-enclose .label").removeClass("active");
      jQuery(this)
        .parent(".label-enclose .label")
        .addClass("active");
    });
    jQuery(".label-enclose .label a").click(function () {
      jQuery(this)
        .parent(".label-enclose .label")
        .removeClass("active");
    });
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }


  routedChange(parameter) {
    this.props.history.push('/' + parameter);
    window.scrollTo(0, 0);
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug);
  }

  render() {
    let get_file_path,
      dis_file_path = [],
      item_file_path = [],
      attach_file_path,
      options = [],
      page_no = 1,
      items_limit = 10,
      no_items;


    if (
      this.state.item_details.user_image !== "" &&
      this.state.item_details.user_image !== "null"
    ) {
      var item_user_image = this.state.item_details.user_image;
    } else {
      var item_user_image = "images/user-img-1.png";
    }

    //console.log('item_files', this.state.item_file_path);
    if (
      this.state.item_file_path !== "" &&
      this.state.item_file_path !== "null"
    ) {
      item_file_path = [];
      var split_file_path = this.state.item_file_path.toString().split(",");
      var split_file_id = this.state.item_file_id.toString().split(",");
      if (split_file_path.length >= 1) {
        for (var i = 0; i < split_file_path.length; i++) {
          var get_file_url = split_file_path[i];
          var split_file_name = split_file_path[i].toString().split("/");
          var arr_reverse = split_file_name.reverse();

          var get_file_name = arr_reverse[0].substring(arr_reverse[0].length - 15, arr_reverse[0].length);

          var get_file_ext = arr_reverse[0].substring(
            arr_reverse[0].lastIndexOf(".") + 1,
            arr_reverse[0].length
          );
          if (get_file_ext === "pdf") {
            var file_icon = "images/pdf-icon.png";
          } else {
            var file_icon = "images/img-icon.png";
          }

          if (get_file_ext === "pdf") {

            // 1  item_file_path.push(<div className="attach-item"><a onClick={this.dataTaggingFunc.bind(this,this.state.list_id,split_file_id[i])} className="img-wrap" data-id={split_file_id[i]}>
            item_file_path.push(<div className="attach-item"><a className="img-wrap" data-id={split_file_id[i]}>

              <iframe src={get_file_url} id="pdf_thumb_viewer" frameborder="0" scrolling="no" width="190" height="190"></iframe>
              <span className="go"><img src="../images/next-arrow-white.svg" className="mCS_img_loaded" /></span>
            </a><a
              href={get_file_url} download target="_blank">
                <img
                  src="../images/download-icon.svg" alt="Icon" className="mCS_img_loaded" /></a></div>);

          } else {
            //2   item_file_path.push(<div className="attach-item"><a onClick={this.dataTaggingFunc.bind(this,this.state.list_id,split_file_id[i])} className="img-wrap" data-id={split_file_id[i]}><img className="img-responsive mCS_img_loaded" src={get_file_url} alt={get_file_ext} /><span className="go"><img src="../images/next-arrow-white.svg" className="mCS_img_loaded" /></span></a>
            item_file_path.push(<div className="attach-item"><a className="img-wrap" data-id={split_file_id[i]}><img className="img-responsive mCS_img_loaded" src={get_file_url} alt={get_file_ext} /><span className="go"><img src="../images/next-arrow-white.svg" className="mCS_img_loaded" /></span></a>

              <a
                href={get_file_url} download target="_blank">
                <img
                  src="../images/download-icon.svg" alt="Icon" className="mCS_img_loaded" /></a></div>);

          }

        }
      }
    }

    options.push(<option>ORG-250</option>);

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />

            <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
              <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                <div className="nav-brand-res visible-xs">
                  <img
                    className="img-responsive"
                    src="../images/logo-icon.png"
                    alt="LogoIcon"
                  />
                </div>
                <span className="page-title hidden-xs">Draft</span>

                <Topbar history={this.props.history} logoutSubmit={e => this.logoutLink()} />
              </div>

              <div className="main-content col-md-12 col-xs-12">
                <span className="page-title visible-xs">Draft</span>

                <div className="content-top col-md-12 col-xs-12 pad-no">
                  {/* <button className="btn btn-compose" onClick={this.routedChange.bind(this,'compose')}>
                        <img src="images/compose-plus.svg" alt="icon"/>
                        Compose
                    </button> */}
                  <form className="search-right">
                    <div className="form-group mar-no">
                      <img src="images/search-icon.svg" alt="Icon" />
                      <input className="form-control" type="text" name="search" placeholder="Search..."
                      // onInput={event =>{this.inbox_list(event.target.value)}}
                      />
                    </div>
                  </form>
                </div>

                <div className="content-sec col-md-12 col-xs-12 pad-no inbox-listing">
                  <div className="col-md-6 col-xs-12 fluid" id="inboxLft">
                    <div className="row pad-rgt">
                      <span className="no_rec alert alert-danger">
                        No items found!
                      </span>

                      <div className="item-listwrap col-md-12 col-xs-12 pad-no">
                        <div className="ib-scroll">

                          {
                            this.state.inbox_list.map((inbox_data, index) => {

                              //console.log('list_id', index);

                              if (inbox_data.id !== "") {
                                get_file_path = inbox_data.file_path;
                                if (get_file_path != "") {
                                  dis_file_path = [];
                                  attach_file_path = [];
                                  var split_file_path = get_file_path.toString().split(',');

                                  if (get_file_path.length > 1) {
                                    for (var i = 0; i < 2; i++) {
                                      var get_file_name = split_file_path[i];
                                      var split_file_name = split_file_path[i].toString().split('/');
                                      var arr_reverse = split_file_name.reverse();

                                      var get_file_ext = arr_reverse[0].substring(arr_reverse[0].lastIndexOf('.') + 1, arr_reverse[0].length);
                                      if (get_file_ext === "pdf") {
                                        var file_icon = "images/pdf-icon.png";
                                      } else {
                                        var file_icon = "images/img-icon.png";
                                      }

                                      dis_file_path.push(<a><img src={file_icon} alt={get_file_ext} /><span>{arr_reverse[0].substring(arr_reverse[0].length - 15, arr_reverse[0].length)}</span></a>);
                                    }

                                    if (get_file_path.length > 2) {
                                      var more_div = <span className="etc">+2 more</span>;
                                    }
                                  } else {
                                    var split_file_name = inbox_data.file_path[0].toString().split('/');
                                    var arr_reverse = split_file_name.reverse();

                                    var get_file_ext = arr_reverse[0].substring(arr_reverse[0].lastIndexOf('.') + 1, arr_reverse[0].length);
                                    if (get_file_ext === "pdf") {
                                      var file_icon = "images/pdf-icon.png";
                                    } else {
                                      var file_icon = "images/img-icon.png";
                                    }
                                    var dis_file_path = <a><img src={file_icon} alt={get_file_ext} /><span>{arr_reverse[0].substring(arr_reverse[0].length - 15, arr_reverse[0].length)}</span></a>;
                                  }


                                  // var mb_item_file_path = get_file_path.toString().split(',');
                                  // var mb_item_file_id = inbox_data.file_id.toString().split(',');
                                  // for(var i=0; i<mb_item_file_path.length; i++){
                                  //     var mb_file_name = mb_item_file_path[i];
                                  //     var mb_split_file_name = mb_item_file_path[i].toString().split('/');
                                  //     var mb_arr_reverse = mb_split_file_name.reverse();


                                  //     attach_file_path.push(<div className="attach-item">
                                  //         {/* 3 <a onClick={this.dataTaggingFunc.bind(this,mb_item_file_id[i])} className="img-wrap" data-id={mb_item_file_id[i]}> */}
                                  //         <a  className="img-wrap" data-id={mb_item_file_id[i]}>

                                  //             <img className="img-responsive" src="../images/scan-thumbnail.png" alt="images" />
                                  //             <span className="go"><img src="../images/next-arrow-white.svg" /></span>
                                  //         </a>
                                  //         <a
                                  //             href={get_file_url} download target="_blank">
                                  //             <img
                                  //                 src="../images/download-icon.svg" alt="Icon" className="mCS_img_loaded"/></a>
                                  //     </div>);
                                  // }
                                }



                                if (inbox_data.status_message === "New") {
                                  var status_cls = "inbox-item col-md-12 col-xs-12 unread";
                                  var date_time_cls = "date-time";
                                } else {
                                  var status_cls = "inbox-item col-md-12 col-xs-12";
                                  var date_time_cls = "date-time delay";
                                }

                                if (inbox_data.status_message === "Re-assigned") {
                                  var re_assigned = <span className="label label-warning">Re-Assigned</span>;
                                } else {
                                  var re_assigned = '';
                                }

                                if (inbox_data.status_message === "Waiting for response") {
                                  var wat_response = <span className="label label-danger">Waiting for Response</span>;
                                } else {
                                  var wat_response = '';
                                }

                                var itemId = "list-" + inbox_data.id;

                                if (inbox_data.user_image !== "" && inbox_data.user_image !== "null") {
                                  var inbox_user_image = inbox_data.user_image;
                                } else {
                                  var inbox_user_image = "images/user-img-1.png";
                                }

                                return (
                                  <div>

                                    {/* 4 <div className={status_cls} id={itemId} data-id={inbox_data.id} onClick={this.getItemDetails.bind(this,inbox_data.id)}> */}
                                    <div className={status_cls} id={itemId} data-id={inbox_data.id} >

                                      <div className="avatar"><img className="img-responsive" src={inbox_user_image} alt="avatar" /></div>
                                      <div className="item-content">
                                        {re_assigned} {wat_response}
                                        <div className="col-md-12 col-xs-12 pad-no">
                                          <span className="name">{inbox_data.username}</span>
                                          <span className="client-id">[{inbox_data.client_code}]</span>
                                        </div>
                                        <span className="sub-content col-md-12 col-xs-12 pad-no">{inbox_data.description}</span>
                                        <div className="attachment-item col-md-12 col-xs-12 pad-no visible-lg">
                                          {dis_file_path}
                                          {more_div}
                                        </div>
                                      </div>
                                      <span className={date_time_cls}>{inbox_data.ago_value}</span>
                                    </div>

                                    <div className="inbox-detail col-md-12 col-xs-12 visible-sm visible-xs">
                                      <div className="ib-msg col-md-12 col-xs-12">
                                        <h4>{inbox_data.title}</h4>
                                        <p>{inbox_data.description}</p>
                                      </div>
                                      <div className="ib-attachment col-md-12 col-xs-12">
                                        <span className="lead">Attachments</span>
                                        <div className="col-md-12 col-xs-12 pad-no">
                                          {attach_file_path}
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                )

                              } else {
                                return (<div></div>);
                              }


                            })
                          }

                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-6 col-xs-12 visible-lg visible-md inboxRgtDisp"
                    id="inboxRgt"
                    data-id={this.state.item_details.id}
                  >
                    <div className="row">
                      <div className="inbox-right">
                        <div className="ib-scroll">
                          <div className="inbox-detail col-md-12 col-xs-12">
                            <div className="ib-detail-head col-md-12 col-xs-12">
                              <div className="avatar">
                                <img
                                  src={item_user_image}
                                  className="img-responsive"
                                  alt="avatar"
                                />
                              </div>
                              <div className="item-content">
                                <div className="col-md-12 col-xs-12 pad-no">
                                  <span className="name">
                                    {this.state.item_details.username}
                                  </span>
                                  <span className="client-id">
                                    [{this.state.item_details.client_code}]
                                  </span>
                                  <span className="date-time">
                                    {this.state.item_details.date}
                                  </span>
                                </div>
                                <div className="navigate">
                                  <a
                                    className="preNxtBtn"
                                    id="next"
                                    //6 onClick={this.getItemDetails.bind(

                                    //   this,
                                    //   this.state.item_details.next_record
                                    // )}
                                    data-id={
                                      this.state.item_details.next_record
                                    }
                                  >
                                    <img
                                      src="../images/arrow-left.svg"
                                      alt="icon"
                                    />
                                  </a>
                                  <a
                                    className="preNxtBtn"
                                    id="prev"
                                    //7 onClick={this.getItemDetails.bind(
                                    //   this,
                                    //   this.state.item_details.previous_record
                                    // )}
                                    data-id={
                                      this.state.item_details.previous_record
                                    }
                                  >
                                    <img
                                      src="../images/arrow-right.svg"
                                      alt="icon"
                                      className="mCS_img_loaded"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="ib-msg col-md-12 col-xs-12">
                              <h4>{this.state.item_details.title}</h4>
                              <p>{this.state.item_details.description}</p>
                            </div>
                            <div className="ib-attachment col-md-12 col-xs-12">
                              <span className="lead">Attachments</span>
                              <div
                                className="col-md-12 col-xs-12 pad-no"
                                id="attachFiles"
                              >
                                {item_file_path}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer logoutSubmit={e => this.logoutLink(e)} />
      </div>
    );
  }
}
export default save_draft;
