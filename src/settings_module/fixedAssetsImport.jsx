import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import { Link } from "react-router-dom";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class FixImport extends React.Component{
    constructor(props){
        super(props)
     this.state={
          file:"",
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

    fileUpload = e => {
      console.log(e.target.files[0])
       if(e.target.files[0].size<=1000000){
         let image = window.URL.createObjectURL(e.target.files[0])
         this.setState({file:image})
       }else{
         alert("wrong")
       }
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
              <div className="title-sec col-md-12 col-xs-12 mar-btm">
                <h3>
                  <a href="/fixed_assests" className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  Import Fixed Assets
                </h3>
                <div>
                  <button className="btn btn-blue with-icon">
                    <img src="images/plus-add.svg" className="filter-white" />
                    Add Currency
                  </button>
                </div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <div className="col-md-12 upload-sec-encl">
                    <div className="row">
                      <div className="col-md-3 col-sm-6 col-xs-12 text-center upload-step mar-ver">
                        <span className="point">1</span>
                        Download the fixed <br />assets template
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs-12 text-center upload-step mar-ver">
                        <span className="point">2</span>
                        Ensure asset types <br />exist
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs-12 text-center upload-step mar-ver">
                        <span className="point">3</span>
                        Select your date format
                        <form className="custom-form h-small">
                          <div className="custom-select-drop dropdown mar-ver-5">
                            <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                              <span id="selected">dd/mm/yyyy</span><span className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                              <li className="active"><a href="javascript:;">dd/mm/yyyy</a></li>
                              <li><a href="javascript:;">mm/dd/yyyy</a></li>
                            </ul>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs-12 text-center upload-step mar-ver">
                        <span className="point">4</span>
                        Upload the updated <br />template file
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="upload-sec">
                      <p className="note"><span className="text-red">Note:</span> This template has the required column headings needs to correctly import your fixed assets. Only columns marked with an asterix * are mandatory. Changes to the column order of the template file will fail the import</p>
                      <form className="custom-form">
                        <div className="form-group">
                        <a href="javascript:;"  className="btn btn-wide">
                          <label for="myfile">
                            <img src="images/upload-file.svg" alt="icon" />
                            <input type="file" id="myfile"  name="myfile" onChange={this.fileUpload}  style={{ display: "none" }}/>
                            Upload your template here</label>
                          </a>
                        </div>
                        <a href="javascript:;" className="text-link">Download our sample CSV template</a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* user-content Ends here */}
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