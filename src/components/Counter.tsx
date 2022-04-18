import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

    // Component Mounted
    // useEffect(() => {
    //     document.title = `You clicked ${count} times`;
    //     console.log('The use effect ran');
    // });

    // component Updated
    // useEffect(() => {
    //     document.title = `You clicked ${count} times`;
    //     console.log('The use effect ran');
    // }, [count]);

    // Component unmount
    useEffect(() => {
        console.log(`The use effect count updated to ${count}`);
        return () => {
            console.log(`we are in the cleanup - the count is ${count}`);
        }
    }, [count]); // the array must be here for unmount!


    return (
        <div>
            <h6>Counter</h6>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            Increment
            </button>
        </div>
    );
}

export default Counter;