import React, { useState } from "react";

type InputItemProps = {
  label: string;
  inputId: string;
  type: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// 정규식
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const InputItem = ({
  label,
  inputId,
  type,
  value,
  placeholder,
  className,
  onChange,
}: InputItemProps) => {
  // state
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (type === "email") {
      if (val === "") {
        setIsValid(true);
      } else {
        setIsValid(emailRegEx.test(val));
      }
    }

    if (onChange) {
      onChange(e);
    }
  };

  const borderColorClass =
    type === "email" && value !== ""
      ? isValid
        ? "border-[#00C300]"
        : "border-[#FF6633]"
      : "border-white";

  return (
    <div className={`relative mx-auto w-full max-w-[500px] ${className}`}>
      <label
        htmlFor={inputId}
        className="font-bold tracking-[-0.24px] text-white"
      >
        {label}
      </label>
      <div
        className={`${borderColorClass} relative mt-4 flex justify-between gap-2 rounded-[7px] border bg-[#ffffff19]`}
      >
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          className={`w-full p-4 pr-11 tracking-[-0.24px] text-white outline-0`}
        />
        {type === "email" && (
          <button
            type="button"
            className="absolute top-1/2 right-[10px] w-8 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              if (value === "") {
                alert("Please enter your email");
              } else if (!isValid) {
                alert("Please enter a valid email");
              } else {
                alert("Complete!");
              }
            }}
          >
            <img src="./icon_plane.png" alt="전송 아이콘" className="block" />
            <span className="sr-only">전송</span>
          </button>
        )}
      </div>
      {type === "email" && value !== "" && !isValid && (
        <p className="absolute top-[calc(100%+8px)] left-4 text-left text-[#FF6633]">
          Please enter a valid email!
        </p>
      )}
    </div>
  );
};

export default InputItem;
