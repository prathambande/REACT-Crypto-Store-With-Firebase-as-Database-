import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableCryptos.module.css'
import LiCrypto from './LiCrypto'

const dummy = [
    {
        id: 'g1',
        name: 'Bitcoin',
        description: 'Classic',
        price: 121700
    },

    {
        id: 'g2',
        name: 'Etherium',
        description: 'Obvious',
        price: 120600
    },

    {
        id: 'g3',
        name: 'Doge',
        description: 'Trust me on this one',
        price: 2400
    },

];

const AvailableCryptos = () => {

    const [cryptos, setCrpytos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('/*link*/');

            if (!response.ok) {
                throw new Error('Something went wrong!');
              }

            const responseData = await response.json();
            //console.log(responseData);

            const loadedData = [];
            for (const key in responseData){
                //console.log(key);
                loadedData.push({
                    id:key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setCrpytos(loadedData);
            setIsLoading(false);
        }
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setError(error.message);
          });
    }, [])


    const toshow = cryptos.map((crypto) => 
    
    <LiCrypto
        key={crypto.id}
        id={crypto.id}
        name={crypto.name}
        desc={crypto.description}
        price={crypto.price}
    >{crypto.name}</LiCrypto>)
    return(
        <section className={classes.guns}>
            <Card>
                <ul>
                    {isLoading && <p>Loading....</p>}
                    {error && <p>{error}</p>}
                    {!isLoading && toshow}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableCryptos;