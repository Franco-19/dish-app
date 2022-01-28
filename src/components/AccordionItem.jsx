import React from "react";

const AccordionItem = ({ children, name, parent }) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={`heading${ capitalizeFirstLetter(name) }`}>
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${ name }`}
                    aria-expanded="false"
                    aria-controls={name}
                >
                    {capitalizeFirstLetter(name)}
                </button>
            </h2>
            <div
                id={name}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${ capitalizeFirstLetter(name) }`}
                data-bs-parent={`#${ parent }`}
            >
                <div className="accordion-body">{children}</div>
            </div>
        </div>
    );
};

export default AccordionItem;
