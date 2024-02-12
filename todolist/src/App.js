import './App.css';
import uniqid from "uniqid";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const validate = (name, value) => {
    let error = "";
  
    switch (name) {
      case "title": 
        if (value.length < 3) {
          error = "Title must be at least 3 characters";
        }
        break;
      case "description":
        if (value.trim().length < 10) {
          error = "Description must be at least 10 characters";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const [list, setList] = useState([]);
  const [todo, setTodo] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value , files} = e.target;

    setTodo({
      ...todo,
      [name]: files ? files[0] : value,
    });

    const error = validate(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.title.length > 0 || errors.description.length > 0) {
      alert("Wrong");
    } else {
      setList([
        ...list,
        {
          ...todo,
          id: uniqid()
        },
      ]);
      setTodo({
        image: "",
        title: "",
        description: "",
      });
    }
  }

  const removeItem = (item) => {
    let newArr = list.filter((x) => x.id !== item.id);
    setList(newArr);
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Image:</label>
          <input className="image"
            name="image"
            type="file"
            onChange={handleChange}
          />
        </div>
         <br/>
        <div>
          <label htmlFor='text'>Title:</label>
          <input className='title' 
            name="title"
            defaultValue={todo.title}
            onChange={handleChange}
          />
          {errors.title && <p style={{color:'red'}}>{errors.title}</p>}
        </div>
        <br/>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            className="textarea"
            defaultValue={todo.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <p style={{color:'red'}} className="error">{errors.description}</p>}
        </div>
        <br/>
        <button className='submit' type="submit">Add to card</button>
      </form>
      <div className='bigcard'>
        {list.map((item) => (
          <div className="delete">
            <button className='deletebtn' onClick={() => removeItem(item)}><FontAwesomeIcon icon={faTrash} /></button>
            <br/>
            <br/>
            <img src={URL.createObjectURL(item.image)} className="photo"  alt="" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
