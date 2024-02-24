import { useState } from 'react';
import classes from './Builder.module.css';
import { v4 as uuidv4 } from 'uuid';

const Dropdowner = ({ type }) => {
  const [title, setTitle] = useState('');
  const [option, setOption] = useState([
    {
      id: uuidv4(),
      value: '',
    },
  ]);

  const optionValHandle = (e) => {
    setOption((prev) => {
      const editedOption = option.map((item) => {
        let obj;

        if (item.id === e.target.id) {
          obj = {
            id: e.target.id,
            value: e.target.value,
          };
        } else {
          obj = item;
        }
        return obj;
      });

      return editedOption;
    });
  };

  const addOptionHandle = () => {
    setOption((prev) => {
      return [
        {
          id: uuidv4(),
          value: '',
        },
        ...prev,
      ];
    });
  };

  const titleHandle = (e) => {
    setTitle(e.target.value);
  };

  const postDropdowns = async () => {
    try {
      await fetch('http://localhost:5000/api/dropdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: title,
          options: option,
          answertype: type,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes.build_drop}>
        <div className={classes.build_drop_inputDiv}>
          <div className={classes.build_drop_inputDivTitle}>
            <label>untitled question</label>
            <input onChange={titleHandle} value={title}></input>
          </div>
          <div className={classes.build_drop_inputDivOpt}>
            <div className={classes.build_drop_inputDivOpt}>
              {option
                .slice()
                .reverse()
                .map((item) => (
                  <div key={item.id}>
                    <span className="material-symbols-outlined">
                      {type === 'MultipleChoice' && 'radio_button_unchecked'}
                      {type === 'Dropdown' && 'touch_app'}
                      {type === 'Checkbox' && 'check_box_outline_blank'}
                    </span>
                    <input
                      id={item.id}
                      onChange={optionValHandle}
                      type="text"
                      defaultValue={item.value}
                    ></input>
                  </div>
                ))}
            </div>
            <button onClick={addOptionHandle}>Add option</button>
          </div>
        </div>
      </div>
      <div className={classes.addBtn} onClick={postDropdowns}>
        <span className="material-symbols-outlined">add</span> <p>Add</p>
      </div>
    </>
  );
};

const QA = () => {
  const [que, setQue] = useState('');

  const sendData = async () => {
    try {
      await fetch('http://localhost:5000/api/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: que,
          answertype: 'Answer',
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const QueHandle = (e) => {
    setQue(e.target.value);
  };

  return (
    <>
      <div className={classes.buil_formQA}>
        <div className={classes.buil_formQA_inputDiv}>
          <label>Question</label>
          <input onChange={QueHandle} value={que}></input>
        </div>
        <p>Plain Answer</p>
      </div>
      <div className={classes.addBtn} onClick={sendData}>
        <span className="material-symbols-outlined">add</span> <p>Add</p>
      </div>
    </>
  );
};

const Builder = () => {
  const [formInput, setFormInput] = useState(<QA />);

  return (
    <>
      <div className={classes.builder}>
        <div className={classes.buil_form}>{formInput}</div>
        <div className={classes.Builder_opt}>
          <div
            className={classes.Builder_optBtn}
            onClick={() => setFormInput(<QA />)}
          >
            <span className="material-symbols-outlined">edit_note</span>
            <p>Question & Answer</p>
          </div>
          <div
            className={classes.Builder_optBtn}
            onClick={() => setFormInput(<Dropdowner type="MultipleChoice" />)}
          >
            <span className="material-symbols-outlined">
              radio_button_checked
            </span>
            <p>Multiple Choice</p>
          </div>
          <div
            className={classes.Builder_optBtn}
            onClick={() => setFormInput(<Dropdowner type="Dropdown" />)}
          >
            <span className="material-symbols-outlined">dropdown</span>
            <p>Dropdowns</p>
          </div>
          <div
            className={classes.Builder_optBtn}
            onClick={() => setFormInput(<Dropdowner type="Checkbox" />)}
          >
            <span className="material-symbols-outlined">check_box</span>
            <p>Checkbox</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Builder;
