// Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Components
import FloatCustomInput from "../components/FloatCustomInput";
import DataCenteredCard from "../components/DataCenteredCard";
import Logo from "../components/Logo";
import ErrorMessage from "../components/ErrorMessage";

// Images
import logo from "../img/dish_icon.png";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    const validation = Yup.object({
        emailInput: Yup.string()
            .email(<ErrorMessage>Invalid email address</ErrorMessage>)
            .required(<ErrorMessage>The field is required</ErrorMessage>),
        passwordInput: Yup.string()
            .min(5, <ErrorMessage>Must be 5 characters or more</ErrorMessage>)
            .required(<ErrorMessage>The field is required</ErrorMessage>),
    });

    const Button = () => {
        if (isLoading) {
            return (
                <button className="btn btn-primary" type="button" disabled>
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Loading...
                </button>
            );
        }

        return (
            <button type="submit" className="btn btn-primary">
                Log In
            </button>
        );
    };

    const formik = useFormik({
        initialValues: {
            emailInput: "",
            passwordInput: "",
        },
        onSubmit: (value) => {
            setIsLoading(true);
            axios
                .post("http://challenge-react.alkemy.org/", {
                    email: value.emailInput,
                    password: value.passwordInput,
                })
                .then(function (response) {
                    console.log(response);
                    setIsLoading(false);
                    console.log(`El token es ${response.data.token}`);
                    // navigate("/");
                })
                .catch(function (error) {
                    setIsLoading(false);
                    console.log(error);
                });
        },
        validationSchema: validation,
    });

    return (
        <DataCenteredCard>
            <Logo logo={logo} />
            <form
                className="container-fluid d-flex flex-column"
                onSubmit={formik.handleSubmit}
            >
                <FloatCustomInput
                    type={"email"}
                    id={"emailInput"}
                    placeholder="name@example.com"
                    labelContent="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.emailInput}
                    // analizar si se puede colocar el contenido dentro del componente y rellenar con el prop id
                    validation={
                        formik.touched.emailInput &&
                        formik.errors.emailInput ? (
                            <div>{formik.errors.emailInput}</div>
                        ) : null
                    }
                />
                <FloatCustomInput
                    type="password"
                    id={"passwordInput"}
                    placeholder="password"
                    labelContent="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    validation={
                        formik.touched.passwordInput &&
                        formik.errors.passwordInput ? (
                            <div>{formik.errors.passwordInput}</div>
                        ) : null
                    }
                />
                <div className="row d-flex align-items-center">
                    <div className="d-flex justify-content-end col-12">
                        <Button />
                    </div>
                </div>
            </form>
            {/* <button
                onClick={() => {
                    console.log(email, pass);
                }}
            >
                Consultar estado actual
            </button> */}
        </DataCenteredCard>
    );
}
