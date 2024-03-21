const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 26,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const hashPassword = (password) => {
  const result = passwordComplexity(complexityOptions, "Password").validate(
    password
  );
  if (result.error) {
    const missingRequirements = [];
    if (!result.value.match(/[a-z]/))
      missingRequirements.push("at least one lowercase letter");
    if (!result.value.match(/[A-Z]/))
      missingRequirements.push("at least one uppercase letter");
    if (!result.value.match(/[0-9]/))
      missingRequirements.push("at least one numeric character");
    if (!result.value.match(/[!@#$%^&*(),.?":{}|<>]/))
      missingRequirements.push("at least one symbol character");

    const errorMessage = `Password does not meet complexity requirements. Missing requirements: ${missingRequirements.join(
      ", "
    )}`;
    result.error.message = errorMessage;
  }
  return result;
};

module.exports = {
  hashPassword,
};
