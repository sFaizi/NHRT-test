import { useEffect, useState } from 'react';
import classes from './List.module.css';

const List = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const data = await fetch('http://localhost:5000/api/list');
      const resData = await data.json();
      setList(resData.data);
      console.log(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.list}>
      {list.map((item, i) => (
        <div className={classes.listItem} key={i}>
          <p className={classes.listQue}>{item.question}</p>
          {item.answertype === 'Answer' && (
            <input
              className={classes.AnswerInput}
              type="text"
              placeholder="Your Answer"
              id={item.id}
            ></input>
          )}
          {item.options.length > 0 && item.answertype === 'Dropdown' && (
            <select className={classes.DropInput}>
              {item.options.map((item) => (
                <option key={item.id}>{item.value}</option>
              ))}
            </select>
          )}
          {item.options.length > 0 && item.answertype === 'MultipleChoice' && (
            <div className={classes.MultiInput}>
              {item.options.map((subItem) => (
                <div className={classes.MultiInputDiv}>
                  <input
                    id={subItem.value}
                    type="radio"
                    name={i}
                    defaultValue={subItem.value}
                    key={subItem.id}
                  ></input>
                  <label htmlFor={subItem.value}>{subItem.value}</label>
                </div>
              ))}
            </div>
          )}
          {item.options.length > 0 && item.answertype === 'Checkbox' && (
            <div className={classes.MultiInput}>
              {item.options.map((subItem) => (
                <div className={classes.MultiInputDiv}>
                  <input
                    id={subItem.value}
                    type="checkbox"
                    name={i}
                    defaultValue={subItem.value}
                    key={subItem.id}
                  ></input>
                  <label htmlFor={subItem.value}>{subItem.value}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
