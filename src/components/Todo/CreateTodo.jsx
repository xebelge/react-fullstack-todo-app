import React from 'react';
import TextFieldComponent from '../TextField/TextFieldComponent';
import { Typography } from '@mui/material';
import { uploadFile } from '../../services/file/upload-file';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAsync, setHandleChange, setResetState } from '../../features/TodoSlice';

const CreateTodo = ({ imageRef, fileRef }) => {
    const dispatch = useDispatch();
    const { task, category, files } = useSelector((state) => state.todo);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageResult = files.imagePath ? await uploadFile(files.imagePath, 'todo_images') : { path: '', url: '' };
        const fileResult = files.filePath ? await uploadFile(files.filePath, 'todo_files') : { path: '', url: '' };
        await dispatch(createTaskAsync({ task, category, imagePath: imageResult.path, filePath: fileResult.path, imageUrl: imageResult.url, fileUrl: fileResult.url }))
        imageRef.current.value = '';
        fileRef.current.value = '';
        dispatch(setResetState());
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <Typography className='add-todo-title' variant="h6">Add Task</Typography>
                <div className='add-todo'>
                    <TextFieldComponent label="Task Name" name="task" placeHolder={"Enter Task Name"} type="text" value={task} onChange={(e) => dispatch(setHandleChange(e))} />
                    <TextFieldComponent label="Category Name" placeHolder={"Enter Category Name"} name="category" type="text" value={category} onChange={(e) => dispatch(setHandleChange(e))} />
                    <TextFieldComponent ref={imageRef} label="" placeHolder={"Upload Image"} accept={"image/*"} className={"input-file-mui"} name="imagePath" type="file" onChange={(e) => dispatch(setHandleChange(e))} />
                    <TextFieldComponent ref={fileRef} label="" placeHolder={"Upload File"} className={"input-file-mui"} name="filePath" type="file" onChange={(e) => dispatch(setHandleChange(e))} />
                    <button type="submit">Add</button>
                </div>
            </form >
        </div>
    );
}

export default CreateTodo;
