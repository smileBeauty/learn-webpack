import React from 'react';
import dogSrc from '../../images/dog.jpeg';
import cakeSrc from '../../images/cup-cake.png';
import { log } from '../../utils';
import $ from 'jquery';

class Dogs extends React.Component {
    componentDidMount() {
        if (false) {
            alert('DCE');
        }
        log('dogs moutend');
        $('.cup-cake').animate({
            height: '300px'
        }).animate({
            height: '100px'
        })
    }
    render() {
        return (
            <div className="dogs">
                <img src={dogSrc} alt="dog" />
                <img src={cakeSrc} alt="cup-cake" className="cup-cake" />
            </div>
        );
    }
}

export default Dogs;