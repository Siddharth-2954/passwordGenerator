import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");


  
  //useRef hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (characters) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, characters, setPassword]);

  const copyToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
  }, [])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, characters, passwordGenerator]);



  return (
    <>
      <div className="w-full max-w-2xl mx-auto text-3xl text-center shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600">

        <h1 className="text-white text-center">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyToClipboard} 
          className="outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>


        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label className="text-2xl">Length: {length}</label>
          </div>



          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label className="text-2xl" htmlFor="numberInput">Numbers</label>
          </div>


          <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={characters}
                id="characterInput"
                onChange={() => {
                  setCharacters((prev) => !prev);
                }}
              />
              <label className="text-2xl" htmlFor="characterInput">Characters</label>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
