import { useState} from "react";

function Cards({onData}) {
    const [initCards, setInitCards] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [drawnCard, setDrawnCard] = useState([]);

    const sendData = (i) => {
        onData(i);
    }

    const drawCard = () => {
        const randomCard = Math.floor(Math.random() * cards.length);
        const newCards = [...cards];
        // console.log(newCards);
        // console.log(cards);

        newCards.splice(randomCard, 1);

        if(cards.length == 1) {
            setCards(initCards);
            console.log("Shuffling")
            // console.log(initCards)
        } 

        else {
            setCards(newCards);
        }

        setDrawnCard(cards[randomCard]);
        sendData(cards[randomCard]);
    }

    return (
        <>
            <div className="cards">
                <button onClick={drawCard}>
                    Draw a card
                </button>
            </div>
            <div className="drawnCard">
               your card is {drawnCard}
            </div>
        </>
    );
};
export default Cards;