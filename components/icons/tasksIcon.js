"use strict";

import React, {Component, PropTypes} from 'react'
import {fill_base, stroke_base} from '../../global/consts'

class TasksIcon extends Component {
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

                <title>Tasks</title>
                <defs>
                    {isActive && (
                        <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-2">
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
                    <g id="02-OSBB_dashboard" transform="translate(-356.000000, -18.000000)" stroke={stroke_base}>
                        <g id="Group-16" transform="translate(245.000000, 0.000000)">
                            <g id="Group-12" transform="translate(113.000000, 20.000000)">

                                {isActive ? (
                                <g id="Rectangle-16">
                                    <use fill="white" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                                    <use stroke={stroke_base} mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-1"></use>
                                </g>
                                ) : (
                                    <use id="Rectangle-16" mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-1"></use>
                                )}
                                
                                <path d="M8,6 L18,6" id="Path-4" stroke={stroke_base}></path>
                                <path d="M8,10 L18,10" id="Path-4-Copy" stroke={stroke_base}></path>
                                <path d="M8,14 L18,14" id="Path-4-Copy-2" stroke={stroke_base}></path>
                                <path d="M8,18 L18,18" id="Path-4-Copy-3" stroke={stroke_base}></path>
                                <circle id="Oval-3" stroke={stroke_base} fill={fill_base} cx="5.5" cy="6" r="0.5"></circle>
                                <circle id="Oval-3-Copy-2" stroke={stroke_base} fill={fill_base} cx="5.5" cy="14" r="0.5"></circle>
                                <circle id="Oval-3-Copy" stroke={stroke_base} fill={fill_base} cx="5.5" cy="10" r="0.5"></circle>
                                <path d="M5.5,18.5 C5.77614237,18.5 6,18.2761424 6,18 C6,17.7238576 
                                5.77614237,17.5 5.5,17.5 C5.22385763,17.5 5,17.7238576 5,18 C5,18.2761424 5.22385763,18.5 
                                5.5,18.5 Z" id="Oval-3-Copy-3" stroke={stroke_base} fill={fill_base}></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

export default TasksIcon