import React from "react";

// import ChartRace from "react-chart-race";
import KeyValueTitle from "./KeyValueTitle";
import AccordionItem from "./AccordionItem";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

// const data = [
//     {
//         subject: "Percent Carbs",
//         A: 120,
//         B: 110,
//         fullMark: 150,
//     },
//     {
//         subject: "Percent Fat",
//         A: 60,
//         B: 200,
//         fullMark: 250,
//     },
//     {
//         subject: "Percent Protein",
//         A: 86,
//         B: 130,
//         fullMark: 150,
//     },
// ];

const Modal = ({ modalTargetId, nutritionData = [] }) => {
    let caloricBreakdownData = [];

    if (nutritionData.length !== 0) {
        caloricBreakdownData = [
            {
                subject: "Percent Carbs",
                A: nutritionData.caloricBreakdown.percentCarbs,
                B: nutritionData.caloricBreakdown.percentCarbs,
                fullMark: nutritionData.caloricBreakdown.percentCarbs,
            },
            {
                subject: "Percent Fat",
                A: nutritionData.caloricBreakdown.percentFat,
                B: nutritionData.caloricBreakdown.percentFat,
                fullMark: nutritionData.caloricBreakdown.percentFat,
            },
            {
                subject: "Percent Protein",
                A: nutritionData.caloricBreakdown.percentProtein,
                B: nutritionData.caloricBreakdown.percentProtein,
                fullMark: nutritionData.caloricBreakdown.percentProtein,
            },
        ];
    }

    return (
        <div
            className="modal fade"
            id={modalTargetId}
            tabIndex="-1"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Detailed Dish Information
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Caloric Breakdown</p>
                        {caloricBreakdownData.length !== 0 ? (
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer>
                                    <RadarChart
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="80%"
                                        data={caloricBreakdownData}
                                    >
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="subject" />
                                        <PolarRadiusAxis />
                                        <Radar
                                            name="Caloric Breakdown"
                                            dataKey="A"
                                            stroke="#8884d8"
                                            fill="#8884d8"
                                            fillOpacity={0.6}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : null}
                    </div>

                    <div className="container-fluid">
                        <KeyValueTitle
                            keyName={"Weight Per Serving"}
                            value={nutritionData.weightPerServing.amount}
                            unit={nutritionData.weightPerServing.unit}
                        />
                    </div>

                    {/* Accordion */}
                    <div className="accordion" id="accordion">
                        {/* Nutrients */}
                        <AccordionItem name={"nutrients"} parent={"accordion"}>
                            <div className="d-flex flex-column flex-sm-row flex-sm-wrap row">
                                {nutritionData.nutrients.map(
                                    ({ name, amount, unit }) => {
                                        return (
                                            <div className="item_custom_width text-center text-sm-start ">
                                                <KeyValueTitle
                                                    keyName={name}
                                                    value={amount}
                                                    unit={unit}
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </AccordionItem>

                        {/* Properties */}
                        <AccordionItem name={"properties"} parent={"accordion"}>
                            <div className="d-flex flex-sm-wrap">
                                {nutritionData.properties.map(
                                    ({ name, amount, unit }) => {
                                        return (
                                            <div className="w-50">
                                                <KeyValueTitle
                                                    keyName={name}
                                                    value={amount}
                                                    unit={unit}
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </AccordionItem>

                        {/* Ingredients */}
                        <AccordionItem
                            name={"ingredients"}
                            parent={"accordion"}
                        >
                            <div className="d-flex flex-sm-wrap">
                                {nutritionData.ingredients.map(
                                    ({ name, amount, unit }) => {
                                        return (
                                            <div className="w-50">
                                                <KeyValueTitle
                                                    keyName={name}
                                                    value={amount}
                                                    unit={unit}
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </AccordionItem>

                        {/* Flavonoids */}
                        <AccordionItem name={"flavonoids"} parent={"accordion"}>
                            <div className="d-flex flex-sm-wrap">
                                {nutritionData.flavonoids.map(
                                    ({ name, amount, unit }) => {
                                        return (
                                            <div className="w-50">
                                                <KeyValueTitle
                                                    keyName={name}
                                                    value={amount}
                                                    unit={unit}
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </AccordionItem>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
