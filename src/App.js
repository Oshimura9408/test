import React, { Component } from 'react';

const list = fetch(`https://jobs.github.com/positions.json`);

const arrr = [];

list.then((response) => {
    if (response.ok) {
        return response.json();
    }
    throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`)
}).then((it) => arrr.push(...it));


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

console.log(arrr);

function searchingFor(valueFromInput, valueFromInputTwo) {
    return function (x) {
        return x.title.toLowerCase().includes(valueFromInput.toLowerCase()) &&
            x.company.toLowerCase().includes(valueFromInputTwo.toLowerCase());
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companys: arrr,
            jobs: jobsList,
            valueFromInput: '',
            valueFromInputTwo: '',
            test: '',
            testTwo: '',
            visible: false,
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

    handleReadMoreClck = (e) => {
        e.preventDefault();
        this.setState({ visible: true })
    };

  render() {
        const{valueFromInput,valueFromInputTwo,test, testTwo, visible, companys} = this.state;
    return (
      <div className="App">
          <form action="" className="search-panel">
              <input type="text"
                     placeholder="KeyWord"
                     onChange={this.searchHandler}
                     value={valueFromInput}

              />
              <input type="text"
                     placeholder="City"
                     onChange={this.searchHandlerTwo}
                     value={valueFromInputTwo}

              />
              <button
                  onClick={this.onBtnClickHand}
                  disabled = {this.validate()}
              >Search</button>
          </form>
          {/*{jobs.filter(searchingFor(test,testTwo)).map(jobsTitle =>*/}
                  {/*<div className='jobs' key={jobsTitle.id}>*/}
                      {/*<p>{jobsTitle.keyWord}</p>*/}
                      {/*<p>{jobsTitle.location}</p>*/}
                  {/*</div>*/}
              {/*)*/}
          {/*}*/}
          {companys.filter(searchingFor(test,testTwo)).map(jobsTitle =>
          <div className='jobs' key={jobsTitle.id}>
              <p>{jobsTitle.title}</p>
              <p>{jobsTitle.company}</p>

              { /* если не visible, то показывай */
                  !visible && <a onClick={this.handleReadMoreClck} href="#" className='news__readmore'>Подробнее</a>
              }
              { /* если visible, то показывай */
                  visible && <p className='news__big-text'>123</p>
              }
          </div>
          )
          }
      </div>
    );
  }
}

export default App;
