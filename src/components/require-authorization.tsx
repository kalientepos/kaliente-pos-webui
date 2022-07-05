import jwtDecode from 'jwt-decode';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { login } from '../store/slices/auth/auth-slice';

function RequireAuthorization({
  roles = [],
  children,
}: {
  roles?: Array<string>;
  children: JSX.Element;
}) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);

  if (user.email === '') {
    const token = localStorage.getItem('token');
    if (token) {
      const userInfo: any = jwtDecode(token);
      dispatch(login({ email: userInfo.sub, token, role: userInfo.scopes }));
    }
  }

  if (roles.find((r) => r === user.role)) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
}

export default RequireAuthorization;
