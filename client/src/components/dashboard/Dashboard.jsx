import React, { useEffect, useState } from 'react';
import { PiStudentFill } from "react-icons/pi";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Dashboard = () => {
    // Dummy Totals
    const [SellTotal, setSellTotal] = useState(120000);
    const [PaymentTotal, setPaymentTotal] = useState(85000);
    const [DueTotal, setDueTotal] = useState(35000);
    const [StudentTotal, setStudentTotal] = useState(120);

    // Dummy Chart Data
    const [StudentData] = useState([
        { AdmissionDate: "2025-08-01T12:00:00Z", Payment: 1000, StudentName: "Rahim" },
        { AdmissionDate: "2025-08-02T12:00:00Z", Payment: 2000, StudentName: "Karim" },
        { AdmissionDate: "2025-08-03T12:00:00Z", Payment: 1500, StudentName: "Sifat" },
    ]);

    const [AddBalanceData] = useState([
        { createdAt: "2025-08-01T12:00:00Z", Payment: 1000, studentDew: 500, discount: 100 },
        { createdAt: "2025-08-02T12:00:00Z", Payment: 2000, studentDew: 1000, discount: 200 },
        { createdAt: "2025-08-03T12:00:00Z", Payment: 1500, studentDew: 700, discount: 150 },
    ]);

    // Report Generators
    const generateDailyReport = (data) => {
        const report = data.reduce((acc, { AdmissionDate, Payment, StudentName }) => {
            const dateStr = AdmissionDate ? AdmissionDate.split("T")[0] : "Invalid Date";

            if (!acc[dateStr]) {
                acc[dateStr] = { totalStudents: 0, totalPayment: 0, studentDetails: [] };
            }

            acc[dateStr].totalStudents += 1;
            acc[dateStr].totalPayment += Payment || 0;
            acc[dateStr].studentDetails.push({ StudentName, Payment });

            return acc;
        }, {});

        return Object.keys(report).map((date) => ({
            name: date,
            totalStudents: report[date].totalStudents,
            totalPayment: report[date].totalPayment,
            studentDetails: report[date].studentDetails,
        }));
    };

    const generateDailyBalanceReport = (data) => {
        const report = data.reduce((acc, { createdAt, Payment }) => {
            if (!createdAt) return acc;
            const date = createdAt.split("T")[0];
            acc[date] = (acc[date] || 0) + Payment;
            return acc;
        }, {});
        return Object.keys(report).map((date) => ({ date, totalPayment: report[date] }));
    };

    const generateDailyDueReport = (data) => {
        const report = data.reduce((acc, { createdAt, studentDew }) => {
            if (!createdAt) return acc;
            const date = createdAt.split("T")[0];
            acc[date] = (acc[date] || 0) + studentDew;
            return acc;
        }, {});
        return Object.keys(report).map((date) => ({ date, totalDue: report[date] }));
    };

    const generateDailyDiscountReport = (data) => {
        const report = data.reduce((acc, { createdAt, discount }) => {
            if (!createdAt) return acc;
            const date = createdAt.split("T")[0];
            acc[date] = (acc[date] || 0) + discount;
            return acc;
        }, {});
        return Object.keys(report).map((date) => ({ date, totalDiscount: report[date] }));
    };

    // Use dummy data
    const studentChatData = generateDailyReport(StudentData);
    const BalanceChatData = generateDailyBalanceReport(AddBalanceData);
    const DueChatData = generateDailyDueReport(AddBalanceData);
    const DiscountChatData = generateDailyDiscountReport(AddBalanceData);

    const TakaCurrency = ({ amount }) => <span>৳ {amount}</span>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h5">
                                <TakaCurrency amount={SellTotal.toLocaleString()} />
                            </span>
                            <p>Total Sell</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h5">
                                <TakaCurrency amount={PaymentTotal.toLocaleString()} />
                            </span>
                            <p>Total Payment</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h5">
                                <TakaCurrency amount={DueTotal.toLocaleString()} />
                            </span>
                            <p>Total Due</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h5">{StudentTotal}</span>
                            <p>
                                <PiStudentFill size={20} /> Total Student
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="row">
                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Student Admission (Last 30 Days)</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart data={studentChatData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="totalStudents" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Student Payment (Last 30 Days)</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart data={BalanceChatData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="totalPayment" stroke="#FFA500" fill="#FFA500" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Student Due (Last 30 Days)</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart data={DueChatData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="totalDue" stroke="#FF6347" fill="#FF6347" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Student Discount (Last 30 Days)</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart data={DiscountChatData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="totalDiscount" stroke="#32CD32" fill="#32CD32" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
