import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import axios from "axios";

import Button from "../components/Button";
import Dish from "../components/Dish";
import AppLayout from "../components/AppLayout";
import Gridlayout from "../components/GridLayout";
import { DishesContext } from "../components/DishesContext";
import { UserSessionContext } from "../components/UserSessionContext";
import Loadingdata from "../components/LoadingData";
import ErrorMessage from "../components/ErrorMessage";

export default function Search() {
    // let searchTimeout

    const [searchTimeout, setSearchTimeout] = useState("");

    // User validation
    let navigate = useNavigate();
    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    });

    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(false);

    // const apiKey = "apiKey=cb10ceed459a4109905001bf404c17d9";

    const { addDish } = useContext(DishesContext);
    const { isLogged } = useContext(UserSessionContext);

    const searchItem = (query) => {
        axios
            .get(
                `https://api.spoonacular.com/food/menuItems/search?apiKey=${process.env.REACT_APP_APIKEY}&query=${query}&number=8`
            )
            .then((response) => {
                // console.log(response);
                // console.log(response.data.menuItems);
                setMenuItems(response.data.menuItems);
                setIsloading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsloading(false);
                setError(true);

                setTimeout(() => setError(false), 2000);
            });
    };

    const formik = useFormik({
        initialValues: {
            searchInput: "",
        },
        onSubmit: (values) => {
            searchItem(values.searchInput);
            setIsloading(true);
        },
    });

    const validateLengthField = (e) => {
        formik.handleChange(e);
        if (searchTimeout !== "") {
            clearTimeout(searchTimeout);
        }
        if (formik.values.searchInput.length >= 2 && !isLoading && !error) {
            setSearchTimeout(
                setTimeout((e) => {
                    formik.handleSubmit(e);
                }, 1000)
            );
        }
    };

    return (
        <AppLayout>
            <h2 className="text-center mb-4">Search your next food!</h2>
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
                        onChange={validateLengthField}
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
                        error={error}
                    />
                </div>
            </form>

            {error ? (
                <ErrorMessage addClass={"mx-auto"}>
                    We have an error. Try again later
                </ErrorMessage>
            ) : (
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
                                    addDish={() =>
                                        addDish(
                                            id,
                                            image,
                                            restaurantChain,
                                            title,
                                            servings
                                        )
                                    }
                                />
                            );
                        }
                    )}
                </Gridlayout>
            )}
            {isLoading && menuItems.length !== 0 ? <Loadingdata /> : null}
        </AppLayout>
    );
}
