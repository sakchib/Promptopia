import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'
import Head from 'next/head'


export const metadata = {
  title: 'Promtopia',
  description: 'Discover & Share AI Prompts',
  


}

const RootLayout = ({ children }) => {
  return (

    <html>

      <body>

        <Provider >
          <div className='main'>

          </div>
          <div className='gradient' />
          <main className='app'>
            <Nav />
            {children}

          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
