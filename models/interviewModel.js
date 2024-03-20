module.exports =(mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const Interview = mongoose.model(
    "interviews",
    mongoose.Schema({
      _id: { type: ObjectId, auto: true },
      companyName: {
        type: String,
      },
      position: {
        type: String,
      },
      location: {
        type: String,
      },
      date: {
        type: String,
        required: [true, 'Please enter a date'],
        validate: {
          validator: function(v) {
            return /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/.test(v);
          },
          message: props => `${props.value} is not a valid date! Must be in MM-DD-YYYY format.`
        }
      },
      time: {
        type: String, 
        required: [true, 'Please enter a time'],
        validate: {
          validator: function(v) {
            return /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i.test(v);
          },
          message: props => `${props.value} is not a valid time! Must be in "hh:mm AM" or "hh:mm PM" format.`
        }
      },
    })
  )
  return Interview
}