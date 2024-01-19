# YouTube notes - NoteTube

## Table of Contents

* [General info](#general-info)
* [UML Diagram](#uml-diagram)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)

## General info

The project was created to practice the usage of HTML, CSS, and JavaScript for a web technologies course. It is a static website with animations and an included contact form.

## Technologies

Project is created with:
* MongoDB
* Mongoose
* JavaScript
* FormSubmit (backend API responsible for the work of contact form)
* GoogleMaps 

## Features

* Animations implemented using IntersectionObserver.
* JavaScript developed following the Object-Oriented Programming (OOP) paradigm.
* Contact form integrated with FormSubmit.
* Image slideshow feature.
* Image carousel functionality.
* Animated arrow-down image facilitating scrolling to the next section of the page.

## Setup

To run this project, clone the repository and utilize the Live Server extension in VSCode or VSCodium, or employ other tools to run the project on a server.

Alternatively, you can use `serve` to run the project. Follow these steps:

1. Install the necessary dependencies:
```
$ npm install
$ sudo npm install -g serve
```

2. Run the project:

```
$ serve .
```

In a new console tab, open the project in Firefox by executing the following command:

```
$ firefox http://localhost:3000
```

To test the contact form, modify the destination address in the `index.html` file to your email.