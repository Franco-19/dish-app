import React from "react";
import FloatCustomInput from "../components/FloatCustomInput";

import logo from "../img/dish_icon.png";

export default function Login() {
    return (
        <div className="container card login_card position-absolute shadow-sm border-light">
            <div className="d-flex align-items-end justify-content-center mb-3">
                <img className="logo_img" src={logo} alt="dish food logo" />
                <h1>Dish App</h1>
            </div>
            <form className="d-flex align-items-end flex-column">
                <FloatCustomInput
                    type={"email"}
                    id={"EmailLoginInput"}
                    placeholder="name@example.com"
                    labelContent="Email"
                    inputContainerClass="w-100"
                />
                <FloatCustomInput
                    type="password"
                    id={"passwordLoginInput"}
                    placeholder="password"
                    labelContent="Password"
                    inputContainerClass="w-100"
                />
                <button type="submit" className="btn btn-primary">
                    Sign in
                </button>
            </form>
        </div>
    );
}
