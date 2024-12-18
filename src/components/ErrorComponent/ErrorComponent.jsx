import { Component } from 'react';

import LoadOrError from '../LoadOrError/LoadOrError';

class ErrorComponent extends Component {
  state = {
    error: null,
  };
  static getDerivedStateFromError() {
    return { error: true };
  }

  render() {
    return this.state.error ? <LoadOrError /> : this.props.children;
  }
}

export default ErrorComponent;
