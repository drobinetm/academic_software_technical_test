# Academic software technical test

![React 17](https://img.shields.io/badge/React-17-61dafb?logo=react&logoColor=white)
![Material UI v4](https://img.shields.io/badge/Material_UI-v4-0081cb?logo=mui&logoColor=white)
![React Router v5](https://img.shields.io/badge/React_Router-v5-ca4245?logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5a29e4?logo=axios&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Validation-3068b7)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel&logoColor=white)
![Vercel Production Deploy](https://img.shields.io/github/actions/workflow/status/drobinetm/academic_software_technical_test/vercel-production.yml?branch=main&label=vercel%20production)
![Last commit](https://img.shields.io/github/last-commit/drobinetm/academic_software_technical_test/main)

This repository contains a React 17 single-page application for authentication,
customer management, theme switching, and production-oriented deployment with
Vercel.

## Overview

The application includes the following flows:

- Login and register.
- Session persistence and protected routes.
- Customer search, create, update, and delete.
- Interest catalog loading.
- Light, dark, and system themes.
- Development proxy support for the backend API.

The frontend is built with Material UI v4 and follows a dashboard-style
interface aligned with the project screenshots and requirements in
`specs/tasks.md`.

## Stack

The project uses the following main technologies:

- React 17
- Create React App
- Material UI v4
- React Router DOM v5
- Axios
- Zod

## Getting started

Install the dependencies first.

```bash
npm install
```

Start the development server.

```bash
npm start
```

The application runs at `http://localhost:3000`.

## Available scripts

Use these scripts during development and deployment.

- `npm start`: starts the development server.
- `npm run build`: builds the production bundle.
- `npm test`: runs the CRA test runner.

## API and development proxy

The application uses Axios through `src/services/api/client.js`.

In development, requests are proxied through the CRA dev server by
`src/setupProxy.js`, which forwards `/Api/*` to:

- `https://pruebareactjs.test-class.com`

In non-development environments, the client uses the production API base URL
directly.

## Theme support

The application supports three theme modes:

- Light
- Dark
- System

Theme selection is persisted in local storage and applied to public and private
screens.
