const jwt = require("jsonwebtoken");

const validate_token = async ({ req, res, fn }) => {
  try {
    const tokenValue =
      req?.rawHeaders
        .filter((key) => key?.includes("Bearer"))[0]
        ?.split(" ")?.[1] ?? "";
    const decodedToken = jwt.verify(
      tokenValue,
      req?.query?.type === "admin" ? "mortgage-admin-access" : "mortgage-access"
    );
    if (decodedToken) {
      fn?.();
      return true;
    }
  } catch (error) {
    return res.send({ message: "Invalid Token", success: false });
  }
};
module.exports = {
  validate_token,
};
