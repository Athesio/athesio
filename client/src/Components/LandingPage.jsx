import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import SelectRoom from './SelectRoom.jsx';
import axios from 'axios';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authStatus: false
    }
  }

  async getAuthStatus() {
    return await axios.get('/api/authstatus')
      .then(async authStatus => {
        localStorage.setItem('authenticated', authStatus.data);
        this.setState({
          loading: false
        }, () => {
          if (localStorage.getItem('authenticated') === 'true') this.props.history.push('/selectroom');
        })
      });
  };

  componentDidMount() {
    this.getAuthStatus();
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading" >Loading...</div>
      );
    } else if (!this.state.loading && localStorage.getItem('authenticated') === 'true') {
      return (<ProtectedRoute component={SelectRoom} />);
    } else {
      return (
        <div id="Landing">
          {/*  JUMPING UP TITLE */}
          <div className="row" id="titleBox" >
            <div className="col-xs-12 col-lg-12 text-center" >
              <a className="text-pop-up-top" style={{ fontSize: "250px" }} id="title">ATHESIO</a>
            </div>
            {/* DIVIDER */}
            <div className="text-center" >
              <a style={{ color: '#ffffff' }}>____________________________________________________________________________</a>
            </div>
          </div>
          <div className="row" >
            <div className="col-xs-12 col-lg-12 text-center" >
              {/* , color: 'rgb(49, 102, 218)' */}
              <h2 id="moto" > Welcome to the best collaborative coding environment  <em style={{ textDecoration: 'underline' }} > EVER. </em> </h2>
            </div>
          </div>
          <div className="text-center" id="getStarted" >
            {/* <Link to='/login'> <button type="button" className="btn" > Get started </button> </Link> */}
            <Link to='/login'>Get started </Link>
          </div>

          <div className="row" id="LandingTech" >
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALYSURBVGhD7ZoxTxRRFIW31CWraEmlqBURW6NU4j/AKBoKafgBRKMVlNpRIr+EEEs7jdHSQCyMEhMTtUK7Xb6zOWx2ZwZ23oYZHsOc5OS9e9+9+86bzJ2ZN7ONGjVOETqdThPOwPsJytd0WNxA6Hi73d6hzQRj2zTjDo8XCH0AfyM2deTxt+BfOGdXvEDkE/jNZgoaU4zNcsCE1+Cs+xI4lsO3BoctZM39Wahc/UZ3cUf51B8JJN+Dy+5vwIkcvk04bCGb7i9D5eo3Nob51C8NTBjlqbUA39jMBeIfw582U9AYDFqINMAFm+EgWefphM1cIF7n93/4Ab5NUL49rmiTDs8FcnSajdkMB8m9Ig4BOdNwFcGv+4lvBd5yWG5IAzyeYj9JSIO02DzD4CgEF3sRkAZpsRkOkoOLvQhIg7TYDAfJIxX7cUMapMVmOEiui/3EwfX+Equfp12iXYdb7i/C6w4rHMx1Q3N67i247r4egS47LBsEnIc78Bf8muAP+A8G39BCoTmgng6+w6SOP2pZ1OE7TQJuE6BdXOYVAv9nuGKzMDDHC/jR5gDwt6zxjl1pMK49dcdmCiS/g69sFgYkvNRcNlOQRjBjMw0NKsJmCvVCAoGEeiFdkHxQ7C27BoBfxb5qszAwx3P4yeYApM0aDy92Bg8uv91LXIK7cA9OObwwMMdNqEu95kzqkDa9Nzvn8GwQoBdsj2gHbojwKf2rDisczHdFc1pH/w1RN+v4X/AVAlZfjYdGkivzGF+ZjVU1trqVAUfhbBc7OdpP6O6sx/F+PoPTDssNcsovdm5Wk+ToCeA9zHplqg1T0I2V+PKLnXhtRXdtpsCYXmLP28wFaYDlFjsTRvlZoVfstKf3Qw/JvWKnzfrMluWL79PbKNDkMK5TaxQgcg7qE/QFu3qQz2MP7YoX2isgVH8KyARjX2guOjxuILSJ4Lu0WX/hOHpnV6NGTGg09gFY5kYQ8UTQYgAAAABJRU5ErkJggg==" />
                </a>
                <br />
                <a>Collaborative Editing</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center" >
                {/* SVG is for the Github icon */}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  width="50" height="50"
                  viewBox="0 0 50 50"
                  style={{ fill: "#ffffff" }}>
                  <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg> <br />
                <a>GitHub Integration</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a> <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkIzMDA7IiBkPSJNIDMxLjE5OTIxOSAxMC42MDE1NjMgTCAyNC42MDE1NjMgMTIuODk4NDM4IEwgMjMuMTk5MjE5IDguNjAxNTYzIEMgMjIuNjAxNTYzIDYuODAwNzgxIDIzLjUgNC44MDA3ODEgMjUuMzk4NDM4IDQuMTk5MjE5IEMgMjcuMTk5MjE5IDMuNjAxNTYzIDI5LjE5OTIxOSA0LjUgMjkuODAwNzgxIDYuMzk4NDM4IFogTSAyOS4xOTkyMTkgMjYuNjAxNTYzIEwgMzUuODAwNzgxIDI0LjMwMDc4MSBMIDMzLjUgMTcuMTk5MjE5IEwgMjYuODk4NDM4IDE5LjUgWiBNIDMyLjYwMTU2MyAzNi44MDA3ODEgQyAzMy4xMDE1NjMgMzguMTk5MjE5IDM0LjUgMzkuMTk5MjE5IDM1Ljg5ODQzOCAzOS4xOTkyMTkgQyAzNi4zMDA3ODEgMzkuMTk5MjE5IDM2LjY5OTIxOSAzOS4xMDE1NjMgMzcgMzkgQyAzOC44MDA3ODEgMzguMzk4NDM4IDM5LjgwMDc4MSAzNi4zOTg0MzggMzkuMTk5MjE5IDM0LjYwMTU2MyBMIDM4IDMxIEwgMzEuMzk4NDM4IDMzLjMwMDc4MSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojMDBCRkE1OyIgZD0iTSAxNy4xOTkyMTkgMTUuNSBMIDEwLjYwMTU2MyAxNy44MDA3ODEgTCA5LjE5OTIxOSAxMy42MDE1NjMgQyA4LjYwMTU2MyAxMS44MDA3ODEgOS41IDkuODAwNzgxIDExLjM5ODQzOCA5LjE5OTIxOSBDIDEzLjE5OTIxOSA4LjYwMTU2MyAxNS4xOTkyMTkgOS41IDE1LjgwMDc4MSAxMS4zOTg0MzggWiBNIDE4LjYwMTU2MyA0MS44MDA3ODEgQyAxOS4xMDE1NjMgNDMuMTk5MjE5IDIwLjUgNDQuMTk5MjE5IDIxLjg5ODQzOCA0NC4xOTkyMTkgQyAyMi4zMDA3ODEgNDQuMTk5MjE5IDIyLjY5OTIxOSA0NC4xMDE1NjMgMjMgNDQgQyAyNC44MDA3ODEgNDMuMzk4NDM4IDI1LjgwMDc4MSA0MS4zOTg0MzggMjUuMTk5MjE5IDM5LjYwMTU2MyBMIDI0IDM1Ljg5ODQzOCBMIDE3LjM5ODQzOCAzOC4xOTkyMTkgWiBNIDE5LjM5ODQzOCAyMi4xOTkyMTkgTCAxMi44MDA3ODEgMjQuNSBMIDE1LjEwMTU2MyAzMS42MDE1NjMgTCAyMS42OTkyMTkgMjkuMzAwNzgxIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMwMEJDRDQ7IiBkPSJNIDMzLjM5ODQzOCAxNy4zMDA3ODEgTCAzMS4xOTkyMTkgMTAuNjk5MjE5IEwgMzUuMzAwNzgxIDkuMzAwNzgxIEMgMzcuMTAxNTYzIDguNjk5MjE5IDM5LjEwMTU2MyA5LjYwMTU2MyAzOS42OTkyMTkgMTEuNSBDIDQwLjMwMDc4MSAxMy4zMDA3ODEgMzkuMzk4NDM4IDE1LjMwMDc4MSAzNy41IDE1Ljg5ODQzOCBaIE0gMjYuODAwNzgxIDE5LjYwMTU2MyBMIDI0LjYwMTU2MyAxMyBMIDE3LjE5OTIxOSAxNS42MDE1NjMgTCAxOS4zOTg0MzggMjIuMTk5MjE5IFogTSA2LjM5ODQzOCAxOS4zMDA3ODEgQyA0LjYwMTU2MyAxOS44OTg0MzggMy42MDE1NjMgMjEuODk4NDM4IDQuMTk5MjE5IDIzLjY5OTIxOSBDIDQuNjk5MjE5IDI1LjE5OTIxOSA2LjEwMTU2MyAyNi4xMDE1NjMgNy41IDI2LjEwMTU2MyBDIDcuODk4NDM4IDI2LjEwMTU2MyA4LjMwMDc4MSAyNiA4LjYwMTU2MyAyNS44OTg0MzggTCAxMi42OTkyMTkgMjQuNSBMIDEwLjUgMTcuODk4NDM4IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNFOTFFNjM7IiBkPSJNIDE1LjEwMTU2MyAzMS41IEwgMTcuMzAwNzgxIDM4LjEwMTU2MyBMIDEyLjYwMTU2MyAzOS42OTkyMTkgQyAxMi4xOTkyMTkgMzkuODAwNzgxIDExLjgwMDc4MSAzOS44OTg0MzggMTEuNSAzOS44OTg0MzggQyAxMCAzOS44OTg0MzggOC42OTkyMTkgMzkgOC4xOTkyMTkgMzcuNSBDIDcuNjAxNTYzIDM1LjY5OTIxOSA4LjUgMzMuNjk5MjE5IDEwLjM5ODQzOCAzMy4xMDE1NjMgWiBNIDQzLjY5OTIxOSAyNS4zMDA3ODEgQyA0My4xMDE1NjMgMjMuNSA0MS4xMDE1NjMgMjIuNSAzOS4zMDA3ODEgMjMuMTAxNTYzIEwgMzUuODAwNzgxIDI0LjMwMDc4MSBMIDM4IDMxIEwgNDEuNjAxNTYzIDI5LjgwMDc4MSBDIDQzLjM5ODQzOCAyOS4xMDE1NjMgNDQuMzk4NDM4IDI3LjEwMTU2MyA0My42OTkyMTkgMjUuMzAwNzgxIFogTSAyMS42OTkyMTkgMjkuMTk5MjE5IEwgMjMuODk4NDM4IDM1LjgwMDc4MSBMIDMxLjMwMDc4MSAzMy4xOTkyMTkgTCAyOS4xMDE1NjMgMjYuNjAxNTYzIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMzODhFM0M7IiBkPSJNIDMzLjM5ODQzOCAxNy4zMDA3ODEgTCAzMS4xOTkyMTkgMTAuNjAxNTYzIEwgMjQuNjAxNTYzIDEyLjg5ODQzOCBMIDI2LjgwMDc4MSAxOS42MDE1NjMgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzAwODk3QjsiIGQ9Ik0gMTcuMTk5MjE5IDE1LjUgTCAxMC42MDE1NjMgMTcuODAwNzgxIEwgMTIuODAwNzgxIDI0LjUgTCAxOS4zOTg0MzggMjIuMTk5MjE5IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNCRjM2MEM7IiBkPSJNIDI5LjE5OTIxOSAyNi42MDE1NjMgTCAzMS4zOTg0MzggMzMuMzAwNzgxIEwgMzggMzEgTCAzNS44MDA3ODEgMjQuMzAwNzgxIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiM0RTM0MkU7IiBkPSJNIDE1LjEwMTU2MyAzMS41IEwgMTcuMzAwNzgxIDM4LjE5OTIxOSBMIDIzLjg5ODQzOCAzNS44OTg0MzggTCAyMS42OTkyMTkgMjkuMTk5MjE5IFogIj48L3BhdGg+PC9nPjwvc3ZnPg=="></img> </a>
                <br />
                <a>Slack</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOgSURBVGhD7Zk5aBRxGMVjPGIuNSKCeKAYFAvFRjxiYQQbGwmoBBGDR6GFwRQiCoohiJX3EQRboxiPQkHSBEQbiYUXHhER0niAwSRNxCTr75t9u7Iku5mZ/W9gYB48v5n3/96b+cjs7OxYFCNGjBjRRCKRKIZVEWKFTj0JhLKRkZFW2M92pMA5f4F13iBsXJL4F/ZGiH2p86astkF+SFjmTRYhcM7ndO4tdml50FqkwACH7Nyp1ws6CLFTYBUHKpXkFAUdhNAN8AbshsOKt4PZB7MFVqo1b5DlfhDCZsMHiksD7SdM3xHZfgv3szlL1tAgx+0g2CsIe2U51O/wJFwOS9RiB62G6UHZ7oP1Wg4F/G4HIeiaZVBfw/mSR4G1ctgA29U/BDdrOTDwuhsE60yC/sDk/dwn6D/jHTiReCkpMFwPssP8hHVK8gX6S2GvvFn/irmAz90ghDQr4rQk38DbYUbqVkmB4HqQK+anHpTkG3huybtLUiDgczrIZfNT90nyDTy35Q1198LndJBT5qcel+QbeJ7KWyspEPA5HWSP+amtknwBSzGeX/LOlRwI+JwOstL81C5JvkD/Kvk+SQoMvO4GwTrH/ITZd4nvh0N6j8j3WFJg4HX6F2kyP7UDlkseF/TWwH5oX6ShnrvwOh3krPmpTZJ8A89HeZdKCgR8TgfZbX5qJ1woOSdon0ZvLRyG9mQ8WUuBgNfpIJXwm2VQ30nOCfpqvIMCti9KDgy87gYxYF8MfxNoLzDG/ZzQ02jHpLZRpkoODPxuBzEQ9shyqA2SsoKe5+pNvsoJCfwFGWS75VC7KWWSR4H1LeqzL8PpkkOBDPeDEGHf1F2WRX0oOQPoS+CAeholhwYZ7gcxELjesqjPJGUAvVrrnymTJIcGOYUZhJiNlpVtEJYWaf2rpLwwEYM8kZQB9Hla75GUFwo2CIHnLYvaLikD6PbywW7R9tJhreTQIMPtIAStgPcth2pYp6VRYC31i3IAnmAz878HAgC/m0GwbSLkDvTeKFIHYc6frayX0HrX+g3s2wu8ZrhALb6B5/8g/DPkJfq8i9Bnz0kH4PukzQuyy6UNVqttXNBbB98owjLscrsHfV9y9KYGuWo7XhjVnmLt1U5W0rMX2q0zDfZ74FE2x/TkIr6d8CYcZD8N9u23/JieFOmphy/Ytv7DNsg2aL8JIgnO/QMl+TljZw28gGDXbiTI+dqlfAzO8IaIESNGjBgTj6KifxEFvzU5pO4HAAAAAElFTkSuQmCC" /></a>
                <br />
                <a>Video Chatting</a>
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="row" id="LandingTech2" >
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMNSURBVGhD7ZmxaxRBFMYvESVooUZMYSEi2okIAbEQFKwExSIRAkEtjI2ihYISRNBCNE0EQSSNCKKIpZWVifoH2ChaiIWiomDUSAoTvfP3hm+D593N7iW7O0vYH3zMzvfezMvL7t7t3VVKSnKmVqstr1arN9A3jlOFPd+iIZXKFgqNqegfNJmifrhugON9KpcN1OikyBT6zfFG2anBvifVyD1Z2UCNlVYIvstKFfbdaZvTyDNZ2UAN1wiF7DJYnbbYdy9jfo1kTZ5nxGh2wy5UU7k2AovjHoGyER/sm6gR4j3otKbtQ43gjRC297LnlgcXZbcHC4tyRgZRRJ/s5FCjMPcIOWeV+xX1yE4G64I0Yn8o2qrpHHgPlX9LVjJYk3sjHK9BL9EXtFm2g9QNeL/QLNokOx4W5t4I02XMo//8C4alCjnwoqfxEVnxkB/k0sLqwnul2BnZDqxe+e9lxUN+sJsdb49iHxk6ZTvw3im2RZYfcoM1YuC/tjjsluXAv2sm42FZfsgN3cgVxc/LcjAfln9Zlh9yQzcypPhNWQ7mx5r5LSE3dCP9itd9FGY+aD7cluWHxNCNnFJ8VJaD+Qn512X5ITd0I3cUPy7LgXVV/jlZfsgN1gi2fZ82aXFYL9uBP24m435ZfsgN1gjeBYvBhCwHfjeaQfY9W7dsP2wSpBHm29E0MnbIdjA/pDVPZcVDfqhGoveJa7IcWHMfshiPyo6H/JCX1hFCSzR14EVn4wNDl+x4SA7WyP+QsxZFz1jJz4bBmkI0Qoo92j+xXJhAHQolgwWFaIT4gPI+o3Wyk8PaIl1al0jdpml7sLAwjSwIaiyuRig0zXAwbbGve/fO84xkSp5nZIbhQdpi38eMuZ4R7z1C3L7ZaHbp9KOWL5fkFOdmJ7aKP8R+LG1F3dPrvxDLpxEKrFChn7IaINxB3F7jm10699EBpTZAbBd5tv+4rOygyBsVs280Gi6f+Yr9BtAjjm3vuo+ymUCRPjRrBbOAvT+h9h875gP1eik2gsZS1jBq7yeCkpIQVCp/AXAQPn5FCELWAAAAAElFTkSuQmCC" />
                </a>
                <br />
                <a> Mobile Development </a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL0SURBVGhD7ZpNiE1xGMYv+YghYygLTMyCNNRMIgsrY2PJsLnJUrKQjSRbKTXsxCxmI7JiZ6Gx8LEgnyUK42NLiTE3RcPl9x7POR333NM5Z5r/vedwnnp673nf93n/79OcW3fOvRVXqNfrm+Ao/ALfwSG4UOVigIW3wK+/GkDuFmGO2vIPFr6rxb2/AlwHnym3T22tAWfO59Cz8LMtkBXo3hNmaJyZ2/mnkg3oDC/goEZlA8JhDfoJP8WRlnH1/WiondYoD1wvga9C9QnpJkO5ZqyF5m/WuHRANxPRhIl53aN0U1Dv1kFPlUoFJFulu6NULOg5od4zSqUDmkUmBONKxYIe38hzwuK0pH8HMa2RqnovKZUOaDIbmSpY7rZGxaIlRhg+D96Hze7vJH6ERzQqFvS4N9IKlEbQlEZcoDSCpjTiAoUzwqLL4VxdBiiUEZbcBu2D4UWlAhTGCOcsYMm3diDxmNIBnBlh4DJqPSn513+EaCO3D9fn6LNFHxFmKx2A/PQbYdhaOKl6Iui9Kqlp15gWPqDUqdwANHyHG7zGBpB3YqQLjlJ7mIb0HpLU5nZy/YZosNpK6N9Sx9UWAbX8vUeY2R1a3ntAQbS/0Cy1RJBLIwbmhs18g70qNUVujRiYbWbsFt2vVCxybSQLSiNoSiMuUDgjLNoPu3QZoFBGWHIQGq4oFYBcMYxwzlKW/GAHEg8oHcCZEfJ9cHsSOXiA6H2m8kEucvtwfZk+w00YPPj2QX36jTCsF9ZVTwSt1yQ17XrlxuAK5XYrV4OrvcYGkHdipMMGQvs2KonXYVVS09pTycc2mDhG6CP6t9RBtUVALX/vEZaxrxee2HCiPe23eIMQuaV8UM/nm52Fwmbse5JVKjVFbo0YZGYEJn4TlWsjWVAaQVMacYHSCJp/wwiCDglrSrUV7LFX+1xQKj0QvZb4FGFPu8j5VXiP17bLUa2XHoh2wdRPFF2DXV7Cqf26CP1GxCfhcBt5Hh6GxfqJ1H+OSuU3BeOJgEllFsMAAAAASUVORK5CYII=" />
                </a>
                <br />
                <a> Unit Testing</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJoSURBVGhD7ZixS1ZRGMY/CUoskECJME3DSfgWB/sHgmiMaBFcGlwSW5sCh3DJxqC/QHETqiUix7bASRIjSTAc3KxB+/T3Xh8vEsd7O+DnfY/cHzy85577Hn0e9J7vnq/RarU+H0TCmoWGN+QtCoJsaLkf5O1Al4XQNmC9yQbB+C00QVu6QbjVjfEV66G+UPUbBDow+BIN6Zbd6+L6k92krqCmxn6DYG5K9RcaY3iJuqS5NXSDYeG/FvNZ0POG3/vmZJCr6Nj4Lvqg8TYaNqNclgUZQTsV6FUexIxQ7K/w+mgmD3Q3cwlMpfWwY/Qp+oPuayqDtvR2Lcz2a5hDm/8gcL1MBPC/a8XgMgim5tF6pOa0vKbmwsOzew3diVSnlvuBB3cVY7Esa7kfZMy21NDu9K821JvOJ3sI2tJ7RTkJxptoBt223iSDYNqOuT+thzqr6voV5TIGF1D+2s64F32zm9T3aFjjYBD7GSi0y7VbPXkQzD1T/Y0eMbRj7hfNWe1CZQer6k+IkB+qqH/R8RcOdsztNaNclgUZQh8r0HQeRF7MzBTatznqFsqOuQZTae1aGH2ANlFTUxm0pbf9YvaKhjm0+Q8C98pEgHGqzyCYapm5GFjyQ8v9gCn7djG0ExRpWstrai48PLuDKLhLnSaekZta7gdMbWMuCtZ81XI/yJuxWCYCvKOm9ckegrb0XlFC0FYHaTtmzNBlIbQVBuFWN3p83sLP6JkGYb76E6K8FEJbWZA+9LYCjZ9pkEoxY4YuC6GtDtJ2zJiY/A89Rz6DYGrPzMXAmu9a7gdMPUGhnaBID7XcCY3GIfNVEZCIRI83AAAAAElFTkSuQmCC" />
                </a>
                <br />
                <a> Scrum Board</a>
              </p>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <p className="text-center"  >
                <a>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASTSURBVGhD7ZltiFRVGMdXTRFsW9/BIikoUMIvGikqgpqEWdIHw7fIlIVdDVFBUUj8YLIbfdLQFRX2S2xknwqEkMIQKV+pXLINdMWXpLAURY3wZbfff+c/V6eZce89M7NecP/w49znOc/znHNmd+65505Vr8qkjo6OZ+ENWAr18CaMcne61dnZ+QSTXUZ7graDNk+4j8G7XPZ1WrrE5F6CXzzZNtgEMzDH0I6F2bAFLjjmOLzo9DBR5zl4C94uB0yojvYa7d+wmOs+HipP9OmvtgpuwhV4xV3JRGIt3KFgWUXN0/C8h+lWpEwg/rKJnReJpD/gZ3iNYq+WAjVmwZ9wHV7wELFFzkT4F762K54YfDRIG+wqSUxgvorR1tuVWORucY2ZdnUvguc4aY5dQaJEX2pMh1PwO/YAdyUWuYOpoe/LXru6F0kbQBptV2Ix4GT40XX0oWx1V7C0CLhKuXi3ZIJbCL5mM7HI1+Z2G/S92O2FzHd3sKixxrXi3Y4JbIVDNhOJPO0Dd+EHGAFzPfg0hwSLGgtda5JdxUVcfwL1aTbZFVvkVMNFaKdOjX0joQF7YFdQCaKOdnppgl3FRfA4RdIutyu2yFnh3NftKpuo+QF07Wu0+o/RWMW/KwQsUjCaaldskXsQzpJbdMcOFXVnwE5zXhOkPQojHJIrOhoVhLr+NZKI3BvQbLNiYm66rdeBvgJHsPu7677o2AfnbcaWimv15DbaVXExVr3HXGLXfWkRsM9mbGkh5P0Du+yquBizH+Pp2e2IXRnRUeMVBn2q5P0kbPaIGK8ZbtrMiDVM9UIW2ZVI5G10/st2VVxeyA2bGeFY7omMsyuRyBsFesI9TJng56q4Yow+jHUGcjdvHE1wm4D8u0BMkf++P4y9NCVvgg/TA2PV2pURjkPQajNY1PjQA+g8M8vusonSOj2uBj0KHcTu566McOgY2mKzJFHnHfjLC7pI8wXtNtqPQiH/Y/gUsuf5AzDMQ2aEv6yHKYlaTzLQStgPl6DkozM1dH7/BvQAmf+IQkdZDlOVEvOKdyMipuTDVCXFvOJtDQSUdJiqtJhbvM2agODDVE+J+enx6Sub+WKhwYepnhTz0wPtWZv5ojN7mKqzK5Vifo0gVduVKzqyZ2E99OnWllbaPM/CZ3Y6sre2VpoTaYX5/UareRbeIrILQam89WbF/LK34Md4IfiCn4TLLeaSfCH4hsK3cA9Owlh3xRY5gyB6+079GuzopwGu9QLvaZuy9TNc9BCoWHjKZvBCtmLraXgN/AoH7H8G1sF6o9yCr3/oa4Do9Mb1LmizKVv7QrQJc30YPrcpWy/7dtgMXsiX8L2vt8M5Xy+G6Hc/Lm/RDFff/0Vfk2Jsym6B6A0N1znnH11D9OKD1JxjBXbQQhbIQdsOUoO71FdN1xBT9BRI3Fz4zKYm8h72dpvqXwubbcrWhrfSpuw9sNBm2EIkJcAnsJS+R/7rKnMIW0jaxPwen4XMc4Be/xf8QTMNML9mWqnwzwp0DCDou0xMusU8H/5yhBi9R51CW/DH/jTA/MZ7ur3qVa8SqarqP6fmK/ZUpY11AAAAAElFTkSuQmCC" />
                </a>
                <br />
                <a> Cloud Storage</a>
              </p>
            </div>
          </div>
          <div className="text-center" >
            <a style={{ color: '#ffffff' }}>____________________________________________________________________________</a>
          </div>
          <div className="row" >
            <div className="col-xs-12 col-md-12 col-lg-12" >
              <div className="text-center" >
                <h3>Our Team</h3>
              </div>
            </div>
            {/* First row of our team */}
            <div className="row" >
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div className="row" >

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <p className="text-right" >
                  <a>
                  <img src="https://avatars1.githubusercontent.com/u/20894704?s=460&v=4" alt="img" style={{ height: '70px', width: '70px' }}  />
                  </a>
                  <br/>
                  <label>Jacob Hood</label>
                </p>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <em>Full Stack Engineer</em>
                <p></p>
                <a href="https://github.com/jacobwhood">Github</a>
              </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div className="row" >
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <p className="text-right" >
                  <a>
                    <img src="https://avatars0.githubusercontent.com/u/40183724?s=96&v=4" alt="img" style={{ height: '70px', width: '70px' }}  />
                  </a>
                  <br/>
                  <label>Shawn Acevedo</label>
                </p>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                  <em>Full Stack Engineer</em>
                  <p></p>
                  <a href="https://github.com/shawnxa">Github</a>
                </div>
              </div>
            </div>
            {/* First row of our team */}
            <div className="row" >
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div className="row" >

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <p className="text-right" >
                  <a>
                  <img src="https://avatars1.githubusercontent.com/u/20894704?s=460&v=4" alt="img" style={{ height: '70px', width: '70px' }}  />
                  </a>
                  <br/>
                  <label>Jacob Hood</label>
                </p>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <a>Full Stack Engineer</a>
                <p></p>
                <a href="https://github.com/jacobwhood">Github</a>
              </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div className="row" >
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <p className="text-right" >
                  <a>
                    <img src="https://avatars0.githubusercontent.com/u/40183724?s=96&v=4" alt="img" style={{ height: '70px', width: '70px' }}  />
                  </a>
                  <br/>
                  <label>Shawn Acevedo</label>
                </p>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                  <a>Full Stack Engineer</a>
                  <p></p>
                  <a href="https://github.com/shawnxa">Github</a>
                </div>
              </div>
            </div>
          </div>
          {/* Second row of our team */}
          <div className="row" >
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div className="row" >

            </div>
          </div>
          {/* Second row of our team */}
          <div className="row" >
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div className="row" >

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <p className="text-right" >
                  <a>
                    <img src="https://avatars2.githubusercontent.com/u/26049245?s=96&v=4" alt="img" style={{ height: '70px', width: '70px' }}  />
                  </a>
                  <br/>
                  <label>Sieh Johnson</label>
                </p>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
              <em>Full Stack Engineer</em>
                  <p></p>
                  <a href="https://github.com/siehj">Github</a>
              </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div className="row" >
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <p className="text-right" >
                  <a>
                    <img src="https://avatars1.githubusercontent.com/u/31697282?s=460&v=4" alt="img" style={{ height: '70px', width: '70px' }}  />
                  </a>
                  <br/>
                  <label>Taro Yamashita</label>
                </p>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <em>Full Stack Engineer</em>
                  <p></p>
                  <a href="https://github.com/taroyamashita">Github</a>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          
          </div>
        </div>
      );
    }
  }

}

export default withRouter(LandingPage);
