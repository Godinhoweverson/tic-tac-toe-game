export default function BoardGame (){
    const boardArr = [[1,2,3],[4,5,6],[7,8,9]];

    return(
        <>
            <section className="boardgame-BoardGame">
                {boardArr.map((row, rowIndex) =>(
                    <div key={rowIndex} className="row-BoardGame">
                        {row.map((cell, cellIndex) =>(
                            <div key={cellIndex} className="cell-BoardGame">
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </>
    )
}