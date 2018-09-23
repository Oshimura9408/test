import React, { Component } from 'react';

const list = fetch(`https://jobs.github.com/positions.json`);
const test = `ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss`;
console.log(test.slice(0,10));

const arrJobs = [];

list.then((response) => {
    if (response.ok) {
        return response.json();
    }
    throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`)
}).then((it) => arrJobs.push(...it));

console.log(arrJobs);

function searchingFor(valueFromInput, valueFromInputTwo) {
    return function (x) {
        return x.description.toLowerCase().includes(valueFromInput.toLowerCase()) &&
            x.location.toLowerCase().includes(valueFromInputTwo.toLowerCase());
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: arrJobs,
            valueCity: '',
            valueLocation: '',
            test: '',
            testTwo: '',
            visible: false,
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.searchHandlerTwo = this.searchHandlerTwo.bind(this);
    }

    onBtnClickHand = (e) => {
      e.preventDefault();
        const{valueCity,valueLocation} = this.state;
        this.setState({
            test: valueCity,
            testTwo: valueLocation,
        });
      console.log(this.state)

    };

    searchHandler(e) {
        this.setState({valueCity: e.target.value})
    }

    searchHandlerTwo(e) {
        this.setState({valueLocation: e.target.value})
    }

    validate = () => {
        const { valueCity, valueLocation} = this.state;
        if (valueCity.trim() && valueLocation.trim()) {
            return false
        }
        return true
    };

    clear = (e) => {
        e.preventDefault();
        this.setState({
            test: '',
            testTwo: '',
        })
    };

  render() {
        const{valueCity,valueLocation,test, testTwo, company} = this.state;
    return (
      <div className="App">
          <form action="" className="search-panel">
              <input type="text"
                     placeholder="KeyWord"
                     onChange={this.searchHandler}
                     value={valueCity}
              />
              <input type="text"
                     placeholder="City"
                     onChange={this.searchHandlerTwo}
                     value={valueLocation}
              />
              <button
                  onClick={this.onBtnClickHand}
                  disabled = {this.validate()}
              >Search</button>
              <button
                  onClick={this.clear}
              >Clear</button>
          </form>
          {company.filter(searchingFor(test,testTwo)).map(jobsTitle =>
          <div className='jobs' key={jobsTitle.id}>
              <p className='vacancy_title'>{jobsTitle.title}</p>
              <p className='vacancy_company'>{jobsTitle.company}</p>
              <p className='vacancy_location'>{jobsTitle.location}</p>
              <div className='vacancy_description' dangerouslySetInnerHTML={{__html: jobsTitle.description.slice(0, 500)+'...'}}/>

          </div>
          )
          }
      </div>
    );
  }
}

export default App;
