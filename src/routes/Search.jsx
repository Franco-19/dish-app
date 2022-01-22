import React, { useState, useContext } from "react";

import { useFormik } from "formik";
import axios from "axios";

import Button from "../components/Button";
import Dish from "../components/Dish";
import AppLayout from "../components/AppLayout";
import Gridlayout from "../components/GridLayout";
import { DishesContext } from "../components/DishesContext";

export default function Search() {
    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const apiKey = "apiKey=cb10ceed459a4109905001bf404c17d9";

    const { addDish } = useContext(DishesContext)

    const searchCharacter = (query) => {
        axios
            .get(
                `https://api.spoonacular.com/food/menuItems/search?${apiKey}&query=${query}&number=8`
            )
            .then((response) => {
                // console.log(response.data.results)
                console.log(response);
                console.log(response.data.menuItems);
                // if (response.status === "200") {
                // }
                setMenuItems(response.data.menuItems);
                setIsloading(false);
                // if (response.data.response === "success") {
                //     // setCharacters(response.data.results);
                // }
            });
    };

    const formik = useFormik({
        initialValues: {
            searchInput: "",
        },
        onSubmit: (values) => {
            searchCharacter(values.searchInput);
            setIsloading(true);
        },
    });

    // const updateTeam = (team, character) => {};

    return (
        <AppLayout>
            <form
                onSubmit={formik.handleSubmit}
                className="d-flex container justify-content-center"
            >
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        id="searchInput"
                        name="searchInput"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.searchInput}
                        placeholder="Search a dish"
                        aria-label="Search a dish"
                        aria-describedby="search-button"
                    />
                    <Button
                        type="button"
                        id="search-button"
                        desing="primary"
                        text="Search"
                        isLoading={isLoading}
                        onClick={formik.handleSubmit}
                    />
                </div>
            </form>
            {/* <ListCharacters searchResultArray={characters} setActualTeam={setActualTeam} teams={teams} /> */}
            <Gridlayout>
                {menuItems.map(
                    ({ id, image, restaurantChain, title, servings }) => {
                        return (
                            <Dish
                                key={id}
                                image={image}
                                restaurantChain={restaurantChain}
                                title={title}
                                servings={servings}
                                addButton={true}
                                addDish={() => addDish(id, image, restaurantChain, title, servings)}
                            />
                        );
                    }
                )}
            </Gridlayout>
        </AppLayout>
    );
}
