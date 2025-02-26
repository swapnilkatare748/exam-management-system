import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./StudentProgressChart.module.css";

function StudentProgressChart({ marksData }) {
  return (
    <div className={styles.chartContainer}>
      <h2>Student Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={marksData} margin={{ top: 20, right: 30, bottom: 10 }}>
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="50%" stopColor="#ff9900" />
              <stop offset="100%" stopColor="#007bff" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="marks"
            stroke="url(#colorGradient)"
            strokeWidth={3}
            dot={{ fill: "#007bff", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StudentProgressChart;
