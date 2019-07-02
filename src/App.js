import React, { Component } from 'react';
import {Router, Route} from 'react-enroute';

import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

//  Components
import Main from './components/Main';
import Settings from './components/Settings';
import NotFound from './components/NotFound';

//  Stores
import SettingsStore from './stores/SettingsStore';

//  Stylesheets & images
import './App.css';

//  Theme(s):
const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0b5994',
    },
    secondary: {
      main: '#1d83c6',
    },
    background: {
      default: "#000",      
    },
    type: 'dark',
  },
});

const getHash = hash => {
  if (typeof hash === 'string' && hash.length > 0) {
    if (hash.substring(0, 1) === '#') {
      return hash.substring(1);
    }
    return hash;
  }
  return '/';
};

class App extends Component {  

  constructor(){
    super();
    this.state = {
      location: getHash(window.location.hash),
      settings: SettingsStore.getSettings()
    };

    //  Bind our events: 
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  hashChangeHandler(e) {
    this.setState({
        location: getHash(window.location.hash)
    });
  }

  componentDidMount(){    
    //  Add a hash change listener:
    window.addEventListener("hashchange", this.hashChangeHandler);

    //  Add store listeners ... and notify ME of changes
    this.settingsListener = SettingsStore.addListener(this._onChange);    
  }

  componentWillUnmount() {
	    //  Remove store listeners
	    this.settingsListener.remove();
	}

  render() {
    
    return (
      <MuiThemeProvider theme={defaultTheme}>
        <Router {...this.state} coords={this.props.coords}>
          <Route path="/" component={Main} />
          <Route path="/settings" component={Settings} />
          <Route path="*" component={NotFound} />
        </Router>            
      </MuiThemeProvider>
    );
  }

  _onChange() {
    this.setState({
      settings: SettingsStore.getSettings()
    });
  }

}

export default App;
