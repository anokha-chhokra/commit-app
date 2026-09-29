export default function StatsRow({ todayPoints, streak, total })
{
    return(
        <div className="stats-row">
            <div className="stat-pill today">
                <div className="label">TODAY</div>
                <div className="value px">+{todayPoints}</div>
            </div>
            <div className="stat-pill streak">
                <div className="label">STREAK</div>
                <div className="value px">{streak}🔥</div>
            </div>
            <div className="stat-pill total">
                <div className="label">TOTAL</div>
                <div className="value px">{total}</div>
            </div>
        </div>
    )
}