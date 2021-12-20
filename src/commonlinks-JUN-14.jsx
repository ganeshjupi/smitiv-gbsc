import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import config from './api_links/api_links';

import login from './components/auth/login'
import user_inbox from './components/user_inbox'
import profit_loss_report from './components/reports/profit_loss_report'
import forgot_password from './components/auth/forgot_password'
import data_tagging from './components/data_tagging'
import inbox from './components/inbox'
import compose from './components/compose'
import sent_items from './components/sentItems'
import reviewedItems from './components/reviewedItems'
import register from './components/auth/register'
import registerPayment from './components/registerPayment'
import rolesAndPermissions from './components/rolesAndPermissions'
import registerFinished from './components/registerFinished'
import custom_editable_template from './components/custom_editable_template'
import invoice_template_listing from './components/invoice_template_listing'
import balance_sheet_report from './components/reports/balance_sheet'
import create_invoice from './components/create_invoice'
import customer_module from './components/reports/customer_module'
import customer_balance_summary from './components/reports/customer_balance_summary'
// import customer_balance_detail from "./components/reports/customer_balance _detail";
import vendor_balance_detail from './components/reports/vendor_balance_detail'
import open_invoice from './components/reports/open_invoice'
import vendor_balance_summary from './components/reports/vendor_balance_summary'
import ap_aging_summary from './components/reports/ap_aging_summary'
import ar_aging_summary from './components/reports/ar_aging_summary'
import unpaid_bills from './components/reports/unpaid_bills'
import loading from './components/reports/loading'

import Vendors_list from './components/vendors_list'
import AddNewVendor from './components/add_new_vendor'
import VendorDetails from './components/vendor_details'

import addJob from './components/add-job'
import editJob from './components/edit-job'

import AddNewCustomer from './components/add-new-customer'
import Customer from './components/customers-list'
import CustomerDetails from './components/customer_details'
import CustomerJobDetails from './components/customer_job_details'
import employeeList from './components/employee-list'
import EmployeeDetails from './components/employee-details'
import EditEmployee from './components/edit-employee'
import AddNewEmployee from './components/add-new-employee'
import Customer_receive_payment from './components/customer_receive_payment'
import Vendor_bill_payment from './components/vendor_bill_payment'

import AllReport from './components/reports/all_report'
import SpecifiedReports from './components/reports/compIndex'
import GST_Details from './components/reports/gst_details'
import Gst_report_summary from './components/reports/gst_report_summary'
import GeneralLedger from './components/reports/general_ledger'
import save_draft from './components/save_draft'
import rolesPermissions from './components/roles-and-permissions'
// Bank section
import CreateBankRule from './components/bank/create_bank_rule'
import CreditRule from './components/bank/create-credit-rule'
import BankReconcileMatch from './components/bank/bank_reconcile_match'
import BankReconcileCreate from './components/bank/bank_reconcile'
import FindMatchTrans from './components/bank/find_match'


class commonlinks extends React.Component {
  constructor (props) {
    super(props)
    //const { history } = this.props;
    this.state = {
      logged_user_id: localStorage.getItem('logged_user_id'),
      logged_client_id: localStorage.getItem('logged_client_id'),
      logged_role_id: localStorage.getItem('logged_role_id'),
      logged_user_name: localStorage.getItem('logged_user_name'),
      logged_user_email: localStorage.getItem('logged_user_email'),
      logged_user_phone: localStorage.getItem('logged_user_phone'),
      logged_user_image: localStorage.getItem('logged_user_image'),
      logged_company_name: localStorage.getItem('logged_company_name'),
      dropdown: '',
      inbox_list: [],
      response_stus: 0,
      response_msg: 'No data found',
      item_details: '',
      item_file_path: ''
    }
  }

