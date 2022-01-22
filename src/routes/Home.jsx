// Libraries
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "../components/Header";
import Dish from "../components/Dish";
import { UserSessionContext } from "../components/UserSessionContext";

export default function Home() {
    const dishes = [
        {
            id: 419357,
            title: "Burger Sliders",
            image: "https://images.spoonacular.com/file/wximages/419357-312x231.png",
            imageType: "png",
            restaurantChain: "Hooters",
            servingSize: null,
            readableServingSize: null,
            servings: {
                number: 1.0,
                size: null,
                unit: null,
            },
        },
        {
            id: 424571,
            title: "Bacon King Burger",
            image: "https://images.spoonacular.com/file/wximages/424571-312x231.png",
            imageType: "png",
            restaurantChain: "Burger King",
            servingSize: null,
            readableServingSize: null,
            servings: {
                number: 1.0,
                size: null,
                unit: null,
            },
        },
        {
            id: 424571,
            title: "Bacon King Burger",
            image: "https://images.spoonacular.com/file/wximages/424571-312x231.png",
            imageType: "png",
            restaurantChain: "Burger King",
            servingSize: null,
            readableServingSize: null,
            servings: {
                number: 1.0,
                size: 10,
                unit: 'kg',
            },
        },
        {
            id: 424571,
            title: "Bacon King Burger",
            image: "https://images.spoonacular.com/file/wximages/424571-312x231.png",
            imageType: "png",
            restaurantChain: "Burger King",
            servingSize: null,
            readableServingSize: null,
            servings: {
                number: 1.0,
                size: null,
                unit: null,
            },
        },
        {
            id: 424571,
            title: "Bacon King Burger",
            image: "https://images.spoonacular.com/file/wximages/424571-312x231.png",
            imageType: "png",
            restaurantChain: "Burger King",
            servingSize: null,
            readableServingSize: null,
            servings: {
                number: 1.0,
                size: null,
                unit: null,
            },
        },
        {
            id: 424571,
            title: "Bacon King Burger",
            image: "https://images.spoonacular.com/file/wximages/424571-312x231.png",
            imageType: "png",
            restaurantChain: "Burger King",
            servingSize: null,
            readableServingSize: null,
            servings: {
                number: 1.0,
                size: null,
                unit: null,
            },
        },
        {
            id: 424571,
            title: "Bacon King Burger",
            image: "https://images.spoonacular.com/file/wximages/424571-312x231.png",
            imageType: "png",
            restaurantChain: "Burger King",
            servingSize: null,
            readableServingSize: null,
            servings: {
                number: 1.0,
                size: null,
                unit: null,
            },
        },
    ];

    let navigate = useNavigate();

    const { isLogged } = useContext(UserSessionContext);

    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    });
    return (
        <div>
            <Header />
            {/* Stats */}
            {/* Items */}
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {dishes.map((dish) => {
                        return (
                            <Dish
                                title={dish.title}
                                image={dish.image}
                                servingSize={dish.servings.size}
                                servingUnit={dish.servings.unit}
                                servingNumber={dish.servings.number}
                                restaurantChain={dish.restaurantChain}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
