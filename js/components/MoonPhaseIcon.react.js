import {Component} from 'react';

class MoonPhaseIcon extends Component{

  render() {

    //  Yahoo numeric codes are here: https://developer.yahoo.com/weather/documentation.html
    //  Forecast.io icon codes are here: https://developer.forecast.io/docs/v2#forecast_call
    
    //  Set the default icon:
    var iconClass = "wi-moon-waning-gibbous-3";

    if (this.props.phase < .09) { iconClass = "wi-moon-new"; } else
    if (this.props.phase < .18) { iconClass = "wi-moon-waxing-crescent-4"; } else
    if (this.props.phase < .26) { iconClass = "wi-moon-first-quarter"; } else
    if (this.props.phase < .37) { iconClass = "wi-moon-waxing-gibbous-3"; } else
    if (this.props.phase < .51) { iconClass = "wi-moon-full"; } else
    if (this.props.phase < .64) { iconClass = "wi-moon-waning-gibbous-3"; } else
    if (this.props.phase < .80) { iconClass = "wi-moon-third-quarter"; }

    //  Make sure the additional 'wi' class is added:
    iconClass = "wi " + iconClass;
    
  	return (
        <i className={iconClass}></i>
    );
  }
}

export default MoonPhaseIcon;