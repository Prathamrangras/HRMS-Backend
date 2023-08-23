import mongoose from "mongoose";

const holiday_schema = mongoose.Schema({
  _id: String,
  name: String,
  day: {
    type: String,
    enum: [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ],
  },
  date: Date,
});

const Holiday = mongoose.model("Holiday", holiday_schema);

export default Holiday;
