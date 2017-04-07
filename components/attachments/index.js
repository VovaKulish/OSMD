 "use strict";

 import React, {Component, PropTypes} from 'react';
 import Attachment from './attachment';

 /*
	TODO:
	- add property className to use it for input field:
		on AddTask we have one background icon for button and on Main we have another.
	- style in accordance with coming style guide
 */

 class Attachments extends Component {

 	static propTypes = {
 		attachments: PropTypes.arrayOf(PropTypes.shape({
 			file: PropTypes.shape({
 				name: PropTypes.string.isRequired,
 				size: PropTypes.number.isRequired
 			}).isRequired,
 			dataUrl: PropTypes.string
 		})).isRequired,

 		removeAttachment: PropTypes.func.isRequired,
 		addAttachments: PropTypes.func.isRequired,
 		finalizeAttachmentLoad: PropTypes.func.isRequired
 	}

 	constructor(props){
 		super(props);

 		this.handleFileSelect = this.handleFileSelect.bind(this);
 		this.renderAttachments = this.renderAttachments.bind(this);
 		this.resetFileInput = this.resetFileInput.bind(this);
 	}

 	shouldComponentUpdate(nextProps) {
 		const curr = this.props.attachments;
 		const next = nextProps.attachments;

 		if(curr.length !== next.length) {
 			return true;
 		}

 		// attachments have the same length
 		for (let i = 0, max = curr.length; i < max; i++) {

	 		// if sorting is messed up we rerender
 			if(next[i].file.name !== curr[i].file.name){
 				return true;
 			}

	 		// if dataUrl is different we rerender
 			if(next[i].dataUrl !== curr[i].dataUrl){
 				return true;
 			}
 		}

 		return false;
 	}

 	// adds files from file input for processing
 	handleFileSelect(ev) {
 		const {addAttachments} = this.props;

 		let res = [],
 			files = ev.target.files;

 		for(let i = 0, max = files.length; i < max; i++) {
			res.push({file: files[i], dataUrl: ''});
		}

		addAttachments(res);
		this.resetFileInput();
 	}

 	resetFileInput() {
 		let inp = this.refs.files;

 		inp.value = '';
 		inp.type = '';
 		inp.type = 'file';
 	}

 	renderAttachments() {
		const {attachments, removeAttachment, finalizeAttachmentLoad} = this.props;

		return attachments.map((v, i) => (
			<Attachment key={'attach' + i}
				data={v}
				removeAttachment={(name) => {
					this.resetFileInput();
					removeAttachment(name);
				}}
				finalizeAttachmentLoad={finalizeAttachmentLoad}
			/>)
		);
 	}

 	render() {
 		return (
 			<div className='attachments'>
				<section className="attachment-flex">
 				{this.renderAttachments()}
				</section>
				<figure className="add-photo-icon">
 				<input type="file" ref="files" multiple
 					onChange={(e) => this.handleFileSelect(e)}
				/>
				</figure>
 			</div>
		)
 	}
 }

export default Attachments;
