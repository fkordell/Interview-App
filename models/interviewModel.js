module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const Interview = mongoose.model(
    "interviews",
    mongoose.Schema({
      _id: { type: ObjectId, auto: true },
      interviewer: {
        type: String,
      },
      position: {
        type: String,
      },
      location: {
        type: String,
      },
      date: {
        type: Date,
      },
      time: {
        type: String,
      },
    })
  );
  return Interview;
};
