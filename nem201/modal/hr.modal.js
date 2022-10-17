const { Schema, model } = require("mongoose");

const HRSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "assignment", "csbt"],
  },
});

const HRModel = model("employe", HRSchema);
module.exports = HRModel;
