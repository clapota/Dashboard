import React from 'react';
import {ItemTypes} from './Constants/Constants';
import { useDrop } from 'react-dnd'

function DropableZone(props) {
    const index = props.index;
    console.log(props);
	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.WIDGET,
		drop: (item, monitor) => props.callback(index, monitor, item),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
    });
    
    return (
        <div ref={drop}
        >
            {props.children}
            {
                isOver && 
                (
                    <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 1000,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                    }} />
                )
            }
        </div>
    );
}

export default DropableZone;