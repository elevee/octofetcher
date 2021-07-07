import styled from 'styled-components';

const HeaderStyles = styled.header`
  display: grid;
  grid-template-rows: 2fr 1fr;
  
  #logo {
    margin: 0px;
    padding: 0px;
    font-size: 50px;
  }

  #catchphrase {
    margin-left: 5px;
    padding: 0px;
    font-size: 17px;
  }

  @media (max-width: 600px) {
    text-align: center;

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