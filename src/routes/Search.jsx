import React, { useState } from "react";

import { useFormik } from "formik";
import axios from "axios";

import AppLayout from "../components/AppLayout";
import Button from "../components/Button";

export default function Search() {
    // const [characters, setCharacters] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const apiKey = 'apiKey=cb10ceed459a4109905001bf404c17d9'

    const searchCharacter = (query) => {
        axios
            .get(
              
                `https://api.spoonacular.com/food/menuItems/search?${apiKey}&query=${query}&number=8`
            )
            .then((response) => {
                // console.log(response.data.results)
                console.log(response)
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
                <div className="input-group mb-3 w-50">
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
        </AppLayout>
    );
}
