# Zesty Merch

**Zesty Merch** is a fully-featured e-commerce platform designed for advanced product customization, leveraging the power of the Canva Connect API. The platform also features a unique community-driven Design Battles system, where users can compete in design contests and have their designs rated.

## Table of Contents

- [Inspiration](#inspiration)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Challenges and Learnings](#challenges-and-learnings)
- [Future Plans](#future-plans)

## Inspiration

Zesty Merch was born out of the desire to offer more robust customization options in the world of e-commerce. The idea evolved to include a Design Battles feature, allowing users to showcase their creativity and compete against others.

## Features

- **Product Customization**: Users can fully customize products using Canva’s extensive element library.
- **Design Battles**: Users can participate in design contests, receive ratings, and compete to be crowned the winner.
- **Admin Dashboard**: Manage products, contests, newsletters, contact forms, and analytics.
- **Stripe Integration**: Secure payment processing and order management.
- **AI-Powered Image Descriptions**: Provides automated, accessible image descriptions.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB
- **APIs and Libraries**: Canva Connect API, Cloudinary, Stripe, NextAuth
- **Deployment and Hosting**: Vercel, Vercel KV, Cloudinary, MongoDB Atlas

## Setup and Installation

To get the project up and running locally, follow these steps:

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/your-username/zesty-merch.git
   cd zesty-merch
   \`\`\`

2. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Set up your environment variables (see below).

## Environment Variables

Create a `.env.local` file in the root of your project and add the following:

\`\`\`plaintext
MONGODB_URI=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_EMAIL_USERNAME=""
NEXT_PUBLIC_EMAIL_PASSWORD=""
NEXT_PUBLIC_PERSONAL_EMAIL=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
KV_URL=""
KV_REST_API_URL=""
KV_REST_API_TOKEN=""
KV_REST_API_READ_ONLY_TOKEN=""
ANALYZE=true
\`\`\`

- Replace each value with your specific configuration details.

## Running the Project

1. Run the development server:

   \`\`\`bash
   npm run dev
   \`\`\`

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Challenges and Learnings

Building Zesty Merch required overcoming challenges such as seamless integration with third-party APIs, managing complex MongoDB models, and developing an algorithm for design contests. The project strengthened my full-stack development skills, particularly in API integration, database management, and algorithm design.

## Future Plans

- Further expand product customization options.
- Introduce more complex rating systems for Design Battles.
- Enhance the AI’s image description capabilities.
- Explore partnerships to grow the platform’s reach.

## License

This project is licensed under the [MIT License](LICENSE).
