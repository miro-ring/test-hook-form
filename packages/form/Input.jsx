import { useFormContext, Controller } from "react-hook-form";

const Input = ({ name, defaultValue, validation }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={validation}
      render={({ field }) => (
        // form 컴포넌트는 최소 html로 유지
        <>
          <input {...field} />
          {/* {fieldState.error && <p>{fieldState.error.message}</p>} */}
        </>
      )}
    />
  );
};

export default Input;
