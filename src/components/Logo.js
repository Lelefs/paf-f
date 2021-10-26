import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link
      to="/"
      style={{
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: '-0.75px',
      }}
    >
      PAF
    </Link>
  );
}
