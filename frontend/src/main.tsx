import * as ReactDOMClient from 'react-dom/client'
import App from './components/app/app'
import './scss/styles.scss'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOMClient.createRoot(container!)

root.render(<App />)
