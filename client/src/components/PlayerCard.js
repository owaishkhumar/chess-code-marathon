import React from 'react'
import chessProfile from '../images/chessProfile.jpg'
const PlayerCard = (players) => {
    const player = players.player
    return (
        <div className="frame">
            <div className="center">

                <div className="profile">
                    <div className="image">
                        <div className="circle-1"></div>
                        <div className="circle-2"></div>
                        <img src={chessProfile} width="70" height="70" alt="Jessica Potter" />
                    </div>

                    <div className="name">{player.firstName} {player.lastName}</div>

                    <div className="actions">
                        <button className="btn">Follow</button>
                        <button className="btn">Message</button>
                    </div>
                </div>

                <div className="stats">
                    <div className="box">
                        <span className="value">{player.country}</span>
                        <span className="parameter">Country</span>
                    </div>
                    <div className="box">
                        <span className="value">{player.currentWorldRanking}</span>
                        <span className="parameter">World Rank</span>
                    </div>
                    <div className="box">
                        <span className="value">{player.totalMatchesPlayed}</span>
                        <span className="parameter">Total Match Played</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard
