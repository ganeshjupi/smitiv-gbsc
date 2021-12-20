import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import jQuery from "jquery";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import moment from "moment";




class TrialBalanceReport extends React.Component {
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


            role_permissions:
                JSON.parse(localStorage.getItem("role_permissions")) || [],

            start_date: " 2010-01-01",
            end_date: moment().format("YYYY-MM-DD"),
            resData: '',
            tableData: '',

        };
    }

    repeat = (sub_categories, paddingLeft) => {
        console.log("july", paddingLeft);

        if (sub_categories) {
            return (
                <React.Fragment>
                    {sub_categories &&
                        sub_categories.length > 0 &&
                        Object.keys(sub_categories[0]).map((itm, i) => {

                            return (
                                <React.Fragment key={i}>

                                    {
                                        ((Number(sub_categories[0][itm].total_debit) != 0) ||
                                            Number(sub_categories[0][itm].total_credit) != 0) && (
                                            <React.Fragment>
                                                <tr className="item-step1">
                                                    <td style={{
                                                        paddingLeft: `${paddingLeft}px`,

                                                    }}><span>{sub_categories[0][itm].category_name}</span></td>
                                                    <td><span className="text-right">{sub_categories[0][itm].total_debit}</span></td>
                                                    <td><span className="text-right">{sub_categories[0][itm].total_credit}</span></td>
                                                </tr>


                                                {sub_categories[0][itm].is_child_data_available == 1 &&
                                                    this.repeat(
                                                        sub_categories[0][itm].sub_categories,
                                                        paddingLeft + 45
                                                    )}


                                                {sub_categories[0][itm].is_child_data_available === 1 &&
                                                    (sub_categories[0][itm].total_others_debit != 0 || sub_categories[0][itm].total_others_credit != 0)
                                                    &&
                                                    <tr className="item-step1">
                                                        <td style={{
                                                            paddingLeft: `${paddingLeft}px`,

                                                        }}><span>Others - {sub_categories[0][itm].category_name}</span></td>
                                                        <td><span className="text-right">{sub_categories[0][itm].total_others_debit}</span></td>
                                                        <td><span className="text-right">{sub_categories[0][itm].total_others_credit}</span></td>
                                                    </tr>
                                                }



                                            </React.Fragment>
                                        )}


                                </React.Fragment>
                            );
                        })}
                </React.Fragment>
            );
        }
    };

    trial_balance = () => {
        let input = {
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            client_id: this.state.logged_client_id,
            // client_id: 226,
            filter_id: [],
            filter_options: {
            },
            sort_by_column_key: '',
            sort_by: ''
        }
        FetchAllApi.trial_balance(input, (err, response) => {
            if (response.status === 1) {
                console.log("rty", response);
                this.setState({ resData: response, tableData: Object.values(response.details) });
            } else {
            }
        });
    };

    changefromDate(fromdate) {
        let date = jQuery("#fromdate").val();
        if (date != undefined && date!='') {
            var array = date.split("/");
            var date_formated = array[2] + "-" + array[1] + "-" + array[0];
            this.setState({ start_date: date_formated }, () => {
                this.trial_balance();
            });
        }
    }
    changetoDate(todate) {
        // alert(jQuery('#todate').val())
        let date = jQuery("#todate").val();
        if (date != undefined && date!='') {
        var array = date.split("/");
        var date_formated = array[2] + "-" + array[1] + "-" + array[0];
        console.log("ewewew", array);
        this.setState({ end_date: date_formated }, () => {
            this.trial_balance();
        });
    }
    }
    changedatevalue(seleteddateformat) {
        var dateresult = moment();
        let from_date, to_date;

        if (seleteddateformat === "This Month-to-date") {
            from_date = dateresult.startOf("month");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            document.getElementById("todate").value = moment(new Date()).format(
                "DD-MM-YYYY"
            );
            this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
            this.trial_balance();
        } else if (seleteddateformat === "This Week") {
            from_date = dateresult.startOf("week");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            console.log("startdate", this.state.start_date);
            to_date = dateresult.endOf("week");
            document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
            this.state.end_date = to_date.format("YYYY-MM-DD");
            this.trial_balance();
        } else if (seleteddateformat === "This Month") {
            from_date = dateresult.startOf("month");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            to_date = dateresult.endOf("month");
            document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
            this.state.end_date = to_date.format("YYYY-MM-DD");
            this.trial_balance();
        } else if (seleteddateformat === "This Week-to-date") {
            from_date = dateresult.startOf("week");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            document.getElementById("todate").value = moment(new Date()).format(
                "DD-MM-YYYY"
            );
            this.state.end_date = moment(new Date()).format("YYYY-MM-DD");
            this.trial_balance();
        } else if (seleteddateformat === "This Year") {
            from_date = dateresult.startOf("year");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            to_date = dateresult.endOf("year");
            document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
            this.state.end_date = to_date.format("YYYY-MM-DD");
            this.trial_balance();
        } else if (seleteddateformat === "This Year-to-date") {
            from_date = dateresult.startOf("year");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            to_date = moment(new Date()).format("YYYY-MM-DD");
            document.getElementById("todate").value = moment(to_date).format(
                "DD-MM-YYYY"
            );
            this.state.end_date = to_date;
            this.trial_balance();
        }
        // let startDate = jQuery('#fromdate').val()
        // let end_date = jQuery('#todate').val()
        // this.setState({ start_date: startDate, end_date: end_date }, () => {
        //   this.trial_balance();

        // })
        if (seleteddateformat == "ALL") {
            this.setState(
                {
                    start_date: " 2010-01-01",
                    end_date: moment().format("YYYY-MM-DD"),
                },
                () => {
                    this.trial_balance();
                }
            );
            document.getElementById("fromdate").value = "";
            document.getElementById("todate").value = "";
        }
    }

    componentDidUpdate() {
        window.jQuery(".selectpicker").selectpicker("refresh");
        // jQuery("#currency_selected").val(4);
    }

    UNSAFE_componentWillMount() {
        jQuery(document.body).removeClass("minimize_leftbar");
        //console.log("logged_user_id", this.state.logged_user_id);

        jQuery("title").html("Customer | GBSC");

        if (
            this.state.logged_user_id === "" ||
            this.state.logged_user_id === "null" ||
            this.state.logged_user_id === "undefined"
        ) {
            this.props.history.push("/");
        }
    }

    routedChange(parameter) {
        this.props.history.push("/" + parameter);
        window.scrollTo(0, 0);
    }

    componentDidMount() {

        this.trial_balance()

        document.getElementById("sticky-tb-hdr").addEventListener("scroll", function () {
            var translate = "translate(0," + this.scrollTop + "px)";
            if (this.querySelector("thead") != null && this.querySelector("thead") != undefined && this.querySelector("thead").style != null) {
                this.querySelector("thead").style.transform = translate;
            }
        });

        jQuery(window).on("load", function () {
            window.jQuery(".mscroll-y").mCustomScrollbar({
                axis: "y",
                scrollEasing: "linear",
                scrollInertia: 600,
                autoHideScrollbar: "true",
                autoExpandScrollbar: "true",
            });

            window.jQuery(".ib-scroll").mCustomScrollbar({
                scrollEasing: "linear",
                scrollInertia: 600,
                scrollbarPosition: "outside",
            });
        });

        jQuery(document).ready(function () {
            jQuery(".left-navmenu .has-sub").click(function () {
                jQuery(".left-navmenu li a").removeClass("active");
                jQuery(this).addClass("active");
                jQuery(".left-navmenu li a:not(.active)")
                    .siblings(".sub-menu")
                    .slideUp();
                jQuery(this).siblings(".sub-menu").slideToggle();
            });
            jQuery(".left-navmenu .sub-menu li a").click(function () {
                jQuery(".left-navmenu .sub-menu li a").removeClass("active");
                jQuery(this).addClass("active");
            });
            jQuery(".search-btn").click(function () {
                jQuery(".hdr-search").addClass("active");
            });
            jQuery(".hdr-search .close-icon").click(function () {
                jQuery(".hdr-search").removeClass("active");
            });
            window.jQuery(".select-picker").selectpicker();
            jQuery(".label-enclose .label").click(function () {
                jQuery(this).toggleClass("active");
            });
            jQuery(".nav-brand-res").click(function () {
                jQuery(".left-navbar").addClass("active");
            });
            jQuery(".menu-close").click(function () {
                jQuery(".left-navbar").removeClass("active");
            });
        });
    }

    logoutLink() {
        localStorage.clear();

        this.props.history.push("/");
    }

    pageLink(page_slug) {
        this.props.history.push("/" + page_slug);
    }

    render() {
        return (
            <div>
                {/* Main Wrapper Starts here */}
                <div className="container-fluid">
                    <div className="row">
                        {/* left-navbar Starts here */}
                        <LeftSidebar history={this.props.history} pageSubmit={(e) => this.pageLink(e)} />

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
                                <a href="javascript:;" className="back hidden-xs">
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                {/* <span class="page-title hidden-xs">Preference</span> */}
                                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                                    <li><a href="javascript:;">Report</a></li>
                                    <li>Accountant</li>
                                    <li>Trial Balance</li>
                                </ul>
                                <div className="pull-right">
                                    <div className="search-wrap">
                                        <a className="search-btn" href="javascript:;">
                                            <img className="search" src="images/search-icon.svg" alt="Search" />
                                        </a>
                                    </div>
                                    <div className="notify-wrap">
                                        <a href="javascript:;"><img src="images/notification-icon.svg" alt="Notification" /></a>
                                    </div>
                                    <div className="profile-wrap dropdown">
                                        <a href="javascript:;" className="avatar dropdown-toggle" data-toggle="dropdown">
                                            <span className="avatar-img"><img className="img-responsive" src="images/user-img-1.png" alt="Harvey Dean" /></span>
                                            <span className="hidden-xs">Harvey Dean</span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="javascript:;"><img src="images/edit-icon.svg" alt="icon" />Edit Profile</a>
                                            </li>
                                            <li><a href="javascript:;"><img src="images/settings-icon.svg" alt="icon" />Settings</a></li>
                                            <li><a href="javascript:;"><img src="images/turn-off-icon.svg" alt="icon" />Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Top bar Ends here */}
                            <div className="col-md-12 col-xs-12 mar-top visible-xs">
                                <a href="javascript:;" className="back">
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                <span className="page-title">Trial Balance</span>
                            </div>
                            {/* content-top Starts here */}
                            <div className="content-top col-md-12 col-xs-12">
                                <h4 className="fw-sbold mar-t-no">Trial Balance</h4>
                                <h5 className="fw-sbold">Nov 2020</h5>
                                <div className="row">
                                    <div className="report-setting col-md-12 col-xs-12">
                                        <form className="custom-form form-inline col-md-12 col-xs-12 pad-no">
                                            <div className="row">
                                                <div className="form-group col-md-3 col-sm-6 col-xs-12">
                                                    <label>Date Range</label>
                                                    <select
                                                        id="custom"
                                                        className="form-control"
                                                        onChange={(e) =>
                                                            this.changedatevalue(e.target.value)
                                                        }
                                                    >
                                                        <option selected={true}>ALL</option>
                                                        <option>Custom</option>

                                                        <option>This Month-to-date</option>
                                                        <option>This Week</option>
                                                        <option>This Month</option>
                                                        <option>This Week-to-date</option>
                                                        <option>This Year</option>
                                                        <option>This Year-to-date</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-6 col-xs-12">
                                                    <label>From</label>
                                                    <div
                                                        className="input-group date mar-t-no"
                                                        data-date-format="dd/mm/yyyy"
                                                    >
                                                        <input
                                                            type="text"
                                                            id="fromdate"
                                                            onChange={(e) => {
                                                                alert(e.target.value);
                                                            }}
                                                            onBlur={(e) => {
                                                                jQuery("#custom").val("Custom");
                                                                this.changefromDate(e.target.value);
                                                            }}
                                                            className="form-control"
                                                            autoComplete="off"
                                                        />
                                                        <div className="input-group-addon">
                                                            <img
                                                                src="images/calendar-icon.svg"
                                                                alt="icon"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-6 col-xs-12">
                                                    <label>To</label>
                                                    <div
                                                        className="input-group date mar-t-no"
                                                        data-date-format="dd/mm/yyyy"
                                                    >
                                                        <input
                                                            type="text"
                                                            id="todate"
                                                            onBlur={(e) => {
                                                                jQuery("#custom").val("Custom");
                                                                this.changetoDate(e.target.value);
                                                            }}
                                                            className="form-control"
                                                            autoComplete="off"
                                                        />
                                                        <div className="input-group-addon">
                                                            <img
                                                                src="images/calendar-icon.svg"
                                                                alt="icon"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-6 col-xs-12">
                                                    <label>Report Basics</label>
                                                    <div className="col-md-12 col-xs-12 pad-no radio-mar-t">
                                                        <label className="custom-checkbox small radio mar-t-no mar-rgt">
                                                            <input type="radio" name="report-basic" defaultChecked="checked" /> Accural
                                  <span className="checkmark" />
                                                        </label>
                                                        <label className="custom-checkbox small radio mar-t-no mar-rgt">
                                                            <input type="radio" name="report-basic" /> Cash
                                  <span className="checkmark" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="pull-right xs-pull-left">
                                            <div className="dropdown menu-item">
                                                <button className="btn btn-green dropdown-toggle btn-arrow" data-toggle="dropdown" aria-expanded="false">Export<span className="caret" /></button>
                                                <ul className="dropdown-menu align-right">
                                                    <li><a href="javascript:;">Export as PDF</a></li>
                                                    <li><a href="javascript:;">Export as Excel</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* content-top Starts here */}
                            {/* Main Content Starts here */}
                            <div className="main-content col-md-12 col-xs-12">
                                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                                    <div className="report-table trail-bal col-md-12 col-xs-12 pad-no mar-t-no">
                                        <div className="table-responsive" id="sticky-tb-hdr">
                                            <table className="table">
                                                <thead>
                                                    <tr className="bdr-btm-lc">
                                                        <th />
                                                        <th colSpan={2} className="text-center">{moment(this.state.end_date).format('ll')}</th>
                                                    </tr>
                                                    <tr>
                                                        <th>&nbsp;</th>
                                                        <th className="text-right">Debit</th>
                                                        <th className="text-right pad-rgt">Credit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.tableData &&
                                                        this.state.tableData.map((primary) => {
                                                            if (primary.total_debit != 0 || primary.total_credit != 0) {
                                                                return (
                                                                    <>
                                                                        <tr className="item-step1">
                                                                            <td><span>{primary.category_name}</span></td>
                                                                            <td><span className="text-right">{primary.total_debit}</span></td>
                                                                            <td><span className="text-right">{primary.total_credit}</span></td>
                                                                        </tr>


                                                                        {primary.is_child_data_available === 1 && this.repeat(primary.sub_categories, 45)}

                                                                        {primary.is_child_data_available === 1 &&
                                                                            (primary.total_others_debit != 0 || primary.total_others_credit != 0)
                                                                            &&
                                                                            <tr className="item-step1">
                                                                                <td><span>Others - {primary.category_name}</span></td>
                                                                                <td><span className="text-right">{primary.total_others_debit}</span></td>
                                                                                <td><span className="text-right">{primary.total_others_credit}</span></td>
                                                                            </tr>
                                                                        }

                                                                    </>

                                                                )
                                                            }
                                                        })}



                                                    <tr className="item-step1 title1 bdr-no">
                                                        <td><span>Total</span></td>
                                                        <td><span className="text-right">{this.state.resData.overall_total_home_debit}</span></td>
                                                        <td><span className="text-right">{this.state.resData.overall_total_home_credit}  </span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
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
export default TrialBalanceReport;
