import mongoose from "mongoose";

const company_schema = mongoose.Schema({
  id: String,
  name: String,
});

const Company = mongoose.model("Company", company_schema);

export default Company;
