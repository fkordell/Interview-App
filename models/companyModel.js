module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const Company = mongoose.model(
      "Company",
      mongoose.Schema({
        _id: { type: ObjectId, auto: true },
        companyName: {
          type: String,
        },
        companyDescription: {
          type: String,
        },
        industryCategory: {
          type: String,
        },
        location: {
          address: { type: String },
          city: { type: String },
          state: { type: String },
          country: { type: String }
        },
        contactInfo: {
          firstName: { type: String },
          lastName: { type: String },
          email: { type: String },
          favoriteColor: { type: String },
          birthday: { type: String }
        },
        websiteURL: {
          type: String,
        }
      })
    );
    return Company;
  };
  