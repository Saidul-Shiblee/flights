const React = require('react')

// Create List of All Flights 
// Part 2: MongoDB
// Create a detail link that clicks to Show page for each flight to display all properties of flight

const textStyle={color:"red"}

class Index extends React.Component {
    render( ){
        const { flights } = this.props
        return (
            <div>
                <h1> See A List of All Flights</h1>
                <nav>
                    <a href="/flights/new">Create a New Flight Search</a>
                </nav>
                <ul>
                    {
                        flights &&
                        flights.map((flight, i) =>{
                            
                            return (
                              // map through properties airline,flightNo,departs
                              // Part 2#4: link for user to create a new flight search
                              // Do not use div to wrap li key or will get WARNING ERROR: (Each child in a list should have unique "key" prop. Check top-level render using li.)
                              <li
                                style={
                                  new Date().getTime() >
                                  new Date(flight.departs).getTime()?textStyle:null
                                }
                                key={i}
                              >
                                {`${flight.airline} ${flight.flightNo} ${flight.departs}`}
                                <nav>
                                  <a href={`/flights/${flight._id}`}>
                                    Detail of Flight
                                  </a>
                                  <br />
                                </nav>
                              </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}
module.exports = Index;