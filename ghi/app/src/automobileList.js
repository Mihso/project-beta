import React from 'react';

class AutomobileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
    };
  }

  async componentDidMount() {

    const autoUrl = `http://localhost:8100/api/automobiles/`;

        const response = await fetch(autoUrl);
        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.autos})
        }
  }

  render() {
    return (
      <>
        <div className="px-2 py-3 my-5 mt-0 rounded-pill text-center bg-success">
          <h1 className="display-5 fw-bold">Automobiles</h1>
          <div className="col-lg-6 mx-auto">
          </div>
        </div>
        <div className="container">
          <h2>Our fine selection of automobiles</h2>
          <p> </p>
          <div className="row gx-5 gy-3 row-cols-3">
            <table className="center table border border-5 border-success">
                <thead>
                    <tr>
                        <th scope="col">VIN</th>
                        <th scope="col">Color</th>
                        <th scope="col">Year</th>
                        <th scope="col">Model</th>
                        <th scope="col">Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
            {this.state.manufacturers.map((manu) => {
              return (
                <tr scope="row" key={manu.id}>
                <td><p>{manu.vin}</p></td>
                <td><p>{manu.color}</p></td>
                <td><p>{manu.year}</p></td>
                <td><p>{manu.model.name}</p></td>
                <td><p>{manu.model.manufacturer.name}</p></td>
              </tr>
              );
            })}
            </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default AutomobileList;