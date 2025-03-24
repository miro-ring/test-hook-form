import { Input } from "@hook-form-test/form";
import { REGISTER_NAME } from "./registerName";

// 이 컴포넌트의 단위는 에러 처리의 단위라고도 볼 수 있다.
// 만약에 A, B 컴포넌트 2개에 대한 에러를 함께 처리해야한다면 하나의 컴포넌트로 묶는 것이 좋다.
const ChildComponent2 = () => {
  const registerName = REGISTER_NAME.secondChild;

  // 이 컴포넌트만의 기본값과 유효성 검사 규칙
  const defaultValue = "기본값1";
  const validation = {
    required: `${registerName} 이 필드는 필수입니다`,
    minLength: {
      value: 3,
      message: `${registerName} 최소 3글자 이상이어야 합니다`,
    },
  };

  return (
    <div>
      <span>미로의 두번째 Input</span>
      <Input
        name={registerName}
        defaultValue={defaultValue}
        validation={validation}
      />
    </div>
  );
};

export default ChildComponent2;
