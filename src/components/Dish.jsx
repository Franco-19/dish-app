import React, { useState } from "react";
import Button from "./Button";

const Dish = ({
    title,
    image,
    restaurantChain,
    servings,
    deleteButton = false,
    addButton = false,
    addDish = null,
    deleteDish = null,
}) => {
    const [success, setSuccess] = useState(false);

    return (
        <div className="col">
            <div className="card mb-3">
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-tex fw-light">
                        <span className="fw-normal text-decoration-underline">
                            Restaurant Chain:
                        </span>{" "}
                        {restaurantChain ? restaurantChain : "N/D"}
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <p className="card-tex fw-light">
                                <span className="fw-normal text-decoration-underline">
                                    Servings:
                                </span>{" "}
                                {servings.number ? servings.number : "N/D"}
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="card-tex fw-light">
                                <span className="fw-normal text-decoration-underline">
                                    Size:
                                </span>{" "}
                                {servings.size ? servings.size : ""}{" "}
                                {servings.unit ? servings.unit : "N/D"}
                            </p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        {addButton ? (
                            <Button
                                text="Add"
                                addClass="me-1"
                                onClick={() => {
                                    addDish()
                                    setSuccess(true);
                                    setTimeout(setSuccess(false), 2000)
                                }}
                                successText="Added"
                                success={success}
                            />
                        ) : null}
                        {/* <Button text="Details" addClass="me-1" /> */}
                        {deleteButton ? (
                            <Button
                                text="Delete"
                                desing="danger"
                                onClick={deleteDish}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dish;
