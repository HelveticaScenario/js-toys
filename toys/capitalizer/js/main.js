function getCorrectChar(letter, capitalized){
  if(capitalized){
    return letter.toUpperCase();
  } else {
    return letter.toLowerCase();
  }
}

var Letter = React.createClass({
  render: function(){
    return React.DOM.span({},getCorrectChar(this.props.letter,this.props.capitalized));
  }
});

var LetterList = React.createClass({
  createListOfLetters: function(){
    var letters = this.props.str.split('');
    return letters.map(function(e){
      return Letter({capitalized: this.props.letterStates[e], letter: e});
    }.bind(this));
  },
  render: function(){
    return React.DOM.div({}, this.createListOfLetters());
  }
});

var Toggle = React.createClass({
  handleClick: function(){
    this.props.onClick({letter: this.props.letter, on: !this.props.on});
    return false;
  },
  render: function(){
    return React.DOM.button({className: "toggle", onClick:this.handleClick},
                          getCorrectChar(this.props.letter, this.props.on));
  }
});

var ToggleList = React.createClass({
  createListOfToggles: function(){
    var list = [];
    for(var k in this.props.letterStates){
      list.push({letter: k, on: this.props.letterStates[k],onClick: this.props.onToggle});
    }
    list.sort(function(a,b){
      return a.letter.toLowerCase().charCodeAt(0) - b.letter.toLowerCase().charCodeAt(0);
    });
    var spans = list.map(function(e){
      return Toggle(e);
    });
    return spans
  },
  render: function(){
    return React.DOM.div({},this.createListOfToggles());
  }
});

var TextBox = React.createClass({
  handleChange: function(){
    var newStr = this.conformText(this.refs.text.getDOMNode().value);
    this.props.onTextChange(newStr);
    return false;
  },
  conformText: function(str){
    return str.toLowerCase();
  },
  render: function(){
    return React.DOM.textarea({
      onChange: this.handleChange,
      ref: "text",
      value: this.props.str
    });
  }
});

var Capitalizer = React.createClass({
  getInitialState: function(){
    var initStr = this.props.initStr.toLowerCase();
    return {str: initStr,
            letterStates: this.makeLetterStates(initStr,{})};
  },
  makeLetterStates: function(str, oldLetterStates){
    var letterStates = {};
    for(var n = 97; n < 123; n++){
      var i = String.fromCharCode(n);
      if(str.indexOf(i) !== -1){
        letterStates[i] = oldLetterStates[i] || false;
      }
    }
    return letterStates;
  },
  onTextBoxChange: function(newStr){
    var str = newStr.toLowerCase();
    this.setState({str: str,
                   letterStates: this.makeLetterStates(str, this.state.letterStates)});
  },

  onToggle: function(letterState){
    var newState = {str: this.state.str,letterStates: {}};
    for(var i in this.state.letterStates){
      if(i === letterState.letter){
        newState.letterStates[i] = letterState.on;
      } else {
        newState.letterStates[i] = this.state.letterStates[i];
      }
    }
    this.setState(newState);
  },
  render: function(){
    return React.DOM.div({},
      TextBox({onTextChange:this.onTextBoxChange, str: this.state.str}),
      ToggleList({letterStates: this.state.letterStates, onToggle: this.onToggle}),
      LetterList(this.state))
  }
})

React.renderComponent(Capitalizer({initStr: "Type Something!"}),document.getElementById('capitalizer'));
