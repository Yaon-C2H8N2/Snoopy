# Snoopy
### Introduction

Snoopy is a simple webapp that aims to help you send invoices to clients.
Developped for a cleaning company that needed to specify either inside or outside cleaning services.
Add clients, services types and then create invoices for them.

### Requirements

- [Docker](https://www.docker.com/)

### Installation

Run the following command from the root of the project (where the `docker-compose.yml` file is located)

```bash
docker-compose up
```

### Usage

Open your browser and go to `http://localhost:80`

### Credits

- [Gotenberg](https://github.com/gotenberg/gotenberg) used to convert excel generated invoices to pdf.
- [NextUI](https://github.com/nextui-org/nextui) used as a component library for the frontend.
- [Nginx](https://github.com/nginx/nginx) used to host the frontend and as a reverse proxy for the backend.
- [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas) a react component to draw signatures.
