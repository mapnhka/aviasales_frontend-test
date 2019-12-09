import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withSearchPolling} from "./SearchPollingWrapper";

class Search extends Component {
    render() {
        return (
            <div>Search</div>
        );
    }
}

const mapStateToProps = state => ({});

export default withSearchPolling()(connect(mapStateToProps, null)(Search));