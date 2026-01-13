import { useCallback, useEffect, useState } from 'react'
function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    for(let i=0;i<length;i++){
      let ch = Math.floor(Math.random() * str.length + 1)
      pass+= str.charAt(ch)
    }

    setPassword(pass)
  },[length, setPassword])

  useEffect(() => {
    generatePassword()
  }, [length, generatePassword])

  return (
    <div className='w-full max-w-md p-5 bg-gray-700 mx-auto my-12 rounded-lg text-cyan-500'>
      <h1 className='text-xl text-white font-bold text-center mb-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-gray-800'>
        <input
          type="text"
          className="outline-none w-full py-1 px-3 text-white"
          value={password}
          readOnly
        />
        <button
          className='outline-none bg-green-500 text-white px-3 py-0.5 shrink-0 hover:bg-green-600 hover:cursor-pointer'
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
      </div>
    </div>
  )
}

export default App
