import React from 'react';
import {ItemTypes} from './Constants/Constants';
import {useDrag} from 'react-dnd';

function DragableItem(props) {
    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.WIDGET, index: props.index },
/*            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),*/
            isDragging: (monitor) => props.id === monitor.getItem().id,
        })

    return (
        <div
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move'
        }}
        >
            {props.child}
        </div>
    );
}    

export default DragableItem;