  render () {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={login} />
            <Route exact path='/login' component={login} />
            <Route exact path='/user_inbox' component={user_inbox} />
            <Route exact path='/forgot_password' component={forgot_password} />
            <Route
              exact
              path='/data_tagging/:list_id/:file_id'
              component={data_tagging}
            />
            <Route exact path='/inbox' component={inbox} />
            <Route exact path='/compose' component={compose} />
            <Route exact path='/sent_items' component={sent_items} />
            <Route exact path='/reviewed_items' component={reviewedItems} />
            <Route exact path='/register' component={register} />
            <Route exact path='/register_Payment' component={registerPayment} />
            <Route
              exact
              path='/roles_permissions'
              component={rolesAndPermissions}
            />
            <Route
              exact
              path='/register_finished'
              component={registerFinished}
            />
            <Route
              exact
              path='/editable/:template_id'
              component={custom_editable_template}
            />
            <Route
              exact
              path='/invoice_templates'
              component={invoice_template_listing}
            />
            <Route exact path='/create_invoice' component={create_invoice} />
            <Route
              exact
              path='/profit_loss_report'
              component={profit_loss_report}
            />
            <Route
              exact
              path='/balance_sheet'
              component={balance_sheet_report}
            />
            <Route exact path='/customer_module' component={customer_module} />
            <Route
              exact
              path='/customer_balance_summary'
              component={customer_balance_summary}
            />
            {/* <Route exact path="/customer_balance_detail" component={customer_balance_detail} /> */}
            <Route
              exact
              path='/vendor_balance_detail'
              component={vendor_balance_detail}
            />
            <Route exact path='/open_invoice' component={open_invoice} />
            <Route
              exact
              path='/vendor_balance_summary'
              component={vendor_balance_summary}
            />
            <Route
              exact
              path='/ap_aging_summary'
              component={ap_aging_summary}
            />
            <Route
              exact
              path='/ar_aging_summary'
              component={ar_aging_summary}
            />
            <Route exact path='/unpaid_bills' component={unpaid_bills} />
            {/* <Route exact path="/customers-list" component={Customer} />
                    <Route exact path="/add-new-customer" component={AddNewCustomer} /> */}

            <Route exact path='/add_new_vendor' component={AddNewVendor} />
            <Route exact path='/vendor_details' component={VendorDetails} />
            <Route exact path='/Vendors_list' component={Vendors_list} />

            <Route exact path='/add-job' component={addJob} />

            <Route exact path='/edit-job' component={editJob} />
            <Route exact path='/customers-list' component={Customer} />
            <Route exact path='/add-new-customer' component={AddNewCustomer} />
            <Route exact path='/customer_details' component={CustomerDetails} />
            <Route
              exact
              path='/Customer-Job-Details'
              component={CustomerJobDetails}
            />
            <Route exact path='/employee-list' component={employeeList} />
            <Route exact path='/employee-details' component={EmployeeDetails} />

            <Route exact path='/edit-employee' component={EditEmployee} />
            <Route exact path='/add-new-employee' component={AddNewEmployee} />
            <Route
              exact
              path='/Customer_receive_payment'
              component={Customer_receive_payment}
            />
            <Route
              exact
              path='/vendor_bill_payment'
              component={Vendor_bill_payment}
            />
            <Route exact path='/all-report' component={AllReport} />
            <Route
              exact
              path='/filtered-reports'
              component={SpecifiedReports}
            />
            <Route exact path='/loading' component={loading} />

            <Route exact path='/GST_detail_report' component={GST_Details} />
            <Route
              exact
              path='/Gst_report_summary'
              component={Gst_report_summary}
            />
            <Route exact path='/general_ledger' component={GeneralLedger} />
            <Route exact path='/save_draft' component={save_draft} />
            <Route exact path='/kk' component={rolesPermissions} />

            <Route exact path='/create-bank-rule' component={CreateBankRule} />
            <Route exact path='/create-credit-rule' component={CreditRule} />

            <Route
              exact
              path='/bank-reconcile-match'
              component={BankReconcileMatch}
            />

            <Route
              exact
              path='/bank-reconcile-create'
              component={BankReconcileCreate}
            />

<Route
              exact
              path='/find-match'
              component={FindMatchTrans}
            />
            
          </div>
        </Router>
      </div>
    )
  }
}

export default commonlinks
