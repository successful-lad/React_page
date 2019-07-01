import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.CreateTodoItem("Drink Coffee"),
      this.CreateTodoItem("Make Awesome App"),
      this.CreateTodoItem("Have a lunch"),
    ]
  };
ToggleProperties(arr, id, propName) {
  const idx = arr.findIndex((el) => el.id === id);
  const oldItem = arr[idx];
  const newItem = {...oldItem, [propName] : !oldItem[propName]}


  return [
    ...arr.slice(0, idx),
    newItem,
    ...arr.slice(idx + 1)
  ]
}
deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };
OnToggleDone =(id)=>{
  this.setState(({ todoData }) => {
return {
  todoData :this.ToggleProperties(todoData, id, 'done')
};
  }
  );
};
OnToggleImportant =(id)=>{
  this.setState(({ todoData }) => {
    return {
      todoData :this.ToggleProperties(todoData, id, 'important')
    };
      }
      );
}

CreateTodoItem(label) {
return {
  label,
  important: false,
  done: false,
  id: this.maxId++,
}
}
  addItem = (text) => {
    // generate id ?
    const newItem = this.CreateTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });

  };

  render() {
    const {todoData} = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const importantCount = todoData.length - doneCount ;
    return (
      <div className="todo-app">
        <AppHeader toDo={importantCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={ this.deleteItem }
          OnToggleImportant= {this.OnToggleImportant}
          OnToggleDone = {this.OnToggleDone}
          />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};
