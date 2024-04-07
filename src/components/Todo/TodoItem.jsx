import React from 'react';
import DisplayTodo from './DisplayTodo';
import EditTodo from './EditTodo';
import { uploadFile } from '../../services/file/upload-file';
import { useDispatch, useSelector } from 'react-redux';
import { editTaskAsync, setEditingTodoId } from '../../features/TodoSlice';

const TodoItem = ({ taskItem }) => {
  const dispatch = useDispatch();
  const { editTask, editCategory, editFiles, editingTodoId } = useSelector((state) => state.todo);
  const isEditing = editingTodoId === taskItem.id;

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    let imageUploadResult = { path: editFiles.editImagePath, url: editFiles.editImageUrl };
    let fileUploadResult = { path: editFiles.editFilePath, url: editFiles.editFileUrl };

    if (editFiles.editImagePath && typeof editFiles.editImagePath !== 'string') {
      imageUploadResult = await uploadFile(editFiles.editImagePath, 'todo_images');
    }

    if (editFiles.editFilePath && typeof editFiles.editFilePath !== 'string') {
      fileUploadResult = await uploadFile(editFiles.editFilePath, 'todo_files');
    }

    await dispatch(editTaskAsync({
      id: taskItem.id,
      newTask: editTask,
      newCategory: editCategory,
      newImagePath: imageUploadResult.path,
      newFilePath: fileUploadResult.path,
      newImageUrl: imageUploadResult.url,
      newFileUrl: fileUploadResult.url,
    }));

    dispatch(setEditingTodoId(null));
  };

  return (
    <tr>
      {isEditing ? (
        <EditTodo handleEditSubmit={handleEditSubmit} />
      ) : (
        <DisplayTodo taskItem={taskItem} />
      )}
    </tr>
  );
};

export default TodoItem;
