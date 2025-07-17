import Link from "next/link"
import { Facebook, Twitter, Linkedin, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <span className="font-extrabold text-2xl text-gray-900 dark:text-slate-100 tracking-tight">UEIEP</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Your gateway to digital income success. Empowering individuals through technology and community.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 dark:text-slate-500 hover:text-primary dark:hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 dark:text-slate-500 hover:text-primary dark:hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-500 dark:text-slate-500 hover:text-primary dark:hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-slate-200 tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#features" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-primary dark:hover:text-teal-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-slate-200 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-primary dark:hover:text-teal-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-slate-200 tracking-wider uppercase mb-4">Subscribe to our Newsletter</h3>
            <p className="text-sm mb-4">Get the latest news, articles, and resources, sent to your inbox weekly.</p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md text-gray-900 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-teal-500"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-4 py-2 bg-primary dark:bg-teal-600 text-primary-foreground dark:text-white rounded-md hover:bg-primary-hover dark:hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-primary dark:focus:ring-teal-500"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-slate-800 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Universal Employment & Income Empowerment Platform. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}