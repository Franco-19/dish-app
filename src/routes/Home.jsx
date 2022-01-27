// Libraries
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import Dish from "../components/Dish";
import { UserSessionContext } from "../components/UserSessionContext";
import { DishesContext } from "../components/DishesContext";
import Gridlayout from "../components/GridLayout";
import AppLayout from "../components/AppLayout";
import Card from "../components/Card";

export default function Home() {
    let navigate = useNavigate();

    const [totalHealthScore, setTotalHealthScore] = useState(0);
    const [totalPreparationMinutes, setTotalPreparationMinutes] = useState(0);
    const [totalReadyInMinutes, setTotalReadyInMinutes] = useState(0);
    const [totalPrice, setTotalPrice] = useState([]);

    const { isLogged } = useContext(UserSessionContext);
    const { menuItems, deleteDish } = useContext(DishesContext);

    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    });

    useEffect(() => {
        getAllStats();
    }, [menuItems]);

    const getAllStats = () => {
        if (menuItems.length !== 0) {
            let priceSummation = 0;
            let healthScoreSummation = 0;
            let readyInMinutesSummation = 0;
            let preparationMinutesSummation = 0;

            menuItems.forEach(
                ({
                    healthScore,
                    preparationMinutes,
                    readyInMinutes,
                    pricePerServing,
                }) => {
                    priceSummation += pricePerServing;
                    healthScoreSummation += healthScore;
                    preparationMinutesSummation += preparationMinutes;
                    readyInMinutesSummation += readyInMinutes;
                }
            );
            setTotalPrice(priceSummation);
            setTotalHealthScore(healthScoreSummation);
            setTotalPreparationMinutes(preparationMinutesSummation);
            setTotalReadyInMinutes(readyInMinutesSummation);
        } else {
            setTotalHealthScore(0);
            setTotalPreparationMinutes(0);
            setTotalReadyInMinutes(0);
            setTotalPrice(0);
        }
    };

    const RenderItems = () => {
        if (menuItems.length !== 0) {
            return (
                <Gridlayout>
                    {menuItems.map(
                        ({
                            id,
                            title,
                            image,
                            servings,
                            restaurantChain,
                            pricePerServing,
                            vegan,
                            vegetarian,
                            nutrition
                        }) => {
                            return (
                                <Dish
                                    title={title}
                                    image={image}
                                    servings={servings}
                                    restaurantChain={restaurantChain}
                                    key={id}
                                    deleteButton={true}
                                    deleteDish={() => deleteDish(id)}
                                    detailsButton={true}
                                    price={pricePerServing}
                                    vegan={vegan}
                                    vegetarian={vegetarian}
                                    id={id}
                                    nutrition={nutrition}
                                />
                            );
                        }
                    )}
                </Gridlayout>
            );
        }

        return (
            <div className="container">
                <p className="text-center">
                    No tienes ningún menú creado actualmente.
                    <br />
                    <Link to="/search">Comienza creando uno ahora</Link>
                </p>
            </div>
        );
    };
    return (
        <AppLayout>
            {/* Stats */}
            <div className="row mb-3">
                <div className="col-6">
                    <Card>
                        <h5>Nutritional information</h5>
                        <p>
                            <span className="text-decoration-underline">
                                Health Score
                            </span>
                            : {totalHealthScore}
                        </p>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <h5>Menu information</h5>
                        <p>
                            <span className="text-decoration-underline">
                                Preparation time
                            </span>
                            : {totalPreparationMinutes} minutes
                        </p>
                        <p>
                            <span className="text-decoration-underline">
                                Ready in
                            </span>
                            : {totalReadyInMinutes} minutes
                        </p>
                        <p>
                            <span className="text-decoration-underline">
                                Price
                            </span>
                            : {totalPrice}
                        </p>
                    </Card>
                </div>
            </div>

            {/* Items */}
            <RenderItems />
        </AppLayout>
    );
}
