import { useState } from "react";
import { ServerResponse, ShopFormData, ShopFormValidationError } from "./types/types";
import { validateShopFormData } from "./validation/validation";
import "./ShopForm.css"
import axios from "axios";
import { authHeader } from "../auth/AuthService";
import { useNavigate, NavigateFunction } from "react-router";

const API_URL: string = import.meta.env.VITE_API_URL;

const ShopForm = () => {  
    const [formData, setFormData] = useState<ShopFormData>({ name: "", latitude: 0, longitude: 0, address: "" });
    const [formError, setFormError] = useState<Partial<ShopFormValidationError>>({});
    const [response, setResponse] = useState<ServerResponse | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    let navigate: NavigateFunction = useNavigate();
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      
      const validationErrors = validateShopFormData(formData);
      if (Object.keys(validationErrors).length > 0) {
        setFormError(validationErrors);

        return;
      }
  
      axios.post(API_URL + "shops", formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": authHeader(),
        }
      }).then((response) => {
        if (response.status === 200) {
          setResponse({status: response.status, message: "Shop added successfully!"});
        } else {
          setResponse({status: response.status, message: response.data.message});
        }
      }).catch((error) => {
        setResponse({status: error.response.status, message: error.response.data.message});
      }).finally(() => {
        setShowPopup(true);
        setFormData({ name: "", latitude: 0, longitude: 0, address: ""});
      });
    };
  
    const handleGoHome = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      clear();
      navigate("/");
    }

    const handleAddAnotherShop = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      clear();
    };

    const clear = () => {
      setShowPopup(false);
      setFormError({});
      setResponse(null);
      setFormData({ name: "", latitude: 0, longitude: 0, address: ""});
    }

    return (
        (showPopup && response) ? 
          (
            <div className="md:col-span-4 p-10 popUp-container">
              <p className="message">{response.message}</p>
              <button className="btn-home" onClick={handleGoHome}>Go home</button>
              <button className="btn-addanother" onClick={handleAddAnotherShop}>Add another shop</button>
            </div>
          ): 
          ( 
            <div className="md:col-span-4 p-10 form-container">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-input">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} placeholder="Kaufland" onChange={handleInputChange} required />
                  {formError.name && <span className="error">{formError.name}</span>}
                </div>
    
                <div className="form-input">
                  <label htmlFor="latitude">Latitude</label>
                  <input type="number" id="latitude" name="latitude" value={formData.latitude} onChange={handleInputChange} required />
                  {formError.latitude && <span className="error">{formError.latitude}</span>}
                </div>
    
                <div className="form-input">
                  <label htmlFor="longitude">Longitude</label>
                  <input type="number" id="longitude" name="longitude" value={formData.longitude} onChange={handleInputChange} required />
                  {formError.longitude && <span className="error">{formError.longitude}</span>}
                </div>
    
                <div className="form-input">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" name="address" value={formData.address} placeholder="Bratysławska 4" onChange={handleInputChange} required />
                  {formError.address && <span className="error">{formError.address}</span>}
                </div>
    
                <div className="btn-submit-container">
                  <button className="btn-submit" type="submit">Add new shop</button>
                </div>
              </form>
            </div>
          )
    );
};

export default ShopForm;
