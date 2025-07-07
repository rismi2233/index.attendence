const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://student:student123@cluster1.db2ezbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1');

const AttendanceSchema = new mongoose.Schema({
  name: String,
  date: String,
  status: String // Present or Absent
});
const Attendance = mongoose.model('Attendance', AttendanceSchema);

// Mark attendance
app.post('/mark', async (req, res) => {
  const { name, date, status } = req.body;
  await Attendance.create({ name, date, status });
  res.send('Attendance marked!');
});

// View attendance
app.get('/view/:name', async (req, res) => {
  const records = await Attendance.find({ name: req.params.name });
  res.json(records);
});

app.listen(4000, () => {
  console.log('Attendance server running on http://localhost:4000');
});
