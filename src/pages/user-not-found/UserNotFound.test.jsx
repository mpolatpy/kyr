import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import UserNotFound from './UserNotFound';

describe('UserNotFound Component Tests', () => {

    let wrapper, history;

    beforeEach(() => {
        history = createMemoryHistory();
        wrapper = render(
            <Router location={history.location} navigator={history}>
                <UserNotFound />
            </Router>
        );
    });

    it('should match snaphot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should have couldn't find the user text in the document", () => {
        expect(screen.getByText(/couldn't find the user/i)).toBeInTheDocument();
    });

    it("should navigate to Add User page when Add New User button is clicked", () => {
        screen.getByText(/Add New User/i).click();
        expect(history.location.pathname).toBe('/add-user');
    });

    it("should navigate to home page when Go back to Home Page button is clicked", () => {
        screen.getByText(/Go back to Home Page/i).click();
        expect(history.location.pathname).toBe('/');
    });
})