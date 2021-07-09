import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import InfoTable from './InfoTable/Index';
import { fetchRepository } from 'api/Api';
import Spinner from 'images/largeSpinner.gif';
import leftArrow from 'images/circled-left-2.png';
import star from 'images/star.png';
import {Colors, Filters} from 'resources/Index';
import styled from 'styled-components';

const RepositoryStyles = styled.div`  
  h1 a {
    color: black;
    margin: 10px;
    font-size: 5vw;
    text-decoration: none;
    &:hover { color: ${Colors.ACCENT} }
    word-break: break-all;
    @media screen and (max-width: 600px) { font-size: 33px; }
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
    margin: 10px;
    &:hover {
        filter: ${Filters.ACCENT};
    }
    animation: rotation 2s infinite linear;

      
    @keyframes rotation {
      25% {
        transform: rotate(5deg);
      }
      75% {
        transform: rotate(-5deg);
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
  }
  
  .info {
    background-color: ${Colors.TERTIARY};
    grid-template-columns: minmax(1fr, auto);
    grid-template-rows: 1fr;
  }

  .avatar {
    grid-template-rows: 1fr;

    @media screen and (max-width: 600px) {
      order: -1;
    }
  }

  .avatar img {
    border-radius: 270px;
    margin: 10px;
    min-width: 250px;
    max-width: 400px;
    height: auto;
  }

  .loginName {
    display: block;
    font-size: 33px;
    margin: 10px 0;
    font-weight: bold;

    @media screen and (max-width: 600px) {
      font-size: 22px;
    }
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
  }

  #stargazerCount {
    position: absolute;
  }

`;

const Repository = ({ results, detailRecordOverride}) => {
  const { id } = useParams();
  const encodedId = encodeURIComponent(id);

  const [isLoading, setIsLoading] = useState(false);
  const [detailRecord, setDetailRecord] = useState(detailRecordOverride ? detailRecordOverride : null);

  const noRecordFound = !isLoading && (!detailRecord || !detailRecord.id);

  if (!detailRecord && results?.items?.length) { //get results item if we already have
    setDetailRecord(results.items.filter((item) => item.id === parseInt(encodedId))[0]);
  } else if (!isLoading && !detailRecord) { // call detail endpoint
    fetchRepository({
      id,
      setDetailRecord,
      setIsLoading,
    });
  }

  if (isLoading) {
    return (
      <div>
        <img src={Spinner} alt='loading' />
      </div>
    )
  }

  if (noRecordFound) {
    return (
      <RepositoryStyles>
        <header>
          <Link to={'/'}>
            <img className='back' src={leftArrow} alt='back' />
          </Link>
        </header>
        <h3>No repository found with this ID</h3>
        <h6>Please go back and try your search again.</h6>
      </RepositoryStyles>
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
            <span class='loginName'>{login}</span>
          </div>
        </div>
      </section>
    </RepositoryStyles>
  );
}

export default Repository;