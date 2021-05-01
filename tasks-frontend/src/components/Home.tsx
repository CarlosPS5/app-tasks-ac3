import {FC, useEffect,useState} from 'react'
import {task} from '../models/models'
import {getTasks,createTask, getTaskById, updateTask, removeTask} from '../services/taskService'
import {getUsers, removeUser} from '../services/authService'
import Modal from 'react-modal'
import {Header} from './ui/Header'
import './home.css'

export const Home:FC<any> = (props):JSX.Element => {

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

      const customStylesUser = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          width                 : '60%'
        }
      };
      Modal.setAppElement('#root')

      const [userModalIsOpen, setUserIsOpen] = useState(false)
      const [users, setUsers] = useState<any[]>([])

      const openUserModal = async () => {
          const res = await getUsers()
          setUsers(res.data.data)
          setUserIsOpen(true)
      }

      const closeUserModal = () => {
          setUserIsOpen(false)
      }

    const [editModalIsOpen,setEditIsOpen] = useState(false);
    const [taskEdit, setTaskEdit] = useState<task>({
        title: '',
        description: '',
        is_public: false,
        _id: ''
    })

    function openModal() {
        setEditIsOpen(true);
    }

    function closeModal(){
        setEditIsOpen(false);
    }

    const openEditModal = async(id:any) => {
        const response = await getTaskById(id)
        setTaskEdit({
            title: response.data.data.title,
            description: response.data.data.description,
            is_public: response.data.data.is_public,
            _id: response.data.data._id
        })
        setEditIsOpen(true)

    }

    const [task, setTask] = useState<task>({
        title: '',
        description: '',
        is_public: false,
    })
    const [tasks, setTasks] = useState<task[]>([])

    useEffect(() => {
        const fetchTasks = async() => {
            const response = await getTasks()
            setTasks(response.data.data)
        }
        fetchTasks()

    }, [editModalIsOpen,userModalIsOpen])

    const generateTask = async () => {
        const res = await createTask(task)
        if(res.data.code === 200) {
            setTasks([...tasks,{...res.data.data}])
            setTask({
                title: '',
                description: '',
                is_public:false
            })
        } else {

        }
        
    }

    const deleteUser = async (id:any) => {
        const res = await removeUser(id)
        if(res.data.code === 200) {
            let aux = users.filter(user => user._id !== id)
            setUsers(aux)
        }

    }

    const editTask = async () => {
        await updateTask(taskEdit)
        closeModal()
    }

    const deleteTask = async (id:any) => {
        await removeTask(id)
        openModal()
        closeModal()
    }

    return(
        <div className="home__container">
            <Header user={localStorage.getItem('username')} setLogged={props.setLogged} openUserModal={openUserModal} />
            <div className="home__container--tasks">

            <Modal
                isOpen={userModalIsOpen}
                onRequestClose={closeUserModal}
                style={customStylesUser}
                contentLabel="Users Modal"
                >
                    <div className="users__modal">
                        <h1>USERS LIST</h1>
                        <div className="users__list">
                            {users.map(user => <div className="row__list" key={user._id}><span>{user.username}</span><span onClick={() => deleteUser(user._id)} className="delete__button__user">DELETE</span></div>)}
                        </div>
                    </div>
            </Modal>

            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                    <div className="task__generator">
                        <p className="edit__modal--header">EDIT TASK<span className="exit__button--modal" onClick={closeModal}>X</span></p>
                        <div className="task__generator--title">
                            <span>Title</span>
                            <input type="text" value={taskEdit?.title} onChange={(e) => setTaskEdit({...taskEdit, title: e.target.value})}/>
                        </div>

                        <div className="task__generator--description">
                            <span>Description</span>
                            <input type="text" value={taskEdit?.description} onChange={(e) => setTaskEdit({...taskEdit, description: e.target.value})}/>
                        </div>

                        <div className="task__generator--public">
                            <span>Public</span>
                            <input type="checkbox" defaultChecked={taskEdit?.is_public? true : false} onChange={() => setTaskEdit({...taskEdit, is_public: !taskEdit.is_public})}/>
                        </div>

                        <button className="create__task" onClick={editTask}>Edit TASK</button>
                    </div>
                </Modal>
                <div className="task__viewer">
                    <p>TASKS</p>
                    <ul>
                        {tasks.map((task,i) => <div className="task__viewer--card" key={task._id}>
                            <span>{task.title}</span>
                            <span className="subtitle">{task.description}</span>
                            <span className="author">{task.user}</span>
                            {localStorage.getItem('username') === task.user
                            ?
                            <div className="botonera">
                            <span><button className="edit__button" onClick={() => openEditModal(task._id)}>Edit</button></span>
                            <span><button className="remove__button" onClick={() => deleteTask(task._id)}>Delete</button></span>
                            </div>
                            :
                            false}
                        </div>)}
                    </ul>
                    
                </div>
                <div className="task__generator">
                    <p>CREATE TASK</p>
                    <div className="task__generator--title">
                        <span>Title</span>
                        <input type="text" value={task.title} onChange={(e) => setTask({...task,title:e.target.value})}/>
                    </div>

                    <div className="task__generator--description">
                        <span>Description</span>
                        <input type="text" value={task.description} onChange={(e) => setTask({...task,description:e.target.value})} />
                    </div>

                    <div className="task__generator--public">
                        <span>Public</span>
                        <input type="checkbox" defaultChecked={task.is_public? true : false} onChange={(e) =>setTask({...task,is_public:!task.is_public}) }/>
                    </div>

                    <button className="create__task" onClick={generateTask}>Create TASK</button>
                </div>
                
            </div>
        </div>
    )
}