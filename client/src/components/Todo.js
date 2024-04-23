import React, { useState, useEffect } from "react";
import TodoItem from "./Todoitem";
import InputItems from "./InputItems";
import axios from "axios";

function Todo(props) {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [isDeleted, setIsDeleted] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/func/getItems",{
          table: "ongoing",
        });
        const allItems = response.data;
        // const mappedItems = allItems.map(item => item.item);
        setItems(allItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  async function addItem() {
    const item = await axios.post("http://localhost:5000/func/add",{
      text: inputText,
      table: "ongoing",
    })
    setItems((prevItems) => {
      return [...prevItems, item.data];
    });
    setInputText("");
  }

  async function deleteItem(id) {
    // not directly using splice to delete the item coz if u change the actual state variable, then react is not able to tell the diff while re rendering and that leads to unexpected behaviour
    console.log(id, "delete called");
    let item = items.find((item)=>{
      return id==item._id
    });
    item = item.item;
    
    if (document.getElementById(id).checked) {
      console.log(id, "delete 2 called");
      setIsDeleted((prev) => {
        return {
          ...prev,
          [id]: true
        }
      })
      
      setTimeout(() => {
        setItems((prev) => {
          return prev.filter((item) => {
            return item._id != id;
          });
        })
      }, 1000)
      
      
      await axios.post("http://localhost:5000/func/delete",{
        id: id,
      })
      console.log(id, "delete 3 called");
      
      const newDone = await axios.post("http://localhost:5000/func/add",{
        text: item,
        table: "completed",
      })

      console.log("in todo: ", newDone.data)
      props.addDone(newDone.data);
    }
    else {
      setIsDeleted((prev) => {
        return {
          ...prev,
          [id]: false
        }
      })

    }

  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do</h1>
      </div>
      <InputItems handleChange={handleChange} inputText={inputText} addItem={addItem} />
      <div>
        <ul>
          {/* a function is passed to the component so that when list item clicked, we can remove it from the items array and delete it from screen */}
          {items.map((item) => (
            <TodoItem
              key={item._id}
              id={item._id}
              item={item.item}
              onClicked={deleteItem}
              isDeleted={isDeleted[item._id]}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
