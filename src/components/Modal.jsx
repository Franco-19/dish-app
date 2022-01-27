import React from "react";

// import ChartRace from "react-chart-race";

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
                        {/* <ChartRace data={caloricBreakdownData} width={468}/> */}
                        {/* <ul>
                            {caloricBreakdownData.map((element) => {
                                return (
                                    <p>
                                        <li>
                                            {element.title}: {element.value}
                                        </li>
                                    </p>
                                );
                            })}
                        </ul> */}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
