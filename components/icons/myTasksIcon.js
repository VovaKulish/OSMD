"use strict";

import React, {Component, PropTypes} from 'react'
import {fill_base, stroke_base} from '../../global/consts'

class MyTasksIcon extends Component {
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

        return (
            <svg width="27px" height="28px" viewBox="0 0 27 28" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink">

                <title>My Tasks</title>
                <defs>
                    {isActive && (
                        <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-4">
                            <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                            <feMorphology radius="1.5" operator="erode" in="SourceAlpha" result="shadowInner"></feMorphology>
                            <feOffset dx="0" dy="0" in="shadowInner" result="shadowInner"></feOffset>
                            <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1"></feComposite>
                            <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0.650985054   0 0 0 0 1  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                        </filter>
                    )}

                    <rect id="path-1" x="0" y="0" width="22.8" height="24" rx="3"></rect>
                    <mask id="mask-3" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="22.8" height="24" fill="white">
                        <use xlinkHref="#path-1"></use>
                    </mask>
                </defs>

                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"
                    opacity={isActive ? '' : 0.45}>
                    <g id="06-myTasks" transform="translate(-484.000000, -18.000000)" stroke={stroke_base}>
                        <g id="Group-16" transform="translate(245.000000, 0.000000)">
                            <g id="Group-4" transform="translate(241.000000, 20.000000)">
                                <g id="Group-12-Copy-2">
                                    
                                    {isActive ? (
                                    <g id="Rectangle-16">
                                        <use fill="white" fillOpacity="1" filter="url(#filter-4)" xlinkHref="#path-1"></use>
                                        <use stroke={stroke_base} mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-1"></use>
                                    </g>
                                    ) : (
                                        <use id="Rectangle-16" mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-1"></use>
                                    )}

                                </g>
                                <path d="M8,6 L18,6" id="Path-4" stroke={stroke_base}></path>
                                <path d="M8,10 L18,10" id="Path-4-Copy" stroke={stroke_base}></path>
                                <circle id="Oval-3" stroke={stroke_base} fill={fill_base} cx="5.5" cy="6" r="0.5"></circle>
                                <circle id="Oval-3-Copy" stroke={stroke_base} fill={fill_base} cx="5.5" cy="10" r="0.5"></circle>
                                <g id="favorite-heart-button" transform="translate(8.000000, 14.137255)" fill={stroke_base}>
                                    <g id="Capa_1">
                                        <g id="favorite">
                                            <path d="M3.5,6.4454902 L3.01,5.9554902 C1.19,4.3454902 0,3.2604902 0,1.9304902 
                                            C0,0.845490196 0.84,0.00549019608 1.925,0.00549019608 C2.52,0.00549019608 
                                            3.115,0.285490196 3.5,0.740490196 C3.885,0.285490196 4.48,0.00549019608 
                                            5.075,0.00549019608 C6.16,0.00549019608 7,0.845490196 7,1.9304902 
                                            C7,3.2604902 5.81,4.3454902 3.99,5.9554902 L3.5,6.4454902 L3.5,6.4454902 Z" 
                                            id="Shape"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

export default MyTasksIcon