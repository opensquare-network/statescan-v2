function getItemQ(item, isClass = true) {
  const { classId, classHeight, instanceId, instanceHeight } = item;

  let q = { classId, classHeight };
  if (!isClass) {
    q = {
      ...q,
      instanceId,
      instanceHeight,
    };
  }

  return q;
}

module.exports = {
  getItemQ,
};
