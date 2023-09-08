import { useState, useCallback } from "react";

function ValidationForm() {
  const [errors, setErrors] = useState({});
  const [formValue, setFormValue] = useState("");
  const [ isValid, setIsValid ] = useState(false);
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;


  const handleChange = (e) => {
    const {name, value} = e.target;
    
    setFormValue({
      ...formValue,
      [name]: value,
    });

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setErrors({
          ...errors,
          [name]: "Некорректный email",
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    } else {
      setErrors({
        ...errors,
        [name]: e.target.validationMessage,
      });
    }

    setIsValid(e.target.closest('form').checkValidity());
  };
  
  
  return {handleChange, errors, formValue, setFormValue, setErrors, isValid, setIsValid }
}

export default ValidationForm;
