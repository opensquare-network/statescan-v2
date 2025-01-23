const { prisma } = require("../db");

const name = "main-scan-height";

async function getNextScanHeight() {
  const scanStatusRecord = await prisma.status.findUnique({
    where: { name },
  });

  if (!scanStatusRecord || !scanStatusRecord.value?.height) {
    return 1;
  }

  return parseInt(scanStatusRecord.value.value) + 1;
}

async function upsertScanHeight(height) {
  await prisma.status.upsert({
    where: { name },
    update: {
      value: { height },
    },
    create: {
      name,
      value: { height },
    },
  });
}

module.exports = {
  getNextScanHeight,
  upsertScanHeight,
};
