# Simple Register Login Frontend

> [!IMPORTANT]
> Under development

## Description

This Angular project uses my [Java backend project](https://github.com/Deniel11/simple-register-login-backend). If you don't have a backend project or you don't want to create another, you can use my backend project.

What the project can do:
- Use an API which has register, login, verify email, forgot password, change password endpoints.
- Display these endpoints.
- Validate input data.
- Display error messages.
- Utilizes a translate module (English, Hungarian).

> For now, the translate module works with every component, but the error messages work only at the registration part because every backend is different.

## Development Server

For the initial setup, install the Angular CLI by running:
```bash
npm i @angular/cli
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Everything else is the same as other Angular commands, so you can use `ng help`.

## Installation

This frontend application can be containerized using Docker. If you haven't installed Docker yet, you can find instructions [here](https://docs.docker.com/get-docker/).

Build the Docker image with the following command:
```bash
docker build -t [image name] .
```

Start the Docker container in detached mode, mapping port 4200 on the host to port 4200 in the container:
```bash
docker start -d -p 4200:4200 [image name]
```

After successful execution, you can access the application at `http://localhost:4200/`.

## Usage

After configuring the application and ensuring it is connected to your backend and SQL server, you can use the application.

Access the application using the following URLs:

- Base URL: `http://localhost` or `[your domain name]`
- Start/Login Page: `[domain]/login`
- Register Page: `[domain]/register`
- Verify Email Page: `[domain]/verify-email`
- Forgot Password Page: `[domain]/forgot-password`
- Change Password Page: `[domain]/change-password`