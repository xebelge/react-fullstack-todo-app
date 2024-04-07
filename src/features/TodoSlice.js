import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, push, get, remove, update } from 'firebase/database';
import { auth, database } from '../firebase-config';

export const fetchTasks = createAsyncThunk('todos/fetchTasks', async () => {
    const userId = auth.currentUser.uid;
    const todosRef = ref(database, `todos/${userId}`);
    const snapshot = await get(todosRef);
    const data = snapshot.val();
    const todos = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    return todos;
});

export const createTaskAsync = createAsyncThunk('todos/createTask', async ({ task, category, imagePath, filePath, imageUrl, fileUrl }) => {
    const userId = auth.currentUser.uid;
    const todosRef = ref(database, `todos/${userId}`);
    const newTodoRef = push(todosRef);
    await update(newTodoRef, { task, category, isCompleted: false, imagePath, filePath, imageUrl, fileUrl });
    return { id: newTodoRef.key, task, category, isCompleted: false, imagePath, filePath, imageUrl, fileUrl };
});

export const editTaskAsync = createAsyncThunk('todos/editTask', async ({ id, newTask, newCategory, newImagePath, newFilePath, newImageUrl, newFileUrl }) => {
    const userId = auth.currentUser.uid;
    const todoRef = ref(database, `todos/${userId}/${id}`);
    await update(todoRef, { task: newTask, category: newCategory, imagePath: newImagePath, filePath: newFilePath, imageUrl: newImageUrl, fileUrl: newFileUrl });
    return { id, task: newTask, category: newCategory, imagePath: newImagePath, filePath: newFilePath, imageUrl: newImageUrl, fileUrl: newFileUrl };
});

export const toggleTaskAsync = createAsyncThunk('todos/toggleTask', async (id, { getState }) => {
    const userId = auth.currentUser.uid;
    const todoRef = ref(database, `todos/${userId}/${id}`);
    const todo = getState().todo.tasks.find(t => t.id === id);
    await update(todoRef, { isCompleted: !todo.isCompleted });
    return id;
});

export const deleteTaskAsync = createAsyncThunk('todos/deleteTask', async (todoId) => {
    const userId = auth.currentUser.uid;
    const todoRef = ref(database, `todos/${userId}/${todoId}`);
    await remove(todoRef);
    return todoId;
});

const TodoSlice = createSlice({
    name: 'todos',
    initialState: {
        tasks: [],
        task: '',
        category: '',
        files: { imagePath: null, imageUrl: "", filePath: null, fileUrl: "" },
        isEditing: false,
        editingTodoId: null,
        editTask: "",
        editCategory: "",
        editFiles: { editImagePath: null, editImageUrl: "", editFilePath: null, editFileUrl: "" }

    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setHandleChange: (state, action) => {
            const { name, value, files } = action.payload.target;
            if (state.editingTodoId) {
                if (files) {
                    const file = files[0];
                    state.editFiles = { ...state.editFiles, [name]: file };
                } else {
                    if (name === 'editTask') state.editTask = value;
                    if (name === 'editCategory') state.editCategory = value;
                }
            } else {
                if (files) {
                    const file = files[0];
                    state.files = { ...state.files, [name]: file };
                } else {
                    if (name === 'task') state.task = value;
                    if (name === 'category') state.category = value;
                }
            }
        },
        setEditHandler: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload);
            state.editingTodoId = action.payload;
            state.editTask = task.task;
            state.editCategory = task.category;
            state.editFiles = { editImagePath: task.imagePath, editImageUrl: task.imageUrl, editFilePath: task.filePath, editFileUrl: task.fileUrl };
        },
        setEditingTodoId: (state, action) => {
            state.editingTodoId = action.payload;
        },
        setResetState: (state) => {
            state.task = '';
            state.category = '';
            state.files = { imagePath: null, imageUrl: "", filePath: null, fileUrl: "" };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
            })
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(editTaskAsync.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                state.tasks[index] = action.payload;
            })
            .addCase(toggleTaskAsync.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(t => t.id === action.payload);
                state.tasks[index].isCompleted = !state.tasks[index].isCompleted;
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(t => t.id !== action.payload);
            });
    },
});

export const { setTasks, setHandleChange, setIsEditing, setEditHandler, setEditingTodoId, setResetState } = TodoSlice.actions;
export default TodoSlice.reducer;
