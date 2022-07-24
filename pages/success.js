import styled from 'styled-components';
import AlternateFooter from '../components/alternateFooter';
import { COLORS } from '../styles/colors';

const SuccessStyles = styled.div`
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;

    h1 {
        margin: 0 0 25px;
        font-size: 4.3em;
        line-height: 1.5;
        color: ${COLORS.primaryBlue};
        padding: 0 25px;
    }

    p {
        margin: 0 25px;
        font-size: 1.6em;
    }
`;

function Success() {
    return (
        <>
            <main>
                <SuccessStyles>
                    <h1>Thank you for your interest!</h1>
                    <p>Someone from Leading & Learning will respond to your message as soon as possible.</p>
                </SuccessStyles>
            </main>
            <AlternateFooter />
        </>
    )
}

export default Success;