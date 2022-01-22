// Libraries
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import Dish from "../components/Dish";
import { UserSessionContext } from "../components/UserSessionContext";
import { DishesContext } from "../components/DishesContext";
import Gridlayout from "../components/GridLayout";
import AppLayout from "../components/AppLayout";

export default function Home() {
    let navigate = useNavigate();

    const { isLogged } = useContext(UserSessionContext);
    const { menuItems, deleteDish } = useContext(DishesContext);

    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    });

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

            {/* Items */}
            <RenderItems />
        </AppLayout>
    );
}
