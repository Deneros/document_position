import styled from 'styled-components';
import PropTypes from "prop-types";


SignatureComponent.propTypes = {
  name: PropTypes.string,
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
`;

const SignatureText = styled.span`
  font-size: 0.8em;
  font-weight: bold;
`;

function SignatureComponent({name}) {
  return (
    <SignatureContainer>
      <SignatureText>{name}</SignatureText>
    </SignatureContainer>
  );
}

export default SignatureComponent;