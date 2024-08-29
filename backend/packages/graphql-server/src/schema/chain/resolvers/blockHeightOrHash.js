const { GraphQLScalarType, Kind } = require("graphql");

const BlockHeightOrHash = new GraphQLScalarType({
  name: "BlockHeightOrHash",
  description: "Custom scalar type for block height or hash",
  parseValue(value) {
    if (typeof value === "string" || Number.isInteger(value)) {
      return value;
    }
    throw new Error("BlockHeightOrHash must be an integer or a string");
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    throw new Error("BlockHeightOrHash must be an integer or a string");
  },
});

module.exports = {
  BlockHeightOrHash,
};
