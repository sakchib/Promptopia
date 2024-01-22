'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Modal = ({ setModal }) => {
  return (
    <>
      <div className="flex justify-center items-center  inset-0 z-10 w-screen h-screen bg-white flex-col gap-4 fixed">

        <button className="absolute top-6 right-10 font-semibold text-xl font-mono"
          onClick={() => setModal(false)}
        >
          X
        </button>
        <button
          onClick={() => signIn('google')}
          className=" h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
          <div className="relative flex items-center space-x-4 justify-center">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className=" left-0 w-6" alt="google logo" />
            <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
          </div>
        </button>
        <button
          onClick={() => signIn('github')}
          className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
          <div className="relative flex items-center space-x-4 justify-center">
            <img src="https://www.svgrepo.com/show/448225/github.svg" className=" left-0 w-8 " alt="google logo" />
            <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Github</span>
          </div>
        </button>
      </div>
    </>
  )
}




const Nav = () => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [modal, setModal] = useState(false)


  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response);
    }
    setUpProviders();
  }, [])
  return (


    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="felx gap-2 flex-center" >
        <Image
          alt="Promptopia Logo"
          width={30}
          height={30}
          src={'./assets/images/logo.svg'}
        />

        <p className="logo_text">
          Promptopia
        </p>
      </Link>



      {/* Desktop navigation */}

      <div className="sm:flex hidden">
        {
          session?.user ?
            (
              <div className="flex gap-3 md:gap-5">
                <Link href={'/create-prompt'}
                  className="black_btn"
                >
                  Create Post
                </Link>
                <button type="button" onClick={() => {
                  setModal(false); signOut()
                }} className="outline_btn ">
                  Sign Out
                </button>

                <Link href={'/profile'}>
                  <Image
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                  />
                </Link>

              </div>
            ) : (
              <>{!modal ? (

                <button className="black_btn"
                  onClick={() => setModal(true)}
                >
                  Sign In
                </button>)
                :
                <Modal setModal={setModal} />
              }</>
            )
        }
      </div>

      {/* mobile navigation  */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => { setToggleDropdown((prev) => !prev) }}
              />

              {
                toggleDropdown && (
                  <div className="dropdown">
                    <Link className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                      href={'/profile'}>
                      My Profile
                    </Link>
                    <Link className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                      href={'/create-prompt'}>
                      Create Prompt
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setModal(false)
                        setToggleDropdown(false)
                        signOut()
                      }}
                      className="nt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <>
              {!modal ? (

                <button className="black_btn"
                  onClick={() => setModal(true)}
                >
                  Sign In
                </button>)
                :
                <Modal setModal={setModal} />
              }
            </>

          )
        }
      </div>



    </nav>
  )
}

export default Nav
