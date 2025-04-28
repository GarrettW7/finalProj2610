import React from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();

    const goToNataliePage = () => {
        navigate('/natalie'); // Navigate to Natalie page
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={goToNataliePage}>Go to Natalie Page</button>
        </div>
    );
};

export { Home };
export default Home;