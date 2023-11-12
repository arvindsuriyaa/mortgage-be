const jwt = require("jsonwebtoken");

const validate_token = async ({ req, res, fn }) => {
  try {
    const tokenValue =
      req?.rawHeaders
        .filter((key) => key?.includes("Bearer"))[0]
        ?.split(" ")?.[1] ?? "";
    console.log("tokenValue: ", tokenValue);
    const decodedToken = jwt.verify(tokenValue, "mortgage-access");
    console.log('decodedToken: ', decodedToken);
    if (decodedToken) {
      fn();
      return true;
    }
  } catch (error) {
    // console.log('error: ', error);
    return res.send({ message: "Invalid Token", success: false });
  }
};
module.exports = {
  validate_token,
};
