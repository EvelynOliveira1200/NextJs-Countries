import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}
