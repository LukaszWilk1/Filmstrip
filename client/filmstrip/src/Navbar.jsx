import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useAuth } from './auth';
import { Menu } from '@headlessui/react';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Movies', href: '/movies', current: false },
  { name: 'Series', href: '/series', current: false },
  { name: 'Search', href: '/search', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {

  const auth = useAuth();

  const location = useLocation();

  // Aktualizacja właściwości 'current' na podstawie bieżącej ścieżki URL
  navigation.forEach((item) => {
    item.current = item.href === location.pathname;
  });

  return (
    <Disclosure as="nav" className="yellow-background">
      {({ open }) => (
        <>
          <div className="w-full sm:px-6 lg:px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-[#2f2f30] hover:bg-[#b29500] hover:text-black focus:outline-none">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-[#997f00] color-black' : 'color-black hover:bg-[#b29500] hover:text-black',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <Menu as="div" className="relative ml-3 mr-3">
                  <div>
                    <Menu.Button className="relative flex rounded-md bg-[#997f00] px-4 py-1.5">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                        <div className="relative inset-y-0 right-0 flex items-center sm:static sm:inset-autoc sm:pr-0">
                          {auth.user.login}
                        </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={auth.logout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-start')}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/passwordChange"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Change Password
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/deleteAccount"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-700')}
                          >
                            Delete Account
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              
            </div>
          </div>
          

          {/* Rozwijane menu dla mniejszych ekranów */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-[#997f00] color-black' : 'color-black hover:bg-[#b29500] hover:text-black',
                    'block rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
