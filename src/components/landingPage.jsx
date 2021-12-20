import React from "react";
import LeftSidebar from "./left_sidebar";
import Footer from "./footer";

import Topbar from "./topbar";

import FetchAllApi from "../api_links/fetch_all_api";

import { PDFtoIMG } from "react-pdf-to-image";

import $ from "jquery";


var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";

class LandingPage extends React.Component {
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

            AllClientMail: localStorage.getItem("AllClientMail"),

        };
    };

    pageLink(page_slug) {
        this.props.history.push("/" + page_slug);
    };


    logoutLink() {
        localStorage.clear();

        this.props.history.push("/");
    }

    componentDidMount() {
        $(".remove-wrap").click(function () {
            $(".add-app-wrap").fadeOut();
        });
    }
    render() {
        return (

            <div>
                <div className="add-app-wrap">
                    <p className="fw-med">Get the mobile app here</p>
                    <a href="genie-android.apk" >
                        <img className="img-responsive" src="images/android-icon.svg" alt="Android" />
                    </a>
                    <a href="javascript:;">
                        <img className="img-responsive" src="images/ios-icon.svg" alt="iOS" />
                    </a>
                    <button className="remove-wrap btn">
                        <img className="img-responsive" src="images/close-red.svg" alt="close" />
                    </button>
                </div>
                {/* Main Wrapper Starts here */}
                <div className="container-fluid">
                    <div className="row">
                        {/* left-navbar Starts here */}
                        <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />
                        <div className="menu-close visible-xs">&nbsp;</div>
                        {/* left-navbar Ends here */}
                        {/* MainContent Wrapper Starts here */}
                        <div className="main-wrap col-md-12 col-xs-12 pad-r-no">
                            {/* Top bar Starts here */}
                            <div className="top-bar col-md-12 col-xs-12 pad-r-no">
                                <form className="hdr-search">
                                    <input type="text" className="form-control" name="search" placeholder="Search..." />
                                    {/* <button type="submit" class="btn btn-green">Search</button> */}
                                    <a href="javascript:;" className="close-icon"><img src="images/close-icon-red.svg" alt="Close" /></a>
                                </form>
                                <div className="nav-brand-res visible-xs"><img className="img-responsive" src="images/logo-icon.png" alt="LogoIcon" /></div>

                                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                                    <li><a href="javascript:;">Welcome</a></li>
                                </ul>
                                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} AllClientMail={this.state.AllClientMail == 'yes' ? 'yes' : ''} />
                            </div>
                            {/* Top bar Ends here */}

                            {/* Main Content Starts here */}
                            <div className="main-content col-md-12 col-xs-12">

                                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                                    <div className="landing-wrap">
                                        <div className="img-concept">

                                            <img className="img-responsive" src="images/login-img.png" alt="img" />

                                        </div>
                                        <p className='lead welcome'>Welcome to GENIE<span>Please use Left Bar to view further pages</span> </p>
                                    </div>
                                </div>
                            </div>
                            {/* Main Content Ends here */}
                        </div>

                        {/* MainContent Wrapper Ends here */}
                    </div>

                </div>

                {/* Main Wrapper Ends here */}
                {/* footer Starts here */}
                <footer className="container-fluid">
                    <p>© Copyrights 2019, Genie. All Rights Reserved.</p>
                </footer>
                {/* footer Ends here */}
            </div>

        );
    }
}
export default LandingPage;
