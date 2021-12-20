import React from "react";
// import LeftSidebar from './left_sidebar'
// import Footer from './footer'
import { Multiselect } from 'multiselect-react-dropdown';
import UserTopbar from "./header";

import FetchAllApi from "./../../api_links/fetch_all_api";

import jQuery from "jquery";
import { meanBy } from "lodash";
// import 'bootstrap';
// import '';

export default class EditMember extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      first_logged_client_id: localStorage.getItem("first_logged_client_id"),
      name: "",
      mailAddress: "",
      designation: "",
      role: "",
      designationList: [],
      designationName: "",
      country: [], // ["india", "singapore"]
      subscribers: [],//[{ name: 'subscriber1', id: 1 }, { name: 'subscriber2', id: 2 }], // 5
      selectedCountry: [],
      selectedSubscribers: [],
      show_success: false,
      role_id:"",
      country_ids:[],
      errorMsg:false,
      mailerror:false,
      id:"",
    };
  }

  save = () => {
    console.log('save')
    
    if (
      this.state.name !== "" &&
      this.state.mailAddress !== "" 
    ) {
      const member = {
        member_client_id: this.state.logged_client_id,
        role_id: this.state.role_id, // this.props.location.state.roles;
        name: this.state.name,
        email_id: this.state.mailAddress,
        logged_in_user_id: this.state.logged_user_id,
        designation: this.state.designation,
        country_id: this.state.country,
        subscribers: this.state.selectedSubscribers,
        user_id:this.state.id,
      };
      
      FetchAllApi.edit_member(member, (err, response) => {
        if (response.status === 1) {
          alert(" Memeber Edit successful")
          this.props.history.push("/member")
        }
      })
    
    }else{
      this.setState({errorMsg:true})
      setTimeout(()=>{
        this.setState({errorMsg:false})
      },4000)
    }
  };




  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  }

  goToRolesPage = () => {

    const role = {
      name: this.state.name,
      email_id: this.state.mailAddress,
      designation: this.state.designation,
      role_name: this.state.role,
      country:this.state.country,
      country_ids:this.state.country_ids,
      selectedSubscribers:this.state.selectedSubscribers,
      user_id:this.props.location.state.user_id
    }
    console.log(role)


    this.props.history.push("/assign", role)


  };


  add_destination = () => {
    if (this.state.designationName !== "") {
      let client_id = this.state.logged_client_id;
      let designationName = this.state.designationName;

      FetchAllApi.addNewUserDesignation(
        client_id,
        designationName,
        (err, response) => {
          if (response.status === 1) {
            window.jQuery("#pop-modal-1").modal("hide");
            this.userDesignationList();
            this.setState({ designation: response.id })
            // else {
            //   this.setState({
            //     designationList: [],
            //   });
          }
        }
      );
    }
  };

  handleChange = (designation) => {
    if (designation == "Create New") {
      window.jQuery("#pop-modal-1").modal("show");
    } else {
      this.setState({ designation });
    }
  };
  // onSelectCountry = (selectedList, selectedItem) => {
  //   this.setState({ country: selectedList },this.funcMap)
  // };

  onSelectCountry=(e)=>{
      var result = [];
      var options = e.target.options;
      var opt;
      var j = 0;
      var array = [];
      for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];
  
        if (opt.selected) {
          result[j] = Number(opt.value);
          j++;
        }
      }
      this.setState({country:result},()=>{this.subscribersList1()})
    };
  // funcMap=()=>{
  //   this.state.country.map((coun)=>{
  //     this.setState({country_ids:coun.id},this.subscribersList)

  //   })
  // };
  // onRemoveCountry = (selectedList, removedItem) => {
  //   this.setState({ country: selectedList },this.funcMap)
  // };

  subscribersList1=()=>{
    let country_ids=this.state.country
    FetchAllApi.get_subscriber_list_by_country(country_ids, (err, response) => {
      if (response.status === 1) {
        this.setState({ subscribers: response.list });
      } else {
        this.setState({
          subscribers: [],
          selectedSubscribers:[]
        });
      }
    });
  };

  subscribersList=()=>{
    let country_ids=this.state.country_ids
    FetchAllApi.get_subscriber_list_by_country(country_ids, (err, response) => {
      if (response.status === 1) {
        this.setState({ subscribers: response.list });
      } else {
        this.setState({
          subscribers: [],
        });
      }
    });
  };
  // onSelectSubscriber = (selectedList, selectedItem) => {
  //   this.setState({ selectedSubscribers: selectedList })
  // }
  // onRemoveSubscriber = (selectedList, removedItem) => {
  //   this.setState({ selectedSubscribers: selectedList })
  // }

  onSelectSubscriber=(e)=>{
    var result = [];
    var options = e.target.options;
    var opt;
    var j = 0;
    var array = [];
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result[j] = Number(opt.value);
        j++;
      }
    }
    this.setState({selectedSubscribers:result})

  };


  userDesignationList = () => {
    let client_id = this.state.logged_client_id;

    FetchAllApi.userDesignationList(client_id, (err, response) => {
      if (response.status === 1) {
        this.setState({
          designationList: response.list,
        });
      }
      //  else {
      //   this.setState({
      //     designationList: [],
      //   });
      // }
    });
  };

  UNSAFE_componentWillMount() {
    jQuery(document.body).removeClass("minimize_leftbar");
    //console.log("logged_user_id", this.state.logged_user_id);

    jQuery("title").html("Customer | GBSC");

    if (
      this.state.logged_user_id === "" ||
      this.state.logged_user_id === null ||
      this.state.logged_user_id === undefined
    ) {
      this.props.history.push("/");
    }
  }
  getRole = () => {
    const arr = []
    for (const property in this.state.role) {
      const val = this.state.role[property]
      const html = `<span className="badge blue">${property}</span>`;
      arr.push(html);



    }
    return arr
  }

  country = () => {
    let country_id = 101

    FetchAllApi.get_countries((err, response) => {
      //alert(response)
      console.log("get_countries_list", response.list.length);
      if (response.status === 1) {
        this.setState({
          selectedCountry: response.list,

        })
      }
    });


  }



  componentDidMount() {
    
    if(this.props.location.state && this.props.location.state.input !=="" && this.props.location.state.input !==undefined && this.props.location.state.input !==null ){
      let input=this.props.location.state.input
      this.setState({
        name: input.member.name,
        mailAddress: input.member.email_id,
        designation: input.member.designation,
        country_ids: input.member.country_ids,
        country:input.member.country,
        selectedSubscribers: input.member.selectedSubscribers,
        role: input.roles,
        role_id:input.role_id,
        id:input.member.user_id
      },this.subscribersList)

    }else{
    let input = this.props.location.state
    let array1= this.props.location.state.country ? this.props.location.state.country.split(',') : []
    let array2= this.props.location.state.subscribers ? this.props.location.state.subscribers.split(',') : []
    console.log(this.props.location)
console.log('array1',array1)
    this.setState({
      name: input.name,
      mailAddress: input.email_id,
      designation: input.designation,
      country_ids: array1,
      country:array1,
      selectedSubscribers: array2,
      role: input.role_name,
      role_id:input.role_id,
      id:this.props.location.state.user_id,
    },this.subscribersList)}

    // if (
    //   this.props.location.state != "" &&
    //   this.props.location.state != undefined
    // ) {
    //   console.log("yyt", localStorage.getItem("rolesAndPermissionForMemberInvite"));
    // }

    this.userDesignationList();
    this.country();

    // this.getSpecificPage(1, 10)

    //jQuery(".select-picker").selectpicker();
    // jQuery(window).on("load", function () {
    //   window.jQuery(".mscroll-y").mCustomScrollbar({
    //     axis: "y",
    //     scrollEasing: "linear",
    //     scrollInertia: 600,
    //     autoHideScrollbar: "true",
    //     autoExpandScrollbar: "true",
    //   });
    //   window.jQuery(".mscroll-x").mCustomScrollbar({
    //     axis: "x",
    //     scrollEasing: "linear",
    //     scrollInertia: 600,
    //     autoHideScrollbar: "true",
    //     autoExpandScrollbar: "true",
    //   });

    //   window.jQuery(".ib-scroll").mCustomScrollbar({
    //     scrollEasing: "linear",
    //     scrollInertia: 600,
    //     scrollbarPosition: "outside",
    //   });
    // });

    // jQuery(document).ready(function () {
    //   window.jQuery(".select-picker").selectpicker();
    //   jQuery(".show-pass").click(function () {
    //     jQuery(this).parent(".pass-sec").toggleClass("show");
    //   });
    //   jQuery(".custom-select-drop .dropdown-menu a").click(function () {
    //     jQuery(".open.custom-select-drop .dropdown-menu li.active").removeClass(
    //       "active"
    //     );
    //     jQuery(this).parent("li").addClass("active");
    //     jQuery(".open #selected").text(jQuery(this).text());
    //   });
    // });


  };

  mailChange=(e) =>{
    
    this.setState({ mailAddress: e.target.value },this.mailValidation)
  };


  mailValidation =()=>{
    if (/^[a-z0-9]+@(?:[a-z0-9]+\.)+[A-Za-z]+$/.test(this.state.mailAddress)){
      this.setState({mailerror:false})
      }
      else{
        this.setState({mailerror:true})
      }
  }

  logoutLink() {
    localStorage.clear();

    this.props.history.push("/");
  }

  render() {
    console.log("array1 render", this.state.country);
    return (
      <div>
        <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()}/>
          {/* header Ends here */}
          {/* user-content Starts here */}
          <section className="user-content row">
            <div className="container">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Edit Member</h3>
              </div>
              {/* Invite Member Form Starts here */}
              <div className="col-md-12 col-xs-12">
                <form className="custom-form legend-form row">
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Member's Info</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Name<span className="astrick">*</span></label>
                      <input value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })} type="text" name="name" className="form-control" />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Mail Address<span className="astrick">*</span></label>
                      <input type="text" name="name" value={this.state.mailAddress}
                        onChange={this.mailChange}
                         className="form-control" />
                           {this.state.mailerror == true ? (
                          <div style={{ float: 'left' }}>
                            <small style={{ color: 'red' }}>
                              *Please enter valid email.
                                </small>
                          </div>
                        ) : (
                            ''
                          )}
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Designation</label>
                      <div className="custom-select-drop dropdown">
                        <select
                          className="selectpicker form-control add-new"
                          data-live-search="true"
                          defaultValue={this.state.designation}
                          value={this.state.designation}
                          onChange={(e) => {
                            this.handleChange(e.target.value);
                          }}
                        >
                          <option value="">Choose </option>
                          <option value="Create New">Create New </option>
                          {this.state.designationList.map((k, j) => {
                            return (
                              <option value={k.id}>{k.designation}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Member's Limitations</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Country</label>
                      {/* <Multiselect
                        className="selectpicker form-control add-new"
                        selectedValues={this.state.country}
                        options={this.state.selectedCountry}
                        displayValue="name"
                       
                        onRemove={this.onRemoveCountry}
                        onSelect={this.onSelectCountry}
                      /> */}
                      <select className="selectpicker form-control hh " value={this.state.country} data-live-search="true" multiple onChange={this.onSelectCountry}>
                        {this.state.selectedCountry.map((coun)=>{
                          return(
                        <option value={coun.id}>{coun.name}</option>
                          )})}
                      </select>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Subscribers</label>
                      <select className="selectpicker form-control hh " value={this.state.selectedSubscribers} data-live-search="true" multiple onChange={this.onSelectSubscriber}>
                      {this.state.subscribers.map((sub)=>{
                          return(
                        <option value={sub.id}>{sub.name}</option>
                        )})}
                      </select>
                      {/* <Multiselect
                        className="selectpicker form-control add-new"
                        options={this.state.subscribers}
                        selectedValues={this.state.selectedSubscribers}
                        displayValue="name"
                        onRemove={this.onRemoveSubscriber}
                        onSelect={this.onSelectSubscriber}
                      /> */}
                    </div>
                  </div>
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Roles in Genie</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      < button type='button' className="btn btn-blue mar-btm no-hover">{this.state.role}</ button>
                    </div>
                    <div className="clearfix"></div>
                    {/* <div className="">
                      <i className="remove"><img src="images/red-cross-circle-icon.svg" alt="icon" /></i>
                    </div> */}

                    <div onClick={this.goToRolesPage} className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <button className="btn btn-wide assign-btn">
                        <img src="images/blue-add-icon.svg" alt="icon" /> Assign Roles
                     </button>
                    </div>
                  </div>
                  <div className="col-md-12 text-left">
                    <div className="row mar-top">
                      <button className="btn btn-lightgray mar-rgt-5">Cancel</button>
                      <div onClick={ this.save} className="btn btn-green mar-rgt-5">Save</div>
                    </div>
                  </div>
                </form>
              </div>
              {/* Invite Member Form Ends here */}
              {this.state.errorMsg == true ? (
              <div className='alert alert-card warning alert-dismissible fade in '>
                <a
                  href='#'
                  className='close'
                  data-dismiss='alert'
                  aria-label='close'
                  onClick={() => {
                    this.setState({ error: false })
                  }}
                >
                  ×
          </a>
                <div className='img-wrap'>
                  <img
                    className='img-responsive'
                    src='images/alert-warning.svg'
                    alt='icon'
                  />
                </div>
                <div className='alert-cont'>
                  <strong className='title'>
                    Mandatory fields must be filled!
            </strong>
                </div>
              </div>
            ) : null}
            </div>
            <div
              className="modal fade pop-modal"
              id="pop-modal-1"
              role="dialog"
            >
              <div className="modal-dialog modal-md custom-modal">
                <div className="modal-content">
                  <div className="modal-body text-center">
                    <h3>Add Designation</h3>
                    <form className="custom-form row">
                      <div className="form-group col-md-12 col-xs-12 pad-no">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <label>
                            Designation Name
                           <span className="astrick">*</span>
                          </label>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              this.setState({ designationName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      {this.state.show_success ? (
                        <small style={{ color: "green" }} className="mymsg">
                          added successfully
                        </small>
                      ) : (
                          ""
                        )}
                      <div className="form-group col-md-12 col-xs-12 btn-sec pad-no mar-b-no">
                        <button
                          className="btn btn-lightgray mar-rgt-5"
                          data-dismiss="modal"
                        >
                          Cancel
                       </button>
                        
                        <button
                          className="btn btn-green mar-rgt-5"
                          type="button"
                          onClick={this.add_destination}
                        >
                          Save
                       </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
    );
  }
}

