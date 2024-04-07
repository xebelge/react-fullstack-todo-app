import { useDispatch } from "react-redux";
import FileDownloader from "../FileDownloader/FileDownloader";
import { deleteTaskAsync, setEditHandler, toggleTaskAsync } from "../../features/TodoSlice";


const DisplayTodo = ({ taskItem }) => {
    const dispatch = useDispatch();
    return (<>
        <td className="task">
            <input
                type="checkbox"
                checked={taskItem.isCompleted}
                onChange={() => dispatch(toggleTaskAsync(taskItem.id))}
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
            <button className="edit" onClick={() => {
                dispatch(setEditHandler(taskItem.id))
            }}>Edit</button>
            <button className="delete" onClick={(e) => dispatch(deleteTaskAsync(taskItem.id))}>Delete</button>
        </td>
    </>
    );
}
export default DisplayTodo;