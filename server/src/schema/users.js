const z = require("zod");

const SignupSchema = z.object({
  idNumber: z.string(),
  password: z.string().min(6),
});

module.exports = SignupSchema;
