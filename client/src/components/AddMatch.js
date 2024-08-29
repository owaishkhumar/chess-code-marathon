import React, { useState } from 'react'
import chess from '../images/chess.jpg'
import { addMatchApi } from '../service/chessApi';


const AddMatch = () => {
    const [match, setMatch] = useState({ player1Id: 0, player2Id: 0, matchDate: '', matchLevel: '', winnerId: 0 });

    const playersMap = new Map([
        [1, 'Magnus'],
        [2, 'Fabiano'],
        [3, 'Ding'],
        [4, 'Ian'],
        [5, 'Wesley'],
        [6, 'Anish'],
        [7, 'Hikaru'],
        [8, 'Viswanathan'],
        [9, 'Teimour'],
        [10, 'Levon']
    ])

    const getPlayersName = () => {
        return Array.from(playersMap).map(([id, name]) => (
            <option value={id}>{name}</option>
        ))
    }

    const onChange = (e) => {
        setMatch({ ...match, [e.target.id]: e.target.value })
    }

    const validate = async (e) => {
        e.preventDefault();
        console.log(match);
        if (match.player1Id === match.player2Id) {
            alert('Player 1 & Player 2 cannot be same');
            return
        }
        let res = await addMatchApi(match);
        if (JSON.stringify(res) === 1) {
            alert("Match added Successfullt")
        }
    }

    return (
        <div id="intro" className="bg-image" style={{ backgroundImage: `url(${chess})`, height: '100vh' }}>
            <div className='form-div'>
                <h1 className='text-center mb-3 '>Add Match</h1>
                <form className='form-group' onSubmit={validate}>
                    <div className='dropdown-player' >
                        <select value={match.player1Id} id='player1Id' onChange={onChange} required>
                            <option value="">Select Player 1</option>
                            {getPlayersName()}
                        </select>
                        <select value={match.player2Id} id='player2Id' onChange={onChange} required>
                            <option value="">Select     Player 2</option>
                            {getPlayersName()}
                        </select>
                    </div>
                    <div className='row-2'>
                        <input type='date' id='matchDate' value={match.matchDate} onChange={onChange} required />
                        <select name="cars" id="matchLevel" value={match.matchLevel} onChange={onChange} required>
                            <option value="">Select the level</option>
                            <option value="International">International</option>
                            <option value="National">National</option>
                        </select>
                    </div>
                    <select className='winner-select' id='winnerId' onChange={onChange} required>
                        <option value="">Select the winner</option>
                        <option value={match.player1Id}>{playersMap.get(Number(match.player1Id))}</option>
                        <option value={match.player2Id}>{playersMap.get(Number(match.player2Id))}</option>
                    </select>
                    <div className='button-container'>
                        <button className='button-add' type='submit'>Add</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddMatch
