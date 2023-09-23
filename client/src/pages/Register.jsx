import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  Form,
  redirect,
  useNavigation,
  Link,
  useRouteError,
} from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post('/api/v1/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const error = useRouteError();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='last name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />

        <FormRow type='password' name='password' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
