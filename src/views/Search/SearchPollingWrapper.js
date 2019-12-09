import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {fetchSearchId} from '../../actions/client.actions';
import {fetchTickets} from '../../actions/tickets.actions';

export const withSearchPolling = (reconnectAttemptsNumber = 3, attemptDuration = 200) => ChildComponent => {

    const Wrapper = () => (

        class extends Component {

            componentDidMount() {
                let reconnectAttemptsCounter = 0;

                const startSearch = () => {
                    this.props.actions.fetchSearchId()
                        .then((response) => {
                            let reconnectAttemptsCounter = 0;
                            const searchId = response.value.data.searchId;

                            const subscribe = (searchId) => {
                                this.props.actions.fetchTickets(searchId)
                                    .then((response) => {
                                        reconnectAttemptsCounter = 0;

                                        if (!response.value.data.stop) {
                                            subscribe(searchId);
                                        }
                                    })
                                    .catch((data) => {
                                        if (reconnectAttemptsCounter < reconnectAttemptsNumber) {
                                            reconnectAttemptsCounter++;

                                            setTimeout(() => {
                                                subscribe(searchId)
                                            }, attemptDuration);
                                        } else {
                                            //TODO handle error
                                            console.error("Error fetch tickets");
                                        }
                                    });
                            };
                            subscribe(searchId);
                        })
                        .catch((error) => {
                            if (reconnectAttemptsCounter < reconnectAttemptsNumber) {
                                reconnectAttemptsCounter++;

                                setTimeout(() => {
                                    startSearch();
                                }, attemptDuration);
                            } else {
                                //TODO handle error
                                console.error("Error fetch searchId");
                            }
                        });
                };

                startSearch();
            }

            componentWillUnmount() {
                /*clearInterval(this.dataPolling);*/
            }

            render() {
                return <ChildComponent {...this.props}/>;
            }
        });
    const mapStateToProps = () => ({});

    const mapDispatchToProps = dispatch => ({
        actions: bindActionCreators({
            fetchSearchId,
            fetchTickets
        }, dispatch)
    });

    return connect(mapStateToProps, mapDispatchToProps)(Wrapper())
};