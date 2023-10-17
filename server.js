const express = require("express");
const connection = require("./connection.js");
const todoModel = require("./todoModel.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ---- ROUTES---
app.get("/todos", async (req, res) => {
  try {
    // Retrieve all todos from the database
    const allTodos = await todoModel.find();

    // Return the list of todos as JSON data to the client
    res.json(allTodos);
  } catch (error) {
    // Handle any errors that may occur during the retrieval process

    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});
app.post("/todo/create", async (req, res) => {
  try {
    // Parse the request to retrieve the todo
    const { newTodo } = req.body;

    // Wrap the todo creation in a try...catch block to handle errors
    const createdTodo = await todoModel.create(newTodo);

    // Return the newly created todo as JSON data to the client
    res.json(createdTodo);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new todo" });
  }
});
app.put("/todo/update/:id", async (req, res) => {
  try {
    const { updatedTodo } = req.body;
    const todo = req.param.id;
    const updatedTodoItem = await todoModel.findByIdAndUpdate(
      todoId,
      updatedTodo,
      {
        new: true,
      }
    );

    if (!updatedTodoItem) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json(updatedTodoItem);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the todo" });
  }
});
app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const todoId = req.param.id;
    const deletedTodoItem = await todoModel.findByIdAndDelete(todoId);
    if (!deletedTodoItem) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.send(200).json({ msg: "Todo deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the todo" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
