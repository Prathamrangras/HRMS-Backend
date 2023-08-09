import mongoose from "mongoose";

const holiday_schema = mongoose.Schema({
  _id: String,
  name: String,
  day: {
    type: String,
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
  },
  date: Date,
});

const Holiday = mongoose.model("Holiday", holiday_schema);

export default Holiday;
