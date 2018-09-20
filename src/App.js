import React, { Component } from 'react';

const jobsList = [
    {
        id: 0,
        keyWord: 'Programming',
        location: 'Novosibirsk',
    },
    {
        id: 1,
        keyWord: 'Reporter',
        location: 'Moscow',
    },
    {
        id: 2,
        keyWord: 'Saller',
        location: 'Novosibirsk',
    },
    {
        id: 3,
        keyWord: 'Taxi',
        location: 'Peter',
    },
];

function searchingFor(valueFromInput, valueFromInputTwo) {
    return function (x) {
        return x.keyWord.toLowerCase().includes(valueFromInput.toLowerCase()) &&
            x.location.toLowerCase().includes(valueFromInputTwo.toLowerCase());
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: jobsList,
            valueFromInput: '',
            valueFromInputTwo: '',
            test: '',
            testTwo: '',
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.searchHandlerTwo = this.searchHandlerTwo.bind(this);
    }

    onBtnClickHand = (e) => {
      e.preventDefault();
        const{valueFromInput,valueFromInputTwo} = this.state;
        this.setState({
            test: valueFromInput,
            testTwo: valueFromInputTwo,
        });
      console.log(this.state)

    };

    searchHandler(e) {
        this.setState({valueFromInput: e.target.value})
    }

    searchHandlerTwo(e) {
        this.setState({valueFromInputTwo: e.target.value})
    }

    validate = () => {
        const { valueFromInput, valueFromInputTwo} = this.state;
        if (valueFromInput.trim() && valueFromInputTwo.trim()) {
            return false
        }
        return true
    };

  render() {
        const{valueFromInput,valueFromInputTwo,test, testTwo,  jobs} = this.state;
    return (
      <div className="App">
          <form action="">
              <input type="text"
                     onChange={this.searchHandler}
                     value={valueFromInput}

              />
              <input type="text"
                     onChange={this.searchHandlerTwo}
                     value={valueFromInputTwo}

              />
              <button
                  onClick={this.onBtnClickHand}
                  disabled = {this.validate()}
              >Search</button>
          </form>
          {jobs.filter(searchingFor(test,testTwo)).map(jobsTitle =>
                  <div className='jobs' key={jobsTitle.id}>
                      <p>{jobsTitle.keyWord}</p>
                      <p>{jobsTitle.location}</p>
                  </div>
              )
          }
      </div>
    );
  }
}

export default App;
