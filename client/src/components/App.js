import React, { useState, useEffect } from "react";
import Completed from "./Completed";
import Todo from "./Todo";
import axios from "axios";

export default function App() {
    const [done, setDone] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/func/getItems", {
                    table: "completed",
                });
                const allItems = response.data;
                // const mappedItems = allItems.map(item => item.item);
                setDone(allItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchData();
    }, []);


    console.log("in app: ",done);
    function addDone(newDone) {
        setDone((prev) => {
            return [...prev, newDone]
        })
    }
    return (
        <div className="main-container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="lists-container">
                <Todo addDone={addDone} />
                <Completed done={done} />
            </div>
        </div>
    )
}