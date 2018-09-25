import React, { Component } from 'react';
const arrJobs = [];

const initialArr = [];

// const testFoo = (stroka, strokatwo) => {
//     const ListTest = fetch(`https://jobs.github.com/positions.json?description=${stroka}&location=${strokatwo}`);
//     ListTest.then((response) => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`)
//     }).then((it) => arrJobs.push(...it));
// };

// const searchingFor = (valueFromInput, valueFromInputTwo) => {
//     return (x) => {
//         return x.description.toLowerCase().includes(valueFromInput.toLowerCase()) &&
//             x.location.toLowerCase().includes(valueFromInputTwo.toLowerCase());
//     }
// };

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueInputCity: '',
            valueInputLocation: '',
            isLoading: false,
            data: [],
            loading: false,
            timeJob: false,
            dataLenght: 0,
        };
    }

    // componentDidMount = (stroka, strokatwo) => {
    //     this.setState({ isLoading: true,
    //         company: arrJobs,});
    //     fetch(`https://jobs.github.com/positions.json?description=${stroka}&location=${strokatwo}`)
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //         throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`)})
    //         .then(it => {
    //             setTimeout(() => {
    //                 arrJobs.push(...it);
    //                 this.setState({isLoading:false,
    //                 });
    //             }, 3000)
    //         });
    // };

    // onBtnClickHand = (e) => {
    //   e.preventDefault();
    //     const{valueCity,valueLocation} = this.state;
    //     this.setState({
    //         check: valueCity,
    //         checkTwo: valueLocation,
    //     });
    //   console.log(this.state);
    //
    //     // testFoo(this.state.check, this.state.checkTwo);
    //     // this.componentDidMount(this.state.check, this.state.checkTwo);
    // };

    searchHandler = (e) => {
        this.setState({valueInputCity: e.target.value})
    };

    searchHandlerTwo = (e) => {
        this.setState({valueInputLocation: e.target.value})
    };

    validate = () => {
        const { valueInputCity, valueInputLocation} = this.state;
        if (valueInputCity.trim() || valueInputLocation.trim()) {
            return false
        }
        return true
    };

    clear = (e) => {
        e.preventDefault();
        this.setState({
            data: initialArr,
            valueInputCity: '',
            valueInputLocation: '',
            dataLenght: 0,
        })
    };

    fetchData = async (e) => {
        e.preventDefault();
        const { valueInputCity, valueInputLocation, timeJob} = this.state;
        const desc = valueInputCity;
        const loc = valueInputLocation;
        const time = timeJob;
        this.setState({ loading: true });
        const response = await fetch(`https://jobs.github.com/positions.json?description=${desc}&location=${loc}&full_time=${time}`);
        const json = await response.json();
        setTimeout(() => {
            this.setState({
                data: [...json],
                loading: false,
                dataLenght: json.length
            });
            }, 3000);

        // this.setState({
        //     data: [...json],
        //     loading: false,
        //     dataLenght: this.data.length,
        // });
    };

    checkBox = (e) => {
        if (e.target.checked) {
            this.setState ({
                timeJob:true,
            })
        } else {
            this.setState ({
                timeJob:false,
            })
        }
    };

  render() {
        const{valueInputCity, valueInputLocation, data, loading, dataLenght} = this.state;
    return (
      <div className="App">
          <form action="" className="search-panel">
              <input type="text"
                     placeholder="Key words"
                     onChange={this.searchHandler}
                     value={valueInputCity}
              />
              <input type="text"
                     placeholder="Location"
                     onChange={this.searchHandlerTwo}
                     value={valueInputLocation}
              />
              <label className='form_label'>
                  <input type="checkbox"
                         onChange={this.checkBox}/>
                  Full Time
              </label>
              <div className='control_form'>
                  <button
                      // onClick={this.onBtnClickHand}
                      onClick={this.fetchData}
                      className='btn_search'
                      disabled = {this.validate()}
                  >Search</button>
                  <button
                      onClick={this.clear}
                      className='btn_clear'
                  >Clear</button>
              </div>
          </form>
          {loading && <p>Loading...</p>}
          {dataLenght === 0 && <p className='empty_list'>Empty list</p>}
          {data.map(jobsTitle =>
          <div className='jobs' key={jobsTitle.id}>
              <p className='vacancy_title'>{jobsTitle.title}</p>
              <p className='vacancy_company'>{jobsTitle.company}</p>
              <p className='vacancy_location'>{jobsTitle.location}</p>
              <p className='vacancy_type'>{jobsTitle.type}</p>
              <div className='vacancy_description' dangerouslySetInnerHTML={{__html: jobsTitle.description.slice(0, 500)+'...'}}/>
          </div>)
          }
      </div>
    );
  }
}

export default App;
