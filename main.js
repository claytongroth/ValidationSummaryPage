
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var Tooltip = reactTippy.Tooltip;
console.log(window.Recharts);
var _window$Recharts = window.Recharts,
  BarChart = _window$Recharts.BarChart,
  Bar = _window$Recharts.Bar,
  ReferenceLine = _window$Recharts.ReferenceLine,
  XAxis = _window$Recharts.XAxis,
  YAxis = _window$Recharts.YAxis,
  CartesianGrid = _window$Recharts.CartesianGrid,
  Legend = _window$Recharts.Legend,
  Cell = _window$Recharts.Cell;

var TooltipChart = window.Recharts.Tooltip;

function getPcnt(oldNumber, newNumber) {
  var decreaseValue = Math.abs(oldNumber - newNumber);
  if (newNumber < oldNumber) {
    return parseInt((decreaseValue / oldNumber) * 100 * -1);
  } else {
    return parseInt((decreaseValue / oldNumber) * 100);
  }
}

var setA = [
  "SUFFIX",
  "STREETTYPE",
  "PARCELID",
  "LANDMARKNAME",
  "SCHOOLDIST",
  "IMPROVED",
  "FORESTVALUE",
  "CNTASSDVALUE",
  "PARCELFIPS",
  "UNITTYPE",
  "ZIP4",
  "GISACRES",
  "SITEADRESS",
  "ESTFMKVALUE"
];
var setB = [
  "LONGITUDE",
  "LOADDATE",
  "STATE",
  "CONAME",
  "PARCELSRC",
  "DEEDACRES",
  "TAXROLLYEAR",
  "PSTLADRESS",
  "ADDNUMPREFIX",
  "ADDNUM",
  "PROPCLASS"
];
var setC = [
  "STREETNAME",
  "PLACENAME",
  "TAXPARCELID",
  "ZIPCODE",
  "PREFIX",
  "NETPRPTA",
  "SCHOOLDISTNO",
  "LNDVALUE",
  "OWNERNME2"
];
var setD = [
  "AUXCLASS",
  "OWNERNME1",
  "GRSPRPTA",
  "IMPVALUE",
  "UNITID",
  "STATEID",
  "ASSDACRES",
  "ADDNUMSUFFIX",
  "LATITUDE",
  "PARCELDATE"
];

var App = (function(_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(
      this,
      (App.__proto__ || Object.getPrototypeOf(App)).call(this, props)
    );

    _this.state = {
      error: null,
      isLoaded: false,
      items: [],
      validation: [],
      explanations: []
    };
    return _this;
  }

  _createClass(App, [
    {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        this.setState(
          {
            validation: testValues,
            explanations: explain
          },
          function() {
            return console.log(
              "State: ",
              _this2.state.validation,
              _this2.state.explanations
            );
          }
        );
      }
    },
    {
      key: "data",
      value: function data() {
        var data = [];
        for (var i in testValues.County_Info.Legacy) {
          if (testValues.County_Info.Legacy[i] && testValues.Fields_Diffs[i]) {
            //console.log(i, testValues.County_Info.Legacy[i], testValues.Fields_Diffs[i])
            data.push({
              name: i,
              "Percentage of Last Years Value": getPcnt(
                testValues.County_Info.Legacy[i],
                testValues.Fields_Diffs[i]
              ),
              amt: 2290
            });
          }
        }
        console.log(data);
        return data;
      }
    },
    {
      key: "render",
      value: function render() {
        var mr = this.state.validation.Records_Missing;
        var mrExplained = this.state.explanations.Records_Missing;

        var tr = this.state.validation.Tax_Roll_Years_Pcnt;
        var trExplained = this.state.explanations.Tax_Roll_Years_Pcnt;

        var fd = this.state.validation.Fields_Diffs;
        var fdExplained = this.state.explanations.Fields_Diffs;

        var inL = this.state.validation.inLineErrors;
        var inLExplained = this.state.explanations.inLineErrors;

        var bLL = this.state.validation.broadLevelErrors;
        var bLLExplained = this.state.explanations.broadLevelErrors;

        var coInfo = this.state.validation.County_Info;

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { id: "summary", className: "bricks" },
            React.createElement(
              "h1",
              null,
              " ",
              coInfo.CO_NAME.charAt(0) + coInfo.CO_NAME.slice(1).toLowerCase(),
              " Parcel Validation Summary ",
              React.createElement("img", {
                className: "img-responsive",
                src: "withumb.png",
                alt: "",
                height: "30",
                width: "30"
              })
            ),
            React.createElement("hr", null),
            React.createElement(
              "p",
              null,
              "This validation summary page contains an overview of any errors found by the Parcel Validation Tool. Please review the contents of this file and make changes to your parcel dataset as necessary."
            )
          ),
          React.createElement(
            "div",
            { id: "row" },
            React.createElement(
              "div",
              { id: "inline", className: "bricks" },
              React.createElement(InLineErrors, {
                inline: inL,
                inlineexp: inLExplained
              })
            ),
            React.createElement(
              "div",
              { id: "broad", className: "bricks" },
              React.createElement(BroadLevelErrors, {
                broadLevel: bLL,
                broadLevelexp: bLLExplained
              }),
              React.createElement("hr", null),
              React.createElement(TaxRoll, {
                taxroll: tr,
                taxrollexp: trExplained
              }),
              React.createElement(MissingRecords, {
                missing: mr,
                missingexp: mrExplained
              })
            )
          ),
          React.createElement(
            "div",
            { id: "comparison", className: "bricks" },
            React.createElement("h2", null, "Submission Comparison"),
            React.createElement(
              "p",
              null,
              "BELOW IS A COMPARISON OF COMPLETENESS VALUES FROM YOUR PREVIOUS PARCEL SUBMISSION AND THIS CURRENT SUBMISSION. If the value shown is a seemingly large negative number, please verify that all data was joined correctly and no data was lost during processing. Note: This does not necessarily mean your data is incorrect, we just want to highlight large discrepancies that could indicate missing or incorrect data."
            ),
            React.createElement(
              "div",
              { id: "chart" },
              React.createElement(
                BarChart,
                {
                  width: 1200,
                  height: 600,
                  data: this.data(),
                  margin: { top: 5, right: 30, left: 20, bottom: 5 }
                },
                React.createElement(CartesianGrid, { strokeDasharray: "2 2" }),
                React.createElement(XAxis, { dataKey: "name" }),
                React.createElement(YAxis, null),
                React.createElement(TooltipChart, null),
                React.createElement(Legend, null),
                React.createElement(ReferenceLine, { y: 0, stroke: "#000" }),
                React.createElement(
                  Bar,
                  { dataKey: "Percentage of Last Years Value" },
                  this.data().map(function(entry, index) {
                    return React.createElement(Cell, {
                      fill:
                        setA.indexOf(entry.name) > -1
                          ? "#003366"
                          : setB.indexOf(entry.name) > -1
                            ? "#f1b6da"
                            : setC.indexOf(entry.name) > -1
                              ? "#b8e186"
                              : "#4dac26"
                    });
                  })
                )
              )
            ),
            React.createElement(
              Expand,
              null,
              React.createElement(Positive, {
                positives: fd,
                fdexp: fdExplained
              }),
              React.createElement(Zero, { zeroes: fd, fdexp: fdExplained }),
              React.createElement(Negative, {
                negatives: fd,
                fdexp: fdExplained
              })
            )
          )
        );
      }
    }
  ]);

  return App;
})(React.Component);

