import { useState } from 'react';
import {Link, useParams} from 'react-router-dom';

import InfoTable from './InfoTable';
import {callRepository} from 'api/Api';
import Spinner from 'images/largeSpinner.gif';
import leftArrow from 'images/circled-left-2.png';
import star from 'images/star.png';
import Colors from 'resources/Colors';
import styled from 'styled-components';

const RepositoryStyles = styled.div`  
  h1 a {
    color: black;
    text-decoration: none;
    &:hover { color: ${Colors.ACCENT} }
    word-break: break-all;
    @media screen and (max-width: 600px) { font-size: 5vw; }
  }

  header {
      display: grid;
      grid-template-columns: 1fr 7fr 1fr;
      grid-template-rows: 1fr;
      align-items: center;
      font-size: 5vw;

      @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        > * {
          grid-column: 1 / -1 !important;
          grid-row: auto !important;
        }
      }
  }

  section {
    display: grid;
    grid-template-columns: minmax(10px, 1fr) minmax(10px, 1fr);
    grid-template-rows: 1fr 1fr;
    // grid-template-areas: header header;
    // grid-auto-rows: 1fr;
    grid-gap: 10px;
    
    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      > * {
        grid-column: 1 / -1 !important;
        grid-row: auto !important;
      }
    }
  }

  .back {
    width: 70px;
    &:hover {
        filter: invert(55%) sepia(99%) saturate(597%) hue-rotate(2deg) brightness(106%) contrast(98%);
    }
    animation: rotation 2s infinite linear;

      
    @keyframes rotation {
      25% {
        transform: rotate(3deg);
      }
      75% {
        transform: rotate(-3deg);
      }
    }
  }

  .tile {
    display: grid; 
    align-items: center;     
    justify-items: center;
  }

  .tile:nth-child(even) {
    background-color: ${Colors.PRIMARY};
    // background-color: #EFEFEF;
  }

  .tile:nth-child(odd) {
    background-color: ${Colors.SECONDARY};
  }

  .info {
    grid-template-columns: minmax(1fr, auto);
    height: fit-content;
  }

  .avatar {
    grid-template-rows: 1fr;

    @media screen and (max-width: 600px) {
      order: -1;
    }
  }

  .avatar img {
    border-radius: 270px;
    // width: 200px;
    // width: 80%;
    min-width: 250px;
    max-width: 400px;
    height: auto;
  }

  .avatar span {
      display: block;
      margin-bottom: 20px;
      font-weight: bold;
  }
  
  .star {
    display: grid;         
    align-items: center;     
    justify-items: center;
    position: relative;
    font-size: 55px;
    img {
      filter: invert(81%) sepia(10%) saturate(6408%) hue-rotate(2deg) brightness(108%) contrast(98%);
      width: 153px;
    }

    // @media screen and (max-width: 1000px) {
    //   img { width: 153px; }
    // }
  }

  #stargazerCount {
      position: absolute;
  }

`;

const Repository = ({results}) => {
    const {id} = useParams();
    const encodedId = encodeURIComponent(id);

    const [isLoading, setIsLoading] = useState(false);
    const [detailRecord, setDetailRecord] = useState(null);

    if(!detailRecord && results.items.length) { //get results item if we already have
        setDetailRecord(results.items.filter((item) => item.id === parseInt(encodedId))[0]);
    } else if (!isLoading && !detailRecord) { // call detail endpoint
        callRepository({
            id, 
            setDetailRecord,
            setIsLoading,
        });
    }

    console.log('detailRecord:', detailRecord);

    if(isLoading){
      return (
        <div>
          <img src={Spinner} alt='loading' />
        </div>
      )
    }

    if (!isLoading && (!detailRecord || !detailRecord.id)){
        return (
            <div>
                <h3>No repository found with this ID</h3>
                <h6>Please go back and try your search again.</h6>
            </div>
        )
    }

    const {
        description,
        html_url,
        name,
        owner: {
            avatar_url,
            login,
        },
        stargazers_count,
    } = detailRecord;

    return (
        <RepositoryStyles>
            <header>
                <Link to={'/'}>
                    <img className='back' src={leftArrow} alt='back' />
                </Link>
                <h1>
                    <a 
                      href={html_url} 
                      rel='noopener noreferrer'
                      target='_blank'>
                        {name}
                    </a>
                </h1>
            </header>
            <section>
                <div className={'tile info'}>
                  <div className='star'>
                    <img src={star} alt={'star'} />
                    <span id='stargazerCount'>{stargazers_count}</span>
                  </div>
                  <p>{description}</p>
                  <InfoTable detailRecord={detailRecord} />
                </div>
                <div className='tile avatar'>
                    <div>
                        <img src={avatar_url} alt={`${name} avatar`} />
                        <span>{login}</span>
                    </div>
                </div>
            </section>
        </RepositoryStyles>
    );
}

export default Repository;