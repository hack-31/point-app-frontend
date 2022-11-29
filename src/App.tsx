import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", email: "", password: "" } });

  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  // NOTE: mutationではsuspenseは対応していない
  // https://github.com/TanStack/query/discussions/967
  // NOTE: usequeryはisLoadingとerrorhは不要
  const { mutate, isLoading } = useMutation(
    (data: { name: string; email: string; password: string }) =>
      axios.post<{ id: string }>("/register", data),
    {
      onSuccess: (res) => {
        setError("");
        setUserId(res.data.id);
      },
      onError: (error: AxiosError<{ message: string }>, variables, context) => {
        setUserId("");
        setError(error.response?.data.message || "");
      },
    }
  );

  return (
    <div className="App">
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <div>名前</div>
        <div>
          <input
            {...register("name", {
              required: { value: true, message: "必須項目です。" },
            })}
          />
          <div>{errors.name?.message}</div>
        </div>
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
        <div>
          <div>パスワード</div>
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "必須項目です。" },
            })}
          />
          <div>{errors.password?.message}</div>
        </div>
        <button type="submit">登録</button>
        {isLoading && <div>アカウント作成中</div>}
        {userId && <div>登録したユーザIDは{userId}です。</div>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default App;
