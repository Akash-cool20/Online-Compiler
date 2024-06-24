import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface CompilerSliceStateType{
    fullCode: {
        html: string;
        css: string;
        javascript: string;
    };
    currentLanguage: "html" | "css" | "javascript";
}

const initialState: CompilerSliceStateType = {
    fullCode: {
        html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <div class="input-container">
            <input type="text" id="new-task" placeholder="Add a new task...">
            <button onclick="addTask()">Add</button>
        </div>
        <ul id="task-list"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        css:`body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 300px;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
}

.input-container {
    display: flex;
    justify-content: space-between;
}

input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
}

button:hover {
    background-color: #218838;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background: #eee;
    padding: 10px;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
}

li button {
    background-color: #dc3545;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    padding: 5px 10px;
}

li button:hover {
    background-color: #c82333;
}
`,
        javascript:`function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        const taskList = document.getElementById('task-list');
        
        // Create new task list item
        const listItem = document.createElement('li');
        
        // Create task text node
        const taskNode = document.createTextNode(taskText);
        
        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            taskList.removeChild(listItem);
        };
        
        // Append text node and delete button to list item
        listItem.appendChild(taskNode);
        listItem.appendChild(deleteButton);
        
        // Append list item to task list
        taskList.appendChild(listItem);
        
        // Clear the input field
        taskInput.value = '';
    }
}
`,
    },
    currentLanguage: "html",

};

const compilerSlice = createSlice({
    name:"compilerSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>)=>{
            state.currentLanguage = action.payload;
        },
        updateCodeValue:(state, action: PayloadAction<string>)=>{
            state.fullCode[state.currentLanguage] = action.payload;
        },
    },
});

export default compilerSlice.reducer;
export const {updateCurrentLanguage,updateCodeValue} = compilerSlice.actions;