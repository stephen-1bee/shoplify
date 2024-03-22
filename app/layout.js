import "./globals.css"

// Import Nunito font from Google Fonts
const nunitoFontLink =
  "https://fonts.googleapis.com/css?family=Nunito:400&display=swap"

export const metadata = {
  title: "Shoplify",
  description: "An intelligent recommender system",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Link to Nunito font */}
        <link rel="stylesheet" href={nunitoFontLink} />
      </head>
      <body>{children}</body>
    </html>
  )
}
