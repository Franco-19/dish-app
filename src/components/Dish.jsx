import React from "react";
import Button from "./Button";

const Dish = ({
    title,
    image,
    restaurantChain,
    servingSize,
    servingUnit,
    servingNumber,
}) => {
    return (
        <div className="col">
            <div className="card mb-3">
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-tex fw-light">
                        Restaurant Chain: {restaurantChain}
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <p className="card-tex fw-light">
                                Servings: {servingNumber}
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="card-tex fw-light">
                                Size: {servingSize} {servingUnit}
                            </p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button text="Details" addClass="mx-1" />
                        <Button text="Delete" desing="danger" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dish;
