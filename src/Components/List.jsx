import {FaEdit,FaTrash} from 'react-icons/fa';

export const List = ({data,removeTodo,editEachTodo}) => {
    return (
        <ul className="list-group list-group-flush">
            {
                data.map((item) => {
                    const{id,title} = item;
                    return (
                        <div key={id} className='d-flex justify-content-around align-items-center'>
                            <li className='list-group-item text-info'>
                                {title}
                            </li>
                            <div className="btn-container">
                                <button 
                                    type='button' 
                                    className='btn text-success'
                                    onClick={() => editEachTodo(id)}
                                >
                                    <FaEdit/>
                                </button>
                                <button 
                                    type='button' 
                                    className='btn text-danger' 
                                    onClick={() => removeTodo(id)}
                                >
                                    <FaTrash/>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </ul>
    )
}