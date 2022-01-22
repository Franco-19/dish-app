import React, { createContext } from "react";
import useLocalStorage from "../useLocalStorage";
import Swal from "sweetalert2";

const DishesContext = createContext();

const DishesContextProvider = (props) => {
    const [menuItems, setMenuItems] = useLocalStorage("menuItems", []);

    const addDish = (id, image, restaurantChain, title, servings) => {
        let item = {
            id: id,
            image: image,
            restaurantChain: restaurantChain,
            title: title,
            servings: servings,
        };
        setMenuItems([...menuItems, item]);
        Toast.fire({
            icon: 'success',
            title: 'Added successfully'
        })
    };

    const deleteDish = (id) => {
        setMenuItems(menuItems.filter(dish => dish.id !== id))
        Toast.fire({
            icon: 'success',
            title: 'Deleted successfully'
        })
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

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
