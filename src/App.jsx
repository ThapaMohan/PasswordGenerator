import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passRef = useRef(null)

  //useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    //validation check
    if (numberAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*()_+-[]{}~`"

    //generation of random number
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow, setPassword])//we use setPassword for the optimization


  //copying the text or numbers from the windows clippboard
  const copyToClibboard = useCallback(() => {
    //take input reference value for selection
    //for better user experience
    passRef.current?.select();

    //write the selected text to clippboard
    window.navigator.clipboard.writeText(password)
  }, [password])

  //useEffect hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, charAllow, passwordGenerator])//re-render if any changes


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-gray-800 p-4 text-orange-400'>
        <h1 className='text-white text-center my-3'>
          Password Generator</h1>
        <div className='flex shadow rounded-lg 
        overflow-hidden mb-4 p-2'>
          <input
            type='text'
            value={password}
            className='outline-none w-full bg-white  border border-gray-300  p-2 rounded-l-lg '
            placeholder='Password'
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyToClibboard}
            className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 rounded-r-lg hover:bg-blue-800 ...'
          >
            copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllow}
              id='numberInput'
              onChange={() => {
                setNumberAllow((prev) => !prev)
              }}
            />
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllow}
              id='characterInput'
              onChange={() => {
                setCharAllow((prev) => !prev)
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
