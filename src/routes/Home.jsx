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
import KeyValueTitle from "../components/KeyValueTitle";

export default function Home() {
    let navigate = useNavigate();

    const [totalHealthScore, setTotalHealthScore] = useState(0);
    const [totalPreparationMinutes, setTotalPreparationMinutes] = useState(0);
    const [totalReadyInMinutes, setTotalReadyInMinutes] = useState(0);
    const [totalPrice, setTotalPrice] = useState([]);

    const { isLogged } = useContext(UserSessionContext);
    const { menuItems, deleteDish, veganItemCounter ,nonVeganItemCounter } = useContext(DishesContext);

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
                    healthScore = null,
                    preparationMinutes = null,
                    readyInMinutes = null,
                    pricePerServing = null,
                }) => {
                    if (
                        pricePerServing !== null ||
                        healthScore !== null ||
                        preparationMinutes !== null ||
                        readyInMinutes !== null
                    )
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
                            nutrition,
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
                    You don't have any menu currently created.
                    <br />
                    <Link to="/search">Start by creating one</Link>
                </p>
            </div>
        );
    };
    return (
        <AppLayout>
            {/* Stats */}
            <div className="row row-cols-1 row-cols-lg-2 mb-3">
                <div className="col-lg-3 mb-3">
                    <Card>
                        <h5>Menu information</h5>
                        <KeyValueTitle
                            keyName={"Preparation time"}
                            value={totalPreparationMinutes}
                            unit="minutes"
                        />
                        <KeyValueTitle
                            keyName={"Ready in"}
                            value={totalReadyInMinutes}
                            unit="minutes"
                        />
                        <KeyValueTitle keyName={"Price"} value={totalPrice} />
                        <KeyValueTitle
                            keyName={"Health Score"}
                            value={totalHealthScore}
                        />
                        <KeyValueTitle
                            keyName={"Vegan Items"}
                            value={veganItemCounter}
                        />
                        <KeyValueTitle
                            keyName={"Non Vegan items"}
                            value={nonVeganItemCounter}
                        />
                    </Card>
                </div>
                <div className="col-lg-9">
                    <RenderItems />
                </div>
            </div>
        </AppLayout>
    );
}
