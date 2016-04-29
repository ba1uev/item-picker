
var SitePicker = React.createClass({
  getInitialState(){
    return {
      filterText: '',
      filteredData: this.props.data
    }
  },
  searchBoxChanged(filterText) {
    this.setState({
      filterText: filterText,
      filteredData: this.useFilter(this.props.data, filterText)
    })
  },
  useFilter(data, filterText) {
    if (!filterText) {
      return this.props.data
    }
    var result = [];
    var uniqMap = [];
    data.forEach((subject) => {
      subject.sites.forEach((site) => {
        if (~site.name.indexOf(filterText) !== 0) {
          // SOME MAGIC
          // result.push(subject);
          // uniqMap.push(site.name);
        }
      })
    })
    console.log(result);
    return result;
  },
  render(){
    return (
      <div className="flight__create__choice__block__inner delimitation site__selection">
        <h2>Выбор площадки</h2>

        <SearchBox
          filterText={this.state.filterText}
          searchBoxChanged={this.searchBoxChanged}
        />

        <SubjectList
          filterText={this.state.filterText}
          subjects={this.state.filteredData}
        />
      </div>
    )
  }
})


var SearchBox = React.createClass({
  handleChange(){
    this.props.searchBoxChanged(this.refs.filterTextInput.value);
  },
  render(){
    return (
      <div className="row">
        <input
          className="search"
          type="text"
          placeholder="Поиск по площадкам"
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
          />
      </div>
    )
  }
});

var SubjectList = React.createClass({
  render(){
    var subjects = this.props.subjects;
    var list = [];
    subjects.forEach((subject) => {
      list.push(
        <SubjectItem
          title={subject.title}
          key={subject.title}
          sites={subject.sites}
          description={subject.description}
        />
      )
    });
    return (
      <div>
        {list}
      </div>
    )
  }
})

var SubjectItem = React.createClass({
  render(){
    var sites = this.props.sites;
    var list = [];
    sites.forEach((site) => {
      list.push(<Site name={site.name} image={site.image} key={site.name} />)
    });
    return (
      <div className="pad__block">
        <h3 className="pad__name">{this.props.title}</h3>
        <div style={{fontSize: '12px', marginTop: '-15px', color: 'gray'}} className="pad__description">{this.props.description}</div>
        <ul className="pad__list">
            {list}
        </ul>
      </div>
    )
  }
});

var Site = React.createClass({
  render(){
    return (
      <li className="pad__item">
          <a className="pad__source" href="">
              {this.props.image ? <img style={{width: '100px'}} src={this.props.image} /> : null}
              <span className="pad__source__name">{this.props.name}</span>
          </a>
      </li>
    )
  }
});


ReactDOM.render(
  <SitePicker data={sitePickerData}/>,
  document.getElementById('cont')
)
