import React from "react";

export default function FloatCustomInput({
    id,
    value,
    type = "text",
    placeholder = "",
    labelContent = "label",
    inputClass = "",
    inputContainerClass = "",
    onChange = "",
    onBlur = "",
    validation = null,
}) {
    return (
        <div className={"form-floating mb-3 row " + inputContainerClass}>
            <input
                type={type}
                className={"form-control " + inputClass}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={id}
            />
            <label htmlFor={id}>{labelContent}</label>
            {validation}
        </div>
    );
}
