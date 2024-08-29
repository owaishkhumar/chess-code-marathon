import { useEffect, useState } from 'react'
import { getPlayersPerformance } from '../service/chessApi';
import PerformanceCard from './PerformanceCard';

const PerformanceContainer = () => {

    const [player, setPlayer] = useState([]);
    
    useEffect(() => {
        const getPlayers = async () => {
            let data = await getPlayersPerformance();
            if (data != null && !data.message) {
                setPlayer(data);
            }
        }
        getPlayers();
    })



    return (
        <>
            <h2 className='text-center m-2'>Player Stats</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {player.map((p, i) => <PerformanceCard key={i} player={p} />)}
            </div>
        </>
    )
}

export default PerformanceContainer;
