import React from 'react';
import TextFieldComponent from '../TextField/TextFieldComponent';
import { Typography } from '@mui/material';
import { uploadFile } from '../../services/file/upload-file';

const CreateTodo = ({ createTask, task, setTask, category, setCategory, files, setFiles, handleChange, imageRef, fileRef }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageResult = files.image ? await uploadFile(files.image, 'todo_images') : { path: '', url: '' };
        const fileResult = files.file ? await uploadFile(files.file, 'todo_files') : { path: '', url: '' };

        await createTask(task, category, imageResult.path, fileResult.path, imageResult.url, fileResult.url);

        setTask('');
        setCategory('');
        imageRef.current.value = '';
        fileRef.current.value = '';
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <Typography className='add-todo-title' variant="h6">Add Task</Typography>
                <div className='add-todo'>
                    <TextFieldComponent label="Task Name" name="task" placeHolder={"Enter Task Name"} type="text" value={task} onChange={(e) => handleChange(e)} />
                    <TextFieldComponent label="Category Name" placeHolder={"Enter Category Name"} name="category" type="text" value={category} onChange={(e) => handleChange(e)} />
                    <TextFieldComponent ref={imageRef} label="" placeHolder={"Upload Image"} accept={"image/*"} className={"input-file-mui"} name="image" type="file" onChange={(e) => handleChange(e)} />
                    <TextFieldComponent ref={fileRef} label="" placeHolder={"Upload File"} className={"input-file-mui"} name="file" type="file" onChange={(e) => handleChange(e)} />
                    <button type="submit">Add</button>
                </div>
            </form >
        </div>
    );
}

export default CreateTodo;
