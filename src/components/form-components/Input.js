import React from "react";

const Input = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <input id={props.name}
                   name={props.name}
                   type={props.type}
                   className={`form-control ${props.className}`}
                   onChange={props.handleChange}
                   placeholder={props.placeholder}
                   value={props.value}
            />
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    )
}

export default Input;
