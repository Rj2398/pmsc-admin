import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Loader } from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const { salesAdminLogin, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 1. Added only this state for logic
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {

      if(!formData.password?.trim() && !formData.email?.trim()){
      toast.error("Please enter your email and password");
      return false;
    }
    if (!formData.email?.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.password?.trim()) {
      toast.error("Please enter your password");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await salesAdminLogin({
          email: formData.email,
          password: formData.password,
        });

        if (response) {
          navigate("/dashboard");
          toast.success("Login Successful");
        }
      } catch (error) {
        toast.success(error);
      }
    }
  };
  return (
    <>
      <Loader size="lg" overlay visible={isLoading} />
      <section className="vh-100">
        {/* <!-- MAIN --> */}
        <main className="h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-lg-4">
              <div className="personal-info">
                <h2>Sales Admin Panel</h2>
                <p>Login to manage your clients</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="name">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      value={formData?.email}
                      onChange={handleChange}
                      placeholder="Enter Your E-mail ID"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label for="name">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData?.password}
                      onChange={handleChange}
                      placeholder="Enter Your Password"
                      className="password"
                      disabled={isLoading}
                    />

                    {/* 3. Logic added to your existing div structure */}
                    <div
                      className="password-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <div
                        className={`eye ${
                          showPassword ? "eye-open" : "eye-close"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Login" className="w-100" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        {/* <!-- MAIN --> */}
      </section>
    </>
  );
}

export default Login;
