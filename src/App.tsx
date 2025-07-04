import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import useUserStore from "./store/user.store";
import Logo from "./assets/img/logo.png";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getUser, user, login, email, loading, logout } = useUserStore();
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    console.log(user);
  }, [user]);
  const handleLogin = (
    pin: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string | null>>
  ) => {
    console.log(pin);
    login(pin, email, setLoading, setError);
  };

  const handleLogout = () => {
    logout();
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#16222E] to-[#161A1D] flex items-center justify-center">
        <div className="text-center mb-4">
          <img src={Logo} alt="Logo" className=" mx-auto" />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
