import React from 'react'

function columns(state, props)
{
    return (
        <tr className="col">
          {props.map(col => {
            if(state.x === col[1] && state.y === col[0])
            {
            return (
              <td>
                [x]
              </td>
            );}
            else if(state.aiX === col[1] && state.aiY === col[0])
            {
                return (
                    <td>
                        [g]
                    </td>
                )
            }
            else{
                return (
                    <td>
                      [_]
                    </td>
                  );   
            }
          })}
        </tr>
      );
}

function hold()
{
    if(this.state.x !== this.state.aiX && this.state.y !== this.state.aiY)
    {
    let xChange = 0;
    let yChange = 0;
    if(this.state.x > this.state.aiX)
    {
        xChange = 1
    }
    else{
        xChange = -1
    }
    if(this.state.y > this.state.aiY)
    {
        yChange = 1
    }
    else{
        yChange = -1
    }
    this.setState({aiX: this.state.aiX + xChange, aiY: this.state.aiY + yChange})
}
}

function gridFormation(height, width)
{
    let full = []
    for(let h = 0; h < height; h++)
    {
        let row = []
        for(let w =0; w < width; w++)
        {
            row.push([h,w])
        }
        full.push(row)
    }
    return full
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            picture: "",
            x:1,
            y:1,
            grid: [],
            wait: false,
            aiX: 9,
            aiY: 9,
        }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handlePictureChange = this.handlePictureChange.bind(this)
    }

    handlePictureChange(event){
        const value = event.target.value
        this.setState({picture: value})
    }

      
    _onMouseMove(e) {
        this.setState({ x: e.clientX, y: e.clientY });
      }

    hold()
    {
    if(this.state.wait === false)
    {
    if(this.state.x !== this.state.aiX || this.state.y !== this.state.aiY)
    {
    let xChange = 0;
    let yChange = 0;
    if(this.state.x > this.state.aiX)
    {
        xChange = 1
    }
    else{
        xChange = -1
    }
    if(this.state.y > this.state.aiY)
    {
        yChange = 1
    }
    else{
        yChange = -1
    }
    this.setState({aiX: this.state.aiX + xChange, aiY: this.state.aiY + yChange, wait: true})
}
}
    }
    handleKeyPress(props) {
            if(props.key === 'w'){
            this.setState({y: this.state.y - 1});
            }
            if(props.key === 'a'){
                this.setState({x: this.state.x - 1});
            }
            if(props.key === 's'){

                this.setState({y: this.state.y + 1});
                }
            if(props.key === 'd'){
                    this.setState({x: this.state.x + 1});
                    }
            this.hold();
            if(this.state.wait === true)
            {
                this.setState({wait: false})
            }
    }
    handlePostion(){
        return(<p>{this.state.y} {this.state.x}</p>)
    }
    handleGridChange(event){
        const value = event.target.value
        this.setState({grid: gridFormation(10,10)})

    }

    async componentDidMount(){
        this.setState({grid: gridFormation(10,10)})
    }
    
    render () {
        return (
            <div>

                        <div className="form-floating mb-3">
                            <input onChange={this.handlePictureChange} value={this.state.picture} placeholder="Picture" required type="url" name = "pictureUrl" id="pictureUrl" className="form-control" />
                            <label htmlFor="pictureUrl">Picture</label>
                            <input onKeyDown={(e) => this.handleKeyPress(e)} placeholder="Movement" required type="text" name = "move" id="move" className="form-control" />
                        </div>
                        <table>
                            <tbody>
                            {
                            this.state.grid.map(row => {
                                return(
                                    <>
                                        {columns(this.state, row)}
                                    </>
                                )
                            })}
                            </tbody>
                        </table>
            </div>
        )
    }
}

export default Game;