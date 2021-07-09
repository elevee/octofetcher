import { shallow } from 'enzyme';
import Home from './Index';
import Search from './Search';
import Filter from './Filter';
import RepositoriesTable from './RepositoriesTable/Index';
import sampleListResponse from 'api/sampleListResponse';

describe('Home', () => {
  it('renders', () => {
    const wrapper = shallow(<Home results={sampleListResponse}/>);

    expect(wrapper.containsMatchingElement(<Search />)).toBe(true);
    expect(wrapper.containsMatchingElement(<Filter />)).toBe(true);
    expect(wrapper.containsMatchingElement(<RepositoriesTable />)).toBe(true);
  });
});
