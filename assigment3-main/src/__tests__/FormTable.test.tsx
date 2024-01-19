import { fireEvent, render, screen } from '@testing-library/react';
import { createRenderer } from 'react-test-renderer/shallow';
import FormTable from '../FormTable';
import { act } from 'react-test-renderer';

const renderer = createRenderer();

const defaultComponent = <FormTable />;

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(defaultComponent);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should have correct label', () => {
    const { getByTestId } = render(defaultComponent);
    expect(getByTestId('sign-up-form')).toBeTruthy();
  });

  it('Register button is clickable', async () => {
    const { getByTestId } = render(defaultComponent);
    const RegisterButton = getByTestId('Register-target-btn');

    await act(async () => {
      fireEvent.click(RegisterButton);
    });

    expect(getByTestId('Register-target-btn')).toBeVisible();
  });

  it('A valid form data submit', async () => {
    const { getByTestId } = render(defaultComponent);
    const RegisterButton = getByTestId('Register-target-btn');

    await act(async () => {
      fireEvent.click(RegisterButton);
    });

    expect(getByTestId('firstName')).toBeInTheDocument();
    expect(getByTestId('lastName')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('confirmPassword')).toBeInTheDocument();
  });

  it('A validation message on form data Register', async () => {
    const { getByTestId } = render(defaultComponent);
    const RegisterButton = getByTestId('Register-target-btn');

    await act(async () => {
      fireEvent.click(RegisterButton);
    });

    expect(getByTestId('error-firstName')).toHaveTextContent(
      'FirstName is required',
    );
    expect(getByTestId('error-lastName')).toHaveTextContent(
      'LastName is required',
    );
    expect(getByTestId('error-password')).toHaveTextContent(
      'Password is required',
    );
    expect(getByTestId('error-confirmPassword')).toHaveTextContent(
      'Confirm Password is required',
    );
    expect(getByTestId('error-email')).toHaveTextContent('Email is required');
  });

  it('Check the email value', async () => {
    const { getByTestId } = render(defaultComponent);
    const RegisterButton = getByTestId('Register-target-btn');
    const emailField = screen.getByTestId('emailAddress');

    await act(async () => {
      fireEvent.change(emailField, {
        target: { value: 'test00hfhdhhfgmailco' },
      });

      RegisterButton.dispatchEvent(new Event('submit'));
    });

    expect(getByTestId('emailAddress')).toBeTruthy();
  });
});
