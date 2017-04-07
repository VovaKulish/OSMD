import React, {Component, PropTypes} from 'react';
import PriorityStar from './priorityStar';

class Priority extends Component {

    static propTypes = {
        isEditing: PropTypes.bool,
        isVertical: PropTypes.bool,
        starWidth: PropTypes.number,
        priority: PropTypes.number.isRequired,

        setPriority: PropTypes.func
    }

    constructor(props){
        super(props);
    }

    render() {

        const {isEditing, priority, setPriority, isVertical, starWidth} = this.props;
        let style = isVertical ? {'flexDirection': 'column'} : {'flexDirection': 'row'};

        return (
            <section className="rating" style={style}>
                {
                    [1,2,3,4,5].map((v) => {
                        return (
                            <PriorityStar
                                key={v}
                                starWidth={starWidth}
                                isEditing={isEditing}
                                setPriority={setPriority}
                                priority={v}
                                isActive={this.props.priority >= v}
                            />
                        );
                    })
                }
            </section>
        )
    }
}

export default Priority;