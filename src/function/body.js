import React from 'react';

var Body = props => {
    if(props.err) {
        return (<div>{props.err}</div>);
    } else {
        return (<ul className="list-group App-result-list">{props.res}</ul>);
    }
}

export default Body;