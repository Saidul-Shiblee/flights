const React = require("react")


// User to Create New Flight Search
// Departure enter valid date& time hint<input type="datetime-local"

class New extends React.Component{

     
    
    render( ){

        const abc = this.props.departsDate;
        // console.log(abc)
        // const date = new Date( );
        // const futureDate = date.getDate( ) + 365;
        // date.setDate(futureDate);
        // const defaultValue = date.toLocaleDateString('en-CA');
        
       
        // Part 2: MongoDB
        // #3 Added Airport input with select options with defaultValue= SAN
        return (
            <div>
                <h1>New Flights Page</h1>
                <form action = "/flights" method="POST">
                    Airline: <input type = "text" size="35" name="airline"  placeholder="American', 'Southwest', 'United" /> <br/>
                    Flight Number: <input type = "text" name="flightNo" min={10} max={9999} /> <br/>
                    Departure: <input type = "datetime-locale" name="departs" defaultValue={abc} /> <br/>
                    Airport: <select name="airport" >
                        <option value = "AUS" >AUS</option>
                        <option value = "DAL" >DAL </option>
                        <option value = "LAX" >LAX </option>
                        <option value = "SAN" >SAN</option>
                        <option value = "SEA" >SEA</option>
                    </select>
                    <input type="submit" value="Submit New Flight" />
                </form>
                <nav>
                    <a href="/flights">Back to Flights Index Page</a>
                </nav>
            </div>
        )
    }
}

// export jsx file
module.exports = New;

