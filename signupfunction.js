import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log("handler started ");
  console.log("event data: " + JSON.stringify(event));
  try {
    const tableName = "users-sharp-images";
    let user;
    if (event && event.body) {
      user = JSON.parse(event.body);
    } else {
      user = event;
    }

    if (!user.email || !user.password || !user.name) {
      throw new Error(
        "Missing required fields: email, password, and name must be provided"
      );
    }

    const scanCommand = new ScanCommand({
      TableName: tableName,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": user.email,
      },
    });

    const scanResponse = await docClient.send(scanCommand);

    if (scanResponse.Items && scanResponse.Items.length > 0) {
      throw new Error("User with this email already exists");
    }

    const command = new PutCommand({
      TableName: tableName,
      Item: {
        ...user,
        images: {},
      },
    });

    const response = await docClient.send(command);
    console.log("user added successfully:", response);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        message: "user added  successful",
      }),
    };
  } catch (error) {
    console.error("Error adding user:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error adding user",
        error: error.message,
      }),
    };
  }
};
