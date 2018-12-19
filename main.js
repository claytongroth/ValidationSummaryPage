const Tooltip = reactTippy.Tooltip;
console.log(window.Recharts)
const {ResponsiveContainer, BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Legend, Cell} = window.Recharts;
const TooltipChart = window.Recharts.Tooltip;


function getPcnt(oldNumber, newNumber){
   var decreaseValue = Math.abs(oldNumber - newNumber);
   if (newNumber < oldNumber) {
      return parseInt(((decreaseValue / oldNumber) * 100)*-1);
   }
   else {
     return parseInt((decreaseValue / oldNumber) * 100);
   }
};

const address = ["SUFFIX",
              "STREETTYPE",
              "STREETNAME",
              "PREFIX",
              "ADDNUMPREFIX",
              "ADDNUM",
              "ADDNUMSUFFIX",
              "SITEADRESS",
              "PSTLADRESS",
              "OWNERNME1",
              "OWNERNME2",
              "TAXROLLYEAR",
              "PARCELDATE",
              "TAXPARCELID",
              "PARCELID",
              "STATEID"]
const spatial = [

        ]
const general =[
        "LANDMARKNAME",
        "PLACENAME",
        "UNITTYPE",
        "UNITID",
        "ZIPCODE",
        "ZIP4",
        "STATE",
        "SCHOOLDIST",
        "SCHOOLDISTNO"
      ]
