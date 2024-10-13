import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dClient);
const s3Client = new S3Client({});

export const handler = async (event) => {
  console.log("start event handler");
  try {
    const body = JSON.parse(event.body);

    const email = body.email;
    const filename = body.filename;
    console.log(email, filename);
    const base64Image = body.image;
    if (!email || !filename || !base64Image) {
      throw new Error("Email, filename, and image must be provided");
    }
    const imageBuffer = Buffer.from(base64Image, "base64");
    const bucketName = "origninalimages1";
    const key = `${email}-${filename}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: imageBuffer,
      ContentType: `image/${filename.split(".").pop().toLowerCase()}`,
    });

    await s3Client.send(putObjectCommand);
    const keyName = `resized-${key.replace("@", "%40")}`;
    const imageUrl = `https://${bucketName}-resized.s3.amazonaws.com/${keyName}`;

    const tableName = "users-sharp-images";
    const updateCommand = new UpdateCommand({
      TableName: tableName,
      Key: { email: email },
      UpdateExpression: "SET images.#filename = :newImage",
      ExpressionAttributeNames: {
        "#filename": filename,
      },
      ExpressionAttributeValues: {
        ":newImage": imageUrl,
      },
    });

    await docClient.send(updateCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Image uploaded successfully",
        imageUrl: imageUrl,
      }),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error ",
        error: error.message,
      }),
    };
  }
};
