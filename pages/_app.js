import Navbar from '../components/navbar'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {useState} from "react"

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return(
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
     
  )
}

export default MyApp
