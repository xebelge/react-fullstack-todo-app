import { useDispatch, useSelector } from "react-redux";
import TextFieldComponent from "../TextField/TextFieldComponent";
import { setEditingTodoId, setHandleChange } from "../../features/TodoSlice";

const EditTodo = ({ handleEditSubmit }) => {

    const dispatch = useDispatch();
    const { editTask } = useSelector((state) => state.todo);
    const { editCategory } = useSelector((state) => state.todo);

    return (
        <>
            <td>
                <div className="todo-list-edit-form">
                    <TextFieldComponent
                        type="text"
                        name="editTask"
                        value={editTask}
                        onChange={(e) => dispatch(setHandleChange(e))}
                        placeHolder="Edit task"
                        isAutoFocus
                    />
                </div>
            </td>
            <td>
                <TextFieldComponent label="" placeHolder={"Upload Image"} accept={"image/*"} className={"input-file-mui"} name="editImagePath" type="file" onChange={(e) => dispatch(setHandleChange(e))} />
            </td>
            <td>
                <TextFieldComponent label="" placeHolder={"Upload File"} className={"input-file-mui"} name="editFilePath" type="file" onChange={(e) => dispatch(setHandleChange(e))} />
            </td>
            <td>
                <div className="todo-list-edit-form">
                    <TextFieldComponent
                        type="text"
                        name="editCategory"
                        value={editCategory}
                        onChange={(e) => dispatch(setHandleChange(e))}
                        placeHolder="Edit category"
                    />
                </div>
            </td>
            <td>
                <div className="table-actions-button">
                    <button className="save" onClick={(e) => {
                        handleEditSubmit(e);
                    }}>Save</button>
                    <button className="back" onClick={() => {
                        dispatch(setEditingTodoId(null))
                    }}>Back</button>
                </div>
            </td >
        </>
    );
};

export default EditTodo;
