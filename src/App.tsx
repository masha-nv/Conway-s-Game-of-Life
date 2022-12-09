import './App.css';
import React, { useCallback, useRef }  from 'react'
import { TextField } from './TextField';
import { useState } from 'react';
import {gameOfLife, createGridCopy, isGridSame} from './algorythms/gameOfLife';
import { produce } from 'immer'
const numRows = 50;
const numCols = 50;

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i<numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
  });
  const [running, setRunning] = useState(false);
  const runningRef = useRef<boolean>();
  runningRef.current = running;

  const updateGrid = (rowIdx: number, cellIdx: number) => {
    const newGrid = createGridCopy(grid);
    newGrid[rowIdx][cellIdx] = newGrid[rowIdx][cellIdx] === 1 ? 0 :1;
    setGrid(newGrid)
  }

  const runSimulation = useCallback(() => {
    if(!runningRef.current) return;

    setGrid(g => {
      return produce(g, gridCopy => {
        gameOfLife(gridCopy)
      })
    })
    setTimeout(runSimulation, 1000)
  }
  ,[])



  const randomizeGrid = () => {
    const copy = createGridCopy(grid);

    for (let i = 0; i<numRows; i++) {
      for (let j = 0; j<numCols; j++) {
        const chance = Math.random();
        if (chance < 0.5) {
          copy[i][j] = 1;
        }
      }
    }
    setGrid(copy)
  }

  



 return (
  <>
  <button onClick={randomizeGrid}>Randomize Grid</button>
  {/* <button onClick={runSimulation}>Run Simulation</button> */}
    <button className='start-btn' onClick={() => {
      setRunning(!running); 
      if (!running){
        runningRef.current = true;
        runSimulation()
      }
      }}>{running ? 'stop' : 'start'}</button>
    <div className='App'>
      {grid.map((row, rowIdx) => <div key={rowIdx} className='row'>{
        row.map((cell, cellIdx) => <div onClick={() => updateGrid(rowIdx, cellIdx)} key={cellIdx} className='cell' style={{backgroundColor: grid[rowIdx][cellIdx] ? 'lightseagreen' : 'lightgray'}}></div>)
      }</div>)}
    </div>
  </>
 )
}

export default App;

