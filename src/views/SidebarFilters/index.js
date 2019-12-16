import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeFilter} from '../../actions/filter.actions';
import {bindActionCreators} from "redux";

class SidebarFilters extends Component {
    constructor(props) {
        super(props);

        this.formRef = React.createRef();
    }

    handleChange = () => {
        const checkboxElts = Array.from(this.formRef.current.elements);

        const selectedCheckboxes = checkboxElts.filter((element) => element.checked);

        this.props.actions.changeFilter(selectedCheckboxes.map((el) => el.value));
    };

    render() {
        const {filters} = this.props;

        return (
            <div className='card filter'>
                <div className='card__header filter__header'>
                    Количество пересадок
                </div>
                <div className='card__body filter__controls list checkbox__list'>
                    <form ref={this.formRef}>
                        <label className="checkbox list__item filter__control--checkbox" htmlFor='transfer_all'>
                            <input type="checkbox"
                                   checked={filters.includes('transfer_all')}
                                   id='transfer_all' onChange={this.handleChange} value='transfer_all'/>
                            <span className="checkbox__view"/>
                            Все
                        </label>
                        <label className="checkbox list__item filter__control--checkbox" htmlFor='transfer_0'>
                            <input type="checkbox" id='transfer_0' onChange={this.handleChange}
                                   checked={filters.includes('transfer_0')}
                                   value='transfer_0'/>
                            <span className="checkbox__view"/>
                            Без пересадок
                        </label>
                        <label className="checkbox list__item filter__control--checkbox" htmlFor='transfer_1'>
                            <input type="checkbox" id='transfer_1'
                                   checked={filters.includes('transfer_1')}
                                   onChange={this.handleChange} value='transfer_1'/>
                            <span className="checkbox__view"/>
                            1 пересадка
                        </label>
                        <label className="checkbox list__item filter__control--checkbox" htmlFor='transfer_2'>
                            <input type="checkbox"
                                   checked={filters.includes('transfer_2')}
                                   id='transfer_2' onChange={this.handleChange} value='transfer_2'/>
                            <span className="checkbox__view"/>
                            2 пересадки
                        </label>
                        <label className="checkbox list__item filter__control--checkbox" htmlFor='transfer_3'>
                            <input type="checkbox"
                                   checked={filters.includes('transfer_3')}
                                   id='transfer_3' onChange={this.handleChange} value='transfer_3'/>
                            <span className="checkbox__view"/>
                            3 пересадки
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.FilterReducer.filters
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        changeFilter,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarFilters);