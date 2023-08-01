import mongoose from "mongoose";
const company_schema = mongoose.Schema({
  _id: {
    type: String,
  },
  name: String,
  sudo: {
    type: String,
    ref: "Employee",
  },
});

const Company = mongoose.model("Company", company_schema);

export default Company;
