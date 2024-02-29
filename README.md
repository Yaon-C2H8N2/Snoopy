# Snoopy

# ⚠️ PASSWORDS ARE CURRENTLY STORED AS PLAIN TEXT ⚠️

For testing purposes, users need to be manually inserted in the database and passwords needed to be inserted without hashing.
Therefore this version isn't suitable for production environment.

## Introduction

Snoopy is a simple webapp that aims to help you send invoices to clients.
Developped for a cleaning company that needed to specify either inside or outside cleaning services.
Add clients, services types and then create invoices for them.

### Requirements

- [Docker](https://www.docker.com/)

## Installation

There is 2 ways to install the project:

- Either by pulling the images from the github package repository and running the containers. (This is the easiest way,
  recommended for production environments).
- Or by building the images (from the source code and the available Dockerfiles) and running the containers. (This is
  the most customizable way, recommended for development environments).

### Pull & deploy

If you want to deploy the project without modifying the source code, you can pull the images from the github packages
repository and run the containers.

Run the following command from the root of the project (where the `docker-compose.yml` file is located)

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

This should pull the images and start the following containers:

- api : containing the spring boot app that acts as the backend
- db : containing the postgresql database
- pdfconverter : containing the gotenberg pdf converter
- client : containing an nginx server that hosts the frontend and acts as a reverse proxy for the backend

### Build & deploy

In the case you want to build the images from the source code and the available Dockerfiles, then run the following
command from the root of the project (where the `docker-compose.yml` file is located)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## Usage

Open your browser and go to `http://localhost:80`

## Credits

- [Gotenberg](https://github.com/gotenberg/gotenberg) used to convert excel generated invoices to pdf.
- [NextUI](https://github.com/nextui-org/nextui) used as a component library for the frontend.
- [Nginx](https://github.com/nginx/nginx) used to host the frontend and as a reverse proxy for the backend.
- [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas) a react component to draw signatures.
