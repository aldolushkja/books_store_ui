import React from "react";

const Select = (props) => {

    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <select className="form-select"
                    value={props.value}
                    name={props.name}
                    onChange={props.handleChange}>
                <option className="form-select" value="">{props.placeholder}</option>

                {props.mpaaOptions.map((m, index) => (
                    <option key={index} className="form-select" value={m.id}>{m.value}</option>
                ))}
            </select>
        </div>
    )
}

export default Select;
