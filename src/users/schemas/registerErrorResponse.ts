export default {
  $id: "RegisterErrorResponse",
  title: "RegisterErrorResponse",
  description: "The error when register failed",
  type: "object",
  properties: {
    code: { type: "string", enum: ["UserAlreadyExists"] },
    message: { type: "string" },
    username: { type: "string" },
  },
};
