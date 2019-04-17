import React from 'react';

// shallow --> to render react components. You should use it as often as possible instead of mount() method, because it renders the component with all its content but the content isn't deeply rendered, so the child components are only rendered as placeholders, thus their content isn't rendered
// method --> Full rendering unlike shallow
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() }); // Connect enzyme to our react version

// The describe() function is avialable thanks to jest, and it doesn't need to be imported
describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // Enzyme allows us to just render one single component standalone independent on the entire other react application
    // The find() method allows us to look at elements into the component
    expect(wrapper.find(NavigationItem))
      .toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem))
      .toHaveLength(3);
  });

  it('should render the logout <NavigationItem />', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});