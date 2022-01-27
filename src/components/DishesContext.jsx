import React, { createContext } from "react";
import useLocalStorage from "../useLocalStorage";
import Swal from "sweetalert2";
import axios from "axios";

const DishesContext = createContext();

const DishesContextProvider = (props) => {
    const [menuItems, setMenuItems] = useLocalStorage("menuItems", []);

    const addDish = (id, image, restaurantChain, title, servings) => {
        axios
            .get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_APIKEY}&includeNutrition=true`
            )
            .then((response) => {

                console.log(response)
                
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

                setMenuItems([...menuItems, item]);
                Toast.fire({
                    icon: "success",
                    title: "Added successfully",
                });
                // servings: response.data.servings
            })
            .catch((error) => {
                console.log(error)
            })
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
            }}
        >
            {props.children}
        </DishesContext.Provider>
    );
};

export { DishesContextProvider, DishesContext };
