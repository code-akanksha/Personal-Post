import "./globals.css";
import Nav from "./auth/Nav"
import { Roboto } from "@next/font/google"
import QueryWrapper from "./auth/QueryWrapper";
import {Toaster} from "react-hot-toast"


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-roboto",
})

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      {
         /* <head /> */
      }
      <head/>
      <body className={'mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-gray-200'}>
          <QueryWrapper>
          <Nav />
          {children}
          </QueryWrapper>
      </body>
      </html>
  )
}