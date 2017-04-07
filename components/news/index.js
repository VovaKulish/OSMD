import React from 'react';
import { connect } from 'react-redux';
import News from './news';

const mapPropsToState = (state) => {
    return {
        news: state.main.news
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const NewsContainer = connect(
    mapPropsToState,
    mapDispatchToProps
)(News);

export default NewsContainer;
