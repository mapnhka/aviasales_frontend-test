import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withSearchPolling} from "./SearchPollingWrapper";
import SortControls from './SortControls';
import {mergeSortedArrays} from '../../utils/functions';
import moment from 'moment';

require('decliner/dist/decliner.min');

const locale = "ru";
// 1 %предмет%, 2 %предмета%, 5 %предметов%
const stopsLabels = ['пересадка', 'пересадки', 'пересадок'];

class Search extends Component {
    render() {
        const {tickets, stop} = this.props;

        return (
            <div>
                <SortControls/>
                <div className='tickets-list'>
                    {tickets.length === 0
                        ? <div className='tickets-list__item card' key={`ticket_no-results`}>
                            <div className='card__body'>
                                {stop
                                    ? '☹ Нет ни одного билета, соотвествующего заданным фильтрам.'
                                    : '🔎 Ищем авиабилеты'
                                }
                            </div>
                        </div>
                        : null}
                    {tickets.map((ticket, index) => {
                        return (
                            <div className='tickets-list__item card' key={`ticket_${index}`}>
                                <div className='card__body'>
                                    <div className='tickets-list__item--row tickets-list__header'>
                                        <div
                                            className='tickets-list__item-price'>{`${ticket.price.toLocaleString(locale)} Р`}</div>
                                        <div className='tickets-list__item-company'>
                                            <img height={38} src={`//pics.avs.io/99/36/${ticket.carrier}@2x.png`}/>
                                        </div>
                                    </div>
                                    {ticket.segments.map((segment, index) => {
                                        return (
                                            <div className='tickets-list__item--row tickets-list__variant'
                                                 key={`ticket_${index}_segment_${index}`}>
                                                <div className='tickets-list__variant-info'>
                                                    <div
                                                        className='tickets-list__data-caption'>{`${segment.origin} – ${segment.destination}`}</div>
                                                    <div
                                                        className='tickets-list__data-value'>{`${moment(segment.date).format('hh:mm')} – ${moment(segment.date).add(segment.duration, 'minutes').format('hh:mm')}`}</div>
                                                </div>
                                                <div className='tickets-list__variant-info'>
                                                    <div className='tickets-list__data-caption'>В пути</div>
                                                    <div
                                                        className='tickets-list__data-value'>{`${~~(segment.duration / 60)}ч ${segment.duration % 60 > 10 ? segment.duration % 60 : '0' + segment.duration % 60}м`}</div>
                                                </div>
                                                <div className='tickets-list__variant-info'>
                                                    <div
                                                        className='tickets-list__data-caption'>{`${segment.stops.length === 0 ? 'без' : segment.stops.length} ${stopsLabels.decline(segment.stops.length)}`}</div>
                                                    <div
                                                        className='tickets-list__data-value'>{segment.stops.join(', ')}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const filters = state.FilterReducer.filters;
    const sort = state.TicketsReducer.sort;

    const tickets = filters.reduce((resultArr, filter) => {
        return mergeSortedArrays(resultArr, state.TicketsReducer.index[filter][sort]);
    }, []);

    return {
        tickets: tickets.slice(0, 5),
        fetching: state.TicketsReducer.fetching,
        fetched: state.TicketsReducer.fetched,
        stop: state.TicketsReducer.stop
    }
};

export default withSearchPolling()(connect(mapStateToProps, null)(Search));