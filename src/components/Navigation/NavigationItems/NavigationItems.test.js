import React from 'react'
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

//connect enzyme by passing the adapter
configure({adapter: new Adapter()});

//describe take 2 args 1:description of the test bundle 2: testing function
describe('<NavigationItems />',()=>{
    // function for 1 individual test 2arg 1:string description for the console 2: testing function

    //test if it render the right amount of item while being unauth
    it('should render 2 <NavigationItem/> elements if not auth',()=>{
        //create an instance of the component (enzyme)

        //shallow render the component with all the content but the content isnt deeply render
        const wrapper = shallow(<NavigationItems/>)

        //looking into the component to see what is render for our case (!isAuth)
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
});
