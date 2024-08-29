import { useEffect, useState } from 'react'
import PlayerAverageCard from './PlayerAverageCard';
import { getPlayerAboveAvg } from '../service/chessApi';

const PlayerAvgContainer = () => {

    const [player, setPlayer] = useState([]);
    
    useEffect(() => {
        const getPlayers = async () => {
            let data = await getPlayerAboveAvg();
            if (data != null && !data.message) {
                setPlayer(data);
            }
        }
        getPlayers();
    })



    return (
        <>
            <h2 className='text-center m-2'>Player Above Average</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {player.map((p, i) => <PlayerAverageCard key={i} player={p} />)}
            </div>
        </>
    )
}

export default PlayerAvgContainer;
