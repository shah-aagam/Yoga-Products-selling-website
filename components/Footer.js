import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="p-4 bg-[#A9D2CC] text-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-1">
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="/products">
                  All Products
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-1">
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  Shipping
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-sm hover:underline underline-offset-4" href="#">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm">© 2024 <span className="font-bold">SmartAsana</span> | <Link href="/privacy-policy" className="underline">Privacy Policy</Link></p>
    </footer>
  )
}

export default Footer
