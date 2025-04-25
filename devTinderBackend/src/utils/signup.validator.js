import validator from "validator";

const signupVlidator = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  }
};

const validateEditProfile = (req) => {
  const { firstName, lastName, age, gender, about, photoUrl, skills } =
    req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  }
  // if (age && validator.isNumeric(age)) {
  //   throw new Error("age is not valid");
  // }
  if (!["male", "female", "shemale"].includes(gender)) {
    throw new Error("please give the valid gender");
  }
  if (!about) {
    throw new Error("please give the valid about");
  }
  if (!photoUrl || !validator.isURL(photoUrl)) {
    throw new Error("please give the valid photo url");
  }
  if (!Array.isArray(skills)) {
    throw new Error("skills must be an array");
  }
  if (skills.length < 3) {
    throw new Error("skills should be greater than 3");
  }
  if (skills.length > 10) {
    throw new Error("skills should be less than 10");
  }
};

export { signupVlidator, validateEditProfile };
