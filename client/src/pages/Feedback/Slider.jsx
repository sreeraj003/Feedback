import PropTypes from 'prop-types';


function Slider({ width, setWidth }) {


    const changeWidth = (event) => {
        setWidth(parseInt(event.target.value));
    };
    const renderStepLabels = () => {
        const stepInterval = 1;
        const steps = [];

        for (let i = 1; i <= 10; i++) {
            const value = i * stepInterval;
            steps.push(<span className='ms-0' key={i} style={{ left: `${(i - 1) * 5.4}%` }}>{value}</span>);
        }
        return steps;
    }
    return (
        <div>
            <input
                className='slider'
                type='range'
                onChange={changeWidth}
                min={1}
                max={10}
                step={1}
                value={width}
            ></input>
            <div className="slider-steps ms-0 ms-2 mt-0  ">
                {renderStepLabels()}
            </div>
        </div>
    )
}


export default Slider
Slider.propTypes = {
    width: PropTypes.number,
    setWidth:PropTypes.func
};