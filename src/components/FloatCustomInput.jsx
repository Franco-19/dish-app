import React from "react";

export default function FloatCustomInput({
    type = 'text',
    id,
    placeholder = "",
    labelContent = 'label',
    inputClass = "",
    inputContainerClass = "",
}) {
    return (
        <div className={"form-floating mb-3 " + inputContainerClass}>
            <input
                type={type}
                className={"form-control " + inputClass}
                id={id}
                placeholder={placeholder}
            />
            <label for={id}>{labelContent}</label>
        </div>
    );
}
