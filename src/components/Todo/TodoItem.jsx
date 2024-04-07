import React, { useState } from 'react';
import DisplayTodo from './DisplayTodo';
import EditTodo from './EditTodo';
import { uploadFile } from '../../services/file/upload-file';

const TodoItem = ({ taskItem, deleteTask, editTask, toggleTask,handleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    task: taskItem.task,
    category: taskItem.category,
  });
  const [files, setFiles] = useState({ image: null, file: null });

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const imageResult = files.image ? await uploadFile(files.image, 'todo_images') : { path: '', url: '' };
    const fileResult = files.file ? await uploadFile(files.file, 'todo_files') : { path: '', url: '' };
    editTask(taskItem.id, formData.task, formData.category, imageResult.path, fileResult.path, imageResult.url, fileResult.url);
    setIsEditing(false);
  };

  return (
    <tr>
      {isEditing ? (
        <EditTodo
          formData={formData}
          setFormData={setFormData}
          handleEditSubmit={handleEditSubmit}
          setIsEditing={setIsEditing}
          files={files}
          setFiles={setFiles}
        />
      ) : (
        <DisplayTodo
          taskItem={taskItem}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          setIsEditing={setIsEditing}
        />
      )}
    </tr>
  );
};

export default TodoItem;
