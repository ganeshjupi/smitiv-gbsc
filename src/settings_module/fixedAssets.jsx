import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import { Link } from "react-router-dom";
import Sidebar from './preferenceSide';
// import jQuery from 'jquery';
import moment from "moment";
import "./preference.css"



export default class fixed extends React.Component{
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
          toggle:false,
          assetTypeData:[],
          assetList:[],
          asset_account_list:[],
          testarr:[],
          depreciation_method_list:[],
          averaging_method_list:[],
          start:"",
          end:"",
          show:"none",
          last_depreciated_date:'',
          rollback_date:'',

        }
        this.end=React.createRef()
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
    
    componentDidMount=()=>{
      this.getAssetType();
      this.getAsset();
      this.getAssetAccount();
      this.getDepreciationMethod();
      this.getAveragingMethod();
      this.dateInitialChange();
      document.getElementById("button").style.display='none';

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

    toggleFunction=()=>{
       this.setState({toggle:true})
    };
    nextDisplay=(id)=>{
      this.props.history.push("/asset_view",id)
    };
    import=()=>{
      this.props.history.push('/fixed_assets_import')
    };

    assetDetailsSend=(id)=>{
      this.props.history.push('/fixed_assets_type_view',id)
    };

    
  componentDidUpdate() {
    
    window.jQuery(".selectpicker").selectpicker("refresh");
    window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy" });
    
  };

  dateInitialChange=()=>{
    let date=this.state.last_depreciated_date
    console.log('datedate',date)

    if(date != "" && date != null && date != undefined){
      let tomorrow = moment(date).add(1, 'days').format("DD/MM/YYYY")
    // let day=new Date(date);
    // let nextDay=new Date(day)
    // nextDay.setDate(day.getDate() + 1);
    // let tomorrow=nextDay.getDate()+"/"+nextDay.getMonth()+"/"+nextDay.getFullYear()
    this.setState({start:tomorrow},()=>{this.dateBaseRendering()})
    };
  };


  dateChange=(e)=>{
    if(e.target.value !== this.state.end){
      console.log(e.target.value)
    this.setState({[e.target.name]:e.target.value},()=>{this.dateBaseRendering()})
    }
  };


    dateBaseRendering=()=>{
      if(this.state.start !=="" && this.state.end !==""){
        let client_id = this.state.logged_client_id;
        let date =this.state.start;
        let start_date;
        if (date !== undefined && date !== "") {
          var array = date.split("/");
          var date_formated = array[2] + "-" + array[1] + "-" + array[0];
          start_date=date_formated}
        let date1 =this.state.end;
        let end_date;
        if (date1 !== undefined && date1 !== "") {
          var array = date1.split("/");
          var date_formated = array[2] + "-" + array[1] + "-" + array[0];
          end_date=date_formated}

      FetchAllApi.settings_asset_date_based_list(client_id,start_date,end_date,(err, response) => {
        if (response.status === 1) {
          this.setState({assetList:response.asset_details,});
          document.getElementById("button").style.display='block';
        }
      });
      }
    }
    

    getAssetType=()=>{
      let client_id = this.state.logged_client_id;
      FetchAllApi.settings_asset_type_list(client_id,(err, response) => {
        if (response.status === 1) {
          // var response=response.list;
          //  response.map((type,idx)=>{
                       
          //       })
             
        this.setState({ testarr : response.list,assetTypeData:response.list})
        
        }
      });
    };


    getAssetAccount=()=>{
      let client_id = this.state.logged_client_id;
      FetchAllApi.settings_account_list(client_id,(err, response) => {
        if(response.status === 1){
          this.setState({asset_account_list:response.list})
        }
       console.log("test", response)
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

   goToConfirm=()=>{
    if(this.state.start !=="" && this.state.end !==""){
      let client_id = this.state.logged_client_id;
      let date =this.state.start;
        let start_date;
        if (date !== undefined && date !== "") {
          var array = date.split("/");
          var date_formated = array[2] + "-" + array[1] + "-" + array[0];
          start_date=date_formated}
        let date1 =this.state.end;
        let end_date;
        if (date1 !== undefined && date1 !== "") {
          var array = date1.split("/");
          var date_formated = array[2] + "-" + array[1] + "-" + array[0];
          end_date=date_formated}
    FetchAllApi.settings_asset_depreciation_confirm(client_id,start_date,end_date,(err, response) => {
      if (response.status === 1) {
       alert("depreciation confirmed")
       window.location.reload(true)
      }else {
        alert(response.message)
      }
    });
    }
   }

    getAsset=()=>{
      let client_id = this.state.logged_client_id;
      FetchAllApi.settings_asset_list(client_id,(err, response) => {
        if (response.status === 1) {
          this.setState({assetList: response.details,last_depreciated_date:response.last_depreciated_date},this.dateInitialChange);
        }
      });
    };

    handleSubmit=()=>{
      let date=this.end.current.value;
      if (date !== undefined && date !== "") {
        var array = date.split("/");
        var end_date = array[2] + "-" + array[1] + "-" + array[0];
      this.setState({rollback_date:end_date},this.finalApiCall)
      }
    };

    finalApiCall=()=>{
      let client_id = this.state.logged_client_id;
      let end_date=this.state.rollback_date
      
      FetchAllApi.settings_asset_rollback(client_id,end_date,(err, response) => {
        if (response.status === 1) {
          alert("Depreciation rollbacked successfully")
          window.location.reload(true)
        }else{
          alert(response.message)
        }
      })};


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
            <Sidebar pageSubmit={e => this.pageLink(e)} />
            <div className="user-cont-right">
              <div className="title-sec col-md-12 col-xs-12 mar-btm">
                <h3>
                  Fixed Assets &amp; Settings
                </h3>
                <div>
                    <Link to="/new_asset">
                  <button className="btn btn-blue with-icon mar-rgt-5">
                    <img src="images/plus-add.svg" className="filter-white" />
                    New Asset Type
                  </button>
                  </Link>
                  {/* <div className="dib">
                    <div className="dropdown menu-item mar-rgt-5">
                      <button className="btn btn-blue dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false">More<span className="caret" /></button>
                      <ul className="dropdown-menu align-right">
                        <li><a href="javascript:;" onClick={this.import}>Import</a></li>
                        <li><a href="javascript:;">Export</a></li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <ul className="nav nav-pills transparent nowrap ofx-auto">
                    <li className="active"><a data-toggle="pill" href="#AssetType">Asset Type & Depreciation settings</a></li>
                    <li><a data-toggle="pill" href="#Asset" >Asset list & Run Depreciation</a></li>
                  </ul>
                </div>
                </div>
               
              <div className="col-md-12 col-xs-12" >
              <div className="row tab-content mar-top pad-top" >
              {this.state.assetTypeData.length ==0?(
                   <div id="AssetType" className="col-md-12 tab-pane fade active in pad-no">
                   <div className="landing-wrap">
                     <div className="img-concept text-center">
                       <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                       <p>Looks like there's no data</p>
                     </div>
                   </div>
                 </div>
                ):(
              <div id="AssetType" className="col-md-12 tab-pane fade active in pad-no" >
              <div className="row" >
                  <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 pad-no" >
                    <div className="table-responsive">
                      <table className="table detail-report">
                        <thead className="th-vm">
                          <tr>
                            <th className="text-left">
                            Asset Account/Type
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                            Accumulated Depreciation Account
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                            Depreciation Expense Account
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                            Depreciation Method
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                            Averaging Method
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                            Rate
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                            Effective Life(Years)
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.assetTypeData.map((type,idx)=>{
                          return(
                            <tr onClick={()=>{this.assetDetailsSend(type.id)}}>
                            <td className="text-left-imp" >
                              {/* {this.state.testarr.find( (e) => {
                                if(e.asset_account === type.asset_account){
                                  return e.id
                                }
                              }
                              )} */}

                              {this.state.asset_account_list.map( e => {
                                if(e.id === type.asset_account){
                                  return e.name
                                }
                              })}
                             </td>
                            <td>
                              {this.state.asset_account_list.map( e => {
                                if(e.id === type.accumulated_depreciation_account){
                                  return e.name
                                }
                              })}
                            </td>
                            <td>
                            {this.state.asset_account_list.map( e => {
                                if(e.id === type.depreciation_expense_account){
                                  return e.name
                                }
                              })}
                            </td>
                            <td>
                            {this.state.depreciation_method_list.map( e => {
                                if(e.id === type.depreciation_method){
                                  return e.name
                                }
                              })}
                            </td>
                            <td className="text-right">
                            {this.state.averaging_method_list.map( e => {
                                if(e.id === type.averaging_method){
                                  return e.name
                                }
                              })}
                             
                            </td>
                            <td>{type.rate}%</td>
                            <td>{type.effective_life_years}</td>
                          </tr>

                        )})
                        }  
                        
                        </tbody>
                      </table>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                
               
                <div id="Asset" className="col-md-12 tab-pane fade in pad-no">
                {this.state.toggle==true?(            
                  <div className="row">
                  <div className="depreciate-row">
                <p className="depreciate-block">Last depreciation: {this.state.last_depreciated_date}</p>
                  <div>
                    <button className="btn btn-blue mar-ver-5 no-edit mar-rgt-5">Run Depreciation</button>
                    <button className="btn btn-blue mar-rgt-5" data-toggle="modal"   data-target="#rollback-depreciation">Rollback Depreciation</button>
                  </div>
                </div>
                <div className="custom-form filter-form col-md-12 col-xs-12 mar-top">
                  <a href="javascript:;" className="close-btn">
                    <img src="images/cross-red.svg" onClick={()=>{this.setState({toggle:false})}} />
                  </a>
                  <div className="row">
                    <h5 className="col-md-12 col-xs-12 mar-t-no mar-btm">Depreciate</h5>
                    <div className="form-group col-lg-4 col-md-6">
                      <label>Start Date</label>
                      <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                        <input type="text" className="form-control" name="start" id="fromdate1" value={this.state.start}   onBlur={this.dateChange} />
                        <div className="input-group-addon">
                          <img src="images/calendar-icon.svg" alt="icon" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-lg-4 col-md-6">
                      <label>End Date</label>
                      <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" >
                        <input type="text" className="form-control" name="end" id   onBlur={this.dateChange} />
                        <div className="input-group-addon">
                          <img src="images/calendar-icon.svg" alt="icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>):(
                <div className="row">
                  <div className="depreciate-row">
              <p className="depreciate-block">Last depreciation: {this.state.last_depreciated_date}</p>
                    <button className="btn btn-blue" onClick={this.toggleFunction} >Run Depreciation</button>
                  </div>
                </div>)}  
                <div className="row">
                  <div className="report-table reconcile-table pad-td-rgt col-md-12 col-xs-12 pad-no" >
                    <div className="table-responsive">
                      <table className="table detail-report">
                        <thead className="th-vm">
                          <tr>
                            <th className="text-left">
                              Narration/Asset Name
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Asset No
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Asset Type
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Purchase Date
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                              Purchase Price
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Accumulated Depreciation Account 
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Accumulated Depreciation Amount<br />
                              <small>as of last depreciation</small>
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th>
                              Depreciation Expense Account
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                              Depreciation Amount for the Month
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                            <th className="text-right">
                              Book Value
                              <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                         {this.state.assetList.map((ass,idx)=>{
                           return(
                          <tr onClick={()=>{this.nextDisplay(ass.id)}}>
                            <td className="text-left-imp" >{ass.asset_name}</td>
                           <td>FA-{ass.asset_number}</td>
                            <td>{this.state.assetTypeData.map( e => {
                                if(e.id === ass.asset_type_id){                                 
                                  return(this.state.asset_account_list.map( data => {
                                    if(data.id === e.asset_account){
                                      return data.name
                                    }}))}})}    
                              </td>
                           <td>{ass.purchase_date}</td>
                           <td className="text-right">{ass.purchase_price}</td>
                            <td> {this.state.asset_account_list.map( e => {
                                if(e.id === ass.accumulated_depreciation_account){
                                  return e.name
                                }
                              })}</td>
                            <td>{ass.depreciation_amount_as_of_last_depreciation}</td>
                            <td> {this.state.asset_account_list.map( e => {
                                if(e.id === ass.depreciation_expense_account){
                                  return e.name
                                }
                              })}</td>
                            <td className="text-right">{ass.depreciation_amount_for_the_month}</td>
                            <td className="text-right">{ass.book_value}</td>
                          </tr>   
                           )})}
                        </tbody>
                      </table>
                    </div>
                    </div>
                </div>
                <button class="btn btn-blue dropdown-toggle btn-arrow" id="button" style={{float:"right"}} onClick={this.goToConfirm}>Confirm</button>  
              </div>
                
            </div>
            </div>
            </div>
          </section>
          {/* user-content Ends here */}
        </div>
        {/* Main Wrapper Ends here */}
        <div className="modal fade pop-modal" id="rollback-depreciation" role="dialog">
          <div className="modal-dialog modal-xs custom-modal">
            {/* Modal content*/}
            <button type="button" className="close hidden-xs" data-dismiss="modal">
              <img className="img-responsive" src="images/close-red.svg" alt="icon" />
            </button>
            <div className="modal-content">
              <div className="modal-body text-center">
                <h3>Rollback Depreciation</h3>
                <form className="custom-form row column">
                  <div className="form-group col-md-12 col-xs-12">
                    <label>Rollback to</label>
                    <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy" data-provide="datepicker">
                        <input type="text" className="form-control" name="start" ref={this.end}  />
                        <div className="input-group-addon">
                          <img src="images/calendar-icon.svg" alt="icon" />
                        </div>
                      </div>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 text-left">
                    <p className="fs-13"><strong>If you click Save,</strong> <br />All depreciation in the Rollback period will be reversed</p>
                  </div>
                  <div className="form-group col-md-12 col-xs-12 mh btn-sec text-center mar-b-no">
                    <button className="btn btn-lightgray mar-rgt-5" data-dismiss="modal"  onClick={()=>this.end.current.value = ''} >Cancel</button>
                    <input type="button" data-dismiss="modal" className="btn btn-green mar-rgt-5" value="Save" onClick={this.handleSubmit}/>
                  </div>
                </form>
              </div>
            </div>
            </div>
            </div>
        {/* Bootstrap Select Picker JS */}
        {/* Scrollbar Js */}
        {/* Bootstrap Datepicker JS */}
        {/* jQueryUI JS */}

            </React.Fragment>
        )
    }
}