import React, {useEffect, useState} from "react";
import {validateConfirmPassword, validateEmail, validatePassword} from "../validation/validation";
import {RegisterFormData} from "../types/types";
import "./Form.css"
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {getCurrentUser, register} from "../AuthService";

const RegisterForm = () => {
  const navigate: NavigateFunction = useNavigate();
  
  const [formData, setFormData] = useState<RegisterFormData>({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [registerStatus, setRegisterStatus] = useState<string>("");

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
    setRegisterStatus("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    register(formData.email, formData.password).then(
      (response) => {
        if (response.status !== 200) {
          setRegisterStatus(response.data)
          return;
        }

        setRegisterStatus("success");
        navigate("/login");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setRegisterStatus(resMessage)
      }
    );
  };

  const validateFormData = (data: RegisterFormData) => {
    const errors: Partial<RegisterFormData> = {};
    if (!validateEmail(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!validatePassword(data.password)) {
      errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character";
    }
    if (!validateConfirmPassword(data.password, data.confirmPassword)) {
      errors.confirmPassword = "Passwords are not same";
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
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        {registerStatus !== "" && registerStatus !== "success" && <span className="error">{registerStatus}</span>}
        <button className="btn-submit" type="submit">Register</button>
      </form>
      <p>Already have an account? <Link className="link" to="/login">Login</Link></p>
    </div>
  );
};

export default RegisterForm;