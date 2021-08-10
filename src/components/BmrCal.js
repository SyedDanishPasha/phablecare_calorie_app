import React, { Component } from 'react'



class BmrCal extends Component
{


    constructor ()
    {

        super();

        this.state = {
            weight: '',
            bodyfat: '',
            activity: '',
            bmr: '',
            error: '',
            flag: false,
            system: ''
        }

    }

    handleWeightChange = (event) =>
    {

        this.setState({ weight: event.target.value });
    }

    handleBodyFatChange = (event) =>
    {

        this.setState({ bodyfat: event.target.value });
    }

    handleActivityChange = (event) =>
    {

        this.setState({ activity: event.target.value });
    }
    handleSystemChange = (event) =>
    {

        this.setState({ system: event.target.value });
    }

    calculateBMR ()
    {
        let weight = this.state.weight;
        let bodyfat = this.state.bodyfat;

        if (weight === '' || bodyfat === '')
        {
            this.setState({ error: 'All fields are required' });
            return;
        }

        var bmrCalc = '';
        {
            bmrCalc = 21.6 * (weight - (bodyfat * weight)) + 370
        }


        this.setState({ bmr: bmrCalc });
        this.setState({ flag: true });
        this.setState({ error: '' });
    }

    calculateAct ()
    {
        let ActCalc;

        if (this.state.activity === '1.2')
        { ActCalc = this.state.bmr * 1.2; }
        else if (this.state.activity === '1.375')
        { ActCalc = this.state.bmr * 1.375; }
        else if (this.state.activity === '1.55')
        { ActCalc = this.state.bmr * 1.55; }
        else if (this.state.activity === '1.725')
        { ActCalc = this.state.bmr * 1.725; }
        else if (this.state.activity === '1.9')
        { ActCalc = this.state.bmr * 1.9; }
        this.setState({ activity: ActCalc });

    }


    render ()
    {

        let error;
        if (this.state.error)
        { error = <div className='error' >{ this.state.error } </div> }
        let result;
        if (this.state.bmr)
        { result = <div className="result">{ this.state.bmr }</div> }

        let resultAct;
        if (this.state.bmr)
        { resultAct = <div className="result">{ this.state.activity }</div> }

        if (this.state.flag === true)
        {
            var a = true;
        }


        return (
            <div id="bmrcalc">
                <div className="form">
                    <h2>Calorie Calculator App</h2>
                    { error }
                    <div className="inputwrap">
                        <label className="label">Weight (Pounds/Kg)</label>
                        <input type="number" placeholder="ex: 78" value={ this.state.weight } onChange={ this.handleWeightChange } name="weight" className="weight" min="0" max="999" />
                    </div>
                    <div className="inputwrap">
                        <label className="label">Body Fat Percentage</label>
                        <input type="number" placeholder="ex: 0.5" value={ this.state.bodyfat } onChange={ this.handleBodyFatChange } name="bodyfat" className="bodyfat" min="0.0" max="0.99" />
                    </div>
                    <button type="button" onClick={ () => this.calculateBMR() }>Calculate BMR</button>
                    { result }

                    { a === true && <div className="workout">

                        <div className="inputwrap">
                            <label className="label">Workout in a Week</label>
                            <select className="activity" value={ this.state.activity } onChange={ this.handleActivityChange } name="activity">
                                <option value="">Select your Activity</option>
                                <option value="1.2">Sedentary</option>
                                <option value="1.375">Lightly Active</option>
                                <option value="1.55">Moderately Active</option>
                                <option value="1.725">Very Active</option>
                                <option value="1.9">Extremely Active</option>
                            </select>
                        </div>
                        <button type="button" onClick={ () => this.calculateAct() }>Calculate TDEE</button>
                        { resultAct }
                    </div> }


                </div>
            </div>
        )
    }
}

export default BmrCal;