import styled from 'styled-components';
import PropTypes from "prop-types";
import { useEffect } from 'react';

DocumentSigning.propTypes = {
    signers: PropTypes.array,
    insertSignature: PropTypes,
    signerId: PropTypes
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
  cursor: pointer;
`;

const SignatureText = styled.span`
  font-size: 0.8em;
  font-weight: bold;
`;


export default function DocumentSigning({ signers, insertSignature, signerId }) {

    const textToImage = async (text) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = '30px Arial';
        ctx.fillText(text, 10, 50);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(URL.createObjectURL(blob));
            });
        });
    };

    const handleClick = async (e, signer) => {
        const image = await textToImage(signer.name);
        insertSignature(image, signer.x, signer.y);
    };
    useEffect(() => {
        console.log(signerId)
        signers.forEach(signer => console.log(signer.id == signerId));
    }, [signerId, signers])


    return (
        <div>
            {signers.map(signer => (
                <SignatureContainer
                    key={signer.name}
                    x={signer.x}
                    y={signer.y}
                    onClick={signer.id === signerId ? (e) => handleClick(e, signer) : null}
                    style={{ pointerEvents: signer.id === signerId ? 'auto' : 'none' }}
                >
                    <SignatureText>{signer.name}</SignatureText>
                </SignatureContainer>
            ))}
        </div>
    )
}