export default {
  $id: "ChangePasswordBody",
  title: "ChangePasswordBody",
  description: "The body to change a password of an user",
  type: "object",
  properties: {
    password: { type: "string" },
    newPassword: { type: "string" },
  },
  required: ["password", "newPassword"],
};
