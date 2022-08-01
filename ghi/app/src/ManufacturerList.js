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

    const hatsUrl = `http://localhost:8100/api/manufacturers/`;

        const response = await fetch(hatsUrl);
        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers})
        }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Hats</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
            Lots of hats, look at these hats, you want the hats.
            </p>
          </div>
        </div>
        <div className="container">
          <h2>Hat selection and destruction.</h2>
          <div className="row gx-5 gy-3 row-cols-3">
            <table className="center">
                <tbody>
            {this.state.manufacturers.map((manu) => {
                console.log(manu);
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