const tax = [
        "LONGITUDE",
        "LOADDATE",
        "GISACRES",
        "LATITUDE",
        "AUXCLASS",
        "GRSPRPTA",
        "IMPVALUE",
        "ASSDACRES",
        "LNDVALUE",
        "NETPRPTA",
        "CONAME",
        "PARCELSRC",
        "DEEDACRES",
        "IMPROVED",
        "FORESTVALUE",
        "CNTASSDVALUE",
        "PARCELFIPS",
        "ESTFMKVALUE",
        "PROPCLASS"
      ]


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
  data(){
    var data=[]
   for (let i in testValues.County_Info.Legacy){
     if (testValues.County_Info.Legacy[i] && testValues.Fields_Diffs[i]){
     //console.log(i, testValues.County_Info.Legacy[i], testValues.Fields_Diffs[i])
     data.push({
      name: i, 'Percentage of Last Years Value': getPcnt(testValues.County_Info.Legacy[i], testValues.Fields_Diffs[i]),
      amt: 2290,
      cat: general.indexOf(i) > -1 ? "general" : spatial.indexOf(i) > -1 ? 'spatial' : tax.indexOf(i) > -1 ? 'tax' : 'address'  })
     }
    }
    console.log(data)
    data = data.sort(function(a,b){
      var categoryA = a.cat.toLowerCase(), categoryB = b.cat.toLowerCase()
      if (categoryA > categoryB){
        return -1
      }
      if (categoryA < categoryB){
        return 1
      }
    })
   console.log(data)
   return data
  }

   render() {
     const mr = this.state.validation.Records_Missing;
     const mrExplained = this.state.explanations.Records_Missing;

     const tr = this.state.validation.Tax_Roll_Years_Pcnt;
     const trExplained = this.state.explanations.Tax_Roll_Years_Pcnt;

     const fd = this.state.validation.Fields_Diffs;
     const fdExplained = this.state.explanations.Fields_Diffs;

     const inL = this.state.validation.inLineErrors;
     const inLExplained = this.state.explanations.inLineErrors;

     const bLL = this.state.validation.broadLevelErrors;
     const bLLExplained = this.state.explanations.broadLevelErrors;

     const coInfo = this.state.validation.County_Info;

      return (
         <div>
             <div id="summary" className="bricks">
             <h1> {coInfo.CO_NAME.charAt(0) + coInfo.CO_NAME.slice(1).toLowerCase()} Parcel Validation Summary <img className="img-responsive" src="withumb.png" alt="" height="30" width="30"/></h1><hr/>
             <p>This validation summary page contains an overview of any errors found by the Parcel Validation Tool. Please review the contents of this file and make changes to your parcel dataset as necessary.</p>
             </div>
             <div id="row">
                <div id="inline" className="bricks">
                    <InLineErrors inline={inL} inlineexp ={inLExplained}/>
                </div>

                <div id="broad" className="bricks">
                    <BroadLevelErrors broadLevel={bLL} broadLevelexp={bLLExplained} />
                    <hr/>
                    <TaxRoll taxroll={tr} taxrollexp={trExplained} />
                    <MissingRecords missing={mr} missingexp={mrExplained} />
                </div>
              </div>
            <div id="comparison" className="bricks">
                <h2>Submission Comparison</h2>
                <p>BELOW IS A COMPARISON OF COMPLETENESS VALUES FROM YOUR PREVIOUS PARCEL SUBMISSION AND THIS CURRENT SUBMISSION. If the value shown is a seemingly large negative number, please verify that all data was joined correctly and no data was lost during processing. Note: This does not necessarily mean your data is incorrect, we just want to highlight large discrepancies that could indicate missing or incorrect data.</p>
                <div id="chart">
                <ResponsiveContainer width="90%" height={400}>
                <BarChart  data={this.data()}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <CartesianGrid strokeDasharray="2 2"/>
                 <XAxis dataKey="name" hide="true"/>
                 <YAxis/>
                 <TooltipChart/>
                 <Legend />
                 <ReferenceLine y={0} stroke='#000'/>
                 <Bar dataKey="Percentage of Last Years Value">
                  {
                    this.data().map((entry, index) => (
                      <Cell  fill={entry.cat === "general" ? '#2D3047' : entry.cat === "spatial" ? '#93B7BE' : entry.cat === "tax" ? '#A799B7' : '#048A81' }  />
                    ))
                  }
                </Bar>

                </BarChart>
                </ResponsiveContainer>
                </div>

                  <Expand>
                      <Positive positives={fd} fdexp={fdExplained}/>
                      <Zero zeroes={fd} fdexp={fdExplained}/>
                      <Negative negatives={fd} fdexp={fdExplained}/>
                  </Expand>
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
          var x = i.split("_").join(" ")
          var l = i.split("_")[0]
          listArray.push(
            <Tooltip key={i}
               // options
               html={(
                <div id="tooltip">
                  <strong>
                    {x}
                  </strong>
                  <div dangerouslySetInnerHTML={{ __html: "There were " + p[i] + " errors found that relate to " + l.toLowerCase() + " attributes in the feature class. To review these errors, sort descending on the " + x + " field, which was added to your output feature class while executing the tool."}}></div>
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
               <li className="lihover" id={i} key={i}><b>{x + ": "}</b> {+ p[i]}</li>
            </Tooltip>

          );
      }
      return listArray
    }
    render() {
    return (
     <div>
       <h2 id = "smallerrors"> In Line Errors</h2>
       <p>The following lines summarize the element-specific errors that were found while validating your parcel dataset.  The stats below are meant as a means of reviewing the output.  Please see the GeneralElementErrors, AddressElementErrors, TaxrollElementErrors, and GeometricElementErrors fields within the output feature class to address these errors individually.</p>
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
        var x = i.split("_").join(" ")
        if (e[i] == "None") {
            var z = "No action required"
            var t = "No broad-level geometric errors found!"
            var y = ""
        }
        else if (e[i] != "None") {
            var z = e[i]
            var t = e[i]
            var y = "Please review the directives in the documentation here: "
        }
        listArray.push(
          <Tooltip key={i}
             // options
             html={(
              <div id="tooltip">
              <strong>
                {z}
              </strong>
              <div dangerouslySetInnerHTML={{ __html: y}}></div>
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
             <li className="lihover" id={i} key={i}><b>{x + ": "}</b> {+ t}</li>
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
          var x = i.split("_").join(" ")
          var z = x.replace(/Taxroll/g, "Tax Roll")
          listArray.push(
            <Tooltip key={i}
               // options
               html={(
                <div id="tooltip">
                <strong>
                  {z}
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
               <li className="lihover" id={i} key={i}><b>{z + ": "}</b> {+ p[i] + "%"}</li>
            </Tooltip>

          );
      }
      return listArray
    }
    render() {
      return (
         <div id="broadlevel">
          <h3 id = "smallerrors">Tax Roll Percentages</h3>
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
          var x = i.split("_").join(" ")
          var y = x.split(" ")[1]
          if (e[i] > 0) {
              var innerText = "There are " + e[i] + " missing values in this field. Please ensure that all values in the " + y + " field are populated appropriately."
          }
          else if (e[i] == 0) {
              var innerText = "There are 0 missing values in this field, no action required."
          }
          if (y.charAt(y.length - 1) == "E") {
              var t = " (County Name)"
          }
          else if (y.charAt(y.length - 1) == "C") {
              var t = " (Parcel Source Name)"
          }
          else if (y.charAt(y.length - 1) == "S") {
              var t = " (Parcel Source FIPS)"
          }
          listArray.push(
            <Tooltip key={i}
               // options
               html={(
                <div id="tooltip">
                <strong>
                  {y + t}
                </strong>
                <div dangerouslySetInnerHTML={{ __html: innerText}}></div>
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
               <li className="lihover" id={i} key={i}><b>{x + ": "}</b> {+ p[i]}</li>
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
             <ul className="Pdata">
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
           <ul className="Pdata">
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
         <div id="negatives" className="values" >
            <h2 id="fields">Negative Difference</h2>
            <p>Error/Flag: Value is significant in the negative direction. This difference could be indicative of a problem in data.</p>
             <ul className="Pdata" >
             {this.list()}
             </ul>
         </div>

      );
   }
}

class Expand extends React.Component {

   constructor(){
     super();
     this.state = {
        height:'.5em'
     };
   }

  countLines =() => {
    let height = this.testComp.offsetHeight;
    if ( (height - 2 ) / 16 > 3.3 ) {
       this.setState({showButton:true});
    }
  }

  showHidePara =() => {
     if (this.state.height == 'auto') {
        this.setState({height:'.5em'});
     } else {
        this.setState({height:'auto'});
     }
  }

  componentDidMount() {
      this.countLines();
  }

  render() {
    return (
    < div>
        { this.state.showButton ? <button id="subbutton"onClick={this.showHidePara}> + </button>: null}
        <div id ="parent" style={{height:this.state.height}}>

          <div id = "content" ref={(c) => this.testComp = c } style={{height:'auto'}}>
         {this.props.children}
         </div>
      </div>
    </div>
    );
  }
}


ReactDOM.render(<App/>,document.getElementById('root'));
