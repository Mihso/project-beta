import React from 'react'

function columns(stage, props)
{
    return (
        <tr className="col">
          {props.map(col => {
            if(stage.state.x === col[1] && stage.state.y === col[0])
            {
            return (
              <td>
                <button type="button" onClick={() => {stage.setState({hit: true})}} style={{width: "35px"}}>[x]</button>
              </td>
            );}
            else if(stage.state.aiX === col[1] && stage.state.aiY === col[0])
            {
                return (
                    <td>
                    <button type="button" style={{width: "35px"}}>m</button>
                    </td>
                )
            }
            else{
                return (
                    <td>
                      <button type="button" style={{width: "35px"}}>[ ]</button>
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

function hitButton(props)
{
    if(props === true)
    {
    return(
        <div>
            <p>You successfully hit the button</p>
        </div>
    )
    }
    else{
        return(
            <div>
                <p>You missed</p>
            </div>
        )
    }
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
            hit: false,
            aiX: 9,
            aiY: 9,
        }
        this.handlePictureChange = this.handlePictureChange.bind(this)
    }

    handlePictureChange(event){
        const value = event.target.value
        this.setState({picture: value})
    }

    columns(props)
{
    return (
        <tr className="col">
          {props.map(col => {
            if(this.state.x === col[1] && this.state.y === col[0])
            {
            return (
              <td>
                <button type="button" onClick={() => {this.setState({hit: true})}} style={{width: "35px"}}>[x]</button>
              </td>
            );}
            else if(this.state.aiX === col[1] && this.state.aiY === col[0])
            {
                return (
                    <td>
                    <button type="button" style={{width: "35px"}}>m</button>
                    </td>
                )
            }
            else{
                return (
                    <td>
                      <button type="button" style={{width: "35px"}}>[ ]</button>
                    </td>
                  );   
            }
          })}
        </tr>
      );
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

    handleSubmit(event){
        event.preventDefault()
    }


    async componentDidMount(){
        this.setState({grid: gridFormation(20,20)})
    }
    
    render () {
        return (
            <div>

                        <div className="form-floating mb-3">
                            <input onChange={this.handlePictureChange} value={this.state.picture} placeholder="Picture" required type="url" name = "pictureUrl" id="pictureUrl" className="form-control" />
                            <label htmlFor="pictureUrl">Picture</label>
                            <input onKeyDown={(e) => this.handleKeyPress(e)} placeholder="Movement" required type="text" name = "move" id="move" className="form-control" />
                        </div>
                        {hitButton}
                        <table>
                            <tbody>
                            {
                            this.state.grid.map(row => {
                                return(
                                    <>
                                        {this.columns(row)}
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