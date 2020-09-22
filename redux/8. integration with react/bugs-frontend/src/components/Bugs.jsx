import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadBugs, resolveBug, selectUnresolvedBugs } from './../store/bugs';

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map(bug => (
          <React.Fragment>
            <li key={bug.id} style={{ padding: 10 }}>
              {bug.description}
              {!bug.resolved &&
                <button
                  onClick={() => this.props.resolveBug(bug.id)}
                  type="button"
                  style={{ marginLeft: 5 }}
                >
                  Resolve
              </button>}
            </li>
          </React.Fragment>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  bugs: state.entities.bugs.list,
  unresolvedBugs: selectUnresolvedBugs(state)
});

const mapDispatchToProps = dispatch => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: id => dispatch(resolveBug(id))
});

// Container component
// Presentation component (Bugs)
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);