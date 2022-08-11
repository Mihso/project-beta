import React from 'react'

class Keypress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            picture: "",
            x:200,
            y: 200,
        }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handlePictureChange = this.handlePictureChange.bind(this)
    }

    handlePictureChange(event){
        const value = event.target.value
        this.setState({picture: value})
    }
    Cursor = () => {   
        return (
          <div 
            style={{ 
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              pointerEvents: "none"
            }}
          >
            <svg
              width={50}
              height={50}
              viewBox="0 0 50 50"
              style={{
                position: "absolute",
                left: this.state.x,
                top: this.state.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="25"
                cy="25"
                r="8"
              />
            </svg>
          </div>
        );
      };

      
    _onMouseMove(e) {
        this.setState({ x: e.clientX, y: e.clientY });
      }

    handleKeyPress(props) {
            if(props.key == 'w'){
            this.setState({y: this.state.y + 2});
            }
            if(props.key == 'a'){
                this.setState({x: this.state.x - 2});
            }
            if(props.key == 's'){

                this.setState({y: this.state.y - 2});
                }
            if(props.key == 'd'){
                    this.setState({x: this.state.x + 2});
                    }
    }
    handlePostion(){
        return(<p>{this.state.y} {this.state.x}</p>)
    }
    async componentDidMount() {

    }
    
    render () {
        return (
            <div onMouseMove={this._onMouseMove.bind(this)}>

                        <div className="form-floating mb-3">
                            <input onChange={this.handlePictureChange} value={this.state.picture} placeholder="Picture" required type="url" name = "pictureUrl" id="pictureUrl" className="form-control" />
                            <label htmlFor="pictureUrl">Picture</label>
                        </div>
                            {this.handlePostion()}
                        <img src={this.state.picture} className="img-fluid" style={{height: `${this.state.y}px`, width: `${this.state.x}px`}}/>
            </div>
        )
    }
}

export default Keypress;