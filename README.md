### 참고자료

https://www.reddit.com/r/reactjs/comments/14f3gcn/what_is_the_best_approach_to_setting_up_large/

[Multi-Step Form 발표 자료](https://www.linkedin.com/posts/pumpkiinbell_frontend-diving-club-%ED%94%84%EB%8B%A4%ED%81%B4-%EC%97%AC%EC%84%AF%EB%B2%88%EC%A7%B8-%EB%AA%A8%EC%9E%84-%EC%B0%B8%EA%B0%80-%EC%8B%A0%EC%B2%AD-activity-7294220795071905792-LoHm/)

---

### 무엇이 문제인가?

_react-hook-form is pretty solid. It’s simple and reduces boilerplate code big time. We’ve been using it in conjunction with zod and it’s worked out really nicely. It does couple your forms editors to their top level state type so they can’t be reused, but overall it’s still a really powerful library._ (레딧의 첫번째 댓글)

```typescript
export type RegisterFormData = {
  [REGISTER_NAME.BUSINESS_ID]: string;
  [REGISTER_NAME.BUSINESS_NUMBER]: string;
  [REGISTER_NAME.SVC_NAME]: string;
  // ...
};

const Register = () => {
  const methods = useForm<RegisterFormData>({
    defaultValues: {
      [REGISTER_NAME.BUSINESS_NUMBER]: '', // 조합된 사업자등록번호 ex) 000-00-00000
      [REGISTER_NAME.BUSINESS_ID]: '', // 사업자등록번호 ID
      [REGISTER_NAME.SVC_NAME]: '', // 입력한 기관명
      // ...
    }
  });

  const {formState, getValues, handleSubmit} = methods;
  const {dirtyFields, defaultValues} = formState;

  const onSubmit = async (data: RegisterFormData) => {
    // 조건부 param 추가...
    // 조건부 에러 처리...
    // 이것 저것 들어가면 수십줄
  };
```

최상위 컴포넌트에서 모든 상태 타입이 정의되고 결합된다. 이로 인해 세부 컴포넌트들은 재사용할 수 없는 상태가 된다.

Top-Down 형태로 폼을 구성하고 사용했기 때문에 이러한 문제가 발생한다. 하위 컴포넌트들은 입력에 대한 처리만을 담당하고 자신의 defaultValue 설정, 에러 처리 등은 모두 최상위 컴포넌트에 위임한다.

최상위 컴포넌트가 가진 책임을 하위 컴포넌트에 분산시킬 필요가 있다. 이를 위해 form 컴포넌트들을 별도 repo로 구성한다. 또한 `Controller`를 사용하여 외부에서 해당 컴포넌트에 대한 모든 설정을 처리할 수 있도록 한다.

최상위 컴포넌트에서는 빈 객체로 form을 초기화하고, 이 안의 내용들은 form 컴포넌트를 활용한 하위 컴포넌트가 채우도록 한다.

하위 컴포넌트가 자신의 defaultValue, 에러 설정 등을 자체적으로 처리할 수 있도록 하여 bottom-up 형태의 폼 구성이 되도록 한다.

form의 요소는 아니지만 전역으로 관리되어야 편리한 상태들을 처리하기 위한 별도의 provider를 구성하고 적용한다.

---

### 고려하지 않은 요소들

- `useFormContext`에 의한 any 타입은 고려하지 않음
- `Context`에 의한 리렌더 문제는 고려하지 않음
