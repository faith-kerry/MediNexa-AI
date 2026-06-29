import Link from "next/link";
import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-black text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">

        <div>
          <div className="flex items-center gap-3 mb-4">

            <HeartPulse className="text-primary" />

            <h2 className="text-2xl font-bold">
              MediNexa AI
            </h2>

          </div>

          <p className="text-gray-400 max-w-sm">
            Bridging healthcare gaps through artificial intelligence,
            multilingual communication and digital innovation.
          </p>

        </div>

        <div className="space-y-3">

          <h3 className="font-bold">
            Quick Links
          </h3>

          <Link href="/" className="block hover:text-primary">
            Home
          </Link>

          <Link href="#features" className="block hover:text-primary">
            Features
          </Link>

          <Link href="#about" className="block hover:text-primary">
            About
          </Link>

          <Link href="#contact" className="block hover:text-primary">
            Contact
          </Link>

        </div>

        <div>

          <h3 className="font-bold mb-4">
            Contact
          </h3>

          <p>info@medinexa.ai</p>

          <p>Nairobi, Kenya</p>

        </div>

      </div>

      <div className="text-center mt-12 text-gray-500">
        © 2026 MediNexa AI. All Rights Reserved.
      </div>
    </footer>
  );
}