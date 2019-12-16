import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeSort} from '../../actions/tickets.actions';
import {bindActionCreators} from "redux";
import classNames from 'classnames';

class SortControls extends Component {

    changeSort = (sortType) => () => {
        this.props.actions.changeSort(sortType);
    };

    render() {
        const {sort} = this.props;

        return (
            <div className='tabs tabs__horizontal'>
                <div onClick={this.changeSort('cost')}
                     className={classNames('tabs__tab', sort === 'cost' && 'tabs__tab--active')}>Самый дешевый
                </div>
                <div onClick={this.changeSort('time')}
                     className={classNames('tabs__tab', sort === 'time' && 'tabs__tab--active')}>Самый быстрый
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sort: state.TicketsReducer.sort
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        changeSort,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SortControls);