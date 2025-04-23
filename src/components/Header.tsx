
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const menus = [
    { name: 'Home', link: '#' },
    { 
      name: 'Licenças Windows', 
      link: '#', 
      submenu: [
        { name: 'Windows 10 Pro', link: '#' },
        { name: 'Windows 11 Pro', link: '#' },
      ]
    },
    { 
      name: 'Office 365', 
      link: '#', 
      submenu: [
        { name: 'Business Basic', link: '#' },
        { name: 'Business Premium', link: '#' },
      ]
    },
    { name: 'Suporte', link: '#' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-darkblue">Office360</a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 items-center">
              {menus.map((menu) => (
                <li key={menu.name} className="relative group">
                  <a
                    href={menu.link}
                    className="text-gray-700 hover:text-darkblue font-medium flex items-center"
                    onClick={(e) => {
                      if (menu.submenu) {
                        e.preventDefault();
                        toggleSubmenu(menu.name);
                      }
                    }}
                  >
                    {menu.name}
                    {menu.submenu && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>
                  {menu.submenu && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                      <div className="py-1">
                        {menu.submenu.map((submenu) => (
                          <a
                            key={submenu.name}
                            href={submenu.link}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-darkblue"
                          >
                            {submenu.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <Button className="bg-darkblue hover:bg-blue-800 text-white">Fale Conosco</Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-darkblue focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 shadow-sm">
          <div className="container">
            <ul className="space-y-4">
              {menus.map((menu) => (
                <li key={menu.name}>
                  <a
                    href={menu.link}
                    className="block text-gray-700 hover:text-darkblue font-medium"
                    onClick={(e) => {
                      if (menu.submenu) {
                        e.preventDefault();
                        toggleSubmenu(menu.name);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{menu.name}</span>
                      {menu.submenu && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 transition-transform ${activeSubmenu === menu.name ? 'transform rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </a>
                  {menu.submenu && activeSubmenu === menu.name && (
                    <div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-200">
                      {menu.submenu.map((submenu) => (
                        <a
                          key={submenu.name}
                          href={submenu.link}
                          className="block text-gray-600 hover:text-darkblue"
                        >
                          {submenu.name}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button className="bg-darkblue hover:bg-blue-800 text-white w-full">Fale Conosco</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
