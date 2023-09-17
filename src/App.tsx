import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage'
import TrashPage from './pages/TrashPage'
import { Link, Route, Routes } from "react-router-dom"
import NavBar from './features/navbar/index'
import { Box, ChakraProvider } from '@chakra-ui/react';
import { defaultTheme } from './themes/defaultTheme';
import { query, collection, onSnapshot } from 'firebase/firestore'
import { db } from './firebase';
import { useTasksStore } from './data/TasksStore'
import { Task } from './utils/task';

// Let`'s make a to do app with Zustand. 

// For next project, let's make a gallery page that looks like instagram. 
// Then A page that plays music. 

function App() {
  let setTasks = useTasksStore(store => store.setTasks)
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr: Task[] = []
      querySnapshot.forEach((doc) => {
        let task = Task.load(doc)
        // task.id = doc.id
        todosArr.push(task)
      })
      setTasks(todosArr)
    })
    return () => unsubscribe()
  }, [])

  return (
    <ChakraProvider theme={defaultTheme}>
        <NavBar />
        <Box className='py-20'>
          <Routes>
              <Route path="/" element={<HomePage />} /> 
              <Route path="/Trash" element={<TrashPage />} /> 
          </Routes>
        </Box>
    </ChakraProvider>
  );
}

export default App;