import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 text-center">
      <main className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl font-extrabold text-indigo-200">404</div>
            </div>
            <div className="relative z-10 text-6xl font-bold text-indigo-600 animate-bounce">
              Oops!
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for seems to have vanished into the digital void.
        </p>
        
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-indigo-200 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-8">
          While you're here, why not explore our React and Tailwind CSS courses?
        </p>
        
        <Link href="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full inline-flex items-center transition-colors duration-300">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back Home
          </Button>
        </Link>
      </main>
      
      <footer className="mt-12 text-sm text-gray-400">
        © {new Date().getFullYear()} Your Course Platform. All rights reserved.
      </footer>
    </div>
  )
}