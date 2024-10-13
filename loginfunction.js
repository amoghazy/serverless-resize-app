import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log("handler started for login check");
  try {
    let user;
    if (event && event.body) {
      user = JSON.parse(event.body);
    } else {
      user = event;
    }
    console.log("user: " + JSON.stringify(user));

    if (!user.email || !user.password) {
      throw new Error(
        "Missing required fields: email, password must be provided"
      );
    }

    const { email, password } = user;

    const tableName = "users-sharp-images";

    const command = new GetCommand({
      TableName: tableName,
      Key: {
        email: email,
      },
    });

    const response = await docClient.send(command);
    console.log("response: " + JSON.stringify(response));

    if (!response.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    if (response.Item.password !== password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid password" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful", status: "success" }),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error",
        error: error.message,
      }),
    };
  }
};
