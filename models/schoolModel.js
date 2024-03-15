module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const School = mongoose.model(
      "schools",
      mongoose.Schema({
        _id: { type: ObjectId, auto: true },
        schoolName: {
          type: String,
        },
        schoolAddress: {
          type: String,
        },
        schoolPhone: {
          type: String,
        }
      })
    );
    return School;
  };
