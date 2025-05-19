const {z} = require("zod")

const loginSchema = z.object({
  email: z
  .string({required_error:"Email must be required"})
  .trim()
  .email({message:"Invalid Email Address"})
  .min(3, {message: "Email atleast of 3 charaters"})
  .max(255, {message: "Email must not be more than of 255 charaters"}),

  
  password: z
  .string({required_error:"Password must be required"})
  .trim()
  .min(6, {message: "Password atleast of 6 charaters"})
  .max(255, {message: "Password must not be more than of 255 charaters"})
})

const signUpSchema = loginSchema.extend({
  username: z
  .string({required_error:"Name must be required"})
  .trim()
  .min(3, {message: "Name atleast of 3 charaters"})
  .max(255, {message: "Name must not be more than of 255 charaters"}),


  phone: z
  .string({required_error:"Phone must be required"})
  .trim()
  .min(10, {message: "Phone atleast of 10 numbers"})
  .max(20, {message: "Phone must not be more than of 20 numbers"}),

})

module.exports = {loginSchema, signUpSchema}