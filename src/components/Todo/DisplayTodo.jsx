import FileDownloader from "../FileDownloader/FileDownloader";


const DisplayTodo = ({ taskItem, toggleTask, deleteTask, setIsEditing }) => {
    return (<>
        <td className="task">
            <input
                type="checkbox"
                checked={taskItem.isCompleted}
                onChange={toggleTask}
            />
            <span className={taskItem.isCompleted ? 'completed' : ''}>
                {taskItem.task}
            </span>

        </td>
        <td>
            {taskItem.imageUrl && <img src={taskItem.imageUrl} alt="task" width={75} height={75} />}
        </td>
        <td>
            {taskItem.fileUrl && <FileDownloader filePath={taskItem.fileUrl} />}
        </td>
        <td>{taskItem.category}</td>
        <td>
            <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete" onClick={deleteTask}>Delete</button>
        </td>
    </>
    );
}
export default DisplayTodo;