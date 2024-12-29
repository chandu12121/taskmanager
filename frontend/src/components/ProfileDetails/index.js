import React, { useState, useEffect } from 'react';

const ProfileDetails = () => {
  const [profileImage, setProfileImage] = useState('https://www.w3schools.com/howto/img_avatar.png');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername !== "undefined") {
      setUsername(storedUsername);
    } else {
      setUsername("Guest"); 
    }
  }, []); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div style={{ padding: '20px',  display: 'flex', alignItems: 'center', flexDirection:"column", justifyContent:"flex-start"}}>
      <div >
        <img
          src={profileImage}
          alt="Profile"
          style={{
            width: '100px',
            height: '100px',
            marginRight: '20px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #ddd',
          }}
        />
      </div>
      <h1>{username}</h1>

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} 
        />
        <input
          type="file"
          accept="image/*"
          capture="camera"  
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <button 
          onClick={() => document.querySelector('input[type="file"]').click()} 
          style={{
            padding: '5px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Change Profile Picture
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
