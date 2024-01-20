# YouTube notes - NoteTube

The web page where you can make simple notes for you favourite YouTube videos.

## Table of Contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Features](#features)
- [Setup](#setup)

## General info

The project was made as a second final project of Web Development Course.

## Technologies

Project is created with:

## Backend:

- MongoDB
- Mongoose
- Express
- jsonwebtoken
- bcryptjs
- cookie-parser
- express-async-handler
- dotenv

## Frontend:

- React
- Vite
- TailwindCSS
- react-dom
- react-icons
- react-router-dom

## Features

- simple interface of a webpage, with intuitive navigation and logic interface actions
- adding/updating/removing notes from user interface
- adding/updating/removing a single note in notes for a video from user interface
- ability to watch the youtube video while taking notes
- login/register endpoints with encrypted passwords, token as authentication method
- cookie parser extracts the cookie data from the HTTP request and converts it into a usable format that can be accessed by the server-side code

## Setup

To setup the project we should first create the `.env` files in backend directory and fill it in with

- backend

```
PORT=8080
MONGO_URI=
JWT_SECRET=
NODE_ENV =

```

## Setup Backend:

1. Install npm:

```
$ npm install

```

2. Run the project:

```
$ npm run dev
```

## Setup Frontend:

1. Install npm:

```
$ npm install

```

2. Run the project:

```
$ npm run dev
```

After providing all the commands, you will have a link in a terminal where you were setting up the fronend to the localhost. You can ctrl+click on it or write down this command to the terminal:

```
firefox http://localhost:5173/
```
