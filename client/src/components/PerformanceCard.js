const PerformanceCard = ({player}) => {
    
    return (
        <div className="card" style={{width: '18rem', margin: '10px'}}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{player.fullName}</li>
                <li className="list-group-item">Total Wins: {player.totalWins}</li>
                <li className="list-group-item">Win Percentage: {(player.winPercentage).toFixed(2)}</li>
            </ul>
        </div>
    )
}

export default PerformanceCard
