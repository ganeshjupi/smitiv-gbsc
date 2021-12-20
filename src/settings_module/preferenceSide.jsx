import React from 'react';
import "./preference.css"
import { Helmet } from 'react-helmet'


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLocation: "",
    }
  };


  componentWillMount() {
    var currentLocation = window.location.pathname;
    this.setState({
      currentLocation: currentLocation,
    });
  };

  routedChange(page_slug) {
    // this.props.pageSubmit(page_slug);
    localStorage.setItem("search",'');
    window.location.href = "/" + page_slug;
  }



  render() {
    return (
      <div className="user-cont-left">
        <Helmet>
          <title>GBSC | {this.state.currentLocation.replace('/', '')}</title>
        </Helmet>
        <div className="mscroll-y">
          <ul className="list-unstyled" >
            <li className="head">General</li>
            <li><a onClick={this.routedChange.bind(this, "preferences")} className={this.state.currentLocation == "/preferences" ? "active" : ""} >Organization Profile</a></li>
            <li ><a onClick={this.routedChange.bind(this, "preference_permission")} href="/preference_permission" className={this.state.currentLocation == "/preference_permission" ? "active" : ""}>Roles &amp; Permissions</a></li>
            <li><a onClick={this.routedChange.bind(this, "currency")} href="/currency" className={this.state.currentLocation == "/currency" ? "active" : ""}>Currencies</a></li>
            <li><a onClick={this.routedChange.bind(this, "preference_sales")} href="/preference_sales" className={this.state.currentLocation == "/preference_sales" ? "active" : ""}>Sales</a></li>
            <li><a onClick={this.routedChange.bind(this, "preference_sales")} href="/preference_purchase" className={this.state.currentLocation == "/preference_purchase" ? "active" : ""}>Purchase</a></li>
            <li><a onClick={this.routedChange.bind(this, "preference_tax")} href="/preference_tax" className={this.state.currentLocation == "/preference_tax" ? "active" : ""}>Taxes</a></li>
            <li><a onClick={this.routedChange.bind(this, "preference_Email")} href="/preference_Email" className={this.state.currentLocation == "/preference_Email" ? "active" : ""}>Email</a></li>
            {/* <li><a onClick={this.routedChange.bind(this, "preference_template")} href="/preference_template" className={this.state.currentLocation == "/preference_template" ? "active" : ""}>Templates</a></li> */}
            <li className="head mar-top" >Accounting</li>
            <li><a onClick={this.routedChange.bind(this, "find_recode")} href="/find_recode" className={this.state.currentLocation == "/find_recode" ? "active" : ""}>Find &amp; Recode</a></li>
            <li><a onClick={this.routedChange.bind(this, "home_currency_adjustment")} href="/home_currency_adjustment" className={this.state.currentLocation == "/home_currency_adjustment" ? "active" : ""}>Home Currency Adjustment</a></li>
            <li><a onClick={this.routedChange.bind(this, "to_do")} href="/to_do" className={this.state.currentLocation == "/to_do" ? "active" : ""}>Todo</a></li>
            <li><a onClick={this.routedChange.bind(this, "manual_journal")} href="/manual_journal" className={this.state.currentLocation == "/manual_journal" ? "active" : ""}>Manual Journal</a></li>
            <li><a onClick={this.routedChange.bind(this, "fixed_assests")} href="/fixed_assests" className={this.state.currentLocation == "/fixed_assests" ? "active" : ""}>Fixed Assets &amp; Settings</a></li>
            <li><a onClick={this.routedChange.bind(this, "chart")} href="/chart" className={this.state.currentLocation == "/chart" ? "active" : ""}>Chart of Accounts</a></li>
            <li><a onClick={this.routedChange.bind(this, "summary_added_type_items")} href="/summary_added_type_items" className={this.state.currentLocation == "/summary_added_type_items" ? "active" : ""}>Summary of Added Items</a></li>
            <li><a onClick={this.routedChange.bind(this, "history")} href="/history" className={this.state.currentLocation == "/history" ? "active" : ""}>History &amp; Notes</a></li>
          </ul>
        </div>
      </div>
    )
  }
}