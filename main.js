const Tooltip = reactTippy.Tooltip;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      validation: []
    };
  }
  componentWillMount(){
    this.setState({
      validation: testValues
    }, () => console.log("State: ", this.state.validation)
  )
  }
   render() {
     const fd = this.state.validation.Fields_Diffs
     const inL = this.state.validation.inLineErrors
     const bLL = this.state.validation.broadLevelErrors

      return (
         <div>
            <h1>Validation Summary:</h1>
            <Tooltip
               // options
               html={(
                <div>
                  <strong>
                    Hello
                  </strong>
                </div>
              )}
               position="top"
               trigger="click"
               animation = "fade"
               touchHold = "true"
               size = "big"
               offset = "-300"
               theme = "light"
             >
               <p>
                 POPUP
               </p>
            </Tooltip>
            <InLineErrors inline={inL}/>
            <BroadLevelErrors broadLevel={bLL} />
            <Positive positives={fd}/>
            <Negative negatives={fd}/>
            <Zero zeroes={fd}/>
         </div>
      );
   }
}
class InLineErrors extends React.Component {
    list(){
      var p = this.props.inline
      var listArray = []
      for (var i in p){
          listArray.push(<li id={i} key={i}><b>{i + ": "}</b> {+ p[i]}</li>);
      }
      return listArray
    }
    render() {
    return (
     <div id="inLine">
       <h3 id = "smallerrors"> In Line Errors</h3>
        <p> {this.list()}</p>
     </div>
    );
    }
}
class BroadLevelErrors extends React.Component {
  list(){
    var p = this.props.broadLevel
    var listArray = []
    for (var i in p){
        listArray.push(<li id={i} key={i}><b>{i + ": "}</b> {+ p[i]}</li>);
    }
    return listArray
  }
  render() {
    return (
       <div id="broadlevel">
        <h3 id = "smallerrors"> Broad Level Errors</h3>
        <p> {this.list()}</p>
       </div>
    );
  }
}
class Zero extends React.Component {
  list(){
    var p = this.props.zeroes
    var listArray = []
    for (var i in p){
      if (p[i] == 0){
        listArray.push(<li id={i} key={i}><a id="desc">{i + ": "}</a> {+ p[i]}</li>);
      }
    }
    return listArray
  }
   render() {
      return (
         <div id="zeroes">
          <h1 id="fields">Zero Values</h1>
           <ul>
           {this.list()}
           </ul>
         </div>
      );
   }
}
class Positive extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      tooltip: ""
    }
  }
  list(){
    var p = this.props.positives
    var listArray = []
    for (var i in p){
      if (p[i] > 0){
        listArray.push(<li key={i}><a id={i} value={p[i]} id="desc">{i + ": "}</a> {+ p[i]}</li>);
      }
    }
    return listArray.sort(function(a, b){return a.props.value - b.props.value});
  }
   render() {

      return (
         <div id="positives">
          <h1 id="fields">Positive Values</h1>
           <ul>
           {this.list()}
           </ul>
         </div>
      );
   }
}
class Negative extends React.Component {
  list(){
    var p = this.props.negatives
    var listArray = []
    for (var i in p){
      if (p[i] < 0){
        listArray.push(<li id={i} key={i} value={p[i]}><a id="desc">{i + ": "}</a> {+ p[i]}</li>);
      }
    }
    console.log(listArray[0].props.value)
    return listArray.sort(function(a, b){return a.props.value - b.props.value});
  }
   render() {
      return (
         <div id="negatives">
         <h1 id="fields">Negative Values</h1>
           <ul>
           {this.list()}
           </ul>
         </div>
      );
   }
}


ReactDOM.render(<App/>,document.getElementById('root'));
