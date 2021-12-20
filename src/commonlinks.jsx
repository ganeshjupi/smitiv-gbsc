import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import config from './api_links/api_links';

import login from "./components/auth/login";
import user_inbox from "./components/user_inbox";
import profit_loss_report from "./components/reports/profit_loss_report";
import forgot_password from "./components/auth/forgot_password";
import data_tagging from "./components/data_tagging";
import inbox from "./components/inbox";
import compose from "./components/compose";
import sent_items from "./components/sentItems";
import reviewedItems from "./components/reviewedItems";
import register from "./components/auth/register";
import registerPayment from "./components/registerPayment";
import rolesAndPermissions from "./components/rolesAndPermissions";
import registerFinished from "./components/registerFinished";
import custom_editable_template from "./components/custom_editable_template";
import Template_edit_page from "./components/template_edit_page";

// import estimate from "./components/create_estimate";
// import salesorder from "./components/create_salesorder";
import creditmemo from "./components/create_creditmemo";
// import purchaseorder from "./components/create_purchaseorder";
import invoice_template_listing from "./components/invoice_template_listing";
import List_bill from "./components/listOfBills";
import balance_sheet_report from "./components/reports/balance_sheet";
import create_invoice from "./components/create_invoice";
import customer_module from "./components/reports/customer_module";
import customer_balance_summary from "./components/reports/customer_balance_summary";
// import customer_balance_detail from "./components/reports/customer_balance _detail";
import vendor_balance_detail from "./components/reports/vendor_balance_detail";
import open_invoice from "./components/reports/open_invoice";
import vendor_balance_summary from "./components/reports/vendor_balance_summary";
import ap_aging_summary from "./components/reports/ap_aging_summary";
import ar_aging_summary from "./components/reports/ar_aging_summary";
import unpaid_bills from "./components/reports/unpaid_bills";
import loading from "./components/reports/loading";

import Vendors_list from "./components/vendors_list";
import AddNewVendor from "./components/add_new_vendor";
import VendorDetails from "./components/vendor_details";

import addJob from "./components/add-job";
import editJob from "./components/edit-job";

import AddNewCustomer from "./components/add-new-customer";
import Customer from "./components/customers-list";
import CustomerDetails from "./components/customer_details";
import CustomerJobDetails from "./components/customer_job_details";
import employeeList from "./components/employee-list";
import EmployeeDetails from "./components/employee-details";
import EditEmployee from "./components/edit-employee";
import AddNewEmployee from "./components/add-new-employee";
import Customer_receive_payment from "./components/customer_receive_payment";
import Customer_multi_noti from "./components/customer_multi_noti";
import Vendor_bill_payment from "./components/vendor_bill_payment";
import Testing_Vendor_bill_payment from "./components/testing_vendor_bill_payment";

import AllReport from "./components/reports/all_report";
import SpecifiedReports from "./components/reports/compIndex";
import GST_Details from "./components/reports/gst_details";
import Gst_report_summary from "./components/reports/gst_report_summary";
import GeneralLedger from "./components/reports/general_ledger";
import save_draft from "./components/save_draft";
import rolesPermissions from "./components/roles-and-permissions";
// Bank section
import CreateBankRule from "./components/bank/create_bank_rule";
import CreditRule from "./components/bank/create-credit-rule";
import BankReconcileMatch from "./components/bank/bank_reconcile_match";
import BankReconcileCreate from "./components/bank/bank_reconcile";
import BankImportStatements from "./components/bank/ban_import";
import FindMatchTrans from "./components/bank/find_match";
import CoulmnRearrage from "./components/coulmn_rearrange";


import ReceivedBill from "./components/bank/receivedBill";
import GroupAccount from "./components/bank/groupAccounting";
import Request from "./components/bank/request";
import SendRequest from "./components/bank/sendRequest";


import UserTopbar from "./components/user_module/userTopbar";
import UserProfile from "./components/user_module/profile";
import InviteMember from "./components/user_module/inviteMember";
import SubscriptionDetails from "./components/user_module/subscriptionDetails";
import UserSetPassword from "./components/user_module/UserSetPassword";

/* {first_user_module - jairam} */

import Member from "./components/first_user_module/members";
import Profile from "./components/first_user_module/profile_page";
import Suscriber from "./components/first_user_module/suscriber";
import Invite from "./components/first_user_module/member_invite";
import Billhistory from "./components/first_user_module/billing_history";
import Roles from "./components/first_user_module/roles";
import Information from "./components/first_user_module/information";
import Memdet from "./components/first_user_module/members_details";
import FirstEdit from "./components/first_user_module/edit_member";

