const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function getS3KeyFromUrl(url) {
  try {
    const urlObj = new URL(url);
    return decodeURIComponent(urlObj.pathname.substring(1));
  } catch (err) {
    return null;
  }
}

async function deleteS3Files(urls) {
  for (const url of urls) {
    const key = getS3KeyFromUrl(url);
    if (key) {
      try {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
          })
        );
      } catch (error) {
        // S3 삭제 에러 무시
      }
    }
  }
}

module.exports = {
  getS3KeyFromUrl,
  deleteS3Files,
};
