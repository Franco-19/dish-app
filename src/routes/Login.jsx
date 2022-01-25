// Libraries
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

// Components
import FloatCustomInput from "../components/FloatCustomInput";
import Card from "../components/Card";
import Logo from "../components/Logo";
import ErrorMessage from "../components/ErrorMessage";
import { UserSessionContext } from "../components/UserSessionContext";
import Button from "../components/Button";

// Images
import logo from "../img/dish_icon.png";

export default function Login() {
    useEffect(() => {
        if (isLogged) {
            return navigate("/");
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { isLogged, setIsLogged, setSessionValue, sessionValue } =
        useContext(UserSessionContext);

    let navigate = useNavigate();
    const successSwalAlert = withReactContent(Swal);

    const validation = Yup.object({
        emailInput: Yup.string()
            .email(<ErrorMessage>Invalid email address</ErrorMessage>)
            .required(<ErrorMessage>The field is required</ErrorMessage>),
        passwordInput: Yup.string()
            .min(5, <ErrorMessage>Must be 5 characters or more</ErrorMessage>)
            .required(<ErrorMessage>The field is required</ErrorMessage>),
    });

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
                    try {
                        validateSession(response.data.token);
                    } catch (error) {
                        setIsLoading(false);
                        setError(error);
                        console.error("Token incorrecto");
                        setTimeout(() => {
                            setError(false);
                        }, 2000);
                    }
                })
                .catch(function (error) {
                    setIsLoading(false);
                    console.log(error);
                });
        },
        validationSchema: validation,
    });

    const validateSession = (tokenValue) => {
        if (tokenValue === sessionValue.token) {
            setIsLoading(false);
            successSwalAlert.fire({
                title: <strong>Session started successfully</strong>,
                html: <i>Redirecting</i>,
                icon: "success",
            });
            setSuccess(true);
            setTimeout(() => {
                setIsLogged(true);
                setSessionValue({ logged: true, token: tokenValue });
                successSwalAlert.close()
                navigate("/");
            }, 1500);
        } else {
            throw "error has ocurred";
        }
    };

    return (
        <Card centered={true} > 
            <Logo logo={logo} addContainerClass="mb-3" />
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
                        <Button error={error} success={success} isLoading={isLoading} text="Log In" />
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
        </Card>
    );
}
