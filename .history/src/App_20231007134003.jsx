import { useState } from 'react'

import './App.css'

function App() {

  const [count, setCount] = useState(0)

  return (
    <div>

      <h1>LFG!!!!</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>Click me</button>

    </div>
      
  )
}

export default App
