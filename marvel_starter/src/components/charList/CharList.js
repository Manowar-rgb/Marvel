import {useState, useEffect} from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

 const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    
    const marvelService = new MarvelService();
    

    useEffect(()=> {
        onRequest();
    },[])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }    

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    const onError = () => {
        setError(true);
        setLoading(loading => false);
        }


   
    const onCharListLoaded = (newCharList) => {
            setCharList(charList => [...charList, ...newCharList]);
            setLoading(loading => false);
            setNewItemLoading(newItemLoading => false);
            setOffset(offset => offset + 9);
            }
    const renderItems = (arr) => {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => props.onCharSelecter(item.id)}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
        
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                disabled={newItemLoading}
                onClick={() => {
                    onRequest(offset)
                }}
                className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
}

export default CharList;

