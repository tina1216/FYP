const z = require("zod");

const SignupSchema = z.object({
  userId: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
});

module.exports = SignupSchema;
