import { Navbar } from "."

export const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div className="h-screen">
        {children}
      </div>
    </div>
  )
}

