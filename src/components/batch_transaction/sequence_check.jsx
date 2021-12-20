import React from "react";
import LeftSidebar from "./../left_sidebar";
import Footer from "./../footer";
import Topbar from "./../topbar";
import FetchAllApi from "../../api_links/fetch_all_api";
import jQuery from "jquery";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import moment from "moment";

class SequenceCheck extends React.Component {
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


            role_permissions: JSON.parse(localStorage.getItem("role_permissions")) || [],

            missing_list: [],
            missed_item: '',
            acc_list: [],
            acc: '',
            table_data: [],

            start_date: " 2010-01-01",
            end_date: moment().format("YYYY-MM-DD"),

            assetList: [],
            assetTypeData: [{ asset_account: '' }],
            asset_account_list: [],

        };
    }

    changefromDate(fromdate) {
        let date = jQuery("#fromdate").val();
        if (date != undefined && date!='') {
            var array = date.split("/");
            var date_formated = array[2] + "-" + array[1] + "-" + array[0];
            this.setState({ start_date: date_formated }, () => {
                this.table_data(this.state.missed_item);
            });
        }
    }
    changetoDate(todate) {
       
        let date = jQuery("#todate").val();
    if (date != undefined && date!='') {
        var array = date.split("/");
        var date_formated = array[2] + "-" + array[1] + "-" + array[0];
        console.log("ewewew", array);
        this.setState({ end_date: date_formated }, () => {
            this.table_data(this.state.missed_item);
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
            this.table_data(this.state.missed_item);
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
            this.table_data(this.state.missed_item);
        } else if (seleteddateformat === "This Month") {
            from_date = dateresult.startOf("month");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            to_date = dateresult.endOf("month");
            document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
            this.state.end_date = to_date.format("YYYY-MM-DD");
            this.table_data(this.state.missed_item);
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
            this.table_data(this.state.missed_item);
        } else if (seleteddateformat === "This Year") {
            from_date = dateresult.startOf("year");
            document.getElementById("fromdate").value = from_date.format(
                "DD-MM-YYYY"
            );
            this.state.start_date = from_date.format("YYYY-MM-DD");
            to_date = dateresult.endOf("year");
            document.getElementById("todate").value = to_date.format("DD-MM-YYYY");
            this.state.end_date = to_date.format("YYYY-MM-DD");
            this.table_data(this.state.missed_item);
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
            this.table_data(this.state.missed_item);
        }
        let startDate = jQuery('#fromdate').val()
        let end_date = jQuery('#todate').val()
        this.setState({ start_date: startDate, end_date: end_date }, () => {
            this.table_data(this.state.missed_item);

        })
        if (seleteddateformat == "ALL") {
            this.setState(
                {
                    start_date: " 2010-01-01",
                    end_date: moment().format("YYYY-MM-DD"),
                },
                () => {
                    this.table_data(this.state.missed_item);
                }
            );
            document.getElementById("fromdate").value = "";
            document.getElementById("todate").value = "";
        }
    }


    missing_list = () => {
        FetchAllApi.sequence_check_option_list((err, response) => {
            if (response.status === 1) {
                this.setState({ missing_list: response.list });
            } else {
                this.setState({ missing_list: [] });
            }
        });
    };

    table_data = (missed_item) => {
        if (missed_item !== '') {
            let input = {
                // client_id: this.state.logged_client_id,
                client_id: 226,
                key_name: missed_item, start_date: this.state.start_date,
                end_date: this.state.end_date
            }

            FetchAllApi.sequence_check_by_type(input, (err, response) => {
                if (response.status === 1) {
                    this.setState({ table_data: response.list });
                } else {
                    this.setState({ table_data: [] });
                }
            });
        }
    };

    getAsset = () => {
        let client_id = 226;
        FetchAllApi.settings_asset_list(client_id, (err, response) => {
            if (response.status === 1) {
                this.setState({ assetList: response.details });
            }
        });
    };


    getAssetType = () => {
        let client_id = 226
        FetchAllApi.settings_asset_type_list(client_id, (err, response) => {
            if (response.status === 1) {
                // var response=response.list;
                //  response.map((type,idx)=>{

                //       })

                this.setState({ testarr: response.list, assetTypeData: response.list })

            }
        });
    };

    getAssetAccount = () => {
        let client_id = this.state.logged_client_id;
        FetchAllApi.settings_account_list(client_id, (err, response) => {
            if (response.status === 1) {
                this.setState({ asset_account_list: response.list })
            }
            console.log("test", response)
        })
    };



    componentDidMount() {
        this.getAssetType();
        this.missing_list();
        this.getAsset()
        this.getAssetAccount()

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
            jQuery(".filter-btn").click(function () {
                jQuery(this).css("visibility", "hidden");
                jQuery(".report-filter").slideDown();
            });

            jQuery(".report-filter .close-btn").click(function () {
                jQuery(".filter-btn").css("visibility", "visible");
                jQuery(".report-filter").slideUp();
            });
        });
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
                                <a href="javascript:;" className="back hidden-xs" onClick={() => this.props.history.goBack()}>
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                {/* <span class="page-title hidden-xs">Preference</span> */}
                                <ul className="list-unstyled breadcrumb page-title hidden-xs">
                                    <li><a href="javascript:;">Accountant</a></li>
                                    <li>Sequence Check</li>
                                </ul>
                                <Topbar history={this.props.history} logoutSubmit={(e) => this.logoutLink()} />
                            </div>
                            {/* Top bar Ends here */}
                            <div className="col-md-12 col-xs-12 mar-top visible-xs">
                                <a href="javascript:;" className="back">
                                    <img src="images/back-arrow-blue.svg" />
                                </a>
                                <span className="page-title">Sequence Check</span>
                            </div>
                            {/* content-top Starts here */}
                            <div className="content-top col-md-12 col-xs-12 pad-b-no">
                                <div className="col-md-12 col-xs-12">
                                    <div className="row">
                                        <form className="custom-form row">
                                            <div className="form-group col-md-4 mar-b-no">
                                                <label>Choose Missing Items</label>
                                                {/* <div className="form-cont" > */}
                                                <select
                                                    className="selectpicker form-group  add-new"
                                                    data-live-search="true"
                                                    title="Choose..."
                                                    value={this.state.missed_item}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            missed_item: e.target.value
                                                        });
                                                        this.table_data(e.target.value)
                                                    }}
                                                >
                                                    <option value="">Choose...</option>
                                                    {this.state.missing_list && this.state.missing_list.map(
                                                        (item, index) => {
                                                            return (
                                                                <option value={item.key_name} >{item.item}</option>
                                                            )
                                                        })}
                                                </select>
                                            </div>
                                            {/* </div> */}
                                            <div className="form-group col-md-4 col-sm-6 col-xs-12">
                                                <label>Choose Account</label>
                                                <div className="form-cont">
                                                    <select
                                                        className="selectpicker form-group  add-new"
                                                        data-live-search="true"
                                                        title="Choose..."
                                                        value={this.state.acc}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                acc: e.target.value
                                                            });
                                                        }}
                                                    >
                                                        <option value="">Choose...</option>
                                                        {this.state.acc_list && this.state.acc_list.map(
                                                            (item, index) => {
                                                                return (
                                                                    <option value={item.key_name} >{item.item}</option>
                                                                )
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="from-group col-md-4 col-sm-6 col-xs-12 lbl-btn">
                                                <button className="btn btn-blue">Submit</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* content-top Starts here */}
                            {/* Main Content Starts here */}

                            <div className="main-content col-md-12 col-xs-12">
                                <div className="content-sec col-md-12 col-xs-12 pad-no mar-t-no">
                                    <div className="report-setting mar-t-no mar-btm">
                                        <form className="custom-form form-inline">
                                            <div className="form-group mar-rgt">
                                                <label>Date Range</label>
                                                <div className="form-cont">
                                                    <select
                                                        id="custom"
                                                        className="selectpicker form-control hh "
                                                        data-live-search="true"
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
                                            <div className="form-group mar-rgt">
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
                                            <div className="form-group mar-rgt">
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
                                            <a href="javascript:;" className="text-link filter-btn">Advanced</a>
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
                                        <div className="col-md-12 col-xs-12 report-filter">
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
                                    {this.state.missed_item !== 'assets' ? (
                                        <div className="report-table reconcile-table col-md-12 col-xs-12 pad-no mar-top mar-btm">
                                            <div className="table-responsive" id='sticky-tb-hdr'>
                                                <table className="table detail-report">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-left-imp">
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
                                                                Open Balance
<i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                            </th>
                                                            <th className="text-right">
                                                                Debit
<i className="th-sort"><img src="images/sort-icon.svg" alt="SortIcon" /></i>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {this.state.table_data &&
                                                            this.state.table_data.map((item) => {
                                                                if (item.is_number_missed == 0) {

                                                                    return (

                                                                        <tr>
                                                                            <td className="text-left-imp">  {item.type} </td>
                                                                            <td> {item.transaction_date} </td>
                                                                            <td> {item.num} </td>
                                                                            <td> {item.name} </td>
                                                                            <td> {item.memo} </td>
                                                                            <td> {item.split} </td>
                                                                            <td className="text-right pad-r-25"> {item.open_balance_home_currency} </td>
                                                                            <td className="text-right pad-r-25"> {item.debit} </td>
                                                                        </tr>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            <tr className="missing-info">
                                                                                <td colSpan={8}>Missing Numbers are here</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="text-left-imp">  {item.type} </td>
                                                                                <td> {item.transaction_date} </td>
                                                                                <td> {item.num} </td>
                                                                                <td> {item.name} </td>
                                                                                <td> {item.memo} </td>
                                                                                <td> {item.split} </td>
                                                                                <td className="text-right pad-r-25"> {item.open_balance_home_currency} </td>
                                                                                <td className="text-right pad-r-25"> {item.debit} </td>
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                }


                                                            })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                        : (
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
                                                            {this.state.assetList && this.state.assetList.map((ass, idx) => {
                                                                return (
                                                                    <tr onClick={() => { this.nextDisplay(ass.id) }}>
                                                                        <td className="text-left-imp" >{ass.asset_name}</td>
                                                                        <td>FA-{ass.asset_number}</td>
                                                                        <td>{this.state.assetTypeData && this.state.assetTypeData.map(e => {
                                                                            if (e.id === ass.asset_type_id) {
                                                                                return (this.state.asset_account_list.map(data => {
                                                                                    if (data.id === e.asset_account) {
                                                                                        return data.name
                                                                                    }
                                                                                }))
                                                                            }
                                                                        })}
                                                                        </td>
                                                                        <td>{ass.purchase_date}</td>
                                                                        <td className="text-right">{ass.purchase_price}</td>
                                                                        <td> {this.state.asset_account_list && this.state.asset_account_list.map(e => {
                                                                            if (e.id === ass.accumulated_depreciation_account) {
                                                                                return e.name
                                                                            }
                                                                        })}</td>
                                                                        <td>{ass.depreciation_amount_as_of_last_depreciation}</td>
                                                                        <td> {this.state.asset_account_list && this.state.asset_account_list.map(e => {
                                                                            if (e.id === ass.depreciation_expense_account) {
                                                                                return e.name
                                                                            }
                                                                        })}</td>
                                                                        <td className="text-right">{ass.depreciation_amount_for_the_month}</td>
                                                                        <td className="text-right">{ass.book_value}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        )
                                    }

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
export default SequenceCheck;
