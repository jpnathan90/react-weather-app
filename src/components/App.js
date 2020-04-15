import React, { Component } from 'react'

class App extends Component {
  state = {
    stateIds: [5391811, 5128638, 4435652],
    result: '',
    error: false,
    selectedNote: 5128638
  }

  componentDidMount() {
    this.getWeatherDetails();
    this.interval = setInterval(() => {
      this.getWeatherDetails();
    }, 5000);
  }

  getWeatherDetails() {
    this.setState({
      selectedNote: this.state.stateIds[Math.floor(Math.random() * this.state.stateIds.length)]
    })

    let stateId = this.state.selectedNote;
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?id=' + stateId;
    const apiId = '&appid=13fdb39fa4267ca2300edbfdd1e93501&units=imperial';
    let apiUrl = baseUrl + apiId;
    fetch(apiUrl)
      .then(res => {
        if (res.status !== 200) {
          const index = this.state.stateIds.indexOf(stateId);
          if (index > -1) {
            this.setState({
              stateIds: this.state.stateIds.filter(item => item != stateId),
              error: true,
              weatherInfo: null
            })
          }
        }

        return res.json();
      })
      .then(res => {
        const weatherInfo = {
          city: res.name,
          country: res.sys.country,
          description: res.weather[0].description,
          temp: res.main.temp,
        };

        this.setState({
          result: weatherInfo,
          error: false,
        });
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleWeatherForm(e) {
    e.preventDefault()
    let inputStateId = this.refs.inputStateId.value
    if (inputStateId) {
      this.setState({ stateIds: [...this.state.stateIds, inputStateId] })
    }
  }

  render() {
    const { city, country, temp, description } = this.state.result;
    return (
      <div>
        <form className="form-inline" onSubmit={this.handleWeatherForm.bind(this)}>
          <input type="number" className="form-control" ref="inputStateId" placeholder="Please enter state id" />
          <input type="submit" className="btn btn-default" value="Add Location" />
        </form>
        <div className="col-sm">
          <div className="weather-card one">
            <div className="top">
              <div className="wrapper">
                <h1 className="heading">{city}, {country}</h1>
                <p className="temp">
                  <span className="temp-value">{temp}</span>
                  <span className="deg">0</span>
                  <span className="temp-type">F</span>
                </p>
                <h1 className="heading">{description}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App