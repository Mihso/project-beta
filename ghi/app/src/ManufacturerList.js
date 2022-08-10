import React from 'react';
import { Link } from 'react-router-dom';

class ManufacturerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
    };
  }

  async componentDidMount() {

    const manufacturerUrl = `http://localhost:8100/api/manufacturers/`;

        const response = await fetch(manufacturerUrl);
        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers})
        }
  }

  render() {
    return (
      <>
        <div className="px-2 py-3 my-5 mt-0 rounded-pill text-center bg-success">
          <h1 className="display-5 fw-bold">Manufacturers</h1>
          <div className="col-lg-6 mx-auto">
          </div>
        </div>
        <div className="container">
          <h2>Manufacturers.</h2>
          <div className="row gx-5 gy-3 row-cols-3">
            <table className="text-center table border border-5 border-success">
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
            {this.state.manufacturers.map((manu) => {
              return (
                <tr key={manu.id}>
                <td><p>{manu.name}</p></td>
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

export default ManufacturerList;