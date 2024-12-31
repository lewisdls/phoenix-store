import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-14 px-8">
      <div className="grid text-center gap-4 md:text-left md:grid-cols-4 md:gap-0">
        {/* Brand Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">PHOENIX</h1>
          <p className="text-sm">Ignite Your Style</p>
        </div>
        <div className="mb-4 md:mb-0 row-span-2 self-center">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
            <Link href="/about" className="hover:underline">
              About Us{" "}
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4 md:mb-0 row-span-2 self-center">
          <p>123 Phoenix Ave, Fashion City</p>
          <p>support@phoenixclothing.com</p>
          <p>+1 (123) 456-7890</p>
        </div>
        <div className="flex space-x-4 row-span-2 self-center justify-self-center md:justify-self-start">
          <Link href="#">
            <FaInstagram className="w-6 h-6" />
          </Link>
          <Link href="#">
            <FaWhatsapp className="w-6 h-6" />
          </Link>
        </div>
        {/* Copyright */}
        <div className="mt-8">
          <p className="text-sm">
            © {new Date().getFullYear()} PHOENIX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
