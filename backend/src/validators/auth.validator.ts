import { body } from "express-validator";

const emailAddress = () => {
  return body("email")
    .trim()
    .escape()
    .exists()
    .notEmpty()
    .withMessage("Email address is required")
    .bail()
    .isLength({
      min: 3,
      max: 100,
    })
    .withMessage("Email address must be between 3 and 100 characters")
    .bail()
    .isEmail()
    .withMessage("Email address is not valid")
    .customSanitizer((email) => {
      return email.toLowerCase();
    });
};

const password = (field: string) => {
  return body(field)
    .trim()
    .escape()
    .isString()
    .isLength({ min: 8 })
    .withMessage(
      `${
        field === "password" ? "Password" : "Confirm password"
      } should not be empty and at a minimum eight characters.`,
    )
    .bail()
    .custom((value, { req }) => {
      if (field === "confirmPassword" && value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    });
};

const loginPassword = () => {
  return body("password")
    .trim()
    .escape()
    .exists()
    .notEmpty()
    .isString()
    .isLength({
      max: 255,
    })
    .withMessage("Password is not valid");
};

export { emailAddress, password, loginPassword };
