import "./Chat.css";
import { Component } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

class Chat extends Component {
  state = {
    profile: null,
  };
  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let id = null;
    for (let param of query.entries()) {
      if (param[0] == "id") {
        id = param[1];
      }
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ id });
    await axios.post("/api/profile/id", body, config).then((res, err) => {
      this.setState({ ...this.state, profile: res.data });
    });
  }

  render() {
    return (
      <div className='cnt'>
        <div className='side'>
          <div className='bg-primary p profile'>
            <img
              className='round-img'
              src={this.state.profile ? this.state.profile.imageUrl : null}
              alt=''
            />
          </div>

          <div className='bg-light p profile'>
            <div className='Phone'>
              <br className='DesktopOnly' />
              <h2 className='text-primary'>
                {this.state.profile ? this.state.profile.user.name : null}
              </h2>
              <p>{this.state.profile ? this.state.profile.status : null}</p>
              <p className='DesktopOnly'>
                {this.state.profile ? this.state.profile.location : null}
              </p>
            </div>

            <p className='DesktopOnly'>
              <br />
              <hr />
              <br />
              <h3>
                {this.state.profile ? this.state.profile.user.name : null}'s Bio
              </h3>
            </p>
            <p className='DesktopOnly'>
              {this.state.profile ? this.state.profile.bio : null}{" "}
            </p>
          </div>
        </div>
        <div className='chatbox'>Chat box</div>
      </div>
    );
  }
}

export default Chat;
