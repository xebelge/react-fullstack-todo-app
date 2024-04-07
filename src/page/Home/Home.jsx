import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/auth-service';
import { auth, database } from "../../firebase-config";
import { ref, push, onValue, remove, update } from 'firebase/database';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './index.css';
import CreateTodo from '../../components/Todo/CreateTodo';
import TodoList from '../../components/Todo/TodoList';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState({ image: null, file: null });
    const imageRef = useRef(null);
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const userId = auth.currentUser.uid;

    useEffect(() => {
        const todosRef = ref(database, `todos/${userId}`);
        onValue(todosRef, (snapshot) => {
            const data = snapshot.val();
            const todos = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setTasks(todos);
        });
    }, [userId]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            const file = files[0];
            setFiles(prevState => ({ ...prevState, [name]: file }));
        } else {
            if (name === 'task') setTask(value);
            if (name === 'category') setCategory(value);
        }
    };

    const createTask = (task, category, imagePath = '', filePath = '', imageUrl, fileUrl) => {
        if (task.trim() === '') {
            alert("Task can't be empty");
            return;
        }
        const todosRef = ref(database, `todos/${userId}`);
        push(todosRef, { task, category, isCompleted: false, imagePath, filePath, imageUrl, fileUrl });
    };

    const editTask = (id, newTask, newCategory, newImagePath, newFilePath, newImageUrl, newFileUrl) => {
        const todoRef = ref(database, `todos/${userId}/${id}`);
        update(todoRef, { task: newTask, category: newCategory, isCompleted: false, imagePath: newImagePath, filePath: newFilePath, imageUrl: newImageUrl, fileUrl: newFileUrl });
    };

    const toggleTask = (id) => {
        const todoRef = ref(database, `todos/${userId}/${id}`);
        const todo = tasks.find(t => t.id === id);
        update(todoRef, { isCompleted: !todo.isCompleted });
    };

    const deleteTask = async (userId, todoId) => {
        const todoRef = ref(database, `todos/${userId}/${todoId}`);
        await remove(todoRef);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Container p={0} className="main">
            <div className='header'>
                <Typography variant="h3" component="h4" className='title'>
                    Todo List
                </Typography>
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            <Box className="content">
                <CreateTodo
                    createTask={createTask}
                    task={task}
                    setTask={setTask}
                    category={category}
                    setCategory={setCategory}
                    files={files}
                    setFiles={setFiles}
                    handleChange={handleChange}
                    imageRef={imageRef}
                    fileRef={fileRef}
                />
                <TodoList
                    tasks={tasks}
                    deleteTask={(todoId) => deleteTask(userId, todoId)}
                    editTask={editTask}
                    toggleTask={toggleTask}
                />
            </Box>

        </Container>
    );
};

export default Home;