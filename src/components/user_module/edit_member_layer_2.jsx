import React from "react";
// import LeftSidebar from './left_sidebar'
// import Footer from './footer'
import { Multiselect } from 'multiselect-react-dropdown';
// import UserTopbar from "./header";

import FetchAllApi from "./../../api_links/fetch_all_api";
import UserTopbar from "./userTopbar";
import jQuery from "jquery";
import { meanBy } from "lodash";
// import 'bootstrap';
// import '';

export default class EditMemberLayer2 extends React.Component {
  constructor(props) {
    super(props);
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem("logged_user_id"),
      logged_role_id: localStorage.getItem("logged_role_id"),
      logged_client_id: localStorage.getItem("logged_client_id"),
      name: "",
      mailAddress: "",
      designation: "",
      role: "",
      designationList: [],
      designationName: "",
      country:[], // ["india", "singapore"]
      subscribers:[{name: 'subscriber1', id: 1},{name: 'subscriber2', id: 2}], // 5
      selectedCountry: [],
      selectedSubscribers: [],
      show_success: false,
    };
  }

  save = (e) => {
    e.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.mailAddress !== "" &&
      this.state.designation !== "" && 
      this.state.id
    ) {
   
      
      FetchAllApi.editUser(this.state.logged_client_id, this.state.role_id, this.state.name, this.state.mailAddress, this.state.phone, this.state.designation, this.state.id,(err, response) => {
        console.log(response)
        if (response.status === 1) {
            alert(" Memeber Edit successful")
            this.props.history.push('/member_lists')
          }
        })
       
        }
        else {
          alert("please fill all the details");
        }
  };


  

  componentDidUpdate() {
    window.jQuery(".selectpicker").selectpicker("refresh");
  }

    goToRolesPage = () => {
    
        let data = [
            this.state.name,
            this.state.mailAddress,
            this.state.designation,
            this.state.id,
            this.state.role_id,
            this.state.role
          ];
          this.props.history.push("/edit_roles_permissions", data);
       
    
    //    this.props.history.push("/roles_permissions",role)
     
     
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
            this.setState({designation:response.id})
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
  onSelectCountry=(selectedList, selectedItem)=> {
    this.setState({ selectedCountry: selectedList })
  }
  onRemoveCountry=(selectedList, removedItem)=> {
    this.setState({ selectedCountry: selectedList })
  }
  onSelectSubscriber=(selectedList, selectedItem)=> {
    this.setState({ selectedSubscribers: selectedList })
  }
  onRemoveSubscriber=(selectedList, removedItem)=> {
    this.setState({ selectedSubscribers: selectedList })
  }


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
 getRole=()=>{
   const arr=[]
  for (const property in this.state.role) {
   const val=this.state.role[property]
   const html=`<span className="badge blue">${property}</span>`;
   arr.push(html);
 
   
   
  }
  return arr
 }

 country=()=>{
  let country_id=101

  FetchAllApi.get_countries((err, response) => {
    //alert(response)
    console.log("get_countries_list", response.list.length);
    if(response.status === 1){
      this.setState({
        selectedCountry: response.list,
        
      })
    } 
  });
      
    
 }



  componentDidMount() {
    let input=this.props.location.state
    console.log("test",this.props.location)
    
    if(input.length > 7){
      this.setState({
        name: this.props.location.state[0],
        mailAddress: this.props.location.state[1],
        designation: this.props.location.state[2],
        id: this.props.location.state[3],
        role_id: this.props.location.state[7],
        role: this.props.location.state[6],

    })
    console.log("edited",this.props.location.state[7] )
    }else {
      this.setState({
          name: this.props.location.state[0],
          mailAddress: this.props.location.state[1],
          designation: this.props.location.state[2],
          id: this.props.location.state[3],
          role_id: this.props.location.state[4],
          role: this.props.location.state[5],

      })
      console.log(" not edited",this.props.location.state[4] )
    }
    
    // if (
    //   this.props.location.state != "" &&
    //   this.props.location.state != undefined
    // ) {
    //   console.log("yyt", localStorage.getItem("rolesAndPermissionForMemberInvite"));
    // }

    this.userDesignationList();
    
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

   
  }

  logoutLink() {
    localStorage.clear();
    this.props.history.push("/");
  }

  render() {
    console.log("ftr", this.state.designationList);
    return (
      <div>
      <div className="container-fluid">
        <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
         {/* header Ends here */}
         {/* user-content Starts here */}
         <section className="user-content row" style={{marginLeft : '227px'}}>
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
                       this.setState({ name: e.target.value })}type="text" name="name" className="form-control" />
                   </div>
                   <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                     <label>Mail Address<span className="astrick">*</span></label>
                     <input type="text" name="name"value={this.state.mailAddress}
                     onChange={(e) =>
                       this.setState({ mailAddress: e.target.value })
                     } className="form-control" />
                   </div>
                   <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                     <label>Designation</label>
                     <div className="custom-select-drop dropdown">
                       <select
                         className="selectpicker form-control add-new"
                         data-live-search="true"
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
                     <span className="form-legend">Roles in Genie</span>
                   </div>
                   <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12"></div>
            
                <div className="clearfix">
                <a href="javascript:;" className="role-link" className="badge blue">{this.state.role}</a>
                  <i className="remove"><img src="images/red-cross-circle-icon.svg" alt="icon" /></i>
                </div>
                
                   <div  onClick={this.goToRolesPage} className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                     <button className="btn btn-wide assign-btn">
                       <img src="images/blue-add-icon.svg" alt="icon" /> Assign Roles
                     </button>
                   </div>
                   </div>
                 <div className="col-md-12 col-xs-12 text-right pad-no">
                   <div className="container text-right">
                     <button className="btn btn-lightgray" onClick={() => this.props.history.push('/member_lists')}>Cancel</button>
                     <button onClick={(e)=>this.save(e)} className="btn btn-green">Save</button>
                   </div>
                 </div>
               </form>
             </div>
             {/* Invite Member Form Ends here */}
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
                         className="btn btn-lightgray"
                         data-dismiss="modal"
                       >
                         Cancel
                       </button>
                       <span>{"   "}</span>
                       <button
                         className="btn btn-green"
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

