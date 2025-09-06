
# ShopWave

Welcome to ShopWave, a modern, feature-rich e-commerce application built with a cutting-edge tech stack. This project serves as a demonstration of building a responsive and interactive online store, complete with AI-powered features for a personalized shopping experience.

![ShopWave Product Page](https://shopwave-ruby.vercel.app/)

## ✨ Key Features

- **Product Catalog:** Browse a grid of products with filtering by category, price range, and search term.
- **Detailed Product View:** Click on any product to see a dedicated page with a larger image, description, and purchasing options.
- **Shopping Cart:** A fully functional client-side cart to add, remove, and update product quantities.
- **User Authentication:** A mock user login/signup system to demonstrate personalized features.
- **🤖 AI-Powered Recommendations:** Logged-in users receive personalized product suggestions based on their viewing history and cart contents, powered by Genkit and Google's Gemini models.
- **🎥 AI Video Generation:** On the product details page, users can generate a unique, cinematic video showcasing the product, created on-the-fly by Google's Veo model via Genkit.
- **Responsive Design:** A beautiful and functional UI that works seamlessly across desktops, tablets, and mobile devices.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) with [Google's Gemini and Veo Models](https://deepmind.google/technologies/gemini/)
- **State Management:** React Context API & Hooks

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NathanUtkarsh2001/Shopwave.git
    cd Shopwave
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a file named `.env` in the root of your project.
    - You will need a Google AI API key to use the generative AI features. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Add your API key to the `.env` file:
      ```
      GEMINI_API_KEY=your_google_ai_api_key
      ```

4.  **Run the development servers:**
    - This project requires two development servers running concurrently: one for the Next.js app and another for Genkit.

    - **Terminal 1: Start the Next.js app:**
      ```bash
      npm run dev
      ```
      Your application will be available at [http://localhost:9002](http://localhost:9002).

    - **Terminal 2: Start the Genkit server:**
      ```bash
      npm run genkit:dev
      ```
      The Genkit development UI will be available at [http://localhost:4000](http://localhost:4000) for inspecting your AI flows.

## 🛠️ Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run genkit:dev`: Starts the Genkit development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the project files using ESLint.
