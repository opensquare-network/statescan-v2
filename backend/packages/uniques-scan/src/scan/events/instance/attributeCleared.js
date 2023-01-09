const { deleteInstanceAttribute } = require("../../common/instance/attribute");

async function handleAttributeCleared(event) {
  const [classId, maybeInstanceId, key] = event.data.toJSON();
  if (!maybeInstanceId) {
    return;
  }

  await deleteInstanceAttribute(classId, maybeInstanceId, key);
}

module.exports = {
  handleAttributeCleared,
};
