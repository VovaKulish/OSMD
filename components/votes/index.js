import React, {Component, PropTypes} from 'react';

const radius = 45;
const circumference = 2 * radius * Math.PI;
class Votes extends Component {
    static propTypes = {
        votes: PropTypes.number.isRequired,
        totalVotes: PropTypes.number.isRequired
    }

    constructor(props){
        super(props);
    }

    render() {

        const {votes, totalVotes} = this.props;

        let r = radius + 0.2 + 'px',
            offset = -(circumference / totalVotes) * votes + 'px',
            rad = radius + 'px',
            dArr = circumference + 'px';

        return (
            <div className="svg radial-progress">
                <svg height="130px" width="130px">
                    <circle className="radial-progress-background" 
                        r={rad} cx="65px" cy="65px" fill="transparent"
                        strokeDasharray={dArr} strokeDashoffset="0em">
                    </circle>
                    <circle className="radial-progress-cover" 
                        r={rad} cx="65px" cy="65px" fill="transparent"
                        strokeDasharray={dArr} strokeDashoffset={offset}>
                    </circle>
                    <circle className="radial-progress-center" 
                        r={r} cx="65px" cy="65px" fill="transparent"
                        strokeDasharray={dArr} strokeDashoffset="0em">
                    </circle>
                </svg>
                <span>{votes}</span>
            </div>
        )
    }
}

export default Votes;