import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// Components
import FloatCustomInput from "../components/FloatCustomInput";
import DataCenteredCard from "../components/DataCenteredCard";
import Logo from "../components/Logo";

// Images
import logo from "../img/dish_icon.png";

export default function Login() {
    // const [email, setEmail] = useState("");
    // const [pass, setPass] = useState("");

    // const handleLoginData = (e) => {
    //     e.preventDefault();

    //     const userInformation = {
    //         user: email,
    //         pass: pass,
    //     };

    //     console.log(userInformation);
    //     // validarDatos();
    // };

    // const validarDatos = () => {
    //     console.log("validando datos...");
    // };

    // const handleValue = (e) => {
    //     switch (e.target.id) {
    //         case "emailLoginInput":
    //             setEmail(e.target.value);
    //             break;
    //         case "passwordLoginInput":
    //             setPass(e.target.value);
    //             break;
    //         default:
    //             break;
    //     }
    // };

    const validation = Yup.object({
        emailInput: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        passwordInput: Yup.string()
            .min(8, "Must be 8 characters or more")
            .required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            emailInput: "",
            passwordInput: "",
        },
        onSubmit: (value) => {
            console.log(value);
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
                    value={formik.values.emailInput}
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
                    value={formik.values.password}
                    validation={
                        formik.touched.passwordInput &&
                        formik.errors.passwordInput ? (
                            <div>{formik.errors.passwordInput}</div>
                        ) : null
                    }
                />
                <div className="row d-flex align-items-center">
                    <div className="col-9">
                        <p className="mb-0">
                            Do not have an account yet?{" "}
                            <Link to="/register">Sign up in here.</Link>
                        </p>
                    </div>
                    <div className="d-flex justify-content-end col-3">
                        <button type="submit" className="btn btn-primary">
                            Log In
                        </button>
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
