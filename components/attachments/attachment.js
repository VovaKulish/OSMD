 "use strict";

 import React, {Component, PropTypes} from 'react'

const errText = 'відбулася помилка при читанні файлу.';

 class Attachment extends Component {

 	static propTypes = {
 		data: PropTypes.shape({
 			file: PropTypes.shape({
 				name: PropTypes.string.isRequired,
 				size: PropTypes.number.isRequired
 			}).isRequired,
 			dataUrl: PropTypes.string
 		}).isRequired,

 		removeAttachment: PropTypes.func.isRequired,
 		finalizeAttachmentLoad: PropTypes.func.isRequired
 	}

 	constructor(props){
 		super(props);

 		this.state = {
 			error: ''
 		};

 		this.reader = new FileReader();

 		this.handleFileLoad = this.handleFileLoad.bind(this);
 		this.updateProgress = this.updateProgress.bind(this);
 		this.handleError = this.handleError.bind(this);
 		this.abortRead = this.abortRead.bind(this);
 	}

 	componentWillMount() {
	 	// TODO: add extension and size checks
	 	// remove from files in this case

 		this.handleFileLoad();
 	}

 	handleError() {
 		const {removeAttachment, data: {file}} = this.props;

 		this.setState({error: errText});

 		setTimeout(() => removeAttachment(file.name), 3000);
 	}

 	updateProgress(ev) {
        let progress = this.refs.progress;

 		if (ev.lengthComputable && progress) {
	      var percentLoaded = Math.round((ev.loaded / ev.total) * 100);

	      if (percentLoaded < 100) {
	        progress.style.width = percentLoaded + '%';
	      }
	    }
 	}

 	abortRead(fileName) {
 		this.reader.abort();
 		this.props.removeAttachment(fileName);
 	}

 	handleFileLoad() {
 		const {finalizeAttachmentLoad, removeAttachment, data: {file} } = this.props;

 		let reader = this.reader;

		reader.onerror = this.handleError;
	    reader.onprogress = this.updateProgress;

	    reader.onloadstart = () => this.refs.progressBar.className += ' loading';

	    reader.onload = (e) => {
          this.refs.progress.style.width = '100%';
	      finalizeAttachmentLoad(file.name, reader.result);
	    }

	    reader.readAsDataURL(file);
 	}

 	render() {
		const {data: {file, dataUrl}, removeAttachment} = this.props;
		const {error} = this.state;

 		return (
 			<div className='attachment'>
 				{ error.length > 0 ? error : (
 					<div>
	 					{
	 						dataUrl.length > 0 ? (
							<div>
								<a href={dataUrl}>{file.name}</a>
							</div>
							) : (
		 					<div>
								<div> {file.name} </div>
				 				<div className='progress-bar' ref='progressBar'>
				 					<div ref='progress' className="percent"></div>
				 				</div>
				 			</div>
			 				)
						}
		 				<span onClick={() => this.abortRead(file.name)}
                            style={{margin: '0 15px'}}> видалити </span>
		 			</div>
		 			)
	 			}
 			</div>
		)
 	}
 }

export default Attachment;
