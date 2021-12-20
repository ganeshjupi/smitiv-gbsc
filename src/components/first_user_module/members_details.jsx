import React from "react";

import UserTopbar from "./header";
import FetchAllApi from "./../../api_links/fetch_all_api";
import LeftSidebar from './../left_sidebar';
import { Multiselect } from "multiselect-react-dropdown";


export default class Memberdetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_user_name: localStorage.getItem("logged_user_name"),
      logged_user_email: localStorage.getItem("logged_user_email"),
      logged_user_phone: localStorage.getItem("logged_user_phone"),
      logged_user_image: localStorage.getItem("logged_user_image"),
      logged_company_name: localStorage.getItem("logged_company_name"),
      name: "",
      email: "",
      designation: "",
      country: "",
      subscriber: "",
      role: "",
      role_id: '',
      selectedCountry: [],
      country_ids: [],
      subscribers: []
    }
  }
  goToEditPage = () => {

    const flow = {
      name: this.state.name,
      email_id: this.state.email,
      designation: this.props.location.state.designation,
      role_name: this.state.role,
      country: this.props.location.state.country_id,
      countryName: this.state.selectedCountry,
      subscriberName: this.state.subscribers,
      subscribers: this.props.location.state.subscribers,
      role_id: this.state.role_id,
      user_id: this.props.location.state.id
    }
    console.log(flow)


    this.props.history.push("/edit", flow)


  };






  componentDidMount() {

    let input = this.props.location.state
    console.log("jairam", this.props.location)

    this.setState({
      name: input.name,
      email: input.email_id,
      designation: input.designation_name,
      country: input.country_id,
      country_ids: input.country_id,
      subscriber: input.subscribers,
      role: input.role_name,
      role_id: input.role_id,
    }, () => {
      this.select()
      this.subscriberFunc()
    })
    // if(this.props.location.input !== ""&&
    // this.props.location.input !==undefined&&
    // this.props.location.input !==null){
    //   let input=this.props.location.input
    //   this.setState({
    //     name: input[0],
    //     email: input[1],
    //     designation: input[2],
    //     country: input[3],
    //     subscriber: input[4],
    //     role: "roles",
    //     role_id: "role_id",
    //   })
    // }else{
    // let input = this.props.location.state
    // console.log("jairam",this.props.location)

    // this.setState({
    //   name: input.name,
    //   email: input.email_id,
    //   designation: input.designation_name,
    //   country: input.country,
    //   subscriber: input.subscriber_name,
    //   role: input.role_name
    // },)}
  };


  select = () => {
    let array = this.state.country ? this.state.country.split(",") : []
    FetchAllApi.get_countries((err, response) => {
      //alert(response)
      console.log("get_countries_list", response.list.length);
      if (response.status === 1) {

        response.list.map((val) => {
          array.map((arr) => {
            if (val.id == arr) {
              this.setState({ selectedCountry: [...this.state.selectedCountry, val.name] },)
            }
          })
        })

      }
    });
  
  };


  subscriberFunc = () => {
    let array =  this.state.subscriber ? this.state.subscriber.split(",") : []
    FetchAllApi.get_details_page_subscribers((err, response) => {
      //alert(response)
      console.log("get_countries_list", response.list.length);
      if (response.status === 1) {

        response.list.map((val) => {
          array.map((arr) => {
            if (val.id == arr) {
              this.setState({ subscribers: [...this.state.subscribers, val.name] },)
            }
          })
        })

      }
    });
  }


  // setvalues=()=>{
  //   let input = this.props.location.state
  //   console.log("jairam",this.props.location)

  //   this.setState({
  //     name: input.name,
  //     email: input.email_id,
  //     designation: input.designation_name,
  //     country: input.country_id,
  //     subscriber: input.subscriber_name,
  //     role: input.role_name
  //   },)

  // }

  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  pageLink(page_slug) {
    this.props.history.push('/' + page_slug)
  }


  render() {
    console.log("coun", this.state.selectedCountry)
    return (
      <div>
        <div className="container-fluid">
          {/* header Starts here */}
          {/* <LeftSidebar history={this.props.history}  pageSubmit={e => this.pageLink(e)} /> */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* user-content Starts here */}
          <section className="user-content row" >
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <a href="/member" className="back" >
                  <img src="images/back-arrow-blue.svg" />
                </a>
                <h3>Member Details </h3>
                <button className="pos-btn btn btn-blue make-edit" onClick={this.goToEditPage}>Edit</button>
              </div>
              {/* Member Detail Form Starts here */}
              <div className="col-md-12 col-xs-12">
                <form className="custom-form legend-form row non-editable">
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Member's Info</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Name<span className="astrick">*</span></label>
                      <input type="text" name="name" className="form-control" defaultValue={this.state.name} />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Mail Address<span className="astrick">*</span></label>
                      <input type="text" name="name" className="form-control" defaultValue={this.state.email} />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Designation</label>
                      <div className="custom-select-drop dropdown">
                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                          <span id="selected">{this.state.designation}</span><span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                          <li className="active"><a href="javascript:;">{this.state.designation}</a></li>

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Member's Limitations</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Country</label>
                      <div className="custom-select-drop dropdown">
                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                          {this.state.selectedCountry.map((count) => {
                            return (
                              <div>
                                <span className="badge blue">{count}</span>
                              </div>
                            )
                          })}

                        </a>

                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Subscribers</label>
                      <div className="custom-select-drop dropdown">
                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                          {this.state.subscribers.map((subs) => {
                            return (
                              <div>
                                <span className="badge blue">{subs}</span>
                              </div>
                            )
                          })}
                        </a>

                      </div>
                    </div>
                  </div>
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Roles in Genie</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      < button type='button' className="btn btn-blue mar-btm no-hover">{this.state.role}</ button>
                    </div>
                    <div className="clearfix">
                      {/* <a href="javascript:;" className="role-link" className="badge blue">{this.state.role}</a> */}
                      {/* <i className="remove"><img src="images/red-cross-circle-icon.svg" alt="icon" /></i> */}
                    </div>


                    {/* ￼Designation */}

                    {/* <button className="btn btn-wide assign-btn no-edit-assign" >
                      <img src="images/blue-add-icon.svg" alt="icon" /> Assign Roles
               </button> */}


                  </div>
                  <div className="pf-btm-wrap">
                    <div className="container text-right">
                      <button className="btn btn-lightgray edit-cancel">Cancel</button>
                      <button className="btn btn-green">Save</button>
                    </div>
                  </div>
                </form>
              </div>
              {/* Member Detail Form Ends here */}
            </div>
          </section>
          {/* user-content Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        {/* footer Starts here */}
        <footer className="container-fluid">
          <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
        </footer>
        {/* footer Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}
      </div>
    )
  }
}
