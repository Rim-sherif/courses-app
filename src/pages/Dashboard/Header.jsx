import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

// Define the Header component as a function
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-sm bg-white/80 shadow-md border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* ... rest of your existing code ... */}
        <div className="flex items-center gap-x-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            aria-label="Open main menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <a href="/" className="flex items-center gap-x-2">
            <img 
              src="/logo.svg" 
              alt="Company logo" 
              className="w-8 h-8 text-blue-600"
              aria-hidden="true"
            />
            <span className="hidden sm:inline text-xl font-semibold text-gray-900">Dashboard</span>
          </a>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <form role="search">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                aria-label="Search dashboard"
                className="w-full px-4 py-2 bg-gray-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:shadow-sm"
              />
              <svg 
                className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-x-4">
          {/* Notifications */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
            aria-label="Notifications"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Messages Menu */}
          <Menu as="div" className="relative">
            <Menu.Button 
              className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
              aria-label="Messages"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white"></span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 divide-y divide-gray-100 focus:outline-none">
                {/* ... rest of the menu items ... */}
              </Menu.Items>
            </Transition>
          </Menu>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-x-2 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors">
              <div className="w-9 h-9 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                M
              </div>
              <span className="hidden sm:inline-block text-gray-700 font-medium">John Doe</span>
              <svg 
                className="w-4 h-4 text-gray-600" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1.5 focus:outline-none divide-y divide-gray-100">
                {/* ... rest of the user menu items ... */}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;