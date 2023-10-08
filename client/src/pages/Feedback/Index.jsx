import { useCallback, useRef, useState } from 'react';
import './feedback.css'
import Slider from './Slider';
import axios from "axios"
import ValidateData from './Validate';
import { useNavigate } from 'react-router-dom';
function Feedback() {
  const [width, setWidth] = useState(0);
  const [usage, setUsage] = useState('')
  const [msg, setMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [checkedOptions, setCheckedOptions] = useState([]);
  const suggestionRef = useRef()
  const birthdayRef = useRef()
  const navigate = useNavigate()

  const handleCheck = useCallback((event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedOptions([...checkedOptions, value]);
    } else {
      setCheckedOptions(checkedOptions.filter((option) => option !== value));
    }
  }, [checkedOptions]);

  const handleRadio = useCallback((event) => {
    setUsage(event.target.value);
  }, [])

  const handlesubmit = useCallback(async () => {
    const suggestions = suggestionRef.current.value
    const birthday = birthdayRef.current.value
    const data = {
      usage: usage,
      goals: checkedOptions,
      rating: width,
      suggestions: suggestions,
      birthday: birthday,
    }
    const validation = ValidateData(data)
    if (validation != 'done') {
      setErrMsg(validation)
      setTimeout(() => {
        setErrMsg('')
      }, 3000)
      return
    } else {
      await axios.post("http://localhost:8080/feedback", data
      ).then(res => {
        if (res.data == 'done') {
          setMsg('Review successfully updated')
          setTimeout(() => {
            setMsg('')
          }, 3000)
        } else if (res.data == 'error') {
          setTimeout(() => {
            setErrMsg('')
          }, 3000)
          setErrMsg("something went wrong. Please try again later.")
        }
      })
    }
  }, [checkedOptions, usage, width])

  return (
    <div className="container">
      {msg && <div className='msg p-2 text-success'>{msg}</div>}
      {errMsg && <div className='errMsg p-2 text-danger'>{errMsg}</div>}
      <div className="row">
        <div className="feedback-form mx-auto">
          <h3 className='pb-4'>Review</h3>

          <div style={{ textAlign: 'start', marginBottom: '20px' }}>
            <h6>1.How often do you use this app</h6>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleRadio} checked={usage === 'Daily'} value="Daily" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Daily
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleRadio} checked={usage === 'Weekly'} value="Weekly" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Weekly
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleRadio} checked={usage === 'Monthly'} value="Monthly" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Monthly
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleRadio} checked={usage === 'Rarely'} value="Rarely" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Rarely
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={handleRadio} checked={usage === 'First_time'} value="First_time" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                First time
              </label>
            </div>
          </div>

          <div style={{ textAlign: 'start', marginBottom: '20px' }}>
            <h6>2.Main app goal</h6>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={handleCheck} checked={checkedOptions.includes('Information')} value="Information" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Information
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={handleCheck} checked={checkedOptions.includes('Chat')} value="Chat" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Chat
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={handleCheck} checked={checkedOptions.includes('Entertainment')} value="Entertainment" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Entertainment
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={handleCheck} checked={checkedOptions.includes('Buy')} value="Buy" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Buy
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={handleCheck} checked={checkedOptions.includes('Socialize')} value="Socialize" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Socialize
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={handleCheck} checked={checkedOptions.includes('Others')} value="Others" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Other
              </label>
            </div>
          </div>

          <div style={{ textAlign: 'start', marginBottom: '20px' }}>
            <h6>3.Rate user experience</h6>
            <Slider width={width} setWidth={setWidth} />
          </ div>
          <br />

          <div style={{ textAlign: 'start', marginBottom: '20px' }}>
            <h6>3.Suggest any improvements</h6>
            <textarea className='form-control' ref={suggestionRef} name="suggestions" id="suggestions" cols="60" rows="5"></textarea>
          </div>

          <div style={{ textAlign: 'start', marginBottom: '20px' }}>
            <h6>4.Enter your birthday</h6>
            <input className='form-control cal' ref={birthdayRef} type="date" />
          </div>

          <button className='btn bg-white' style={{ color: 'black' }} onClick={() => handlesubmit()}>Submit</button>
        <button className='btn bg-black overall text-light' onClick={()=>navigate('/result')} >Check Overall</button>
        </div>
      </div>
    </div>
  )
}

export default Feedback