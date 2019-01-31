// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import _ from 'lodash';
// // // added
// // import $ from 'jquery';
// //
// // export default function game_init(root) {
// //   ReactDOM.render(<Memory />, root);
// // }
// //
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function todo_init(root) {
  ReactDOM.render(<Todo />, root);
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    var timer;
    const shuffle = require('fisher-yates-shuffle');

    const listOfItems =
    [{name: "1", flipped: false, value:"A", matched:false},
    {name: "2", flipped: false, value:"B", matched:false},
    {name: "1m", flipped: false, value:"A", matched:false},
    {name: "2m", flipped: false, value:"B", matched:false},
    {name: "3", flipped: false, value:"C", matched:false},
    {name: "3m", flipped: false, value:"C", matched:false},
    {name: "4", flipped: false, value:"D", matched:false},
    {name: "4m", flipped: false, value:"D", matched:false},
    {name: "5", flipped: false, value:"E", matched:false},
    {name: "5m", flipped: false, value:"E", matched:false},
    {name: "6", flipped: false, value:"F", matched:false},
    {name: "6m", flipped: false, value:"F", matched:false},
    {name: "7", flipped: false, value:"G", matched:false},
    {name: "7m", flipped: false, value:"G", matched:false},
    {name: "8", flipped: false, value:"H", matched:false},
    {name: "8m", flipped: false, value:"H", matched:false}];

  const shuffledDeck = shuffle(listOfItems);
  this.state = {
    items: shuffledDeck,
    clicks: 0,
    flippedCount: 0
  };
}

reset() {
  const shuffle = require('fisher-yates-shuffle');
  const listOfItems = this.state.items;
  const shuffledDeck = shuffle(listOfItems);

  let flipName = _.map(shuffledDeck, (item) => {
    return _.extend(item, {flipped: false}, {matched: false});
  });

  this.setState({ items: flipName });
  this.setState({ clicks: 0 });

}


markItem(name) {
  let value = 0;
  let matchCount = 0;
  var flips = 0;
  let addClick = this.state.clicks + 1;
  this.setState({ clicks: addClick});

  // flip items that match the name
  let flipName = _.map(this.state.items, (item) => {
    if (item.name == name) {
      value = item.value;
      return _.extend(item, {flipped: true});
    }
    else {
      return item;
    }
  });

  this.setState({ items: flipName });

  if(this.state.flippedCount == 0) {
    this.setState({flippedCount: 1});
  } else if (this.state.flippedCount == 1) {
    // once two items have been clicked, flip non-matches over
    this.timer = setTimeout(() => {
      let reset = _.map(this.state.items, (item) => {
        if (!item.matched) {
          return _.extend(item, {flipped: false});
        }
        else {
          return item;
        }
      });
      this.setState({ items: reset });
    }, 800)
    this.setState({flippedCount: 2});
    // this.state.flippedCount = 0;
  } else if (this.state.flippedCount > 1) {

    let thirdClick = _.map(this.state.items, (item) => {
      if (!item.matched && item.name != name) {
        return _.extend(item, {flipped: false});
      }
      else {
        return item;
      }
    });
    this.setState({ items: thirdClick });
    this.setState({flippedCount: 1});
    clearTimeout(this.timer);
  }

  // check for matches
  let findMatch = _.map(this.state.items, (item) => {
    if (item.value == value && item.flipped) {
      matchCount = matchCount + 1;
    }
  });

  if(matchCount == 2) {
    // make changes to matches
    let changeMatches = _.map(this.state.items, (item) => {
      if (item.value == value && item.flipped) {
        return _.extend(item, {matched: true});
      }
      else {
        return item;
      }
    });
  }


}


render() {
  let item_list = _.map(this.state.items, (item, ii) => {
    return <div key={ii}><TodoItem item={item} markItem={this.markItem.bind(this)} key={ii} /></div>;
  });

  let firstCol = item_list.slice(0,4);
  let secondCol = item_list.slice(4,8);
  let thirdCol = item_list.slice(8,12);
  let fourthCol = item_list.slice(12,16);

  let resetButton = <ResetButton reset={this.reset.bind(this)}/>;

  return (
    <div className="container">
      <h2>Memory Game:</h2>
      <h4>Clicks: {this.state.clicks}</h4>
        <div className="row">
          <div className="column">{firstCol}</div>
          <div className="column">{secondCol}</div>
          <div className="column">{thirdCol}</div>
          <div className="column">{fourthCol}</div>
          </div>

      {resetButton}
    </div>

  );
}
}

function ResetButton(props) {
  return <button className="button button-clear" onClick={() => props.reset()}>reset</button>
}

function TodoItem(props) {
  let item = props.item;
  if (item.matched) {
    return <button className="button button-clear">{item.value}</button>;

  }
  if (item.flipped) {
    return <button className="button button-outline">{item.value}</button>;
  }
  else {
    return <button onClick={() => props.markItem(item.name)}>flip</button>
  }

}
