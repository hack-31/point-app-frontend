import { toast } from "react-toastify";

/**
 * react-toasifyの初期設定を行う
 */
export namespace snackbar {
  export const success = (message: string | undefined) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
    });
  export const error = (message: string | undefined) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 10000,
    });
}
