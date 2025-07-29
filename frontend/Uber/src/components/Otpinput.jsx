import React, { useRef } from "react";

const OTPInput = ({ length = 4, onChange }) => {
  const otpRefs = useRef([]);
  const [otp, setOtp] = React.useState(Array(length).fill(""));

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    onChange(updatedOtp.join(""));

    if (value && index < length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow"
          value={digit}
          onChange={(e) => handleOTPChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (otpRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OTPInput;