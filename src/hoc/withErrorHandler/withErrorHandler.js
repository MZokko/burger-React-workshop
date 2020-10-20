import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };

    constructor(props) {
      super(props);
      this.requestInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.responseInterceptors = axios.interceptors.response.use(
        (res) => res,
        (myError) => {
          this.setState({ error: myError });
        }
      );
    }

    componentWillUnmount() {
       // console.log('willunmount',this.requestInterceptors,this.responseInterceptors)
        axios.interceptors.request.eject(this.requestInterceptors)
        axios.interceptors.response.eject(this.responseInterceptors)
    }

    errorconfirmHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorconfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
