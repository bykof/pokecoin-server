export default {
  $id: "LoginResponse",
  title: "LoginResponse",
  description: "The response if login was successful",
  type: "object",
  required: ["token"],
  properties: {
    token: { type: "string" },
  },
};