import Preference from "./settings_module/preferences";
import Preference_role from "./settings_module/preferencerole";
import currency from "./settings_module/currency";
import Add_currency from "./settings_module/add_currency";
import PreferenceEmail from "./settings_module/preferenceEmail";
import PreferenceTemplate from "./settings_module/preferenceTemplate";
import PreferenceSales from "./settings_module/preferenceSales";
import PreferenceTax from "./settings_module/preferenceTax";
import NewEmailTemplate from "./settings_module/newEmailTemplate";
import Findrecode from "./settings_module/findRecode";
import Findrecodehistory from "./settings_module/findRecodeHistory";
import Findrecodesummary from "./settings_module/findRecodeSummary";
import Findrecodesearch from "./settings_module/findRecodeSearch";
import Findrecodesearchdata from "./settings_module/findRecodeSearchData";
import Manualjournal from "./settings_module/manual_Journal";
import Newjournal from "./settings_module/newJournal";
import Newrepetingjournal from "./settings_module/newRepetingJournal";
import Importjournal from "./settings_module/import_Journal";
import Fixedasset from "./settings_module/fixedAssets";
import AssetsImport from "./settings_module/fixedAssetsImport";
import NewAsset from "./settings_module/newAssetType";
import ChartAccount from "./settings_module/chartsOfAccount";
import Historynote from "./settings_module/historyNotes";
import Assetview from "./settings_module/assetView";
import CurrencyDate from "./settings_module/currencyDate";
import FixedAssetsImport from "./settings_module/fixedAssetsImport";
import Edit from "./components/first_user_module/edit_member";
import MembersLayer2 from "./components/user_module/members_layer_2";
import EditMemberLayer2 from "./components/user_module/edit_member_layer_2";
import EditrolesAndPermissions from "./components/edit_roles_permissions";
import ClientSelection from "./components/client_selection";
import ProfitLossBreakdown from "./components/reports/profit&loss_break";
import vendor_balance_break from "./components/reports/vendor_balance_break";
import customer_balance_break from "./components/reports/customer_balance_break";
import ViewEmailTemplate from "./settings_module/viewEmailTemplate";
import EditEmailTemplate from "./settings_module/editEmailTemplate";
import Approve from "./settings_module/approvalPage";
import ApBreakDown from "./components/reports/ap_aging_summary_break";
import ArBreakDown from "./components/reports/ar_aging_summary_break";
import FixedAssetView from "./settings_module/assetTypeView";
import AddNewAsset from "./settings_module/addNewAsset";
// import AddBankAccount from "./components/bank/addBankAccount";
// import BankAccountDetails from "./components/bank/bankAccountDetails";
// import BankLoginConnect from "./components/bank/bankLoginConnect";
// import InternetBanking from "./components/bank/internetBanking";
import BankReconcileSummary from "./components/bank/bank_reconcile_summary";

/* {first_user_module - jairam} */

import AddBankAccount from "./components/bank/add_bank_account";
import AddBankDetail from "./components/bank/add_bank_detail";
import AddBankInternet from "./components/bank/add_bank_internet";
import AddBankLogin from "./components/bank/add_bank_login";

import MakeDeposit from "./components/bank/make_deposit";
import TransferFund from "./components/bank/transfer_funds";
import WriteCheque from "./components/bank/write_cheque";
import Make_depo_test from "./components/bank/make_depo_test";
import SummaryOfAddedItems from "./settings_module/summary_of_added_items";
import Todo from "./settings_module/todo_settings";

import enteBatchTrans from "./components/batch_transaction/enter_batch_trans";
import ClientDataReview from "./components/batch_transaction/client_data_review";

import TrialBalanceReport from "./components/batch_transaction/trial_balance_report";
import JournalReport from "./components/batch_transaction/journal";
import ViewPriorSalesTaxReturns from "./components/batch_transaction/prior_sales_tax_returns";
import SequenceCheck from "./components/batch_transaction/sequence_check";
import BatchColumnRearrange from "./components/batch_transaction/column_rearrange_batch";
import LandingPage from "./components/landingPage";
import RolesAssign from "./components/first_user_module/assign_roles"

import HomeCurrencyAdjustment from "./settings_module/home_currency_adjustment";
import Testing_notification from "./components/testing_notification";
import Testing_customer_credit_memo from "./components/testing_customer_credit_memo";

