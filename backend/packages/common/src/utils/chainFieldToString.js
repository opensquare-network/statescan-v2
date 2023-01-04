function chainFieldToString(rawOnchainField) {
  try {
    return rawOnchainField.toUtf8();
  } catch (e) {
    return rawOnchainField.toHuman();
  }
}

module.exports = {
  chainFieldToString,
};
