'use client'
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface DraggableProps {
  onDragStart?: () => void;
  onDrag?: (translation: { translateX: number; translateY: number }) => void;
  onDragEnd?: () => void;
  children: React.ReactNode
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const dragRef = useRef<HTMLDivElement>(null);
  
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!dragRef.current) return;
      setIsDragging(true);
      const { left, top } = dragRef.current.getBoundingClientRect();
      const offsetX = event.clientX - left;
      const offsetY = event.clientY - top;
      setOffset({ x: offsetX, y: offsetY });
    };
  
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      });
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    React.useEffect(() => {
      if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging]);
  
    return (
      <Container
      isDragging={isDragging} x={offset.x}  y={offset.y}
        ref={dragRef}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onMouseDown={handleMouseDown}
      >
        {children}
      </Container>
    );
  };
  
 
interface ContainerProps {
  x: number;
  y: number;
  isDragging: boolean;
}

const Container = styled.div<ContainerProps>`
  transform: translate(${props => props.x}px, ${props => props.y}px);
  cursor: grab;

  ${props =>
    props.isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
    `}
`;

const App: React.FC = () => {
    const handleDragStart = () => {
      console.log('Drag started');
    };
  
    const handleDrag = (translation: { translateX: number; translateY: number }) => {
      console.log('Dragged:', translation);
    };
  
    const handleDragEnd = () => {
      console.log('Drag ended');
    };
  
    return (
      <div>
        <Draggable
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <div style={{ width: '100px', height: '100px',
          border:"1px solid black",
          background: 'lightblue' }}>
            Drag Me
          </div>
        </Draggable>
      </div>
    );
  };

  export default App;