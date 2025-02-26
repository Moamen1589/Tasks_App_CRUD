import { Route, Routes } from "react-router-dom"
import MyTasks from "./Components/MyTasks"
import NavBar from "./Components/NavBar"
import TaskForm from "./Components/TaskForm"
import TaskDetials from "./Components/TaskDetials"
import UpdatedTask from "./Components/UpdateTask"
import ChangeState from "./Components/ChangeState"

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MyTasks />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/taskdetails" element={<TaskDetials />} />
        <Route path="/changestate" element={<ChangeState />} />
        <Route path="/taskupdate" element={<UpdatedTask />} />
      </Routes>
    </>
  )
}

export default App
