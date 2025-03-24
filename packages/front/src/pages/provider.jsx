import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState, createContext, useContext } from "react";

// 커스텀 전역 상태를 위한 Context 생성
const AppContext = createContext(null);

// 커스텀 Context Hook 생성
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "useAppContext는 AppContextProvider 내부에서만 사용할 수 있습니다"
    );
  }
  return context;
};

// 통합된 Provider 컴포넌트 생성
const MainFormProvider = ({ children }) => {
  // 전역으로 관리할 상태들
  const [globalState, setGlobalState] = useState({
    theme: "light",
    language: "ko",
    // 필요한 다른 상태들...
  });

  // 최상위 폼은 빈 객체로 시작
  // mode 미사용시 검증은 onSubmit시에만 진행, 한번 제출된 이후에는 입력값이 변경될 때마다 검증이 진행된다.
  const methods = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  // Context에 제공할 값
  const contextValue = {
    globalState,
    setGlobalState,
    // 필요한 액션이나 다른 값들 추가 가능
    updateTheme: (theme) => setGlobalState((prev) => ({ ...prev, theme })),
    updateLanguage: (language) =>
      setGlobalState((prev) => ({ ...prev, language })),
  };

  return (
    <AppContext.Provider value={contextValue}>
      <FormProvider {...methods}>{children}</FormProvider>
      <DevTool control={methods.control} />
    </AppContext.Provider>
  );
};

export default MainFormProvider;
