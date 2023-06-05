import styled from 'styled-components';
import PropTypes from "prop-types";

DocumentSigning.propTypes = {
    signers: PropTypes.array,
};


const SignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  border: 2px dashed #000;
  background: transparent;
  color: #000;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

const SignatureText = styled.span`
  font-size: 0.8em;
  font-weight: bold;
`;


export default function DocumentSigning({signers}) {


    return (
        <div>
            {signers.map(signer => (
                <SignatureContainer key={signer.name} x={signer.x} y={signer.y}>
                    <SignatureText>{signer.name}</SignatureText>
                </SignatureContainer>
            ))}
        </div>
    )
}