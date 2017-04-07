import React, {Component, PropTypes} from 'react'

class PriorityStar extends Component {

    static propTypes = {
        isActive: PropTypes.bool,
        priority: PropTypes.number.isRequired,
        isEditing: PropTypes.bool,
        width: PropTypes.number,

        setPriority: PropTypes.func
    }

    constructor(props){
        super(props);

        this.state = {
            isOnHover: false
        }

        this.onHoverHandle = this.onHoverHandle.bind(this);
        this.onBlurHandle = this.onBlurHandle.bind(this);
    }

    onHoverHandle() {
        this.setState({isOnHover: true});
    }

    onBlurHandle() {
        this.setState({isOnHover: false});
    }

    render() {

        const {priority, isActive, isEditing, starWidth, setPriority} = this.props;
        const {isOnHover} = this.state;

        let style = {};

        if(isActive) {
            style.backgroundColor = '#e54b00';
        }
        
        if(isOnHover) {
            style.backgroundColor = '#e54b00';
        }

        if(starWidth){
            style.height = starWidth + 'px';
            style.width = starWidth + 'px';
        }


        return !isEditing ? ( <figure style={style}></figure> ) : (            
            <figure 
                style={style}
                onMouseEnter={() => this.onHoverHandle()}
                onMouseLeave={() => this.onBlurHandle()}
                onClick={() => setPriority && setPriority(priority)}
            >
            </figure>
        )
    }
}

export default PriorityStar;