import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)

  const passwordRef = useRef()

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numAllowed) str += '0123456789'
    if (charsAllowed) str += '!@#$%^&*()_+~`|'

    for(let i=0;i<length;i++){
      let ch = Math.floor(Math.random() * str.length + 1)
      pass+= str.charAt(ch)
    }

    setPassword(pass)
  },[length, numAllowed, charsAllowed, setPassword])

  const copyPass = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    generatePassword()
  }, [length, numAllowed, charsAllowed])

  return (
    <div className='w-full max-w-lg p-5 bg-gray-700 mx-auto my-12 rounded-lg text-cyan-500'>
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
          onClick={copyPass}
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-3.5'>
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
        <div className='flex items-center gap-x-1'>
          <input 
            id='numberInput'
            type="checkbox"
            checked={numAllowed}
            onChange={() => setNumAllowed(prev => !prev)}
           />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            id='charInput'
            type="checkbox"
            checked={charsAllowed}
            onChange={(e) => setCharsAllowed(e.target.checked)}
           />
          <label htmlFor='charInput'>Special Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
