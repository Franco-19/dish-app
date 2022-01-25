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

    // const getAllStats = ({healthScore}) => {
    //     let totalHealthScore = 0
    //     totalHealthScore += healthScore;
    // }

    // const [totalStats, setTotalStats] = useState([]);

    // let totalHealthScore = 0;

    function getAllStats() {
        if (menuItems.length !== 0) {
            menuItems.map(
                ({ healthScore, preparationMinutes, readyInMinutes }) => {
                    // console.log(healthScore)
                    // totalHealthScore += healthScore
                    setTotalHealthScore(totalHealthScore + healthScore);
                    // console.log(totalHealthScore)
                    setTotalPreparationMinutes(
                        totalPreparationMinutes + preparationMinutes
                    );
                    setTotalReadyInMinutes(
                        totalReadyInMinutes + readyInMinutes
                    );
                }
            );
        } else {
            setTotalHealthScore(0);
        }
    }

    const RenderItems = () => {
        if (menuItems.length !== 0) {
            return (
                <Gridlayout>
                    {menuItems.map(
                        ({ id, title, image, servings, restaurantChain }) => {
                            return (
                                <Dish
                                    title={title}
                                    image={image}
                                    servings={servings}
                                    restaurantChain={restaurantChain}
                                    key={id}
                                    deleteButton={true}
                                    deleteDish={() => deleteDish(id)}
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
            {/* {getAllStats()} */}
            <div className="row mb-3">
                <div className="col-6">
                    <Card>
                        <h5>Nutritional information</h5>

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
                                Health Score
                            </span>
                            : {totalHealthScore}
                        </p>
                        <p>
                            <span className="text-decoration-underline">
                                Ready in
                            </span>
                            : {totalReadyInMinutes} minutes
                        </p>
                    </Card>
                </div>
            </div>

            {/* Items */}
            <RenderItems />
        </AppLayout>
    );
}
