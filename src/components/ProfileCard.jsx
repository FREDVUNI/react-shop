import React from 'react'

const ProfileCard = ({profile}) => {
    return (
        <>
            <li>
                <strong>Username:</strong>
                {profile.username}
            </li>
            <li>
                <strong>Email:</strong>
                {profile.email}
            </li>
        </>
    )
}

export default ProfileCard
