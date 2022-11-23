import { useState } from "react"
import { List} from "./Components/List";
import { ModalText } from "./Components/ModalText";

export const App = () => {
  // To make input as controlled component
  const [todoItem, setTodoItem] = useState('');
  const handleTodoItem = (e) => {
    setTodoItem(e.target.value);
  }

  // To change button text
  const [btnText, setBtnText] = useState(false);
  const [editId, setEditId] = useState(null);

  const [todosList, setTodosList] = useState([]);

  // For alert
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  })
  // helper function
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({
      show,
      msg,
      type
    });
  }

  // When user hits submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoItem) {
      showAlert(true, 'please enter value', 'danger');
    } else if (todoItem && btnText) {
      const result = todosList.map((ele) => {
        if (ele.id === editId) {
          return {
            ...ele,
            title: todoItem
          }
        }
        return ele;
      })
      setTodosList(result);
      setTodoItem('');
      setEditId(null);
      setBtnText(false);
      showAlert(true, 'value changed', 'success');
    } else {
      showAlert(true, 'item added to the list', 'success');
      const addTodoToArray = {
        id: new Date().getTime().toString(),
        title: todoItem
      };
      // setTodosList([...todosList, addTodoToArray]);
      setTodosList([addTodoToArray, ...todosList]);
      setTodoItem('');
    }
  }

  // To remove all items in array
  const handleClearAll = () => {
    showAlert(true, 'empty list', 'danger');
    setTodosList([]);
  }

  // To remove each item in array
  const removeTodo = (id) => {
    showAlert(true, 'removed item', 'danger');
    const removeItem = todosList.filter((ele) => ele.id !== id);
    setTodosList(removeItem);
  }

  // Logic for Edit Functionality
  const editEachTodo = (id) => {
    const editSpecificTodo = todosList.find((ele) => ele.id === id);
    setBtnText(true);
    setEditId(id);
    setTodoItem(editSpecificTodo.title);
  }
  
  const displayResult = (
    <section>
      <div className="grocery-section">
        <List
          data={todosList}
          removeTodo= {removeTodo}
          editEachTodo={editEachTodo}
        />
      </div>
      <button className="btn text-light btn-dark btn-block mx-auto my-5" onClick={handleClearAll}>
        clear items
      </button>
    </section>
  )

  return (
    <section>
      <h1 className='text-center text-capitalize mb-0 text-dark'>
        grocery bud project
      </h1>
      <div className="underline mx-auto bg-warning"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 my-5 marginL">
            {
              alert.show && <ModalText {...alert} hideMessage={showAlert} data={todosList}/>
            }
            <form>
              <div className="form-row align-items-center">
                <div className="col-sm-8">
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="eg:apple"
                    value={todoItem}
                    onChange={handleTodoItem}
                  />
                </div>
                <div className="col-auto my-1">
                  <button 
                    type="submit" 
                    className="btn btn-primary text-capitalize"
                    onClick={handleSubmit}
                  >
                    {btnText ? 'edit' : 'submit'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {
          todosList.length > 0 && displayResult 
        }
      </div>
    </section>
  )
}