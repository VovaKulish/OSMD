"use strict";

import React, {Component, PropTypes} from 'react'
import {fill_base, stroke_base} from '../../global/consts'

class CreateTaskIcon extends Component {
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

                <title>Create task</title>
                <defs>
                    {isActive && (
                        <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-3">
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
                    <g id="05-OSBB_createTask" transform="translate(-420.000000, -18.000000)" stroke={stroke_base}>
                        <g id="Group-16" transform="translate(245.000000, 0.000000)">
                            <g id="Group-13" transform="translate(177.000000, 20.000000)">
                                <g id="Group-12-Copy">
                                  
                                    {isActive ? (
                                    <g id="Rectangle-16">
                                        <use fill="white" fillOpacity="1" filter="url(#filter-3)" xlinkHref="#path-1"></use>
                                        <use stroke={stroke_base} mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-1"></use>
                                    </g>
                                    ) : (
                                        <use id="Rectangle-16" mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-1"></use>
                                    )}

                                    <path d="M8,6 L18,6" id="Path-4" stroke={stroke_base}>></path>
                                    <path d="M8,10 L18,10" id="Path-4-Copy" stroke={stroke_base}>></path>
                                    <circle id="Oval-3" stroke={stroke_base}> fill="#D8D8D8" cx="5.5" cy="6" r="0.5"></circle>
                                    <circle id="Oval-3-Copy" stroke={stroke_base}> fill={fill_base} cx="5.5" cy="10" r="0.5"></circle>
                                </g>
                                <path d="M8,17 L15,17" id="Path-5" stroke={stroke_base}>></path>
                                <path d="M11.5,20.5 L11.5,13.5" id="Path-5" stroke={stroke_base}></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

export default CreateTaskIcon