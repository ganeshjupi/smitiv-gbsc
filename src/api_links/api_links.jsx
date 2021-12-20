// old url 
// var siteUrl = "http://13.250.63.251:9002/";
//   'http://13.250.31.123:9002/'    http://localhost:9002/  13.250.31.123  http://9e26dc5314c4.ngrok.io   'http://13.250.31.123:9002/'=
// http://18.141.143.192/
// const url = "http://13.250.63.251:9002/";
// old url 

// https://api.genie.com.sg

// for developer
// var siteUrl = "http://18.141.202.96/";
// const url = "http://18.141.202.96/";
// for developer

// for live
var siteUrl = "https://api.genie.com.sg/";
const url = "https://api.genie.com.sg/";
// for live


export const datatagging_save = url + "save_datagging_coordinates";
export const get_invoiceDetails = url + "get_invoice_details_by_name";
export const getAllCompanycoords = url + "get_all_company_coords";
export const savedatatagingcoordsdraft=url + "save_datagging_coordinates_draft"
// export const getInvoiceId = url + "getInvoiceId"
// export const getInvoiceIds = url + "getIds"
// export const pdftoimg = url + "pdftoimg"

var config = {
  login_link: siteUrl + "login",
  create_creditmemo: siteUrl + "create_creditmemo",
  create_purchaseorder: siteUrl + "create_purchase_order",

  create_estimate: siteUrl + "create_estimate",
  create_salesorder: siteUrl + "create_salesorder",
  create_statment: siteUrl + "",
  forgot_password_link: siteUrl + "forgot_password",
  inbox_list_link: siteUrl + "inbox_list",
  get_item_details_link: siteUrl + "get_item_details",
  get_file_path_link: siteUrl + "get_file_path",
  add_comment_link: siteUrl + "add_comment",
  customer_balance_sheet: siteUrl + "customer_balance_sheet",
  sent_items: siteUrl + "sent_items",
  save_new_document: siteUrl + "save_new_document",
  register_new_company: siteUrl + "register_new_company",
  get_entity_types: siteUrl + "get_entity_types",
  get_countries: siteUrl + "get_countries",
  get_states: siteUrl + "get_states",
  add_new_entity: siteUrl + "add_new_entity",
  edit_user_role: siteUrl + "edit_user_role",
  get_user_role_list: siteUrl + "get_user_role_list",
  add_new_user_role: siteUrl + "add_new_user_role",
  get_file_comments: siteUrl + "get_file_comments",
  delete_comment: siteUrl + "delete_comment",
  update_comment: siteUrl + "update_comment",
  get_sub_comments: siteUrl + "get_sub_comments",
  save_tagged_item: siteUrl + "save_tagged_item",
  update_tagged_item: siteUrl + "update_tagged_item",
  default_category_list: siteUrl + "default_category_list",
  manual_journal_defaultcategorylist: siteUrl + 'manual_journal_default_category_list',
  balance_sheet_category_list: siteUrl + "balance_sheet_category_list",
  category_list: siteUrl + "category_list",
  sub_category_list: siteUrl + "sub_category_list",
  get_manual_journal_SubCategory: siteUrl + "manual_journal_sub_category_list",
  account_type_list: siteUrl + "account_type_list",
  add_new_account_name: siteUrl + "add_new_account_name",
  save_tagged_item_draft: siteUrl + "save_tagged_item_draft",
  sub_account_list: siteUrl + "sub_account_list",
  get_gst_list: siteUrl + "get_gst_list",
  add_gst_details: siteUrl + "add_gst_details",
  get_client_country: siteUrl + "get_client_country",
  invoice_template_list: siteUrl + "invoice_template_list",
  invoice_template_details: siteUrl + "invoice_template_details",
  remove_invoice_template: siteUrl + "remove_invoice_template",
  set_default_invoice_template: siteUrl + "set_default_invoice_template",
  create_sales_invoice: siteUrl + "create_sales_invoice",
  duplicate_invoice_template: siteUrl + "duplicate_invoice_template",
  invoice_template_details: siteUrl + "invoice_template_details",
  save_invoice_template_draft: siteUrl + "save_invoice_template_draft",
  edit_invoice_template: siteUrl + "edit_invoice_template",
  get_tagging_column_list: siteUrl + "get_tagging_column_list",
  add_dropdown_options: siteUrl + "add_dropdown_options",
  reports_api: siteUrl + "profit_and_loss_column_filter",
  customer_balance_summary: siteUrl + "customer_balance_summary",
  getbalancesheet: siteUrl + "balance_sheet_demo",
  show_column_option_list: siteUrl + "show_column_option_list",
  profit_and_loss_sub_columns: siteUrl + "profit_and_loss_sub_columns",
  vendor_balance_detail: siteUrl + "vendor_balance_detail",
  open_invoices: siteUrl + "open_invoices",
  vendor_balance_Summary: siteUrl + "vendor_balance_Summary",
  ap_aging_summary: siteUrl + "ap_aging_summary",
  ar_aging_summary: siteUrl + "ar_aging_summary",
  filter_column: siteUrl + "filter_column",
  unpaid_Bills: siteUrl + "unpaid_Bills",
  repot_column: siteUrl + "report_coloumns",
  vendor_list: siteUrl + "vendor_list",
  customerlist: siteUrl + "customerlist",
  paymentTerms: siteUrl + "customer/paymentterm/list",
  delivery_method_list: siteUrl + "customer/preferreddelivery/list",
  add_new_customer: siteUrl + "customer/create",
  sales_tax_settings: siteUrl + "customer/salestax/setting/list",
  sales_defaultAccounts: siteUrl + "customer/salesdefault/list",
  purchase_tax_settings: siteUrl + "customer/purchasetax/setting/list",
  purchase_defaultAccounts: siteUrl + "customer/purchasedefault/list",
  customer_sales_tax_list: siteUrl + "customer/salestax/list",
  get_defaultPurchaseTaxLists: siteUrl + "customer/purchasetax/list",
  referel_from: siteUrl + "customer/referraltype/list",
  rep_info: siteUrl + "customer/salesrep/list",
  type_info: siteUrl + "customer/jobtype/list",
  status_info: siteUrl + "customer/jobstatus/list",
  file_tax_return_generate_pdf: siteUrl + "file_tax_return_generate_pdf",
  //added
  customer_transaction: siteUrl + "customer_transaction",
  recent_Items: siteUrl + "customer_recent_invoices",
  Basic_Info: siteUrl + "customer_list_by_id",
  update_customer: siteUrl + "update_customer",
  currency: siteUrl + "currency/list",
  customer_type_list: siteUrl + "customer_type_list",
  customer_job_list: siteUrl + "customer_job_list",
  job_transaction: siteUrl + "job_transaction",
  job_recent_invoices: siteUrl + "job_recent_invoices",
  notes_list: siteUrl + "notes_list",
  Statement_details: siteUrl + "customer_statement",
  customer_job_list_by_id: siteUrl + "customer_job_list_by_id",
  delete_customer: siteUrl + "delete_customer",
  delete_job: siteUrl + "delete_job",
  create_notes: siteUrl + "create_notes",
  sub_account_list: siteUrl + "sub_account_list",
  customer_list_vendor: siteUrl + "customer_and_job_list",
  add_new_job: siteUrl + "customer/job/create",
  edit_job_api: siteUrl + "customer/job/update",

  make_customer_active: siteUrl + "make_customer_active",
  update_notes: siteUrl + "update_notes",
  delete_notes: siteUrl + "delete_notes",

  // vendor module
  vendor_type_list: siteUrl + "vendor_type_list",
  vendor_paymentTerms: siteUrl + "vendor_payment_terms",
  vendor_details: siteUrl + "vendor_details",
  vendor_sales_tax: siteUrl + "vendor_sales_tax_list",
  vendor_purchase_tax: siteUrl + "vendor_purchase_tax_list",

  vendor_basic_info: siteUrl + "vendor_list_by_id",
  vendor_transaction: siteUrl + "vendor_transaction",
  vendor_notes: siteUrl + "get_vendor_notes_list",
  vendor_recent_items: siteUrl + "vendor_recent_invoices",
  add_new_vendor: siteUrl + "create_vendor",
  create_vendor_notes: siteUrl + "vendor_create_notes",
  update_vendor_notes: siteUrl + "vendor_edit_notes",
  delete_vendor_notes: siteUrl + "vendor_delete_notes",
  vendor_statement: siteUrl + "vendor_statement",
  edit_vendor: siteUrl + "edit_vendor",
  make_vendor_active: siteUrl + "make_vendor_active",
  make_vendor_inactive: siteUrl + "delete_or_inactive_vendor",

  make_customer_active: siteUrl + "make_customer_active",
  employee_department_list: siteUrl + "employee_department_list",
  employee_type: siteUrl + "employee_type",
  customerlist: siteUrl + "customerlist",
  paymentTerms: siteUrl + "customer/paymentterm/list",
  delivery_method_list: siteUrl + "customer/preferreddelivery/list",
  add_new_customer: siteUrl + "customer/create",
  sales_tax_settings: siteUrl + "customer/salestax/setting/list",
  sales_defaultAccounts: siteUrl + "customer/salesdefault/list",
  purchase_tax_settings: siteUrl + "customer/purchasetax/setting/list",
  purchase_defaultAccounts: siteUrl + "customer/purchasedefault/list",
  customer_sales_tax_list: siteUrl + "customer/salestax/list",
  get_defaultPurchaseTaxLists: siteUrl + "customer/purchasetax/list",
  referel_from: siteUrl + "customer/referraltype/list",
  // rep_info: siteUrl + "customer/referraltype/list",
  type_info: siteUrl + "customer/jobtype/list",
  // status_info: siteUrl + "customer/jobstatus/list",
  customer_transaction: siteUrl + "customer_transaction",
  recent_Items: siteUrl + "customer_recent_invoices",
  Basic_Info: siteUrl + "customer_list_by_id",
  currency: siteUrl + "currency/list",
  customer_type_list: siteUrl + "customer_type_list",
  customer_job_list: siteUrl + "customer_job_list",
  job_transaction: siteUrl + "job_transaction",
  job_recent_invoices: siteUrl + "job_recent_invoices",
  notes_list: siteUrl + "notes_list",
  Statement_details: siteUrl + "customer_statement",
  customer_job_list_by_id: siteUrl + "customer_job_list_by_id",
  delete_customer: siteUrl + "delete_customer",
  delete_job: siteUrl + "delete_job",
  create_notes: siteUrl + "create_notes",
  sub_account_list: siteUrl + "sub_account_list",
  customer_list_vendor: siteUrl + "customer_and_job_list",
  add_new_job: siteUrl + "customer/job/create",
  edit_job_api: siteUrl + "customer/job/update",
  make_customer_active: siteUrl + "make_customer_active",
  update_notes: siteUrl + "update_notes",
  delete_notes: siteUrl + "delete_notes",
  employeelist: siteUrl + "employeelist",
  employee_create_notes: siteUrl + "employee_create_notes",
  employee_notes_list: siteUrl + "get_employee_notes_list",
  employee_transaction: siteUrl + "employee_transaction",
  employee_basic_info: siteUrl + "employee_list_by_id",
  employee_edit_notes: siteUrl + "employee_edit_notes",
  employee_delete_notes: siteUrl + "employee_delete_notes",
  make_employee_active: siteUrl + "make_employee_active",
  delete_or_inactive_employee: siteUrl + "delete_or_inactive_employee",

  employee_department_list: siteUrl + "employee_department_list",
  employee_type: siteUrl + "employee_type",
  payment_method_employee: siteUrl + "employee/payroll/payment_method/list",
  payroll_frequncy: siteUrl + "employee/payroll/payroll_frequency",
  employee_create: siteUrl + "employee_create",
  employeelist: siteUrl + "employeelist",
  employee_office_list: siteUrl + "employee_office_list",
  employee_shift_type: siteUrl + "employee_shift_type",
  salary_type: siteUrl + "employee/payroll/salary_type",
  variable_freq_type:
    siteUrl + "employee/payroll/payroll_amount_type",

  employee_update: siteUrl + "employee_update",
  vendor_account_type: siteUrl + "vendor_account_type",
  vendor_invoicelist: siteUrl + "vendor_invoicelist",
  vendor_payment_method: siteUrl + "customer/preferredpayment/list",
  vendor_credit_list: siteUrl + "vendor_creditlists",
  vendor_category: siteUrl + "category_drop_down",
  vendor_payment_account_type: siteUrl + "vendor_payment_account_type",
  vendor_discount_terms: siteUrl + "vendor_discount_terms",
  applied_credit_history: siteUrl + "applied_credit_history",

  vendor_bill_payment: siteUrl + "vendor_bill_payment",
  vendor_bank_account: siteUrl + "vendor_bank_account",
  third_party_account_list: siteUrl + "third_party_account_list",

  //Customer bill payment
  customer_recived_payment: siteUrl + "customer_recived_payment",
  customer_account_type: siteUrl + "customer_account_type",
  customer_and_job_list: siteUrl + "customer_and_job_list",
  customer_account_type: siteUrl + "customer_account_type",
  customer_invoicelist: siteUrl + "customer_invoicelist",
  customer_recived_payment: siteUrl + "customer_recived_payment",

  customer_creditlists: siteUrl + "customer_creditlists",
  customer_appliedcreditlists: siteUrl + "customer_appliedcreditlists",
  default_discount_term: siteUrl + "default_discount_term",

  //unpaid filter updation
  payment_terms: siteUrl + "customer/paymentterm/list",
  all_report_name: siteUrl + "all_report_name",
  gst_report_detail: siteUrl + "gst_report_detail",
  gst_report_summary: siteUrl + "gst_report_summary",

  delete_user_role: siteUrl + "delete_user_role",
  get_Table_Data: siteUrl + "list/module",
  get_plan_list: siteUrl + "get_plan_list",
  general_ledger: siteUrl + "general_ledger",

  customerjoblist: siteUrl + "customerjoblist",
  get_client_list: siteUrl + "get_client_list",

  get_inboxdraft_list: siteUrl + "get_inboxdraft_list",
  save_doucment_list_draft: siteUrl + "save_doucment_list_draft",
  locale_list: siteUrl + "locale_list",
  resolve_comment: siteUrl + "resolve_comment",
  add_invoice_column: siteUrl + "add_invoice_column",
  get_invoice_column_list: siteUrl + "get_invoice_column_list",
  invoiceadd_dropdown_options: siteUrl + "invoiceadd_dropdown_options",
  add_bankrule_details: siteUrl + "add_bankrule_details",
  get_bankrule_list:siteUrl + 'get_bankrule_list',
  field_list: siteUrl + "field_list",
  condition_list: siteUrl + "condition_list",
  get_bankaccountlist: siteUrl + "get_bankaccountlist",
  bankstatment: siteUrl + "bankstatment",
  accounttransaction: siteUrl + "accounttransaction",
  cashcoding: siteUrl + "cashcoding",
  get_bankaccountlist: siteUrl + "get_bankaccountlist",
  getbankstatement: siteUrl + "getbankstatement",

  payment_method: siteUrl + "customer/paymenttype/list",

  sales_product_item_list: siteUrl + "sales_product_item_list",
  purchase_product_item_list: siteUrl + "purchase_product_item_list",
  add_sales_product_item: siteUrl + "add_sales_product_item",
  add_purchase_product_item: siteUrl + "add_purchase_product_item",
  get_sales_invoice_custom_column_list:
    siteUrl + "get_sales_invoice_custom_column_list",
  update_sales_invoice_custom_column_list:
    siteUrl + "update_sales_invoice_custom_column_list",
  sub_account_list: siteUrl + "sub_account_list",
  // add_new_account_name: siteUrl + "add_new_account_name",

  add_customer_type: siteUrl + "add_customer_type",

  add_customer_payment_terms: siteUrl + "add_customer_payment_terms",

  add_customer_preferred_delivery: siteUrl + "add_customer_preferred_delivery",

  add_customer_preferred_payment: siteUrl + "add_customer_preferred_payment",

  add_customer_sales_tax_settings: siteUrl + "add_customer_sales_tax_settings",

  add_customer_sales_deafult_account_option:
    siteUrl + "add_customer_sales_deafult_account_option",

  add_customer_purchase_tax_settings:
    siteUrl + "add_customer_purchase_tax_settings",

  add_customer_purchase_default_account_option:
    siteUrl + "add_customer_purchase_default_account_option",

  add_customer_default_sales_tax_option:
    siteUrl + "add_customer_default_sales_tax_option",

  add_customer_default_purchase_tax_option:
    siteUrl + "add_customer_default_purchase_tax_option",

  add_customer_job_type: siteUrl + "add_customer_job_type",

  add_customer_job_status: siteUrl + "add_customer_job_status",

  add_customer_referral_from: siteUrl + "add_customer_referral_from",

  payment_type: siteUrl + "create_paymentmethod",

  cloudvisionAPI: siteUrl + "cloud_vision_test",
  next_invoice_number: siteUrl + "next_invoice_number",
  get_sales_invoice_details: siteUrl + "get_sales_invoice_details",
  edit_sales_invoice: siteUrl + "edit_sales_invoice",
  edit_sales_invoice_payment: siteUrl + "edit_sales_invoice_payment",

  addVendorCredit: siteUrl + "add_vendor_credit",

  // sortby filters for report
  reportSortbyOptions: siteUrl + "report_sortby_options",

  // user module starts  - profile page
  userDesignationList: siteUrl + "user_designation_list",
  addNewUserDesignation: siteUrl + "add_new_user_designation",

  getUserProfile: siteUrl + "get_user_profile",
  editUser: siteUrl + "edit_user",
  updatePassword: siteUrl + "update_password",
  deleteUser: siteUrl + "delete_user",
  editProfilePicture: siteUrl + "edit_profile_picture",

  //user module - invite member page

  addNewUser: siteUrl + "add_new_user",

  // user module - subscription page
  get_subscription_list: siteUrl + "get_subscription_list",
  get_current_subscription_details:
    siteUrl + "get_current_subscription_details",
  update_subscribe_plan: siteUrl + "update_subscribe_plan",
  cancel_subscribed_plan: siteUrl + "cancel_subscribed_plan",
  subscribe_plan: siteUrl + "subscribe_plan",

  //first_user_module-member page
  add_new_member: siteUrl + "new_user",
  all_subscription_list: siteUrl + "all_subscription_list",
  get_subscriber_contact_information:
    siteUrl + "get_subscriber_contact_information",
  list_user: siteUrl + "list_user",
  user_designation_list: siteUrl + "user_designation_list",
  get_subscriber_list_by_country: siteUrl + "get_subscriber_list_by_country",
  change_user_active_or_inactive: siteUrl + "change_user_active_or_inactive",
  resend_invite: siteUrl + "resend_invite",

  edit_invoice_template: siteUrl + "edit_invoice_template",

  //edit vendor bill
  get_vendor_bill_details: siteUrl + "get_vendor_bill_details",
  // log in suscriber list
  get_user_subscriber_list: siteUrl + "get_user_subscriber_list",

  // bank-Reconcilation
  bank_import_statements: siteUrl + "exceltojson",
  getAllbanks: siteUrl + "getAllBanks",
  matchlist: siteUrl + "matchlist",
  get_reconcile_items: siteUrl + "getBankReconcileItems",
  post_reconcile_items: siteUrl + "postReconcileItem",
  get_matching_trans: siteUrl + "getMatchingTrans",
  Find_reconcile_items: siteUrl + "findReconcileItems",
  get_reconcile_summary: siteUrl + "reconcilationSummary",
  get_bank_statement_summary: siteUrl + "bankStatementSummary",
  postCashCodingItems: siteUrl + "postCashCodingItems",
  // home currency
  get_client_home_currency: siteUrl + "get_client_home_currency",
  get_home_currency_adjusted_details_by_id: siteUrl + "get_home_currency_adjusted_details_by_id",
  //  next credit no
  next_credit_number: siteUrl + "next_credit_number",

  //p&l breakdown
  profit_and_loss_break_by_account:
    siteUrl + "profit_and_loss_break_by_account",
    view_prior_filed_tax_return_options_list: siteUrl + "view_prior_filed_tax_return_options_list",
  //settings module
  get_custom_column_list:siteUrl + "/app/findAndRecode/get_custom_column_list",
  create_Organization_Profile: siteUrl + "app/organisationProfile",
  get_data: siteUrl + "app/organisationProfile/getAutofilledData",
  email_template_data: siteUrl + "app/email/email_templates/",
  view_email_template: siteUrl + "app/email/view",
  edit_email_template: siteUrl + "app/email/edit",
  delete_email: siteUrl + "app/email/delete",
  post_email: siteUrl + "app/email/add_email_id",
  create_email_template: siteUrl + "app/email",
  create_sales_estimate: siteUrl + "app/sales/estimate",
  create_sales_estimate_edit: siteUrl + "app/sales/estimateEdit",
  create_sales_invoice1: siteUrl + "app/sales/invoice",
  create_sales_invoice1_edit: siteUrl + "app/sales/invoiceEdit",
  create_sales_order: siteUrl + "app/sales/sales_order",
  create_sales_order_edit: siteUrl + "app/sales/sales_orderEdit",
  create_sales_credit: siteUrl + "app/sales/sales_credit",
  create_sales_credit_edit: siteUrl + "app/sales/sales_creditEdit",
  create_sales_purchase: siteUrl + "app/sales/sales_purchase",
  create_sales_purchase_edit: siteUrl + "app/sales/sales_purchaseEdit",
  create_sales_statement: siteUrl + "app/sales/sales_statement",
  create_sales_statement_edit: siteUrl + "app/sales/sales_statementEdit",
  create_sales_journal: siteUrl + "app/sales/manual_gerenal",
  create_sales_journal_edit: siteUrl + "app/sales/manual_gerenalEdit",
  tax_details: siteUrl + "app/Tax/view",
  delete_tax: siteUrl + "app/Tax/delete",
  edit_tax: siteUrl + "app/Tax/edit",
  show_email: siteUrl + "app/email/View/email_address",
  get_Default_Email: siteUrl + "/app/email/ViewDefaultEmail",
  verify_Email: siteUrl + "app/email/VerifyEmail",
  recode_table: siteUrl + "app/findAndRecode/View",
  settings_sales_estimate: siteUrl + "app/sales/estimateView",
  settings_sales_invoice: siteUrl + "app/sales/invoiceView",
  settings_sales_order: siteUrl + "app/sales/sales_orderView",
  settings_sales_credit: siteUrl + "app/sales/sales_creditView",
  settings_sales_purchase: siteUrl + "app/sales/sales_purchaseView",
  settings_sales_statement: siteUrl + "app/sales/sales_statementView",
  settings_sales_journal: siteUrl + "app/sales/manual_gerenalntView",
  settings_find_drop1: siteUrl + "app/findAndRecode/filter_options_list",
  settings_find_drop2: siteUrl + "app/findAndRecode/option_list_by_key",
  settings_find_drop3: siteUrl + "app/historyAndNotes/option_list_by_key",
  settings_approval: siteUrl + "app/email/VerifyEmail",
  select_email_radio: siteUrl + "app/email/email_address_select",

  find_sort_table: siteUrl + "app/findAndRecode/sort",
  condition_is_recode_table: siteUrl + "app/findAndRecode/IsName",
  condition_is_not_recode_table: siteUrl + "app/findAndRecode/IsNotName",
  recode_table_data: siteUrl + "app/findAndRecode/edit",
  tax_status_change: siteUrl + "app/Tax/Status_change",
  getMemoDetails: siteUrl + "get_credit_memo_details",
  get_manual_journal_next_number: siteUrl + 'app/sales/next_manual_journal_number',

  settings_defaultNamelist:
    siteUrl + "app/findAndRecode/customer_and_vendor_list",
  settings_asset_account: siteUrl + "app/fixedAsset/get_asset_account",
  settings_accumulated_account:
    siteUrl + "app/fixedAsset/get_accumulated_depreciation_account",
  settings_expense_account:
    siteUrl + "app/fixedAsset/get_depreciation_expense_account",
  settings_depreciation_method_list:
    siteUrl + "app/fixedAsset/depreciation_method_list",
  settings_averaging_method_list:
    siteUrl + "app/fixedAsset/averaging_method_list",
  settings_asset_type_list: siteUrl + "app/fixedAsset/asset_type_list",
  settings_edit_asset_type: siteUrl + "app/fixedAsset/edit_asset_type",
  settings_get_asset_type_values: siteUrl + "app/fixedAsset/asset_type_details",
  settings_asset_list: siteUrl + "app/fixedAsset/asset_list",
  settings_add_new_asset: siteUrl + "app/fixedAsset/add_new_asset",
  settings_get_asset_values: siteUrl + "app/fixedAsset/view_asset",
  settings_edit_asset: siteUrl + "app/fixedAsset/edit_asset",
  settings_add_new_asset_type: siteUrl + "app/fixedAsset/add_asset_type",

  customer_vendor_list: siteUrl + "app/findAndRecode/customer_and_vendor_list",
  make_deposit: siteUrl + "make_deposit",
  get_deposit_details: siteUrl + "get_deposit_details",
  write_cheaque: siteUrl + "write_cheaque",
  get_cheque_details: siteUrl + "get_cheque_details",
  fund_transfer: siteUrl + "transfer_Funds",
  settings_account_list: siteUrl + "app/fixedAsset/account_list",
  //setting 12-11-2020
  settings_asset_date_based_list:
    siteUrl + "app/fixedAsset/get_assets_to_depreciate",
  settings_asset_depreciation_confirm:
    siteUrl + "app/fixedAsset/run_depreciation",
  settings_asset_rollback: siteUrl + "app/fixedAsset/rollback_depreciation",
  get_all_bank_statements: siteUrl + "get_all_bank_statements",
  get_bank_balance: siteUrl + "get_bank_balance",
  post_delete_bank_statements: siteUrl + "post_delete_bank_statements",
  get_all_account_statements: siteUrl + "get_all_account_statements",
  create_batch_transaction: siteUrl + "create_batch_transaction",
  add_batch_enter_custom_column: siteUrl + "add_batch_enter_custom_column",
  get_batch_enter_custom_column: siteUrl + "get_batch_enter_custom_column",
  settings_asset_account_type: siteUrl + "app/fixedAsset/add_asset_type_name",
  history_notes_search: siteUrl + "app/historyAndNotes/get_history_and_notes",
  create_todo_list: siteUrl + "todo/save",
  to_do_list_details: siteUrl + "todo/view",
  done_todo_list: siteUrl + "todo/update",
  trial_balance: siteUrl + "trial_balance",
  sequence_check_option_list: siteUrl + "sequence_check_option_list",
  sequence_check_by_type: siteUrl + "sequence_check_by_type",

  // now 

  done_todo_list: siteUrl + "todo/update",
  done_todo_list_edit: siteUrl + "todo/edit",
  done_todo_list_delete: siteUrl + "todo/delete",
  editServiceItems: siteUrl + "edit_sales_product_item",
  edit_purchase_product_item: siteUrl + "edit_purchase_product_item",
  service_item_delete: siteUrl + "delete_or_inactive_sales_product_item",
  settings_find_drop2_contact: siteUrl + "app/findAndRecode/customer_and_vendor_list",
  post_new_journal: siteUrl + "add_new_manual_journal",
  manual_journal_main: siteUrl + "get_manual_journal_list",

  get_settings_currency: siteUrl + "app/currencies/currency_list",
  get_chart_accounts: siteUrl + "get_accounts",
  get_client_incorpdate: siteUrl + "app/currencies/get_incorporation_date",
  add_new_currency: siteUrl + "app/currencies/add_currency",
  // now


  // from branch of develoment branch

  get_customer_review_data: siteUrl + "get_customer_review_data",

  // from branch of develoment branch

  // journal report
  journal_report: siteUrl + "journal_report",

  get_details_page_subscribers: siteUrl + "get_all_subscriber_list",
  checkPage: siteUrl + "accept_invitation",
  get_vendor_credit_details: siteUrl + "get_vendor_credit_details",
  // checkPage:siteUrl + "accept_invitation",
  edit_member: siteUrl + "edit_member",
  save_bill_as_vendor_credit: siteUrl + "save_bill_as_vendor_credit",
  get_bill_by_attachment: siteUrl + "get_bill_by_attachment",
  save_sales_invoice_as_pdf: siteUrl + "save_sales_invoice_as_pdf",
  accountant_sent_items: siteUrl + "accountant_sent_items",
  group_filter: siteUrl + "get_business_contacts",
  group_send_req: siteUrl + "post_group_accounting_request",
  get_group_accounting_sent_bills:siteUrl + "get_group_accouting_sent_bills",
  get_group_accounting_reveived_payment:siteUrl + "get_group_accounting_reveived_payment_list",
  group_send_request_list: siteUrl + "get_group_accouting_sent_list",
  get_notification: siteUrl + "view_group_accounting_notifications",
  request_accept: siteUrl + "accept_group_accounting_invitation",

  get_customer_multipayment_details: siteUrl + "get_customer_multipayment_details",
  all_client_mail: siteUrl + "all_client_mail",
  edit_creditmemo: siteUrl + "edit_creditmemo",
  rejectBill: siteUrl + "reject_bill",
  group_received_list: siteUrl + "get_group_accouting_request_list",
  get_list_to_adjust_currency: siteUrl + "get_list_to_adjust_currency",
  save_adjusted_currency: siteUrl + "save_adjusted_currency",
  getGroupInvoiceDetails: siteUrl + "get_group_accounting_received_payment_details",
  edit_customer_multi_payment: siteUrl + "edit_customer_multi_payment",
  get_group_accounting_multipayment_details: siteUrl + "get_group_accounting_multipayment_details",
  invoice_list: siteUrl + 'sales_invoice_list',
  estimate_list: siteUrl + 'estimate_list',
  sales_order_list: siteUrl + 'sales_order_list',
  credit_memo_list: siteUrl + 'credit_memo_list',
  purchase_order_list: siteUrl + 'purchase_order_list',
  vendor_bill_list: siteUrl + 'vendor_bill_list',

  save_credit_memo_as_pdf: siteUrl + 'save_credit_memo_as_pdf',
  save_estimate_as_pdf: siteUrl + 'save_estimate_as_pdf',
  save_purchase_order_as_pdf: siteUrl + 'save_purchase_order_as_pdf',
  save_sales_order_as_pdf: siteUrl + 'save_sales_order_as_pdf',

  get_sales_order_details: siteUrl + 'get_sales_order_details',
  get_estimate_details: siteUrl + 'get_estimate_details',
  get_purchase_order_details: siteUrl + 'get_purchase_order_details',
  vendor_credit_note_list: siteUrl + 'vendor_credit_note_list',
  all_account_list: siteUrl + 'all_account_list',
  all_transaction_type_list: siteUrl + 'all_transaction_type_list',
  job_name_list: siteUrl + 'job_name_list',

  next_estimate_number: siteUrl + 'next_estimate_number',
  next_sales_order_number: siteUrl + 'next_sales_order_number',
  next_purchase_order_number: siteUrl + 'next_purchase_order_number',
  save_customer_statement_as_pdf: siteUrl + 'save_customer_statement_as_pdf',
  save_vendor_statement_as_pdf: siteUrl + 'save_vendor_statement_as_pdf',
  save_job_statement_as_pdf: siteUrl + 'save_job_statement_as_pdf',
  add_new_employee_type: siteUrl + 'add_new_employee_type',
  add_new_employee_department: siteUrl + 'add_new_employee_department',
  add_new_employee_shift: siteUrl + 'add_new_employee_shift',
  add_new_employee_location: siteUrl + 'add_employee_office_location',
  add_new_employee_salary: siteUrl + 'add_employee_salary_type',
  add_new_employee_payment: siteUrl + 'add_employee_payment_method',
  add_new_employee_payroll_frequency: siteUrl + 'add_employee_payment_frequency',
  add_new_employee_variable_pay_frequency: siteUrl + 'add_employee_variable_pay_frequency',
  add_new_employee_variable_pay_type: siteUrl + 'add_employee_variable_pay_type',
  vendor_list_for_bill: siteUrl + 'vendor_list_for_bill',

  PreferredPaymentMethod: siteUrl + 'customer/preferredpayment/list',
  getVariabletPayrollFrequency: siteUrl + "employee_variable_pay_frequency",

  add_customer_rep: siteUrl + "customer/salesrep/create",
  change_attachment_to_void: siteUrl + "change_attachment_to_void",
  get_vendor_multipayment_details: siteUrl + "get_vendor_multipayment_details",
  edit_vendor_bill_payment: siteUrl + "edit_vendor_bill_payment",

  update_estimate: siteUrl + "update_estimate",
  update_salesorder: siteUrl + "update_salesorder",
  update_purchase_order: siteUrl + "update_purchase_order",

  verify_lock_date_password: siteUrl + "verify_lock_date_password",

  delete_or_void_estimate: siteUrl + "delete_or_void_estimate",
  delete_or_void_sales_order: siteUrl + 'delete_or_void_sales_order',
  delete_or_void_sales_invoice: siteUrl + 'delete_or_void_invoice',
  delete_or_void_credit_memo: siteUrl + 'delete_or_void_credit_memo',
  delete_or_void_purchase_order: siteUrl + 'delete_or_void_purchase_order',

  customer_apply_credit: siteUrl + 'customer_apply_credit',
  sales_default_due_date_terms: siteUrl + 'sales_default_due_date_terms',

  get_journal_details: siteUrl + 'get_journal_details',
  edit_manual_journal: siteUrl + 'edit_manual_journal',
  delete_or_inactive_account_name: siteUrl + 'delete_or_inactive_account_name',

  check_user_email: siteUrl + 'check_user_email',
  register_company_with_existing_user: siteUrl + 'register_company_with_existing_user',
  bank_statement_templates: siteUrl + 'bank_statement_templates/import_bank_statements.csv',

  customer_and_vendor_list_for_journal: siteUrl + 'app/findAndRecode/customer_and_vendor_list_for_journal',
  add_employee_with_name: siteUrl + 'add_employee_with_name',
  add_other_staff: siteUrl + 'add_other_staff',

  mark_notification_as_read: siteUrl + 'mark_notification_as_read',
  update_template_properties: siteUrl + 'update_template_properties',
  rename_invoice_template: siteUrl + 'rename_invoice_template',


  send_invoice_mail:siteUrl+'send_invoice_mail',
  sales_order_to_auto_invoice:siteUrl+'sales_order_to_auto_invoice',

  // exchange rate api key - takem from      exchangeratesapi.io
  api_key: '7c90834bf2b5239932d1012463e9da5d',
  // exchange rate api key - takem from      exchangeratesapi.io

};
export default config;

