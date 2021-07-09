import {Colors} from 'resources/Index';
import styled from 'styled-components';

const HeaderStyles = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Bungee+Outline&family=Heebo:wght@200&display=swap');

  display: grid;
  grid-template-rows: 2fr 1fr;
  background-color: ${Colors.PRIMARY};
  border-bottom: 2px solid black;

  #logo {
    font-family: 'Bungee Outline', cursive;
    font-weight: bold;
    margin: 0px;
    padding: 0px;
    font-size: 50px;
  }

  #catchphrase {
    margin-left: 5px;
    padding: 0px;
    font-size: 17px;
  }

  @media only screen and (max-width: 600px) {
    text-align: center;

    #logo { font-size: 33px; }

    #catchphrase {
        margin-left: 0px;
    }
  }
`;

const Header = () => {
    return (
        <HeaderStyles>
            <span id='logo'>OctoFetcher</span>
            <span id='catchphrase'>We're gunna <em>change</em> the <em>world</em>.</span>
        </HeaderStyles>
    );
}

export default Header;