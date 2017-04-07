 "use strict";

 import React, {Component, PropTypes} from 'react';
 import Tag from './tag';

 class TagAutocomplete extends Component {

 	static propTypes = {
 		tagsAll: PropTypes.arrayOf(PropTypes.string).isRequired,
 		tagsSelected: PropTypes.arrayOf(PropTypes.string),
 		isOpen: PropTypes.bool,
        tagsField: PropTypes.shape({
            isPristine: PropTypes.bool.isRequired,
            errors: PropTypes.string.isRequired
        }).isRequired,

 		removeTag: PropTypes.func.isRequired,
 		addTag: PropTypes.func.isRequired,
        updateTagField: PropTypes.func
 	}

 	constructor(props){
 		super(props);

 		this.state = {
 			isOpen: false,
 			curTag: ''
 		};

 		this.renderSelectedTags = this.renderSelectedTags.bind(this);
 		this.renderAllTags = this.renderAllTags.bind(this);
 		this.onKeyUp = this.onKeyUp.bind(this);
 		this.onChange = this.onChange.bind(this);
 		this.onListItemCLick = this.onListItemCLick.bind(this);
 	}

 	componentWillReceiveProps(nextProps){
 		this.setState({isOpen: nextProps.isOpen});
 	}

 	shouldComponentUpdate(nextProps, nextState){
 		const {tagsAll, tagsSelected} = this.props;
 		const {curTag, isOpen} = this.state;

 		return curTag !== nextState.curTag ||
 			isOpen !== nextState.isOpen ||
 			tagsSelected.length !== nextProps.tagsSelected.length ||
 			tagsAll.length !== nextProps.tagsAll.length;
 	}

 	onKeyUp(ev) {
 		const {curTag} = this.state;
		const {tagsAll, addTag} = this.props;

		if(ev.keyCode === 13) {
			ev.preventDefault();
			let tag = curTag.toLowerCase();

			if(tagsAll.indexOf(tag) > -1) {
				addTag(tag);
				this.setState({curTag: ''});
			}
            this.setState({isOpen: false});
		}
		return true;
 	}

 	onChange(ev) {
        this.props.updateTagField();
 		this.setState({curTag: ev.target.value});
 		return true;
 	}

 	onListItemCLick(tag) {
 		this.props.addTag(tag) && this.setState({curTag: ''});
 	}

 	renderSelectedTags() {
 		const {tagsSelected, removeTag} = this.props;

 		return tagsSelected.map((v, i) => (
 			<Tag key={'tag' + i} tag={v} idx={i} removeTag={removeTag} />
 			)
		);
 	}

 	// TODO: remove tags does not work; add tag from list does not work

 	renderAllTags() {
 		const {tagsAll} = this.props;
 		const {curTag} = this.state;

 		return (
	 		<ul>
	 			{
	 				tagsAll.filter((v) => v.includes(curTag.toLowerCase()))
 						.map((v, i) => (
                            <li key={'li' + i} onClick={(e) => {
                                    e.stopPropagation();
                                    this.onListItemCLick(v);
                                }}
                            > {v}
                            </li>
                        )
                    )
	 			}
	 		</ul>
	 	);
 	}

 	render() {
		const { isOpen, curTag } = this.state;
		const { tagsField } = this.props;

        const errCls = 'inputError';
        const tagsErr = !tagsField.isPristine && tagsField.errors;

 		return (
 			<div className='tag-autocomplete'
                onClick={(e) => e.stopPropagation()}
            >

 				<div className="tags-box">
 					{
 						this.renderSelectedTags()
 					}
 				</div>

 				<input type="text"
					   className={tagsErr ? errCls : ''}
 					value={curTag}
 					onChange={(e) => this.onChange(e)}
 					onKeyUp={(e) => this.onKeyUp(e)}
				/>

                { tagsErr && (<div className="errorText">{tagsField.errors}</div>) }
 				{ isOpen && this.renderAllTags() }
 			</div>
		)
 	}
 }

export default TagAutocomplete;
