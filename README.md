# Serverless Resize App

![Serverless Resize App](https://assets.intersystems.cn/dims4/default/b9afc6f/2147483647/strip/true/crop/780x422+0+0/resize/780x422!/format/webp/quality/90/?url=http%3A%2F%2Finter-systems-brightspot.s3.amazonaws.com%2F26%2Fbd%2F6a6aa762425f87ad7d5c2fe65f8c%2Fawslogo-image.jpg)

## Overview

The **Serverless Resize App** is a serverless application that allows users to upload images, resize them, and download the resized versions. Built using AWS services, this app leverages the scalability and flexibility of a serverless architecture.

## Architecture

This application utilizes the following AWS services:

- **IAM**: Manages permissions and roles for secure access control.
- **S3**: Stores the original and resized images.
- **API Gateway**: Exposes a RESTful API for uploading and accessing images.
- **AWS Lambda**: Processes image uploads and handles resizing operations.
- **CloudFront**: Provides a CDN for faster access to resized images.
- **CloudWatch Logs**: Monitors and logs application performance and errors.
- **DynamoDB**: Stores metadata about uploaded images and user information.

## Features

- **Image Upload**: Users can upload images through a web interface.
- **Image Resizing**: Automatically resizes images upon upload.
- **Download Resized Images**: Users can download the resized images securely.
- **Logging**: Monitors operations with detailed logging in CloudWatch.
- **Metadata Storage**: Stores image metadata in DynamoDB.

## Getting Started

### Prerequisites

- AWS Account


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amoghazy/serverless-resize-app.git
   cd serverless-resize-app
  
   ```



### Static Names
  - table name
  - s3 buckt name for images
  - s3 name  images-resized

### IAM Roles

Ensure the following IAM roles are configured for the application:

- **Lambda Execution Role**: Grants necessary permissions for Lambda functions to access S3, DynamoDB, and CloudWatch.
- **S3 Bucket Policy**: Allows public access for retrieving resized images through CloudFront.
- 

### CloudFront Configuration

Set up a CloudFront distribution to serve your S3 bucket's resized code host. This improves load times and enhances user experience.

### Usage

1. Navigate to the deployed API endpoint.
2. Upload an image using the provided form.
3. Wait for the image to be processed.
4. Download the resized image using the link provided.

### Monitoring and Logging

The application logs all operations to CloudWatch Logs. You can monitor performance, view logs, and troubleshoot issues directly from the AWS Management Console.

### DynamoDB Schema

| Attribute Name  | Data Type | Description                                       |
|------------------|-----------|---------------------------------------------------|
| `email`          | String    | Partition key, email of the user                 |
| `name`           | String    | Name of the user                                  |
| `password`       | String    | User's password (consider encrypting it)         |
| `images`         | Map       | Stores all images for the user, with image IDs as keys and image metadata (like URL, size) as values |


### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.


- Ahmed Moghazy
Thank you for using the Serverless Resize App!



