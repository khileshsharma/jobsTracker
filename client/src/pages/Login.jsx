import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useNavigate,
} from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post('/api/v1/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await axios.post('/api/v1/auth/login', data);
      toast.success('take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type='button' onClick={loginDemoUser} className='btn btn-block'>
          {isSubmitting ? 'submitting...' : 'explore the app'}
        </button>
        <p>
          Already a member?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
