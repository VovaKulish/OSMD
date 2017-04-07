"use strict";

import React, {Component, PropTypes} from 'react'
import {fill_base, stroke_base} from '../../global/consts'

class HomeIcon extends Component {
    static propTypes = {
        isActive: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
      return this.props.isActive !== nextProps.isActive;
    }

    render() {
        const {isActive} = this.props;
        let filters = isActive ? 'url(#filter-1)' : null;

        return (
            <svg width="27px" height="28px" viewBox="0 0 27 28" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink">

                <title>Home</title>
                <defs>
                    {isActive && (
                        <filter ref='filters' x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-1">
                            <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                            <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0.650985054   0 0 0 0 1  0 0 0 1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
                            <feMerge>
                                <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                <feMergeNode in="SourceGraphic"></feMergeNode>
                            </feMerge>
                        </filter>
                    )}

                    <rect id="path-2" x="0" y="0" width="22.8" height="24" rx="3"></rect>
                    <mask id="mask-3" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="22.8" height="24" fill="white">
                        <use xlinkHref="#path-2"></use>
                    </mask>
                </defs>


                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"
                    opacity={isActive ? '' : 0.45}>
                    <g id="02-OSBB_dashboard" transform="translate(-292.000000, -19.000000)" stroke={stroke_base}>
                        <g id="Group-22" filter={filters} transform="translate(294.000000, 21.000000)">
                            <g id="Group-15" className='home-icon' fill={stroke_base} transform="translate(7.000000, 5.000000)">
                                <text id="H">
                                    <tspan x="0" y="11">H</tspan>
                                </text>
                            </g>
                            <use id="Rectangle-16" stroke={stroke_base} mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-2"></use>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

export default HomeIcon