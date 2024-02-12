import React from 'react';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';


function App() {
  
  const [midiOuts, setMidiOuts] = useState<WebMidi.MIDIOutput[]>([])
  const [selMidiOut, setSelMidiOut] = useState<WebMidi.MIDIOutput|undefined>(undefined)

  useEffect(() => { 
    async function getMidiAccess(){
      try{
        const midiAccess: WebMidi.MIDIAccess = await navigator.requestMIDIAccess()
        const midiArray = Array.from(midiAccess.outputs.values())
        setMidiOuts(midiArray)
        setSelMidiOut(midiArray[0])
      }
      catch(err){
        console.error(`MIDIの取得に失敗しました - ${err}`);
      }
    }
    getMidiAccess()
  }, [])


  const sendSampleMidi = () => {
    if (selMidiOut){
      selMidiOut.send([0x90, 69, 127])
    }
  }


  return (
    <div className="App">
      <div>
        MidiOut:
        <select onChange={val=>{
          const midiobj = midiOuts.find(elm=>elm.name === val.target.value)
          setSelMidiOut(midiobj)
        }}>
        {midiOuts.map(elm=>
          <option key={elm.id}>{elm.name}</option>
        )} 
        </select>
        <button onClick={e=>sendSampleMidi()}>Set MIDI signal</button>
      </div>
    </div>
  );
}

export default App;
