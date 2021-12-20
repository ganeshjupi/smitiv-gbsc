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
          placeholder:'',
          check:true,
        }
    };

    componentDidUpdate() {

      window.jQuery(".selectpicker").selectpicker("refresh");
      window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy" });
  
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
    templateType=(e)=>{
     this.setState({template_type:e.target.value},this.templateText)
    }
   placeholderFunc=(input)=>{
    this.setState({placeholder:input})
   };

   checkChange=()=>{
    this.setState({check:!this.state.check},this.templateText)
  };

 templateText=()=>{
  let val=this.state.template_type
   if(val=="Estimate"){
    if(this.state.check == true){
     this.setState({subject:"Estimate from [Trading Name] for [Contact Name]",
     message:`Hi [Contact First Name],<br>
     Here's Quotation [Estimate Number] for [Currency Code] [Estimate Total Without Currency].<br>
    
     If you have any questions, please let us know.<br><br>
     Thanks,<br>
     [Trading Name].`
    //  `Hi [Contact First Name],
    //  Here's Estimate [Estimate Number] for [Currency Code] [Estimate Total Without Currency].
    //  The amount outstanding of [Currency Code] [Amount Due Without Currency] is due on [Due Date].

    //  View and pay your bill online: [Estimate Invoice Link]
    //  From your online bill you can print a PDF, export a CSV, or create a free login and view your outstanding bills.
     
    //  If you have any questions, please let us know.
     
    //  Thanks, 
    //  [Trading Name]`
    })}else{
      this.setState({subject:'',message:''})
    }
   }else   if(val=="Invoice"){
    if(this.state.check == true){
    this.setState({subject:"Invoice [Invoice Number] from [Trading Name] for [Contact Name]",
    message:`Hi [Contact First Name],<br>
    Here's invoice [Invoice Number] for [Currency Code] [Invoice Total Without Currency].<br>
    The amount outstanding of [Currency Code] [Amount Due Without Currency] is due on [Due Date].<br><br>
    If you have any questions, please let us know.<br><br>
    Thanks,<br>
    [Trading Name].`
    // `Hi [Contact First Name],
    // Here's invoice [Invoice Number] for [Currency Code] [Invoice Total Without Currency].
    // The amount outstanding of [Currency Code] [Amount Due Without Currency] is due on [Due Date].

    // View and pay your bill online: [Online Invoice Link]
    // From your online bill you can print a PDF, export a CSV, or create a free login and view your outstanding bills.
    
    // If you have any questions, please let us know.
    
    // Thanks,
    // [Trading Name]`
  })}else{
      this.setState({subject:'',message:''})
    }
  }else   if(val=="Sales Order"){
    if(this.state.check == true){
    this.setState({subject:"Sales Order from [Trading Name] for [Contact Name]",
    message:`Hi [Contact First Name],<br>
    Here's sales order [sales order Number] for [Currency Code] [sales order Total Without Currency].<br>
    The amount outstanding of [Currency Code] [Amount Due Without Currency] is due on [Due Date].<br><br>
    If you have any questions, please let us know.<br><br>
    Thanks,<br>
    [Trading Name].`,
    // `Hi [Contact First Name],
    // Here's sales order [sales order Number] for [Currency Code] [sales order Total Without Currency].
    // The amount outstanding of [Currency Code] [Amount Due Without Currency] is due on [Due Date].

    // View and pay your bill online: [Online sales order Link]
    // From your online bill you can print a PDF, export a CSV, or create a free login and view your outstanding bills.
    
    // If you have any questions, please let us know.
    
    // Thanks,
    // [Trading Name]`
  })}else{
      this.setState({subject:'',message:''})
    }
  }else   if(val=="Purchase Order"){
    if(this.state.check == true){
    this.setState({subject:"Purchase Order [Purchase Order Number] from [Trading Name] for [Contact Name]",
    message:`Hi [Contact First Name],<br>
    Here's purchase order [Purchase Order Number] for [Currency Code] [Purchase Order Total Without Currency].<br><br>
    
    Delivery due date, address and instructions are included in the purchase order.<br>
    If you have any questions, please let us know.<br><br>
    
    Thanks,<br>
    [Trading Name].`
    // `Hi [Contact First Name],

    // Here's purchase order [Purchase Order Number] for [Currency Code] [Purchase Order Total Without Currency].
    
    // Delivery due date, address and instructions are included in the purchase order.
    
    // If you have any questions, please let us know.
    
    // Thanks,
    // [Trading Name]`
  })}else{
      this.setState({subject:'',message:''})
    }
  }else   if(val=="Statement"){
    if(this.state.check == true){
    this.setState({subject:"Statement from [Trading Name] for [Contact Name]",
    message:
    `Hi [Contact First Name],

    Here's your statement [Statement Date Range]
    
    If you have any questions, please let us know.
    
    Thanks,
    [Trading Name]`
  })}else{
      this.setState({subject:'',message:''})
    }
  }else   if(val=="Credit Memo"){
      if(this.state.check == true){
    this.setState({subject:"Credit Memo from [Trading Name] for [Contact Name]",
    message:`Hi [Contact First Name],<br>
    Here's Credit Memo [Credit Memo Number] for [Currency Code] [Credit Memo Total Without Currency].<br>
    The amount outstanding of [Currency Code] [Amount Due Without Currency] is due on [Due Date].<br><br>
    If you have any questions, please let us know.<br><br>
    Thanks,<br>
    [Trading Name].`
    // `Hi [Contact First Name],
    // Here's Credit Memo [Credit Memo Number] for [Currency Code] [Credit Memo Total Without Currency].
    // The amount outstanding of [Currency Code] [Amount Due Without Currency] is due on [Due Date].

    // View and pay your bill online: [Credit Memo Invoice Link]
    // From your online bill you can print a PDF, export a CSV, or create a free login and view your outstanding bills.
    
    // If you have any questions, please let us know.
    
    // Thanks,
    // [Trading Name]`
  })}else{
      this.setState({subject:'',message:''})
    }
  }
 };


componentDidMount(){
  this.fromData();

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
}

fromData=()=>{
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


saveClick=()=>{


        let data={
        id:this.props.location.state,
        Template_name:this.state.template_name,
        Template_type:this.state. template_type,
        subject:this.state.subject,
        message:this.state.message,
        insert_placeholder:this.state.placeholder,
        client_id:this.state.logged_client_id,
      }
      FetchAllApi.edit_email_template( data,(err, response) => {
        if (response.status === 1) {
          alert("Email Edited  successfully")
          this.props.history.push("/preference_Email")
        }
      }); 
    

    
};


pageLink (page_slug) {
  this.props.history.push('/' + page_slug)
}


    render(){
        return(
            <React.Fragment>
                <div className="container-fluid">
          {/* header Starts here */}
          <UserTopbar logoutSubmit={(e) => this.logoutLink()} />
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
            <Sidebar pageSubmit={e => this.pageLink(e)}/>
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12">
                <h3>Edit Email Template</h3>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <form className="custom-form col-md-12">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="form-group row">
                          <label className="custom-checkbox small">
                            <input type="checkbox" name="default" defaultChecked={this.state.check} onChange={this.checkChange} />
                            Make as Default
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="form-group row">
                          <label>Template Name<span className="astrick">*</span></label>
                          <input type="text" className="form-control" name="template_name" value={this.state.template_name} onChange={this.handleChange} />
                        </div>
                        <div className="form-group row">
                          <label>Template Type<span className="astrick">*</span></label>
                          <div className="custom-select-drop dropdown">
                          
                               <select className="selectpicker form-control hh " name="template_type" value={this.state.template_type} onChange={this.templateType} >
                              <option value="">choose...</option>
                              <option  value="Estimate">Estimate</option>
                              <option  value= "Invoice">Invoice</option>
                              <option  value="Sales Order">Sales Order</option>
                              <option  value="Credit Memo">Credit Memo</option>
                              <option  value="Purchase Order">Purchase Order</option>
                              <option  value="Statement">Statement</option>
                             </select>
                          </div>
                          
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="placeholder-right">
                            <div className="custom-select-drop dropdown placeholder">
                              <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn" href="javascript:;">
<span id="selected">{this.state.placeholder}</span><span className="caret" />
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
                              <label>Subject<span className="astrick">*</span></label>
                              <input type="text" className="form-control" name="subject" value={this.state.subject} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                              <label>Message<span className="astrick">*</span></label>
                              <textarea className="form-control" cols={10} rows={15} defaultValue={""}  name="message" value={this.state.message} onChange={this.handleChange}/>
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
          <div className="pf-btm-wrap bg-sticky">
            <div className="col-md-12 text-right pad-no">
              <button className="btn btn-lightgray mar-rgt-5" onClick={()=>{window.location.reload() }}>Cancel</button>
              <button className="btn btn-green mar-rgt-5"onClick={this.saveClick}>Save</button>
            </div>
          </div>
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