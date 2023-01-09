const sharp = require("sharp");
const parseDataURL = require("data-urls");
const { saveCreateThumbnailError, saveThumbnail } = require("./store");
const { createThumbnailFromImageData } = require("./thumbnail");

async function sharpNonSVGImageData(imageData) {
  const { metadata, thumbnail } = await createThumbnailFromImageData(imageData);

  return {
    metadata: {
      ...metadata,
      isDataUrl: true,
    },
    thumbnail,
  };
}

async function sharpSVGImageData(imageData, imageDataURL) {
  try {
    const svgImage = sharp(imageData);
    const { format, size, width, height } = await svgImage.metadata();
    const metadata = { format, size, width, height, isDataUrl: true };
    const thumbnail = imageDataURL;
    return {
      metadata,
      thumbnail,
    };
  } catch (e) {
    return {
      metadata: {
        format: "svg",
        isDataUrl: true,
      },
      thumbnail: imageDataURL,
    };
  }
}

// sharp image data and get metadata, where the image data is in base64 data URL format
async function sharpDataURL(imageDataURL) {
  const parsedDataUrl = parseDataURL(imageDataURL);
  if (!parsedDataUrl) {
    return {};
  }

  const contentType = parsedDataUrl.mimeType.toString().split(";")[0];
  const imageData = Buffer.from(parsedDataUrl.body);

  if (["image/png", "image/jpeg", "image/jpg"].includes(contentType)) {
    const { metadata, thumbnail } = await sharpNonSVGImageData(imageData);
    return {
      metadata,
      thumbnail,
      type: {
        ext: metadata.format,
        mime: contentType,
      },
    };
  }

  if (["image/svg", "image/svg+xml"].includes(contentType)) {
    const { metadata, thumbnail } = await sharpSVGImageData(
      imageData,
      imageDataURL,
    );
    return {
      metadata,
      thumbnail,
      type: {
        ext: metadata.format,
        mime: contentType,
      },
    };
  }

  return {
    type: {
      mime: contentType,
    },
  };
}

async function createThumbnailFromDataUrl(hash, imageDataURL) {
  try {
    const { type, metadata, thumbnail } = await sharpDataURL(imageDataURL);
    if (!metadata || !thumbnail) {
      await saveCreateThumbnailError(hash, type);
      return;
    }

    await saveThumbnail(hash, type, metadata, thumbnail);
  } catch (e) {
    await saveCreateThumbnailError(hash);
  }
}

module.exports = {
  createThumbnailFromDataUrl,
};