var InLineErrors = (function(_React$Component2) {
  _inherits(InLineErrors, _React$Component2);

  function InLineErrors() {
    _classCallCheck(this, InLineErrors);

    return _possibleConstructorReturn(
      this,
      (InLineErrors.__proto__ || Object.getPrototypeOf(InLineErrors)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(InLineErrors, [
    {
      key: "list",
      value: function list() {
        var p = this.props.inline;
        var e = this.props.inlineexp;
        var listArray = [];
        for (var i in p) {
          listArray.push(
            React.createElement(
              Tooltip,
              {
                key: i,
                // options
                html: React.createElement(
                  "div",
                  { id: "tooltip" },
                  React.createElement("strong", null, i),
                  React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: e[i] }
                  })
                ),
                position: "top",
                trigger: "click",
                animation: "fade",
                touchHold: "true",
                size: "big",
                offset: "-300",
                theme: "light"
              },
              React.createElement(
                "li",
                { id: i, key: i },
                React.createElement("b", null, i + ": "),
                " ",
                +p[i]
              )
            )
          );
        }
        return listArray;
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement("h2", { id: "smallerrors" }, " In Line Errors"),
          React.createElement(
            "p",
            null,
            "The following lines summarized the element-specific errors that were found while validating your parcel dataset.  The stats below are meant as a means of reviewing the output.  Please see the GeneralElementErrors, AddressElementErrors, TaxrollElementErrors, and GeometricElementErrors fields to address these errors individually."
          ),
          React.createElement("ul", { className: "data" }, " ", this.list())
        );
      }
    }
  ]);

  return InLineErrors;
})(React.Component);

var BroadLevelErrors = (function(_React$Component3) {
  _inherits(BroadLevelErrors, _React$Component3);

  function BroadLevelErrors() {
    _classCallCheck(this, BroadLevelErrors);

    return _possibleConstructorReturn(
      this,
      (
        BroadLevelErrors.__proto__ || Object.getPrototypeOf(BroadLevelErrors)
      ).apply(this, arguments)
    );
  }

  _createClass(BroadLevelErrors, [
    {
      key: "list",
      value: function list() {
        var p = this.props.broadLevel;
        var e = this.props.broadLevelexp;
        var listArray = [];
        for (var i in p) {
          listArray.push(
            React.createElement(
              Tooltip,
              {
                key: i,
                // options
                html: React.createElement(
                  "div",
                  { id: "tooltip" },
                  React.createElement("strong", null, i),
                  React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: e[i] }
                  })
                ),
                position: "top",
                trigger: "click",
                animation: "fade",
                touchHold: "true",
                size: "big",
                offset: "-300",
                theme: "light"
              },
              React.createElement(
                "li",
                { id: i, key: i },
                React.createElement("b", null, i + ": "),
                " ",
                +p[i]
              )
            )
          );
        }
        return listArray;
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            { id: "smallerrors" },
            " Broad Level Errors"
          ),
          React.createElement(
            "p",
            null,
            'The following lines explain any broad geometric errors that were found while validating your parcel dataset. If any of the "Missing Records" values are greater than 0, please add missing values.'
          ),
          React.createElement("ul", { className: "data" }, " ", this.list())
        );
      }
    }
  ]);

  return BroadLevelErrors;
})(React.Component);

var TaxRoll = (function(_React$Component4) {
  _inherits(TaxRoll, _React$Component4);

  function TaxRoll() {
    _classCallCheck(this, TaxRoll);

    return _possibleConstructorReturn(
      this,
      (TaxRoll.__proto__ || Object.getPrototypeOf(TaxRoll)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(TaxRoll, [
    {
      key: "list",
      value: function list() {
        var p = this.props.taxroll;
        var e = this.props.taxrollexp;
        var listArray = [];
        for (var i in p) {
          listArray.push(
            React.createElement(
              Tooltip,
              {
                key: i,
                // options
                html: React.createElement(
                  "div",
                  { id: "tooltip" },
                  React.createElement("strong", null, i),
                  React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: e[i] }
                  })
                ),
                position: "top",
                trigger: "click",
                animation: "fade",
                touchHold: "true",
                size: "big",
                offset: "-300",
                theme: "light"
              },
              React.createElement(
                "li",
                { id: i, key: i },
                React.createElement("b", null, i + ": "),
                " ",
                +p[i] + "%"
              )
            )
          );
        }
        return listArray;
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { id: "broadlevel" },
          React.createElement(
            "h3",
            { id: "smallerrors" },
            "Taxroll Percentages"
          ),
          React.createElement("ul", { className: "data" }, " ", this.list())
        );
      }
    }
  ]);

  return TaxRoll;
})(React.Component);

