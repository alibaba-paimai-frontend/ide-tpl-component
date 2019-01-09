import styled from 'styled-components';

interface IContainer {
  visible?: boolean;
}

export const StyledContainer = styled.div`
  display: ${(props: IContainer) => props.visible ? 'block' : 'none'};
  background: #ccc;
  width: 200px;
  height: 100px;
  padding: 10px 20px;
`;

