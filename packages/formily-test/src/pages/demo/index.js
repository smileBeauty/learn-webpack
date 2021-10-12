import React from 'react';
import './style.css';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

const obs = observable({
    value: 'hello world'
});

const Demo = function (props) {
    return (
        <div className="demo">
            <p>demo</p>
            <div>
                <input
                    style={{
                        height: 28,
                        padding: '0 8px',
                        border: '2px solid #888',
                        borderRadius: 3,
                    }}
                    value={obs.value}
                    onChange={(e) => {
                        obs.value = e.target.value
                    }}
                />
            </div>
            <div>{obs.value}</div>
        </div>
    );
}

export default observer(Demo);