import React from "react";

const TextArea = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <textarea id={props.name} name={props.name} className="form-control"
                      rows={props.rows}
                      onChange={props.handleChange}
                      placeholder={props.placeholder}
                      value={props.value}/>
        </div>
    )
}

export default TextArea;
