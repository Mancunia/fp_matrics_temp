const SmallCard = (props) => {

    const providedSize ={card:{width:'40%',height:'30%'},text:{fontSize:'2vw',fontWeight:'bolder'}};
   

    return ( 
        <div className="card" style={providedSize.card}>
            <div className="title">Card Title</div>
                <h1>
                    This is just content for the cards sake, don't bother too much about it
                </h1>
                
                <div className="footer">
                    10 mins ago
                </div>
            
        </div>
     );
}
 
export default SmallCard;