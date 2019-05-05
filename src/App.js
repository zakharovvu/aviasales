import React from 'react';
import './App.css';
import logo from './img/logo.png'
import aircraft  from './img/aircraft.png'
import line  from './img/line.png'
import getData from './components/data'

class App extends React.Component {

  state = {
    isLoad: false,
    data: [],
    check: [ false, true, false, false, false, ],
    nameCheck: ['Все', 'Без пересадок', '1 пересадка', '2 пересадка', '3 пересадка'],
    currencyTitle: ['RUB', 'USD', 'EUR'],
    currency: [1, 64, 72],
    indexCurrency: 1,
  }
  componentDidMount() {
    this.setState({data: getData, isLoad: true})
  }
  handleThis(index, e) {
    e.preventDefault();
    let arrTransefNot = this.state.check
    this.state.check.map((_, i) => index === i ? arrTransefNot[i] = true : arrTransefNot[i] = false )
    this.setState({check: arrTransefNot})
  }
  handleCheck(index) {
    if (index === 0) {
      let isCheck = !this.state.check[index]
      let arrTransefNot = this.state.check
      this.state.check.map((_, i) => arrTransefNot[i] = isCheck)
      this.setState({check: arrTransefNot})
    } else {
      let arrTransefNot = this.state.check
      arrTransefNot[index] = !this.state.check[index]
      let checkOn = this.state.check.every((el, i) => i === 0 ? true : el === true ? true : false )
      let checkOff = this.state.check.every((el, i) => i === 0 ? true : el === false ? true : false )
      
      checkOn ? arrTransefNot[0] = true : checkOff ? arrTransefNot[0] = false : arrTransefNot[0] = false
      this.setState({check: arrTransefNot})
    }
  }
  parsing() {
    if (this.state.check[0] === true) return this.state.data.tickets
    return this.state.data.tickets.filter((el, i) => this.state.check[el.stops + 1] === true ? el : '')
  }
  setCurrency(index) {
    this.setState({indexCurrency: index})
  }
  render() {
    if (!this.state.isLoad) return <div>Loadin...</div>
    let data = this.parsing()
    return (
      <div className="App">
        <img className="logo" src={logo} alt="logo"></img>
        <div className="content">
          <menu>
            <div className="currency">
              <div className="title">Валюта</div>
                <div className="button">
                  {this.state.currencyTitle.map((el, i) => (<button 
                    onClick={() => this.setCurrency(i) } 
                    key={i} 
                    className={`button${i + 1} ${this.state.indexCurrency === i ? 'isselect' : ''}`}
                    >{this.state.currencyTitle[i]}
                  </button>))}
                </div>
            </div>
            
            <div className="selected">
              <div className="title">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
              {this.state.check.map((el, index) => {
                return (
                  <label key={index}>
                    <input 
                      onChange={() => this.handleCheck(index)} 
                      checked={el} 
                      className="check" 
                      type="checkbox">
                    </input>
                      {this.state.nameCheck[index]}
                      {index === 0 ? '' : <span onClick={(e) => this.handleThis(index, e)} className="this">Только</span>}
                  </label>    
                )
              })} 
            </div>
          </menu>
          <div className="cards">
            {data.map((el, index) => {
              return (
                <Card 
                  key={index} 
                  timeStart={el.arrival_time}
                  timeAnd={el.departure_time}
                  price={(el.price / this.state.currency[this.state.indexCurrency]).toFixed(2)}
                  origin={el.origin}
                  origin_name={el.origin_name}
                  destination={el.destination}
                  destination_name={el.destination_name}
                  arrival_date={el.arrival_date}
                  departure_date={el.departure_date}
                  stops={el.stops}
                />
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}
let Card = (props) => {
  let {key, timeStart, timeAnd, price, origin, origin_name, destination, destination_name, arrival_date, departure_date, stops} = {...props}
  return (
    <section key={key} className="card">
      <div className="card-item"><img src={logo} alt="logo" style={{width: '50px', paddingTop: '20px'}} /></div>
        <div className="card-time">
          <div className="time-start">{timeStart}<br/><span className="direction">{origin}, {origin_name}</span></div>
          <div className="title">{stops} пересадка<br/><img src={line} alt="line"/><img src={aircraft} alt="air" /></div>
          <div className="time-end">{timeAnd}<br/><span className="direction">{destination}, {destination_name}</span></div>
        </div>

        <div className="card-item"><button className="pay">Купить за <br/>{price}</button></div>
        <div className="date">
          <div className="date-start">{arrival_date}</div>
          <div className="date-end">{departure_date}</div>
        </div>
    </section>
  )
}

export default App;
