import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const contactSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Number must be 10 digit")
    .max(10, "Number must be 10 digit"),
}).required();
