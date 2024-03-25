# Secure Online Voting App - VoiceBox

VoiceBox is a secure online voting application using AES-256-GCM Encryption to encrypt voting result. Combining modern technology with robust security practices, VoiceBox ensures that each vote is counted and protected, providing a transparent and reliable platform.

## Features

- Secure Login: Each voter is authenticated with a unique ID and password combination.
- Secure Voting: Votes are encrypted using AES-256-GCM, ensuring the secrecy and integrity of each vote.
- Real-Time Tally: Election results are tallied in real-time, with a secure backend process to decrypt and count votes.
- Accessibility: A user-friendly interface that is accessible on various devices and screen sizes.
- Audit Trail: Comprehensive logging for system transparency and auditability.

## Prerequisites

### Install Node JS

Install nodejs via https://nodejs.org/en/

### Install create-react-app

Use the following command to install create-react-app:

```
npm install -g create-react-app
```

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Then in the project folder, type the following command to install all npm packages:

```
npm install
```

In order to run the application, run the following command:

```
npm start
```

## Configuration

Create a `.env` file in `/server` root and configure your application by specifying your database details and secret keys:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
ENCRYPTION_PASSWORD=your_encryption_key
```

## To run the server

```
npm start
```

## To run the client

```
cd client
npm start
```

The server runs on http://localhost:5000 by default, and the client runs on http://localhost:3000.

## Usage

After logging in, voters will be able to:

1. Choose candidates from a list of available options.
2. Confirm their choice before submission.
3. View real-time election results once their vote is submitted.

Admins can:

1. Log in to access the dashboard.
2. View and manage the election status.
3. Tally votes securely.

## Contribution

Contributions to the VoiceBox project will be welcomed.

## License

This project is licensed under the MIT License.