import Testing_create_estimate from "./components/testing_create_estimate";
import Testing_create_salesorder from "./components/testing_create_salesorder";
import Testing_create_purchaseorder from "./components/testing_create_purchaseorder";
import Preference_purchase_order from './settings_module/preferencePurchase';

import TemplatePrint from "./components/template_print";

import SecondTemplateEditPage from "./components/second_template_edit_page";
import ThirdTemplateEditPage from "./components/third_template_edit_page";

import Autoinvoicemail from "./components/auto_invoice_mail";
// // for test
// import Left_sidebar from "./components/left_sidebar";
// // for test

class commonlinks extends React.Component {
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
      dropdown: "",
      inbox_list: [],
      response_stus: 0,
      response_msg: "No data found",
      item_details: "",
      item_file_path: "",
    };
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={login} />
            {/* <Route exact path="/create_estimate" component={estimate} /> */}
            {/* <Route exact path="/create_salesorder" component={salesorder} /> */}
            {/* <Route
              exact
              path="/create_purchaseorder"
              component={purchaseorder}
            /> */}
            <Route exact path="/create_creditmemo" component={creditmemo} />
            <Route exact path="/login" component={login} />
            <Route exact path="/user_inbox" component={user_inbox} />
            <Route exact path="/forgot_password" component={forgot_password} />
            <Route exact path="/approval_permission" component={Approve} />
            <Route
              exact
              path="/data_tagging/:list_id/:file_id"
              component={data_tagging}
            />
            <Route exact path="/inbox" component={inbox} />
            <Route exact path="/compose" component={compose} />
            <Route exact path="/sent_items" component={sent_items} />
            <Route exact path="/reviewed_items" component={reviewedItems} />
            <Route exact path="/register" component={register} />
            <Route exact path="/register_Payment" component={registerPayment} />
            <Route
              exact
              path="/roles_permissions"
              component={rolesAndPermissions}
            />
            <Route
              exact
              path="/register_finished"
              component={registerFinished}
            />
            
            <Route
              exact
              path="/editable/:template_id"
              component={custom_editable_template}
            />
            <Route
              exact
              path="/template_edit_page"
              component={Template_edit_page}
            />
            <Route
              exact
              path="/invoice_templates"
              component={invoice_template_listing}
            />
            <Route
              exact
              path="/all_lists"
              component={List_bill}
            />
            <Route exact path="/create_invoice" component={create_invoice} />
            <Route
              exact
              path="/profit_loss_report"
              component={profit_loss_report}
            />
            <Route
              exact
              path="/balance_sheet"
              component={balance_sheet_report}
            />
            <Route exact path="/customer_module" component={customer_module} />
            <Route
              exact
              path="/customer_balance_summary"
              component={customer_balance_summary}
            />
            <Route
              exact
              path="/customer_balance_transaction_history"
              component={customer_balance_break}
            />
            {/* <Route exact path="/customer_balance_detail" component={customer_balance_detail} /> */}
            <Route
              exact
              path="/vendor_balance_detail"
              component={vendor_balance_detail}
            />

            <Route
              exact
              path="/assign"
              component={RolesAssign}
            />

            <Route
              exact
              path="/transaction_history"
              component={ProfitLossBreakdown}
            />

            <Route exact path="/open_invoice" component={open_invoice} />
            <Route
              exact
              path="/vendor_balance_summary"
              component={vendor_balance_summary}
            />
            <Route
              exact
              path="/vendor_balance_transaction_history"
              component={vendor_balance_break}
            />
            <Route
              exact
              path="/ap_aging_summary"
              component={ap_aging_summary}
            />
            <Route
              exact
              path="/ar_aging_summary"
              component={ar_aging_summary}
            />
            <Route exact path="/unpaid_bills" component={unpaid_bills} />
            {/* <Route exact path="/customers-list" component={Customer} />
                    <Route exact path="/add-new-customer" component={AddNewCustomer} /> */}

            <Route exact path="/add_new_vendor" component={AddNewVendor} />
            <Route exact path="/vendor_details" component={VendorDetails} />
            <Route exact path="/Vendors_list" component={Vendors_list} />

            <Route exact path="/add-job" component={addJob} />


            <Route exact path="/received_bill" component={ReceivedBill} />
            <Route exact path="/add_business_contact" component={GroupAccount} />
            <Route exact path="/accounting_request" component={Request} />
            <Route exact path="/requests" component={SendRequest} />

            <Route exact path="/edit-job" component={editJob} />
            <Route exact path="/customers-list" component={Customer} />
            <Route exact path="/add-new-customer" component={AddNewCustomer} />
            <Route exact path="/customer_details" component={CustomerDetails} />
            <Route
              exact
              path="/Customer-Job-Details"
              component={CustomerJobDetails}
            />
            <Route exact path="/employee-list" component={employeeList} />
            <Route exact path="/employee-details" component={EmployeeDetails} />

            <Route exact path="/edit-employee" component={EditEmployee} />
            <Route exact path="/add-new-employee" component={AddNewEmployee} />
            <Route
              exact
              path="/Customer_receive_payment"
              component={Customer_receive_payment}
            />
            <Route
              exact
              path="/ap_aging_transactions"
              component={ApBreakDown}
            />

            <Route
              exact
              path="/ar_aging_transactions"
              component={ArBreakDown}
            />


            <Route
              exact
              path="/testing_vendor_bill_payment"
              component={Testing_Vendor_bill_payment}
            />

            <Route
              exact
              path="/vendor_bill_payment"
              component={Vendor_bill_payment}
            />

            <Route exact path="/all-report" component={AllReport} />
            <Route
              exact
              path="/filtered-reports"
              component={SpecifiedReports}
            />
            <Route exact path="/loading" component={loading} />

            <Route exact path="/GST_detail_report" component={GST_Details} />
            <Route
              exact
              path="/Gst_report_summary"
              component={Gst_report_summary}
            />
            <Route exact path="/general_ledger" component={GeneralLedger} />
            <Route exact path="/save_draft" component={save_draft} />
            <Route exact path="/kk" component={rolesPermissions} />

            <Route exact path="/create-bank-rule" component={CreateBankRule} />
            <Route exact path="/create-credit-rule" component={CreditRule} />

            <Route
              exact
              path="/bank_reconcile_match"
              component={BankReconcileMatch}
            />

            {/* <Route exact path="/add_bank_account" component={AddBankAccount} />
            <Route
              exact
              path="/bank_account_details"
              component={BankAccountDetails}
            />
            <Route
              exact
              path="/bank_login_connect"
              component={BankLoginConnect}
            />
            <Route exact path="/internet_banking" component={InternetBanking} /> */}

            <Route
              exact
              path="/bank_reconcile_create"
              component={BankReconcileCreate}
            />
            <Route
              exact
              path="/bank_import_statements"
              component={BankImportStatements}
            />

            <Route exact path="/find-match" component={FindMatchTrans} />

            <Route exact path="/coulmn-rearrange" component={CoulmnRearrage} />

            {/* user module starts */}

            <Route exact path="/user_profile" component={UserProfile} />
            <Route exact path="/invite_member" component={InviteMember} />
            <Route
              exact
              path="/Subscription_details"
              component={SubscriptionDetails}
            />
            <Route exact path="/UserTopbar" component={UserTopbar} />
            <Route
              exact
              path="/user_set_password"
              component={UserSetPassword}
            />

            {/* first_user_module - jairam*/}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/member" component={Member} />
            <Route exact path="/subscriber" component={Suscriber} />
            <Route exact path="/member_lists" component={MembersLayer2} />
            <Route
              // exact
              path="/member_invite"
              component={Invite}
            />
            <Route exact path="/billhistory" component={Billhistory} />
            <Route exact path="/add_roles" component={Roles} />
            <Route exact path="/information" component={Information} />
            {/* <Route exact path="/billhistory" component={Billhistory} /> */}
            <Route exact path="/details" component={Memdet} />
            <Route exact path="/preferences" component={Preference} />
            <Route
              exact
              path="/preference_permission"
              component={Preference_role}
            />
            <Route exact path="/currency" component={currency} />
            <Route exact path="/add_currency" component={Add_currency} />
            <Route exact path="/preference_Email" component={PreferenceEmail} />
            <Route exact path="/currency_date" component={CurrencyDate} />
            <Route
              exact
              path="/preference_template"
              component={PreferenceTemplate}
            />
            <Route exact path="/preference_sales" component={PreferenceSales} />
            <Route exact path="/preference_tax" component={PreferenceTax} />
            <Route
              exact
              path="/preference_create_emailtemplate"
              component={NewEmailTemplate}
            />
            <Route exact path="/find_recode" component={Findrecode} />
            <Route
              exact
              path="/find_recode_history"
              component={Findrecodehistory}
            />
            <Route
              exact
              path="/find_recode_summary"
              component={Findrecodesummary}
            />
            <Route
              exact
              path="/find_recode_search"
              component={Findrecodesearch}
            />
            <Route
              exact
              path="/find_recode_searchdata"
              component={Findrecodesearchdata}
            />
            <Route exact path="/manual_journal" component={Manualjournal} />
            <Route exact path="/new_journal" component={Newjournal} />
            <Route
              exact
              path="/fixed_assets_type_view"
              component={FixedAssetView}
            />
            <Route
              exact
              path="/new_repeting_journal"
              component={Newrepetingjournal}
            />
            <Route exact path="/import_journal" component={Importjournal} />
            <Route exact path="/fixed_assests" component={Fixedasset} />
            <Route exact path="/import_asset" component={AssetsImport} />
            <Route exact path="/new_asset" component={NewAsset} />
            <Route exact path="/chart" component={ChartAccount} />
            <Route exact path="/history" component={Historynote} />
            <Route exact path="/edit" component={FirstEdit} />
            <Route exact path="/edit_member" component={EditMemberLayer2} />

            <Route
              exact
              path="/edit_roles_permissions"
              component={EditrolesAndPermissions}
            />
            <Route
              exact
              path="/profit&loss_breakdown"
              component={ProfitLossBreakdown}
            />
            <Route
              exact
              path="/view_email_template"
              component={ViewEmailTemplate}
            />
            <Route
              exact
              path="/edit_email_template"
              component={EditEmailTemplate}
            />
            <Route exact path="/asset_view" component={Assetview} />

            <Route
              exact
              path="/fixed_assets_import"
              component={FixedAssetsImport}
            />
            <Route exact path="/client_selection" component={ClientSelection} />
            {/* first_user_module - jairam*/}

            <Route
              exact
              path="/bank_reconcile_summary"
              component={BankReconcileSummary}
            />
            {/* <Route
              exact
              path="/fixed_assets_type_view"
              component={FixedAssetView}
            /> */}
            <Route exact path="/add_new_asset" component={AddNewAsset} />
            <Route exact path="/add_bank_account" component={AddBankAccount} />
            <Route exact path="/add_bank_detail" component={AddBankDetail} />
            <Route
              exact
              path="/add_bank_internet"
              component={AddBankInternet}
            />
            <Route exact path="/add_bank_login" component={AddBankLogin} />

            <Route exact path="/make_deposit" component={MakeDeposit} />
            <Route exact path="/transfer_funds" component={TransferFund} />
            <Route exact path="/write_cheque" component={WriteCheque} />

            <Route exact path="/Make_depo_test" component={Make_depo_test} />
            <Route
              exact
              path="/summary_added_type_items"
              component={SummaryOfAddedItems}
            />
            <Route exact path="/to_do" component={Todo} />
            <Route exact path="/enter_batch_transaction" component={enteBatchTrans} />
            <Route exact path="/client_data_review" component={ClientDataReview} />

            <Route exact path="/trial_balance" component={TrialBalanceReport} />
            <Route exact path="/journal" component={JournalReport} />
            <Route exact path="/prior_sales_tax_return" component={ViewPriorSalesTaxReturns} />
            <Route exact path="/sequence_check" component={SequenceCheck} />
            <Route exact path="/batch_column_rearrange" component={BatchColumnRearrange} />

            <Route exact path="/landing_page" component={LandingPage} />
            <Route exact path="/home_currency_adjustment" component={HomeCurrencyAdjustment} />
            <Route exact path="/Customer_multipayment_notification" component={Customer_multi_noti} />

            <Route exact path="/testing_notification" component={Testing_notification} />
            <Route exact path="/testing_customer_credit_memo" component={Testing_customer_credit_memo} />
            <Route exact path="/create_estimate" component={Testing_create_estimate} />
            <Route exact path="/create_salesorder" component={Testing_create_salesorder} />
            <Route exact path="/create_purchaseorder" component={Testing_create_purchaseorder} />
            <Route exact path="/preference_purchase" component={Preference_purchase_order} />
            {/* <Route exact path="/left_side_bar" component={Left_sidebar} />  */}
            <Route exact path="/template_print" component={TemplatePrint} />
            <Route exact path="/template_edit_page_2" component={SecondTemplateEditPage} />
            <Route exact path="/template_edit_page_3" component={ThirdTemplateEditPage} />
           <Route exact path="/auto_invoice_mail" component={Autoinvoicemail} />
          </div>
        </Router>
      </div>
    );
  }
}

export default commonlinks;


