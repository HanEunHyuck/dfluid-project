import React, { useState } from "react";

type InputItemProps = {
  label: string;
  inputId: string;
  type: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputItem = ({
  label,
  inputId,
  type,
  value,
  placeholder,
  className,
  onChange,
  onKeyDown,
}: InputItemProps) => {
  const [isValid, setIsValid] = useState(true);

  const emailRegEx =
    /^[A-Za-z0-9]([-.]?[A-Za-z0-9])*@[A-Za-z0-9]([-.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

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

  const borderColor =
    type === "email" && value !== ""
      ? isValid
        ? "#00C300"
        : "#FF6633"
      : "#FFFFFF";

  return (
    <div className={`relative mx-auto w-full max-w-[500px] ${className}`}>
      <label
        htmlFor={inputId}
        className="font-bold tracking-[-0.24px] text-white"
      >
        {label}
      </label>
      <div
        className="relative mt-4 flex justify-between gap-2 rounded-[7px] border bg-[#ffffff19]"
        style={{ borderColor }}
      >
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className={`w-full p-4 pr-11 tracking-[-0.24px] text-white outline-0`}
        />
        <button
          type="button"
          className="absolute top-1/2 right-[10px] w-8 -translate-y-1/2"
        >
          <img src="./icon_plane.png" alt="" className="block" />
        </button>
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
