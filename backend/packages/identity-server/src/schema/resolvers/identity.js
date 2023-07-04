async function identity(_, _args) {
  console.log(_args);
  return null;
}

module.exports = {
  identity,
};
