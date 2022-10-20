import { useState } from 'react';
import styled from "styled-components";
import { COLORS } from '../styles/colors';

const OpportunityStyles = styled.div`
    position: fixed;
    top: 115px;
    left: 0;
    width: 100%;
    height: calc(100vh - 115px);
    background-color: white;
    padding: 75px 25px 0;
`;

const CloseButton = styled.div`
    position: absolute;
    left: 50%;
    top: 25px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    max-width: 1400px;
    height: auto;
    transform: translateX(-50%);

    button {
        position: relative;
        margin: 0;
        width: 35px;
        height: 35px;
        border: none;
        background-color: transparent;
        transition-duration: .5s;
        opacity: .6;
        cursor: pointer;
        &:hover {
            opacity: 1;
        }

        span {
            position: absolute;
            width: 35px;
            height: 3px;
            left: 50%;
            top: 50%;
            background-color: ${COLORS.primaryBlue};
            &:nth-child(1) {
                transform: translate(-50%,-50%) rotate(-45deg);
            }
            &:nth-child(2) {
                transform: translate(-50%,-50%) rotate(45deg);
            }
        }
    }
`

const OpportunityWindow = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 75vh;
    border: 1px dotted grey;
    overflow-x: hidden;
    overflow-y: scroll;
`
const OpportunityContainer = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1400px;
    height: 100vh;
`

export default function Opportunity() {
    return (
        <OpportunityStyles className='active'>
            <CloseButton>
                <button>
                    <span /><span />
                </button>
            </CloseButton>
            <OpportunityWindow>
                <OpportunityContainer>
                    <p>hi mate</p>
                </OpportunityContainer>
            </OpportunityWindow>
        </OpportunityStyles>
    )
}