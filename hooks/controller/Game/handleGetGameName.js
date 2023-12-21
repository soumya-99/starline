import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../../src/config'

function handleGetGameName() {

    const getGameList = async (token) => {
        // console.log("token is ",token)
        const result = axios.get(`${BASE_URL}/game-name`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return result
    }

    return { getGameList }
}

export default handleGetGameName
