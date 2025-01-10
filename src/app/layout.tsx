import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Mango double thumb range slider exercises",
    description: "Interview exercises",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
