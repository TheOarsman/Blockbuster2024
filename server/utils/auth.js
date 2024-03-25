const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (error) {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ username,  _id }) {
    const payload = { username,  _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  generateResetToken: function ({ email,  _id }) {
    const payload = { email,  _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
