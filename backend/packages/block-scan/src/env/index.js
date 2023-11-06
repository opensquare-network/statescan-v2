const simpleMode = parseInt(process.env.SIMPLE_MODE) === 1;

function isSimpleMode() {
  return simpleMode;
}

module.exports = {
  isSimpleMode,
};
