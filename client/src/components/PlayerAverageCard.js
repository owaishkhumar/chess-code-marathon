import React from 'react'

const PlayerAverageCard = ({player}) => {
    return (
        <div className="card">
            <div className="card__title">table</div>
            <div className="card__data">
                <div className="card__right">
                    <div className="item">Name</div>
                    <div className="item">Total Matches Played</div>
                    <div className="item">Total Matches Won</div>
                    <div className="item">Win Percentage</div>
                </div>
                <div className="card__left">
                    <div className="item">{player.fullName}</div>
                    <div className="item">{player.totalMatchesPlayed}</div>
                    <div className="item">{player.totalMatchesWon}</div>
                    <div className="item">{player.winPercentage}</div>
                </div>
            </div>
        </div>

    )
}

export default PlayerAverageCard
