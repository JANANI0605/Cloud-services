const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Atlas Connection
mongoose
  .connect("Connection_string_of_your_cluster", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Connection error:", err));

// ✅ Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  regNo: String,
  dept: String,
  year: String,
  cgpa: Number,
});

const Student = mongoose.model("stud_data", studentSchema);

// ✅ Create (Add student)
app.post("/addStudent", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ message: "Student added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Read (Fetch all)
app.get("/getStudents", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ✅ Update
app.put("/updateStudent/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Student updated successfully!" });
});

// ✅ Delete
app.delete("/deleteStudent/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
