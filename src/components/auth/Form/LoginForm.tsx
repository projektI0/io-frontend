import React, { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../validation/validation";
import { LoginFormData } from "../types/types";
import "./Form.css"
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { getCurrentUser, login } from "../AuthService";

const LoginForm = () => {
  let navigate: NavigateFunction = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [loginStatus, setLoginStatus] = useState<string>("");

  useEffect(() => {
    if(getCurrentUser()) {
      navigate("/");
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: undefined,
    }));
    setLoginStatus("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    login(formData.email, formData.password).then(
      (response) => {
        if (response.status !== 200) {
          setLoginStatus(response.data)
          return;
        }

        setLoginStatus("success");
        navigate("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoginStatus(resMessage);
      }
    );
  };

  const validateFormData = (data: LoginFormData) => {
    const errors: Partial<LoginFormData> = {};
    if (!validateEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  return (
    <div className="form-container md:col-span-3">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
            {errors.password && <span className="error">{errors.password}</span>}
            {loginStatus !== "" && loginStatus !== "success" && <span className="error">{loginStatus}</span>}
            <button className="btn-submit" type="submit">Log in</button>
        </form>
        <p className="message">Not yet a member? <Link className="link" to="/register">Create an account</Link></p>
    </div>
  );
};

export default LoginForm;