const Tooltip = reactTippy.Tooltip;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      validation: [],
      explanations: [],
    };
  }
  componentWillMount(){
    this.setState({
      validation: testValues,
      explanations: explain
    }, () => console.log("State: ", this.state.validation, this.state.explanations)
  )
  }
   render() {
     const mr = this.state.validation.Records_Missing
     const mrExplained = this.state.explanations.Records_Missing

     const tr = this.state.validation.Tax_Roll_Years_Pcnt
     const trExplained = this.state.explanations.Tax_Roll_Years_Pcnt

     const fd = this.state.validation.Fields_Diffs
     const fdExplained = this.state.explanations.Fields_Diffs

     const inL = this.state.validation.inLineErrors
     const inLExplained = this.state.explanations.inLineErrors

     const bLL = this.state.validation.broadLevelErrors
     const bLLExplained = this.state.explanations.broadLevelErrors

     const coInfo = this.state.validation.County_Info
      return (
         <div>
             <div id="summary" className="bricks">
             <h1> {coInfo.CO_NAME} Parcel Validation Summary</h1>
             <p>This validation summary page contains an overview of any errors found by the Parcel Validation Tool. Please review the contents of this file and make changes to your parcel dataset as necessary.</p>
             </div>

            <div id="inline" className="bricks">
                <InLineErrors inline={inL} inlineexp ={inLExplained}/>
            </div>

            <div id="broad" className="bricks">
                <BroadLevelErrors broadLevel={bLL} broadLevelexp={bLLExplained} />
                <TaxRoll taxroll={tr} taxrollexp={trExplained} />
                <MissingRecords missing={mr} missingexp={mrExplained} />
            </div>

            <div id="comparison" className="bricks">
                <h2>Submission Comparison</h2>
                <p>BELOW IS A COMPARISON OF COMPLETENESS VALUES FROM YOUR PREVIOUS PARCEL SUBMISSION AND THIS CURRENT SUBMISSION. If the value shown is a seemingly large negative number, please verify that all data was joined correctly and no data was lost during processing. Note: This does not necessarily mean your data is incorrect, we just want to highlight large discrepancies that could indicate missing or incorrect data.</p>
                <Positive positives={fd} fdexp={fdExplained}/>
                <Zero zeroes={fd} fdexp={fdExplained}/>
                <Negative negatives={fd} fdexp={fdExplained}/>
            </div>
         </div>
      );
   }
}
class InLineErrors extends React.Component {
    list(){
      var p = this.props.inline
      var e = this.props.inlineexp
      var listArray = []
      for (var i in p){
          listArray.push(
            <Tooltip key={i}
               // options
               html={(
                <div id="tooltip">
                  <strong>
                    {i}
                  </strong>
                  <div dangerouslySetInnerHTML={{ __html: e[i]}}></div>
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
               <li id={i} key={i}><b>{i + ": "}</b> {+ p[i]}</li>
            </Tooltip>

          );
      }
      return listArray
    }
    render() {
    return (
     <div>
       <h2 id = "smallerrors"> In Line Errors</h2>
       <p>The following lines summarized the element-specific errors that were found while validating your parcel dataset.  The stats below are meant as a means of reviewing the output.  Please see the GeneralElementErrors, AddressElementErrors, TaxrollElementErrors, and GeometricElementErrors fields to address these errors individually.</p>
        <ul className="data"> {this.list()}</ul>
     </div>
    );
    }
}
class BroadLevelErrors extends React.Component {
  list(){
    var p = this.props.broadLevel
    var e = this.props.broadLevelexp
    var listArray = []
    for (var i in p){
        listArray.push(
          <Tooltip key={i}
             // options
             html={(
              <div id="tooltip">
              <strong>
                {i}
              </strong>
              <div dangerouslySetInnerHTML={{ __html: e[i]}}></div>
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
             <li id={i} key={i}><b>{i + ": "}</b> {+ p[i]}</li>
          </Tooltip>

        );
    }
    return listArray
  }
  render() {
    return (
       <div>
        <h2 id = "smallerrors"> Broad Level Errors</h2>
        <p>The following lines explain any broad geometric errors that were found while validating your parcel dataset.
        If any of the "Missing Records" values are greater than 0, please add missing values.</p>
        <ul className="data"> {this.list()}</ul>
       </div>
    );
  }
}
class TaxRoll extends React.Component {
    list(){
      var p = this.props.taxroll
      var e = this.props.taxrollexp
      var listArray = []
      for (var i in p){
          listArray.push(
            <Tooltip key={i}
               // options
               html={(
                <div id="tooltip">
                <strong>
                  {i}
                </strong>
                <div dangerouslySetInnerHTML={{ __html: e[i]}}></div>
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
               <li id={i} key={i}><b>{i + ": "}</b> {+ p[i] + "%"}</li>
            </Tooltip>

          );
      }
      return listArray
    }
    render() {
      return (
         <div id="broadlevel">
          <h3 id = "smallerrors">Taxroll Percentages</h3>
          <ul className="data"> {this.list()}</ul>
         </div>
      );
    }
}
class MissingRecords extends React.Component {
    list(){
      var p = this.props.missing
      var e = this.props.missingexp
      var listArray = []
      for (var i in p){
          listArray.push(
            <Tooltip key={i}
               // options
               html={(
                <div id="tooltip">
                <strong>
                  {i}
                </strong>
                <div dangerouslySetInnerHTML={{ __html: e[i]}}></div>
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
               <li id={i} key={i}><b>{i + ": "}</b> {+ p[i]}</li>
            </Tooltip>
          );
      }
      return listArray
    }
    render() {
      return (
         <div id="broadlevel">
          <h3 id = "smallerrors">Missing Records</h3>
          <ul className="data"> {this.list()}</ul>
         </div>
      );
    }
}
class Zero extends React.Component {
  list(){
    var p = this.props.zeroes
    var e = this.props.fdexp
    var listArray = []
    for (var i in p){
      if (p[i] == 0){
        listArray.push(
          <Tooltip key={i}
             // options
             html={(
              <div id="tooltip">
              <strong>
                {i}
              </strong>
              <div dangerouslySetInnerHTML={{ __html: e[i]}}></div>
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
             <li key={i}><a id={i} value={p[i]} id="desc">{i + ": "}</a> {+ p[i]}</li>
          </Tooltip>
        );
      }
    }
    return listArray
  }
   render() {
      return (
         <div id="zeroes" className="values">
          <h2 id="fields">Zero Diference</h2>
          <p>No change in value from the previous submission. Double check that this fits with current submission.</p>
           <ul className="data">
           {this.list()}
           </ul>
         </div>
      );
   }
}
class Positive extends React.Component {
  list(){
    var p = this.props.positives
    var e = this.props.fdexp
    var listArray = []
    for (var i in p){
      if (p[i] > 0){

        listArray.push(
          <Tooltip key={i}
             // options
             html={(
              <div id="tooltip">
              <strong>
                {i}
              </strong>
              <div dangerouslySetInnerHTML={{ __html: e[i]}}></div>
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
             <li key={i}><a id={i} value={p[i]} id="desc">{i + ": "}</a> {+ p[i]}</li>
          </Tooltip>

        );
      }
    }
    return listArray.sort(function(a, b){return a.props.value - b.props.value});
  }
   render() {

      return (
         <div id="positives" className="values">
          <h2 id="fields">Positive Difference</h2>
           <p>Error/Flag: Value is significant in the positive direction. This difference could be indicative of an improvement in data.</p>
           <ul className="data">
           {this.list()}
           </ul>
         </div>
      );
   }
}
class Negative extends React.Component {
  list(){
    var p = this.props.negatives
    var e = this.props.fdexp
    var listArray = []
    for (var i in p){
      if (p[i] < 0){
        listArray.push(
          <Tooltip key={i}
             // options
             html={(
              <div id="tooltip">
              <strong>
                {i}
              </strong>
              <div dangerouslySetInnerHTML={{ __html: e[i]}}></div>
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
             <li key={i}><a id={i} value={p[i]} id="desc">{i + ": "}</a> {+ p[i]}</li>
          </Tooltip>
        );
      }
    }
    console.log(listArray[0].props.value)
    return listArray.sort(function(a, b){return a.props.value - b.props.value});
  }
   render() {
      return (
         <div id="negatives" className="values">
         <h2 id="fields">Negative Difference</h2>
          <p>Error/Flag: Value is significant in the negative direction. This difference could be indicative of a problem in data.</p>
           <ul className="data">
           {this.list()}
           </ul>
         </div>
      );
   }
}


ReactDOM.render(<App/>,document.getElementById('root'));
