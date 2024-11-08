# [Next.js WebSocket Project](https://next-js-websocket-ebon.vercel.app/)

This is a real-time web application built with [Next.js](https://nextjs.org/), utilizing WebSockets for live updates and [Clerk](https://clerk.com/) for authentication. The frontend is deployed on Vercel, while the backend (Express server) [Backend Repository](https://github.com/Mitul30M/Backend-Server-for-Next.js-WebSocket-application) is deployed on Render.


![Group 1 (12)](https://github.com/user-attachments/assets/90d0aded-300b-4c54-8460-6f0829dd673c)



## Features

- **WebSocket Integration**: Real-time updates between the Next.js clients and the backend using WebSockets.
- **Authentication**: User authentication handled via Clerk, supporting sign-in, sign-up, and secure access to Svix WebSocket connections.
- **Clerk Integration**: Clerk is used for secure authentication, providing easy user management and SSO.
- **Deployed on Vercel and Render**: Next.js app hosted on Vercel, with the backend on Render.

## Tech Stack

- **Frontend**: Next.js (React) with TypeScript
- **Backend**: Express with Socket.IO for WebSocket support
- **Database**: Prisma with MongoDB
- **Authentication**: Clerk for user management and session handling
- **Deployment**: Serverless Architecture on Vercel (Next.js), Render (Stateful Backend)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- Clerk account for authentication setup

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```env
# Clerk environment variables
DATABASE_URL=
NEXT_PUBLIC_STATEFULL_SERVER=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
```

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mitul30M/next.js-websocket.git
   cd next.js-websocket

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install

3. **Running the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployed on Vercel
[Live Deployement](https://next-js-websocket-ebon.vercel.app)

