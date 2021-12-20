import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class Sales extends React.Component{
    constructor(props){
        super(props)

        this.state={
          logged_user_id: localStorage.getItem("logged_user_id"),
            logged_client_id: localStorage.getItem("logged_client_id"),
            logged_role_id: localStorage.getItem("logged_role_id"),
            logged_user_name: localStorage.getItem("logged_user_name"),
            logged_user_email: localStorage.getItem("logged_user_email"),
            logged_user_phone: localStorage.getItem("logged_user_phone"),
            logged_user_image: localStorage.getItem("logged_user_image"),
            logged_company_name: localStorage.getItem("logged_company_name"),
          template_name:"",
          template_type:"choose...",
          subject:'',
          message:"",
          placeholder:'Insert Placeholder',
        }
    };

    componentWillMount (){
      if (
        this.state.logged_user_id === "" ||
        this.state.logged_user_id === null ||
        this.state.logged_user_id === undefined
      ) {
        this.props.history.push("/");
      }
    };

    logoutLink() {
      localStorage.clear();
    
      this.props.history.push("/");
    };


    handleChange=(e)=>{
      console.log(e.target.value)
      this.setState({[e.target.name]:e.target.value})
    }
    templateType=(value)=>{
      console.log(value)
     this.setState({template_type:value})
    }
   placeholderFunc=(input)=>{
    this.setState({placeholder:input})
   }
 componentDidMount(){
     this.saveClick();
     window.jQuery(".mscroll-y").mCustomScrollbar({
      axis:"y",
      scrollEasing:"linear",
       scrollInertia: 600,
      autoHideScrollbar: "true",
       autoExpandScrollbar: "true"
    });
   window.jQuery(".mscroll-x").mCustomScrollbar({
       axis:"x",
       scrollEasing:"linear",
        scrollInertia: 600,
     autoHideScrollbar: "true",
      autoExpandScrollbar: "true"
    });
 };

 checkChange=()=>{
  this.setState({check:!this.state.check},this.templateText)
};

saveClick=()=>{

    let id=this.props.location.state
      FetchAllApi.view_email_template( id,(err, response) => {
        if (response.status === 1) {
          this.setState({
            template_name:response.data[0].Template_name,
            template_type:response.data[0].Template_type,
            subject:response.data[0].subject,
            message:response.data[0].message,
            placeholder:response.data[0].insert_placeholder
          })
        }
      }); 
    }

    
    pageLink (page_slug) {
      this.props.history.push('/' + page_slug)
    }


    render(){
        return(
            <React.Fragment>
                <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()}/>
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <Sidebar pageSubmit={e => this.pageLink(e)}/>
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>View Email Template</h3>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <form className="custom-form col-md-12">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        {/* <div className="form-group row">
                          <label className="custom-checkbox small">
                            <input type="checkbox" name="default" defaultChecked="checked" />
                            Make as Default
                            <span className="checkmark" />
                          </label>
                        </div> */}
                        <div className="form-group row">
                          <label>Template Name</label>
                          <input type="text" className="form-control" name="template_name" disabled={true} value={this.state.template_name} onChange={this.handleChange} />
                        </div>
                        <div className="form-group row">
                          <label>Template Type</label>
                          <div className="custom-select-drop dropdown">
                            <a aria-expanded="false" aria-haspopup="true" disabled = {true} role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                              <span id="selected" disabled = {true}>{this.state.template_type}</span><span className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                              <li className="active"><a href="javascript:void(0);" onClick={() => this.handleChange("Estimate")}>Estimate</a></li>
                              <li><a href="javascript:void(0);" onClick={() => this.templateType("Invoice")} >Invoice</a></li>
                              <li><a href="javascript:void(0);" onClick={() => this.templateType("Sales Order")}>Sales Order</a></li>
                              <li><a href="javascript:void(0);" onClick={() => this.templateType("Credit Memo")}>Credit Memo</a></li>
                              <li><a href="javascript:void(0);" onClick={() => this.templateType("Purchase Order")}>Purchase Order</a></li>
                              <li><a href="javascript:void(0);" onClick={() => this.templateType("Statement")}>Statement</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="placeholder-right">
                            <div className="custom-select-drop dropdown placeholder">
                              <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn" href="javascript:;">
                                <span id="selected" disabled = {true}>{this.state.placeholder}</span><span className="caret" />
                              </a>
                              <ul className="dropdown-menu align-right">
                                <li className="active"><a href="javascript:;" onClick={()=>this.placeholderFunc("Amount Due")}>Amount Due</a></li>
                                <li><a href="javascript:;" onClick={()=>this.placeholderFunc("Contact Name")}>Contact Name</a></li>
                                <li><a href="javascript:;" onClick={()=>this.placeholderFunc("Customer Name")}>Customer Name</a></li>
                                <li><a href="javascript:;" onClick={()=>this.placeholderFunc("Credit Total")}>Credit Total</a></li>
                                <li><a href="javascript:;" onClick={()=>this.placeholderFunc("Delivery Total")}>Delivery Total</a></li>
                                <li><a href="javascript:;" onClick={()=>this.placeholderFunc("Statement")}>Statement</a></li>
                              </ul>
                            </div>
                          </div>
                          <div className="email-sec">
                            <div className="form-group">
                              <label>Subject</label>
                              <input type="text" className="form-control" disabled = {true} name="subject" value={this.state.subject} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                              <label>Message</label>
                              <textarea disabled = {true} className="form-control" cols={10} rows={15} defaultValue={""}  name="message" value={this.state.message} onChange={this.handleChange}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          
          {/* pf-btm-wrap Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}

            </React.Fragment>
        )
    }
}