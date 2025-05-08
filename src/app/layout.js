import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto({
    variable: "--font",
    subsets: ["latin"],
});
  
export const metadata = {
    title: "My Exam Mockup",
    icons: {
        icon: "/icons/favicon.ico",
      },    
    description: "Projeto pra mostrar tudo que eu sei",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body className={font.variable}>{children}</body>
        </html>
    );
}
