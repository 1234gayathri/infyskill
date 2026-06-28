'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="block px-4 py-2 hover:text-accent-blue transition-colors duration-300">
      {children}
    </Link>
  </li>
);

const Dropdown = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <li className="relative group">
    <a href="#" className="flex items-center px-4 py-2 hover:text-accent-blue transition-colors duration-300">
      {title} <i className="fas fa-chevron-down ml-2 text-xs"></i>
    </a>
    <ul className="absolute left-0 mt-2 w-48 bg-secondary-dark rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
      {children}
    </ul>
  </li>
);

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes('token=');
    setLoggedIn(token);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    setLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-dark/80 backdrop-blur-sm text-white transition-all duration-300 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
          InfySkill
        </Link>

        <div className={`md:flex items-center space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <Dropdown title="Academics">
              <NavLink href="/courses">Courses</NavLink>
              <NavLink href="/workshops">Workshops</NavLink>
              <NavLink href="/webinars">Webinars</NavLink>
            </Dropdown>
            <Dropdown title="Services">
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/create-resume">Create Resume</NavLink>
              <NavLink href="/code">Code Editor</NavLink>
            </Dropdown>
            <NavLink href="/insights">Insights</NavLink>
            <NavLink href="/careers">Careers</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </ul>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary-dark">
          <ul className="flex flex-col items-center py-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/workshops">Workshops</NavLink>
            <NavLink href="/webinars">Webinars</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/create-resume">Create Resume</NavLink>
            <NavLink href="/code">Code Editor</NavLink>
            <NavLink href="/insights">Insights</NavLink>
            <NavLink href="/careers">Careers</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </ul>
        </div>
      )}
    </header>
  );
}
