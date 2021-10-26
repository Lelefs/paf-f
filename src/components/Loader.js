import loaderImg from '../assets/loader.gif';

export function Loader() {
  return (
    <div className="loader-component">
      <img src={loaderImg} alt="Carregando" title="Carregando" />
    </div>
  );
}
