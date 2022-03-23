import React, { useEffect, useState, createContext } from "react";
import useLocalStorage from "../useLocalStorage";
import Swal from "sweetalert2";
import axios from "axios";
// import { useEffect, useState } from "react/cjs/react.development";

const DishesContext = createContext();

const DishesContextProvider = (props) => {
    const [menuItems, setMenuItems] = useLocalStorage("menuItems", []);
    const [veganItemCounter, setVeganItemCounter] = useState(0);
    const [nonVeganItemCounter, setNonVeganItemCounter] = useState(0);

    useEffect(() => {
        verifyMenuLength();
    }, [menuItems]);

    const verifyMenuLength = () => {
        if (menuItems.length !== 0) {
            let veganItem = 0;
            let nonVeganItem = 0;

            menuItems.forEach((item) => {
                if (item.vegan) {
                    veganItem += 1;
                } else {
                    nonVeganItem += 1;
                }
            });

            setVeganItemCounter(veganItem);
            setNonVeganItemCounter(nonVeganItem);
        } else {
            setVeganItemCounter(0);
            setNonVeganItemCounter(0);
        }
    };

    const addDish = (id, image, restaurantChain, title, servings) => {
        verifyMenuLength();

        if (menuItems.length <= 4) {
            axios
                .get(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_APIKEY}&includeNutrition=true`
                )
                .then((response) => {
                    // console.log(response);

                    let item = {
                        id: id,
                        image: image,
                        restaurantChain: restaurantChain,
                        title: title,
                        servings: servings,

                        preparationMinutes: response.data.preparationMinutes,
                        pricePerServing: response.data.pricePerServing,
                        readyInMinutes: response.data.readyInMinutes,
                        glutenFree: response.data.glutenFree,
                        healthScore: response.data.healthScore,
                        vegan: response.data.vegan,
                        vegetarian: response.data.vegetarian,
                        nutrition: response.data.nutrition,
                    };

                    if (item.vegan && veganItemCounter < 2) {
                        setMenuItems([...menuItems, item]);
                        Toast.fire({
                            icon: "success",
                            title: "Vegan item added successfully",
                        });
                    } else {
                        Toast.fire({
                            icon: "error",
                            title: "You can't add more vegan items!",
                        });
                    }

                    if (!item.vegan && nonVeganItemCounter < 2) {
                        setMenuItems([...menuItems, item]);
                        Toast.fire({
                            icon: "success",
                            title: "Non-vegan item added successfully",
                        });
                    } else {
                        Toast.fire({
                            icon: "error",
                            title: "You can't add more non-vegan items!",
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Toast.fire({
                        icon: "error",
                        title: "Item doesn't exist",
                    });
                });
        } else {
            Toast.fire({
                icon: "error",
                title: "You can't add more items!",
            });
        }
    };

    const deleteDish = (id) => {
        setMenuItems(menuItems.filter((dish) => dish.id !== id));
        Toast.fire({
            icon: "success",
            title: "Deleted successfully",
        });
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    return (
        <DishesContext.Provider
            value={{
                setMenuItems,
                menuItems,
                addDish,
                deleteDish,
                veganItemCounter,
                nonVeganItemCounter,
            }}
        >
            {props.children}
        </DishesContext.Provider>
    );
};

export { DishesContextProvider, DishesContext };
