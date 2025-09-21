import Sidebar from './components/Sidebar';
import './globals.css'; // Assuming this is where your Tailwind imports are

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Custom CSS variables for color scheme */}
        <style>{`
          :root {
            --background-light: #F8F8F8;
            --background-dark: #FFFFFF;
            --text-dark: #262626;
            --card-light: #EFEFEF;
            --accent-orange: #FF9900;
            --accent-yellow: #FFC700;
          }
        `}</style>
      </head>
      <body className="flex font-sans">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}