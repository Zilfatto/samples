import React from 'react';
// High order component
function withTooltip(Component) {
  // return wrapper class or function component
  return class WithTooltip extends React.Component {
    // Implementation of some logic and sharing across different components
    state = { showTooltip: false };

    handleMouseOver = () => this.setState({ showTooltip: true });

    handleMouseOver = () => this.setState({ showTooltip: false });

    render() {
      return (
        <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <Component {...this.props} showTooltip={this.state.showTooltip} />
        </div>
      );
    }
  }
}

export default withTooltip;