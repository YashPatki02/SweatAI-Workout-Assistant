import { GeistSans } from "geist/font/sans";
import "@/app/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "SweatAI",
    description:
        "Personalized workout plans, nutrition, and coaching with AI-powered coaches.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    <Nav />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
