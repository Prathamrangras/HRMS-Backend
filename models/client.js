import mongoose from "mongoose";

const client_schema = mongoose.Schema(
  {
    _id: String,
    name: String,
    dateOfBirth: String,
    Address: String,
    Comapny: String,
    designation: String,
    Photo: String,
    username: String,
    Password: String,
    email: String,
    phoneNo: Number,
  },
  { timestamps: true }
);

client_schema.pre("save", async function (next) {
  //is modified is a mongoose method which tells weather a field was modified or not
  if (!this.isModified("password")) {
    return next();
  }

  //if not modified then hash the password
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

client_schema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Client = mongoose.model("Client", client_schema);

export default Client;
