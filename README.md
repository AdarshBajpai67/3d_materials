# Material Management API

This project is a Node.js application that provides an API for managing materials. It includes features for CRUD operations on materials, image uploads to Cloudinary, and data storage in MongoDB.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Create a Material](#create-a-material)
  - [Retrieve All Materials](#retrieve-all-materials)
  - [Retrieve a Material by ID](#retrieve-a-material-by-id)
  - [Update a Material](#update-a-material)
  - [Delete a Material](#delete-a-material)
- [Example Requests and Responses](#example-requests-and-responses)
- [Testing the Application](#testing-the-application)

## Features

- Create, read, update, and delete materials.
- Upload material images to Cloudinary.
- Validate data using Mongoose.
- Handle environment variables securely.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing.

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local or cloud-based, such as MongoDB Atlas)
- Cloudinary account for image uploads

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/material-management-api.git
3. **Navigate to the project directory:**

3. **Install the dependencies:**
   ```bash
   npm install

### Configuration
1. **Create a .env file in the root directory:**
   ```bash
  Add the following environment variables:

  MONGO_URL=your_mongodb_url
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  Replace your_cloud_name, your_api_key, and your_api_secret with your Cloudinary credentials.

## API ENDPOINTS

- [Base URL](#base-url)
- [Create a Material](#create-a-material)
- [Retrieve All Materials](#retrieve-all-materials)
- [Retrieve a Material by ID](#retrieve-a-material-by-id)
- [Update a Material](#update-a-material)
- [Delete a Material](#delete-a-material)

---

## Base URL

`http://localhost:3000`

## Create a Material

### URL

`/materials`

### Method

`POST`

### Description

Add a new material, including an image upload.

### Headers

`Content-Type: multipart/form-data`

### Body


- **name**: Name of the material.
- **technology**: Technology used.
- **colors**: Array of color options.
- **pricePerGram**: Price per gram.
- **applicationTypes**: Array of application types.
- **imageUrl**: Image file to upload.

## Retrieve All Materials

### URL

`/materials`

### Method

`GET`

### Description

Fetch all materials from the database, excluding image data.

### Headers

None

### Body

None

## Retrieve a Material by ID

### URL

`/materials/:id`

### Method

`GET`

### Description

Retrieve a specific material by its ID, including its associated image.

### Headers

None

### Body

None

## Update a Material

### URL

`/materials/:id`

### Method

`PUT`

### Description

Update an existing material's details, optionally updating its associated image.

### Headers

`Content-Type: multipart/form-data`

### Body

- **name**: Updated name of the material.
- **technology**: Updated technology used.
- **colors**: Updated array of color options.
- **pricePerGram**: Updated price per gram.
- **applicationTypes**: Updated array of application types.
- **imageUrl**: Optional new image file to upload.

## Delete a Material

### URL

`/materials/:id`

### Method

`DELETE`

### Description

Remove a material from the database by its ID.

### Headers

None

### Body

None

### Explanation

1. **Base URL**: Provides the base URL for the API.
2. **Create a Material**: Details the endpoint for creating a new material, including headers and body parameters.
3. **Retrieve All Materials**: Provides the endpoint for fetching all materials.
4. **Retrieve a Material by ID**: Specifies how to get a material by its unique ID.
5. **Update a Material**: Outlines the endpoint for updating a material's details.
6. **Delete a Material**: Describes how to delete a material from the database.
7. **Configuration**: Explains how to create and configure a `.env` file with necessary environment variables.
8. **Running the Server**: Provides instructions to start the server and verify that it is running.


