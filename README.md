# SweatAI - GenAI Fitness Assistant

SweatAI is your ultimate fitness companion, featuring specialized chatbots for fitness, nutrition, and sports. Leveraging advanced generative AI, SweatAI offers personalized advice and insights to help you achieve your health and fitness goals.

## Deployment

SweatAI is deployed on Vercel. You can view the live app here: [SweatAI](https://sweat-ai.vercel.app/).

## Features

- **Multi-Bot System**: Three distinct chatbots for fitness, nutrition, and sports. Each bot provides specialized advice and directs queries outside their expertise to other bots.
- **Generative AI**: Utilizes [OpenAI GPT-4](https://openai.com/research/gpt-4) for high-quality chat responses.
- **User Authentication**: Secure login with [Supabase](https://supabase.com/) for managing user sessions and storing chat histories.
- **Intuitive UI**: Built with [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), and Shadcn for a smooth and responsive user experience.

## Screenshots

<img src="https://github.com/YashPatki02/SweatAI-Workout-Assistant/blob/main/screenshots/chatbots.png" alt="Chatbots in Action" width="600" height="auto" />
<img src="https://github.com/YashPatki02/SweatAI-Workout-Assistant/blob/main/screenshots/dashboard.png" alt="Dashboard" width="600" height="auto" />
<img src="https://github.com/YashPatki02/SweatAI-Workout-Assistant/blob/main/screenshots/landing-page.png" alt="Landing Page" width="600" height="auto" />

## Getting Started

To run SweatAI locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/YashPatki02/SweatAI-Workout-Assistant.git
   cd SweatAI-Workout-Assistant
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.

## Future Plans

- [ ] OAuth Logins: Use more providers like Google and GitHub to allow signups.
- [ ] StripeAPI: Potentially add payments to allow only a certain number of chats per day (for practice only).
