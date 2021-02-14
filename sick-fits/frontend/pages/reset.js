import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>You must have a valid reset password link.</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset your password</p>
      <Reset token={query.token} />
    </div>
  );
}
