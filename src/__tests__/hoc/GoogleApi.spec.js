import React, { Component } from 'react';
import { JSDOM } from 'jsdom';
import { shallow, mount } from 'enzyme';
import GoogleApi from '../../hoc/GoogleApi';

class Sample extends Component {
  render() {
    return (<div>Sample component</div>)
  }
};

const S = mount(<Sample isTest />);

const jsdom = new JSDOM('');
const { window } = jsdom;
global.document = window.document;
const Wrapped = GoogleApi({ libraries: ['place'], isTest: true })(Sample);

describe('GoogleApiHoc', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Wrapped />)
  })

  it('loads the component', () => {
    expect(wrapper.find('div').length).toBe(2);
  });

  describe('map props', () => {
    let wrapped;
    beforeEach(() => {
      wrapper = mount(<Wrapped />)
      wrapped = wrapper.childAt(0).childAt(0);
    });

    it('adds a loading prop', () => {
      console.log(wrapped.props());
      expect(wrapped.props().loaded).toBe(false);
    });
  });
});
