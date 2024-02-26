import * as yup from "yup";

export const SignupSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    // role:yup.string().required(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  })
  .required();

export const LoginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    // number:yup.string().required().min(10).max(10)
  })
  .required();
