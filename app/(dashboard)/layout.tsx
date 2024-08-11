import { GeistSans } from "geist/font/sans";
import "@/app/globals.css";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body className="bg-background text-foreground">
                    {children}
            </body>
        </html>
    );
}
