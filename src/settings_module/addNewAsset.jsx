import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class AssetType extends React.Component{
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
                 asset_name:"",
                 asset_no:'',
                 asset_account:'',
                 asset_type:"",
                 purchase_price:"",
                 warranty_expiry:"",
                 effective_life:"",
                 serial_no:'',
                 start_date:'',
                 description:'',
                 residual_value:'',
                 cost_limit:"",
                 rate:'',
                 accumulated_account:'',
                 expense_account:"",
                 depreciation_method:'',
                 averaging_method:'',
                 asset_account_list:[],
                 accumulated_list:[],
                 expense_list:[],
                 depreciation_method_list:[],
                 averaging_method_list:[],

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

    componentDidMount(){
       this.getAssetAccount();
       this.getDepreciationMethod();
       this.getAveragingMethod();
       this.conditionFunc();

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

    conditionFunc=()=>{
      if(this.props.location.state !==undefined){
        this.getAssetDetails();
      }else{
        this.setState({asset_name:"",
        asset_no:'',
        asset_account:'',
        asset_type:"",
        purchase_price:"",
        warranty_expiry:"",
        effective_life:"",
        serial_no:'',
        start_date:'',
        description:'',
        residual_value:'',
        cost_limit:"",
        rate:'',
        accumulated_account:'',
        expense_account:"",
        depreciation_method:'',
        averaging_method:'',
        asset_account_list:[],
        accumulated_list:[],
        expense_list:[],
        depreciation_method_list:[],
        averaging_method_list:[],})
      }
    }


    changeFunc=(e)=>{
      console.log(e.target.value)
        this.setState({[e.target.name]:e.target.value})
    };

    changeDate=(e)=>{
      let date=e.target.value
    var array = date.split('/')
    var date_formated = array[2] + '-' + array[1] + '-' + array[0]
      this.setState({[e.target.name]:date_formated})
    };


    goBack=()=>{
      this.props.history.push("/fixed_assests")
    };

    arrowLink=()=>{
      debugger
      if(this.props.location.state !==undefined){
      this.props.history.push("/asset_view",this.props.location.state)
      }else{
        this.props.history.push("/fixed_assests")
      }
    }
     

    getAssetAccount=()=>{
      let client_id = this.state.logged_client_id;
      FetchAllApi.settings_asset_account(client_id,(err, response) => {
        if(response.status === 1){
          this.setState({asset_account_list:response.list})
        }
        })
    };


    getDepreciationMethod=()=>{
      let client_id = this.state.logged_client_id;
      FetchAllApi.settings_depreciation_method_list(client_id,(err, response) => {
        if(response.status === 1){
          this.setState({depreciation_method_list:response.list})
        }
        })
    };

    getAveragingMethod=()=>{
      let client_id = this.state.logged_client_id;
      FetchAllApi.settings_averaging_method_list(client_id,(err, response) => {
        if(response.status === 1){
          this.setState({averaging_method_list:response.list})
        }
        })
    };  
    
    editAsset=()=>{
      let input={
       asset_id:this.props.location.state,
        client_id:this.state.logged_client_id,
        asset_type_id:this.state.asset_account,
        averaging_method:this.state.averaging_method,
        rate:this.state.rate,
        effective_life_years:this.state.effective_life,
        warranty_expiry:this.state.warranty_expiry,
        cost_limit:this.state.cost_limit,
        residual_value:this.state.residual_value,
        serial_number:this.state.serial_no,
        description:this.state.description,
        depreciation_start_date:this.state.start_date,
        purchase_date:this.state.purchase_date,
        purchase_price:this.state.purchase_price,
        asset_name:this.state.asset_name,
        asset_number:this.state.asset_no,
        depreciation_method:this.state.depreciation_method,
        averaging_method:this.state.averaging_method
 
      }
      FetchAllApi.settings_edit_asset(input,(err, response) => {
        if(response.status === 1){
          alert("Asset Edited successfully")
        }
        });
    };
  

    addNewAsset=()=>{
      if(this.props.location.state !==undefined){
        let input={
          asset_id:this.props.location.state,
          client_id:this.state.logged_client_id,
          asset_type_id:this.state.asset_account,
          averaging_method:this.state.averaging_method,
          rate:this.state.rate,
          effective_life_years:this.state.effective_life,
          warranty_expiry:this.state.warranty_expiry,
          cost_limit:this.state.cost_limit,
          residual_value:this.state.residual_value,
          serial_number:this.state.serial_no,
          description:this.state.description,
          depreciation_start_date:this.state.start_date,
          purchase_date:this.state.purchase_date,
          purchase_price:this.state.purchase_price,
          asset_name:this.state.asset_name,
          asset_number:this.state.asset_no,
          depreciation_method:this.state.depreciation_method,
          averaging_method:this.state.averaging_method
  
        };
        FetchAllApi.settings_edit_asset(input,(err, response) => {
          if(response.status === 1){
            alert("Asset Edited successfully")
            this.props.history.push('/fixed_assests')
          }
          });
      }else {
        let input={
          client_id:this.state.logged_client_id,
          asset_type_id:this.state.asset_account,
          averaging_method:this.state.averaging_method,
          rate:this.state.rate,
          effective_life_years:this.state.effective_life,
          warranty_expiry:this.state.warranty_expiry,
          cost_limit:this.state.cost_limit,
          residual_value:this.state.residual_value,
          serial_number:this.state.serial_no,
          description:this.state.description,
          depreciation_start_date:this.state.start_date,
          purchase_date:this.state.purchase_date,
          purchase_price:this.state.purchase_price,
          asset_name:this.state.asset_name,
          asset_number:this.state.asset_no,
          depreciation_method:this.state.depreciation_method,
          averaging_method:this.state.averaging_method
  
        }
      FetchAllApi.settings_add_new_asset(input,(err, response) => {
        if(response.status === 1){
          alert("New Asset created successfully")
          this.props.history.push('/fixed_assests')
        }
        });}

        
    };


    getAssetDetails=()=>{
      let asset_id=this.props.location.state;
      FetchAllApi.settings_get_asset_values(asset_id,(err, response) => {
          if(response.status === 1){
            this.setState({
              asset_name:response.details.asset_name,
              asset_no:response.details.asset_number,
              asset_account:response.details.asset_type_id,
              depreciation_method:response.details.depreciation_method,
              averaging_method:response.details.averaging_method,
              rate:response.details.rate,
              effective_life:response.details.effective_life_years,
              purchase_date:response.details.purchase_date,
              purchase_price:response.details.purchase_price,
              description:response.details.description,
              serial_number:response.details.serial_number,
              start_date:response.details.depreciation_start_date,
              cost_limit:response.details.cost_limit,
              residual_value:response.details.residual_value,
              warranty_expiry:response.details.warranty_expiry,
              serial_no:response.details.serial_number,
  
  
            })
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
          <UserTopbar  logoutSubmit={(e) => this.logoutLink()}/>
          {/* header Ends here */}
          {/* <div class="title-sec col-md-12 col-xs-12">
        <h3>Subscribers</h3>
    </div> */}
          {/* user-content Starts here */}
          <section className="user-content row pad-b-no">
          <Sidebar pageSubmit={e => this.pageLink(e)}/>
          <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12 mar-btm">
                <h3>
                  <a href="javascript:;" onClick={this.arrowLink} className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  Fixed Assets &amp; Settings
                </h3>
              </div>
              <div className="col-md-12 col-xs-12">
                <form className="custom-form invoice-form row legend-form pad-no">
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Asset Detail</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Asset Name</label>
                      <input type="text"  className="form-control" name="asset_name" value={this.state.asset_name} onChange={this.changeFunc}/>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Asset No#</label>
                      <input type="text" name="asset_no" value={this.state.asset_no} onChange={this.changeFunc} className="form-control" />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Asset Type</label>
                      <div className="custom-select-drop dropdown">
                      <select className="dropdown-toggle btn form-control" name="asset_account" value={this.state.asset_account} onChange={this.changeFunc}>
                         <option value="">choose...</option>
                         {this.state.asset_account_list.map((acc,idx)=>{
                           return(
                           <option value={acc.asset_account}>{acc.name}</option>
                           )})}
                       </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Purchase Date</label>
                      <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                        <input type="text" name="purchase_date" value={this.state.purchase_date} onBlur={this.changeDate} className="form-control" />
                        <div className="input-group-addon">
                          <img src="images/calendar-icon.svg" alt="icon" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Purchase Price</label>
                      <input type="text" name="purchase_price" value={this.state.purchase_price} onChange={this.changeFunc} className="form-control" />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Warranty Expiry</label>
                      <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                        <input type="text" className="form-control" name="warranty_expiry" value={this.state.warranty_expiry} onBlur={this.changeDate} />
                        <div className="input-group-addon">
                          <img src="images/calendar-icon.svg" alt="icon" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Description</label>
                      <textarea className="form-control"  name="description" value={this.state.description} onChange={this.changeFunc}/>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Serial No#</label>
                      <input type="text" name="serial_no" value={this.state.serial_no} onChange={this.changeFunc} className="form-control" />
                    </div>
                  </div>
                  <div className="row mar-btm">
                    <div className="col-md-12 col-xs-12">
                      <span className="form-legend">Book Value</span>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Depreciation Start Date</label>
                      <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                        <input type="text" className="form-control" name="start_date" value={this.state.start_date} onBlur={this.changeDate} />
                        <div className="input-group-addon">
                          <img src="images/calendar-icon.svg" alt="icon" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Cost Limit</label>
                      <input type="text" name="cost_limit" value={this.state.cost_limit} onChange={this.changeFunc} className="form-control" />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Residual Value</label>
                      <input type="text" name="residual_value" value={this.state.residual_value} onChange={this.changeFunc} className="form-control" />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Depreciation Method</label>
                      <div className="custom-select-drop dropdown">
                      <select className="dropdown-toggle btn form-control" name="depreciation_method" value={this.state.depreciation_method} onChange={this.changeFunc}>
                           <option value="">choose...</option>
                          {this.state.depreciation_method_list.map((dep,idx)=>{
                            return(
                            <option value={dep.id}>{dep.name}</option>
                            )})}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label>Averaging Method</label>
                      <div className="custom-select-drop dropdown">
                      <select className="dropdown-toggle btn form-control" name="averaging_method" value={this.state.averaging_method} onChange={this.changeFunc}>
                          <option value="">choose...</option>
                          {this.state.averaging_method_list.map((aver,idx)=>{
                            return(
                            <option value={aver.id}>{aver.name}</option>
                            )})}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="custom-checkbox radio small">
                        <input type="radio" name="over" defaultChecked="checked" /> Rate
                        <span className="checkmark" />
                      </label>
                      <span className="right-placeholder">%</span>
                      <input type="text" className="form-control" name="rate" value={this.state.rate} onChange={this.changeFunc} />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <label className="custom-checkbox radio small">
                        <input type="radio" name="over" defaultChecked="checked" /> Effective Life (Years)
                        <span className="checkmark" />
                      </label>
                      <input type="text" className="form-control" name="effective_life" value={this.state.effective_life} onChange={this.changeFunc} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
          {/* pf-btm-wrap Starts here */}
          <div className="pf-btm-wrap bg-sticky">
            <div className="col-md-12 text-right pad-no">
              <button className="btn btn-lightgray">Cancel</button>
              <button className="btn btn-yellow">Save as Draft</button>
              <button className="btn btn-green" onClick={this.addNewAsset}>Register</button>
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