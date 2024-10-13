import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dClient);
export const handler = async (event) => {
  try {
    console.log("start event handler");
    console.log("event data: " + JSON.stringify(event));
    const email = event?.pathParameters?.email || event?.email;
    const tableName = "users-sharp-images";
    const getCommand = new GetCommand({
      TableName: tableName,
      Key: { email: email },
    });

    const getResponse = await docClient.send(getCommand);
    const user = getResponse.Item;

    if (!user) {
      throw new Error("User not found");
    }
    const images = user.images;
    console.log("images found", images);
    return {
      statusCode: 200,
      body: JSON.stringify(images),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching images");
  }
};
