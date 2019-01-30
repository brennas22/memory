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
    this.state = {
      items:
      [{name: "one-1", flipped: false, value:1, matched:0},
      {name: "two", flipped: false, value:2, matched:0},
      {name: "one-match", flipped: false, value:1, matched:0},
      {name: "two-match", flipped: false, value:2, matched:0},
      {name: "three", flipped: false, value:3, matched:0}],
      score: 0,
      numberOfMatches: 0,
      gameOver: false,
      flippedCount: 0
    };
  }




  markItem(name) {
    let value = 0;
    var resetFlip = false;
    let matchCount = 0;

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

    if(this.state.flippedCount == 0) {
      this.setState({flippedCount: 1});
    } else if (this.state.flippedCount == 1) {
      // this.flipback();
      // setTimeout(this.flipback, 1000);
      setTimeout(() => {
        let reset = _.map(this.state.items, (item) => {
          if (!item.matched) {
            return _.extend(item, {flipped: false});
          }
          else {
            return item;
          }
        });
        this.setState({ items: reset });
      }, 2000)
      this.state.flippedCount = 0;
      // setTimeout(this.flipback, 1000); // maybe set this to a boolean flag and when its true execute something else
    }

    if(resetFlip) {
      alert("you hit reset flip");
    }

  }

  // // check for matches
  // checkMatch(value) {
  //   let xs = _.map(this.state.items, (item) => {
  //     if (item.value == value && item.flipped) {
  //       return _.extend(item, {flipped: true});
  //     }
  //     else {
  //       return item;
  //     }
  //   });
  //   this.setState({ items: xs });
  // }

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

function TodoItem(props) {
  let item = props.item;
  if (item.flipped) {

    return <li><button>{item.value} , {item.matched} (done)</button></li>;

  }
  else {
    return <li><button onClick={() => props.markItem(item.name)}>flip</button></li>
  }

}
