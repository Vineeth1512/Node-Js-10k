const express = require("express");
const { readFile, writeFile } = require("./users/users");
const app = express();

app.use(express.json());
const portNo = 8080;

app.get("/users", (req, res) => {
  try {
    const allUsers = readFile();
    res.status(200).json({
      message: "See All Users",
      products: allUsers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const allUsers = readFile();
    const singleUser = allUsers.find((user) => user.id == id);
    if (singleUser) {
      res.status(200).json({
        user: singleUser,
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/users", (req, res) => {
  try {
    const addUser = readFile();
    addUser.push(req.body);
    writeFile(addUser);
    res.status(200).json({
      message: "User  Created successfully",
      user: req.body,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/users/:id", (req, res) => {
  try {
    const allUsers = readFile();
    const { id } = req.params;
    const { name, category, price } = req.body;
    const updateUser = allUsers.find((user) => user.id == id);

    if (updateUser) {
      updateUser.name = name;
      updateUser.category = category;
      updateUser.price = price;
      writeFile(allUsers);
      res.status(200).json({
        message: "User updated successfully..",
        user: updateUser,
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.delete("/users/:id", (req, res) => {
  try {
    const allUsers = readFile();
    const { id } = req.params;
    console.log(id);

    //check user exists
    const existUser = allUsers.find((user) => user.id == id);
    if (!existUser) {
      return res.status(404).json({
        message: `User with ID ${id} not found`,
      });
    }
    const deleteUser = allUsers.filter((user) => user.id != id);
    writeFile(deleteUser);
    res.status(200).json({
      message: "User Deleted Successfully..",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(portNo, () => {
  console.log(`Server is running on portNo ${portNo}`);
});
