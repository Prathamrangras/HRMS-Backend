import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employee_schema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: String,
    dateOfBirth: String,
    phoneNo: Number,
    email: String,
    password: {
      type: String,
    },
    positionType: Number,
    companyId: {
      type: String,
      ref: "Employee",
    },
    role: {
      type: String,
      enum: ["Manager", "Employee"],
      default: "Employee",
    },
    managerId: [
      {
        type: String,
        ref: "Employee",
      },
    ],

    designationType: Number,
  },
  { timestamps: true }
);

employee_schema.pre("save", async function (next) {
  //is modified is a mongoose method which tells weather a field was modified or not
  if (!this.isModified("password")) {
    return next();
  }

  //if not modified then hash the password
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

employee_schema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Employee = mongoose.model("Employee", employee_schema);

export default Employee;
