import React, { PropTypes } from 'react';
import NewsItem from './newsItem';

const News = (props) => {
    return (
        <aside className="global-ads">
            {
                props.news.map((v, i) => {
                    return (
                        <NewsItem key={ i } newsItem={ v } />
                    );
                })
            }
        </aside>
    );
};

News.propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    })).isRequired
};

export default News;
