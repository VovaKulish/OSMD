import React, { PropTypes, Component } from 'react';

const requireContext = require.context('../../assets',
    false, /\.(png|jpg)$/);

export default class Attachment extends Component {
    static propTypes = {
        attachment: PropTypes.shape({
            url: PropTypes.string.isRequired, // possibly it is going to be binary, so we need blob uri
            mimetype: PropTypes.string.isRequired
        })
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        const { url, mimetype } = this.props.attachment;
        return url !== nextProps.attachment.url;
    }

    render() {
        const { url, mimetype } = this.props.attachment;
        return (
            <figure className="posted-photo">
                {
                    mimetype.indexOf('image') > -1 ? (
                        <img src={requireContext(`./${url}`)} alt=""/>
                    ) : (
                        <a href={ url }> { url } </a>
                    )
                }
            </figure>
        );
    }
}
