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
    this.state = {
      items:
      [{name: "one-1", flipped: false, value:1, matched:0},
      {name: "two", flipped: false, value:2, matched:0},
      {name: "one-match", flipped: false, value:1, matched:0},
      {name: "two-match", flipped: false, value:2, matched:0},
      {name: "three", flipped: false, value:3, matched:0}],
      numberOfMatches: 0,
      gameOver: false,
      flippedCount: 0
    };
  }


  markItem(name) {
    let value = 0;
    let matchCount = 0;
    var flips = 0;

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
      }, 1500)
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
          return _.extend(item, {matched: 1});
        }
        else {
          return item;
        }
      });
      let increaseMatches = this.state.numberOfMatches + 1;
      this.setState({numberOfMatches: increaseMatches});
    }


  }


  flipback(list) {
    // alert("flipped count is 2");
    // flip items that match the name
    let reset = _.map(this.state.items, (item) => {
      if (!item.matched) {
        return _.extend(item, {flipped: false});
      }
      else {
        return item;
      }
    });

    // return reset;
    this.setState({ items: reset });
    // return true;
    // resetFlip = true;
  }

  render() {
    let item_list = _.map(this.state.items, (item, ii) => {
      return <TodoItem item={item} markItem={this.markItem.bind(this)} key={ii} />;
    });
    return (
      <div>
      <h2>Memory Game:</h2>
      <ul>
      {item_list}
      </ul>

      </div>
    );
  }
}



const matched = {
  background: 'orange'
};

function TodoItem(props) {
  let item = props.item;
  if (item.matched) {
    return <li><button style={matched}>{item.value}</button></li>;

  }
  if (item.flipped) {
    return <li><button>{item.value}</button></li>;
  }
  else {
    return <li><button onClick={() => props.markItem(item.name)}>flip</button></li>
  }

}
