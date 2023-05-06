import {useState} from "react";
import {ProductFormData, ServerResponse} from "./types/types";
import {validateFormData} from "./validation/validation";
import axios from "axios";
import {authHeader} from "../auth/AuthService";
import {NavigateFunction, useNavigate} from "react-router";
import "./ProductForm.css"

const API_URL: string = import.meta.env.VITE_API_URL;

const ProductForm = () => {  
    const [formData, setFormData] = useState<ProductFormData>({ name: "", description: "" });
    const [formError, setFormError] = useState<Partial<ProductFormData>>({});
    const [response, setResponse] = useState<ServerResponse | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const navigate: NavigateFunction = useNavigate();
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setFormError({});
      setResponse(null);
      
      const validationErrors = validateFormData(formData);
      if (Object.keys(validationErrors).length > 0) {
        setFormError(validationErrors);

        return;
      }
  
      axios.post(API_URL + "/products", formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": authHeader(),
        }
      }).then((response) => {
        if (response.status === 200) {
          setResponse({status: response.status, message: "Product added successfully!"});
        } else {
          setResponse({status: response.status, message: response.data.message});
        }
      }).catch((error) => {
        setResponse({status: error.response.status, message: error.response.data.message});
      }).finally (() => {
        setShowPopup(true);
        setFormData({ name: "", description: "" });
      });
    };
  
    const handleGoHome = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      clear();
      navigate("/");
    }

    const handleAddAnotherProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      clear();
    };

    const clear = () => {
      setShowPopup(false);
      setFormError({});
      setResponse(null);
      setFormData({ name: "", description: "" });
    }

    return (
        (showPopup && response) ? 
          (
            <div className="md:col-span-4 p-10 popUp-container">
              <p className="message">{response.message}</p>
              <button className="btn-home" onClick={handleGoHome}>Go home</button>
              <button className="btn-addanother" onClick={handleAddAnotherProduct}>Add another product</button>
            </div>
          ): 
          ( 
            <div className="md:col-span-4 p-10 form-container">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-input">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  {formError.name && <span className="error">{formError.name}</span>}
                </div>
                  
                <div className="form-input">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" name="description" rows={5} cols={50} value={formData.description} onChange={handleTextAreaChange} required />
                  {formError.description && <span className="error">{formError.description}</span>}
                </div>
                  
                <div className="btn-submit-container">
                  <button className="btn-submit" type="submit">Add new product</button>
                </div>
              </form>
            </div>
          )
    );
};

export default ProductForm;
