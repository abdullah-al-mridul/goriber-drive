import React, { useRef, useState } from "react";
import Logo from "../assets/img/logo.png";
import { CircleUser } from "lucide-react";
interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [pin, setPin] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Optional: auto-submit when all filled
    if (newPin.every((digit) => digit !== "")) {
      setTimeout(() => {
        onLogin();
      }, 300);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16222E] to-[#161A1D] flex items-center justify-center">
      <div className="w-full max-w-xs text-center">
        {/* Logo */}
        <div className="text-center mb-4">
          <img src={Logo} alt="Logo" className=" mx-auto" />
        </div>
        {/* Heading */}
        <h2 className="text-white text-2xl font-semibold mb-1">
          Unlock Goriber Drive
        </h2>
        <p className="text-gray-400 text-lg mt-2 mb-4">Enter your PIN code</p>
        {/* Email Display */}
        <div className="flex items-center justify-center gap-2 mb-6 text-gray-500 text-md">
          <span className="text-gray-500">
            <CircleUser />
          </span>
          <span>rim89987@proton.me</span>
        </div>
        {/* PIN Input */}
        <div className="flex justify-between gap-4 mb-6 px-2 w-max mx-auto">
          {pin.map((digit, i) => (
            <input
              key={i}
              type="password"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-10 h-12 rounded-md bg-[rgb(100,116,139)]/25 focus:blur-0 blur-sm focus:scale-110 text-white text-center text-xl outline-none  transition-all"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
