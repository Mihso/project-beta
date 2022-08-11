import React from 'react'
import { Link } from 'react-router-dom'

class VehicleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicles: [],
            x : 0,
            y : 0,
        }
    }
    async componentDidMount(){
        const vehicleUrl = `http://localhost:8100/api/models/`

        const response = await fetch(vehicleUrl)
        if (response.ok) {
            const data = await response.json()
            this.setState({vehicles: data.models})
        }
    }

    _onMouseMove(e) {
        this.setState({ x: e.clientX, y: e.clientY });
      }

    checkPosition(xMax, xMin, yMax, yMin)
    {
        if(xMax >= this.state.x && xMin <= this.state.x && yMax >= this.state.y && this.state.y >= yMin)
        {
            return(
                <img src="https://www.supercars.net/blog/wp-content/uploads/2020/09/2020-Ferrari-F8-Tributo.jpg"  className="card-img-top" />
                )
        }
    }

    render() {
        return (
            <div onMouseMove={this._onMouseMove.bind(this)}>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                <img className="bg-white rounded shadow d-block mx-auto mb-4" src='/logo.svg' alt="" width="600" />
                <h1 className= "displays-5 fw-bold">Vehicles</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Take a look at our Vehicles! You won't find a lemon here!
                    </p>
                </div>
            </div>
            <div>
                <h1>Mouse coordinates: { this.state.x } { this.state.y }</h1>
            </div>
            {this.checkPosition(550,450,200,150)}
            <div className="container">
                <h2>Vehicles, Vehicles, and more Vehicles</h2>
                <div className="row gx-5 gy-3 row-cols-3">
                    <table className="center table ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Manufacturer</th>
                                <th scope="col">Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.vehicles.map((vehicle) => {
                            return (
                                <tr key={vehicle.id}>
                                <td><p>{vehicle.name}</p></td>
                                <td><p>{vehicle.manufacturer.name}</p></td>
                                <td><img src={vehicle.picture_url} className="card-img-top" /></td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        )
    }
}

export default VehicleList