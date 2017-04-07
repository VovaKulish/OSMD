"use strict";

import React, {Component, PropTypes} from 'react'
import {fill_base, stroke_base} from '../../global/consts'

class ProfileIcon extends Component {
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

                <title>Profile</title>
                <defs>
                    {isActive && (
                        <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-5">
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
                    <g id="06-myTasks" transform="translate(-548.000000, -18.000000)" stroke={stroke_base}>
                        <g id="Group-16" transform="translate(245.000000, 0.000000)">
                            <g id="Group-21" transform="translate(305.000000, 20.000000)">

                                {isActive ? (
                                <g id="Rectangle-16">
                                    <use fill="white" fillOpacity="1" filter="url(#filter-5)" xlinkHref="#path-1"></use>
                                    <use stroke={stroke_base} mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-1"></use>
                                </g>
                                ) : (
                                    <use id="Rectangle-16" mask="url(#mask-3)" strokeWidth="3" xlinkHref="#path-1"></use>
                                )}

                                <g id="Group-14" transform="translate(4.500000, 4.000000)" fill={stroke_base}>
                                    <g id="user">
                                        <g id="Group">
                                            <path d="M13.9636875,13.3872812 C13.7959062,12.6426562 12.52825,8.0189375 
                                            6.99540625,8.0189375 C1.00778125,8.0189375 0.01553125,13.4325625 0.006125,13.4874687 
                                            C-0.0153125,13.6145625 0.0196875,13.745375 0.10325,13.8440312 C0.18659375,13.9429062 
                                            0.3093125,14 0.438375,14 L13.5526562,14 L13.561625,14 C13.8033437,14 14,13.8037812 
                                            14,13.5611875 C14,13.4995 13.9870937,13.4402187 13.9636875,13.3872812 
                                            L13.9636875,13.3872812 Z M1.00078125,13.122375 C1.38184375,11.890375 
                                            2.74575,8.89678125 6.9951875,8.89678125 C11.244625,8.89678125 12.60875,11.890375 
                                            12.9898125,13.122375 L1.00078125,13.122375 L1.00078125,13.122375 Z" id="Shape"></path>
                                            <path d="M6.99496875,7.19578125 C8.9775,7.19578125 10.5903438,5.5820625 
                                            10.5903438,3.598 C10.590125,1.61415625 8.9775,0 6.99496875,0 C5.01309375,0 
                                            3.40090625,1.61415625 3.40090625,3.59778125 C3.40090625,5.5820625 
                                            5.01309375,7.19578125 6.99496875,7.19578125 L6.99496875,7.19578125 
                                            Z M6.99496875,0.877625 C8.49428125,0.877625 9.71359375,2.0978125 9.71359375,3.598 
                                            C9.71359375,5.09775 8.4945,6.318375 6.99496875,6.318375 C5.49675,6.318375 
                                            4.27765625,5.09796875 4.27765625,3.598 C4.27765625,2.0978125 5.49675,0.877625 
                                            6.99496875,0.877625 L6.99496875,0.877625 Z" id="Shape"></path>
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

export default ProfileIcon