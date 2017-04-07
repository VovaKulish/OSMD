 "use strict";

 import React, {Component, PropTypes} from 'react'
 
 class Tag extends Component {

 	static propTypes = {
 		tag: PropTypes.string.isRequired,
 		idx: PropTypes.number,
        wrapInBorder: PropTypes.bool,

 		removeTag: PropTypes.func
 	}

 	constructor(props){
 		super(props);
 	}

 	render() {
		const {tag, idx, removeTag} = this.props;

 		return (
 			<div className='tag'>
 				<span className="tag-name"> {tag} </span>
 				{
                    removeTag && (
                        <span className="tag-close" onClick={() => removeTag(idx)}> x </span>
                    )
                }
 			</div>
		)
 	}
 }

export default Tag;