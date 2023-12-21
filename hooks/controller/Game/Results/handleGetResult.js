import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../../../src/config'

function handleGetResult() {

    const getResult = async (game_id,token) => {
        // console.log("token is ",token)
        const result = axios.get(`${BASE_URL}/game_result?game_id=${game_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return result
    }

    return { getResult }
}

export default handleGetResult
