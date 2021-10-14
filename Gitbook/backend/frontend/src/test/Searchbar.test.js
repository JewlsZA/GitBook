// import { render, screen } from '@testing-library/react';
import Searchbar from "../components/Searchbar"
import renderer from "react-test-renderer"
//import {onSubmitClick} from '../components/Searchbar'
import fetch from "isomorphic-fetch"
//import { expect } from 'chai';

// Extend timeout incase for slow internet connection, no failed tests
jest.setTimeout(60000)

test("renders correctly", () => {
  const tree = renderer.create(<Searchbar />).toJSON()
  expect(tree).toMatchSnapshot()
})

test("frontend fetches user information from the backend api", () => {
  fetch("http://localhost:8080/usertesting/jewlsza")
    .then((response) => response.json())
    .then((data) => {
      expect(data).toBeDefined()
    })
})
