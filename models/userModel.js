module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const User = mongoose.model(
      "users",
      mongoose.Schema({
        _id: { type: ObjectId, auto: true },
        userFirstName: {
          type: String,
        },
        userLastName: {
          type: String,
        },
        userEmail: {
          type: String,
        },
        userPassword: {
          type: String,
        },
      })
    );
    return User;
  };
