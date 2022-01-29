import React, { useState } from "react";
import Button from "./Button";

import Modal from "./Modal";

const Dish = ({
    id,
    title,
    image,
    restaurantChain,
    servings,
    deleteButton = false,
    addButton = false,
    detailsButton = false,
    addDish = null,
    deleteDish = null,
    price,
    vegan = false,
    vegetarian = false,
    nutrition = null,
    successState = false,
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

                    {vegan || vegetarian ? (
                        <div className="row">
                            {vegan ? (
                                <div className="col-6">
                                    <p className="card-tex fw-light">
                                        <span className="fw-normal text-decoration-underline">
                                            Vegan
                                        </span>
                                    </p>
                                </div>
                            ) : null}
                            {vegetarian ? (
                                <div className="col-6">
                                    <p className="card-tex fw-light">
                                        <span className="fw-normal text-decoration-underline">
                                            Vegetarian
                                        </span>
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    ) : null}

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
                    {price ? (
                        <p className="card-tex fw-light">
                            <span className="fw-normal text-decoration-underline">
                                Price:
                            </span>{" "}
                            {price ? price : "N/D"}
                        </p>
                    ) : null}

                    <div className="d-flex justify-content-end">
                        {addButton ? (
                            <Button
                                text="Add"
                                addClass="me-1"
                                onClick={() => {
                                    addDish();
                                    setSuccess(true);
                                    setTimeout(() => setSuccess(false), 3000);
                                }}
                                successText="Added"
                                success={success}
                            />
                        ) : null}
                        {detailsButton ? (
                            <Button
                                type="button"
                                text="Details"
                                addClass="me-1"
                                dataBsToggle="modal"
                                dataBsTarget={`#detailsModal${id}`}
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

            {detailsButton ? (
                <Modal
                    modalTargetId={`detailsModal${id}`}
                    nutritionData={nutrition}
                />
            ) : null}
        </div>
    );
};

export default Dish;
