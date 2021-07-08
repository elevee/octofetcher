import styled from 'styled-components';
import Table from 'react-bootstrap/Table';

const InfoTableStyles = styled.div`
  display: grid;
  grid-template-columns: minmax(10px, 1fr);
  grid-template-rows: 0.2fr 1fr;
  word-break: break-all;
  margin: 5px;
  tr td:first-child {
      width: minmax(100px, 1fr);
      width: 150px;
      font-weight: bold;
  }

  input {
      width: 100%;
  }
`;

const InfoTable = ({detailRecord}) => {
    const {
        clone_url,
        html_url,
        owner: {
            login,
        },
        language,
    } = detailRecord;

    return (
        <InfoTableStyles>
            <Table striped borderless>
                <tbody>
                    <tr>
                        <td>Language:</td>
                        <td>{language || '-'}</td>
                    </tr>
                    <tr>
                        <td>Author:</td>
                        <td>{login}</td>
                    </tr>
                    <tr>
                        <td>Repository url:</td>
                        <td>
                            <a 
                              href={html_url} 
                              rel='noopener noreferrer'
                              target='_blank'>
                                {html_url}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Clone url:</td>
                        <td><input value={clone_url} width={'100px'}/></td>
                    </tr>
                </tbody>
            </Table>
        </InfoTableStyles>
    );
}

export default InfoTable;