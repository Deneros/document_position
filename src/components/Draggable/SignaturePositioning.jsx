import styled from 'styled-components';

const SignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  border: 2px solid #000;
  border-radius: 5px;
  background: #fff;
  color: #000;
`;

const SignatureText = styled.span`
  font-size: 0.8em;
  font-weight: bold;
`;

function SignatureComponent() {
  return (
    <SignatureContainer>
      <SignatureText>My Signature</SignatureText>
    </SignatureContainer>
  );
}

export default SignatureComponent;