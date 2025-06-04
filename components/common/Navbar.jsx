"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isToolsOpen, setToolsOpen] = useState(false);
  const pathname = usePathname();

  const itemVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="w-full bg-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto lg:px-6 py-4 flex justify-between items-center px-4">
        <a href="/" className="text-primary text-2xl font-bold">
          LOCLOC’S
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex justify-center items-center space-x-12">
          <motion.ul
            className="flex space-x-10 text-foreground font-medium items-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            <MotionNavItem
              href="/"
              label="Accueil"
              pathname={pathname}
              variants={itemVariant}
            />
            <MotionNavItem
              href="/about"
              label="Qui sommes-nous ?"
              pathname={pathname}
              variants={itemVariant}
            />

            <motion.li
              className="relative group"
              variants={itemVariant}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <span
                className={`cursor-pointer relative transition  flex items-center gap-1 justify-center ${
                  pathname.includes("/outils") ? "text-primary" : ""
                } group-hover:text-primary`}
              >
                Nos outils <ChevronDown size={16} />
                <span
                  className={`absolute left-1/2 -bottom-2 w-1.5 h-1.5 rounded-full bg-primary transition duration-300 transform -translate-x-1/2 ${
                    pathname.includes("/outils")
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </span>

              <AnimatePresence>
                {isToolsOpen && (
                  <motion.ul
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SubItem
                      href="/outils/budgetloc"
                      label="BudgetLoc™"
                      onClick={() => setToolsOpen(false)}
                    />
                    <SubItem
                      href="/outils/preloc"
                      label="PréLoc™"
                      onClick={() => setToolsOpen(false)}
                    />
                    <SubItem
                      href="/outils/assurloc"
                      label="AssurLoc™"
                      onClick={() => setToolsOpen(false)}
                    />
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          </motion.ul>
        </div>

        <Link
          href="/contact"
          className="hidden md:block ml-6 px-6 py-2 ring-2 ring-primary text-primary hover:text-white rounded-full font-semibold hover:bg-primary transition"
        >
          Contactez-nous
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground cursor-pointer"
          onClick={() => setMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-6 pb-4 shadow-lg"
          >
            <ul className="flex flex-col space-y-4 text-gray-700 font-medium">
              <NavItem
                href="/"
                label="Accueil"
                pathname={pathname}
                mobile
                setMobileOpen={setMobileOpen}
              />
              <NavItem
                href="/about"
                label="Qui sommes-nous ?"
                pathname={pathname}
                mobile
                setMobileOpen={setMobileOpen}
              />
              <MobileDropdown label="Nos outils">
                <SubItem
                  href="/outils/budgetloc"
                  label="BudgetLoc™"
                  onClick={() => setMobileOpen(false)}
                />
                <SubItem
                  href="/outils/preloc"
                  label="PréLoc™"
                  onClick={() => setMobileOpen(false)}
                />
                <SubItem
                  href="/outils/assurloc"
                  label="AssurLoc™"
                  onClick={() => setMobileOpen(false)}
                />
              </MobileDropdown>

              <li onClick={() => setMobileOpen(false)}>
                <Link
                  href="/contact"
                  className="block w-full ring-2 ring-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-full text-center mt-4"
                >
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MotionNavItem({ href, label, pathname, variants }) {
  const isActive = pathname === href;

  return (
    <motion.li variants={variants}>
      <Link
        href={href}
        className={`relative transition ${
          isActive ? "text-primary" : "hover:text-primary"
        } group`}
      >
        {label}
        <span
          className={`absolute left-1/2 -bottom-2 w-1.5 h-1.5 rounded-full bg-primary transform -translate-x-1/2 transition duration-300 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />
      </Link>
    </motion.li>
  );
}

function NavItem({ href, label, mobile = false, pathname, setMobileOpen }) {
  const isActive = pathname === href;

  const handleClick = () => {
    if (mobile && setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <li>
      <Link
        href={href}
        onClick={handleClick}
        className={`relative transition ${
          isActive ? "text-primary" : "hover:text-primary"
        } ${!mobile ? "group" : ""}`}
      >
        {label}
        {!mobile && (
          <span
            className={`absolute left-1/2 -bottom-3 w-1.5 h-1.5 rounded-full bg-primary transform -translate-x-1/2 transition duration-300 ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />
        )}
      </Link>
    </li>
  );
}

function SubItem({ href, label, onClick }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="block px-4 py-2 hover:bg-blue-50 text-sm text-foreground"
      >
        {label}
      </Link>
    </li>
  );
}

function MobileDropdown({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left hover:text-primary flex items-center gap-3"
      >
        {label} <ChevronDown size={16} />
      </button>
      {open && <ul className="pl-4 mt-2 space-y-2">{children}</ul>}
    </li>
  );
}
