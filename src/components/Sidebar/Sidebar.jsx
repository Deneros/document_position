import styled from 'styled-components';
import Draggable from 'react-draggable';
import PropTypes from "prop-types";


Sidebar.propTypes = {
  draggableComponents: PropTypes.any,
  handleStop: PropTypes.func,
};


const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  position: fixed;
  left: 0;
  width: 200px;
  height: 100vh;
  background: #3a3f58;
  color: #fff;
`;

const SidebarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
`;

export default function Sidebar({ draggableComponents = [] }) {
  return (
    <SidebarContainer>
      <SidebarMenu>
        {draggableComponents.map(({ component: Component, props, handleStop }, index) => (
          <Draggable key={index} onStop={handleStop}>
            <SidebarMenuItem>
              <Component {...props} />
            </SidebarMenuItem>
          </Draggable>
        ))}
      </SidebarMenu>
    </SidebarContainer>
  );
}