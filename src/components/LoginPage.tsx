import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Logo from "../assets/img/logo.png";
import { CircleUser } from "lucide-react";
import useUserStore from "../store/user.store";
interface LoginPageProps {
  onLogin: (
    pin: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string | null>>
  ) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [pin, setPin] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { email } = useUserStore();
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < pin.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      setTimeout(() => {
        setPin(Array(4).fill(""));
        onLogin(newPin.join(""), setLoading, setError);
      }, 300);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newPin = [...pin];
      if (pin[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          newPin[index - 1] = "";
          setPin(newPin);
        }
      } else {
        newPin[index] = "";
        setPin(newPin);
      }
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
          <span>{email}</span>
        </div>
        {/* PIN Input */}
        {loading ? (
          <div className="text-gray-500 flex gap-2 items-center justify-center">
            <div className="h-4 w-4 border border-t-transparent border-gray-500 rounded-full animate-spin"></div>
            Validating your access...
          </div>
        ) : (
          <>
            {!error && (
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
                    autoFocus={i === 0}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-10 h-12 rounded-md bg-[rgb(100,116,139)]/25 focus:blur-0 blur-sm focus:scale-110 text-white text-center text-xl outline-none  transition-all"
                  />
                ))}
              </div>
            )}
          </>
        )}
        {error && (
          <p className="text-red-500 text-sm mb-4">
            <p>{error}</p>
            <p
              onClick={() => setError(null)}
              className=" text-gray-500 hover:underline cursor-pointer"
            >
              Retry?
            </p>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
