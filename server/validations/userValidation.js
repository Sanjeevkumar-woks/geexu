import yup from "yup";

export const userSingInSchema = yup.object({
  display_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(1024).required(),
});

export const userLogInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(1024).required(),
});
