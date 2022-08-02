import React from 'react';

class SaleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    };
  }

  async componentDidMount() {

    const salesUrl = `http://localhost:8090/api/sales/`;

        const response = await fetch(salesUrl);
        if (response.ok) {
            const data = await response.json();
            this.setState({sales: data.sales})
        }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">sales</h1>
          <div className="col-lg-6 mx-auto">
          </div>
        </div>
        <div className="container">
          <h2>Sales.</h2>
          <p> </p>
          <div className="row gx-5 gy-3 row-cols-3">
            <table className="center table">
                <thead>
                    <tr>
                        <th scope="col">Sale's Person</th>
                        <th scope="col">Employee Number</th>
                        <th scope="col">Purchaser</th>
                        <th scope="col">Automobile VIN</th>
                        <th scope="col">Price of sale</th>
                    </tr>
                </thead>
                <tbody>
            {this.state.sales.map((sale) => {
              return (
                <tr scope="row" key={sale.id}>
                <td><p>{sale.person.name}</p></td>
                <td><p>{sale.person.employeeNumber}</p></td>
                <td><p>{sale.customer.name}</p></td>
                <td><p>{sale.auto.vin}</p></td>
                <td><p>${sale.price}</p></td>
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

export default SaleList;