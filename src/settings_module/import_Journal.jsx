import React from "react";
import UserTopbar from "../components/first_user_module/header";
import FetchAllApi from "../api_links/fetch_all_api";
import Sidebar from './preferenceSide';
import jQuery from 'jquery'
import "./preference.css"



export default class Import extends React.Component{
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
    }

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
                  <a href="javascript:;" className="back">
                    <img src="images/back-arrow-blue.svg" />
                  </a>
                  Import Manual Journal
                </h3>
                <div>
                  <div className="dib">
                    <div className="dropdown menu-item">
                      <button className="btn btn-blue dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false">New Journal<span className="caret" /></button>
                      <ul className="dropdown-menu align-right">
                        <li><a href="javascript:;">New Journal</a></li>
                        <li><a href="javascript:;">New Repeating Journals</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-xs-12">
                <div className="row">
                  <div className="col-md-12 upload-sec-encl">
                    <div className="row">
                      <div className="col-md-4 col-sm-4 col-xs-12 text-center upload-step">
                        <span className="point">1</span>
                        Download our manual <br /> journal template file
                      </div>
                      <div className="col-md-4 col-sm-4 col-xs-12 text-center upload-step">
                        <span className="point">2</span>
                        Copy your manual journal into <br /> the template
                      </div>
                      <div className="col-md-4 col-sm-4 col-xs-12 text-center upload-step">
                        <span className="point">3</span>
                        Import the updated template <br /> file
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="upload-sec">
                      <p className="note"><span className="text-red">Note:</span> Do not change the column headings in the template file. These need to be unchanged for the import to work in the next step.</p>
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