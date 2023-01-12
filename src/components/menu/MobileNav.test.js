import { act, fireEvent, getByRole, getByTestId, render, screen } from "@testing-library/react";
import MobileNav from "./MobileNav";

describe('Logout button',  () => { 
    it('rendered logout button',() => {
        render (<MobileNav/>);
    //    const {getByTestId} =  render (<MobileNav/>);
    //    const button = getByTestId('button1')
    //    expect(button).toBeTruthy();
    screen.debug();


    })

    // it('render logout button', async () => {
    //     await act(async () => {
    //         const {getByTestId} =  render (<MobileNav/>);
    //         const button = getByTestId('button1');
    //          await fireEvent.click(button);
    //         expect(button).toHaveBeenCalled();
    //     })
    // })

})