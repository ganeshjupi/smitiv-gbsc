import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import jQuery from "jquery";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import moment from "moment";

class JournalReport extends React.Component {
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

            loading: false,
            start_date: " 1970-01-01",
            end_date: "3000-01-01",
            reportData: [],

            role_permissions:
                JSON.parse(localStorage.getItem("role_permissions")) || [],


        };
    }

    componentDidUpdate() {
        window.jQuery(".selectpicker").selectpicker("refresh");
        window.jQuery(".input-group.date").datepicker({ format: "dd/mm/yyyy", autoclose: true });
    }

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

    routedChange(parameter) {
        this.props.history.push("/" + parameter);
        window.scrollTo(0, 0);
    }

    componentDidMount() {

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

        this.getReportData();
    }

    logoutLink() {
        localStorage.clear();

        this.props.history.push("/");
    }

    pageLink(page_slug) {
        this.props.history.push("/" + page_slug);
    }

    getReportData = () => {

        this.setState({ loading: true });
        let { start_date, end_date, show_columns, sub_columns } = this.state;

        console.log("start date", start_date.toString());
        console.log("End date", end_date.toString());

        let startDate = moment(start_date).format("YYYY-MM-DD");
        let endDate = moment(end_date).format("YYYY-MM-DD");

        FetchAllApi.journal_report(
            startDate,
            endDate,
            this.state.logged_client_id,
            (err, response) => {
                if (response.status === 1) {
                    // chars = _.orderBy(chars, ['name'],['asc']); // Use Lodash to sort array by 'name'
                    console.log(response);
                    this.setState({ reportData: response.details })
                } else {
                    this.setState({ response: [], loading: false });
                }
            }
        );
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
            this.getReportData();
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
            this.getReportData();
        } else if (seleteddateformat === "This Month") {
            from_date = dateresult.startOf("month");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            to_date = dateresult.endOf("month");
            document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
            this.state.end_date = to_date.format("YYYY-MM-DD");
            this.getReportData();
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
            this.getReportData();
        } else if (seleteddateformat === "This Year") {
            from_date = dateresult.startOf("year");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            to_date = dateresult.endOf("year");
            document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
            this.state.end_date = to_date.format("YYYY-MM-DD");
            this.getReportData();
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
            this.getReportData();
        }
        // let startDate = jQuery('#fromdate').val()
        // let end_date = jQuery('#todate').val()
        // this.setState({ start_date: startDate, end_date: end_date }, () => {
        //   this.callAPIDATA();

        // })
        if (seleteddateformat == "ALL") {
            this.setState(
                {
                    start_date: " 1970-01-01",
                    end_date: moment().format("YYYY-MM-DD"),
                },
                () => {
                    this.getReportData();
                }
            );
            document.getElementById("fromdate").value = "";
            document.getElementById("todate").value = "";
        }
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
                                <a href="javascript:;" className="back hidden-xs" onClick={() => this.props.history.goBack()}>
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                {/* <span class="page-title hidden-xs">Preference</span> */}
                                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                                    <li><a href="javascript:;">Report</a></li>
                                    <li>Accountant</li>
                                    <li>Journal</li>
                                </ul>
                                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
                            </div>
                            {/* Top bar Ends here */}
                            <div className="col-md-12 col-xs-12 mar-top visible-xs">
                                <a href="javascript:;" className="back">
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                <span className="page-title">Journal</span>
                            </div>
                            {/* content-top Starts here */}
                            <div className="content-top col-md-12 col-xs-12">
                                <h4 className="fw-sbold mar-t-no">Journal</h4>
                                <h5 className='fw-sbold'>{moment(new Date()).format("MMM YYYY")}</h5>
                                <div className="row">
                                    <div className="report-setting col-md-12 col-xs-12">
                                        <form className="custom-form form-inline col-md-12 col-xs-12 pad-no">
                                            <div className="row">
                                                <div className="form-group col-md-3 col-sm-6 col-xs-12">
                                                    <label>Date Range</label>
                                                    <div className="form-cont" >
                                                        <select
                                                            id="custom"
                                                            className="selectpicker form-control hh "
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
                                                </div>
                                                <div className="form-group col-md-3 col-sm-6 col-xs-12">
                                                    <label>From</label>
                                                    <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                                                        <input type="text" className="form-control" name="fromdate" id="fromdate" />
                                                        <div className="input-group-addon">
                                                            <img src="images/calendar-icon.svg" alt="icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-6 col-xs-12">
                                                    <label>To</label>
                                                    <div className="input-group date mar-t-no" data-date-format="dd/mm/yyyy">
                                                        <input type="text" className="form-control" name="todate" id="todate" />
                                                        <div className="input-group-addon">
                                                            <img src="images/calendar-icon.svg" alt="icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-6 col-xs-12">
                                                    <a href="javascript:;" className="text-link filter-btn">Advanced</a>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="pull-right">
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
                                    <div className="report-setting mar-t-no">
                                        <div className="col-md-12 col-xs-12 report-filter mar-t-no">
                                            <a href="javascript:;" className="close-btn"><img src="images/cross-red.svg" /></a>
                                            <form className="custom-form">
                                                <div className="col-md-12 col-xs-12 pad-l-no">
                                                    <div className="row">
                                                        <div className="form-group col-md-3 col-xs-12 mar-b-no">
                                                            <div className="row">
                                                                <div className="col-md-12 col-xs-12">
                                                                    <label className="fw-sbold">Report Basics</label>
                                                                </div>
                                                                <div className="col-md-12 col-xs-12">
                                                                    <label className="custom-checkbox radio mar-t-no mar-rgt">
                                                                        <input type="radio" name="tax-item" defaultChecked="checked" /> Accural
                                                                        <span className="checkmark" />
                                                                    </label>
                                                                    <label className="custom-checkbox radio">
                                                                        <input type="radio" name="tax-item" /> Cash
                                                                        <span className="checkmark" />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3 col-xs-12 mar-b-no">
                                                            <div className="row">
                                                                <div className="col-md-12 col-xs-12">
                                                                    <label className="fw-sbold">Show Columns</label>
                                                                </div>
                                                                <div className="col-md-12 col-xs-12">
                                                                    <div className="custom-select-drop dropdown">
                                                                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                                                                            <span id="selected">This will be multi select</span><span className="caret" />
                                                                        </a>
                                                                        <ul className="dropdown-menu">
                                                                            <li className="active"><a href="javascript:;">TThis will be multi select</a></li>
                                                                            <li><a href="javascript:;">Lorem ipsum</a></li>
                                                                            <li><a href="javascript:;">Lorem ipsum 2</a></li>
                                                                            <li><a href="javascript:;">Lorem ipsum 3</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3 col-xs-12 mar-b-no">
                                                            <div className="row">
                                                                <div className="col-md-12 col-xs-12">
                                                                    <label className="fw-sbold">Sort By</label>
                                                                </div>
                                                                <div className="col-md-12 col-xs-12">
                                                                    <div className="custom-select-drop dropdown">
                                                                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                                                                            <span id="selected">Default</span><span className="caret" />
                                                                        </a>
                                                                        <ul className="dropdown-menu">
                                                                            <li className="active"><a href="javascript:;">Default</a></li>
                                                                            <li><a href="javascript:;">Total</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3 col-xs-12 mar-b-no">
                                                            <div className="row">
                                                                <div className="col-md-12 col-xs-12">
                                                                    <label className="fw-sbold">Filter By</label>
                                                                </div>
                                                                <div className="col-md-12 col-xs-12">
                                                                    <div className="custom-select-drop dropdown">
                                                                        <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" className="dropdown-toggle btn form-control" href="javascript:;">
                                                                            <span id="selected">Account</span><span className="caret" />
                                                                        </a>
                                                                        <ul className="dropdown-menu">
                                                                            <li className="active"><a href="javascript:;">Account</a></li>
                                                                            <li><a href="javascript:;">Account 2</a></li>
                                                                            <li><a href="javascript:;">Account 3</a></li>
                                                                            <li><a href="javascript:;">Account 4</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {this.state.reportData.length == 0 ? (
                                        <div id="posted" className="col-md-12 tab-pane fade in pad-no">
                                            <div className="landing-wrap">
                                                <div className="img-concept text-center">
                                                    <img className="img-responsive mar-auto" src="images/no-data.svg" alt="img" />
                                                    <p>Looks like there's no data</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                            <div className="report-table reconcile-table col-md-12 col-xs-12 pad-no mar-no">
                                                <div className="table-responsive">
                                                    <table className="table detail-report">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    Type
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th>
                                                                    Date
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th>
                                                                    No#
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th>
                                                                    Name
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th className="memo">
                                                                    Memo
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th>
                                                                    Split
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th className="text-right">
                                                                    Debit
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th className="text-right">
                                                                    Credit
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th className="text-right">
                                                                    Foreign Debit
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                                <th className="text-right">
                                                                    Foreign Credit
                                                            <i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(this.state.reportData.length >= 0) ?
                                                                this.state.reportData.map(e => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{e.type}</td>
                                                                            <td>{e.transaction_date}</td>
                                                                            <td>{e.num}</td>
                                                                            <td>{e.name}</td>
                                                                            <td>{e.memo}</td>
                                                                            <td>{e.split}</td>
                                                                            <td className="text-right pad-r-25">{Number(e.debit).toFixed(2)}</td>
                                                                            <td className="text-right pad-r-25">{Number(e.credit).toFixed(2)}</td>
                                                                            <td className="text-right pad-r-25">{Number(e.foreign_debit).toFixed(2)}</td>
                                                                            <td className="text-right pad-r-25">{Number(e.foreign_credit).toFixed(2)}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                :
                                                                null
                                                            }


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
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
export default JournalReport;
