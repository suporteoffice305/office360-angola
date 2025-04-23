
import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const menus = [
    { name: 'Home', link: '/' },
    { 
      name: 'Licenças Windows', 
      link: '#', 
      submenu: [
        { name: 'Windows 10 Pro', link: '/produto/windows10pro' },
        { name: 'Windows 11 Pro', link: '/produto/windows11pro' },
      ]
    },
    { 
      name: 'Office 365', 
      link: '#', 
      submenu: [
        { name: 'Business Basic', link: '/produto/office365basic' },
        { name: 'Business Premium', link: '/produto/office365premium' },
      ]
    },
    { name: 'Planos', link: '/planos' },
    { name: 'Sobre', link: '/sobre' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-darkblue">Office365</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 items-center">
              {menus.map((menu) => (
                <li key={menu.name} className="relative group">
                  {menu.submenu ? (
                    <button
                      className="text-gray-700 hover:text-darkblue font-medium flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(menu.name);
                      }}
                    >
                      {menu.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      to={menu.link}
                      className="text-gray-700 hover:text-darkblue font-medium"
                    >
                      {menu.name}
                    </Link>
                  )}
                  
                  {menu.submenu && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                      <div className="py-1">
                        {menu.submenu.map((submenu) => (
                          <Link
                            key={submenu.name}
                            to={submenu.link}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-darkblue"
                          >
                            {submenu.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-4">
              <Link to="/carrinho" className="relative text-gray-700 hover:text-darkblue">
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-darkblue">{getTotalItems()}</Badge>
                )}
              </Link>
              <Link to="/login">
                <User className="h-6 w-6 text-gray-700 hover:text-darkblue" />
              </Link>
              <Button asChild className="bg-darkblue hover:bg-blue-800 text-white">
                <Link to="/planos">Ver Planos</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation Icons */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/carrinho" className="relative text-gray-700">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-darkblue">{getTotalItems()}</Badge>
              )}
            </Link>
            <Link to="/login">
              <User className="h-5 w-5 text-gray-700" />
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-darkblue focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                  {menu.submenu ? (
                    <button
                      className="block text-gray-700 hover:text-darkblue font-medium w-full text-left"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(menu.name);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{menu.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 transition-transform ${activeSubmenu === menu.name ? 'transform rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <Link
                      to={menu.link}
                      className="block text-gray-700 hover:text-darkblue font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {menu.name}
                    </Link>
                  )}
                  
                  {menu.submenu && activeSubmenu === menu.name && (
                    <div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-200">
                      {menu.submenu.map((submenu) => (
                        <Link
                          key={submenu.name}
                          to={submenu.link}
                          className="block text-gray-600 hover:text-darkblue"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {submenu.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button asChild className="bg-darkblue hover:bg-blue-800 text-white w-full">
                <Link to="/planos" onClick={() => setIsMenuOpen(false)}>Ver Planos</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
