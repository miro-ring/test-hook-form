import { useState } from "react";
import { useFormContext } from "react-hook-form";

import ChildComponent1 from "../components/ChildComponent1";
import ChildComponent2 from "../components/ChildComponent2";
import MainFormProvider, { useAppContext } from "./provider";

const MainComponent = () => {
  const { globalState } = useAppContext();
  const { formState, handleSubmit, getValues } = useFormContext();

  const onSubmit = (data) => {
    console.log(globalState);
    console.log(getValues());
    console.log(formState.errors);
    console.log(data);
  };

  const [message, setMessage] = useState("");

  const onSubmitWrapper = (e) => {
    e.preventDefault();

    // form 안의 여러 오류들을 복합적으로 처리해야하는 경우 이곳에서 관리한다.
    setMessage(formState.errors.toString());

    // 실제 제출 함수 실행
    handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={onSubmitWrapper}>
      <ChildComponent1 />
      <ChildComponent2 />
      <button type="submit">제출</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default function Main() {
  return (
    <MainFormProvider>
      <MainComponent />
    </MainFormProvider>
  );
}
