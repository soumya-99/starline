import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../../src/config'

function handleGetGameTime() {

    async function getGameTime(game_id, token) {
     
        const result = await axios.get(`${BASE_URL}/gametime_list?game_id=${game_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return result
    }

    return { getGameTime }
}

export default handleGetGameTime
