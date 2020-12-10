export default {
  $id: "RegisterResponse",
  title: "RegisterResponse",
  description: "The response if registration was successful",
  type: "object",
  required: ["username"],
  properties: {
    username: { type: "string" },
  },
};
