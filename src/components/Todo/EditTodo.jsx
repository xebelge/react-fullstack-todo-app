import TextFieldComponent from "../TextField/TextFieldComponent";

const EditTodo = ({ formData, setFiles, setFormData, handleEditSubmit, setIsEditing }) => {
    const handleChange = (event) => {
        const { files, name, value } = event.target;
        if (files) {
            const file = files[0];
            setFiles(prevState => ({ ...prevState, [name]: file }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <>
            <td>
                <form onSubmit={handleEditSubmit}>
                    <div className="todo-list-edit-form">
                        <TextFieldComponent
                            type="text"
                            name="task"
                            value={formData.task}
                            onChange={handleChange}
                            placeHolder="Edit task"
                            isAutoFocus
                        />
                    </div>
                </form>
            </td>
            <td>
                <TextFieldComponent label="" placeHolder={"Upload Image"} accept={"image/*"} className={"input-file-mui"} name="image" type="file" onChange={(e) => handleChange(e)} />
            </td>
            <td>
                <TextFieldComponent label="" placeHolder={"Upload File"} className={"input-file-mui"} name="file" type="file" onChange={(e) => handleChange(e)} />
            </td>
            <td>
                <form onSubmit={handleEditSubmit}>
                    <div className="todo-list-edit-form">
                        <TextFieldComponent
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeHolder="Edit category"
                        />
                    </div>
                </form>
            </td>
            <td>
                <div className="table-actions-button">
                    <button className="save" onClick={handleEditSubmit}>Save</button>
                    <button className="back" onClick={() => setIsEditing(false)}>Back</button>
                </div>
            </td>
        </>
    );
};

export default EditTodo;
