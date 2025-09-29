"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Phone, Send } from "lucide-react";

const TikTokIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 fill-current"
  >
    <title>TikTok</title>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.86-2.32-4.2-2.06-6.52.26-2.35 1.45-4.53 3.37-5.89 1.9-1.35 4.2-1.96 6.4-1.35l.01 4.02c-1.1.17-2.18.52-3.14 1.15-.94.62-1.78 1.45-2.42 2.42-.17.25-.33.51-.48.78-.08.13-.17.26-.25.39-.08.13-.15.26-.23.39-.03.04-.06.09-.09.13-.2.33-.39.67-.56 1.02-.21.43-.38.88-.52 1.34-.13.43-.23.88-.31 1.33-.03.18-.06.36-.08.55-.02.18-.03.36-.04.54-.01.2-.01.4-.01.6.03-.18.06-.36.09-.54.03-.18.05-.36.08-.54.08-.43.2-.85.35-1.25.18-.47.4-.93.66-1.36.22-.37.47-.72.74-1.05.27-.33.57-.63.89-.9.65-.54 1.39-1 2.19-1.33.2-.08.4-.17.6-.25.26-.11.53-.21.8-.31.26-.1.53-.18.8-.26.27-.08.54-.15.82-.21.28-.06.56-.12.85-.16.58-.09 1.17-.13 1.76-.15v-4.02c-.16-.01-.32-.02-.48-.02-1.08.01-2.15.01-3.23.02z" />
  </svg>
);

const footerLinks = {
  shop: [
    { name: "Lip Balms", href: "/shop/balms" },
    { name: "Lip Glosses", href: "/shop/glosses" },
    { name: "Lip Scrubs", href: "/shop/scrubs" },
    { name: "All Products", href: "/shop" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping & Returns", href: "/shipping" },
  ],
  company: [
    { name: "Our Story", href: "/our-story" },
    { name: "Reviews", href: "/reviews" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/lipglossbaby_", icon: Instagram },
  { name: "TikTok", href: "https://tiktok.com/@lipcrush_", icon: TikTokIcon },
  { name: "WhatsApp", href: "https://wa.me/23480555973027", icon: Phone },
];

export default function Footer() {
  return (
    <footer className="bg-cyan-950 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="pb-8 border-b border-white/10 xl:grid xl:grid-cols-5 xl:gap-8">
          {/* Logo & Social */}
          <div className="space-y-6 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.jpeg"
                alt="Lipcrush Logo"
                width={40}
                height={40}
                className="rounded-full filter brightness-110"
              />
              <span
                className="font-bold text-white text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Lipcrush
              </span>
            </Link>
            <p className="text-cyan-200 text-sm sm:text-base">
              Nourishing lip care, handcrafted with love and natural ingredients.
            </p>
            <div className="flex space-x-4 sm:space-x-5">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 xl:mt-0 xl:col-span-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
              <ul className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                {footerLinks.shop.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm sm:text-base text-cyan-200 hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
              <ul className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                {footerLinks.support.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm sm:text-base text-cyan-200 hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm sm:text-base text-cyan-200 hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-10 xl:mt-0 xl:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Subscribe
            </h3>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-cyan-200">
              Get the latest news, offers, and shades weekly.
            </p>
            <form
              className="mt-4 sm:flex sm:max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-2 sm:py-2.5 text-sm sm:text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-500 sm:w-64 xl:w-full"
                placeholder="Enter your email"
              />
              <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-pink-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 border-t border-white/10 pt-6 sm:pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs sm:text-base text-cyan-300 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Lipcrush. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
