import React from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();

    const goToNataliePage = () => {
        navigate('/natalie'); // Navigate to Natalie page
    };

    const goToJarvisPage = () => {
        navigate('/jarvis');
    };


    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={goToNataliePage}>Go to Natalie Page</button>
                <p>Natalie is a nutrition specialist, but she can help talk about anything!</p>
            </div>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={goToJarvisPage}>Go to Jarvis Page</button>
                <p>Jarvis will always respond out loud first, he is great to talk to vocally!</p>
            </div>
        </div>
    );
};

export { Home };
export default Home;