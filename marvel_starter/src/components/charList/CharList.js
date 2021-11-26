import {Component} from 'react';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

export default class CharList extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }
    
    marvelService = new MarvelService();
    

    componentDidMount(){
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {

        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || errorMessage) ? <View char={char}/> : null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, thumbnail} = char;
    console.log(thumbnail)
    return(
        <li className="char__item">
            <img src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    )
}