var MissingRecords = (function(_React$Component5) {
  _inherits(MissingRecords, _React$Component5);

  function MissingRecords() {
    _classCallCheck(this, MissingRecords);

    return _possibleConstructorReturn(
      this,
      (MissingRecords.__proto__ || Object.getPrototypeOf(MissingRecords)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(MissingRecords, [
    {
      key: "list",
      value: function list() {
        var p = this.props.missing;
        var e = this.props.missingexp;
        var listArray = [];
        for (var i in p) {
          listArray.push(
            React.createElement(
              Tooltip,
              {
                key: i,
                // options
                html: React.createElement(
                  "div",
                  { id: "tooltip" },
                  React.createElement("strong", null, i),
                  React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: e[i] }
                  })
                ),
                position: "top",
                trigger: "click",
                animation: "fade",
                touchHold: "true",
                size: "big",
                offset: "-300",
                theme: "light"
              },
              React.createElement(
                "li",
                { id: i, key: i },
                React.createElement("b", null, i + ": "),
                " ",
                +p[i]
              )
            )
          );
        }
        return listArray;
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { id: "broadlevel" },
          React.createElement("h3", { id: "smallerrors" }, "Missing Records"),
          React.createElement("ul", { className: "data" }, " ", this.list())
        );
      }
    }
  ]);

  return MissingRecords;
})(React.Component);

var Zero = (function(_React$Component6) {
  _inherits(Zero, _React$Component6);

  function Zero() {
    _classCallCheck(this, Zero);

    return _possibleConstructorReturn(
      this,
      (Zero.__proto__ || Object.getPrototypeOf(Zero)).apply(this, arguments)
    );
  }

  _createClass(Zero, [
    {
      key: "list",
      value: function list() {
        var p = this.props.zeroes;
        var e = this.props.fdexp;
        var listArray = [];
        for (var i in p) {
          if (p[i] == 0) {
            listArray.push(
              React.createElement(
                Tooltip,
                {
                  key: i,
                  // options
                  html: React.createElement(
                    "div",
                    { id: "tooltip" },
                    React.createElement("strong", null, i),
                    React.createElement("div", {
                      dangerouslySetInnerHTML: { __html: e[i] }
                    })
                  ),
                  position: "top",
                  trigger: "click",
                  animation: "fade",
                  touchHold: "true",
                  size: "big",
                  offset: "-300",
                  theme: "light"
                },
                React.createElement(
                  "li",
                  { key: i },
                  React.createElement(
                    "a",
                    _defineProperty({ id: i, value: p[i] }, "id", "desc"),
                    i + ": "
                  ),
                  " ",
                  +p[i]
                )
              )
            );
          }
        }
        return listArray;
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { id: "zeroes", className: "values" },
          React.createElement("h2", { id: "fields" }, "Zero Diference"),
          React.createElement(
            "p",
            null,
            "No change in value from the previous submission. Double check that this fits with current submission."
          ),
          React.createElement("ul", { className: "Pdata" }, this.list())
        );
      }
    }
  ]);

  return Zero;
})(React.Component);

var Positive = (function(_React$Component7) {
  _inherits(Positive, _React$Component7);

  function Positive() {
    _classCallCheck(this, Positive);

    return _possibleConstructorReturn(
      this,
      (Positive.__proto__ || Object.getPrototypeOf(Positive)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(Positive, [
    {
      key: "list",
      value: function list() {
        var p = this.props.positives;
        var e = this.props.fdexp;
        var listArray = [];
        for (var i in p) {
          if (p[i] > 0) {
            listArray.push(
              React.createElement(
                Tooltip,
                {
                  key: i,
                  // options
                  html: React.createElement(
                    "div",
                    { id: "tooltip" },
                    React.createElement("strong", null, i),
                    React.createElement("div", {
                      dangerouslySetInnerHTML: { __html: e[i] }
                    })
                  ),
                  position: "top",
                  trigger: "click",
                  animation: "fade",
                  touchHold: "true",
                  size: "big",
                  offset: "-300",
                  theme: "light"
                },
                React.createElement(
                  "li",
                  { key: i },
                  React.createElement(
                    "a",
                    _defineProperty({ id: i, value: p[i] }, "id", "desc"),
                    i + ": "
                  ),
                  " ",
                  +p[i]
                )
              )
            );
          }
        }
        return listArray.sort(function(a, b) {
          return a.props.value - b.props.value;
        });
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { id: "positives", className: "values" },
          React.createElement("h2", { id: "fields" }, "Positive Difference"),
          React.createElement(
            "p",
            null,
            "Error/Flag: Value is significant in the positive direction. This difference could be indicative of an improvement in data."
          ),
          React.createElement("ul", { className: "Pdata" }, this.list())
        );
      }
    }
  ]);

  return Positive;
})(React.Component);

var Negative = (function(_React$Component8) {
  _inherits(Negative, _React$Component8);

  function Negative() {
    _classCallCheck(this, Negative);

    return _possibleConstructorReturn(
      this,
      (Negative.__proto__ || Object.getPrototypeOf(Negative)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(Negative, [
    {
      key: "list",
      value: function list() {
        var p = this.props.negatives;
        var e = this.props.fdexp;
        var listArray = [];
        for (var i in p) {
          if (p[i] < 0) {
            listArray.push(
              React.createElement(
                Tooltip,
                {
                  key: i,
                  // options
                  html: React.createElement(
                    "div",
                    { id: "tooltip" },
                    React.createElement("strong", null, i),
                    React.createElement("div", {
                      dangerouslySetInnerHTML: { __html: e[i] }
                    })
                  ),
                  position: "top",
                  trigger: "click",
                  animation: "fade",
                  touchHold: "true",
                  size: "big",
                  offset: "-300",
                  theme: "light"
                },
                React.createElement(
                  "li",
                  { key: i },
                  React.createElement(
                    "a",
                    _defineProperty({ id: i, value: p[i] }, "id", "desc"),
                    i + ": "
                  ),
                  " ",
                  +p[i]
                )
              )
            );
          }
        }
        console.log(listArray[0].props.value);
        return listArray.sort(function(a, b) {
          return a.props.value - b.props.value;
        });
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { id: "negatives", className: "values" },
          React.createElement("h2", { id: "fields" }, "Negative Difference"),
          React.createElement(
            "p",
            null,
            "Error/Flag: Value is significant in the negative direction. This difference could be indicative of a problem in data."
          ),
          React.createElement("ul", { className: "Pdata" }, this.list())
        );
      }
    }
  ]);

  return Negative;
})(React.Component);

var Expand = (function(_React$Component9) {
  _inherits(Expand, _React$Component9);

  function Expand() {
    _classCallCheck(this, Expand);

    var _this10 = _possibleConstructorReturn(
      this,
      (Expand.__proto__ || Object.getPrototypeOf(Expand)).call(this)
    );

    _this10.countLines = function() {
      var height = _this10.testComp.offsetHeight;
      if ((height - 2) / 16 > 3.3) {
        _this10.setState({ showButton: true });
      }
    };

    _this10.showHidePara = function() {
      if (_this10.state.height == "auto") {
        _this10.setState({ height: ".5em" });
      } else {
        _this10.setState({ height: "auto" });
      }
    };

    _this10.state = {
      height: ".5em"
    };
    return _this10;
  }

  _createClass(Expand, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.countLines();
      }
    },
    {
      key: "render",
      value: function render() {
        var _this11 = this;

        return React.createElement(
          "div",
          null,
          this.state.showButton
            ? React.createElement(
                "button",
                { id: "subbutton", onClick: this.showHidePara },
                " + "
              )
            : null,
          React.createElement(
            "div",
            { id: "parent", style: { height: this.state.height } },
            React.createElement(
              "div",
              {
                id: "content",
                ref: function ref(c) {
                  return (_this11.testComp = c);
                },
                style: { height: "auto" }
              },
              this.props.children
            )
          )
        );
      }
    }
  ]);

  return Expand;
})(React.Component);

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById("root")
);
