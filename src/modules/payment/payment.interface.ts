export interface SSLCommerzSuccessPayload {
  status: string;
  tran_id: string;
  val_id: string;
  amount: string;
  currency: string;

  bank_tran_id?: string;
  card_type?: string;

  value_a?: string;
  value_b?: string;
  value_c?: string;
  value_d?: string;
}

export interface SSLCommerzValidationData {
  tran_id: string;
  val_id: string;
  amount: string;

  card_type: string;
  store_amount: string;
  card_no: string;
  bank_tran_id: string;

  status: string;
  tran_date: string;
  error: string;

  currency: string;
  currency_type: string;
  currency_amount: string;
  currency_rate: string;

  card_issuer: string;
  card_brand: string;
  card_sub_brand: string;
  card_issuer_country: string;
  card_issuer_country_code: string;

  store_id: string;

  verify_sign: string;
  verify_key: string;
  verify_sign_sha2: string;

  base_fair: string;

  value_a: string;
  value_b: string;
  value_c: string;
  value_d: string;

  subscription_id: string;

  risk_level: string;
  risk_title: string;
}

export interface SSLCommerzPaymentFailResponse {
  tran_id: string;
  error: string;
  status: "VALID" | "VALIDATED" | "FAILED" | "CANCELLED";
  bank_tran_id: string;
  currency: string;
  tran_date: string;
  amount: string;
  store_id: string;
  card_type: string;
  card_no: string;
  card_issuer: string;
  card_brand: string;
  card_sub_brand: string;
  card_issuer_country: string;
  card_issuer_country_code: string;
  subscription_id: string;
  currency_type: string;
  currency_amount: string;
  currency_rate: string;
  base_fair: string;
  value_a: string;
  value_b: string;
  value_c: string;
  value_d: string;
  verify_sign: string;
  verify_sign_sha2: string;
  verify_key: string;
}
