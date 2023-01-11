const os = require("os");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const { createThumbnailFromImageData } = require("./thumbnail");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const ffprobe = require("node:util").promisify(ffmpeg.ffprobe);

async function getVideoMetadata(videoFilePath) {
  const videoMetadata = await ffprobe(videoFilePath);
  const {
    streams: [{ width, height }] = [{}],
    format: { duration, size } = {},
  } = videoMetadata;

  return {
    width,
    height,
    duration,
    size,
  };
}

async function captureFirstVideoFrame(videoFilePath) {
  const tmpFolder = os.tmpdir();
  const parsedPath = path.parse(videoFilePath);
  const screenshotFileName = `${parsedPath.name}-%i.jpg`;

  await new Promise((resolve, reject) => {
    ffmpeg(videoFilePath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .screenshots({
        folder: tmpFolder,
        filename: screenshotFileName,
        timestamps: [0],
      });
  });

  const firstFrameFilePath = path.join(tmpFolder, `${parsedPath.name}-1.jpg`);
  if (!fs.existsSync(firstFrameFilePath)) {
    throw new Error("Fail to capture video frame");
  }

  return firstFrameFilePath;
}

async function createThumbnailFromVideoData(ipfsCid, fileType, videoData) {
  const tmpFolder = os.tmpdir();
  const downloadFilePath = path.join(tmpFolder, `${ipfsCid}.${fileType.ext}`);

  fs.writeFileSync(downloadFilePath, videoData);

  const videoMetadata = await getVideoMetadata(downloadFilePath);
  const firstFrameFilePath = await captureFirstVideoFrame(downloadFilePath);

  const imageData = fs.readFileSync(firstFrameFilePath);
  const { metadata, thumbnail } = await createThumbnailFromImageData(imageData);

  return {
    metadata: {
      ...videoMetadata,
      format: fileType.ext,
      background: metadata.background,
    },
    thumbnail,
  };
}

module.exports = {
  createThumbnailFromVideoData,
};
