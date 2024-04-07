import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import SelectComponent from '../Select/SelectComponent';
import TextFieldComponent from '../TextField/TextFieldComponent';
import { Typography } from '@mui/material';

const TodoList = ({ tasks, deleteTask, editTask, toggleTask, handleChange, files, setFiles }) => {
    const [filter, setFilter] = useState('All');
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const categories = tasks.map(task => task.category).filter(category => category);
        const unique = ['All', ...new Set(categories)];
        setUniqueCategories(unique);
    }, [tasks]);

    const filteredTasks = tasks.filter(task => {
        return (
            (filter === 'All' || task.category === filter) &&
            (task.task.toLowerCase().includes(searchText.toLowerCase()))
        );
    });

    return (
        <div>
            <Typography className='add-todo-title' variant="h6">Filter</Typography>
            <div className='filter'>
                <TextFieldComponent
                    label="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    variantType={"outlined"}
                    id={"search"}
                />
                <div className='filter-categories'>
                    <SelectComponent
                        label="Category"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        menuItems={uniqueCategories.map((category, index) => ({ value: category, label: category || "Uncategorized" }))}
                    />
                </div>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Tasks</th>
                            <th>Image</th>
                            <th>File</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <TodoItem
                                key={task.id}
                                taskItem={task}
                                deleteTask={() => deleteTask(task.id)}
                                editTask={editTask}
                                toggleTask={() => toggleTask(task.id)}
                                handleChange={handleChange}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodoList;
