import React, { useEffect, useState, useCallback } from 'react';
import raajpic from '../images/raaj.jpg';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  const callAboutPage = useCallback(async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
      setUserdata(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    callAboutPage();
  }, [callAboutPage]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUserData({ ...userData });
  };

  const handleSaveClick = async () => {

    try {
      debugger;
      const res = await fetch('/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserData),
        credentials: 'include',
      });

      if (res.status === 200) {
        setSaveSuccessMessage('Profile saved successfully!');
        setEditMode(false);
        callAboutPage();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className='container emp-profile'>
        <form method='GET'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-img'>
                <img src={raajpic} alt='raaj' />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='profile-head'>
                <h5>{userData && userData.name}</h5>
                <h6>{userData && userData.work}</h6>
                <p className='profile-rating mt-3 mb-5'>RANKINGS <span> 1/10 </span></p>
              </div>
            </div>
            <div className='col-md-2'>
              {editMode ? (
                <input
                  type='button'
                  className='profile-edit-btn'
                  value='Save Profile'
                  onClick={handleSaveClick}
                />
              ) : (
                <input
                  type='button'
                  className='profile-edit-btn'
                  value='Edit Profile'
                  onClick={handleEditClick}
                />
              )}
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4 '>
              <div className='profile-work'>
                <p> WORK LINK </p>
                <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' target='_thapa'>youtube</a><br />
                <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' target='_thapa'>youtube</a><br />
                <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' target='_thapa'>youtube</a><br />
                <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' target='_thapa'>youtube</a><br />
                <a href='https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA' target='_thapa'>youtube</a><br />
              </div>
            </div>
            <div className='col-md-8 pl-5 about-info'>
              <div className='tab-content profile-tab' id='myTabContent '>
                <div className='tab-pane fade show active ' id='home' role='tabpanel' aria-labelledby='home-tab'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>User ID </label>
                    </div>
                    <div className='col-md-6'>
                      <p>859595</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>Name </label>
                    </div>
                    <div className='col-md-6'>
                      <p>{editMode ? (
                        <input
                          type='text'
                          name='name'
                          value={editedUserData.name || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        userData?.name
                      )}</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>Email</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{editMode ? (
                        <input
                          type='text'
                          name='email'
                          value={editedUserData.email || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        userData?.email
                      )}</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>Phone</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{editMode ? (
                        <input
                          type='text'
                          name='phone'
                          value={editedUserData.phone || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        userData?.phone
                      )}</p>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label>College Name</label>
                    </div>
                    <div className='col-md-6'>
                      <p>School of Management</p>
                    </div>
                  </div>
                  {saveSuccessMessage && (
                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <label> </label>
                      </div>
                      <div className='col-md-6'>
                        <p style={{ color: 'green' }}>{saveSuccessMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
   
</>
  );
};

export default About;