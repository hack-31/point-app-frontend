import {
  temporarySignup,
  TemporarySignUpRequest,
} from "@/features/auth/signup";
import { ErrorType } from "@/types/Error";
import { useForm } from "react-hook-form";
import "../../App.css";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { FormPropsTextFields } from "@/components/TextInput";
import { MemberCard } from "@/components/MemberCard";
import { AuthCodeModal } from "@/components/AuthCodeModal";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      familyName: "",
      familyNameKana: "",
      firstName: "",
      firstNameKana: "",
      password: "",
    },
  });

  const [temporaryUserId, setTemporaryUserId] = useState<string>("");
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>({
    title: "",
    message: "",
  });

  // NOTE: mutationではsuspenseは対応していない
  // https://github.com/TanStack/query/discussions/967
  // NOTE: usequeryはisLoadingとerrorは不要
  const { mutate, isLoading } = useMutation(
    (data: TemporarySignUpRequest) => temporarySignup(data),
    {
      onSuccess: (res) => {
        console.log("レスポンス", res);
        setError({
          ...error,
          title: "",
          message: "",
        });
        setTemporaryUserId(res.temporaryUserId);
      },
      onError: (
        err: AxiosError<{ title: string; message: string }>,
        variables,
        context
      ) => {
        console.log("エラーメッセージ", err.message);
        setTemporaryUserId("");
        setError({
          ...error,
          title: err.response?.data.title || "",
          message: err.response?.data.message || "",
        });
      },
    }
  );

  const temporaryRegister = (data: TemporarySignUpRequest) => mutate(data);

  // コード認証による本登録処理
  // const { mutate, isLoading } = useMutation(
  //   (data: TemporarySignUpRequest) => temporarySignup(data),
  //   {
  //     onSuccess: (res) => {
  //       console.log("レスポンス", res);
  //       setError({
  //         ...error,
  //         title: "",
  //         message: "",
  //       });
  //       setTemporaryUserId(res.temporaryUserId);
  //     },
  //     onError: (
  //       err: AxiosError<{ title: string; message: string }>,
  //       variables,
  //       context
  //     ) => {
  //       console.log("エラーメッセージ", err.message);
  //       setTemporaryUserId("");
  //       setError({
  //         ...error,
  //         title: err.response?.data.title || "",
  //         message: err.response?.data.message || "",
  //       });
  //     },
  //   }
  // );

  // 仮登録後にダイアログ表示
  useEffect(() => {
    if (!temporaryUserId) {
      return;
    }
    setConfirmDialog(true);
  }, [temporaryUserId]);

  return (
    <div className="App">
      <Header title="360°評価システム" />
      <h2>アカウント新規登録</h2>
      <form onSubmit={handleSubmit(temporaryRegister)}>
        <div>メールアドレス</div>
        <div>
          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "必須項目です。" },
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "メールアドレスの形式にしてください",
              },
            })}
          />
          <div>{errors.email?.message}</div>
        </div>
        <div>姓（全角）</div>
        <div>
          <input
            {...register("familyName", {
              required: { value: true, message: "必須項目です。" },
            })}
          />
          <div>{errors.familyName?.message}</div>
        </div>
        <div>名（全角）</div>
        <div>
          <input
            {...register("familyNameKana", {
              required: { value: true, message: "必須項目です。" },
            })}
          />
          <div>{errors.familyNameKana?.message}</div>
        </div>
        <div>姓カナ（全角）</div>
        <div>
          <input
            {...register("firstName", {
              required: { value: true, message: "必須項目です。" },
            })}
          />
          <div>{errors.firstName?.message}</div>
        </div>
        <div>名カナ（全角）</div>
        <div>
          <input
            {...register("firstNameKana", {
              required: { value: true, message: "必須項目です。" },
            })}
          />
          <div>{errors.firstNameKana?.message}</div>
        </div>
        <div>
          <div>パスワード</div>
          {/* <FormPropsTextFields title="パスワード" /> */}
          <FormPropsTextFields
            placeholder="ぷれーすほるだー"
            id="password"
            value=""
          />
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "必須項目です。" },
            })}
          />
          <div>{errors.password?.message}</div>
        </div>
        <button type="submit">登録</button>
        {/* <Button title="登録" color="primary" size="large" /> */}
        {isLoading && <div>アカウント作成中</div>}
        {error.title && (
          <div>
            <div>{error.title}</div>
            <div>{error.message}</div>
          </div>
        )}
      </form>
      <AuthCodeModal
        open={confirmDialog}
        handleAuth={() => false}
      ></AuthCodeModal>
    </div>
  );
};
