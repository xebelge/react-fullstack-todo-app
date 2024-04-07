import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/auth-service';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './index.css';
import CreateTodo from '../../components/Todo/CreateTodo';
import TodoList from '../../components/Todo/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../features/TodoSlice';


const Home = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.todo);
    const imageRef = useRef(null);
    const fileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

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
                    imageRef={imageRef}
                    fileRef={fileRef}
                />
                <TodoList
                    tasks={tasks}
                />
            </Box>

        </Container>
    );
};

export default Home;