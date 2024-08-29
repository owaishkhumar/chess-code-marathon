import { useState } from 'react'
import { getPlayersByCountry } from '../service/chessApi';
import PlayerCard from './PlayerCard'

const PlayerContainer = () => {

    const [player, setPlayer] = useState([]);
    const [country, setCountry] = useState('')
    
    const handleClick = () => {
        const getPlayers = async (country) => {
            let data = await getPlayersByCountry(country);
            if (data != null && !data.message) {
                console.log('Data')
                setPlayer(data);
            }
        }
        getPlayers(country);
    }

    return (
        <>
            <h2 className='text-center m-2'>Player</h2>
            <div className='fluid-container mx-5' style={{ display: 'flex', justifyContent: 'center' }}>
                <input type='text' className='form-control m-2' placeholder='Filter by country' value={country} onChange={(e) => setCountry(e.target.value)} />
                <button className='btn btn-primary m-2' onClick={handleClick}>Filter</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {player.map((p, i) => <PlayerCard key={i} player={p} />)}
            </div>
        </>
    )
}

export default PlayerContainer;
