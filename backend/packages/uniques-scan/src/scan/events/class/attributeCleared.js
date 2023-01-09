const { deleteClassAttribute } = require("../../common/class/attribute");

async function handleAttributeCleared(event) {
  const [classId, maybeInstanceId, key] = event.data.toJSON();
  if (maybeInstanceId) {
    return;
  }

  await deleteClassAttribute(classId, key);
}

module.exports = {
  handleAttributeCleared,
};
