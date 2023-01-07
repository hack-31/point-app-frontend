// 共通
export const ERR_REQUIRE_MESSAGE = "必須項目です。";

// メールアドレス
export const ERR_MAIL_FORMAT_MESSAGE = "メール形式にしてください。";
export const MAIL_FORMAT_REGEXP =
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
export const MAX_MAIL_LENGTH = {
  VALUE: 256,
  MESSAGE: "256文字以下で入力してください。",
};

// パスワード
export const MAX_PASSWORD_LENGTH = {
  VALUE: 50,
  MESSAGE: "50文字以下で入力してください。",
};
export const MIN_PASSWORD_LENGTH = {
  VALUE: 8,
  MESSAGE: "8文字以上で入力してください。",
};
