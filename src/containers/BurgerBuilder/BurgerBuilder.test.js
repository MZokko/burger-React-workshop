import React from 'react'
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder}from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

//connect enzyme by passing the adapter
configure({adapter: new Adapter()});

describe('<BurgerBuilder', () => {
    let wrapper;
    beforeEach(() =>{
        //pass onInitIngredients as empty func to fufill the requirement of the container
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
    })

    it('should render <BuildControls/> when receiving ingredient',()=>{
        wrapper.setProps({ings:{salad:0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})
